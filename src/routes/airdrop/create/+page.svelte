<script>
    import "semantic-ui-css/semantic.min.css";
    import { Contract, formatEther, parseEther } from "ethers";
    import Spinner from "../../../components/Spinner.svelte";
    import {
        storeSigner,
        storeFee,
        storeFeeToken,
        storeFeeTokenSymbol,
    } from "../../store";
    import factoryJson from "../Factory.json";
    import tokenJson from "./ERC20.json";
    import Wrong from "../../../components/Wrong.svelte";

    let isLoading = false;
    let tokenContract = "";
    let regitrationFee = 0;
    let airdropDate = "";
    let airdropTime = "";
    let logoURL = "";
    let txHash = "";
    let txHashRef = "";
    let approved = false;
    let submitted = false;

    const approve = async () => {
        const factoryAddress = "0x42ADF64e3649b06F300442aD7297945672a905da";
        const explorer = "https://sepolia.etherscan.io/tx/";
        console.log($storeFeeToken, $storeFee);
        const feeContract = new Contract(
            $storeFeeToken,
            tokenJson.abi,
            $storeSigner,
        );
        // Form submission logic here
        console.log(
            `Form submitted with ${tokenContract}, ${airdropDate}, ${airdropTime}!`,
        );

        const approvedAmount = await feeContract.allowance(
            $storeSigner,
            factoryAddress,
        );
        console.log(approvedAmount, $storeFee);
        if (Number(approvedAmount) < Number($storeFee)) {
            isLoading = true;
            try {
                const tx = await feeContract.approve(factoryAddress, $storeFee);
                const receipt = await tx.wait();
                txHash = receipt.hash;
                txHashRef = explorer + txHash;
                approved = true;
            } catch (error) {
                console.log(`Transaction rejected: ${error}`);
            }
            isLoading = false;
        } else approved = true;
    };

    const handleSubmit = async () => {
        const address = "0x42ADF64e3649b06F300442aD7297945672a905da";
        const explorer = "https://sepolia.etherscan.io/tx/";
        const factory = new Contract(address, factoryJson.abi, $storeSigner);
        // Form submission logic here
        const dateString = airdropDate + "T" + airdropTime + ":00";
        const date = new Date(dateString);
        const unixTime = Math.floor(date.getTime() / 1000);
        console.log(unixTime); // This is the local time
        const regitrationFeeWei = parseEther(regitrationFee.toString());
        console.log(
            `Airdrop creation submitted with ${tokenContract}, ${airdropDate}, ${airdropTime}, ${regitrationFeeWei}, ${logoURL}!`,
        );
        isLoading = true;
        try {
            const tx = await factory.createNewAirdrop(
                tokenContract,
                unixTime,
                regitrationFeeWei,
                logoURL,
            ); // I need to pay the factory fee by approving the fee
            const receipt = await tx.wait();
            txHash = receipt.hash;
            txHashRef = explorer + txHash;
            approved = false;
            submitted = true;
        } catch (error) {
            console.log(`Transaction rejected: ${error}`);
        }
        isLoading = false;
        var nAirdrops = await factory.getNumberOfAirdrops();
        nAirdrops = Number(nAirdrops);
        console.log(nAirdrops);
    };
</script>

<div class="main">
    <div class="ui raised very padded text container segment">
        <h1>Create new airdrop</h1>

        {#if txHash.length > 0}
            <p>
                Transaction hash: <a href={txHashRef} target="_blank"
                    >{txHash}</a
                >
            </p>
        {/if}
        {#if $storeSigner}
            {#if !approved && !submitted}
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

                    <button type="submit" class="ui yellow button"
                        >Approve expense of {formatEther($storeFee)}
                        {$storeFeeTokenSymbol}</button
                    >
                </form>
            {:else if approved}
                <p>Fee allowance approved.</p>
                <h2>Airdrop summary</h2>
                <table>
                    <thead><tr><th>Key</th><th>Value</th></tr></thead>
                    <tbody
                        ><tr><th>Token address</th><th>{tokenContract}</th></tr>
                        <tr><th>Date</th><th>{airdropDate}</th></tr>
                        <tr><th>Time</th><th>{airdropTime}</th></tr>
                        <tr><th>Logo location</th><th>{logoURL}</th></tr>
                        <tr
                            ><th>Registration fee</th><th>{regitrationFee}</th
                            ></tr
                        ></tbody
                    >
                </table>
                <button on:click={handleSubmit} class="ui yellow button">Submit</button>
            {:else}
                <h2>Airdrop creation successfull!</h2>
                <p>Send the amount of token to be airdropped to 0xXXXX</p>
            {/if}
        {/if}
        {#if isLoading}
            <Spinner />
        {/if}
        <Wrong />
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
