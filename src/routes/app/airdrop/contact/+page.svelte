<script>
    import "semantic-ui-css/semantic.min.css";
    import Card from "../../../../components/Card.svelte";
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
    <div>
        <Card
            title="Orange"
            description="3.99 €/kg"
            image="https://www.pngall.com/wp-content/uploads/2016/05/Orange-Free-PNG-Image.png"
        />
    </div>
</div>
