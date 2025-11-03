<script lang="ts">
  import Timer from './lib/Timer.svelte'
  import TopBar from './lib/TopBar.svelte';
  import { appSettings, timers } from './lib/state.svelte';
  import { humanTimeFromMilliseconds } from './lib/util';
  import { defaultTimers, choices, text } from './lib/locales';
  import { onMount } from 'svelte';
  
  let totalTime = $derived(Object.values(timers.times).reduce((t, n) => t+n, 0))
  let locale = $derived(appSettings.locale)
  
  let sortedTimerIds = $derived(timers.ids.toSorted((a, b) => {return timers.times[b] - timers.times[a]}))
  
  
  onMount(() => {
    if (window.location.hash) {
      const newTimers = JSON.parse(atob(window.location.hash.substring(1)))
      console.debug("loaded timers", newTimers)
      timers.ids = newTimers.ids;
      timers.names = newTimers.names;
      timers.times = newTimers.times;
      timers.statuses = Array(newTimers.ids.length).fill(false)
      //timers.statuses = newTimers.statuses;
      // FIXME?: loading a running timer causes an error, because it relies on internal non-shared state
    } else {
      // init with sensible defaults
      if (choices.indexOf(navigator.language) != -1) {
        appSettings.locale = navigator.language;
      }
      if (timers.ids.length == 0) {
        [0, 1, 2].forEach(it => {
          const id = addTimer()
          timers.names[id] = defaultTimers[locale][it];
        });
      }
    }
  })
  const onKeyDown = (e:KeyboardEvent) => {
    if (e.key === "Escape") {
      Object.entries(timers.statuses).forEach(([k, _]) => {timers.statuses[Number(k)]=false})
    }
  }
  

  const addTimer = () => {
    const id = performance.now() + Math.random();
    timers.ids.push(id);
    return id;
  }
  
</script>
<svelte:window on:keydown={onKeyDown} />

<main>
  <TopBar />

  <div class="timers">
    {#each timers.ids as timer}
      <div class="timer">
        <Timer id={timer}/>
      </div>
    {/each}
    <div class="add-timer" title={text.addTimer[appSettings.locale]}>
      <button class="add-timer-button" onclick={addTimer}>+</button>
    </div>
  </div>
  
  <div class="results">
    <table>
      <tbody>
        {#each sortedTimerIds as timer}
          <tr>
            <td style="text-align: left;">{timers.names[timer]}</td>
            <td style="text-align: right; font-variant-numeric: tabular-nums; min-width: 50px;">{(timers.times[timer] || totalTime)?(Math.round(timers.times[timer] / totalTime * 100)):"—"}%</td>
            <td style="text-align: right; min-width: 120px;" class="numeric-duration">{humanTimeFromMilliseconds(timers.times[timer])}</td>
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
    color: #080;
    box-shadow: 0 0 10px 0px #080;
  }
  .results {
    display: flex;
    justify-content: space-around;
  }
</style>
