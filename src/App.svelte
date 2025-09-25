<script lang="ts">
  import Timer from './lib/Timer.svelte'
  import { appSettings, timerIds, timerTimes, timerNames, timerStatuses } from './lib/state.svelte';
  import { humanTimeFromMilliseconds } from './lib/util';
  import { text, defaultTimers, choices } from './lib/locales';
  import { onMount } from 'svelte';
  
  let totalTime = $derived(Object.values(timerTimes).reduce((t, n) => t+n, 0))
  let locale = $derived(appSettings.locale)
  
  onMount(() => {
    if (choices.indexOf(navigator.language) != -1) {
      appSettings.locale = navigator.language;
    }
    if (timerIds.length == 0) {
      [0, 1, 2].forEach(it => {
        const id = addTimer()
        timerNames[id] = defaultTimers[locale][it];
      });
    }
  })
  const onKeyDown = (e:KeyboardEvent) => {
    if (e.key === "Escape") {
      Object.entries(timerStatuses).forEach(([k, _]) => {timerStatuses[Number(k)]=false})
    }
  }
  

  const addTimer = () => {
    const id = performance.now() + Math.random();
    timerIds.push(id);
    return id;
  }
  
</script>
<svelte:window on:keydown={onKeyDown} />

<main> 

  <h1>{text.speakingTime[locale]}</h1>
  
  <input type="checkbox" id="multiple-speakers" bind:checked={appSettings.multipleSpeakers}>
  <label for="multiple-speakers">{text.multipleSpeakers[locale]}</label>
  <select bind:value={appSettings.locale}>
    {#each choices as language}
      <option value={language}>{language}</option>
    {/each}
  </select>
  

  <div class="timers">
    {#each timerIds as timer}
      <div class="timer">
        <Timer id={timer}/>
      </div>
    {/each}
    <div class="add-timer">
      <button class="add-timer-button" onclick={addTimer}>+</button>
    </div>
  </div>
  
  <div class="results">
    <table>
      <tbody>
        {#each timerIds as timer}
          <tr>
            <td style="text-align: left;">{timerNames[timer]}</td>
            <td style="text-align: right; font-variant-numeric: tabular-nums; min-width: 50px;">{(timerTimes[timer] || totalTime)?(Math.round(timerTimes[timer] / totalTime * 100)):"—"}%</td>
            <td style="text-align: right; min-width: 120px;" class="numeric-duration">{humanTimeFromMilliseconds(timerTimes[timer])}</td>
          </tr>
        {/each}
        <tr>
          <td style="text-align: left; font-weight: bold;">Total</td><td></td><td class="numeric-duration" style="text-align: right;font-weight: bold;">{humanTimeFromMilliseconds(totalTime)}</td>
        </tr>
      </tbody>
    </table>
  </div>

</main>

<style>
  .timers {
    display: flex;
    flex-wrap: wrap;
    justify-items: stretch;
    align-items: stretch;
  }
  .timer {
    flex: 1 400px;
    display:flex;
  }
  .add-timer {
    min-height: 200px;
    flex: 1 400px;
    display:flex;
    justify-content: space-around;
    align-items: center;
  }
  .add-timer-button:hover {
    border-color: #080;
  }
  .results {
    display: flex;
    justify-content: space-around;
  }
</style>
