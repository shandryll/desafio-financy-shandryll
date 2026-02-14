Welcome! This repository contains the backend challenge for a simple finances API.

The API allows users to register, log in, and manage their personal transactions and categories.

## Requirements

- [x] User can register and log in
- [x] User can view and manage only transactions and categories they created
- [x] Create a transaction
- [x] Delete a transaction
- [x] Update a transaction
- [x] List all transactions (for the authenticated user)
- [x] Create a category
- [x] Delete a category
- [x] Update a category
- [x] List all categories (for the authenticated user)

## Tech stack

This project uses:

- TypeScript
- GraphQL (type-graphql)
- Prisma
- SQLite (default)

## Environment variables

Provide a `.env.example` file with the required variables:

```
JWT_SECRET=
DATABASE_URL=
```

## Notes

- CORS is enabled in the server.
- After schema changes run `npx prisma generate` and `npx prisma migrate dev` locally to apply migrations.

Made with 💜 by Rocketseat
