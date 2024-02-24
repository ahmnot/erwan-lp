<script>
	// @ts-nocheck

	import { onMount, tick } from 'svelte';

    let clickedLink = 'accueil'; // Initialize with 'accueil' as the default section
	let applyTransition = false; // Initially, do not apply transition
	let underlineStyle = 'left: 0; width: 0; transition: none;'; // Initialize with no transition

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

	function handleAnchorClick(event, linkId) {
		event.preventDefault();
		const link = event.currentTarget;
		const anchorId = new URL(link.href).hash.replace('#', '');
		const anchor = document.getElementById(anchorId);
		window.scrollTo({
			top: anchor.offsetTop - 70,
			behavior: 'smooth'
		});
		updateUnderlinePosition(link); // Update underline position when a link is clicked
	}

	async function updateUnderlinePosition(clickedElement) {
		await tick(); // Ensure DOM updates are reflected
		const { left, width } = clickedElement.getBoundingClientRect();
		const navLeft = document.querySelector('nav').getBoundingClientRect().left;
		// Conditional transition based on applyTransition flag
		const transitionStyle = applyTransition
			? 'transition: left 0.15s ease, width 0.15s ease;'
			: 'transition: none;';
		underlineStyle = `left: ${left - navLeft}px; width: ${width}px; ${transitionStyle}`;
	}

	onMount(async () => {
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
			const sections = ['accueil', 'bio', 'contact'];
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
		const debouncedUpdate = debounce(updateActiveSection, 100); // Adjust delay as needed

		window.addEventListener('scroll', debouncedUpdate);

		return () => {
			window.removeEventListener('scroll', debouncedUpdate);
		};
	});
</script>

<header>
	<nav>
		<ul>
			<li>
				<a href="/#accueil" on:click={(e) => handleAnchorClick(e, 'accueil')}>Accueil</a>
			</li>
			<li>
				<a href="/#bio" on:click={(e) => handleAnchorClick(e, 'bio')}>Bio</a>
			</li>
			<li>
				<a href="/#contact" on:click={(e) => handleAnchorClick(e, 'contact')}>Contact</a>
			</li>
		</ul>
		<!-- Underline element -->
		<div class="underline" style={underlineStyle}></div>
	</nav>
</header>

<style>
	header {
		display: flex;
		position: fixed;
		top: 0;
		right: 0;
		width: 100%;
		justify-content: space-between;
		background-color: black;
		box-shadow: 0 1px 1px rgba(255, 255, 255, 0.2);
		z-index: 1000;
		flex-direction: column;
		justify-content: start; /* Align content to the top */
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
		text-decoration: none;
		transition: color 0.2s linear;
		overflow: hidden;
	}

	a:hover {
		color: var(--color-theme-1);
	}

	/* CSS for the moving underline */
	.underline {
		position: absolute;
		bottom: 8px;
		height: 2px;
		background-color: var(--color-theme-1); /* Color of the underline */
	}
</style>
