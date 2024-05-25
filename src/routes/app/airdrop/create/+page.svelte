<script>
    import "semantic-ui-css/semantic.min.css";
    import { navigate } from "svelte-routing";
    import { Contract, formatEther, parseEther } from "ethers";
    import Spinner from "../../../../components/Spinner.svelte";
    import { storeSigner } from "../../../store";
    import factoryJson from "../factory.json";
    import tokenJson from "./token.json";

    let isLoading = false;
    let tokenContract = "";
    let regitrationFee = 0;
    let airdropDate = "";
    let airdropTime = "";
    let logoURL = "";
    let txHash = "";
    let txHashRef = "";
    let approved = false;

    const approve = async () => {
        const fee = parseEther("0.000000000000000001");
        const address = "0x867BfAD7b420c0eddE667dD92d06aE1efcd65f81";
        const explorer = "https://sepolia.etherscan.io/tx/";
        const feeContract = new Contract(address, tokenJson.abi, $storeSigner);
        // Form submission logic here
        console.log(
            `Form submitted with ${tokenContract}, ${airdropDate}, ${airdropTime}!`,
        );
        const dateString = airdropDate + "T" + airdropTime + ":00";
        const date = new Date(dateString);
        const unixTime = Math.floor(date.getTime() / 1000);
        console.log(unixTime); // This is the local time
        isLoading = true;
        try {
            const tx = await feeContract.increaseAllowance($storeSigner.address, fee);
            const receipt = await tx.wait();
            txHash = receipt.hash;
            txHashRef = explorer + txHash;
        } catch (error) {
            console.log(`Transaction rejected: ${error}`);
        }
        isLoading = false;
    };

    const handleSubmit = async () => {
        const address = "0x474af4CC045689bA0e95D63d6Efbd9Cc2CF7B2aa";
        const explorer = "https://sepolia.etherscan.io/tx/";
        const factory = new Contract(address, factoryJson.abi, $storeSigner);
        // Form submission logic here
        console.log(
            `Form submitted with ${tokenContract}, ${airdropDate}, ${airdropTime}!`,
        );
        const dateString = airdropDate + "T" + airdropTime + ":00";
        const date = new Date(dateString);
        const unixTime = Math.floor(date.getTime() / 1000);
        console.log(unixTime); // This is the local time
        isLoading = true;
        try {
            const tx = await factory.createNewAirdrop(
                tokenContract,
                unixTime,
                regitrationFee,
                logoURL,
            ); // I need to pay the factory fee by approving the fee
            const receipt = await tx.wait();
            txHash = receipt.hash;
            txHashRef = explorer + txHash;
            approved = true;
        } catch (error) {
            console.log(`Transaction rejected: ${error}`);
        }
        isLoading = false;
        var nAirdrops = await factory.getNumberOfAirdrops();
        nAirdrops = Number(nAirdrops);
        console.log(nAirdrops);
        navigate("/app");
    };
</script>

<div class="main">
    <div class="ui raised very padded text container segment">
        <h1>Create new airdrop</h1>

        {#if $storeSigner}
            {#if !approved}
                <form on:submit={approve} class="ui form">
                    <div class="field">
                        <label for="tokenContract">Token contract:</label>
                        <input
                            type="text"
                            id="tokenContract"
                            bind:value={tokenContract}
                        />
                    </div>

                    <div class="field">
                        <label for="regitrationFee">Registration fee:</label>
                        <input
                            type="number"
                            id="regitrationFee"
                            bind:value={regitrationFee}
                        />
                    </div>

                    <div class="field">
                        <label for="airdropDate">Airdrop date:</label>
                        <input
                            type="date"
                            id="airdropDate"
                            bind:value={airdropDate}
                        />
                    </div>

                    <div class="field">
                        <label for="airdropTime">Airdrop time:</label>
                        <input
                            type="time"
                            id="airdropTime"
                            bind:value={airdropTime}
                        />
                    </div>

                    <div class="field">
                        <label for="text">Logo URL:</label>
                        <input type="URL" id="logoURL" bind:value={logoURL} />
                    </div>

                    <button type="submit" class="ui submit">Submit</button>
                </form>
            {:else}
                <p>Fee allowance approved.</p>
                <button on:click={handleSubmit}></button>
            {/if}
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
    </div>
</div>

<style>
    /* Form styles */

    form {
        max-width: 400px;
        margin: 40px auto;
        padding: 20px;
        background-color: #c1d2ed;
        border: 1px solid #ccc;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }

    label {
        display: block;
        margin-bottom: 10px;
    }

    input[type="text"],
    input[type="date"],
    input[type="number"] {
        width: 100%;
        height: 40px;
        margin-bottom: 20px;
        padding: 10px;
        border: 1px solid #ccc;
    }

    input[type="submit"] {
        background-color: #4caf50;
        color: #fff;
        padding: 10px 20px;
        border: none;
        border-radius: 5px;
        cursor: pointer;
    }

    input[type="submit"]:hover {
        background-color: #3e8e41;
    }

    /* Error message styles */

    .error {
        color: #red;
        font-size: 12px;
        margin-bottom: 10px;
    }
</style>
