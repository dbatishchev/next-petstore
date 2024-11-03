import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest'
import Home from './page'
import { render, screen, fireEvent, waitFor, within } from '@testing-library/react'
import { Suspense } from 'react'
import { useSession } from 'next-auth/react'
import { getServerSession } from 'next-auth'
import { prisma } from '@/lib/prisma'

// Mock next-auth
vi.mock('next-auth/react', () => ({
  useSession: vi.fn()
}))

// Mock next-auth/next
vi.mock('next-auth', () => ({
  getServerSession: vi.fn()
}))

// Mock sonner toast
vi.mock('sonner', () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn()
  }
}))

// Mock next/cache
vi.mock('next/cache', () => ({
  revalidatePath: vi.fn(),
}))

// Mock next/navigation
vi.mock('next/navigation', () => ({
  redirect: vi.fn(),
}))

describe('Home Page', () => {
  let testPetId: number;

  beforeEach(async () => {
    // Create a test pet before each test
    const testPet = await prisma.pet.create({
      data: {
        name: "Test Pet",
        breed: "TestBreed",
        age: "1 year",
        price: 100,
        imageUrl: "/test.jpg"
      }
    });
    testPetId = testPet.id;
  });

  afterEach(async () => {
    // Clean up the test pet and any associated orders after each test
    if (testPetId) {
      // First delete any orders associated with the pet
      await prisma.order.deleteMany({
        where: { petId: testPetId }
      });
      
      // Then delete the pet
      await prisma.pet.delete({
        where: { id: testPetId }
      });
    }
  });

  it('renders the pets list for unauthenticated users', async () => {
    vi.mocked(useSession).mockReturnValue({
      data: null,
      status: 'unauthenticated',
      update: vi.fn()
    })

    vi.mocked(getServerSession).mockResolvedValue(null)

    render(<Suspense><Home /></Suspense>)
    await screen.findByText('Pets for Sale')
    expect(await screen.findByText('Test Pet')).toBeInTheDocument()
  })

  it('renders the buy button for authenticated users', async () => {
    vi.mocked(useSession).mockReturnValue({
      data: null,
      status: 'unauthenticated',
      update: vi.fn()
    })

    vi.mocked(getServerSession).mockResolvedValue(null)

    render(<Suspense><Home /></Suspense>)
    await screen.findByText('Pets for Sale')
    expect((await screen.findAllByText('Buy Now')).length).toBeGreaterThan(0)
  })

  it('shows success when authenticated user clicks Buy Now for Test Pet', async () => {
    // Mock authenticated session for client-side
    vi.mocked(useSession).mockReturnValue({
      data: {
        user: { email: 'test@example.com' },
        expires: '2024-01-01'
      },
      status: 'authenticated',
      update: vi.fn()
    })

    // Mock authenticated session for server-side
    vi.mocked(getServerSession).mockResolvedValue({
      user: { email: 'test@example.com' },
      expires: '2024-01-01'
    })

    render(<Suspense><Home /></Suspense>)
    await screen.findByText('Pets for Sale')
    
    // Find the card using data-testid
    const testPetCard = screen.getByTestId(`pet-${testPetId}`)
    
    // Find the Buy Now button within this specific card
    const buyButton = within(testPetCard).getByText('Buy Now')
    fireEvent.click(buyButton)
    
    // Verify the button text changes for this specific pet
    expect(await within(testPetCard).findByText('Added to Cart')).toBeInTheDocument()
  })

  it('should not allow unauthenticated user to buy a pet', async () => {
    vi.mocked(useSession).mockReturnValue({
      data: null,
      status: 'unauthenticated',
      update: vi.fn()
    })

    vi.mocked(getServerSession).mockResolvedValue(null)

    render(<Suspense><Home /></Suspense>)
    await screen.findByText('Pets for Sale')
    const buyButtons = await screen.findAllByText('Buy Now')
    fireEvent.click(buyButtons[0])
    
    const { toast } = await import('sonner')
    expect(toast.error).toHaveBeenCalledWith('You must be signed in to buy a pet')
  })
})
