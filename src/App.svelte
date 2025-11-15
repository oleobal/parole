<script lang="ts">
  import Timer from './lib/Timer.svelte'
  import TopBar from './lib/TopBar.svelte';
  import { appSettings, timers } from './lib/state.svelte';
  import { styleElementAsJustCopied, humanTimeFromMilliseconds } from './lib/util';
  import {choices, localize } from './lib/locales';
  import { onMount } from 'svelte';
  import Button from './lib/elements/Button.svelte';
  import { copyIcon, downloadIcon, filledMicrophoneIcon, plusIcon } from './lib/icons';
  import type { TimerCollection, TimersExport } from './lib/types';
  
  let totalTime = $derived(Object.values(timers.data).reduce((t, n) => t+n.time, 0))  
  let sortedTimerIds = $derived(timers.ids.toSorted((a, b) => {return timers.data[b].time - timers.data[a].time}))
  let initialState: null | TimerCollection = null;
  
  let resultsTableElement: HTMLElement;
  
  let timersElement : HTMLElement;
  function countTimerColumns() {
    const items = Array.from(timersElement.children) as HTMLElement[];
    let columns = 0;

    items.forEach((item, _) => {
      if (item.offsetTop > items[0].offsetTop) return;
      columns++;
    });
    return columns;
  }
  let nbOfTimerColumns: Number | null = $state(null)

  onMount(() => {
    if (window.location.hash) {
      const newTimers = <TimersExport>JSON.parse(atob(window.location.hash.substring(1)))
      console.debug("loaded timers", newTimers)
      const timeUnfrozen = performance.now()
      newTimers.timers.ids.forEach(id => {
        if (newTimers.timers.data[id].internal.latestTurnOn) {
          newTimers.timers.data[id].internal.latestTurnOn += timeUnfrozen - newTimers.meta.timeFrozen;
        }
      });
      timers.ids = newTimers.timers.ids;
      timers.data = newTimers.timers.data;
    } else {
      // init with sensible defaults
      if (choices.indexOf(navigator.language) != -1) {
        appSettings.locale = navigator.language;
      }
      if (timers.ids.length == 0) {
        ["men", "women", "genderMinorities"].forEach(it => {
          const id = addTimer()
          timers.data[id].name = localize(it);
          timers.data[id].internal.defaultName.key = it;
        });
      }
    }
    initialState = $state.snapshot(timers)
    
    const resizeObserver = new ResizeObserver(entries => {
      // We're only watching one element
      const entry = entries.at(0);
      // boxWidth = entry.contentBoxSize[0].blockSize;
      nbOfTimerColumns = countTimerColumns();
    });
    resizeObserver.observe(timersElement);
    return () => resizeObserver.unobserve(timersElement);
  })
  const onKeyDown = (e:KeyboardEvent) => {
    if (e.key === "Escape") {
      Object.entries(timers.data).forEach(([k, _]) => {timers.data[Number(k)].status=false})
    }
  }
  
  window.onbeforeunload = (event) => {
    if (initialState) {
      const currentState = $state.snapshot(timers)
      if ((initialState.ids.length == currentState.ids.length)
      && initialState.ids.every((v, i) => {return currentState.ids[i] == v})
      && initialState.ids.every((id) => {
        return initialState?.data[id].name === currentState.data[id].name
        && initialState?.data[id].status === currentState.data[id].status
        && initialState?.data[id].time === currentState.data[id].time
      })
      ) {
        return
      } else {
        event.preventDefault();
        return true;
      }
    }
  }

  const addTimer = () => {
    const id = performance.now() + Math.random();
    timers.data[id] = {
      name: localize("participant"),
      time: 0,
      status: false,
      internal: {
        time: 0,
        latestTurnOn: null,
        defaultName: {
          key: "participant",
          originalLocale: appSettings.locale,
        },
      },
    }
    timers.ids.push(id);
    return id;
  }
  
  function buildResultsAsHumanText() : string {
    return (sortedTimerIds.map((id) => {
        const t = timers.data[id];
        const p = ((t.time || totalTime)?(Math.round(t.time / totalTime * 100)):"—");
        return `${p}% ${t.name} (${humanTimeFromMilliseconds(t.time)})`;
    })).join("\n")
  }
  
  function buildResultsAsTSV() : string {
    function buildTSVline(...ar: any[]) : string {
      return ar.join("\t");
    }

    return [buildTSVline(localize("name"), localize("percentage"), localize("speakingTime"))].concat(
        sortedTimerIds.map((id) => {
          const t = timers.data[id];
          const p = ((t.time || totalTime)?(Math.round(t.time / totalTime * 100)):"NaN")
          return buildTSVline(t.name, p, humanTimeFromMilliseconds(t.time))
      }),
      [buildTSVline("Total", 100, humanTimeFromMilliseconds(totalTime))]
    ).join("\n")
  }
  
  function downloadResultsAsTSV() {
      const blob = new Blob([buildResultsAsTSV()], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `parole.tsv`;
      a.click();
  }
</script>
<svelte:window on:keydown={onKeyDown} />

<div class="background-container">
  <div class={{"background": true, "background-l": appSettings.enableAnimations}}></div>
  <div class={{"background": true, "background-r": appSettings.enableAnimations}}></div>
</div>
<main>
  <TopBar />
  <div class="timers" bind:this={timersElement}>
    {#each timers.ids as timer}
      <div class="timer">
        <Timer id={timer} smallMode={nbOfTimerColumns===1}/>
      </div>
    {/each}
    <div class={"add-timer "+(nbOfTimerColumns===1?"add-timer-small-layout":"add-timer-big-layout")} title={localize("addTimer")}>
      <Button onclick={addTimer} color="#080" htmlContents={plusIcon} isSquare height="3em" />
    </div>
  </div>
  
  <div class="results">
    <table style="font-size: 1.2rem;" bind:this={resultsTableElement}>
      <tbody>
        {#each sortedTimerIds as timer}
          <tr style={timers.data[timer].status?"text-shadow: 0 0 2px;":""}>
            <td><div style="height .8em; width: .8em; color: red;">{#if timers.data[timer].status}{@html filledMicrophoneIcon}{/if}</div></td>
            <td style="text-align: left;">{timers.data[timer].name}</td>
            <td style="text-align: right; font-variant-numeric: tabular-nums; min-width: 50px;">{(timers.data[timer].time || totalTime)?(Math.round(timers.data[timer].time / totalTime * 100)):"—"}%</td>
            <td style="text-align: right; min-width: 120px;" class="numeric-duration">{humanTimeFromMilliseconds(timers.data[timer].time)}</td>
          </tr>
        {/each}
        <tr>
          <td></td>
          <td style="text-align: left; font-weight: bold;">Total</td><td></td><td class="numeric-duration" style="text-align: right;font-weight: bold;">{humanTimeFromMilliseconds(totalTime)}</td>
        </tr>
      </tbody>
    </table>
    <div class="results-buttons">
      <Button isSquare height="2em" title={localize("copy")} onclick={() => {navigator.clipboard.writeText(buildResultsAsHumanText()); styleElementAsJustCopied(resultsTableElement)}} htmlContents={copyIcon}/>
      <Button isSquare height="2em" title={localize("download")} onclick={() => {downloadResultsAsTSV();}} htmlContents={downloadIcon}/>
    </div>
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
    flex: 1 400px;
    display:flex;
    justify-content: space-around;
    align-items: center;
  }
  .add-timer-big-layout {
    min-height: 200px;
  }
  .add-timer-small-layout {
    min-height: 100px;
  }
  .results {
    display: flex;
    justify-content: center;
    gap: 10px;
  }
  .results-buttons {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }
</style>
