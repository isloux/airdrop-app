<script>
    import "semantic-ui-css/semantic.min.css";
    import { onMount } from "svelte";
    import { Contract, getDefaultProvider, formatEther } from "ethers";
    import factoryJson from "../Factory.json";
    import airdropJson from "./Airdrop.json";
    //import tokenJson from "../create/ERC20.json";
    import { storeSigner } from "../../../store";
    import Card from "../../../../components/Card.svelte";
    import Wrong from "../../../../components/Wrong.svelte";

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

    const getCards = async (provider) => {
        const address = "0x42ADF64e3649b06F300442aD7297945672a905da";
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
            const tokenName = await airdropContract.getTokenName();
            const tokenLogoUrl = await factory.getAirdropTokenLogoUrl(i);
            const owner = await airdropContract.owner();
            var isOwner = false;
            if ($storeSigner)
                if (owner === $storeSigner.address) isOwner = true; // Ceci n'est pas mis à jour lors de la connexion avec MetaMask
            addresses.push({
                name: tokenName,
                logoUrl: tokenLogoUrl,
                full: cAddress,
                balance: balance,
                fee: formatEther(registrationFee),
                time: unixToHuman(Number(airdropTime)),
                owner: isOwner,
            });
        }
        addresses = addresses;
    };

    onMount(async () => {
        var provider;
        if ($storeSigner) provider = $storeSigner;
        else
            provider = getDefaultProvider(
                "https://ethereum-sepolia-rpc.publicnode.com",
            );
        await getCards(provider);
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
                    owner={address.owner}
                    image={address.logoUrl}
                />
            {/each}
        </p>
        <Wrong />
    </div>
</div>
