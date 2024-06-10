import {
    Keypair,
    Connection,
    LAMPORTS_PER_SOL
} from "@solana/web3.js";
import wallet from "../keys/first-wallet.json";

const firstWallet = Keypair.fromSecretKey(new Uint8Array(wallet));
const connection = new Connection("https://api.devnet.solana.com", "finalized");

(async () => {
    try {
        const airdropSignature = await connection.requestAirdrop(
            firstWallet.publicKey,
            0.01 * LAMPORTS_PER_SOL
        );
        console.log(`Airdrop: https://explorer.solana.com/tx/${airdropSignature}?cluster=devnet`);
    } catch (error) {
        console.error(error);
    }
})();