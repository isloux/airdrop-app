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
    <p>
        Address: <a href={explorer + address} target="_blank"
            >{shortenAddress(address)}</a
        ><br />
        Balance: {balance}<br />
        Fee: {fee}<br />
        Date and time: {time}
    </p>
    <p align="center"><button on:click={register}>Register</button></p>
</div>
