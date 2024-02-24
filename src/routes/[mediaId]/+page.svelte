<script>
    import { page } from '$app/stores';
    import { mediaList } from '$lib/mediaList'; 

    let mediaData = mediaList.find(media => media.id === $page.params.mediaId);
</script>

<h1>{JSON.stringify(mediaData)}</h1>