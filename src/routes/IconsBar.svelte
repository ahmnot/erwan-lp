<script>
	// @ts-nocheck

	import { fade } from 'svelte/transition';

	export let columnize = false;

	let alignmailleft = false;
	$: alignmailleft = columnize;

	let isMailShown = false;

	function mailClickHandler() {
			isMailShown = !isMailShown;
	}
</script>

<ul class="icon-bar-container" class:columnize>
	<li class="email-container">
		<button class="icon-button-or-link" on:click={mailClickHandler}>
				<img class="icon-normal" src="/icons/mail.png" alt="Mail Icon" />
		</button>
		{#if isMailShown}
			<div class="email-box" class:alignmailleft class:columnize transition:fade={{ duration: 50 }}>
				<span class="email-part">erwanlepape</span>@<span class="email-part">outlook.com</span>
			</div>
		{/if}
	</li>
	<li>
		<a class="icon-button-or-link" href="https://soundcloud.com/erwanlepape" target="_blank">
				<img class="icon-normal" src="/icons/soundcloud.png" alt="Soundcloud Link" />
		</a>
	</li>
	<li>
		<a class="icon-button-or-link" href="https://www.instagram.com/erwanklp/" target="_blank">
				<img class="icon-normal" src="/icons/instagram.png" alt="Instagram Link" />
		</a>
	</li>
	<li>
		<a class="icon-button-or-link" href="https://discord.com/users/783996252018573332" target="_blank">
				<img class="icon-normal" src="/icons/discord.png" alt="Discord Link" />
		</a>
	</li>
	<li>
		<a class="icon-button-or-link" href="https://www.youtube.com/@ErwanKLP" target="_blank">
				<img class="icon-normal" src="/icons/youtube.png" alt="youtube Link" />
		</a>
	</li>
</ul>

<style>
	.email-part {
		display: inline;
	}

	.columnize {
		flex-direction: column;
	}

	/* Adjust the email-box positioning when columnize is true */
	.email-box.alignmailleft {
		position: absolute;
		left: auto;
		right: 100%;
		top: 50%;
		transform: translate(-4%, -50%);
	}

	.email-box {
		position: absolute;
		top: 100%;
		left: 35%;
		transform: translate(-50%, -5px); /* Center it horizontally and move it 10px down */
		font-size: larger;
		opacity: 1;
		color: var(--color-theme-1);
	}

	.email-container {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		position: relative;
	}

	.icon-normal {
		width: 35px;
		height: 35px;
		margin: auto; /* Center the icon */
		display: block;
		filter: grayscale(1);
		transition: 0.1s filter linear;
	}

	.icon-button-or-link {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 50px;
		height: 50px; 
		margin-right: 40px;
		padding: 0px;
		background: none;
		border: none;
	}

	.icon-normal:hover {
		filter: grayscale(0);
		cursor: pointer;
	}

	li.email-container {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.icon-bar-container {
		display: flex;
		position: fixed;
		right: 0px;
		opacity: 1;
		margin: 0;
		margin-right: 40px;
		justify-content: center;
		list-style: none;
		background-size: contain;
		background-color: transparent;
	}

	@media (max-width: 340px) {
		.email-box .email-part:first-child {
			display: block;
		}
	}

	li {
		display: flex; /* This makes sure the content of li is centered if needed */
		align-items: center; /* Center vertically in case of different heights */
		justify-content: center; /* Center horizontally */
	}
</style>
