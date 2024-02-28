<script>
	// @ts-nocheck

	import { fade } from 'svelte/transition';

	export let socialsincontact = false;
	export let columnize = false;

	let alignmailleft = false;
	$: alignmailleft = columnize;

	let isPhoneShown = false;
	let isMailShown = false;

	function phoneClickHandler() {
		if (!socialsincontact) {
			isPhoneShown = !isPhoneShown;
		}
	}

	function mailClickHandler() {
		if (!socialsincontact) {
			isMailShown = !isMailShown;
		}
	}
</script>

<ul class="socials" class:socialsincontact class:columnize>
	<li class="phone-container">
		{#if isPhoneShown || socialsincontact}
			<div class="phone-box" transition:fade={{ duration: 60 }}>+33 6 47 86 26 23</div>
		{/if}
		<button class="phone-icon-button" on:click={phoneClickHandler}>
			<img class="phone-icon" src="/icons/phone.webp" alt="Phone Icon" />
		</button>
	</li>
	<li class="email-container">
		<button class="mail-icon-button" on:click={mailClickHandler}>
			<img class="mail-icon" src="/icons/mail.webp" alt="Mail Icon" />
		</button>
		{#if isMailShown || socialsincontact}
			<div class="email-box" class:alignmailleft transition:fade={{ duration: 50 }}>
				erwanlepape@outlook.com
			</div>
		{/if}
	</li>
	<li>
		<a class="soundcloud-icon-link" href="https://soundcloud.com/erwanlepape" target="_blank">
			<img class="soundcloud-icon" src="/icons/soundcloud.webp" alt="Soundcloud Link" />
		</a>
	</li>
	<li>
		<a class="instagram-icon-link" href="https://www.instagram.com/erwanklp/" target="_blank">
			<img class="instagram-icon" src="/icons/instagram.webp" alt="Instagram Link" />
		</a>
	</li>
</ul>

<style>
	.alignmailleft {
		left: -340% !important;
		top: 50% !important;
		transform: translate(0, -50%) !important;
	}

	.columnize {
		flex-direction: column;
	}

	.phone-icon,
	.mail-icon,
	.soundcloud-icon,
	.instagram-icon {
		width: 32px;
		height: 32px;
		margin: auto; /* Center the icon */
		display: block;
	}

	.phone-icon-button,
	.mail-icon-button,
	.instagram-icon-link,
	.soundcloud-icon-link {
		display: flex; /* Use flexbox to center content */
		justify-content: center; /* Center horizontally */
		align-items: center; /* Center vertically */
		width: 50px; /* ensure it's larger than the icon for padding */
		height: 50px; /* ensure it's larger than the icon for padding */
		padding: 10px;
	}

	li.phone-container {
		position: relative;
		display: inline-flex;
		align-items: center;
		justify-content: center;
	}

	li.email-container {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.phone-box {
		position: absolute;
		left: -100%;
		top: 50%;
		transform: translate(-60%, -50%);
		font-size: larger;
		white-space: nowrap;
		opacity: 1;
		color: white;
	}

	.email-box {
		position: absolute;
		top: 100%; /* Position the top of the email-box right at the bottom of the button */
		left: 38%; /* Start at the horizontal center of the button */
		transform: translate(-50%, 10px); /* Center it horizontally and move it 10px down */
		font-size: larger;
		white-space: nowrap;
		opacity: 1;
		color: white;
	}

	.socials.socialsincontact {
		position: absolute;
		display: flex;
		right: 10%;
		opacity: 0.7;
		margin: 0;
		justify-content: center;
		list-style: none;
		background-size: contain;
		background-color: transparent;
	}

	.socials {
		display: flex;
		position: fixed;
		right: 0px;
		opacity: 0.7;
		margin: 0;
		justify-content: center;
		list-style: none;
		background-size: contain;
		background-color: transparent;
	}

	li {
		display: flex; /* This makes sure the content of li is centered if needed */
		align-items: center; /* Center vertically in case of different heights */
		justify-content: center; /* Center horizontally */
	}

	.phone-icon,
	.mail-icon,
	.instagram-icon,
	.soundcloud-icon {
		filter: grayscale(1);
		transition: 0.1s filter linear;
	}

	.phone-icon:hover,
	.mail-icon:hover {
		filter: grayscale(0);
		cursor: pointer;
	}

	.instagram-icon:hover,
	.soundcloud-icon:hover {
		filter: grayscale(0);
	}

	.phone-icon-button,
	.mail-icon-button {
		margin-right: 20px;
		padding: 0px;
		background: none;
		border: none;
	}

	.instagram-icon-link,
	.soundcloud-icon-link {
		margin-right: 20px;
		padding: 0px;
	}
</style>
