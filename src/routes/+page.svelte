<script>
	// @ts-nocheck
	import MediaContainer from './MediaContainer.svelte';
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
			<h1 id="main-title">Erwan Le Pape</h1>
			<h2>Music Composer</h2>
			<div class="signature-grid">
				<h3 class="bottom-text">For Film, TV, Performing Arts, Video Games.</h3>
				<div class="empty-rectangle-top-right"></div>
				<div class="empty-rectangle-bottom-left"></div>
				<img class="signature-presentation" src="/logo-3.webp" alt="logo" />
			</div>
		</div>

		<img
			class="profile-picture"
			src="/photo-profil-7.webp"
			alt="Erwan's Presentation"
			style="color: transparent;"
		/>
	</div>
</section>

<section id="music">
	<h1>Music</h1>
	<div class="media-grid">
		{#each mediaList as media (media.id)}
			<MediaContainer {...media} />
		{/each}
	</div>
</section>

<section id="bio">
	<h1>Who am I</h1>
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
		<h2 class="contact-text-row">Let's talk! →</h2>
		<div class="contact-icons-row">
			<IconsBar iconsincontactsection={true} />
		</div>
	</div>

	<div class="contact-section-content-column">
		<div class="contact-text-column">Let's talk!</div>
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
	}

	.contact-text-column {
		display: block;
		grid-row: 1;
		font-size: xxx-large;
		font-weight: 600;
		height: 87px;
		justify-self: center;
		margin-inline-start: 40px;
		margin-left: 0;
		line-height: 300%; /*Used to remove space below the text */
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
	}

	.bottom-text {
		grid-column: 1;
		width: 150%;
		grid-row: 1;
	}

	.signature-presentation {
		grid-column: 2;
		grid-row: 2;
		width: 100%; /* Adjust width as necessary, or use max-width */
		min-width: 250px;
		opacity: 0.7;
	}

	h1 {
		font-weight: 800;
		font-size: 640%;
	}

	h2 {
		font-weight: 600;
		font-size: 400%;
	}

	h3 {
		font-weight: 400;
		font-size: 150%;
	}

	p {
		font-size: 140%;
		margin-right: 40px;
		text-align: justify;
	}

	h1,
	h2,
	h3,
	p {
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

	.profile-picture {
		position: relative;
		margin: 20px;
		width: 60%;
		opacity: 0.95;
		height: 87vh;
		object-fit: contain;
	}

	.media-grid {
		display: grid;
		grid-template-columns: 1fr 1fr 1fr 1fr;
	}

	section {
		padding-bottom: 500px;
	}

	#home {
		display: block;
		height: 100vh;
	}

	@media (max-width: 900px) {
		.media-grid {
			grid-template-columns: 1fr 1fr 1fr;
		}
	}

	@media (max-width: 768px) {
		.media-grid {
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
		.profile-picture {
			bottom: 15px;
			right: 170px;
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
