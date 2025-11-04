<script lang="ts">
  import Timer from './lib/Timer.svelte'
  import TopBar from './lib/TopBar.svelte';
  import { appSettings, timers } from './lib/state.svelte';
  import { humanTimeFromMilliseconds } from './lib/util';
  import { defaultTimers, choices, text } from './lib/locales';
  import { onMount } from 'svelte';
  import Button from './lib/elements/Button.svelte';
  
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

<div class="background-container">
  <div class="background background-l"></div>
  <div class="background background-r"></div>
</div>
<main>
  <TopBar />
  <div class="timers">
    {#each timers.ids as timer}
      <div class="timer">
        <Timer id={timer}/>
      </div>
    {/each}
    <div class="add-timer" title={text.addTimer[appSettings.locale]}>
      <Button onclick={addTimer} color="#080" contents="+"/>
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
  .background-container {
    position: absolute;
    height: max(100%, 100vh); width: max(100%, 100vw);
    overflow: hidden;
    z-index: -1000;
  }
  .background {
    position: absolute;
    height: 100%; width: 100vw;
  }
  @keyframes Up-Down { 
    0% {top: -25vh;}
    50% {top: 75vh;}
    100% {top: -25vh;}
  }
  @keyframes Breathe { 
    0% {width: 80vw;}
    25% {width: 130vw;}
    50% {width: 70vw;}
    75% {width: 200vw;}
    100% {width: 80vw;}
  }
  
  .background-l {
    left: -50vw;
    background: radial-gradient(
      light-dark(hsl(271, 100%, 86%), hsl(162, 100%, 20%)),
      transparent 50%
    );
    /* background: red; */
    animation:
    Breathe 40s ease infinite,
    Up-Down 60s ease-in-out infinite;
  }
  .background-r {
    right: -50vw;
    background: radial-gradient(
      light-dark(hsl(162, 100%, 86%), hsl(271, 100%, 20%)),
      transparent 50%
    );
    animation: 
    Breathe 60s ease-in-out infinite,
    Up-Down 40s ease infinite;
    animation-range-start: 30%;
  }
  
  
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
  .results {
    display: flex;
    justify-content: space-around;
  }
</style>
