<script>
	// @ts-nocheck

	import { fade, fly } from 'svelte/transition';
	import MediaContainer from './MediaContainer.svelte';
	import { mediaList } from '$lib/mediaList';
	import { onMount } from 'svelte';
	import { underlineVisible } from '$lib/underlineVisibility';

	onMount(() => {
		underlineVisible.set(true);
	});
</script>

<section id="home">
	<div class="presentation">
		<div class="titres">
			<h1>Erwan Le Pape</h1>
			<h2>Music Composer</h2>
			<h2>For Film, TV, Performing Arts, Video Games.</h2>
		</div>

		<img
			src="\src\lib\images\autres\logo-signature-transparent.png"
			alt="logo"
			class="logo-presentation"
		/>

		<img
			class="profile-picture"
			src="src/lib/images/photos-personnelles/photo-profil-5.png"
			alt="My Face"
		/>
	</div>
</section>

<div class="media-grid">
	{#each mediaList as media (media.id)}
		<MediaContainer {...media} />
	{/each}
</div>

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
</section>

<style>
	h1,
	h2,
	p {
		margin-left: 20px;
	}

	.logo-presentation {
		position: absolute;
		left:30%;
		transform: translateX(-30%);
		z-index: 1001;
		width: 50%;
		opacity: 0.5;
	}

	.titres {
		width: 100%;
	}

	.presentation {
		position: relative;
		display: flex;
		justify-content: flex-start;
		align-items: center;
	}

	.profile-picture {
		margin: 20px;
		width: 100%;
		z-index: 1000;
		opacity: 0.9;
		height: 90vh;
		object-fit: contain;
	}

	.media-grid {
		display: grid;
		grid-template-columns: 1fr 1fr 1fr 1fr;
	}

	section {
		padding-bottom: 100px;
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

	@media (max-width: 250px) {
		.media-grid {
			grid-template-columns: 1fr;
		}
	}
</style>
