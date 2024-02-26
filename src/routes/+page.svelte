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

<section id="home">
	<div class="presentation">
		<div class="titres">
			<h1>Erwan Le Pape</h1>
			<h2>Music Composer</h2>
			<h3>For Film, TV, Performing Arts, Video Games.</h3>
		</div>

		<img src="/src/lib/images/autres/logo-3.png" alt="logo" class="logo-presentation" />

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

	.logo-presentation {
		position: absolute;
		top: 65vh;
		left: 30%;
		transform: translateX(-30%);
		z-index: 1001;
		width: 30vh;
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
		overflow: hidden;
	}

	.profile-picture {
		position: relative;
		margin: 20px;
		width: 60%;
		z-index: 1000;
		opacity: 0.9;
		height: 87vh;
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

@media (max-width: 550px) {
	.profile-picture {
		top: -145px;
		right: 180px;
	}
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
