<script>
	// @ts-nocheck
	import MediaContainer from './MediaContainer.svelte';
	import { mediaList } from '$lib/mediaList';
	import { onMount } from 'svelte';
	import { underlineVisible } from '$lib/underlineVisibility';
	import SocialBar from './SocialBar.svelte';

	let socialsincontact = true;

	onMount(() => {
		underlineVisible.set(true);
	});
</script>

<section id="home">
	<div class="presentation">
		<div class="titres">
			<h1 id="main-title">Erwan Le Pape</h1>
			<h2>Music Composer</h2>
			<h3 id="bottom-text">For Film, TV, Performing Arts, Video Games.</h3>
		</div>
		<img class="signature-presentation" src="/logo-3.webp" alt="logo" />

		<img class="profile-picture" src="/photo-profil-7.webp" alt="Erwan's Presentation" style="color: transparent;" />
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
	<div class="contact-section-content">
		<h2 class="contact-text">Let's talk! →</h2>
		<SocialBar {socialsincontact} />
	</div>
</section>

<style>

	.contact-section-content {
		display: flex;
		flex-direction: row;
		align-items: center;
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

	.signature-presentation {
		position: absolute;
		bottom: 60px;
		left: 300px;
		width: 30vw;
		opacity: 0.7;
	}

	.titres {
		position: relative; /* Add this line */
		width: 100%;
	}

	.presentation {
		position: relative;
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
		padding-bottom: 800px;
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

	@media (max-width: 550px) {
		#main-title {
			font-weight: 800;
			font-size: 540%;
		}
		h1 {
			font-size: 400%;
		}

		.signature-presentation {
			position: absolute;
			bottom: -10px;
			left: 200px;
			width: 70%;
			z-index: 1001;
			opacity: 0.7;
		}
		.profile-picture {
			top: -145px;
			right: 180px;
		}
	}

	@media (max-width: 280px) {
		.media-grid {
			grid-template-columns: 1fr;
		}
	}
</style>
