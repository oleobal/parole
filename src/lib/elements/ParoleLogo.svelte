<script lang="ts">
  import { text } from "../locales";
  import { appSettings } from "../state.svelte";
  import { capitalize, shuffle } from "../util";
  
  const fr = capitalize(text.paroleLogo.fr);
  const alternatives = shuffle(
    Object.values(text.paroleLogo)
    .filter((it) => it != text.paroleLogo.fr)
    .map((it) => capitalize(it))
  );
  
  let altTitleElement: HTMLElement;
  let alternateTitle : string = $state("")
  let altId = 0
  
  function blinkAlternate() {
    if (!appSettings.enableAnimations) {
      window.setTimeout(blinkAlternate, 100_000)
      return;
    }
    
    const animationDuration = 15_000;
    altId = (altId + 1) % alternatives.length;
    alternateTitle = alternatives[altId];
    altTitleElement.animate(
      [
        {offset: 0, opacity: 0, filter: "blur(10px)", easing: "ease-in-out"},
        {offset: 0.3, opacity: 0.5, filter: "blur(1px)", easing: "ease-in-out"},
        {offset: 1, opacity: 0, filter: "blur(5px)", easing: "ease-in-out"}
      ], {
        duration: animationDuration,
        iterations: 1,
      }
    );
    window.setTimeout(blinkAlternate, animationDuration+100_000)
  }
  window.setTimeout(blinkAlternate, 100_000)
</script>
<div class="container">
  <h1 class="title">{fr}</h1>
  <h1 class="title title-too-big">P</h1>
  <h1 class="title title-alternate" bind:this={altTitleElement}>{alternateTitle}</h1>
</div>

<style>
  .container{
    display: flex;
    flex-direction: row;
  }
  
  .title-alternate {
    opacity: 0;
    filter: blur(5px);
  }
  
  .title {
    margin: 0;
    text-align: center;
    white-space: nowrap;
    font-weight: 100;
    user-select: none;
    transition: all 0.5s ease-out;
    overflow: hidden;
  }
  .title-too-big {
    display: none;
  }
  
  @container (width < 130px) {
    .title {
      display: none;
    }
    .title-too-big {
      display: inline;
    }
  }
  @container (width < 400px) {
    .title-alternate {
      display: none;
    }
  }
</style>