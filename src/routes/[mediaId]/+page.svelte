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
		<button class="image-wrapper" on:click|preventDefault={() => openLightBox(image)}>
			<img src={image} alt={mediaData?.title} class="image" />
		</button>
	{/each}
	{#if mediaData?.youtube && mediaData?.youtube !== ''}
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
	{/if}
	{#if mediaData?.soundcloud && mediaData?.soundcloud !== ''}
		<div class="soundcloud-wrapper">
			<iframe
				width="100%"
				height="300"
				scrolling="no"
				frameborder="no"
				allow="autoplay"
				src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/{mediaData?.soundcloudAPINumber}&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"
				title="Soundcloud Player"
			></iframe>
			<div
				style="font-size: 10px; color: #cccccc;line-break: anywhere;word-break: normal;overflow: hidden;white-space: nowrap;text-overflow: ellipsis; font-family: Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif;font-weight: 100;"
			>
				<a
					href="https://soundcloud.com/erwanlepape"
					title="ErwanLP"
					target="_blank"
					style="color: #cccccc; text-decoration: none;">ErwanLP</a
				>
				·
				<a
					href={mediaData?.soundcloud}
					title={mediaData?.title}
					target="_blank"
					style="color: #cccccc; text-decoration: none;">{mediaData?.title}</a
				>
			</div>
		</div>
	{/if}
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
	h1 {
		font-weight: 500;
		font-size: 400%;
		margin-left: 20px;
	}

	.youtube-wrapper {
		grid-row: 1;
		grid-column: 2;
		position: relative;
		height: 25%;
	}

	.soundcloud-wrapper {
		grid-row: 2;
		grid-column: 1;
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
		display: grid;
		grid-template-columns: 1fr 1fr;
		grid-template-rows: 1fr 1fr;
		align-items: center;
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
		align-content: center;
		flex-direction: row;
		align-items: center;
		justify-content: flex-end;
		margin-right: 40px;
		font-size: 150%;
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
