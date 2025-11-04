<script lang="ts">
  import Button from '../elements/Button.svelte';
  import { choices, localized } from '../locales';
  import { appSettings, timers } from '../state.svelte';
  
  const resetIcon='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><defs><style>.cls-1{fill:none;stroke:currentColor;stroke-miterlimit:10;stroke-width:1.92px;}</style></defs><polyline class="cls-1" points="23.5 20.63 17.75 20.63 17.75 14.88"/><polyline class="cls-1" points="0.5 3.38 6.25 3.38 6.25 9.13"/><path class="cls-1" d="M9.23,1.83A10.12,10.12,0,0,1,12,1.46a10.54,10.54,0,0,1,6.06,19.16"/><path class="cls-1" d="M14.77,22.17a10.12,10.12,0,0,1-2.77.37A10.54,10.54,0,0,1,5.94,3.38"/></svg>'

  const {
    // provided by <Modals />
    isOpen,
    close,
  } = $props()
  
  const resetAllTimers = () => {
    const reallyDoIt = confirm(localized("resetAllTimersAreYouSure"))
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
      <h2 style="margin-top: 0;">{localized("settings")}</h2>
      <table>
        <tbody>
          <tr>
            <td>
              <label for="reset-all-timers">{localized("resetAllTimers")}</label>
            </td>
            <td>
              <Button onclick={resetAllTimers} title={localized("reset")} htmlContents={resetIcon} isSquare height="2em"/>
            </td>
          </tr>
          <tr>
            <td>
              <label for="multiple-speakers">{localized("multipleSpeakers")}</label>
            </td>
            <td>
              <input type="checkbox" id="multiple-speakers" bind:checked={appSettings.multipleSpeakers}>
            </td>
          </tr>
          <tr>
            <td>
              <label for="language-selector">{localized("language")}</label>
            </td>
            <td>
              <select id="language-selector" bind:value={appSettings.locale}>
                {#each choices as language}
                  <option value={language}>{language}</option>
                {/each}
              </select>
            </td>
          </tr>
        </tbody>
      </table>
      
      <div class="actions">
        <button onclick={() => close()}>{localized("close")}</button>
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