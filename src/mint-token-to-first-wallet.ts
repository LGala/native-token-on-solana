import {
    Keypair,
    Connection,
    PublicKey,
} from "@solana/web3.js";

import {
    mintTo,
    getOrCreateAssociatedTokenAccount,
} from "@solana/spl-token";

import wallet from "../keys/first-wallet.json";
import mint from "../keys/mint.json";
import fs from "fs";

const firstWallet = Keypair.fromSecretKey(new Uint8Array(wallet));
const mintKey = new PublicKey(mint);
const connection = new Connection("https://api.devnet.solana.com", "confirmed");

(async () => {
    const firstTokenAccount = await getOrCreateAssociatedTokenAccount(
        connection,
        firstWallet,
        mintKey,
        firstWallet.publicKey,
    );

    // Not needed, just to save it
    fs.writeFileSync("keys/first-token-account.json", JSON.stringify(firstTokenAccount.address.toBase58()));

    const amount = 10e5;
    await mintTo(
        connection,
        firstWallet,
        mintKey,
        firstTokenAccount.address,
        firstWallet.publicKey,
        amount
    );
    console.log(`Minted ${amount} to https://explorer.solana.com/address/${firstTokenAccount.address.toBase58()}?cluster=devnet`);
})()