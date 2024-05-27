<script>
    import networks from "./networks";
    import { storeSigner, storeNetwork } from "../routes/store";
    const deployedNetwork = 11155111;
</script>

{#if deployedNetwork != $storeNetwork && $storeSigner}
    <div class="warning">
        Please connect to {networks.get(deployedNetwork)}
    </div>
{/if}
