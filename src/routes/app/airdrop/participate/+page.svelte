<script>
    import "semantic-ui-css/semantic.min.css";
    import { onMount } from "svelte";
    import { Contract, getDefaultProvider, formatEther } from "ethers";
    import factoryJson from "../Factory.json";
    import airdropJson from "./Airdrop.json";
    //import tokenJson from "../create/ERC20.json";
    import { storeSigner } from "../../../store";
    import Card from "../../../../components/Card.svelte";

    let nAirdrops;
    let addresses = [];

    const unixToHuman = (unixTimestamp) => {
        const date = new Date(unixTimestamp * 1000);
        const hours = date.getHours();
        const minutes = date.getMinutes();
        // const seconds = date.getSeconds();
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();

        return `${day}/${month}/${year} ${hours}:${minutes}`;
    };

    onMount(async () => {
        const address = "0x474af4CC045689bA0e95D63d6Efbd9Cc2CF7B2aa";
        var provider;
        if ($storeSigner) provider = $storeSigner;
        else
            provider = getDefaultProvider(
                "https://ethereum-sepolia-rpc.publicnode.com",
            );
        const factory = new Contract(address, factoryJson.abi, provider);
        nAirdrops = await factory.getNumberOfAirdrops();

        for (var i = 0; i < nAirdrops; ++i) {
            const cAddress = await factory.getContract(i);
            const airdropContract = new Contract(
                cAddress,
                airdropJson.abi,
                provider,
            );
            const balance = await airdropContract.getBalance();
            const registrationFee = await airdropContract.getRegistrationFee();
            const airdropTime = await airdropContract.getAirdropTime();
            // +get the logo
            // +get the token name
            addresses.push({
                name: "Orange",
                full: cAddress,
                balance: balance,
                fee: formatEther(registrationFee),
                time: unixToHuman(Number(airdropTime)),
            });
        }
        addresses = addresses;
    });
</script>

<div class="main">
    <div class="ui raised very padded text container segment">
        <h1>Register for an airdrop</h1>
        <p>Number of airdrops: {nAirdrops}</p>
        <p>
            {#each addresses as address}
                <Card
                    title={address.name}
                    address={address.full}
                    balance={address.balance}
                    fee={address.fee}
                    time={address.time}
                    image="https://www.pngall.com/wp-content/uploads/2016/05/Orange-Free-PNG-Image.png"
                />
            {/each}
        </p>
    </div>
</div>
