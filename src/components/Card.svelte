<script>
    export let title;
    export let address;
    export let balance;
    export let fee;
    export let time;
    export let image;
    const explorer = "https://sepolia.etherscan.io/address/";

    const shortenAddress = (address) => {
        return `${address.slice(0, 5)}...${address.slice(address.length - 4)}`;
    };

    const register = () => {
        alert("Comnig soon!");
    };
</script>

<div class="card">
    <img src={image} alt={title} />
    <h2>{title}</h2>
    <ul>
        <li>
            Address: <a href={explorer + address} target="_blank"
                >{shortenAddress(address)}</a
            >
        </li>
        <li>Balance: {balance}</li>
        <li>Fee: {fee}</li>
        <li>Date and time: {time}</li>
    </ul>
    <p align="center"><button on:click={register}>Register</button></p>
</div>
