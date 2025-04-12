# SolanaHub Noop Pinocchio

## Overview

The SolanaHub Noop Pinocchio is a Rust-based Solana program designed to demonstrate a simple "noop" (no operation) instruction. This program is built with performance optimizations in mind, such as using `no_std` to avoid the standard library and disabling heap allocations.

## Features

- **Noop Instruction**: A minimal Solana program that logs a message when invoked.
- **Performance Optimizations**: Uses `no_std` and disables heap allocations for better performance.

## Directory Structure

- **[src/](src/)**
  - **[lib.rs](src/lib.rs)**: The main library file.
    - Implements the noop instruction.

- **[tests/](tests/)**
  - Uses `litesvm` for lightweight Solana testing.

## Getting Started

### Prerequisites

- Rust and Cargo installed.
- Solana CLI installed.

### Build the Program

```bash
cargo build-sbf
```

After building, retrieve the program's public key and update the `pinocchio_pubkey::declare_id!` macro in the code:

```bash
solana address -k target/deploy/solanahub_noop-keypair.json
```

## License

This project is licensed under the MIT License. See the LICENSE file for details.
