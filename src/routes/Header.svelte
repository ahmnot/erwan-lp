<script>
	// @ts-nocheck
	import { onMount, tick } from 'svelte';
	import { underlineVisible } from '$lib/underlineVisibility';
	import { goto } from '$app/navigation';

	let clickedLink = 'home'; // Initialize with 'home' as the default section
	let applyTransition = false; // Initially, do not apply transition
	let underlineStyle = 'left: 0; width: 0; transition: none;'; // Initialize with no transition
	let isResizing = false; // Flag to track if the window is currently being resized

	let innerwidth = 0;

	$: innerWidth = 0;

	const sections = ['home', 'bio', 'contact'];

	// Function to update the underline position
	function continuousUpdateUnderline() {
		if (!isResizing) return; // Stop the loop if resizing has ended

		const activeLink = document.querySelector(`a[href="/#${clickedLink}"]`);
		if (activeLink) {
			updateUnderlinePosition(activeLink, false); // Use your existing function to update the position
		}

		requestAnimationFrame(continuousUpdateUnderline); // Continue the loop
	}

	// Debounce function limits the rate of execution of updateActiveSection to enhance performance and ensure smooth UI updates on scroll.
	// It waits for 100ms of inactivity before executing, reducing excessive processing and improving responsiveness.
	function debounce(func, wait) {
		let timeout;
		return function (...args) {
			clearTimeout(timeout);
			timeout = setTimeout(() => {
				func.apply(this, args);
			}, wait);
		};
	}

	// To detect when resizing ends, you may need an additional event listener or logic
	// One approach is to debounce a function that sets isResizing to false
	function debounceEndResize(func, wait) {
		let timeout;
		return function (...args) {
			clearTimeout(timeout);
			timeout = setTimeout(() => {
				func.apply(this, args);
			}, wait);
		};
	}

	// Use the debounce function to detect the end of resizing
	const onResizeEnd = debounceEndResize(() => {
		isResizing = false; // Reset the flag
	}, 100);

	async function handleAnchorClick(event, linkId) {
		underlineVisible.set(true);
		event.preventDefault();
		const link = event.currentTarget;
		const anchorId = new URL(link.href).hash.replace('#', '');
		const anchor = document.getElementById(anchorId);
		if (anchor) {
			// If the anchor exists in the current document, scroll to it
			window.scrollTo({
				top: anchor.offsetTop - 100,
				behavior: 'smooth'
			});
		} else {
			// If the anchor doesn't exist, use goto to navigate to the target page
			// Assuming the link's href attribute contains the path to navigate to
			await goto(link.href);
			handleAnchorClick(event);
		}
		updateUnderlinePosition(link); // Update underline position when a link is clicked
	}

	async function updateUnderlinePosition(clickedElement, applyTransitionFlag = true) {
		await tick();
		if (clickedElement.id === 'logo-header-id') {
			clickedElement = document.getElementById('homeId');
		}
		const { left, width } = clickedElement.getBoundingClientRect();
		const navLeft = document.querySelector('nav').getBoundingClientRect().left;
		const transitionStyle =
			applyTransition && applyTransitionFlag // Use a flag to control transition application
				? 'transition: left 0.15s ease, width 0.15s ease;'
				: 'transition: none;';
		underlineStyle = `left: ${left - navLeft}px; width: ${width}px; ${transitionStyle}`;
	}

	onMount(async () => {
		underlineVisible.set(true);
		const initialLink = document.querySelector('a[href="/#home"]');
		if (initialLink) {
			updateUnderlinePosition(initialLink);
			//clickedLink = 'home';
		}

		// Use next tick to ensure the DOM updates are applied
		await tick();
		// After setting the initial position, enable transitions for future updates
		applyTransition = true;

		function updateActiveSection() {
			let currentSection = '';

			sections.forEach((section) => {
				const element = document.getElementById(section);
				if (!element) return;

				const scrollPosition = window.scrollY;
				if (
					element.offsetTop - 70 <= scrollPosition &&
					element.offsetTop + element.offsetHeight - 70 > scrollPosition
				) {
					currentSection = section;
				}
			});

			if (clickedLink !== currentSection) {
				clickedLink = currentSection;
				const activeLink = document.querySelector(`a[href="/#${clickedLink}"]`);
				if (activeLink) updateUnderlinePosition(activeLink); // Update underline for scrolled section
			}
		}

		// Debounced update function
		const debouncedUpdate = debounce(updateActiveSection, 20); // Adjust delay as needed

		window.addEventListener('scroll', debouncedUpdate);

		// Enhanced resize event listener using requestAnimationFrame
		window.addEventListener('resize', () => {
			if (!isResizing) {
				isResizing = true; // Mark as resizing
				requestAnimationFrame(continuousUpdateUnderline); // Start the loop
			}
		});

		window.addEventListener('resize', onResizeEnd);

		return () => {
			window.removeEventListener('scroll', debouncedUpdate);
		};
	});
</script>

<svelte:window bind:innerWidth />

<header>
	{#if innerWidth > 480}
		<a id="logo-header-id" href="/#home" on:click={(e) => handleAnchorClick(e, 'home')}>
			<img src="/src/lib/images/autres/logo-1.png" alt="logo" class="logo-header" />
		</a>

		<nav>
			<ul>
				<li>
					<a id="homeId" href="/#home" on:click={(e) => handleAnchorClick(e, 'home')}>home</a>
				</li>
				<li>
					<a href="/#bio" on:click={(e) => handleAnchorClick(e, 'bio')}>Bio</a>
				</li>
				<li>
					<a href="/#contact" on:click={(e) => handleAnchorClick(e, 'contact')}>Contact</a>
				</li>
			</ul>
			<!-- Underline element -->
			<div
				class="underline"
				style={underlineStyle + ($underlineVisible ? 'display: block;' : 'display: none;')}
			></div>
		</nav>
	{:else}
		<nav>
			<span class="material-symbols-outlined">menu</span>

			<a id="logo-header-id" href="/#home" on:click={(e) => handleAnchorClick(e, 'home')} class="link-header-centered" >
				<img src="/src/lib/images/autres/logo-1.png" alt="logo" class="logo-header-centered" />
			</a>
		</nav>
	{/if}
</header>

<style>
	.material-symbols-outlined {
		margin: 20px;
	}

	.link-header-centered {
		position:relative;
		left: 50%;
		transform: translateX(-50%);
		height: 50px;
		margin: 20px;
		padding: 0;
	}

	.logo-header-centered {
		height: 50px;
	}

	.logo-header {
		height: 50px;
		margin: 20px;
	}

	header {
		display: flex;
		position: fixed;
		top: 0;
		right: 0;
		width: 100%;
		background-color: black;
		/*box-shadow: 0 1px 1px rgba(255, 255, 255, 0.2);*/
		z-index: 999;
		flex-direction: row; /* Align items in a row */
		justify-content: start; /* Align items to the start of the container */
		align-items: center; /* Center items vertically */
	}

	nav {
		position: relative;
		display: flex;
		justify-content: center;
		--background: rgba(255, 255, 255, 0.7);
	}

	ul {
		position: relative;
		padding: 0;
		margin: 0;
		height: 3em;
		display: flex;
		justify-content: center;
		align-items: center;
		list-style: none;
		background: var(--background);
		background-size: contain;
		background-color: transparent;
	}

	li {
		position: relative;
		height: 100%;
	}

	nav a {
		display: flex;
		height: 100%;
		align-items: center;
		padding: 0 0.5rem;
		color: var(--color-text);
		font-weight: 500;
		font-size: 1.2rem;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		transition: color 0.2s linear;
	}

	a:hover {
		color: var(--color-theme-1);
	}

	/* CSS for the moving underline */
	.underline {
		position: absolute;
		bottom: 0px;
		height: 2px;
		background-color: var(--color-theme-1); /* Color of the underline */
	}
</style>
