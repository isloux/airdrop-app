<script>
    import "semantic-ui-css/semantic.min.css";
    import { storeSigner } from "../../store";
    import SocialButtons from "../../../components/SocialButtons.svelte";
</script>

<div class="main">
    <div class="ui raised very padded text container segment">
        <h1>Contact</h1>
        {#if $storeSigner}
            <p>Your wallet: {$storeSigner.address}</p>
        {:else}
            <p>Votre porteuille n'est pas connect&eacute;.</p>
        {/if}
        <SocialButtons />
    </div>
</div>
