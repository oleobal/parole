<script>

  import { localized } from './locales';
  
  import { modals } from 'svelte-modals'
  import { Modals } from 'svelte-modals'
  import Settings from './TopBarModals/Settings.svelte';
  import Share from './TopBarModals/Share.svelte';
  import Help from './TopBarModals/Help.svelte';
  import Button from './elements/Button.svelte';
  import { infoIcon, paperAirplaneIcon, wrenchIcon } from './icons';

  
</script>

<Modals>
  <!-- shown when any modal is opened -->
  {#snippet backdrop({ close })}
    <div class="backdrop" onclick={() => close()} />
  {/snippet}
</Modals>

<div class="background-container">
  <div class="background"></div>
</div>
<div class="top-bar">
  <div class="items">
  <span class="title-container">
    <h1 class={{"title":true, "title-too-big": true}}>{localized("speakingTime")}</h1>
  </span>
  <Button htmlContents={infoIcon} onclick={()=>{modals.open(Help, {} )}} title={localized("help")} isSquare color="#646cff" height="3.4em"/>
  <Button htmlContents={paperAirplaneIcon} onclick={()=>{modals.open(Share, {} )}} title={localized("share")} isSquare color="#646cff" height="3.4em"/>
  <Button htmlContents={wrenchIcon} onclick={()=>{modals.open(Settings, {} )}} title={localized("settings")} isSquare color="#646cff" height="3.4em"/>
  </div>
</div>

<style>
  .title-container {
    display: flex;
    align-items: center;
    flex: auto;
    
    container-type: inline-size;
  }
  
  .title {
    margin: 0;
    text-align: center;
    white-space: nowrap;
    font-weight: 100;
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
    
    margin: 0 0 0 0;
    
  }
  .items {
    padding: 10px;
    display: flex;
    flex-direction: row;
    align-items: stretch;
    gap: 10px;
  }
  
  .background-container {
    z-index: -1000;
    position: absolute;
    height: 100vh; width: 100vw;
    overflow: hidden;
  }
  
  .background {
    position: absolute;
    top: -50px;
    left: -20px;
    
    
    background: linear-gradient(
      light-dark(hsl(271, 100%, 86%), hsl(162, 100%, 20%)),
      light-dark(hsl(162, 100%, 86%), hsl(271, 100%, 20%)) 85%,
      transparent
    );
    
    background-size: 100% 100%;
    background-clip: border-box;
    
    animation: Animation 60s ease infinite;
    height: 10em; width: 120vw;
  }
  @keyframes Animation { 
    0%{background-position: 0% 100%; background-size:100% 100%}
    12%{background-position: 0% 100%; background-size:100% 300%; transform: rotate(-2deg)}
    25%{background-position: 0% 100%; background-size:100% 100%}
    
    33%{background-position: 0% 100%; background-size:100% 100%}
    50%{background-position: 0% 100%; background-size:100% 300%; transform: rotate(2deg)}
    67%{background-position: 0% 100%; background-size:100% 100%}
    
    75%{background-position: 0% 100%; background-size:100% 100%}
    85%{background-position: 0% 100%; background-size:100% 300%; transform: rotate(0deg)}
    100%{background-position: 0% 100%; background-size:100% 100%}
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
  
</style>