import {
    Keypair,
    Connection,
} from "@solana/web3.js";
import { createMint } from "@solana/spl-token";
import fs from "fs";
import wallet from "../keys/first-wallet.json";

const firstWallet = Keypair.fromSecretKey(new Uint8Array(wallet));
const connection = new Connection("https://api.devnet.solana.com", "confirmed");

(async () => {
    const mint = await createMint(
        connection,
        firstWallet,
        firstWallet.publicKey,
        null,
        6,
    );

    fs.writeFileSync("keys/mint.json", JSON.stringify(mint));

    console.log(`Mint created: https://explorer.solana.com/address/${mint.toBase58()}?cluster=devnet`,);
})()