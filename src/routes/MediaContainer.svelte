<script>
    export let image = "";
    export let title = "";
    export let author = "";
    export let type = "";
    export let work = "";
    export let horizontalOffset = '0%';
    export let verticalOffset = '0%';
</script>

<div class="media-container">
    <div class="media-image-wrapper">
        <img src={image} alt={title} class="media-image" style="--horizontal-offset: {horizontalOffset}; --vertical-offset: {verticalOffset}" />
    </div>
    <div class="media-info">
        <a href="/path-to-media" class="media-title">{title}</a> -
        <span class="media-author">{author}</span>
        <div class="media-type">{type}</div>
        <div class="media-work">{work}</div>
    </div>
</div>

<style>
    .media-container {
        position: relative;
        overflow: hidden;
    }
    .media-image-wrapper {
        width: 100%;
        padding-bottom: 100%; /* Equal to width to maintain square aspect ratio */
        position: relative;
    }
    .media-image {
        position: absolute;
        width: 100%;
        object-fit: cover;
        height: calc(100% + var(--vertical-offset));
        width: calc(100% + var(--horizontal-offset));
        transition: opacity 0.3s ease;
        left: var(--horizontal-offset, 0%);
        top: var(--vertical-offset, 0%);
        overflow: visible;
    }
    .media-info {
        position: absolute;
        top: 0;   
        left: 0;  
        right: 0; 
        bottom: 0;
        display: flex; 
        flex-direction: column; 
        justify-content: center; 
        align-items: center; 
        text-align: center; 
        background: rgba(0, 0, 0, 0.5); 
        color: white;
        visibility: hidden;
        opacity: 0;
        transition:
            visibility 0s,
            opacity 0.3s ease;
        padding: 10px;
    }

    .media-container:hover .media-image {
        opacity: 0.3;
    }
    .media-container:hover .media-info {
        visibility: visible;
        opacity: 1;
    }
</style>
