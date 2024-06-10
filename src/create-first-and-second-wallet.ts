import { Keypair } from "@solana/web3.js";
import fs from "fs";

const firstKeypair = Keypair.generate();
console.log(`first wallet: https://explorer.solana.com/address/${firstKeypair.publicKey.toBase58()}?cluster=devnet}`)
fs.writeFileSync("keys/first-wallet.json", JSON.stringify([...firstKeypair.secretKey]));

// Not needed, just to save it
fs.writeFileSync("keys/first-wallet-pubkey.json", JSON.stringify(firstKeypair.publicKey.toBase58()));

const secondKeypair = Keypair.generate();
console.log(`second wallet: https://explorer.solana.com/address/${secondKeypair.publicKey.toBase58()}?cluster=devnet}`)
fs.writeFileSync("keys/second-wallet-pubkey.json", JSON.stringify(secondKeypair.publicKey.toBase58()));