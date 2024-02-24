<script lang="ts">
    import {page} from '$app/stores';
    import type { PageData } from '../$types';
    
    const titreFilm = $page.params.film;
    export let data: PageData;
</script>

{JSON.stringify($page)}
<h1>{JSON.stringify(data)}</h1>
<div>{@html data}</div>