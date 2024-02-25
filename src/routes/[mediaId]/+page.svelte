<script>
	import { page } from '$app/stores';
	import { mediaList } from '$lib/mediaList';
	import { onMount } from 'svelte';
	import { underlineVisible } from '$lib/underlineVisibility';

	let mediaData = mediaList.find((media) => media.id === $page.params.mediaId);
	onMount(() => {
		underlineVisible.set(false);
	});
</script>

<h1>{JSON.stringify(mediaData)}</h1>

<h1>{mediaData?.title}</h1>

<div class="side-by-side">
	<div class="portfolio-gallery">
		<!-- svelte-ignore a11y-missing-attribute -->
		<a>
			<img src={mediaData?.images[0]} alt={mediaData?.title} class="image" />
		</a>
		<!-- svelte-ignore a11y-missing-attribute -->
		<a>
			<img src={mediaData?.images[0]} alt={mediaData?.title} class="image" />
		</a>
	</div>

	<p class="about">
		À propos <br />
		Original music from<br />
		director bla bla<br />
		Bla bla bla<br />
  </p>
</div>

<style>
	.portfolio-gallery {
		display: inline-flex;
		width: 100%;
		position: relative;
	}

	.image {
		max-width: 100%;
		margin-left: 0;
	}

	.about {
		display: flex;
		flex-wrap: wrap;
		align-content: center;
		flex-direction: row;
		align-items: center;
		justify-content: flex-end;
		margin-right: 10px;
	}
</style>
