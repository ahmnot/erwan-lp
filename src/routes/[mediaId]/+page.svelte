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

<h1>{mediaData?.title}</h1>

<div class="portfolio-gallery">
	{#each mediaData?.images as image}
		<a class="image-wrapper" on:click|preventDefault={() => openLightBox(image)}>
			<img src={image} alt={mediaData?.title} class="image" />
		</a>
	{/each}
	<div class="youtube-wrapper">
		<iframe
			class="youtube"
			src={mediaData?.youtube}
			title="YouTube video player"
			frameborder="0"
			allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
			allowfullscreen
		></iframe>
	</div>
</div>

<p class="about">
	À propos <br />
	Original music from<br />
	director bla bla<br />
	Bla bla bla<br />
</p>

<LightBox
	{selectedImage}
	isVisible={lightBoxVisible}
	title={mediaData?.title}
	on:close={handleClose}
/>

<style>
	.youtube-wrapper {
		position: relative;
		width: 100%; /* Adjust this to control the width */
		padding-top: 56%; 
		align-items: center;
	}
	.youtube {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		max-width: 100%;
	}

	.portfolio-gallery {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.image-wrapper {
		margin: 20px;
	}

	.image {
		max-width: 100%;
	}

	.image:hover {
		cursor: pointer;
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

/* Media query for larger screens */
@media (min-width: 768px) {
	.youtube-wrapper {
		padding-top: 26%; 
	}
	
	.portfolio-gallery {
		flex-direction: row; 
	}

	.portfolio-gallery > * {
		flex-basis: calc(50% - 40px);
	}

}
</style>
