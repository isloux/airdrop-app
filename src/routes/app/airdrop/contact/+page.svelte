<script>
    import "semantic-ui-css/semantic.min.css";
    import { storeSigner } from "../../../store";
</script>

<div class="main">
    <div class="ui raised very padded text container segment">
        <h1>Contact</h1>
        <p>Social networks</p>

        {#if $storeSigner}
            <p>Votre porteuille : {$storeSigner.address}</p>
        {:else}
            <p>Votre porteuille n'est pas connect&eacute;</p>
        {/if}
    </div>
</div>
