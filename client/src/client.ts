import { PublicKey, TransactionInstruction } from "@solana/web3.js";

class SolanaHubNoopClient {
    public programId: PublicKey = new PublicKey("GBtuxMi2Y2V5YJbRihrCFgxph23VvEhrHFQsbAwVZgt5");

    constructor() {}

    getNoopInstruction(): TransactionInstruction {
        const instructionData = new Uint8Array();
        return {
            programId: this.programId,
            keys: [], 
            data: Buffer.from(instructionData),
        };
    }
}

export default SolanaHubNoopClient;