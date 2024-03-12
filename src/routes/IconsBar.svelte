<script>
	// @ts-nocheck

	import { fade } from 'svelte/transition';

	export let iconsincontactsection = false;
	export let columnize = false;

	let alignmailleft = false;
	$: alignmailleft = columnize;

	let isPhoneShown = false;
	let isMailShown = false;

	function phoneClickHandler() {
		if (!iconsincontactsection) {
			isPhoneShown = !isPhoneShown;
		}
	}

	function mailClickHandler() {
		if (!iconsincontactsection) {
			isMailShown = !isMailShown;
		}
	}
</script>

<ul class="icon-bar-container" class:iconsincontactsection class:columnize>
	<!-- <li class="phone-container">
		{#if isPhoneShown || iconsincontactsection}
			<div class="phone-box" transition:fade={{ duration: 60 }}>
				<span class="phone-part">+33 6 47</span> <span class="phone-part">86 26 23</span>
			</div>
		{/if}
		<button class="icon-button-or-link" on:click={phoneClickHandler}>
			{#if iconsincontactsection}
				<img class="icon-large" src="/icons/phone.webp" alt="Phone Icon" />
			{:else}
				<img class="icon-normal" src="/icons/phone.webp" alt="Phone Icon" />
			{/if}
		</button>
	</li> -->
	<li class="email-container">
		<button class="icon-button-or-link" on:click={mailClickHandler}>
			{#if iconsincontactsection}
				<img class="icon-large" src="/icons/mail.png" alt="Mail Icon" />
			{:else}
				<img class="icon-normal" src="/icons/mail.png" alt="Mail Icon" />
			{/if}
		</button>
		{#if isMailShown || iconsincontactsection}
			<div class="email-box" class:alignmailleft class:columnize transition:fade={{ duration: 50 }}>
				<span class="email-part">erwanlepape</span>@<span class="email-part">outlook.com</span>
			</div>
		{/if}
	</li>
	<li>
		<a class="icon-button-or-link" href="https://soundcloud.com/erwanlepape" target="_blank">
			{#if iconsincontactsection}
				<img class="icon-large" src="/icons/soundcloud.png" alt="Soundcloud Link" />
			{:else}
				<img class="icon-normal" src="/icons/soundcloud.png" alt="Soundcloud Link" />
			{/if}
		</a>
	</li>
	<li>
		<a class="icon-button-or-link" href="https://www.instagram.com/erwanklp/" target="_blank">
			{#if iconsincontactsection}
				<img class="icon-large" src="/icons/instagram.png" alt="Instagram Link" />
			{:else}
				<img class="icon-normal" src="/icons/instagram.png" alt="Instagram Link" />
			{/if}
		</a>
	</li>
	<li>
		<a class="icon-button-or-link" href="https://discord.com/users/783996252018573332" target="_blank">
			{#if iconsincontactsection}
				<img class="icon-large" src="/icons/discord.png" alt="Discord Link" />
			{:else}
				<img class="icon-normal" src="/icons/discord.png" alt="Discord Link" />
			{/if}
		</a>
	</li>
	<li>
		<a class="icon-button-or-link" href="https://www.facebook.com/profile.php?id=61551473833966" target="_blank">
			{#if iconsincontactsection}
				<img class="icon-large" src="/icons/facebook.png" alt="Facebook Link" />
			{:else}
				<img class="icon-normal" src="/icons/facebook.png" alt="Facebook Link" />
			{/if}
		</a>
	</li>
	<li>
		<a class="icon-button-or-link" href="https://www.linkedin.com/in/erwan-le-pape-9b80372ba/" target="_blank">
			{#if iconsincontactsection}
				<img class="icon-large" src="/icons/linkedin.png" alt="Linkedin Link" />
			{:else}
				<img class="icon-normal" src="/icons/linkedin.png" alt="Linkedin Link" />
			{/if}
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
		left: 27%;
		transform: translate(-50%, -5px); /* Center it horizontally and move it 10px down */
		font-size: larger;
		opacity: 1;
		color: white;
	}

	.email-container {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		position: relative;
	}

	.icon-large {
		width: 50px;
		height: 50px;
		margin: auto; /* Center the icon */
		display: block;
		filter: grayscale(1);
		transition: 0.1s filter linear;
	}

	.icon-normal {
		width: 40px;
		height: 40px;
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
		margin-right: 20px;
		padding: 0px;
		background: none;
		border: none;
	}

	.icon-large:hover,
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
		justify-content: center;
		list-style: none;
		background-size: contain;
		background-color: transparent;
	}

	.icon-bar-container.iconsincontactsection {
		position: absolute;
	}

	.icon-bar-container.iconsincontactsection.columnize {
		right: 50%;
		transform: translate(194%);
	}

	@media (max-width: 450px) {
		.icon-bar-container.iconsincontactsection.columnize {
			right: 0; /* Align with the parent container */
			transform: translateX(-50%); /* Move it to the left to ensure visibility */
			font-size: small;
		}
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
