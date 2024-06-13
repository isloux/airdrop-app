<script>
    import "semantic-ui-css/semantic.min.css";
    import { Contract, formatEther } from "ethers";
    import Header from "./Header.svelte";
    import {
        storeSigner,
        storeConnected,
        storeNetwork,
        storeEth,
        storeFee,
        storeFeeToken,
        storeFeeTokenSymbol,
    } from "./store";
    import factoryJson from "./airdrop/Factory.json";
    import tokenJson from "./airdrop/create/ERC20.json";
    import { onDestroy, onMount } from "svelte";
    import Wrong from "../components/Wrong.svelte";

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

    const unsubscribe = storeConnected.subscribe((value) => {
        connected = value;
    });

    const getDatabaseInfo = async () => {
        const address = "0x42ADF64e3649b06F300442aD7297945672a905da";
        const explorer = "https://sepolia.etherscan.io/token/";
        factory = new Contract(address, factoryJson.abi, $storeSigner);
        nAirdrops = await factory.getNumberOfAirdrops();
        nAirdrops = Number(nAirdrops);
        fee = await factory.getFee();
        storeFee.set(fee);
        fee = formatEther(fee);
        feeToken = await factory.getFeeToken();
        storeFeeToken.set(feeToken);
        const feeContract = new Contract(feeToken, tokenJson.abi, $storeSigner);
        const symbol = await feeContract.symbol();
        storeFeeTokenSymbol.set(symbol);
        feeTokenURL = explorer + feeToken;
    };

    onMount(async () => {
        if ($storeSigner && !fee) await getDatabaseInfo();
    });

    onDestroy(() => {
        unsubscribe();
    });
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
            <p>
                <a href="/airdrop/create"><button>Create airdrop</button></a
                >
            </p>
        {/if}
        {#if nAirdrops > 0}
            <p>Number of open airdrops: {nAirdrops}</p>
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
        <Wrong />
    </div>
</div>

<style>
    @import "../styles.css";

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
