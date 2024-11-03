/// <reference types="vitest" />

import "@testing-library/jest-dom/vitest"
import { PrismaClient } from '@prisma/client'
import { beforeAll, afterAll, vi } from 'vitest'

let prisma: PrismaClient

beforeAll(() => {
  prisma = new PrismaClient()
})

afterAll(async () => {
  await prisma.$disconnect()
})

// mock "server-only" imports
vi.mock('server-only', () => {
  return {
    default: undefined
  }
})
