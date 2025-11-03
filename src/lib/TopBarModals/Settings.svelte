<script lang="ts">
  import { text, choices } from '../locales';
  import { appSettings, timers } from '../state.svelte';
  
  
  const {
    // provided by <Modals />
    isOpen,
    close,
  } = $props()
  
  const resetAllTimers = () => {
    const reallyDoIt = confirm(text.resetAllTimersAreYouSure[appSettings.locale])
    if (!reallyDoIt) { return; }
    timers.ids.forEach(id => {
      timers.statuses[id] = false;
      timers.times[id] = 0;
    });
  }
</script>

{#if isOpen}
  <div role="dialog" class="modal">
    <div class="contents">
      <h2 style="margin-top: 0;">{text.settings[appSettings.locale]}</h2>
      
      <div>
        <label for="reset-all-timers">{text.resetAllTimers[appSettings.locale]}</label>
        <button id="reset-all-timers" onclick={resetAllTimers}>{text.reset[appSettings.locale]}</button>
      </div>
      
      <div>
        <input type="checkbox" id="multiple-speakers" bind:checked={appSettings.multipleSpeakers}>
        <label for="multiple-speakers">{text.multipleSpeakers[appSettings.locale]}</label>
      </div>
      <div>
        <label for="language-selector">{text.language[appSettings.locale]}</label>
        <select id="language-selector" bind:value={appSettings.locale}>
          {#each choices as language}
            <option value={language}>{language}</option>
          {/each}
        </select>
      </div>
      
      <div class="actions">
        <button onclick={() => close()}>{text.close[appSettings.locale]}</button>
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
    padding: 16px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    pointer-events: auto;
    gap: 10px;
    background-color: light-dark(var(--light-bg), var(--dark-bg));
  }


</style>