# GitHub Actions Test Project

A simple Node.js Express application to test GitHub Actions deployment.

## Features

- Simple Express server
- Health check endpoint
- GitHub Actions workflow for CI/CD

## Getting Started

### Install Dependencies

```bash
npm install
```

### Run Locally

```bash
npm start
```

The server will start on `http://localhost:3000`

### Endpoints

- `GET /` - Returns a welcome message with timestamp
- `GET /health` - Health check endpoint

## GitHub Actions

The project includes a GitHub Actions workflow that:
- Runs on push to main branch
- Installs dependencies
- Runs tests (if any)
- Can be extended for deployment

## License

ISC
