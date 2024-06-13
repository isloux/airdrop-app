<script>
    import "semantic-ui-css/semantic.min.css";
    export let title;
    export let address;
    export let balance;
    export let fee;
    export let time;
    export let image;
    export let owner;
    const explorer = "https://sepolia.etherscan.io/address/";

    const shortenAddress = (address) => {
        return `${address.slice(0, 5)}...${address.slice(address.length - 4)}`;
    };

    const register = () => {
        alert("Comnig soon!");
    };
</script>

<div class="ui card">
    <div class="image">
        <img src={image} alt={title} />
    </div>
    <div class="content">
        <div class="header">{title}</div>
        <div class="description">
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
        </div>
        <div class="ui bottom attached button" on:click={register}>Register</div>
        <div class="extra content">Owner: {owner}</div>
    </div>

</div>
