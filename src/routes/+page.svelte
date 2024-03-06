<script>
	// @ts-nocheck
	import MediaSquareContainer from './MediaSquareContainer.svelte';
	import { mediaList } from '$lib/mediaList';
	import { onMount } from 'svelte';
	import { underlineVisible } from '$lib/underlineVisibility';
	import IconsBar from './IconsBar.svelte';

	onMount(() => {
		underlineVisible.set(true);
	});
</script>

<section id="home">
	<div class="presentation">
		<div class="titres">
			<h1 id="main-title">ERWAN LE PAPE</h1>
			<div class="signature-grid">
				<h2>COMPOSER <br>ARRANGER <br> PIANIST</h2>
				<!-- <h3 class="bottom-text">For Film, TV, Performing Arts, Video Games.</h3>
				<div class="empty-rectangle-top-right"></div>
				<div class="empty-rectangle-bottom-left"></div> -->
				<img class="signature-presentation" src="/logo-3.webp" alt="logo" />
			</div>
		</div>

		<!-- <img
			class="profile-picture"
			src="/photo-profil-7.webp"
			alt="Erwan's Presentation"
			style="color: transparent;"
		/> -->
	</div>
</section>

<section id="music">
	<div class="media-grid">
		{#each mediaList as media (media.id)}
			<MediaSquareContainer {...media} />
		{/each}
	</div>
</section>

<section id="bio">
	<h1>Biography</h1>
	<p>
		Hi, my name is Erwan, I'm a young composer based in Lyon, France. I studied music and
		composition at the conservatory and university and I'm currently doing a Master degree in music
		scoring for films, television and video games. My main influences span from neoclassical to
		contemporary music with a special preference for orchestral music.
	</p>
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
		<!-- <div class="contact-text-column">Contact me</div> -->
		<h2 class="downwoard-arrow">↓</h2>
		<div class="contact-icons-column">
			<IconsBar iconsincontactsection={true} columnize={true} />
		</div>
	</div>
</section>

<style>

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
		width: 100%; /* Adjust width as necessary, or use max-width */
		min-width: 250px;
		opacity: 0.7;
	}

	h1 {
		font-weight: 500;
		font-size: 640%;
	}

	h2 {
		font-weight: 300;
		font-size: 400%;
	}

	p {
		font-size: 140%;
		margin-right: 20px;
		text-align: center;
	}

	#bio {
		margin-right: 20px;
	}
	/* This has to do with the top right header icons when in columns*/
	@media (min-width: 831px) {
		#bio {
			margin-right: 80px;
		}
	}

	h1 {
		margin-left: 40px;
	}

	.titres {
		width: 100%;
	}

	.presentation {
		display: flex;
		justify-content: flex-start;
		align-items: center;
		overflow: hidden;
	}

	.media-grid {
		margin-left: 60px;
		margin-right: 60px;
		display: grid;
		grid-template-columns: 1fr 1fr 1fr 1fr;
	}

	section {
		display:block;
		padding-bottom: 180px;
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
	}

	@media (max-width: 680px) {
		#main-title {
			font-weight: 800;
			font-size: 540%;
		}
		h1 {
			font-size: 400%;
		}

		.signature-presentation {
			grid-column: 2;
			grid-row: 2;
			width: 100%; /* Adjust width as necessary, or use max-width */
			opacity: 0.7;
		}
	}

	@media (max-width: 450px) {
		h1 {
			font-size: 300%;
		}
	}

	@media (max-width: 280px) {
		.media-grid {
			grid-template-columns: 1fr;
		}
	}
</style>
