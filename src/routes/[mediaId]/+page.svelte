<script>
    import { page } from '$app/stores';
    import { mediaList } from '$lib/mediaList'; 
	import { onMount } from 'svelte';
	import { underlineVisible } from '$lib/underlineVisibility';

    let mediaData = mediaList.find(media => media.id === $page.params.mediaId);
    onMount(() => {
		underlineVisible.set(false);
    })
</script>

<h1>{JSON.stringify(mediaData)}</h1>