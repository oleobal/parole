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
  
  let title : string = $state(fr)
  const maxShare = 8;
  let status = $state({
    altId: 0,
    share: maxShare,
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
      fr.slice(0, Math.round(status.share/maxShare*fr.length))
      + alternatives[status.altId].slice(Math.round((status.share/maxShare)*alternatives[status.altId].length))
    )
    
    
    if (status.share == 0) {
      status.goingRight = true;
      status.pause = true;
    } else if (status.share == maxShare) {
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
  "isAlternate": title !== fr,
  "shine": !status.pause,
}} >{title}</h1><h1 class="title title-too-big">P</h1>

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
</style>