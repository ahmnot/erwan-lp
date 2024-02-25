<script>
// @ts-nocheck

	import { createEventDispatcher, onMount, onDestroy } from 'svelte';
	export let selectedImage = '';
	export let isVisible = false;
	export let title = '';

	const dispatch = createEventDispatcher();
	// Function to close the modal
	function closeModal() {
		dispatch('close');
	}

	// Function to handle the keydown event
	function handleKeydown(event) {
		if (event.key === 'Escape') {
			closeModal();
		}
	}

	// Add the event listener when the component mounts
	onMount(() => {
        if (typeof window !== 'undefined') {
            window.addEventListener('keydown', handleKeydown);
        }
	});

	// Remove the event listener when the component is destroyed
	onDestroy(() => {
        if (typeof window !== 'undefined') {
            window.removeEventListener('keydown', handleKeydown);
        }
	});
</script>

{#if isVisible}
	<div class="lightbox-backdrop" on:click={closeModal}>
		<div class="lightbox-content" >
			<img src={selectedImage} alt={title} on:click|stopPropagation/>
			<button class="close-button" on:click={closeModal}>×</button>
		</div>
	</div>
{/if}

<style>
	.lightbox-backdrop {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.75);
		display: flex;
		justify-content: center;
		align-items: center;
		z-index: 1000;
	}

	.lightbox-content {
		position: relative;
		padding: 0px;
		box-sizing: border-box;
		max-width: 100%;
		max-height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.close-button {
		position: fixed; 
		top: 20px;
		right: 20px;
		border: none;
		background-color: transparent;
		color: white;
		font-size: 24px;
		cursor: pointer;
	}

	img {
		max-width: 75%;
		max-height: 75%;
		display: block; /* Ensures no extra space below the image */
	}
</style>
