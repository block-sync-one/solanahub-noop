import {
    Transaction,
    SystemProgram,
    Keypair,
    LAMPORTS_PER_SOL,
    Connection,
} from "@solana/web3.js";
import SolanaHubNoopClient from "../client/src/client";

// code below must be run. make sure youhave solana cli installed and running
// solana-test-validator --bpf-program GBtuxMi2Y2V5YJbRihrCFgxph23VvEhrHFQsbAwVZgt5  target/deploy/noop_solanahub.so --reset

test("noop instruction test", async () => {
    // Connect to the Solana devnet
    const connection = new Connection("http://localhost:8899", "confirmed");
    const payer = Keypair.generate();
    // Create a receiver for the dummy transfer
    const receiver = Keypair.generate();

    // Airdrop some SOL to the payer
    const airdropSignature = await connection.requestAirdrop(payer.publicKey, 10_000_000_000);
    await connection.confirmTransaction(airdropSignature);

    // Create a noop instruction
    const solanaHubNoopClient = new SolanaHubNoopClient();
    const noopInstruction = solanaHubNoopClient.getNoopInstruction();

    // Create a transfer instruction
    const transferInstruction = SystemProgram.transfer({
        fromPubkey: payer.publicKey,
        toPubkey: receiver.publicKey,
        lamports: 1 * LAMPORTS_PER_SOL,
    });
    const blockhash = await connection.getLatestBlockhash();

    // Create and send the transaction
    const transaction = new Transaction({ recentBlockhash: blockhash.blockhash, feePayer: payer.publicKey });
    transaction.add(noopInstruction, transferInstruction);

    const simulation = await connection.simulateTransaction(transaction, [payer]);
    console.log(simulation)
    const signature = await connection.sendTransaction(transaction, [payer]);
    await connection.confirmTransaction(signature);

    // Verify the balance of the receiver
    const balance = await connection.getBalance(receiver.publicKey);
    expect(balance).toBe(LAMPORTS_PER_SOL);
});
