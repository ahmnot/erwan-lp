<script>
	// @ts-nocheck
	import { onMount, tick } from 'svelte';
	import { underlineVisible } from '$lib/underlineVisibility';
	import { goto } from '$app/navigation';
	import { fade, slide } from 'svelte/transition';

	import IconsBar from './IconsBar.svelte';

	let clickedLink = 'home';
	let applyTransition = false;
	let underlineStyle = 'left: 0; width: 0; transition: none;';
	let isResizing = false;

	let navElement; // Caching the nav element
	let logoImageElement;
	let logoImageComplete = false;

	const sections = ['home', 'music', 'bio', 'contact'];
	let isHamburgerExpanded = false;

	function handleLogoImageLoading() {
		logoImageComplete = true;
	}

	function hamburgerClickHandler() {
		isHamburgerExpanded = !isHamburgerExpanded;
	}

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
	// It waits for "wait" milliseconds of inactivity before executing, reducing excessive processing and improving responsiveness.
	function debounce(func, wait) {
		let timeout;
		return function (...args) {
			clearTimeout(timeout);
			timeout = setTimeout(() => {
				func.apply(this, args);
			}, wait);
		};
	}

	// Use the debounce function to detect the end of resizing
	const onResizeEnd = debounce(() => {
		isResizing = false; // Reset the flag
	}, 100);

	const resizeBegins = () => {
		if (!isResizing) {
			isResizing = true; // Mark as resizing
			requestAnimationFrame(continuousUpdateUnderline); // Start the loop
		}
	};

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
		if (clickedElement !== null) {
			await tick();
			if (clickedElement.id === 'logo-header-id') {
				clickedElement = document.getElementById('homeId');
			}
			const { left, width } = clickedElement.getBoundingClientRect();
			const navLeft = navElement.getBoundingClientRect().left;
			const transitionStyle =
				applyTransition && applyTransitionFlag
					? 'transition: left 0.15s ease, width 0.15s ease;'
					: 'transition: none;';
			underlineStyle = `left: ${left - navLeft}px; width: ${width}px; ${transitionStyle}`;
		}
	}

	onMount(async () => {
		navElement = document.querySelector('nav'); // Cache nav element once

		if (
			logoImageElement &&
			logoImageElement.complete &&
			logoImageElement.naturalHeight > 0 &&
			logoImageElement.naturalWidth > 0
		) {
			logoImageComplete = true;
		}
		underlineVisible.set(true);
		const initialLink = document.querySelector('a[href="/#home"]');
		if (initialLink) {
			updateUnderlinePosition(initialLink);
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
					element.offsetTop - 110 <= scrollPosition &&
					element.offsetTop + element.offsetHeight - 110 > scrollPosition
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
		window.addEventListener('resize', resizeBegins);

		window.addEventListener('resize', onResizeEnd);

		return () => {
			window.removeEventListener('scroll', debouncedUpdate);
			window.removeEventListener('resize', resizeBegins);
			window.removeEventListener('resize', onResizeEnd);
		};
	});
</script>

<header class="header-large">
	<a id="logo-header-id" href="/#home" on:click={(e) => handleAnchorClick(e, 'home')}>
		<!-- !logoImageComplete -->
		{#if !logoImageComplete}
			<div transition:fade={{ duration: 150 }} class="logo-placeholder"></div>
		{/if}
		<img
			bind:this={logoImageElement}
			class="logo-header"
			src="/logo-1.webp"
			alt="logo"
			on:load={handleLogoImageLoading}
		/>
	</a>

	<nav class="nav-header-large">
		<ul class="ul-header-large">
			<li>
				<a id="homeId" href="/#home" on:click={(e) => handleAnchorClick(e, 'home')}>Home</a>
			</li>
			<li>
				<a href="/#music" on:click={(e) => handleAnchorClick(e, 'music')}>Music</a>
			</li>
			<li>
				<a href="/#bio" on:click={(e) => handleAnchorClick(e, 'bio')}>Bio</a>
			</li>
			<li>
				<a href="/#contact" on:click={(e) => handleAnchorClick(e, 'contact')}>Contact</a>
			</li>
		</ul>
		<div
			class="underline"
			style={underlineStyle + ($underlineVisible ? 'display: block;' : 'display: none;')}
		></div>

		<div class="header-socials-show">
			<IconsBar />
		</div>

		<div class="header-socials-column-show">
			<IconsBar columnize={true} />
		</div>
	</nav>
</header>
<header class="header-small">
	<nav class="nav-header-small">
		<button class="material-symbols-outlined" on:click={hamburgerClickHandler}
			>{isHamburgerExpanded ? 'close' : 'menu'}</button
		>

		<a
			id="logo-header-id"
			href="/#home"
			on:click={(e) => handleAnchorClick(e, 'home')}
			class="link-header-centered"
		>
			<img class="logo-header-centered" src="/logo-1.webp" alt="logo" />
		</a>
		{#if isHamburgerExpanded}

			<ul class="hamburger-menu" in:slide={{ duration: 300}} out:fade={{ duration: 60 }}>
				<li>
					<a id="homeId" href="/#home" on:click={(e) => handleAnchorClick(e, 'home')}>Home</a>
				</li>
				<li>
					<a href="/#music" on:click={(e) => handleAnchorClick(e, 'music')}>Music</a>
				</li>
				<li>
					<a href="/#bio" on:click={(e) => handleAnchorClick(e, 'bio')}>Bio</a>
				</li>
				<li>
					<a href="/#contact" on:click={(e) => handleAnchorClick(e, 'contact')}>Contact</a>
				</li>
			</ul>
		{/if}
	</nav>
</header>

<style>

	.hamburger-menu {
		position: absolute;
		top: 90px; 
		left: 20px;
		margin: 0;
		display: flex;
		flex-direction: column;
		align-items: baseline;
	}

	.logo-placeholder {
		display: flex;
		position: absolute;
		height: 50px;
		width: 174px;
		margin: 20px;
		background-color: var(--color-bg-0);
		justify-content: center;
		align-items: center;
	}

	/* Base case: Assume small screens first */
	.header-socials-column-show {
		display: none; /* Hide by default */
	}
	.header-socials-show {
		display: none; /* Hide by default */
	}

	/* Medium screens: Between 831px and 1040px */
	@media (min-width: 831px) and (max-width: 1040px) {
		.header-socials-column-show {
			display: flex; /* Now show this for medium screens */
		}
		.header-socials-show {
			display: none; /* Hide the other one on medium screens */
		}
	}

	/* Large screens: Above 1040px */
	@media (min-width: 1041px) {
		.header-socials-column-show {
			display: none; /* Ensure this is hidden on large screens */
		}
		.header-socials-show {
			display: flex; /* And this one is shown on large screens */
		}
	}

	@media (max-width: 600px) {
		.nav-header-small {
			position: relative;
			display: flex;
			justify-content: center;
		}

		ul.hamburger-menu {
			position: absolute;
			padding: 0;
			margin: 20px;
			height: 3em;
			display: flex;
			justify-content: flex-start;
			align-items: baseline;
			flex-direction: column;
			top: 40px;
			left: 0px;
			list-style: none;
		}
		.header-small {
			display: flex;
		}
		.header-large {
			display: none;
		}
	}

	@media (min-width: 601px) {
		.header-small {
			display: none;
		}
		.header-large {
			display: flex;
		}
	}

	.nav-header-large {
		position: relative;
		display: flex;
		justify-content: center;
	}

	ul.ul-header-large {
		position: relative;
		padding: 0;
		margin: 0;
		height: 3em;
		display: flex;
		justify-content: center;
		align-items: center;
		list-style: none;
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
		padding: 0 10px;
		color: var(--color-text);
		font-weight: 500;
		font-size: 1.2rem;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		transition: color 0.2s linear;
	}

	.material-symbols-outlined {
		margin: 20px;
		color: var(--color-text);
		background-color: var(--color-bg-0);
		border: none;
		cursor: pointer;
		font-size: xx-large;
	}

	.link-header-centered {
		position: fixed;
		left: 50%;
		transform: translate(-50%);
		height: 50px;
		margin-top: 20px;
		margin-bottom: 20px;
		padding: 0;
	}

	.logo-header-centered {
		height: 50px;
	}

	.logo-header {
		width: 174px;
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
		flex-direction: row;
		justify-content: start;
		align-items: center;
	}

	a:hover {
		color: var(--color-theme-1);
	}

	.underline {
		position: absolute;
		bottom: 0px;
		height: 2px;
		background-color: var(--color-theme-1);
	}
</style>
