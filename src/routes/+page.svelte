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
	$: showreelWidth = mediaGridElementWidth/1.5;
	$: showreelHeight = showreelWidth * 0.5625;

	// function handleSubmit(event) {
	// 	const formData = new FormData(event.target);
	// 	const formProps = Object.fromEntries(formData);
	// 	// Now formProps contains the form data

	// 	// Example: send this data to your backend or an email API
	// 	fetch('/api/send-email', {
	// 		method: 'POST',
	// 		headers: {
	// 			'Content-Type': 'application/json'
	// 		},
	// 		body: JSON.stringify(formProps)
	// 	})
	// 		.then((response) => {
	// 			if (response.ok) {
	// 				// Handle successful email sending (e.g., show a success message)
	// 				console.log('Email sent successfully');
	// 			} else {
	// 				// Handle errors (e.g., show an error message)
	// 				console.log('Failed to send email');
	// 			}
	// 		})
	// 		.catch((error) => console.error('Error:', error));
	// }

	onMount(() => {
		underlineVisible.set(true);
	});
</script>

<svelte:window bind:innerWidth bind:innerHeight />

<section id="home">
	<div class="presentation">
		<div class="titres">
			<h1 id="main-title">ERWAN LE PAPE</h1>
			<div class="signature-grid">
				<h2>COMPOSER <br />ARRANGER <br /> PIANIST</h2>
				<!-- <h3 class="bottom-text">For Film, TV, Performing Arts, Video Games.</h3>
				<div class="empty-rectangle-top-right"></div>
				<div class="empty-rectangle-bottom-left"></div> -->
				<img class="signature-presentation" src="/logo-3.webp" alt="logo" />
			</div>
		</div>
		<div class="showreel">
			<iframe
				width={showreelWidth}
				height={showreelHeight}
				src="https://www.youtube.com/embed/BteChDYwoBs"
				title="YouTube video player"
				frameborder="0"
				allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
				allowfullscreen
			></iframe>
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
	<div class="media-grid" bind:clientWidth={mediaGridElementWidth}>
		{#each mediaList as media (media.id)}
			<MediaSquareContainer {...media} />
		{/each}
	</div>
</section>

<section id="bio">
	<h1>Biography</h1>
	<div class="bio-centering-grid">
		<div></div>
		<p>
			Hi, my name is Erwan, I'm a young composer based in Lyon, France. I studied music and
			composition at the conservatory and university and I'm currently doing a Master degree in
			music scoring for films, television and video games. My main influences span from neoclassical
			to contemporary music with a special preference for orchestral music.
		</p>
		<div></div>
	</div>
</section>

<section id="contact">
	<h1>Contact</h1>
	<div class="contact-section-content-row">
		<h2 class="contact-text-row">→</h2>
		<!-- <form on:submit|preventDefault={handleSubmit}>
			<div>
				<label for="email">Email:</label>
				<input type="email" id="email" name="email" required />
			</div>
			<div>
				<label for="subject">Subject:</label>
				<input type="text" id="subject" name="subject" required />
			</div>
			<div>
				<label for="message">Message:</label>
				<textarea id="message" name="message" rows="4" required></textarea>
			</div>
			<button type="submit">Send</button>
		</form> -->
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
	.showreel {
		margin: 40px;
	}
	.bio-centering-grid {
		display: grid;
		grid-template-columns: 0.5fr 1fr 0.5fr;
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
		width: 100%; /* Adjust width as necessary, or use max-width */
		min-width: 250px;
	}

	h1 {
		font-weight: 500;
		font-size: 640%;
	}

	h2 {
		font-weight: 300;
		font-size: 400%;
		color: var(--color-theme-1);
	}

	p {
		font-size: 140%;
		text-align: center;
	}

	/* This has to do with the top right header icons when in columns*/
	@media (min-width: 831px) {
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
		flex-direction: column;
	}

	.media-grid {
		margin-left: 60px;
		margin-right: 60px;
		display: grid;
		grid-template-columns: 1fr 1fr 1fr 1fr;
	}

	section {
		display: block;
		margin-bottom:20px
	}

	#home {
		height: 100%;
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
			font-size: 540%;
		}
		h1 {
			font-size: 400%;
		}

		h2 {
			font-size: 300%;
		}

		.bio-centering-grid {
			grid-template-columns: 0.1fr 1fr 0.1fr;
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
