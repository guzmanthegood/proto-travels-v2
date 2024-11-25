# Proto-Travels Server

The **Proto-Travels Server** is a GraphQL API built with Apollo Server. It handles the backend logic for the booking platform and exposes a GraphQL schema for client applications.

## Features

- **GraphQL API** powered by Apollo Server.
- Fully written in **TypeScript**.
- Organized for scalability with resolvers and schema modules.

## Folder Structure

```
src/
├── index.ts        # Entry point
├── schema/         # GraphQL schema definitions
├── resolvers/      # Resolver functions
└── utils/          # Utility functions
```

## Development

Run the server in development mode:

```sh
pnpm dev
```

Compile TypeScript and run the compiled code:

```sh
pnpm build
pnpm start
```

## Schema Example

Here's a simple example of the schema:

```graphql
type Query {
  books: [Book]
}

type Book {
  title: String
  author: String
}
```

## Technology Stack

- **Apollo Server**: Provides the GraphQL API.
- **TypeScript**: Ensures type safety and modern JavaScript features.
- **PNPM**: For dependency management and scripts.

## License

This project is licensed under the MIT License.
