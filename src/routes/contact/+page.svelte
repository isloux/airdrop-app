<script>
    import "semantic-ui-css/semantic.min.css";
    import Header from "../Header.svelte";
    import Footer from "../Footer.svelte";
    import Card from "../../components/Card.svelte";
    import { storeSigner } from "../store";
</script>

<Header />

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

<style>
    @import "../../styles.css";

    :global(html),
    :global(body) {
        margin: 0;
        height: 100%;
        display: flex;
        flex-direction: column;
    }

    :global(#svelte) {
        display: flex;
        flex-direction: column;
        height: 100%;
    }

    .main {
        background-color: blanchedalmond;
        flex-grow: 1; /* This makes the main content area expand to fill the available space */
        padding: 15px;
        overflow-y: auto;
    }

    @font-face {
        font-family: "Candara";
        src:
            url("../../lib/font/Candara.ttf") format("truetype"),
            url("../../lib/font/Candarai.ttf") format("truetype");
    }

    .ui,
    h1,
    h2,
    h3,
    h4,
    h5,
    h6,
    p {
        font-family: "Candara", sans-serif !important;
    }
</style>
