<script>
	// @ts-nocheck
	import { underlineVisible } from '$lib/underlineVisibility';
	import { onMount } from 'svelte';
	import { spring } from 'svelte/motion';
	
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
	
	// Tilt effect variables - ADDED CODE START
	let ref;
	let lastY = 0;
	
	const x = $state(0);
	const y = $state(0);
	const rotateX = $state(0);
	const rotateY = $state(0);
	const scale = $state(1);
	const opacity = $state(0);
	const rotateFigcaption = $state(0);

	let rotateXSpring;
	let rotateYSpring;
	let scaleSpring;
	let opacitySpring;
	let rotateFigcaptionSpring;

	$effect(() => {
		rotateXSpring = spring(rotateX, { stiffness: 100, damping: 30, mass: 2 });
		rotateYSpring = spring(rotateY, { stiffness: 100, damping: 30, mass: 2 });
		scaleSpring = spring(scale, { stiffness: 100, damping: 30, mass: 2 });
		opacitySpring = spring(opacity, { stiffness: 100, damping: 30, mass: 2 });
		rotateFigcaptionSpring = spring(rotateFigcaption, { stiffness: 350, damping: 30, mass: 1 });
	});

	function handleMouse(e) {
		if (!ref) return;

		const rect = ref.getBoundingClientRect();
		const offsetX = e.clientX - rect.left - rect.width / 2;
		const offsetY = e.clientY - rect.top - rect.height / 2;

		const rotationX = (offsetY / (rect.height / 2)) * -14;
		const rotationY = (offsetX / (rect.width / 2)) * 14;

		rotateX = rotationX;
		rotateY = rotationY;

		x = e.clientX - rect.left;
		y = e.clientY - rect.top;

		const velocityY = offsetY - lastY;
		rotateFigcaption = -velocityY * 0.6;
		lastY = offsetY;
	}

	function handleMouseEnter() {
		scale = 1.05; // Slightly reduced scale to work better with your existing hover effect
		opacity = 1;
	}

	function handleMouseLeave() {
		opacity = 0;
		scale = 1;
		rotateX = 0;
		rotateY = 0;
		rotateFigcaption = 0;
	}
	// ADDED CODE END

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
    bind:this={ref}
    on:mousemove={handleMouse}
    on:mouseenter={handleMouseEnter}
    on:mouseleave={handleMouseLeave}
>
    <div 
        class="tilted-card-inner"
        style="transform: rotateX({rotateXSpring}deg) rotateY({rotateYSpring}deg) scale({scaleSpring})"
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
    </div>
</a>

<figcaption
    class="tilted-card-caption"
    style="left: {x}px; top: {y}px; opacity: {opacitySpring}; transform: rotate({rotateFigcaptionSpring}deg)"
>
    {title}
</figcaption>

<style>
	/* ADDED TILT EFFECT STYLES START */
	.media-container {
		position: relative;
		overflow: hidden;
		perspective: 800px; /* Added for 3D effect */
	}
	/* ADD THESE CSS RULES to your existing style section */

	.media-container {
    	perspective: 800px; /* This enables 3D space */
	}

	.tilted-card-inner {
    	transform-style: preserve-3d; /* This allows child elements to exist in 3D space */
    	width: 100%;
    	height: 100%;
    	transition: transform 0.1s ease-out;
	}

	.media-image {
    	transform: translateZ(0); /* Optimizes 3D rendering */
    	will-change: transform; /* Performance optimization */
	}

	.media-info {
    	transform: translateZ(20px); /* Makes the info appear above the image in 3D space */
    	z-index: 5;
	}

	.tilted-card-caption {
    	pointer-events: none;
    	position: absolute;
    	left: 0;
    	top: 0;
   		border-radius: 4px;
   	 	background-color: #fff;
    	padding: 4px 10px;
    	font-size: 10px;
    	color: #2d2d2d;
    	opacity: 0;
    	z-index: 10;
	}

	@media (max-width: 640px) {
    	.tilted-card-caption {
        	display: none;
    	}
    	.media-container {
        	perspective: 0; /* Disable 3D on mobile */
    	}
	}	
	

	.tilted-card-inner {
		position: relative;
		transform-style: preserve-3d;
		width: 100%;
		height: 100%;
		transition: transform 0.1s ease-out; /* Smooth tilt transitions */
	}

	.tilted-card-caption {
		pointer-events: none;
		position: absolute;
		left: 0;
		top: 0;
		border-radius: 4px;
		background-color: #fff;
		padding: 4px 10px;
		font-size: 10px;
		color: #2d2d2d;
		opacity: 0;
		z-index: 10; /* Increased z-index to appear above other elements */
	}

	@media (max-width: 640px) {
		.tilted-card-caption {
			display: none;
		}
		.media-container {
			perspective: 0; /* Disable 3D on mobile for better performance */
		}
	}
	/* ADDED TILT EFFECT STYLES END */

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
		padding-bottom: 100%; /* Equal to width to maintain square aspect ratio */
		position: relative;
	}

	.media-image {
		position: absolute;
		object-fit: cover;
		height: 100%;
		width: 100%;
		transition: opacity 0.1s ease;
		/* Added for better 3D rendering */
		transform: translateZ(0);
		will-change: transform;
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
		/* Added for 3D positioning */
		transform: translateZ(20px);
		z-index: 5;
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