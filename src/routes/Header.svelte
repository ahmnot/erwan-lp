<script>
	// @ts-nocheck

	import { onMount, tick } from 'svelte';
	import { underlineVisible } from '$lib/underlineVisibility';
	import { goto } from '$app/navigation';

	let clickedLink = 'accueil'; // Initialize with 'accueil' as the default section
	let applyTransition = false; // Initially, do not apply transition
	let underlineStyle = 'left: 0; width: 0; transition: none;'; // Initialize with no transition
	let isResizing = false; // Flag to track if the window is currently being resized

	const sections = ['accueil', 'bio', 'contact'];

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
				top: anchor.offsetTop - 70,
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
		if(clickedElement.id === "logo-header") {
			clickedElement = document.getElementById("accueilId")
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
		const initialLink = document.querySelector('a[href="/#accueil"]');
		if (initialLink) {
			updateUnderlinePosition(initialLink);
			//clickedLink = 'accueil';
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

<header>
	<a id="logo-header" href="/#accueil" on:click={(e) => handleAnchorClick(e, 'accueil')}>
		<img
			src="\src\lib\images\autres\logo-transparent-upscale-cropped.png"
			alt="logo"
			class="logo-header"
		/>
	</a>

	<nav>
		<ul>
			<li>
				<a id="accueilId" href="/#accueil" on:click={(e) => handleAnchorClick(e, 'accueil')}>Accueil</a>
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
</header>

<style>
	.logo-header {
		height: 50px;
		flex-shrink: 0;
		margin: 20px;
	}

	header {
		display: flex;
		position: fixed;
		top: 0;
		right: 0;
		width: 100%;
		background-color: black;
		box-shadow: 0 1px 1px rgba(255, 255, 255, 0.2);
		z-index: 1000;
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
		font-weight: 700;
		font-size: 0.8rem;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		transition: color 0.2s linear;
		overflow: hidden;
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
