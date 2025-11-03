<script>
  import { text, choices } from './locales';
  import { appSettings } from './state.svelte';
  
  import { modals } from 'svelte-modals'
  import { Modals } from 'svelte-modals'
  import Settings from './TopBarModals/Settings.svelte';
  import Share from './TopBarModals/Share.svelte';
</script>

<Modals>
  <!-- shown when any modal is opened -->
  {#snippet backdrop({ close })}
    <div class="backdrop" onclick={() => close()} />
  {/snippet}
</Modals>


<div class="top-bar">
  <span class="title-container">
    <h1 class={{"title":true, "title-too-big": true}}>{text.speakingTime[appSettings.locale]}</h1>
  </span>
  
  <button
    class="cool-button"
    onclick={()=>{modals.open(Share, {})}}
    title={text.share[appSettings.locale]}
  >⌲</button>
  
  <button
    class="cool-button"
    onclick={()=>{modals.open(Settings, {} )}}
    title={text.settings[appSettings.locale]}
  >⚙</button>
</div>

<style>
  .title-container {
    display: flex;
    align-items: center;
    flex: auto;
    
    overflow: hidden;
    container-type: inline-size;
  }
  
  .title {
    margin: 0;
    /*font-size: min(3.2em, 10vw); */
    text-align: center;
    white-space: nowrap;
  }
  @container (width < 600px) { /* measured approximately, not a good solution */
    .title {
      font-size: min(3.2em, 12cqi);
    }
  }
  
  /*
  .title-too-big {
    font-size: 4.5vw;
    white-space: normal;
  } */
  
  .top-bar{
    display: flex;
    flex-direction: row;
    align-items: stretch;
    gap: 10px;
    margin: 0 0 20px 0;
    padding: 10px;
    background: linear-gradient(
      light-dark(hsl(271, 100%, 86%), hsl(162, 100%, 20%)),
      light-dark(hsl(162, 100%, 86%), hsl(271, 100%, 20%))
    );
    background-size: 100% 200%;

    animation: Animation 20s ease infinite;
  }
  @keyframes Animation { 
    0%{background-position:0% 0%}
    50%{background-position:0% 100%}
    100%{background-position:0% 0%}
  }
  
  /* modals */
  .backdrop {
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.5);
  }
  
  .cool-button {
    flex: none;
  }
  
  .cool-button:hover {
    border-color: #646cff;
    color: #646cff;
    box-shadow: 0 0 10px 0px #646cff;
  }
  
</style>