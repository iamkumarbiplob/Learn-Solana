const {
    Connection,
    PublicKey,
    clusterApiUrl,
    Keypair,
    LAMPORTS_PER_SOL
} = require("@solana/web3.js")
const wallet = new Keypair()

const publicKey = new PublicKey(wallet._keypair.publicKey)
const secretKey = wallet._keypair.secretKey

// console.log(publicKey)
// console.log(secretKey)


const getWalletBalance = async () => {
    try {
        const connection = new Connection(clusterApiUrl('devnet'), 'confirmed')
        const walletBalance = await connection.getBalance(publicKey)
        console.log(`Wallet Balance is ${walletBalance} SOL`)

    } catch (err) {
        console.error(err);
    }
}
const airDropSol = async () => {
    try {
        console.log(`Tranfarring Balance....... Please Wait`)
        const connection = new Connection(clusterApiUrl('devnet'), 'confirmed')
        const fromDropSignature = await connection.requestAirdrop(publicKey, 2 * LAMPORTS_PER_SOL)
        await connection.confirmTransaction(fromDropSignature)


    } catch (err) {
        console.error(err);
    }

}

const main = async () => {
    await getWalletBalance()
    await airDropSol()
    await getWalletBalance()
}
main()