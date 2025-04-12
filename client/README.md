# Solana TypeScript Client

This project provides a TypeScript client for interacting with a Rust-based Solana program that implements a simple noop instruction.

## Installation

To get started, clone the repository and install the dependencies:

```bash
git clone <repository-url>
cd solana-ts-client
npm install
```

## Usage

The `SolanaClient` class is the main interface for interacting with the Solana program. You can use it to send a noop instruction.

### Example

```typescript
import { SolanaClient } from './src/client';

const client = new SolanaClient();
client.sendNoopInstruction().then(response => {
    console.log('Noop instruction sent:', response);
}).catch(error => {
    console.error('Error sending noop instruction:', error);
});
```

## Development

To build the project, run:

```bash
npm run build
```

To run the client, use:

```bash
npm start
```

## License

This project is licensed under the MIT License. See the LICENSE file for details.