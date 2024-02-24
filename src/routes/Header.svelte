<script>
// @ts-nocheck

  let clickedLink = "";

  function toggleUnderline(linkId) {
    // Update the clicked link
    clickedLink = linkId === clickedLink ? null : linkId;
  }

</script>

<header>
	<nav>
		<ul>
		  <li>
			<a href="/#accueil" on:click={() => toggleUnderline('accueil')}
				style="--underline-width: {clickedLink === 'accueil' ? '100%' : '0'};">Accueil
			</a>
		  </li>
		  <li>
			<a href="/#bio" on:click={(e) => toggleUnderline('bio')}
				style="--underline-width: {clickedLink === 'bio' ? '100%' : '0'};">Bio</a>
		  </li>
		  <li>
			<a href="/#contact" on:click={(e) => toggleUnderline('contact')}
				style="--underline-width: {clickedLink === 'contact' ? '100%' : '0'};">Contact</a>
		  </li>
		</ul>
	  </nav>
</header>

<style>
	header {
	  display: flex;
	  position: fixed;
	  top: 0;
	  right: 0;
	  width: 100%;
	  justify-content: space-between;
	  background-color: black;
	  box-shadow: 0 2px 5px rgba(255, 255, 255, 0.2);
	  z-index: 1000;
	  flex-direction: column;
	  justify-content: start; /* Align content to the top */
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
  
	a:hover {
	  color: var(--color-theme-1);
	}
  
	nav a::after {
	  content: "";
	  position: absolute;
	  bottom: 10px; 
	  left: 0;
	  width: var(--underline-width, 0); 
	  height: 2px; 
	  background-color: var(--color-theme-1); /* Color of the underline */
	}
</style>
