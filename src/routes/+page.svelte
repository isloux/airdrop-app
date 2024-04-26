<script>
    import "semantic-ui-css/semantic.min.css";
    import { Contract, formatEther } from "ethers";
    import Header from "./Header.svelte";
    import Footer from "./Footer.svelte";
    import Spinner from "../components/Spinner.svelte";
    import {
        storeAccount,
        storeConnected,
        storeNetwork,
        storeEth,
    } from "./store";    
    //import factoryJson from "../factory.json";

    // Local state variables
    let factory = null;
    let isLoading = false;

    const callContract = async () => {
        isLoading = true;
        try {
            const tx = await factory.addPerson("Lapin", 89);
            const hash = await tx.wait();
            console.log(hash);
        } catch {
            console.log("Transaction rejected");
        }
        isLoading = false;
    };
</script>

<Header />

<div class="main">
    <div class="ui raised very padded text container segment">
        <h1>Bonjour</h1>
        <p>Il s'agit d'une nouvelle application merveilleuse.</p>
        {#if $storeConnected}
            <p>Connected: {$storeAccount}</p>
            <p>Network: {$storeNetwork}</p>
            <p>Value: {formatEther($storeEth)}</p>
        {/if}
    </div>
</div>

<Footer />

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
