<script>
    let socialMediaLinks = [
        { name: 'facebook', url: 'https://www.facebook.com', class: "ui facebook button", icon: "facebook icon" },
        { name: 'twitter', url: 'https://www.twitter.com', class: "ui twitter button", icon: "twitter icon" },
        { name: 'linkedIn', url: 'https://www.linkedin.com', class: "ui linkedin button", icon: "linkedin icon" },
        { name: 'instagram', url: 'https://www.instagram.com', class: "ui instagram button", icon: "instagram icon" },
        { name: 'youTube', url: 'https://www.youtube.com', class: "ui youtube button", icon: "youtube icon" }
    ];
</script>

<div>
    <h2>Social Media Links</h2>
    <div class="ui list">
        {#each socialMediaLinks as link}
            <div class="item">
                <a href={link.url} target="_blank">
                    <button class={link.class}>
                        <i class={link.icon}></i>
                        {link.name}
                      </button>
                </a>
            </div>
        {/each}
        </div>
</div>