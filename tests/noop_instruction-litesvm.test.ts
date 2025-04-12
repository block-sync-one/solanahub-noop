import { LiteSVM, TransactionMetadata } from "litesvm";
import {
	PublicKey,
	Transaction,
	SystemProgram,
	Keypair,
	LAMPORTS_PER_SOL,
} from "@solana/web3.js";
import SolanaHubNoopClient from "../client/src/client";

test("one transfer", () => {
	const svm = new LiteSVM();
	const payer = new Keypair();
	svm.airdrop(payer.publicKey, BigInt(LAMPORTS_PER_SOL));
	const receiver = PublicKey.unique();
	const blockhash = svm.latestBlockhash();
	const transferLamports = 1_000_000n;
	const ixs = [
		SystemProgram.transfer({
			fromPubkey: payer.publicKey,
			toPubkey: receiver,
			lamports: transferLamports,
		}),
	];
	const transaction = new Transaction();
	transaction.recentBlockhash = blockhash;
	transaction.add(...ixs);
	transaction.sign(payer);
	svm.sendTransaction(transaction);
	const balanceAfter = svm.getBalance(receiver);
	expect(balanceAfter).toBe(transferLamports);
});

test("noop instruction test with sufficient lamports", () => {
  const solanaHubNoopClient = new SolanaHubNoopClient();
  const svm = new LiteSVM();
  svm.addProgramFromFile(solanaHubNoopClient.programId, "target/deploy/noop_solanahub.so");

  const payer = new Keypair();
  svm.airdrop(payer.publicKey, BigInt(2 * LAMPORTS_PER_SOL));

  const receiver = PublicKey.unique();

  // Get the latest blockhash
  const blockhash = svm.latestBlockhash();

  const noopInstruction = solanaHubNoopClient.getNoopInstruction();

	const transferLamports = 1_000_000n;
  // Create a transfer instruction
  const transferInstruction = SystemProgram.transfer({
    fromPubkey: payer.publicKey,
    toPubkey: receiver,
    lamports: transferLamports,
  });

  // Create and send the transaction
  const transaction = new Transaction();
  transaction.recentBlockhash = blockhash;
  transaction.add(noopInstruction, transferInstruction);
  transaction.sign(payer);

	const simRes = svm.simulateTransaction(transaction);
  console.log(simRes.meta().logs())
	const sendRes = svm.sendTransaction(transaction);
	if (sendRes instanceof TransactionMetadata) {
		expect(simRes.meta().logs()).toEqual(sendRes.logs());
		expect(sendRes.logs()[1]).toBe("Program log: Solana Hub Noop");
	} else {
		throw new Error("Unexpected transaction failure");
	}

  // Verify the balance of the receiver
  const balanceAfter = svm.getBalance(receiver);
  expect(balanceAfter).toBe(transferLamports);
});
