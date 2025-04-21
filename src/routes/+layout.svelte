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
		<p>
			© Copyright 2024 - Erwan Le Pape - site by <a href="https://github.com/ahmnot">ahmnot</a>
		</p>
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
		padding-top: 100px;
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
		box-shadow: 0 -1px 0px rgba(255, 255, 255, 0.15);
		padding: 0px 0;
		margin-top: 0;
		height: 40px;
		text-align: center;
		font-size: medium;
	}
	p {
		margin: 10px;
		opacity: 0.9;
		font-size: small;
	}

	@media (max-width: 840px) {
		main {
			padding-top: 80px; /* = hauteur de .header-small */
		}
	}
</style>
