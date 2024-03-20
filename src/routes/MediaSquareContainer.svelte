<script>
	// @ts-nocheck
	import { underlineVisible } from '$lib/underlineVisibility';
	import { onMount } from 'svelte';
	export let id = '';
	export let imageCarre = '';
	export let images = '';
	export let title = '';
	export let author = '';
	export let work = '';
	export let youtube = '';
	export let soundcloud = '';
	export let soundcloudAPINumber = '';

	let imageElement;

	let imageComplete = false;

	function handleClick() {
		underlineVisible.set(false);
	}

	function handleKeyDown(event) {
		if (event.key === 'Enter' || event.key === ' ') {
			handleClick();
		}
	}

	function handleImageLoading() {
		imageComplete = true;
	}

	onMount(() => {
		// assignments just to remove the warnings
		youtube = '';
		soundcloud = '';
		soundcloudAPINumber = '';
		if (
			imageElement &&
			imageElement.complete &&
			imageElement.naturalHeight > 0 &&
			imageElement.naturalWidth > 0
		) {
			imageComplete = true;
		}
	});
</script>

<a
	href="/{id}" 
	class="media-container"
	on:click={handleClick}
	on:keydown={handleKeyDown}
	role="button"
	tabindex="0"
>
	<div class="media-image-wrapper">
		<img
			bind:this={imageElement}
			{id}
			src={imageCarre}
			alt={title}
			class="media-image"
			style="opacity: {imageComplete
				? 1
				: 0}; transition: opacity 0.3s ease;"
			on:load={handleImageLoading}
		/>
		{#if !imageComplete}
			<div class="loading-placeholder"></div>
		{/if}
	</div>
	<div class="media-info">
		<a href="/{id}" class="media-title">{title}</a> -
		<span class="media-author">{author}</span> - 
		<div class="media-work">{work}</div>
	</div>
</a>

<style>
	.loading-placeholder {
		width: 100%;
		height: 100%;
		position: absolute;
		border: 1px solid black;
		top: 0;
		left: 0;
		background-color: #f0f0f000; /* Light grey color */
		animation: pulseAnimation 2s infinite ease-in-out;
	}

	@keyframes pulseAnimation {
		0% {
			background-color: #a8a8a828;
		}
		50% {
			background-color: #2929293a;
		}
		100% {
			background-color: #a8a8a828;
		}
	}
	.media-container {
		position: relative;
		overflow: hidden;
	}
	.media-image-wrapper {
		width: 100%;
		padding-bottom: 100%; /* Equal to width to maintain square aspect ratio */
		position: relative;
	}
	.media-image {
		position: absolute;
		object-fit: cover;
		height: 100%;
		width: 100%;
		transition: opacity 0.1s ease;
		overflow: visible;
	}
	.media-info {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		text-align: center;
		background: rgba(0, 0, 0, 0.9);
		color: white;
		visibility: hidden;
		opacity: 0;
		transition:
			visibility 0s,
			opacity 0.15s ease;
		padding: 10px;
		font-size: x-large;
	}

	.media-container:hover .media-image {
		opacity: 0.1;
	}
	.media-container:hover .media-info {
		visibility: visible;
		opacity: 1;
	}

	@media(max-width:1200px) {
		.media-info {
			font-size: small;
		}
	}

</style>
