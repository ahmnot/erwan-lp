<script>
// @ts-nocheck

	import Header from './Header.svelte';
	import './styles.css';
	import './fonts.css';
</script>

<div class="app">
	<Header />

	<main>
		<slot />
	</main>

	<footer>
		<p>© Copyright 2024 - Erwan Le Pape - site made by <a href="https://github.com/ahmnot">Othman Moatassime</a></p>
	</footer>
</div>

<style>
	.app {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}

	main {
		flex: 1;
		display: flex;
		flex-direction: column;
		padding-top: 94.4px; /* Adjust based on the height of your header */
		width: 100%;
		margin: 0 auto;
		box-sizing: border-box;
	}

	footer {
		display: flex;
		flex-direction: column;
		justify-content: center;
		width: 100%;
		align-items: center;
		box-shadow: 0 -1px 0px rgba(255, 255, 255, 0.2);
	}

	@media (min-width: 480px) {
		footer {
			padding: 12px 0;
		}
	}
</style>
