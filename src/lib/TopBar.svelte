<script>
  import { localized } from './locales';
  
  import { modals } from 'svelte-modals'
  import { Modals } from 'svelte-modals'
  import Settings from './TopBarModals/Settings.svelte';
  import Share from './TopBarModals/Share.svelte';
  import Help from './TopBarModals/Help.svelte';
  
  const wrenchIcon = '<svg xmlns="http://www.w3.org/2000/svg" width="auto" height="100%" viewBox="0 0 24 24"><defs><style>.cls-1{fill:none;stroke:currentColor;stroke-miterlimit:10;stroke-width:1.91px;}</style></defs><path class="cls-1" d="M21.94,4.76,18.12,8.58l-2-.68-.68-2,3.82-3.82a5.71,5.71,0,0,0-7.93,6.81L1.5,18.68,5.32,22.5l9.81-9.81a5.71,5.71,0,0,0,6.81-7.93Z"/></svg>'
  
  const paperAirplaneIcon = '<svg xmlns="http://www.w3.org/2000/svg" width="auto" height="100%" viewBox="0 0 24 24"><defs><style>.cls-1{fill:none;stroke:currentColor;stroke-miterlimit:10;stroke-width:2px;}</style></defs><polygon class="cls-1" points="15 21 10.64 13.36 3 9 21 3 15 21"/><line class="cls-1" x1="11" y1="13" x2="16" y2="8"/></svg>'
  
  const infoIcon = `<svg width="100%" height="100%" viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" style="fill-rule:evenodd;clip-rule:evenodd;stroke-miterlimit:10;">
    <g transform="matrix(1.81212,0,0,1.81212,-9.74542,-9.74542)">
        <path d="M12,16.77L12,10.09L10.09,10.09" style="fill:none;fill-rule:nonzero;stroke:currentColor;stroke-width:1.91px;"/>
    </g>
    <g transform="matrix(1.81212,0,0,1.81212,-9.74542,-9.74542)">
        <path d="M10.09,16.77L13.91,16.77" style="fill:none;fill-rule:nonzero;stroke:currentColor;stroke-width:1.91px;"/>
    </g>
    <g transform="matrix(1.81212,0,0,1.81212,-9.74542,-9.74542)">
        <path d="M11.05,7.23L12.95,7.23" style="fill:none;fill-rule:nonzero;stroke:currentColor;stroke-width:1.91px;"/>
    </g>
</svg>`
  
</script>

<Modals>
  <!-- shown when any modal is opened -->
  {#snippet backdrop({ close })}
    <div class="backdrop" onclick={() => close()} />
  {/snippet}
</Modals>



<div class="top-bar">
  <div class="background"></div>
  <div class="items">
  <span class="title-container">
    <h1 class={{"title":true, "title-too-big": true}}>{localized("speakingTime")}</h1>
  </span>
  
  <button
    class="cool-button"
    onclick={()=>{modals.open(Help, {})}}
    title={localized("help")}
  >
    {@html infoIcon}
  </button>
  
  <button
    class="cool-button"
    onclick={()=>{modals.open(Share, {})}}
    title={localized("share")}
  >
    {@html paperAirplaneIcon}
</button>
  
  <button
    class="cool-button"
    onclick={()=>{modals.open(Settings, {} )}}
    title={localized("settings")}
  >
    {@html wrenchIcon}
  </button>
  </div>
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
    
    margin: 0 0 0 0;
    
  }
  .items {
    padding: 10px;
    display: flex;
    flex-direction: row;
    align-items: stretch;
    gap: 10px;
  }
  
  
  .background {
    position: absolute;
    top: -50px;
    left: -20px;
    z-index: -1000;
    
    
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
  
  .cool-button {
    flex: none;
    height: 3.4em;
    aspect-ratio: 1 / 1;
    padding: 10px;
  }
  
  
  .cool-button:hover {
    border-color: #646cff;
    color: #646cff;
    box-shadow: 0 0 10px 0px #646cff;
  }
  
</style>