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
	export let descriptiveText = '';

	let imageElement;
	let imageComplete = false;
	
	// Tilt effect variables
	let container;
	let rotateX = 0;
	let rotateY = 0;
	let scale = 1;
	let tooltipVisible = false;
	let tooltipX = 0;
	let tooltipY = 0;

	function handleMouseMove(e) {
		if (!container) return;

		const rect = container.getBoundingClientRect();
		const offsetX = e.clientX - rect.left - rect.width / 2;
		const offsetY = e.clientY - rect.top - rect.height / 2;

		rotateX = (offsetY / (rect.height / 2)) * -10;
		rotateY = (offsetX / (rect.width / 2)) * 10;
		
		tooltipX = e.clientX - rect.left;
		tooltipY = e.clientY - rect.top;
	}

	function handleMouseEnter() {
		scale = 1.05;
		tooltipVisible = true;
	}

	function handleMouseLeave() {
		scale = 1;
		rotateX = 0;
		rotateY = 0;
		tooltipVisible = false;
	}

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

<div class="tilt-container">
	<a
		href="/{id}" 
		class="media-container"
		on:click={handleClick}
		on:keydown={handleKeyDown}
		role="button"
		tabindex="0"
		bind:this={container}
		on:mousemove={handleMouseMove}
		on:mouseenter={handleMouseEnter}
		on:mouseleave={handleMouseLeave}
		style="transform: perspective(800px) rotateX({rotateX}deg) rotateY({rotateY}deg) scale({scale});"
	>
		<div class="media-image-wrapper">
			<img
				bind:this={imageElement}
				{id}
				src={imageCarre}
				alt={title}
				class="media-image"
				style="opacity: {imageComplete ? 1 : 0}; transition: opacity 0.3s ease;"
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

	{#if tooltipVisible}
		<div 
			class="tilt-tooltip"
			style="left: {tooltipX}px; top: {tooltipY}px;"
		>
			{title}
		</div>
	{/if}
</div>

<style>
	.tilt-container {
		position: relative;
		width: 100%;
		height: 100%;
	}

	.media-container {
		position: relative;
		overflow: hidden;
		display: block;
		width: 100%;
		height: 100%;
		transition: transform 0.1s ease-out;
		transform-style: preserve-3d;
	}

	.tilt-tooltip {
		position: absolute;
		pointer-events: none;
		background: white;
		color: black;
		padding: 5px 10px;
		border-radius: 4px;
		font-size: 12px;
		white-space: nowrap;
		z-index: 100;
		transform: translate(-50%, -100%);
		margin-top: -10px;
	}

	.media-image {
		transform: translateZ(0);
	}

	.media-info {
		transform: translateZ(20px);
	}

	@media (max-width: 640px) {
		.tilt-tooltip {
			display: none;
		}
		.media-container {
			transform: none !important;
		}
	}

	.loading-placeholder {
		width: 100%;
		height: 100%;
		position: absolute;
		border: 1px solid black;
		top: 0;
		left: 0;
		background-color: #f0f0f000;
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

	.media-image-wrapper {
		width: 100%;
		padding-bottom: 100%;
		position: relative;
	}

	.media-image {
		position: absolute;
		object-fit: cover;
		height: 100%;
		width: 100%;
		transition: opacity 0.1s ease;
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