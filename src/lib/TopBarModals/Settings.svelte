<script lang="ts">
  import Button from '../elements/Button.svelte';
  import { choices, localize } from '../locales';
  import { appSettings, timers } from '../state.svelte';
  import { resetIcon } from '../icons';
  

  const {
    // provided by <Modals />
    isOpen,
    close,
  } = $props()
  
  const resetAllTimers = () => {
    const reallyDoIt = confirm(localize("resetAllTimersAreYouSure"))
    if (!reallyDoIt) { return; }
    timers.ids.forEach(id => {
      timers.data[id].status = false;
      timers.data[id].time = 0;
      timers.data[id].internal.time = 0;
      timers.data[id].internal.latestTurnOn = null;
    });
  }

  $effect(() => {
    timers.ids.forEach(id => {
      if (
        timers.data[id].name !== localize(
          timers.data[id].internal.defaultName.key,
          undefined,
          timers.data[id].internal.defaultName.originalLocale,
        )
      ) {
        timers.data[id].name = localize(
          timers.data[id].internal.defaultName.key,
          undefined,
          appSettings.locale,
        )
        timers.data[id].internal.defaultName.originalLocale = appSettings.locale
      }
    });
  })
</script>

{#if isOpen}
  <div role="dialog" class="modal">
    <div class="contents">
      <h2 style="margin-top: 0;">{localize("settings")}</h2>
      <table>
        <tbody>
          <tr>
            <td>
              <label for="reset-all-timers">{localize("resetAllTimers")}</label>
            </td>
            <td>
              <Button onclick={resetAllTimers} title={localize("reset")} htmlContents={resetIcon} isSquare height="2em"/>
            </td>
          </tr>
          <tr>
            <td>
              <label for="multiple-speakers">{localize("multipleSpeakers")}</label>
            </td>
            <td>
              <input type="checkbox" id="multiple-speakers" bind:checked={appSettings.multipleSpeakers}>
            </td>
          </tr>
          <tr>
            <td>
              <label for="language-selector">{localize("language")}</label>
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
    padding: 16px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    pointer-events: auto;
    gap: 10px;
    background-color: light-dark(var(--light-bg), var(--dark-bg));
  }


</style>