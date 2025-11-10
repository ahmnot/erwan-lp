<script>
	// @ts-nocheck
	import MediaSquareContainer from './MediaSquareContainer.svelte';
	import { mediaList } from '$lib/mediaList';
	import { onMount } from 'svelte';
	import { underlineVisible } from '$lib/underlineVisibility';
	import LightYoutube from './LightYoutube.svelte';
	import { fade } from 'svelte/transition';

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
			<iframe 
				id="disco-playlist-25812605" 
				name="disco-playlist-25812605" 
				allowfullscreen="true"
				frameborder="0" 
				class="disco-embed" 
				src="https://erwnlp.disco.ac/e/p/25812605?download=true&s=lWgFf-vOLQQTqI1DAu1OjHZCNhc%3An4sYUGlO&artwork=true&color=%2332B57C&theme=white" 
				width="480" 
				height="395"
				title="Disco Playlist 1">
			</iframe>
		</div>
		<div class="disco-playlist-item">
			<iframe 
				id="disco-playlist-25812703" 
				name="disco-playlist-25812703" 
				allowfullscreen="true"
				frameborder="0" 
				class="disco-embed" 
				src="https://erwnlp.disco.ac/e/p/25812703?download=true&s=6Lg36zOcNASYy3FY6oYl5IIAXto%3A2zTVr1x9&artwork=true&color=%2332B57C&theme=white" 
				width="480" 
				height="395"
				title="Disco Playlist 2">
			</iframe>
		</div>
		<div class="disco-playlist-item">
			<iframe 
				id="disco-playlist-25812733" 
				name="disco-playlist-25812733" 
				allowfullscreen="true"
				frameborder="0" 
				class="disco-embed" 
				src="https://erwnlp.disco.ac/e/p/25812733?download=true&s=OsHjLe_pj24ZCzm_fPCeKzlgMIU%3AUUdpqLsw&artwork=true&color=%2332B57C&theme=white" 
				width="480" 
				height="395"
				title="Disco Playlist 3">
			</iframe>
		</div>
		<div class="disco-playlist-item">
			<iframe 
				id="disco-playlist-25812761" 
				name="disco-playlist-25812761" 
				allowfullscreen="true"
				frameborder="0" 
				class="disco-embed" 
				src="https://erwnlp.disco.ac/e/p/25812761?download=true&s=TKM7neFFklse5aSZZljRIdgpTKA%3A2jXPWKdv&artwork=true&color=%2332B57C&theme=white" 
				width="480" 
				height="395"
				title="Disco Playlist 4">
			</iframe>
		</div>
		<div class="disco-playlist-item">
			<iframe 
				id="disco-playlist-25812811" 
				name="disco-playlist-25812811" 
				allowfullscreen="true"
				frameborder="0" 
				class="disco-embed" 
				src="https://erwnlp.disco.ac/e/p/25812811?download=true&s=ty3jvmHwsmbjTubs4EvVIJHgOdw%3ARGJa3FJa&artwork=true&color=%2332B57C&theme=white" 
				width="480" 
				height="395"
				title="Disco Playlist 5">
			</iframe>
		</div>
	</div>

	<div class="media-grid" bind:clientWidth={mediaGridElementWidth}>
		{#each mediaList as media (media.id)}
			<MediaSquareContainer {...media} />
		{/each}
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
			bass guitar, the ngoni and a bunch of flutes. My musical influences range from neoclassical to contemporary
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
	<div class="credits-titre-grid"><h2>CREDITS</h2></div>
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

	.media-grid,
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
	}

	.bio-image-grid {
		display: grid;
		grid-template-rows: 1fr;
		grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
		gap: 20px;
		padding-right: 20px;
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
			height: 100%;
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
			grid-template-columns: 0 1fr 1fr;
		}

		.bio-text-grid {
			grid-template-columns: 20px 1fr 1fr 1fr 20px;
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

	/* === PASTE DISCO CSS RIGHT HERE === */
	.disco-playlists {
		grid-column: 2 / span 3;
		display: grid;
		grid-template-columns: repeat(5, 1fr);
		gap: 20px;
		margin-bottom: 60px;
	}

	.disco-playlist-item {
		width: 100%;
		display: flex;
		justify-content: center;
	}

	.disco-playlist-item iframe {
		max-width: 100%;
		height: 395px;
		border-radius: 8px;
	}

	/* Responsive design */
	@media (max-width: 1400px) {
		.disco-playlists {
			grid-template-columns: repeat(3, 1fr);
		}
	}

	@media (max-width: 768px) {
		.disco-playlists {
			grid-template-columns: repeat(2, 1fr);
		}
	}

	@media (max-width: 480px) {
		.disco-playlists {
			grid-template-columns: 1fr;
		}
		
		.disco-playlist-item iframe {
			width: 100%;
			height: 300px;
		}
	}
	/* === END OF DISCO CSS === */
	
</style>
