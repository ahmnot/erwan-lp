<script>
	// @ts-nocheck
	import { onMount, tick } from 'svelte';
	import { underlineVisible } from '$lib/underlineVisibility';
	import { goto } from '$app/navigation';
	import { fade, slide } from 'svelte/transition';
	import { expoIn } from 'svelte/easing';

	let clickedLink = 'home'; // Initialize with 'home' as the default section
	let applyTransition = false; // Initially, do not apply transition
	let underlineStyle = 'left: 0; width: 0; transition: none;'; // Initialize with no transition
	let isResizing = false; // Flag to track if the window is currently being resized

	let innerWidth = 0;
	let innerWidthMenuLimit = 600;
	let innerWidthSocialsLimit = 1050;

	$: innerWidth = 0;

	const sections = ['home', 'music', 'bio', 'contact'];

	let isHamburgerExpanded = false;
	let isPhoneShown = false;
	let isMailShown = false;

	function hamburgerClickHandler() {
		isHamburgerExpanded = !isHamburgerExpanded;
	}

	function phoneClickHandler() {
		isPhoneShown = !isPhoneShown;
	}

	function mailClickHandler() {
		isMailShown = !isMailShown;
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
		if (innerWidth > innerWidthMenuLimit && clickedElement !== null) {
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
	}

	onMount(async () => {
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
		window.addEventListener('resize', resizeBegins);

		window.addEventListener('resize', onResizeEnd);

		return () => {
			window.removeEventListener('scroll', debouncedUpdate);
			window.removeEventListener('resize', resizeBegins);
			window.removeEventListener('resize', onResizeEnd);
		};
	});
</script>

<svelte:window bind:innerWidth />

<header>
	{#if innerWidth > innerWidthMenuLimit}
		<a id="logo-header-id" href="/#home" on:click={(e) => handleAnchorClick(e, 'home')}>
			<img src="/logo-1.png" alt="logo" class="logo-header" />
		</a>

		<nav>
			<ul>
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
			<!-- Underline element -->
			<div
				class="underline"
				style={underlineStyle + ($underlineVisible ? 'display: block;' : 'display: none;')}
			></div>

			{#if innerWidth > innerWidthSocialsLimit}
			<ul class="socials">
				<li>
					<button class="phone-icon-button" on:click={phoneClickHandler}>
						<img class="phone-icon" src="/icons/phone.png" alt="Phone Icon" />
					</button>
					{#if isPhoneShown}
						<div class="phone-box" transition:fade={{ duration: 60 }}>
							+33 6 47 86 26 23
						</div>
					{/if}
				</li>
				<li>
					<button class="mail-icon-button" on:click={mailClickHandler}>
						<img class="mail-icon" src="/icons/mail.png" alt="Mail Icon" />
					</button>
					{#if isMailShown}
						<div class="email-box" transition:fade={{ duration: 60 }}>
							erwanlepape@outlook.com
						</div>
					{/if}
				</li>
				<li>
					<a class="soundcloud-icon-link" href="https://soundcloud.com/erwanlepape" target="_blank">
						<img class="soundcloud-icon" src="/icons/soundcloud.png" alt="Soundcloud Link" />
					</a>
				</li>
				<li>
					<a class="instagram-icon-link" href="https://www.instagram.com/erwanklp/" target="_blank">
						<img class="instagram-icon" src="/icons/instagram.png" alt="Instagram Link" />
					</a>
				</li>
			</ul>
			{/if}
		</nav>
	{:else}
		<nav>
			<button class="material-symbols-outlined" on:click={hamburgerClickHandler}
				>{isHamburgerExpanded ? 'close' : 'menu'}</button
			>

			<a
				id="logo-header-id"
				href="/#home"
				on:click={(e) => handleAnchorClick(e, 'home')}
				class="link-header-centered"
			>
				<img src="/logo-1.png" alt="logo" class="logo-header-centered" />
			</a>
			<!-- isHamburgerExpanded -->
			{#if isHamburgerExpanded}
				<ul class="hamburger-menu" in:slide={{ duration: 300 }} out:fade={{ duration: 60 }}>
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
	{/if}
</header>

<style>
	.phone-box {
		position:absolute;
		top:50%;
		right:120%;
		transform: translateX(50%);
		transform: translateY(-50%);
		font-size: larger;
		white-space: nowrap;
		opacity: 1;
		color:white ;
	}
	
	.email-box {
		position:absolute;
		right:50%;
		transform: translate(50%);
		font-size: larger;
		opacity: 1;
		color:white;
	}

	.socials {
		display: flex;
		position: fixed;
		right: 0px;
		opacity: 0.7;
	}

	.phone-icon-button {
		margin-right: 20px;
		padding: 0px;
		background: none;
		border: none;
	}

	.phone-icon {
		filter: grayscale(1);
		transition: 0.1s filter linear;
	}

	.phone-icon:hover {
		filter: grayscale(0);
		cursor: pointer;
	}

	.mail-icon-button {
		margin-right: 20px;
		padding: 0px;
		background: none;
		border: none;
	}

	.mail-icon {
		filter: grayscale(1);
		transition: 0.1s filter linear;
	}

	.mail-icon:hover {
		filter: grayscale(0);
		cursor: pointer;
	}

	.instagram-icon-link {
		margin-right: 20px;
		padding: 0px;
	}

	.instagram-icon {
		filter: grayscale(1);
		transition: 0.1s filter linear;
	}

	.instagram-icon:hover {
		filter: grayscale(0);
	}

	.soundcloud-icon-link {
		margin-right: 20px;
		padding: 0px;
	}

	.soundcloud-icon {
		filter: grayscale(1);
		transition: 0.1s filter linear;
	}

	.soundcloud-icon:hover {
		filter: grayscale(0);
	}

	nav {
		position: relative;
		display: flex;
		justify-content: center;
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

	@media (max-width: 600px) {
		nav {
			position: relative;
			display: flex;
			justify-content: center;
		}

		ul {
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
		}
	}

	.material-symbols-outlined {
		margin: 20px;
		color: var(--color-text);
		background-color: var(--color-bg-0);
		border: none;
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
