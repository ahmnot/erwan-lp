<script>
	// @ts-nocheck

	import { fade } from 'svelte/transition';

	export let socialsincontact = false;

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

<ul class="socials" class:socialsincontact>
	<li class="phone-container">
		{#if isPhoneShown || socialsincontact}
			<div class="phone-box" transition:fade={{ duration: 60 }}>+33 6 47 86 26 23</div>
		{/if}
		<button
			class="phone-icon-button"
			on:click={phoneClickHandler}
		>
			<img class="phone-icon" src="/icons/phone.webp" alt="Phone Icon" />
		</button>
	</li>
	<li class="email-container">
		<button
			class="mail-icon-button"
			on:click={mailClickHandler}
		>
			<img class="mail-icon" src="/icons/mail.webp" alt="Mail Icon" />
		</button>
		{#if isMailShown || socialsincontact}
			<div class="email-box" transition:fade={{ duration: 50 }}>erwanlepape@outlook.com</div>
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

	.phone-icon,
	.mail-icon,
	.soundcloud-icon,
	.instagram-icon {
		width: 32px; /* Adjust based on your preferred size */
		height: 32px; /* Adjust based on your preferred size */
		margin: auto; /* Center the icon */
		display: block; /* Allows margin: auto to center the icon vertically */
	}

	/* Ensure the buttons are styled to center their content */
	.phone-icon-button,
	.mail-icon-button,
	.instagram-icon-link,
	.soundcloud-icon-link {
		display: flex; /* Use flexbox to center content */
		justify-content: center; /* Center horizontally */
		align-items: center; /* Center vertically */
		width: 50px; /* Adjust, ensure it's larger than the icon for padding */
		height: 50px; /* Adjust, ensure it's larger than the icon for padding */
		padding: 10px; /* Adjust or remove padding based on your design */
	}
	li.phone-container {
		display: flex;
		align-items: center; /* This will vertically center the items in the li */
		justify-content: flex-start; /* Align items to the start of the li, which is the left side */
		gap: 10px; /* This adds space between the phone-box and the phone-icon-button */
	}

	li.email-container {
		position: relative; /* Add this to your existing li styles */
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.phone-box {
		font-size: x-large;
		white-space: nowrap;
		opacity: 1;
		color: white;
	}

	.email-box {
		position: absolute;
		top: 100%; /* Position the top of the email-box right at the bottom of the button */
		left: 38%; /* Start at the horizontal center of the button */
		transform: translate(-50%, 10px); /* Center it horizontally and move it 10px down */
		font-size: x-large;
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
