import { describe, it, expect, beforeEach, vi } from 'vitest'
import { prisma } from '@/lib/prisma'
import Home from './page'
import { render, screen, fireEvent } from '@testing-library/react'
import { Suspense } from 'react'
import { useSession } from 'next-auth/react'
import { toast } from 'sonner'
import { getServerSession } from 'next-auth/next'

// Mock next-auth
vi.mock('next-auth/react', () => ({
  useSession: vi.fn()
}))

// Mock next-auth/next
vi.mock('next-auth/next', () => ({
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
  revalidatePath: vi.fn() // because `revalidatePath` is used in purchasePet.ts
}))

describe('Home Page', () => {
  it('renders the pets list', async () => {
    render(<Suspense><Home /></Suspense>)
    await screen.findByText('Pets for Sale')
    expect(await screen.findByText('Buddy')).toBeInTheDocument()
    expect(await screen.findByText('Luna')).toBeInTheDocument()
    expect(await screen.findByText('Max')).toBeInTheDocument()
    expect(await screen.findByText('Bella')).toBeInTheDocument()
    expect(await screen.findByText('Charlie')).toBeInTheDocument()
    expect(await screen.findByText('Nemo')).toBeInTheDocument()
  })

  it('renders the buy button', async () => {
    render(<Suspense><Home /></Suspense>)
    await screen.findByText('Pets for Sale')
    expect(await screen.findAllByText('Buy Now')).toHaveLength(6)
  })

  it('shows success when authenticated user clicks Buy Now', async () => {
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
    
    const buyButtons = await screen.findAllByText('Buy Now')
    fireEvent.click(buyButtons[0])
    await vi.waitFor(() => {
      expect(toast.success).toHaveBeenCalledWith('Pet purchased successfully!')
    })
  })
})
