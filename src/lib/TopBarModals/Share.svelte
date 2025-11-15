<script lang="ts">
  import Button from '../elements/Button.svelte';
  import { copyIcon } from '../icons';
  import { localize } from '../locales';
  import { timers } from '../state.svelte';
  import type { TimersExport } from '../types';
  import { styleElementAsJustCopied } from '../util';
  
  let timersURL : string | null = $state(null)

  let timersURLElement : HTMLElement;
    
  const {
    // provided by <Modals />
    isOpen,
    close,
  } = $props()
  
  $effect(() => {
    if (isOpen && timersURL === null) {
      let t = $state.snapshot(timers)
      let timeFrozen = performance.now();
      let exportObject : TimersExport = {
        timers: t,
        meta: {
          timeFrozen: timeFrozen
        }
      }
      const encodedTimers = btoa(JSON.stringify(exportObject))
      timersURL = window.location.protocol + window.location.host + window.location.pathname + window.location.search + "#"+ encodedTimers
      
    }
    else if (!isOpen) {
      timersURL = null;
    }
  })
</script>

{#if isOpen}
  <div role="dialog" class="modal">
    <div class="contents">
      <h2 style="margin-top: 0;">{localize("share")}</h2>
      
      <div class="items">
        <p>{localize("timersURL")}</p>
        
        <div style="display: flex; gap: 10px;">
          <span class="code" bind:this={timersURLElement}>{timersURL}</span>
          <Button isSquare height="2em" title={localize("copy")} onclick={() => {if (timersURL) {navigator.clipboard.writeText(timersURL); styleElementAsJustCopied(timersURLElement)}}} htmlContents={copyIcon}/>
        </div>
        
      </div>
      
      <div class="actions">
        <Button onclick={() => close()} contents={localize("close")} />
      </div>
    </div>
  </div>
{/if}

<style>
  .modal {
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;

    /* allow click-through to backdrop */
    pointer-events: none;
  }

  .contents {
    min-width: 240px;
    max-width: 600px;
    padding: 16px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    pointer-events: auto;
    gap: 10px;
    background-color: light-dark(var(--light-bg), var(--dark-bg));
  }
  
  .code {
    font-family: monospace;
    overflow: scroll;
    white-space: nowrap;
    background-color: rgba(0,0,0,0.2);
  }
</style>