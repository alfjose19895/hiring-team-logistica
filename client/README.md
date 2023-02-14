# Inventory management system

This is a simple but pretty powerful inventory management system. It is built using Go and Vue.js under Nuxt, and it is designed to be used in a tiny bit practice.

## Features

- [x] User auth
- [x] Measurement unit
- [x] Category
- [x] Products
- [x] Stock
- [x] Modern UI and dashboard

## Ready to use

Since this project is builtin as mono-repo, you can use it directly without any configuration. Just clone this repo and run the following command:

```bash
docker-compose up --build -d
```

Then you can access the frontend at `http://localhost:3000` and the backend at `http://localhost:5050`.

Note that the default username and password are `admin` and `admin`.

## Run as development

If you want to run this client from source, just run the following command:

```bash
$ npm install
$ npm run dev
```

Then you can access the frontend at `http://localhost:3000`.
