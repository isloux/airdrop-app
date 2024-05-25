<script>
    import "semantic-ui-css/semantic.min.css";
    import { Contract, formatEther } from "ethers";
    import Header from "./Header.svelte";
    import {
        storeSigner,
        storeConnected,
        storeNetwork,
        storeEth,
    } from "../store";
    import factoryJson from "./airdrop/factory.json";

    // Local state variables
    let factory = null;
    let nAirdrops = 0;
    let fee;
    let feeToken;
    let feeTokenURL;
    let connected;
    storeConnected.subscribe((value) => {
        connected = value;
    });

    const getDatabaseInfo = async () => {
        const address = "0x474af4CC045689bA0e95D63d6Efbd9Cc2CF7B2aa";
        const explorer = "https://sepolia.etherscan.io/token/";
        factory = new Contract(address, factoryJson.abi, $storeSigner);
        nAirdrops = await factory.getNumberOfAirdrops();
        nAirdrops = Number(nAirdrops);
        console.log(nAirdrops);
        fee = await factory.getFee();
        fee = formatEther(fee);
        feeToken = await factory.getFeeToken();
        feeTokenURL = explorer + feeToken;
    };
</script>

<Header on:updateParent={getDatabaseInfo} />

<div class="main">
    <div class="ui raised very padded text container segment">
        <h1>BaldG Airdrop</h1>
        <h2>Create an airdrop for any token on BSC</h2>
        {#if connected}
            <p>
                Connected<br />
                Network: {$storeNetwork}
            </p>
            <p>Value: {formatEther($storeEth)}</p>
            <p><a href="/app/airdrop/create"><button>Create airdrop</button></a></p>
        {/if}
        {#if nAirdrops > 0}
            <p>Number of airdrops: {nAirdrops}</p>
        {/if}
        <p>
            {#if fee}
                Factory fee: {fee}
            {/if}
            {#if feeToken}
                <br />
                Fee token: <a href={feeTokenURL} target="_blank">{feeToken}</a>
            {/if}
        </p>
    </div>
</div>

<style>
    @import "../../styles.css";

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

    @font-face {
        font-family: "Candara";
        src:
            url("../../lib/font/Candara.ttf") format("truetype"),
            url("../../lib/font/Candarai.ttf") format("truetype");
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
