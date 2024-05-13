<script>
    import "semantic-ui-css/semantic.min.css";
    import Header from "../Header.svelte";
    import { storeSigner } from "../store";
    import "../../styles.css";

    let tokenContract = "";
    let regitrationFee = 0;
    let airdropDate = "";
    let airdropTime = "";
    let logoURL = "";

    function handleSubmit() {
        // Form submission logic here
        console.log("Form submitted!");
    }
</script>

<Header />

<div class="main">
    <div class="ui raised very padded text container segment">
        <h1>Create new airdrop</h1>

        {#if $storeSigner}
            <form on:submit={handleSubmit} class="ui form">
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
