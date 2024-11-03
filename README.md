# Petstore

This is a simple petstore application built with Next.js and PostgreSQL. The user can register, login, and browse pets for sale.

## Features

- Register, login, and logout
- Browse pets for sale
- Add pets to cart

## Technologies

- Next.js (with App Router and Server Actions)
- PostgreSQL
- Prisma
- Tailwind CSS
- Shadcn UI
- NextAuth

## Setup

1. Clone the repository
2. Install dependencies: `npm install`
3. Set up PostgreSQL and Prisma: `npx prisma migrate dev`
4. Start the development server: `npm run dev`

## How to update the database

1. `npx prisma generate`

## How to initialize the database

1. `npx prisma migrate dev`
2. `npx prisma db seed`

## TODO List

- [ ] List component should fetch data from the database
- [ ] Database should use seed data
- [ ] The migrations should be automated
- [ ] The seed data should be automated
- [ ] Write integration tests for the main page

## Generate Prisma client
npx prisma generate

## Run migrations
npx prisma migrate dev

## (Optional) View your data in Prisma Studio
npx prisma studio

## Useful links:

- [Prisma Seed](https://www.prisma.io/docs/orm/prisma-schema/data-manipulation/seed-data) (how to seed the database)
