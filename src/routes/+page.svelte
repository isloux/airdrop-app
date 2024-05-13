<script>
    import "semantic-ui-css/semantic.min.css";
    import { Contract, formatEther } from "ethers";
    import Header from "./Header.svelte";
    import Footer from "./Footer.svelte";
    import Spinner from "../components/Spinner.svelte";
    import {
        storeSigner,
        storeConnected,
        storeNetwork,
        storeEth,
    } from "./store";
    import factoryJson from "./factory.json";

    // Local state variables
    let factory = null;
    let isLoading = false;
    let txHash = "";
    let txHashRef = "";
    let nAirdrops = 0;
    let connected;
    storeConnected.subscribe((value) => {
        connected = value;
    });

    const callFactory = async () => {
        const address = "0x474af4CC045689bA0e95D63d6Efbd9Cc2CF7B2aa";
        const explorer = "https://sepolia.etherscan.io/tx/";
        factory = new Contract(address, factoryJson.abi, $storeSigner);
        /*         isLoading = true;
        try {
            const tx = await factory.addPerson("Lapin", 36);
            const receipt = await tx.wait();
            txHash = receipt.hash;
            txHashRef =  explorer + txHash;
        } catch {
            console.log("Transaction rejected");
        }
        isLoading = false; */
        nAirdrops = await factory.getNumberOfAirdrops();
        nAirdrops = Number(nAirdrops);
        console.log(nAirdrops);
    };

    const handleUpdateParent = () => {
        // Call a script in the parent component
        callFactory();
    };

    const createAirdrop = async () => {

    }
</script>

<Header on:updateParent={handleUpdateParent} />

<div class="main">
    <div class="ui raised very padded text container segment">
        <h1>BaldG Airdrop</h1>
        <h2>Create an airdrop for any token on BSC</h2>
        {#if connected}
            <p>Connected</p>
            <p>Network: {$storeNetwork}</p>
            <p>Value: {formatEther($storeEth)}</p>
            <a href="/create"><button>Create airdrop</button></a>
        {/if}
        {#if isLoading}
            <Spinner />
        {/if}
        {#if txHash.length > 0}
            <p>
                Transaction hash: <a href={txHashRef} target="_blank"
                    >{txHash}</a
                >
            </p>
        {/if}
        {#if nAirdrops > 0}
            <p>Number of airdrops: {nAirdrops}</p>
        {/if}
    </div>
</div>

<style>
    :global(html),
    :global(body) {
        margin: 0;
        height: 100%;
        display: flex;
        flex-direction: column;
    }

    :global(#svelte) {
        display: flex;
        flex-direction: column;
        height: 100%;
    }

    .main {
        background-color: blanchedalmond;
        flex-grow: 1; /* This makes the main content area expand to fill the available space */
        padding: 15px;
        overflow-y: auto;
    }

    @font-face {
        font-family: "Candara";
        src:
            url("../lib/font/Candara.ttf") format("truetype"),
            url("../lib/font/Candarai.ttf") format("truetype");
    }

    .ui,
    h1,
    h2,
    h3,
    h4,
    h5,
    h6,
    p {
        font-family: "Candara", sans-serif !important;
    }
</style>
