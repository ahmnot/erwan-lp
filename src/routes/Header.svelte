<script lang="ts">
	import { page } from '$app/stores';
	import logo from '$lib/images/autres/logo-signature-transparent-upscale.png';

</script>

<header>
	<div class="corner-left">
		<a href="http://localhost:5173/">
			<img src={logo} alt="logo-signature" />
		</a>
	</div>

	<nav>
		<ul>
			<li aria-current={$page.url.pathname === '/' ? 'page' : undefined}>
				<a href="/">Accueil</a>
			</li>
			<li aria-current={$page.url.pathname === '/bio' ? 'page' : undefined}>
				<a href="/bio">Bio</a>
			</li>
			<li aria-current={$page.url.pathname === '/contact' ? 'page' : undefined}>
				<a href="/contact">Contact</a>
			</li>
		</ul>
	</nav>
	<div></div>
</header>

<style>
	header {
		display: flex;
		justify-content: space-between;
		background-color: transparent;
	}

	.corner-left {
		width: 10px;
		height: 10px;
	}

	nav {
		position: relative;
		display: flex;
		justify-content: center;
		--background: rgba(255, 255, 255, 0.7);
	}

	ul {
		position: relative;
		padding: 0;
		margin: 0;
		height: 3em;
		display: flex;
		justify-content: center;
		align-items: center;
		list-style: none;
		background: var(--background);
		background-size: contain;
		background-color: transparent;
	}

	li {
		position: relative;
		height: 100%;
	}

	nav a {
		display: flex;
		height: 100%;
		align-items: center;
		padding: 0 0.5rem;
		color: var(--color-text);
		font-weight: 700;
		font-size: 0.8rem;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		text-decoration: none;
		transition: color 0.2s linear;
		overflow: hidden;
	}

	nav a::after {
		content: '';
		position: absolute;
		bottom: -5px; /* Adjust based on your design */
		left: 50%;
		width: 0%;
		height: 2px; /* Thickness of the underline */
		background-color: var(--color-theme-1); /* Color of the underline */
	}

	li[aria-current='page'] a::after {
		width: 100%; /* Full width of the link */
		left: 0; /* Align to the left edge */
	}

	a:hover {
		color: var(--color-theme-1);
	}

</style>
