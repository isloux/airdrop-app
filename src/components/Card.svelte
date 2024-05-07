<script>
    export let title;
    export let description;
    export let image;
</script>

<div class="card">
    <img src={image} alt={title} />
    <h2>{title}</h2>
    <p>{description}</p>
</div>
