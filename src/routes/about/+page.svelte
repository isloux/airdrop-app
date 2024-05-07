<script>
    import "semantic-ui-css/semantic.min.css";
    import Header from "../Header.svelte";
    import Footer from "../Footer.svelte";

    // Local state variables
    let walletConnected = false;
    let account = "";
    let network = 0;
    let eth = 0;
</script>

<Header />

<div class="main">
    <div class="ui raised very padded text container segment">Coucou, vous n'&ecirc;tes pas identifi&eacute;</div>
</div>

<Footer />

<style>
    .main {
        background-color: blanchedalmond;
        flex-grow: 1; /* This makes the main content area expand to fill the available space */
        padding: 15px;
        overflow-y: auto;
    }
</style>
