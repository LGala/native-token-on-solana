import {
    Keypair,
    Connection,
    PublicKey,
} from "@solana/web3.js";
import {
    getOrCreateAssociatedTokenAccount,
    transfer,
} from "@solana/spl-token";
import wallet from "../keys/first-wallet.json";
import firstTokenAccount from "../keys/first-token-account.json";
import mintKey from "../keys/mint.json";
import secondWalletPubkey from "../keys/second-wallet-pubkey.json";
import fs from "fs";

const connection = new Connection("https://api.devnet.solana.com", "confirmed");
const firstWallet = Keypair.fromSecretKey(new Uint8Array(wallet));
const firstTokenAccountAddress = new PublicKey(firstTokenAccount);
const mint = new PublicKey(mintKey);
const secondWalletPublickey = new PublicKey(secondWalletPubkey);

(async () => {
    const secondTokenAccount = await getOrCreateAssociatedTokenAccount(
        connection,
        firstWallet,
        mint,
        secondWalletPublickey,
    );

    // Not needed, just to save it
    fs.writeFileSync("keys/second-token-account.json", JSON.stringify(secondTokenAccount.address.toBase58()));

    const amount = 10e4;
    await transfer(
        connection,
        firstWallet,
        firstTokenAccountAddress,
        secondTokenAccount.address,
        firstWallet,
        amount
    );
    console.log(`Transferred ${amount} to https://explorer.solana.com/address/${secondTokenAccount.address.toBase58()}?cluster=devnet`);
})()