<script>
    let socialMediaLinks = [
        { name: 'Facebook', url: 'https://www.facebook.com' },
        { name: 'Twitter', url: 'https://www.twitter.com' },
        { name: 'LinkedIn', url: 'https://www.linkedin.com' },
        { name: 'Instagram', url: 'https://www.instagram.com' },
        { name: 'YouTube', url: 'https://www.youtube.com' }
    ];
</script>

<div>
    <h2>Social Media Links</h2>
    <ul>
        {#each socialMediaLinks as link}
            <li>
                <a href={link.url} target="_blank">
                    <img src={link.name.toLowerCase() + '.png'} alt={link.name} />
                    <span>{link.name}</span>
                </a>
            </li>
        {/each}
    </ul>
    Mais o&ugrave; sont les images ?
</div>