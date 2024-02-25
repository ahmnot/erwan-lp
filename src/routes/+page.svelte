<script>
	import MediaContainer from './MediaContainer.svelte';
	import { mediaList } from '$lib/mediaList';
	import { onMount } from 'svelte';
	import { underlineVisible } from '$lib/underlineVisibility';

  onMount(() => {
    underlineVisible.set(true);
  })

</script>

<section id="accueil">
	<h1>Bienvenue</h1>

	<div class="media-grid">
		{#each mediaList as media}
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
	.media-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
	}

	section {
		padding-bottom: 2000px;
	}

	#accueil {
		display: block;
	}

	h1 {
		width: 100%;
	}

	@media (max-width: 400px) {
		.media-grid {
			display: grid;
			grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
		}
	}
</style>
