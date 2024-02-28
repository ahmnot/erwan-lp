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

	function handleKeyDownPhone(event) {
		if (event.key === 'Enter' || event.key === ' ') {
			phoneClickHandler();
		}
	}

	function handleKeyDownMail(event) {
		if (event.key === 'Enter' || event.key === ' ') {
			mailClickHandler();
		}
	}
</script>

<ul class="socials" class:socialsincontact>
	<li>
		<button
			class="phone-icon-button"
			on:click={phoneClickHandler}
			on:keydown={handleKeyDownPhone}
			tabindex="0"
		>
			<img class="phone-icon" src="/icons/phone.webp" alt="Phone Icon" />
		</button>
		{#if isPhoneShown || socialsincontact}
			<div class="phone-box" transition:fade={{ duration: 60 }}>+33 6 47 86 26 23</div>
		{/if}
	</li>
	<li>
		<button
			class="mail-icon-button"
			on:click={mailClickHandler}
			on:keydown={handleKeyDownMail}
			tabindex="0"
		>
			<img class="mail-icon" src="/icons/mail.webp" alt="Mail Icon" />
		</button>
		{#if isMailShown || socialsincontact}
			<div class="email-box" transition:fade={{ duration: 60 }}>erwanlepape@outlook.com</div>
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
	button {
	}

	img {
		position: sticky;
		width: 50%;
		top: 50%;
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
		position: relative;
		height: 100%;
	}

	.phone-box {
		position: absolute;
		top: 60%;
		right: 120%;
		transform: translateX(50%);
		transform: translateY(-50%);
		font-size: larger;
		white-space: nowrap;
		opacity: 1;
		color: white;
	}

	.email-box {
		position: absolute;
		right: 77%;
		transform: translate(50%);
		font-size: larger;
		opacity: 1;
		color: white;
	}

	.phone-icon-button {
		margin-right: 20px;
		padding: 0px;
		background: none;
		border: none;
	}

	.phone-icon {
		filter: grayscale(1);
		transition: 0.1s filter linear;
	}

	.phone-icon:hover {
		filter: grayscale(0);
		cursor: pointer;
	}

	.mail-icon-button {
		margin-right: 20px;
		padding: 0px;
		background: none;
		border: none;
	}

	.mail-icon {
		filter: grayscale(1);
		transition: 0.1s filter linear;
	}

	.mail-icon:hover {
		filter: grayscale(0);
		cursor: pointer;
	}

	.instagram-icon-link {
		margin-right: 20px;
		padding: 0px;
	}

	.instagram-icon {
		filter: grayscale(1);
		transition: 0.1s filter linear;
	}

	.instagram-icon:hover {
		filter: grayscale(0);
	}

	.soundcloud-icon-link {
		margin-right: 20px;
		padding: 0px;
	}

	.soundcloud-icon {
		filter: grayscale(1);
		transition: 0.1s filter linear;
	}

	.soundcloud-icon:hover {
		filter: grayscale(0);
	}
</style>
