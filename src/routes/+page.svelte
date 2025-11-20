<script>
	// @ts-nocheck
	import MediaSquareContainer from './MediaSquareContainer.svelte';
	import { mediaList } from '$lib/mediaList';
	import { onMount } from 'svelte';
	import { underlineVisible } from '$lib/underlineVisibility';
	import LightYoutube from './LightYoutube.svelte';
	import { fade } from 'svelte/transition';
	import Ribbons from './Ribbons.svelte';

onMount(() => {
	let scrollAnimationId = null;
	let isScrolling = false;

	function startAutoScroll() {
	// Only auto-scroll if we're at the top of the page (in home section)
	if (window.pageYOffset > 100) {
		return; // Don't auto-scroll if we're not at the top
	}

	const homeSection = document.getElementById('home');
	if (homeSection) {
		const homeHeight = homeSection.offsetHeight;
		const targetPosition = homeHeight * 0.5;
		const startPosition = window.pageYOffset;
		const distance = targetPosition - startPosition;
		
		// Don't scroll if we're already close to the target
		if (Math.abs(distance) < 100) {
			return;
		}
		
		const duration = 4000;
		let startTime = null;

		// Cancel any existing animation
		if (scrollAnimationId) {
			cancelAnimationFrame(scrollAnimationId);
		}

		function animation(currentTime) {
			if (startTime === null) startTime = currentTime;
			const timeElapsed = currentTime - startTime;
			const progress = Math.min(timeElapsed / duration, 1);
			
			const easeOutQuart = 1 - Math.pow(1 - progress, 4);
			window.scrollTo(0, startPosition + (distance * easeOutQuart));
			
			if (timeElapsed < duration) {
				scrollAnimationId = requestAnimationFrame(animation);
			} else {
				isScrolling = false;
				scrollAnimationId = null;
			}
		}

		isScrolling = true;
		scrollAnimationId = requestAnimationFrame(animation);
	}
}

	// Start auto-scroll after 1 second
	setTimeout(startAutoScroll, 1200);

	// Make scroll interruptible by user interaction
	function handleUserScroll() {
		if (isScrolling && scrollAnimationId) {
			cancelAnimationFrame(scrollAnimationId);
			isScrolling = false;
			scrollAnimationId = null;
		}
	}

	// Listen for user scroll attempts
	window.addEventListener('wheel', handleUserScroll, { passive: true });
	window.addEventListener('touchmove', handleUserScroll, { passive: true });
	window.addEventListener('keydown', (e) => {
		if (['Space', 'ArrowUp', 'ArrowDown', 'PageUp', 'PageDown'].includes(e.code)) {
			handleUserScroll();
		}
	});

	// Cleanup
	return () => {
		if (scrollAnimationId) {
			cancelAnimationFrame(scrollAnimationId);
		}
		window.removeEventListener('wheel', handleUserScroll);
		window.removeEventListener('touchmove', handleUserScroll);
	};
});

		// Disco iframe detection - improved version
	onMount(() => {
		function checkIframes() {
			const iframes = document.querySelectorAll('.disco-playlist-item iframe');
			iframes.forEach((iframe, index) => {
				// Check if iframe has loaded content
				setTimeout(() => {
					let isBlocked = false;
					
					try {
						// Method 1: Check if we can access the iframe content
						const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
						const bodyContent = iframeDoc.body.innerHTML;
						
						// If body is very empty or contains error-like content, it's blocked
						if (bodyContent.length < 500 || 
							bodyContent.includes('blocked') || 
							bodyContent.includes('cookie') ||
							bodyContent.includes('tracking')) {
							isBlocked = true;
						}
					} catch (error) {
						// Method 2: Cross-origin error means blocked
						isBlocked = true;
					}
					
					// Method 3: Check if iframe has very small visible content
					if (iframe.offsetHeight < 50 || iframe.offsetWidth < 50) {
						isBlocked = true;
					}
					
					if (isBlocked) {
						iframe.parentElement.classList.add('blocked');
						console.log(`Playlist ${index + 1} is blocked`);
					} else {
						iframe.parentElement.classList.remove('blocked');
						console.log(`Playlist ${index + 1} loaded successfully`);
					}
				}, index * 500); // Stagger the checks
			});
		}
		
		// Check multiple times to catch delayed blocking
		setTimeout(checkIframes, 1000);
		setTimeout(checkIframes, 3000);
		setTimeout(checkIframes, 5000);
	});	

	let soundcloudIframe;
	let mediaGridElementWidth;
	let soundcloudWidth;
 	let isLoading = true; 
	$: {

		soundcloudWidth = mediaGridElementWidth;
	}

	
	let aligndiscordbottom = false;
	let isDiscordNameShown = false;

	function discordClickHandler() {
		isDiscordNameShown = !isDiscordNameShown;
	}

let isMediaGridExpanded = false;

function toggleMediaGrid() {
	isMediaGridExpanded = !isMediaGridExpanded;
	const container = document.querySelector('.media-grid-container');
	const toggleText = document.querySelector('.toggle-text');
	const toggleIcon = document.querySelector('.toggle-icon');
	
	if (container && toggleText && toggleIcon) {
		if (isMediaGridExpanded) {
			container.style.maxHeight = container.scrollHeight + 'px';
			toggleText.textContent = 'Hide Media Projects';
			toggleIcon.textContent = '↑';
		} else {
			container.style.maxHeight = '0';
			toggleText.textContent = 'Show Media Projects';
			toggleIcon.textContent = '↓';
		}
	}
}

	onMount(() => {
		underlineVisible.set(true);

		if (!soundcloudIframe.src) {
			const observer = new IntersectionObserver((entries) => {
				entries.forEach(entry => {
					if (entry.isIntersecting && !soundcloudIframe.src) {
						soundcloudIframe.src = "https://w.soundcloud.com/player/?visual=false&url=https%3A%2F%2Fapi.soundcloud.com%2Fplaylists%2F1728038148&show_artwork=true&maxheight=1000&maxwidth=1200&auto_play=false&buying=true&liking=true&download=true&sharing=true&show_comments=true&show_playcount=true&show_user=true&color";
					}
				});
			}, {
				rootMargin: '1000px' // Adjusts the distance from the viewport at which the iframe loads
			});

			observer.observe(soundcloudIframe);
		}
	});
</script>

<section id="home">
	<div class="presentation-grid">
		 <div class="texte-home">
			<h1 id="main-title"> <span class="le-pape"> </span></h1>
			<div class="sous-titres-wrapper"> 
				<h2> </h2>
				<h2> </h2>
			</div>
		</div> 
		<!-- <div class="downwoard-arrow-home">↓</div> -->
	</div>
</section>

<section id="music">
<!-- Disco.ac Playlist Section -->
<div class="disco-playlists">
	<div class="disco-playlist-item">
		<div class="playlist-title">Fantasy</div>
		<iframe 
			src="https://erwnlp.disco.ac/e/p/25812605?download=false&s=mNNyU1A8vVNR4X5gGtkjSFKwcB8%3ArO2qPM4U&artwork=false&color=%23FFD489&theme=dark" 
			width="480" 
			height="395"
			title="Fantasy"
			loading="lazy"
			referrerpolicy="no-referrer-when-downgrade"
			style="border: none; border-radius: 0;">
		</iframe>
		<div class="iframe-fallback">
			<p>Playlist blocked by privacy settings</p>
			<a href="https://erwnlp.disco.ac/s/25812605" target="_blank" rel="noopener">
				Listen on Disco.ac ↗
			</a>
		</div>
	</div>
	<div class="disco-playlist-item">
		<div class="playlist-title">Orchestral</div>
		<iframe 
			src="https://erwnlp.disco.ac/e/p/25812703?download=false&s=EW9JzXaNYnSnPoyEHaLTQ1qtMSU%3AvJ6VjBXS&artwork=false&color=%23FFD489&theme=dark" 
			width="480" 
			height="395"
			title="Orchestral"
			loading="lazy"
			referrerpolicy="no-referrer-when-downgrade"
			style="border: none; border-radius: 0;">
		</iframe>
		<div class="iframe-fallback">
			<p>Playlist blocked by privacy settings</p>
			<a href="https://erwnlp.disco.ac/s/25812703" target="_blank" rel="noopener">
				Listen on Disco.ac ↗
			</a>
		</div>
	</div>
	<div class="disco-playlist-item">
		<div class="playlist-title">Action</div>
		<iframe 
			src="https://erwnlp.disco.ac/e/p/25812733?download=false&s=MKYZDZLN0lJPRNnVkoUaxwr01xA%3AIcAWr0Ok&artwork=false&color=%23FFD489&theme=dark" 
			width="480" 
			height="395"
			title="Action"
			loading="lazy"
			referrerpolicy="no-referrer-when-downgrade"
			style="border: none; border-radius: 0;">
		</iframe>
		<div class="iframe-fallback">
			<p>Playlist blocked by privacy settings</p>
			<a href="https://erwnlp.disco.ac/s/25812733" target="_blank" rel="noopener">
				Listen on Disco.ac ↗
			</a>
		</div>
	</div>
	<div class="disco-playlist-item">
		<div class="playlist-title">Ambient</div>
		<iframe 
			src="https://erwnlp.disco.ac/e/p/25812761?download=false&s=-2vTFP4NhXjfFbNRfMeoZA6VvIY%3A2oaw55mX&artwork=false&color=%23FFD489&theme=dark" 
			width="480" 
			height="395"
			title="Ambient"
			loading="lazy"
			referrerpolicy="no-referrer-when-downgrade"
			style="border: none; border-radius: 0;">
		</iframe>
		<div class="iframe-fallback">
			<p>Playlist blocked by privacy settings</p>
			<a href="https://erwnlp.disco.ac/s/25812761" target="_blank" rel="noopener">
				Listen on Disco.ac ↗
			</a>
		</div>
	</div>
	<div class="disco-playlist-item">
		<div class="playlist-title">Others</div>
		<iframe 
			src="https://erwnlp.disco.ac/e/p/25812811?download=false&s=hWBfAgeQXWdsPWoSs1EsJr01jV0%3ASl7bXK5Q&artwork=false&color=%23FFD489&theme=dark" 
			width="480" 
			height="395"
			title="Others"
			loading="lazy"
			referrerpolicy="no-referrer-when-downgrade"
			style="border: none; border-radius: 0;">
		</iframe>
		<div class="iframe-fallback">
			<p>Playlist blocked by privacy settings</p>
			<a href="https://erwnlp.disco.ac/s/25812811" target="_blank" rel="noopener">
				Listen on Disco.ac ↗
			</a>
		</div>
	</div>
</div>

	<!-- Media Grid - Desktop Version (always visible) -->
	<div class="media-grid-desktop">
		<div class="media-grid" bind:clientWidth={mediaGridElementWidth}>
			{#each mediaList as media (media.id)}
				<MediaSquareContainer {...media} />
			{/each}
		</div>
	</div>

	<!-- Collapsible Media Grid - Mobile Only -->
	<div class="collapsible-media-mobile">
		<button class="collapsible-toggle" on:click={toggleMediaGrid}>
			<span class="toggle-text">Show Media Projects</span>
			<span class="toggle-icon">↓</span>
		</button>
		<div class="media-grid-container">
			<div class="media-grid" bind:clientWidth={mediaGridElementWidth}>
				{#each mediaList as media (media.id)}
					<MediaSquareContainer {...media} />
				{/each}
			</div>
		</div>
	</div>
	<div class="youtube-showreel">
		<LightYoutube videoId="BteChDYwoBs" image='/image-showreel.webp'></LightYoutube>
	</div>
	<div class="soundcloud-player">
		{#if true}
		  <div class="loading-placeholder"></div>
		{/if}
			<iframe
				on:load={() => {isLoading = false;console.log("Iframe loaded");}}
				bind:this={soundcloudIframe}
				width={soundcloudWidth}
				height="450px"
				frameborder="no"
				title="Erwan Soundcloud Showreel"
			> 
		</iframe>
	</div>
</section>

<section id="bio">
	<div class="bio-title-grid"><h1>Biography</h1></div>
	<div class="bio-image-grid">
		<img class="musee-picture" src="/erwan-musee-carre.webp" alt="Erwan Presenting Elegie" />
		<img class="ethnic-picture" src="/erwan-ethnic-carre.webp" alt="Erwan With an Ngoni" />
		<img class="piano-picture" src="/erwan-piano-carre.webp" alt="Erwan Playing Piano" />
	</div>
	<div class="bio-text-grid">
		<p class="bio-text">
			Hi, I'm Erwan Le Pape, a young composer based in France.<br /><br />
			I studied music at the conservatory and college and I have a master's degree in
			music scoring, specializing in the creation of nuanced soundtracks for various multimedia platforms.
			I have already worked on several short films, animations and video games, collaborating closely with 
			directors, producers, and creative teams. These experiences taught me the importance of collaboration, 
			where clear communication is key towards achieving a shared goal.<br /><br />
			A pivotal chapter of my musical education was the three-year mentorship as a private student of
			Yves Krier, a contemporary composer and conductor. I acquired most of my skills in composition
			and orchestration from him.<br /><br />
			While the piano remains my primary instrument, I can also play the guitar (both electric and acoustic),
			bass guitar, the ngoni and different flutes. My musical influences range from neoclassical to contemporary
			music, with a particular affinity for orchestral arrangements. However, I'm not one to shy away
			from experimentation, often blending traditional orchestral elements with electronic sounds to
			create unique and dynamic compositions.<br /><br />
			⭐ Finalist for Best Music at the Clermont-Ferrand Festival (OST Challenge).

		</p>
		<p class="bio-skills">
			<b>Skills</b> <br /><br />

			Piano, Guitar, Ngoni, Synthesizers<br />
			Composition, Theory, Harmony, Arrangement, Orchestration, Sound-Design. <br />
			I use DAWs such as Logic Pro, Sibelius, OpenMusic. <br />
			I work from my home studio. <br />
			Easily reachable. <br />
			<br />
		</p>
	</div>
	<div class="logos-grid-wrapper">
		<div></div>
		<div class="logos-grid-imgs">
			<img src="/logos-ecoles/brassart.webp" alt="Brassart logo" />
			<img src="/logos-ecoles/bellecour.webp" alt="Bellecour École logo" />
			<img src="/logos-ecoles/gamagora.webp" alt="Gamagora logo" />
			<img src="/logos-ecoles/maaav.webp" alt="MAAAV logo" />
			<img src="/logos-ecoles/mba-lyon.webp" alt="MBA Lyon logo" />
			<img src="/logos-ecoles/artfx.webp" alt="Art FX School of Digital Arts logo" />
			<img src="/logos-ecoles/vieux-montreal.webp" style="filter:invert(1);" alt="Vieux Montreal logo" />
			<img src="/logos-ecoles/ecv.webp" alt="ECV Bordeaux logo" />
		</div>
		<div></div>
	</div>
</section>

<section id="contact">
	<div class="contact-title-grid"><h1>Contact</h1></div>
	<div class="icon-bar-grid-wrapper">
		<div></div>
		<div class="icon-bar-grid">
			<div class="email-box">
				erwanlepape@outlook.com
			</div>

			<a class="icon-button-or-link" href="https://www.instagram.com/erwanklp/" target="_blank">
				<img class="icon-large" src="/icons/instagram.webp" alt="Instagram Link" />
			</a>

			<button class="icon-button-or-link" on:click={discordClickHandler}>
				<img class="icon-large" src="/icons/discord.webp" alt="Discord Icon" />
				{#if isDiscordNameShown}
					<div class="discord-name-box" class:aligndiscordbottom transition:fade={{ duration: 50 }}>
						erwanlp
					</div>
				{/if}
			</button>

			<a class="icon-button-or-link" href="https://www.facebook.com/profile.php?id=61551473833966" target="_blank">
				<img class="icon-large" src="/icons/facebook.webp" alt="Facebook Link" />
			</a>
			<a class="icon-button-or-link" href="https://www.linkedin.com/in/erwan-le-pape-9b80372ba/" target="_blank">
				<img class="icon-large" src="/icons/linkedin.webp" alt="Linkedin Link" />
			</a>
		</div>
		<div></div>
	</div>
</section>

<style>
	.discord-name-box {
		position: absolute;
		left: -27%;
		transform: translate(0%, 50px);
		font-size: larger;
		opacity: 1;
		color: var(--color-theme-1);
	}

	.discord-name-box.aligndiscordbottom {
		left: auto;
		right: 0%;
		top: 100%;
		transform: translate(0%, 0%);
	}

	.le-pape {
		white-space: nowrap;
	}

	.loading-placeholder {
		width:100%;
		height:100%;
		position: relative;
		top:0%;
		border-radius: 5px;
		background-color: #f0f0f000;
		animation: pulseAnimation 2s infinite ease-in-out;
	}

	@keyframes pulseAnimation {
		0% {
			background-color: #a8a8a86e;
		}
		50% {
			background-color: #2929293a;
		}
		100% {
			background-color: #a8a8a86e;
		}
	}

	.icon-bar-grid-wrapper {
		display: grid;
		grid-template-columns: 1fr 1fr 1fr;
	}

	.email-box {
		font-size: x-large;
		color: var(--color-theme-1);
		grid-row:1;
		grid-column: 2 / span 2;
	}

	.icon-bar-grid {
		display: grid;
		grid-template-rows: 1fr 1fr;
		grid-template-columns: 1fr 1fr 1fr 1fr;
		justify-items: center;
		gap:40px;
	}

	.icon-large {
		width: 60px;
		height: 60px;
		margin: auto;
		display: block;
		filter: grayscale(1);
		transition: 0.1s filter linear;
	}

	.icon-button-or-link {
		grid-row: 2;
		display: flex;
		justify-content: center;
		align-items: center;
		width: 50px;
		height: 50px; 
		background: none;
		border: none;
		position: relative;
	}

	.icon-large:hover {
		filter: grayscale(0);
		cursor: pointer;
	}

	.logos-grid-wrapper {
		display: grid;
		grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
	}

	.logos-grid-imgs {
		grid-column: 2 / span 3;
		display: grid;
		grid-template-rows: 1fr 1fr;
		grid-template-columns: 1fr 1fr 1fr 1fr;
		gap: 20px;
		row-gap: 20px;
		margin-bottom: 20px;
		height: auto; /* Ensure height is auto */
    	align-items: center;
	}

	.logos-grid-imgs img {
		width: 100%;
		height: auto; /* Set height to auto to maintain aspect ratio */
		object-fit: contain; /* Ensure images fit their container while maintaining aspect ratio */
	}

	/* Safari-specific CSS */
	@media not all and (min-resolution:.001dpcm) {
		@supports (-webkit-appearance:none) {
			.logos-grid-imgs img {
				height: auto; /* Adjust height specifically for Safari */
			}
		}
	}


	.texte-home {
		align-self: center;
		width: 100%;
		margin-left:80px;
	}

	.bio-title-grid,
	.credits-titre-grid,
	.contact-title-grid {
		display: grid;
		grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
	}

	#bio h1,
	.credits-titre-grid h2,
	.contact-title-grid h1 {
		grid-column: 2 / span 3;
		margin-left: 0;
		text-wrap: nowrap;
	}

	.credits-titre-grid h2 {
		margin: 0;
		font-size: 300%; /* Add this line */
	}

	#main-title {
		display:block;
		margin-bottom: 30px;
		margin-bottom: 30px;
		margin-left:0;
	}

	.sous-titres-wrapper {
		display: block;
	}
	
	.sous-titres-wrapper h2 {
		margin-top: 0;
		margin-bottom: 0;
	}



	.soundcloud-player {
		display:grid;
	}

	.media-grid-desktop,
	.collapsible-media-mobile,
	.soundcloud-player,
	.youtube-showreel {
		grid-column: 2 / span 3;
	}

	.media-grid {
		display: grid;
		grid-template-columns: 1fr 1fr 1fr;
		gap: 20px;
	}

	.soundcloud-player,
	.youtube-showreel {
		display: none;
		margin-top: 150px;
	}

	#music {
		padding-top:60px;
		display: grid;
		grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
	}

	.presentation-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		grid-template-rows: 1fr auto;
	}

	.home-profile-picture {
		margin: 40px;
		width: 80%;
		align-self: center;
		justify-self: end;
		object-fit: contain;
	}

	#contact {
		border-top: 1px solid white;
		height: 70vh;
	}

	.bio-skills {
		grid-row: 2;
		grid-column: 2 / span 3;
		text-align: left;
	}

	.bio-text {
		grid-row: 1;
		grid-column: 2 / span 3;
		text-align: left;
		padding: 0 10px; /* Reduce horizontal padding */
		margin: 0; /* Remove any default margins */
	}

	.bio-image-grid {
		display: grid;
		grid-template-columns: 1fr 1fr 1fr; /* 3 columns like media-grid */
		gap: 20px; /* Same gap as media-grid */
		grid-column: 2 / span 3; /* Same positioning as media-grid */
	}

	/* Create square containers for bio images like MediaSquareContainer */
	.musee-picture,
	.piano-picture,
	.ethnic-picture {
		width: 100%;
		aspect-ratio: 1 / 1; /* Force square aspect ratio */
		object-fit: cover; /* Crop to fit square */
		border-radius: 8px; /* Match media-grid rounded corners */
	}

	.bio-text-grid {
		display: grid;
		grid-template-rows: 1fr auto;
		height: 100%;
		grid-template-columns: 1fr 1fr 1fr 0.75fr 0.25fr 1fr;
		gap: 20px;
		margin-top: 60px;
	}

	.musee-picture {
		grid-column: 2;
	}

	.musee-picture,
	.piano-picture,
	.ethnic-picture {
		width: 100%;
		justify-self: center;
		align-self: center;
	}

	/* Above 1160px */
	@media (min-width: 1250px) {
		h2 {
			margin-block-end: 0 !important;
		}
	}

	h1 {
		font-weight: 500;
		font-size: 500%;
		word-break: break-word;
	}

	h2 {
		font-weight: 300;
		font-size: 380%;
		color: var(--color-theme-1);
	}

	p {
		font-size: x-large;
		text-align: center;
	}

	h1 {
		margin-left: 40px;
	}

	section {
		display: block;
	}

	#home {
		height: 100vh;
		background-image: url('/erwan-fond-accueil.jpg');
		background-size: cover;
		background-position: center;
		background-repeat: no-repeat;
		position: relative;
		z-index: 0; /* Ensure content is above the overlay */
}

	
	@media (max-width: 840px) {

		#home {
			display: none !important; /* Hide home section */
		}
		
		#music {
			padding-top: 20px !important; /* Reduce top padding */
		}

		.bio-text,
		.bio-skills {
			font-size: medium;
		}
		.presentation-grid {
			grid-template-columns: 1fr ;
			margin-left: 20px;
		}
		.texte-home {
			margin-left: 0;
		}
		.home-profile-picture {
			display: none;
		}
		.media-grid {
			grid-template-columns: 1fr 1fr 1fr;
			gap: 20px;
		}

		#music {
			grid-template-columns: 20px 1fr 1fr 1fr 20px;
		}

		.bio-image-grid {
			grid-template-columns: 5px 1fr 1fr 5px; /* Reduced from 10px to 5px */
		}

		.bio-text-grid {
			grid-template-columns: 5px 1fr 1fr 1fr 5px; /* Reduced side padding from 20px to 10px */
			gap: 15px; /* Reduced gap between elements */
			margin-top: 30px; /* Reduced top margin from 60px */
		}

		.logos-grid-wrapper {
			grid-template-columns: 0.2fr 1fr 1fr 1fr 0.2fr;
		}
		

		.bio-title-grid,
		.credits-titre-grid,
		.contact-title-grid {
			grid-template-columns: 20px 1fr 1fr 1fr 20px;
		}
	}

	@media (max-width: 768px) {
		.media-grid {
			grid-template-columns: 1fr 1fr;
		}
		.piano-picture {
			display: none;
		}
		.logos-grid-wrapper {
			padding-left: 0;
			padding-right: 0;
		}
		.bio-skills {
		display: none; /* Add this line */
		}
	}

	@media (max-width: 680px) {
		h1 {
			font-size: 500%;
		}

		h2 {
			font-size: 300%;
		}
	}

	@media (max-width: 450px) {
		#home h1 {
			font-size: 400%;
		}
		h1 {
			font-size: 300%;
		}

		h2 {
			font-size: 250%;
		}
		.email-box {
			font-size: large;
		}
	}

	@media (max-width: 280px) {

		.icon-button-or-link {
			width: 20px;
			height: 20px; 
		}
		
		.media-grid {
			grid-template-columns: 1fr;
		}
	}

		/* === DISCO CSS WITH TITLES AND INCREASED HEIGHT === */
	.disco-playlists {
		grid-column: 1 / span 5;
		display: grid;
		grid-template-columns: repeat(5, 1fr);
		gap: 15px;
		margin-bottom: 60px;
		padding: 0 20px;
	}

	.disco-playlist-item {
		width: 100%;
		height: 450px; /* Increased height */
		display: flex;
		justify-content: center;
		position: relative;
		margin-top: 40px; /* Space for title */
	}

	.playlist-title {
		position: absolute;
		top: -40px;
		left: 0;
		color: rgb(255, 212, 137); /* Your gold color */
		font-size: 18px;
		font-weight: normal;
		font-family: 'Poppins', sans-serif;
		z-index: 4;
		text-align: center;
		width: 100%;
		letter-spacing: 2px; /* Increased letter spacing */
	}

	.disco-playlist-item iframe {
		width: 100%;
		height: 100%;
		border-radius: 0;
		position: relative;
		z-index: 2;
		background: transparent;
		border: none;
	}

	.iframe-fallback {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, 0);
		color: rgba(255, 255, 255, 0.9);
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		text-align: center;
		padding: 20px;
		border-radius: 0;
		border: 1px solid #333;
		z-index: 1;
		opacity: 0;
		pointer-events: none;
		transition: opacity 0.3s ease;
		box-sizing: border-box;
	}

	.disco-playlist-item.blocked .iframe-fallback {
		z-index: 3;
		opacity: 1;
		pointer-events: all;
		background: rgba(0, 0, 0, 0.9);
	}

	.disco-playlist-item.blocked iframe {
		display: none;
	}

	.iframe-fallback p {
		font-size: 14px;
		margin-bottom: 15px;
		opacity: 0.9;
		line-height: 1.4;
	}

	.iframe-fallback a {
		color: rgb(255, 212, 137);
		text-decoration: none;
		font-weight: bold;
		border: 1px solid rgb(255, 212, 137);
		padding: 8px 16px;
		border-radius: 0;
		transition: all 0.3s ease;
		font-size: 13px;
	}

	.iframe-fallback a:hover {
		background-color: rgb(255, 212, 137);
		color: black;
	}

	/* Responsive design */
	@media (max-width: 1400px) {
		.disco-playlists {
			grid-template-columns: repeat(3, 1fr);
			gap: 20px;
		}
	}

	@media (max-width: 1024px) {
		.disco-playlists {
			grid-template-columns: repeat(2, 1fr);
			gap: 25px;
		}
	}

	@media (max-width: 768px) {
		.disco-playlists {
			grid-template-columns: repeat(2, 1fr);
			gap: 20px;
			padding: 0 15px;
		}
		
		.disco-playlist-item {
			height: 400px; /* Increased */
			margin-top: 50px; /* Increased from 40px */
		}
		
		.playlist-title {
			font-size: 16px;
			top: -45px; /* Increased from -35px */
			letter-spacing: 1.5px;
		}
	}

	@media (max-width: 600px) {
		.disco-playlists {
			grid-template-columns: 1fr;
			gap: 20px;
			padding: 0 10px;
		}
		
		.disco-playlist-item {
			height: 350px; /* Increased */
			max-width: 400px;
			margin: 0 auto;
			margin-top: 45px; /* Increased from 35px */
		}
		
		.playlist-title {
			font-size: 15px;
			top: -40px; /* Increased from -30px */
			letter-spacing: 1px;
		}
	}

	@media (max-width: 480px) {
		.disco-playlists {
			padding: 0 5px;
		}
		
		.disco-playlist-item {
			height: 320px; /* Increased */
			margin-top: 40px; /* Increased from 30px */
		}
		
		.playlist-title {
			font-size: 14px;
			top: -35px; /* Increased from -25px */
			letter-spacing: 0.8px;
		}
		
		.iframe-fallback {
			padding: 15px;
		}
		
		.iframe-fallback p {
			font-size: 13px;
		}
		
		.iframe-fallback a {
			padding: 8px 16px;
			font-size: 12px;
		}
		html {
			scroll-behavior: smooth;
		}
	}
	
	/* === END OF DISCO CSS === */
	
		#home {
		height: 100vh;
		background-image: url('/erwan-fond-accueil.jpg');
		background-size: cover;
		background-position: center;
		background-repeat: no-repeat;
		position: relative;
		z-index: 0;
		display: flex;
		align-items: center;
	}

	/* UPDATED GRADIENT - DARKER FROM LEFT */
		#home::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: linear-gradient(to right, 
			rgba(0, 0, 0, 0.6) 0%,        /* Dark on the left */
			rgba(0, 0, 0, 0.3) 10%,      /* Slightly lighter at 15% */
			rgba(0, 0, 0, 0.2) 20%,      /* Medium at 25% */
			rgba(0, 0, 0, 0.1) 30%,      /* Light at 35% */
			rgba(0, 0, 0, 0) 40%         /* Completely transparent by 45% */
		);
		z-index: 1;
	}

	.home-content {
		position: relative;
		z-index: 2;
		margin-left: 10%;
		color: white;
		font-family: 'Poppins', sans-serif;
	}

	.home-name {
		font-size: 4rem;
		font-weight: 600;
		margin: 0;
		line-height: 1.1;
		text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5); /* Added shadow for better readability */
	}

	.home-title {
		font-size: 2rem;
		font-weight: 300;
		margin: 0;
		line-height: 1.2;
		opacity: 0.9;
		text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.5); /* Added shadow for better readability */
	}

	/* Responsive adjustments */
	@media (max-width: 768px) {
		.home-name {
			font-size: 3rem;
		}
		
		.home-title {
			font-size: 1.5rem;
		}
		
		.home-content {
			margin-left: 5%;
		}
	}

	@media (max-width: 480px) {
		.home-name {
			font-size: 2.5rem;
		}
		
		.home-title {
			font-size: 1.2rem;
		}
	}
	    /* ... your existing CSS ... */
		/* À la fin de votre CSS, après toutes les autres règles #home */
@media (max-width: 840px) {
	#home {
		background-position: 70% 20% !important; /* Forcer la priorité */
	}
	}
	/* Desktop Media Grid - Always Visible */
	.media-grid-desktop {
		display: block;
	}

	.collapsible-media-mobile {
		display: none;
	}

	/* Mobile Media Grid - Collapsible */
	@media (max-width: 840px) {
		.media-grid-desktop {
			display: none;
		}
		
		.collapsible-media-mobile {
			display: block;
			margin: 30px 0;
		}

		/* Add spacing specifically for the collapsible section */
		.collapsible-media-mobile .collapsible-toggle {
			margin-bottom: 15px; /* Space between button and grid when expanded */
		}
		
		.collapsible-toggle {
			width: 100%;
			background: rgba(255, 255, 255, 0.1);
			border: 1px solid rgba(255, 255, 255, 0.3);
			color: white;
			padding: 15px 20px;
			font-size: 16px;
			font-family: 'Poppins', sans-serif;
			cursor: pointer;
			display: flex;
			justify-content: space-between;
			align-items: center;
			border-radius: 8px;
			transition: all 0.3s ease;
		}
				.toggle-icon {
			color: rgb(255, 212, 137); /* Gold color for the arrow only */
			font-weight: bold;
			transition: transform 0.3s ease;
		}
		
		.collapsible-toggle:hover {
			background: rgba(255, 255, 255, 0.2);
		}
		
		.media-grid-container {
			max-height: 0;
			overflow: hidden;
			transition: max-height 0.5s ease;
		}

		/* Ensure the media grid inside is visible */
		.media-grid-container .media-grid {
			display: grid;
			grid-template-columns: 1fr 1fr;
			gap: 20px;
			padding: 20px 0; /* Add spacing above and below the grid */
		}
		/* When expanded, add proper spacing */
		.media-grid-container[style*="max-height"] {
			padding-top: 10px; /* Space between button and grid */
		}
		
		.toggle-icon {
			transition: transform 0.3s ease;
		}
	}
		/* Desktop Bio Images - Match media-grid square layout */
	@media (min-width: 841px) {
		.bio-image-grid {
			display: grid;
			grid-template-columns: 1fr 1fr 1fr;
			gap: 20px;
			grid-column: 2 / span 3;
		}
		
		.musee-picture,
		.piano-picture,
		.ethnic-picture {
			width: 100%;
			aspect-ratio: 1 / 1;
			object-fit: cover;
			border-radius: 8px;
		}
	}
	

</style>

	<!-- RIBBONS COMPONENT -->
		<Ribbons 
		colors={['#FC8EAC', '#8EFCAC', '#8EACFC']}
		baseSpring={0.03}
		baseFriction={0.9}
		baseThickness={25}
		enableFade={true}
		speedMultiplier={0.8}
	/>
