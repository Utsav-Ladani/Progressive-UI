# Progressive UI

Incremental data fetching using Server-Sent Events (SSE) for progressive UI loading.

## What is incremental data fetching?

Incremental data fetching is a technique that allows to fetch data incrementally, rather than fetching all the data at once. This is useful for improving the user experience, especially for large datasets.

## Demo

https://github.com/user-attachments/assets/f8a3506b-de31-4c89-ad6a-0a12e0f3304f

## Benefits

- **Faster Initial Load**: Content appears immediately without waiting for complete data
- **Improved Perceived Performance**: Users see content progressively appearing, making the app feel more responsive
- **Better User Experience**: Allow users to interact with partial content while the rest loads
- **Better Network Usage**: Prioritizes essential content delivery first

## Project Structure

- `src/` - Server-side Express.js code
- `client/` - Client-side application

## Getting Started

### Prerequisites

- NodeJS
- pnpm

### Installation

```bash
# Install dependencies for server
pnpm install

# Install dependencies for client
cd client
pnpm install
```

### Running the Application

```bash
# Run server (in project root)
pnpm dev

# Run client (in client directory)
cd client
pnpm dev
```

The server runs on port 3000, and the client development server will be available at the URL shown in the terminal after startup.
