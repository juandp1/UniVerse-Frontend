This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

---

## Getting Started - Docker

### Pre-requisites

Before to start, you need to install the following tools:

1. [Docker Desktop](https://www.docker.com/products/docker-desktop/)
2. [Docker Compose](https://docs.docker.com/compose/install/)

---

#### Clone the repository

First, clone the repository:

```bash
git clone https://github.com/El-Clan-Del-Bug/UniVerse-Frontend && cd UniVerse-Frontend/universe
```

If you can get the last version of the repository, you can use the following command:

```bash
git pull origin dev
```

---

#### Run Docker Compose

Then, run the following command:

```bash
docker-compose up
```

You can see the status of your containers from `Docker Desktop`, if something fails, just restart the containers. To restart the containers, run the following command:

```bash
docker-compose restart
```

Look at the `api` container logs, when you see something like:

```text
universe-web-1  |
universe-web-1  | > universe@0.1.0 dev
universe-web-1  | > next dev
universe-web-1  |
universe-web-1  | ready - started server on 0.0.0.0:3000, url: http://localhost:3000
universe-web-1  | event - compiled client and server successfully in 1916 ms (167 modules)
universe-web-1  | wait  - compiling...
universe-web-1  | event - compiled successfully in 155 ms (134 modules)
```

the project will be running at `127.0.0.1:3000`

---

#### Stop Docker Compose

To stop the containers, run the following command:

```bash
docker-compose down
```
