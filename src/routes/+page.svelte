<script>
	// @ts-nocheck
	import MediaSquareContainer from './MediaSquareContainer.svelte';
	import { mediaList } from '$lib/mediaList';
	import { onMount } from 'svelte';
	import { underlineVisible } from '$lib/underlineVisibility';
	import LightYoutube from './LightYoutube.svelte';

	let soundcloudIframe;
	let mediaGridElementWidth;
	let soundcloudWidth;
	$: {

		soundcloudWidth = mediaGridElementWidth;
	}

	onMount(() => {
		underlineVisible.set(true);

		const observer = new IntersectionObserver((entries) => {
			entries.forEach(entry => {
				if (entry.isIntersecting && !soundcloudIframe.src) {
					soundcloudIframe.src = "https://w.soundcloud.com/player/?visual=false&url=https%3A%2F%2Fapi.soundcloud.com%2Fplaylists%2F1728038148&show_artwork=true&maxheight=1000&maxwidth=1200&auto_play=false&buying=true&liking=true&download=true&sharing=true&show_comments=true&show_playcount=true&show_user=true&color";
				}
			});
		}, {
			rootMargin: '100px' // Adjusts the distance from the viewport at which the iframe loads
		});

		observer.observe(soundcloudIframe);
	});
</script>

<section id="home">
	<div class="presentation-grid">
		<div class="texte-home">
			<h1 id="main-title">ERWAN LE PAPE</h1>
			<div class="sous-titres-wrapper">
				<h2 class="sous-titres">COMPOSER <br />ARRANGER <br /> PIANIST</h2>
			</div>
		</div>
		<img class="home-profile-picture" src="/erwan-home-cercle.webp" alt="Erwan's Presentation" />
		<!-- <div class="downwoard-arrow-home">↓</div> -->
	</div>
</section>

<section id="music">
	<div class="media-grid" bind:clientWidth={mediaGridElementWidth}>
		{#each mediaList as media (media.id)}
			<MediaSquareContainer {...media} />
		{/each}
	</div>
	<div class="youtube-showreel">
		<LightYoutube videoId="BteChDYwoBs" image='/image-showreel.webp'></LightYoutube>
	</div>
	<div class="soundcloud-player">
		<iframe
			bind:this={soundcloudIframe}
			width={soundcloudWidth}
			height="450px"
			frameborder="no"
			title="Erwan Soundcloud Showreel"
		></iframe>
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
			Hi, I'm Erwan, a young composer based in Lyon, France.<br /><br />
			I studied music at the conservatory and college, and I'm currently pursuing a master's degree in
			music scoring, specializing in the creation of nuanced soundtracks for films, television, video
			games, and various multimedia platforms.<br /><br />
			A pivotal chapter of my musical education was the three-year mentorship as a private student of
			Yves Krier, a contemporary composer and conductor. I acquired most of my skills in composition
			and orchestration from him.<br /><br />
			While the piano remains my primary instrument, I can also play the guitar (both electric and acoustic),
			bass guitar, violin, and the ngoni. My musical influences range from neoclassical to contemporary
			music, with a particular affinity for orchestral arrangements. However, I'm not one to shy away
			from experimentation, often blending traditional orchestral elements with electronic sounds to
			create unique and dynamic compositions.
		</p>
		<p class="bio-skills">
			<b>Skills</b> <br /><br />

			Piano, Guitar, Bass, Violin, Synthesizer<br />
			Composition, Theory, Harmony, Arrangement, Orchestration, Sound-Design. <br />
			I use DAWs such as Logic Pro, Sibelius, Fl Studio. <br />
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
			<img src="/logos-ecoles/esad-amiens.webp" style="filter:invert(1);" alt="Esad logo" />
			<img src="/logos-ecoles/gamagora.webp" alt="Gamagora logo" />
			<img src="/logos-ecoles/maaav.webp" alt="MAAAV logo" />
			<img src="/logos-ecoles/mba-lyon.webp" alt="MBA Lyon logo" />
			<img src="/logos-ecoles/univlyon2.webp" alt="Lyon 2 University logo" />
			<img src="/logos-ecoles/vieux-montreal.webp" style="filter:invert(1);" alt="Vieux Montreal logo" />
			<img src="/logos-ecoles/ENAAI.webp" alt="ENAAI logo" />
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
			<a class="icon-button-or-link" href="https://discord.com/users/783996252018573332" target="_blank">
				<img class="icon-large" src="/icons/discord.webp" alt="Discord Link" />
			</a>
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
		gap:20px;
		margin-bottom: 20px;
	}

	.logos-grid-imgs img {
		width: 100%;
		height: 100%;
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
		margin-bottom: 40px;
		margin-left:0;
	}
	.sous-titres-wrapper {
		display: flex;
	}

	.sous-titres {
		margin-top: 0;
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
		margin-top: 150px;
	}

	#music {
		display: grid;
		grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
		padding-top: 100px;
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
		font-size: 640%;
		word-break: break-word;
	}

	h2 {
		font-weight: 300;
		font-size: 400%;
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
	}

	
	@media (max-width: 840px) {
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
			font-size: 400%;
		}

		h2 {
			font-size: 300%;
		}
	}

	@media (max-width: 450px) {
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
</style>
