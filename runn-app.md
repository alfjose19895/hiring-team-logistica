# Run app

## Back

Make sure to run the backend before anything else

### .env

Create `.env` file based on `.env.template`

```bash
touch .env
```

### Running the app

```bash
# prod:
docker compose up --build -d


# dev:
pnpm i

docker compose -f docker-compose-dev.yml up --build
```

### Executing SEED

In order to run the seed, it is necessary to set STAGE and NODE_ENV to 'dev' in the .env file

```bash
# HTTP Get request

curl http://localhost:3000/api/seed
```

## Front

### Running the app

```bash
docker compose up --build -d
```
