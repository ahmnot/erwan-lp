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
	<button class="lightbox-backdrop" on:click={closeModal}>
		<div class="lightbox-content" >
			<img src={selectedImage} alt={title} />
			<button class="close-button" on:click={closeModal}>×</button>
		</div>
	</button>
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
		border: none;
	}

	.lightbox-content {
		position: relative;
		padding: 0px;
		box-sizing: border-box;
		max-width: 100dvw; /* Use dynamic viewport width */
		max-height: 100dvh; /* Use dynamic viewport height */
		display: flex;
		justify-content: center;
		align-items: center;
		overflow: auto;
	}

	.close-button {
		position: fixed; 
		top: 20px;
		right: 20px;
		border: none;
		background-color: transparent;
		color: white;
		font-size: 48px;
		cursor: pointer;
	}

	img {
		max-width: 90dvw; /* Constrain width to dynamic viewport width */
		max-height: 90dvh; /* Constrain height to dynamic viewport height */
		display: block;
		object-fit: contain;
	}
</style>