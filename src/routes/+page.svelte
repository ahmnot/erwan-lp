<script>
	// @ts-nocheck
	import MediaSquareContainer from './MediaSquareContainer.svelte';
	import { mediaList } from '$lib/mediaList';
	import { onMount, onDestroy } from 'svelte';
	import { underlineVisible } from '$lib/underlineVisibility';
	import IconsBar from './IconsBar.svelte';

	$: innerWidth = 0;
	$: innerHeight = 0;

	let mediaGridElementWidth;
	let showreelWidth;
	let showreelHeight;
	let soundcloudWidth;
	let soundcloudHeight;
	$: if (innerWidth < 900) {
		showreelWidth = mediaGridElementWidth / 1.25;
	} else {
		showreelWidth = mediaGridElementWidth / 2;
	}
	$: showreelHeight = showreelWidth * 0.5625;
	$: if (innerWidth < 900) {
		soundcloudWidth = mediaGridElementWidth / 1.25;
	} else {
		soundcloudWidth = mediaGridElementWidth / 2;
	}
	$: soundcloudHeight = soundcloudWidth * 0.5625 * 1.5;

	onMount(() => {
		underlineVisible.set(true);
	});
</script>

<svelte:window bind:innerWidth bind:innerHeight />

<section id="home">
	<div class="presentation-grid">
		<div class="titres">
			<h1 id="main-title">ERWAN LE PAPE</h1>
			<div class="signature-grid">
				<h2>COMPOSER <br />ARRANGER <br /> PIANIST</h2>
				<img class="signature-presentation" src="/logo-3.webp" alt="logo" />
			</div>
		</div>
		<img class="home-profile-picture" src="/erwan-home-cercle.png" alt="Erwan's Presentation" />
		<div class="downwoard-arrow-home">↓</div>
	</div>
</section>

<section id="music">
	<div class="youtube-showreel">
		<iframe
			width={showreelWidth}
			height={showreelHeight}
			src="https://www.youtube.com/embed/BteChDYwoBs"
			title="Erwan YouTube Showreel"
			frameborder="0"
			allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
			allowfullscreen
		></iframe>
	</div>
	<div class="media-grid" bind:clientWidth={mediaGridElementWidth}>
		{#each mediaList as media (media.id)}
			<MediaSquareContainer {...media} />
		{/each}
	</div>
	<div class="soundcloudPlayer">
		<iframe
			width={soundcloudWidth}
			height={soundcloudHeight}
			frameborder="no"
			title="Erwan Soundcloud Showreel"
			src="https://w.soundcloud.com/player/?visual=false&amp;url=https%3A%2F%2Fapi.soundcloud.com%2Fplaylists%2F1728038148&amp;show_artwork=true&amp;maxheight=1000&amp;maxwidth=1200&amp;auto_play=false&amp;buying=true&amp;liking=true&amp;download=true&amp;sharing=true&amp;show_comments=true&amp;show_playcount=true&amp;show_user=true&amp;color"
		></iframe>
	</div>
</section>

<section id="bio">
	<h1>Biography</h1>
	<div class="bio-image-grid">
		<img class="musee-picture" src="/erwan-musee-carre.jpg" alt="Erwan Talking About His" />
		<img class="ethnic-picture" src="/erwan-ethnic-carre.png" alt="Erwan With A Nice Instrument" />
		<img class="piano-picture" src="/erwan-piano-carre.png" alt="Erwan's Presentation" />
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

			Piano, Guitar, Bass, Violin, Synthesizer, Ngoni<br />
			Composition, Theory, Harmony, Arrangement, Orchestration, Sound-Design. <br />
			I use DAWs such as Logic Pro, Sibelius, Fl Studio. <br />
			I work from my home studio. <br />
			Easily reachable. <br />
		</p>
	</div>
	<div class="logos-grid-wrapper">
		<div></div>
		<div class="logos-grid">
			<img src="/logos-ecoles/brassart.jpg" alt="Brassart logo" />
			<img src="/logos-ecoles/esad-amiens.png" alt="Brassart logo" />
			<img src="/logos-ecoles/gamagora.png" alt="Brassart logo" />
			<img src="/logos-ecoles/maaav.png" alt="Brassart logo" />
			<img src="/logos-ecoles/mba-lyon.png" alt="Brassart logo" />
			<img src="/logos-ecoles/univlyon2.png" alt="Brassart logo" />
			<img src="/logos-ecoles/vieux-montreal.png" alt="Brassart logo" />
		</div>
		<div></div>
	</div>
</section>

<section id="contact">
	<h1>Contact</h1>
	<div class="contact-section-content-row">
		<h2 class="contact-text-row">→</h2>
		<div class="contact-icons-row">
			<IconsBar iconsincontactsection={true} />
		</div>
	</div>

	<div class="contact-section-content-column">
		<h2 class="downwoard-arrow">↓</h2>
		<div class="contact-icons-column">
			<IconsBar iconsincontactsection={true} columnize={true} />
		</div>
	</div>
</section>

<style>
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

	.logos-grid-wrapper {
		display: grid;
		grid-template-rows: auto;
		grid-template-columns: 0.25fr 1fr 0.25fr;
		padding-right: 40px;
		padding-left: 40px;
	}

	.logos-grid img {
		width: 100%;
		height: 100%;
	}

	.logos-grid {
		display: grid;
		grid-template-rows: 1fr 0;
		grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
		gap: 20px;
	}

	#contact {
		border-top: 1px solid white;
		padding-bottom: 140px;
	}

	.bio-skills {
		grid-row: 2;
		grid-column: 2;
	}

	.downwoard-arrow-home {
		grid-column: span 2;
		grid-row: 2;
		justify-self: center;
		align-self: center;
		color: var(--color-theme-1);
		font-size: 600%;
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
		grid-template-columns: 0.5fr 1fr 0.5fr;
		gap: 20px;
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

	.bio-text {
		grid-row: 1;
		grid-column: 2;
	}

	.soundcloudPlayer {
		margin-top: 20px;
		justify-self: center;
	}

	#music {
		display: grid;
		grid-template-columns: 1fr;
	}

	.youtube-showreel {
		justify-self: center;
		margin-bottom: 20px;
	}

	.downwoard-arrow {
		grid-row: 2;
		justify-self: center;
		margin: 10px;
	}

	.contact-section-content-row {
		display: none;
	}

	.contact-section-content-column {
		display: grid;
		grid-template-columns: 1fr;
		margin-bottom: 100px;
	}

	.contact-icons-column {
		grid-row: 3;
		justify-self: center;
	}

	/* Above 1160px */
	@media (min-width: 1250px) {
		.contact-section-content-column {
			display: none;
		}
		.contact-section-content-row {
			display: flex;
			flex-direction: row;
			justify-content: space-around;
		}
		.contact-icons-row {
			display: flex;
			align-items: center;
			transform: translate(-50%);
		}
		h2 {
			margin-block-end: 0 !important;
		}
	}

	.signature-grid {
		display: grid;
		grid-template-columns: auto auto;
		grid-template-rows: auto auto;
		position: relative;
		justify-content: start;
		align-content: start;
		margin-left: 40px;
	}

	.signature-presentation {
		grid-column: 2;
		grid-row: 2;
		width: 100%;
		min-width: 250px;
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

	/* This has to do with the top right header icons when in columns*/
	@media (max-width: 910px) {
		.home-profile-picture {
			display: none;
		}
	}

	h1 {
		margin-left: 40px;
	}

	.titres {
		width: 100%;
	}

	.media-grid {
		/* margin-left: 40px;
		margin-right: 40px; */
		display: grid;
		grid-template-columns: 1fr 1fr 1fr 1fr;
	}

	section {
		display: block;
	}

	#home {
		height: 100vh;
	}

	@media (max-width: 900px) {
		.media-grid {
			grid-template-columns: 1fr 1fr 1fr;
		}
	}

	@media (max-width: 768px) {
		.media-grid {
			margin-left: 0;
			margin-right: 0;
			grid-template-columns: 1fr 1fr;
		}
		.logos-grid {
			grid-template-rows: 1fr 1fr 0;
			grid-template-columns: 1fr 1fr 1fr;
		}
		.bio-image-grid {
			grid-template-columns: 0 1fr 1fr;
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

		.bio-text-grid {
			grid-template-columns: 0.1fr 1fr 0.1fr;
		}
		.signature-presentation {
			grid-column: 2;
			grid-row: 2;
			width: 100%; /* Adjust width as necessary, or use max-width */
			min-width: 0;
		}
	}

	@media (max-width: 600px) {
		.signature-presentation {
			grid-column: 1;
		}
		.signature-grid {
			grid-template-columns: 1fr;
		}
	}

	@media (max-width: 450px) {
		h1 {
			font-size: 300%;
		}

		h2 {
			font-size: 250%;
		}
	}

	@media (max-width: 280px) {
		.media-grid {
			grid-template-columns: 1fr;
		}
	}
</style>
