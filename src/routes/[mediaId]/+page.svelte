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

<h1 class="main-title"><div>{mediaData?.title}</div><div>{mediaData?.author}</div></h1>

<div class="portfolio-gallery">
	{#each mediaData?.images as image}
		<button class="image-wrapper" on:click|preventDefault={() => openLightBox(image)}>
			<img src={image} alt={mediaData?.title} class="image" />
		</button>
	{/each}
	{#if mediaData?.youtube && mediaData?.youtube !== ''}
		<div class="youtube-wrapper">
			<iframe
				class="youtube-iframe"
				src={mediaData?.youtube}
				title="YouTube video player"
				frameborder="0"
				allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
				allowfullscreen
			></iframe>
		</div>
	{/if}
	{#if mediaData?.soundcloud && mediaData?.soundcloud !== ''}
		<div class="soundcloud-wrapper">
			<iframe
				class="soundcloud-iframe"
				scrolling="no"
				frameborder="no"
				allow="autoplay"
				src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/{mediaData?.soundcloudAPINumber}&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"
				title="Soundcloud Player"
			></iframe>
		</div>
	{/if}
	<div class="about">
		<h3>About</h3>
		<div>{mediaData?.title}</div>
		<div>{mediaData?.author}</div>
		<div>{mediaData?.work}</div>
	</div>
</div>

<LightBox
	{selectedImage}
	isVisible={lightBoxVisible}
	title={mediaData?.title}
	on:close={handleClose}
/>

<style>
	.portfolio-gallery {
		display: grid;
		grid-template-columns: 1fr 1fr;
		grid-template-rows: 1fr 1fr;
		align-items: center;
		margin: 80px;
		margin-top: 0;
	}

	.main-title {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		margin: 20px;
	}

	.soundcloud-wrapper {
		display: flex;
		grid-row: 2;
		grid-column: 1;
		height: 100%;
		margin: 20px;
		align-items: center;
		justify-content: center;
	}

	.soundcloud-iframe {
		width: 100%;
		height: 75%;
	}

	h1 {
		font-weight: 400;
		font-size: 250%;
	}

	.youtube-wrapper {
		grid-row: 1;
		grid-column: 2;
		position: relative;
		height: 25%;
		padding-top: 26%;
	}

	.youtube-iframe {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		max-width: 100%;
	}

	.image-wrapper {
		margin: 20px;
		border: 0;
		background: 0;
	}

	.image {
		max-width: 100%;
	}

	.image:hover {
		cursor: pointer;
	}

	.about {
		grid-row: 2;
		grid-column: 2;
		display: flex;
		flex-wrap: wrap;
		align-content: flex-end;
		flex-direction: column;
		align-items: flex-end;
		justify-content: flex-end;
		font-size: 150%;
	}

	/* Media query for larger screens */
	@media (max-width: 768px) {
		.portfolio-gallery {
			grid-template-rows: 1fr 0.5fr 1fr;
			grid-auto-rows: auto;
			grid-template-columns: 1fr;
			margin: 20px;
		}

		.image-wrapper {
			grid-row: 1;
			grid-column: 1;
		}

		.youtube-wrapper {
			grid-row: 2;
			grid-column: 1;
		}

		.soundcloud-wrapper {
			grid-row: 3;
			grid-column: 1;
		}

		.about {
			grid-row: 4;
			grid-column: 1;
		}
	}
</style>
