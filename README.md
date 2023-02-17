# Inventory management system

Simple, minimalistic and modern inventory management system. This site was designed by using Tailwind CSS, Nuxt v3 and Go Fiber.

## How to run

1. Clone the repository
2. Copy `.env.example` to `.env`. The values are ready to use.
3. Run `docker-compose up -p -d`
4. Wait for the containers to start, and try to access the site at `http://localhost:3000`.
5. Use the credentials `admin` and `admin` to login.
6. Have fun!

## Seed

To seed an example items, you must go to the `http://localhost:5050/api/v1/products/seed` (GET method).
