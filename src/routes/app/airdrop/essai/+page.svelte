<script>
    import "semantic-ui-css/semantic.min.css";
    import { Contract } from "ethers";
    import { storeSigner } from "../../../store";
    import Spinner from "../../../../components/Spinner.svelte";
    import simpleStorage from "./simple.json";

    let isLoading = false;
    let txHash = "";

    const ohlala = async () => {
        if ($storeSigner) {
            const cAddress = "0xb568A9A4F52523Da9032f9542324040E8c808613";
            const ssContract = new Contract(
                cAddress,
                simpleStorage.abi,
                $storeSigner,
            );
            isLoading = true;
            try {
                const tx = await ssContract.addPerson("John Rambo", 1980);
                const receipt = await tx.wait();
                txHash = receipt.hash;
            } catch (error) {
                console.log(`Transaction rejected: ${error}`);
            }
            isLoading = false;
        } else alert("You must sign with your wallet");
    };
</script>

<div class="main">
    <div class="ui raised very padded text container segment">
        <h1>coucou</h1>
        {#if isLoading}
            <Spinner />
        {/if}
        {#if txHash.length > 0}
            Transaction hash: {txHash}
        {:else}
            <p>
                <button on:click={ohlala}>Appuyer ici</button>
            </p>
        {/if}
    </div>
</div>
