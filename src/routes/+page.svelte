<script>
	// @ts-nocheck

	import MediaContainer from './MediaContainer.svelte';
	import { mediaList } from '$lib/mediaList';
	import { onMount } from 'svelte';
	import { underlineVisible } from '$lib/underlineVisibility';

	onMount(() => {
		underlineVisible.set(true);
	});
</script>

<section id="accueil">
	<div class="presentation">
		<div class="titres">
			<h1>Erwan Le Pape</h1>
			<h2>Music Composer</h2>
			<h2>For Film, TV, Performing Arts, Video Games.</h2>
		</div>
		<img
			class="profile-picture"
			src="src/lib/images/photos-personnelles/photo-profil-5.png"
			alt="My Face"
		/>
	</div>

	<div class="media-grid">
		{#each mediaList as media (media.id)}
			<MediaContainer {...media} />
		{/each}
	</div>
</section>

<section id="bio">
	<div class="text-column">
		<h1>Who am I</h1>
		<p>
			Hi, my name is Erwan, I'm a young composer based in Lyon, France. I studied music and
			composition at the conservatory and university and I'm currently doing a Master degree in
			music scoring for films, television and video games. My main influences span from neoclassical
			to contemporary music with a special preference for orchestral music.
		</p>
	</div>
</section>

<section id="contact">
	<h1>Contact</h1>
</section>

<style>
	.titres {
		margin-left:20px;
		width: 100%;
	}

	.presentation {
		display: flex;
		justify-content: flex-start;
		align-items: center;
	}
	.profile-picture {
		margin:20px;
		width: 50%;
	}

	.media-grid {
		display: grid;
		grid-template-columns: 1fr 1fr 1fr 1fr;
	}

	section {
		padding-bottom: 2000px;
	}

	#accueil {
		display: block;
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
