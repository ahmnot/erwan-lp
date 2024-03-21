<script>
	// @ts-nocheck
	import { onMount, tick } from 'svelte';
	import { underlineVisible } from '$lib/underlineVisibility';
	import { goto } from '$app/navigation';
	import { fade, slide } from 'svelte/transition';

	import IconsBar from './IconsBar.svelte';
	let hamburgerMenuElement;

	let innerHeight;
	let scrollY;
	let clickedLink = 'home';
	let applyTransition = false;
	let underlineStyle = 'left: 0; width: 0; transition: none;';

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

	function closeHamburgerMenuOnOutsideClick(event) {
		if (isHamburgerExpanded && (!hamburgerMenuElement.contains(event.target) && !event.target.closest('.icon-button-or-link'))) {
			hamburgerClickHandler();
		}
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

	async function handleAnchorClick(event) {
		underlineVisible.set(true);
		event.preventDefault();
		const link = event.currentTarget;
		const anchorId = new URL(link.href).hash.replace('#', '');
		const anchor = document.getElementById(anchorId);

		if (anchor) {
			if (anchorId === 'home') {
				// If the anchor ID is 'home', scroll to the top of the window
				window.scrollTo({
					top: 0,
					behavior: 'smooth'
				});
			} else {
			// If the anchor exists in the current document, scroll to it
			window.scrollTo({
				top: anchor.offsetTop,
				behavior: 'smooth'
			});
		}
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
			if (clickedElement.id === 'logo-header-id-large' || clickedElement.id === 'logo-header-id-small') {
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

	let updateActiveSection = () => {};

	// Debounced update function
	const debouncedUpdate = debounce(() => {
		updateActiveSection();
	}, 20); // Adjust delay as needed

	// We use a reactive statement to react to changes in scrollY, which is bound to window's scroll position.
	$: scrollY, debouncedUpdate();
	onMount(async () => {
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

		navElement = document.querySelector('nav');

		if (initialLink) {
			updateUnderlinePosition(initialLink);
		}

		await tick();
		applyTransition = true;

		updateActiveSection = () => {
			let currentSection = '';

			if (innerHeight + scrollY >= document.body.offsetHeight - 1) {
				// If the user has scrolled to the bottom of the page, set 'contact' as the current section
				currentSection = 'contact';
    		} else {
			sections.forEach((section) => {
				const element = document.getElementById(section);
				if (!element) return;

				const scrollPosition = scrollY;
				if (
					element.offsetTop - 100 <= scrollPosition &&
					element.offsetTop + element.offsetHeight - 100 > scrollPosition
				) {
					currentSection = section;
				}
			});
		}

			if (clickedLink !== currentSection) {
				clickedLink = currentSection;
				const activeLink = document.querySelector(`a[href="/#${clickedLink}"]`);
				if (activeLink) updateUnderlinePosition(activeLink);
			}
		};

		document.addEventListener('click', closeHamburgerMenuOnOutsideClick);

	});
</script>

<svelte:window bind:innerHeight bind:scrollY />

<header class="header-large">
	<a id="logo-header-id-large" href="/#home" on:click={(e) => handleAnchorClick(e)}>
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
				<a id="homeId" href="/#home" on:click={(e) => handleAnchorClick(e)}>Home</a>
			</li>
			<li>
				<a href="/#music" on:click={(e) => handleAnchorClick(e)}>Music</a>
			</li>
			<li>
				<a href="/#bio" on:click={(e) => handleAnchorClick(e)}>Bio</a>
			</li>
			<li>
				<a href="/#contact" on:click={(e) => handleAnchorClick(e)}>Contact</a>
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
		<button class="icon-button-or-link" on:click={hamburgerClickHandler}>
			<img
				class="icon-normal"
				src="/icons/{isHamburgerExpanded ? 'close' : 'menu'}.webp"
				alt="menu"
			/>
		</button>

		<a
			id="logo-header-id-small"
			href="/#home"
			on:click={(e) => handleAnchorClick(e, 'home')}
			class="link-header-centered"
		>
			<img class="logo-header-centered" src="/logo-1.webp" alt="logo" />
		</a>
		{#if isHamburgerExpanded}
			<ul class="hamburger-menu" in:slide={{ duration: 200 }} out:fade={{ duration: 50 }} bind:this={hamburgerMenuElement}>
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
	.icon-button-or-link {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 40px;
		height: 40px;
		margin: 20px;
		padding: 0px;
		background: none;
		border: none;
		cursor: pointer;
	}

	.icon-normal {
		width: 40px;
		height: 40px;
		margin: auto; /* Center the icon */
		display: block;
		filter: grayscale(1);
		transition: 0.1s filter linear;
		cursor: pointer;
	}

	.icon-normal:hover {
		filter: grayscale(0.5);
		cursor: pointer;
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
	@media (min-width: 1200px) and (max-width: 1330px) {
		.header-socials-column-show {
			display: flex; /* Now show this for medium screens */
		}
		.header-socials-show {
			display: none; /* Hide the other one on medium screens */
		}
	}

	/* Large screens: Above 1040px */
	@media (min-width: 1331px) {
		.header-socials-column-show {
			display: none; /* Ensure this is hidden on large screens */
		}
		.header-socials-show {
			display: flex; /* And this one is shown on large screens */
			margin-right: 40px;
		}
	}

	@media (max-width: 840px) {
		.nav-header-small {
			position: relative;
			display: flex;
			justify-content: center;
			align-items: center;
		}

		ul.hamburger-menu {
			position: absolute;
			margin:0;
			padding-top: 20px;
			padding-bottom: 20px;
			padding-left: 0;
			height: 150%;
			display: flex;
			justify-content: center;
			align-items: baseline;
			flex-direction: column;
			top: 60px;
			left: 0px;
			list-style: none;
			background-color: rgb(0, 0, 0, 0.9);
		}
		.header-small {
			height: 80px;
			display: flex;
		}
		.header-large {
			display: none;
		}
	}

	@media (min-width: 841px) {
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
		padding: 0 30px;
		color: var(--color-text);
		font-weight: 400;
		font-size: 1.3rem;
		text-transform: uppercase;
		transition: color 0.2s linear;
	}

	.link-header-centered {
		position: fixed;
		left: 50%;
		transform: translate(-50%);
		height: 50px;
		margin-top: 10px;
		margin-bottom: 10px;
		padding: 0;
	}

	.logo-header-centered {
		height: 50px;
	}

	.logo-header {
		width: 174px;
		height: 50px;
		margin: 20px;
		margin-left:80px;
		margin-right:80px;
	}

	header {
		display: flex;
		position: fixed;
		top: 0;
		right: 0;
		width: 100%;
		height:100px;
		background-color: black;
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
		height: 3px;
		background-color: var(--color-theme-1);
	}
</style>
