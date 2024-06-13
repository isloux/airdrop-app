<script>
    import Header from "../Header.svelte";
    import { Contract, formatEther } from "ethers";
    import {
        storeSigner,
        storeFee,
        storeFeeToken,
        storeFeeTokenSymbol,
    } from "../store"; // The storeFee variable could be a json object
    import factoryJson from "./Factory.json";
    import tokenJson from "./create/ERC20.json";

    const getDatabaseInfo = async () => {
        if ($storeFeeTokenSymbol.length == 0) {
            const address = "0x474af4CC045689bA0e95D63d6Efbd9Cc2CF7B2aa";
            const factory = new Contract(
                address,
                factoryJson.abi,
                $storeSigner,
            );
            var fee = await factory.getFee();
            storeFee.set(fee);
            fee = formatEther(fee);
            const feeToken = await factory.getFeeToken();
            storeFeeToken.set(feeToken);
            const feeContract = new Contract(
                feeToken,
                tokenJson.abi,
                $storeSigner,
            );
            const symbol = await feeContract.symbol();
            storeFeeTokenSymbol.set(symbol);
        }
    };
</script>

<Header on:updateParent={getDatabaseInfo} />
<slot></slot>

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
