<script>
	// @ts-nocheck
	import { fade, fly } from 'svelte/transition';
	import { underlineVisible } from '$lib/underlineVisibility';
	import { afterUpdate, onMount, tick } from 'svelte';
	export let id = '';
	export let images = [];
	export let title = '';
	export let author = '';
	export let type = '';
	export let work = '';
	export let youtube = '';
	export let soundcloud = '';
	export let horizontalOffset = '0%';
	export let verticalOffset = '0%';

	let imageElement;

	let imageComplete = false;

	function handleClick() {
		underlineVisible.set(false);
	}

	function handleImageLoading() {
		imageComplete = true;
	}

	onMount(() => {
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

<!-- svelte-ignore a11y-no-static-element-interactions -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="media-container" on:click={handleClick}>
	<a href="/{id}" class="media-title">
		<div class="media-image-wrapper">
			<img
				bind:this={imageElement}
				{id}
				src={images[0]}
				alt={title}
				class="media-image"
				style="--horizontal-offset: {horizontalOffset}; --vertical-offset: {verticalOffset}; opacity: {imageComplete
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
			<span class="media-author">{author}</span>
			<div class="media-type">{type}</div>
			<div class="media-work">{work}</div>
		</div>
	</a>
</div>

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
		height: calc(100% + var(--vertical-offset));
		width: calc(100% + var(--horizontal-offset));
		transition: opacity 0.1s ease;
		left: var(--horizontal-offset, 0%);
		top: var(--vertical-offset, 0%);
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
		background: rgba(0, 0, 0, 0.5);
		color: white;
		visibility: hidden;
		opacity: 0;
		transition:
			visibility 0s,
			opacity 0.2s ease;
		padding: 10px;
	}

	.media-container:hover .media-image {
		opacity: 0.3;
	}
	.media-container:hover .media-info {
		visibility: visible;
		opacity: 1;
	}
</style>
