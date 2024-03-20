<script>
	// @ts-nocheck

	import { page } from '$app/stores';
	import { mediaList } from '$lib/mediaList';
	import { onMount } from 'svelte';
	import { underlineVisible } from '$lib/underlineVisibility';
	import LightBox from './LightBox.svelte';
	import LightYoutube from '../LightYoutube.svelte';

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

<h1 class="main-title">
	<div class="colored">{mediaData?.title}</div>
</h1>

<div class="portfolio-gallery">
	<div class="portfolio-gallery-first-column">
		{#each mediaData?.images as image}
			<button class="image-wrapper" on:click|preventDefault={() => openLightBox(image)}>
				<img src={image} alt={mediaData?.title} class="image" />
			</button>
		{/each}
	</div>

	<div class="portfolio-gallery-second-column">
		{#if mediaData?.youtube && mediaData?.youtube !== ''}
			<div class="youtube-wrapper">
				<LightYoutube videoId={mediaData?.youtube}></LightYoutube>
			</div>
		{/if}
		<div class="about">
			<h3>About</h3>
			<div class="colored">{mediaData?.title}</div>
			<div>{mediaData?.author}</div>
			<div>{mediaData?.work}</div>
			{#if mediaData?.descriptiveText && mediaData?.descriptiveText !== ''}
				<div class="smaller-text">{mediaData?.descriptiveText}</div>
			{/if}
		</div>
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
	</div>
</div>

<LightBox
	{selectedImage}
	isVisible={lightBoxVisible}
	title={mediaData?.title}
	on:close={handleClose}
/>

<style>
	.smaller-text {
		margin-top: 20px;
		font-size: medium;
	}

	.portfolio-gallery-first-column {
		grid-column: 2;
		display: grid;
	}
	.portfolio-gallery-second-column {
		grid-column: 3;
		display: grid;
		grid-template-rows: auto;
		gap: 20px;
	}
	.colored {
		color: var(--color-theme-1);
	}

	.portfolio-gallery {
		display: grid;
		grid-template-columns: 0.75fr 1fr 1fr 0.75fr;
		margin-top: 0;
		align-items: start;
	}

	.main-title {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		margin: 20px;
	}

	.soundcloud-wrapper {
		grid-row: 3;
		grid-column: 1;
		height: 100%;
		align-items: center;
		justify-content: center;
	}

	.soundcloud-iframe {
		width: 100%;
		height: 400px;
	}

	h1 {
		font-weight: 400;
	}

	.youtube-wrapper {
		margin-top: 20px;
		grid-row: 1;
	}

	.image-wrapper {
		border: 0;
		background: 0;
		padding: 20px;
	}

	.image {
		max-width: 100%;
	}

	.image:hover {
		cursor: pointer;
	}

	.about {
		grid-row: 2;
		display: flex;
		flex-wrap: wrap;
		align-content: flex-end;
		flex-direction: column;
		align-items: flex-end;
		justify-content: flex-start;
		text-align: end;
		font-size: x-large;
	}

	/* Media query for smaller screens */
	@media (max-width: 768px) {
		.portfolio-gallery-first-column {
			grid-row: 2;
			grid-column: 1;
			grid-template-columns: 1fr;
			grid-template-rows: auto;
		}
		.portfolio-gallery-second-column {
			grid-row: 1;
			grid-column: 1;
			grid-template-columns: 1fr;
			grid-template-rows: auto;
		}
		.portfolio-gallery {
			grid-template-columns: 1fr;
			grid-template-rows: auto;
			margin: 20px;
		}

		.youtube-wrapper {
			grid-row: 1;
			grid-column: 1;
		}

		.about {
			grid-row: 2;
			grid-column: 1;
		}

		.soundcloud-wrapper {
			grid-row: 3;
			grid-column: 1;
		}

		.image-wrapper {
			grid-row: 4;
			grid-column: 1;
		}
	}
</style>
