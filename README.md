# create-nest-api-starter

Scaffold a **NestJS** REST API with the boring-but-necessary parts already done: validated config, global request validation, one uniform error shape, health check, graceful shutdown, a sample CRUD module and tests.

## What it does

Copies a small NestJS template into a new folder. The generated project has:

- **Validated config**: `ConfigModule` with a `validate` function that reports all invalid env vars together and stops startup.
- **Global `ValidationPipe`** (`whitelist`, `forbidNonWhitelisted`, `transform`) so unknown or malformed fields are rejected with 400.
- **One error shape** for every failure via a global exception filter: `{ "error": { "statusCode": 404, "message": "..." } }`. 5xx details are logged, never returned.
- **`GET /health`** and **graceful shutdown hooks**.
- **Sample `users` module** with DTO validation, `ParseIntPipe`, 404 and 409 handling (in-memory; replace with your DB).
- **Tests**: jest + supertest e2e-style tests that boot the real Nest app with the same global setup as production.
- **Dockerfile**: multi-stage, non-root.

The scaffolder itself has zero dependencies.

## Install

```sh
npm create nest-api-starter my-api
# or
npx create-nest-api-starter my-api
```

## Usage

```sh
cd my-api
cp .env.example .env
npm install
npm run dev          # http://localhost:3000/health and /users
npm test
npm run build && npm start
```

## API

`create-nest-api-starter <project-name>`

- `<project-name>` becomes the folder and the package name (lowercase letters, digits, `-`, `.`, `_`).
- The target folder must not exist or be empty; nothing is overwritten.
- Needs Node.js 20+.

## Where to use it

- Starting a new NestJS service without copying an old project and deleting half of it.
- Teams that want every Nest service to share the same validation and error conventions.
- Learning NestJS with a working, tested example (module, controller, service, DTO, filter).
- Prefer plain Express? See `create-node-service-starter`.

## Integrate

Generate more modules with the Nest CLI inside the project (`npx nest g resource orders`), add them to `AppModule`, and keep new env variables in `src/config.ts` so they fail fast at startup. Put new global behaviour in `src/setup.ts`; both `main.ts` and the tests use it.

## Limitations

- Storage is in memory by design; add TypeORM, Prisma or Mongoose yourself.
- No authentication, Swagger or rate limiting is included to keep the starting point small.
- Targets NestJS 10 with the Express adapter (not Fastify).
