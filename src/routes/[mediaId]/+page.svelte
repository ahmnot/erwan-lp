<script>
	// @ts-nocheck

	import { page } from '$app/stores';
	import { mediaList } from '$lib/mediaList';
	import { onMount } from 'svelte';
	import { underlineVisible } from '$lib/underlineVisibility';
	import LightBox from './LightBox.svelte';

	let mediaData = mediaList.find((media) => media.id === $page.params.mediaId);
	let lightBoxVisible = false;
	let selectedImage = '';
	onMount(() => {
		underlineVisible.set(false);
	});

	function openLightBox(imageSrc) {
		selectedImage = imageSrc;
		lightBoxVisible = true;
	}

	// Listen for the close event from LightBox
	function handleClose() {
		lightBoxVisible = false;
	}
</script>

<h1>{JSON.stringify(mediaData)}</h1>

<h1>{mediaData?.title}</h1>

<div class="side-by-side">
	<div class="portfolio-gallery">
		{#each mediaData?.images as image}
			<a on:click|preventDefault={() => openLightBox(image)}>
				<img src={image} alt={mediaData?.title} class="image" />
			</a>
		{/each}
	</div>

	<p class="about">
		À propos <br />
		Original music from<br />
		director bla bla<br />
		Bla bla bla<br />
	</p>
</div>

<LightBox
	{selectedImage}
	isVisible={lightBoxVisible}
	title={mediaData?.title}
	on:close={handleClose}
/>

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

	.image:hover {
		cursor:pointer;
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
