<script>
	// @ts-nocheck
	export let videoId = '';
	export let image = '';

	function loadIframe(div, videoId) {
		var iframe = document.createElement('iframe');
		iframe.setAttribute('src', 'https://www.youtube.com/embed/' + videoId + '?autoplay=1');
		iframe.setAttribute('frameborder', '0');
		iframe.setAttribute('allowfullscreen', '1');
		iframe.setAttribute(
			'allow',
			'accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture'
		);
		iframe.style =
			'position: absolute; top: 0; left: 0; width: 100%;height: 100%;z-index: 100;background: transparent;';
		div.parentNode.replaceChild(iframe, div);
	}
</script>

<div class="youtube-player">
	{#if videoId.includes('videoseries')}
		<iframe
			src="https://www.youtube.com/embed/{videoId}"
			title="YouTube video player"
			frameborder="0"
			allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
			allowfullscreen
			style='position: absolute; top: 0; left: 0; width: 100%;height: 100%;z-index: 100;background: transparent;'
		></iframe>
	{:else}
		<button on:click={loadIframe(this, videoId)} aria-label="YouTube Player Button">
			{#if image !== ''}
				<img src={image} alt="" />
			{:else}
				<img src="//i.ytimg.com/vi/{videoId}/hqdefault.jpg" alt="" />
			{/if}
			<div class="playButton"></div>
		</button>
	{/if}
</div>

<style>
	.youtube-player {
		position: relative;
		padding-bottom: 56.25%;
		height: 0;
		overflow: hidden;
		max-width: 100%;
		background: #000;
	}

	.youtube-player img {
		object-fit: cover;
		display: block;
		left: 0;
		bottom: 0;
		margin: auto;
		max-width: 100%;
		width: 100%;
		position: absolute;
		right: 0;
		top: 0;
		border: none;
		height: auto;
		cursor: pointer;
		-webkit-transition: 0.4s all;
		-moz-transition: 0.4s all;
		transition: 0.4s all;
	}

	.youtube-player img:hover {
		filter: brightness(75%);
		-webkit-filter: brightness(75%);
	}

	.youtube-player .playButton {
		height: 48px;
		width: 68px;
		left: 50%;
		top: 50%;
		margin-left: -34px;
		margin-top: -24px;
		position: absolute;
		background: url('/youtube.webp') no-repeat;
		cursor: pointer;
	}
</style>
