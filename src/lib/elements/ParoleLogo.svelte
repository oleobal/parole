<script lang="ts">
  import { text } from "../locales";
  import { appSettings } from "../state.svelte";
  import { capitalize } from "../util";
  
  const fr = capitalize(text.paroleLogo.fr);
  const alternatives = Object.values(text.paroleLogo).filter((it) => it != fr).map((it) => capitalize(it))
  
  let title : string = $state(fr)
  let status = $state({
    altId: 0,
    share: 10,
    goingRight: true,
    pause: false,
  })
  
  function moveTitle() {
    if (!appSettings.enableAnimations) {
      title = fr;
      status.share = 10;
      status.goingRight = true;
      window.setTimeout(moveTitle, 60000); // they might restart them, an effect might be cleaner but this will do
      return;
    }
    if (status.pause) {
      status.pause = false;
    }
    
    title = (
      fr.slice(0, Math.round(status.share/10*fr.length))
      + alternatives[status.altId].slice(Math.round((status.share/10)*alternatives[status.altId].length))
    )
    
    
    if (status.share == 0) {
      status.goingRight = true;
      status.pause = true;
    } else if (status.share == 10) {
      status.goingRight = false;
      status.altId = (status.altId + 1) % alternatives.length;
      status.pause = true;
    }
    if (status.goingRight) {
      status.share+=1
    } else {
      status.share-=1
    }
    if (status.pause) {
      if (title === fr) {
        window.setTimeout(moveTitle, 60000)
      } else {
        window.setTimeout(moveTitle, 3000)
      }
    } else {
      window.setTimeout(moveTitle, 50)
    }
  }
  window.setTimeout(moveTitle, 0)
</script>
<h1 class={{
  "title": true,
  "title-too-big": true,
  "isAlternate": title !== fr,
  "shine": !status.pause,
}} >{title}</h1>

<style>
  .shine {
    filter: blur(1px);
  }
  
  .isAlternate {
    opacity: 0.7;
  }
  
  .title {
    margin: 0;
    text-align: center;
    white-space: nowrap;
    font-weight: 100;
    user-select: none;
    transition: all 0.5s ease-out
  }
  @container (width < 600px) { /* measured approximately, not a good solution */
    .title {
      font-size: min(3.2em, 12cqi);
    }
  }
</style>