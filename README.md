# Proto-Travels V2

This is the **Proto-Travels V2** monorepo, built using **Turborepo** for managing multiple applications and packages efficiently. It serves as the foundation for a modern booking platform.

## What's inside?

This Turborepo includes the following apps and packages:

### Apps

- [`docs`](apps/docs/README.md): A [Next.js](https://nextjs.org/) app for documentation or static site.
- [`web`](apps/web/README.md): A [Next.js](https://nextjs.org/) app for the main booking platform UI.
- [`server`](apps/server/README.md): An **Apollo Server** providing the GraphQL API for the platform.

### Packages

- `@proto-travels/ui`: A stub React component library shared by the `web` and `docs` apps.
- `@proto-travels/eslint-config`: Shared `eslint` configuration, including `eslint-config-next` and `eslint-config-prettier`.
- `@proto-travels/typescript-config`: Shared `tsconfig.json` used across the monorepo.

Each package and app is fully written in [TypeScript](https://www.typescriptlang.org/).

### Utilities

This Turborepo includes some additional tools:

- [TypeScript](https://www.typescriptlang.org/) for static type checking.
- [ESLint](https://eslint.org/) for code linting.
- [Prettier](https://prettier.io) for code formatting.

## Build

To build all apps and packages, run the following command:

```sh
pnpm build
```

## Develop

To develop all apps and packages, run the following command:

```sh
pnpm dev
```

To develop a specific app, use the `--filter` flag:

```sh
pnpm --filter <app-name> dev
```

For example:

```sh
pnpm --filter server dev
pnpm --filter web dev
```

## Remote Caching

Turborepo can use a technique known as [Remote Caching](https://turbo.build/repo/docs/core-concepts/remote-caching) to share cache artifacts across machines, enabling you to share build caches with your team and CI/CD pipelines.

By default, Turborepo will cache locally. To enable Remote Caching, you will need an account with Vercel. If you don't have an account, [create one](https://vercel.com/signup) and then run:

```sh
npx turbo login
```

This will authenticate the Turborepo CLI with your [Vercel account](https://vercel.com/docs/concepts/personal-accounts/overview).

Next, link your Turborepo to a remote cache by running:

```sh
npx turbo link
```

## Folder Structure

Here is a high-level overview of the folder structure:

```
proto-travels/
├── apps/
│   ├── docs/      # Documentation app
│   ├── web/       # Booking platform UI
│   └── server/    # Apollo GraphQL server
├── packages/
│   ├── ui/        # Shared React components
│   ├── eslint-config/ # Shared ESLint configuration
│   └── typescript-config/ # Shared TypeScript configuration
└── turbo.json     # Turborepo configuration
```

Each app has its own `README.md`:

- [`docs README`](apps/docs/README.md)
- [`web README`](apps/web/README.md)
- [`server README`](apps/server/README.md)

## Useful Links

Learn more about the power of Turborepo:

- [Tasks](https://turbo.build/repo/docs/core-concepts/monorepos/running-tasks)
- [Caching](https://turbo.build/repo/docs/core-concepts/caching)
- [Remote Caching](https://turbo.build/repo/docs/core-concepts/remote-caching)
- [Filtering](https://turbo.build/repo/docs/core-concepts/monorepos/filtering)
- [Configuration Options](https://turbo.build/repo/docs/reference/configuration)
- [CLI Usage](https://turbo.build/repo/docs/reference/command-line-reference)
