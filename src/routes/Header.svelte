<script>
    import { goto } from "$app/navigation";
    import { BrowserProvider, Contract, formatEther } from "ethers";
    import { onMount, createEventDispatcher } from "svelte";
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

    // Local state variables
    let factory = null;
    let fee = 0;
    let buttonText;

    // Parent callback function
    const dispatch = createEventDispatcher();
    const handleClick = () => {
        dispatch("updateParent", {
            factory: factory,
        });
    };

    // Subscribe to the store
    /*     const unsubscribe = storeSigner.subscribe((val) => {
        account = val;
    }); */

    // Don't forget to unsubscribe when the component is destroyed
    /*     onDestroy(() => {
        unsubscribe();
    }); */

    const shortenAddress = (address) => {
        return `${address.slice(0, 5)}...${address.slice(address.length - 4)}`;
    };

    if ($storeSigner) buttonText = shortenAddress($storeSigner.address);
    else buttonText = "Connect wallet";

    const getDatabaseInfo = async (provider) => {
        const address = "0x42ADF64e3649b06F300442aD7297945672a905da";
        factory = new Contract(address, factoryJson.abi, provider);
        fee = await factory.getFee();
        storeFee.set(fee);
        fee = formatEther(fee);
        const feeToken = await factory.getFeeToken();
        storeFeeToken.set(feeToken);
        const feeContract = new Contract(feeToken, tokenJson.abi, provider);
        const symbol = await feeContract.symbol();
        storeFeeTokenSymbol.set(symbol);
    };

    const walletConnect = async (ethereum) => {
        try {
            const provider = new BrowserProvider(ethereum);
            await getDatabaseInfo(provider);
            const network = await provider.getNetwork();
            storeNetwork.set(network.chainId);
            // const accounts = await provider.send("eth_requestAccounts", []);
            const signer = await provider.getSigner();
            // const address = "0xb568A9A4F52523Da9032f9542324040E8c808613";
            //factory = new Contract(address, factoryJson.abi, signer);
            //const nAirdrops = await factory.getNumberOfAirdrops();
            //console.log(nAirdrops);
            const account = await signer.getAddress();
            storeSigner.set(signer);
            buttonText = shortenAddress(account);
            const eth = await provider.getBalance(account);
            storeEth.set(eth);
            return true;
        } catch (error) {
            console.log("Error connecting wallet:", error);
            return false;
        }
    };

    const openWalletExtension = async () => {
        const { ethereum } = window;
        if (ethereum) {
            const wConnect = await walletConnect(ethereum);
            storeConnected.set(wConnect);
            handleClick();
        } else {
            console.log("Ethereum object not found. Please install MetaMask.");
        }
    };

    onMount(() => {
        const { ethereum } = window;
        if (ethereum) {
            ethereum.on("accountsChanged", (accounts) => {
                if (accounts.length === 0) {
                    // MetaMask is locked or the user has not connected any accounts
                    console.log("Please connect to MetaMask.");
                } else if ($storeSigner)
                    if (accounts[0] !== $storeSigner.address) {
                        const wConnect = walletConnect(ethereum);
                        storeConnected.set(wConnect);
                    }
            });
            ethereum.on("chainChanged", () => {
                const wConnect = walletConnect(ethereum);
                storeConnected.set(wConnect);
            });
        } else {
            console.log("Ethereum object not found. Please install MetaMask.");
        }
    });

    const disconnect = () => {
        storeConnected.set(false);
        buttonText = "Connect wallet";
        storeSigner.set(null);
        storeFee.set(null);
    };

    const aboutAccount = (slug) => {
        if (slug) goto(`/about/${slug.address}`);
        else goto(`/about`);
    };
</script>

<div class="header">
    <ul class="nav-bar">
        <li><a href="/">Home</a></li>
        <li><a href="/airdrop/create">Create Airdrop</a></li>
        <li><a href="/airdrop/participate">Register for Airdrop</a></li>
        <li>
            <a href="#" on:click={() => aboutAccount($storeSigner)}>Dashboard</a
            >
        </li>
        <li><a href="/airdrop/contact">Contact</a></li>
        <li><a href="https://baldg.gitbook.io/app">Documentation</a></li>
    </ul>
    <div class="right-side">
        {#if $storeConnected}
            <button on:click={disconnect}>Disconnect</button>
        {/if}
        <button on:click={openWalletExtension}>{buttonText}</button>
    </div>
</div>

<style>
    .header {
        background-color: #f8f9fa;
        padding: 20px;
        text-align: center;
        display: flex;
        justify-content: space-between; /* Aligns items to the left and right */
        align-items: center; /* Vertically centers items */
    }

    .nav-bar {
        display: flex;
        justify-content: flex-start; /* Align items to the start (left) */
        list-style-type: none;
        padding: 0;
        margin-left: 0; /* Align the list to the left */
        gap: 20px; /* Set the desired spacing between flex items */
    }

    .nav-bar li {
        display: inline;
    }

    .nav-bar a {
        text-decoration: none;
        color: #333;
    }

    .right-side {
        display: flex;
        align-items: center;
    }

    .right-side button {
        background-color: #007bff;
        color: white;
        border: none;
        padding: 10px 20px;
        cursor: pointer;
        font-size: 16px;
    }
</style>
