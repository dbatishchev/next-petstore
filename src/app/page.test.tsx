import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { prisma } from '@/lib/prisma'
import Home from './page'
import { render, screen } from '@testing-library/react'
import { Suspense } from 'react'

describe('Home Page', () => {
  it('renders the pets list', async () => {
    // we must wrap the component in Suspense to test it
    render(<Suspense><Home /></Suspense>)

    // we have to await Suspense to resolve
    await screen.findByText('Pets for Sale')
    
    // Verify pets are displayed
    expect(await screen.findByText('Buddy')).toBeInTheDocument()
    expect(await screen.findByText('Luna')).toBeInTheDocument()
    expect(await screen.findByText('Max')).toBeInTheDocument()
    expect(await screen.findByText('Bella')).toBeInTheDocument()
    expect(await screen.findByText('Charlie')).toBeInTheDocument()
    expect(await screen.findByText('Nemo')).toBeInTheDocument()
  })
})
