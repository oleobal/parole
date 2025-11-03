<script lang="ts">
  import { onMount } from 'svelte';
  import { appSettings, timers } from './state.svelte';
  import { humanTimeFromMilliseconds, keyboardAlphabet } from './util';
  import { text } from './locales';
  
  let { id } = $props();
  let index = $derived(timers.ids.indexOf(id))
  let kbShortcut = $derived(keyboardAlphabet[index])
  
  let internalTime : number = 0;
  let latestTurnOn : number = 0;
  
  const press = () => {
    timers.statuses[id] = !timers.statuses[id]
    if (!appSettings.multipleSpeakers) {
      Object.entries(timers.statuses).forEach(([k, v]) => { if (v && k!=id) {timers.statuses[Number(k)]=false}})
    }
  }
  
  $effect(() => {
    // overwrite time to avoid drift, as the code lower down sums floats every frame
    if (timers.statuses[id] && latestTurnOn === 0) {
      latestTurnOn = performance.now()
    } else if (!timers.statuses[id] && latestTurnOn !== 0) {
      internalTime += (performance.now() - latestTurnOn)
      const oit = timers.times[id]
      timers.times[id] = internalTime
      latestTurnOn = 0;
      //console.debug(`updated time from ${oit} to ${internalTime}`)
    }
  })
  
  const deleteTimer = () => {
    const isSure = confirm(text.deleteTimer[appSettings.locale]+` ${timers.names[id]} ?`)
    if (!isSure) { return; }
    delete timers.names[id];
    delete timers.statuses[id];
    delete timers.times[id];
    timers.ids.splice(timers.ids.indexOf(id), 1);
  }
  
  const onKeyDown = (e:KeyboardEvent) => {
    if (e.key.toLowerCase() === kbShortcut) {
      press()
    }
  }
  
  
  onMount(() => {
    let lastTime : number | null = null;
    if (timers.times[id] === undefined) {
      timers.times[id] = 0;
    } else {
      internalTime = timers.times[id];
    }
    if (timers.statuses[id] === undefined) {
      timers.statuses[id] = false;
    }
    

    let frame = requestAnimationFrame(function update(time) {
      frame = requestAnimationFrame(update);

      if (timers.statuses[id]) {
        if (!lastTime) {
          lastTime = performance.now();
        }
        timers.times[id] += time - lastTime;
        lastTime = time;
      } else {
        lastTime = null;
      }
    });

    return () => {
      cancelAnimationFrame(frame);
    };
  });
</script>

<svelte:window on:keydown={onKeyDown} />

<div class="timer" class:timerActive={timers.statuses[id]}>
  <div style="display: flex;">
    <span class="kbShortcut" title={text.keyboardShortcut[appSettings.locale]}><p style="color: white;">{kbShortcut?.toUpperCase()}</p></span>
    <span contenteditable="true" bind:innerText={timers.names[id]} style="flex-grow: 1">
      {timers.names[id]?timers.names[id]:"Participant"}
    </span>
    <button
      class="close-button"
      style="width: 3em; display: flex; justify-content: center; align-items: center;"
      onclick={deleteTimer}
      title={text.deleteTimer[appSettings.locale]}
    >×</button>
  </div>
  <button
    onclick={press}
    class="timer-button"
    style="margin: 10px 0; width: 4em; height: 3em;"
    class:redTimerButton={timers.statuses[id]}
    title={timers.statuses[id]?text.stopTimer[appSettings.locale]:text.startTimer[appSettings.locale]}
  >
    {timers.statuses[id]?"⏸":"▶"}
  </button>
  <div>
    <span class="numeric-duration" class:numericDurationActive={timers.statuses[id]} style="font-size: 50px;">{humanTimeFromMilliseconds(timers.times[id])}</span>
  </div>
</div>

<style>
  .timer {
    border: 1px solid;
    margin: 10px;
    padding: 10px;
    flex: 1;
    
    background-size: 200% 200%;
    animation: Animation 20s ease infinite;
    
  }
  @keyframes Animation { 
    0%{background-position:0% 0%}
    25%{background-position:0% 100%}
    50%{background-position:100% 100%}
    75%{background-position:100% 0%}
    100%{background-position:0% 0%}
  }
  .timer:not(.timerActive):hover {
    background: radial-gradient(
      light-dark(hsl(271, 100%, 86%), hsl(162, 100%, 20%)),
      light-dark(hsl(162, 100%, 86%), hsl(271, 100%, 20%))
    );
    background-size: 200% 200%;
  }
  .timerActive {
    border-color: #f00;
    box-shadow: 0 0 10px 0px red;
    
    background: radial-gradient(
      light-dark(hsl(0, 100%, 86%), hsl(162, 100%, 20%)),
      light-dark(hsl(162, 100%, 86%), hsl(0, 100%, 17%))
    );
    background-size: 200% 200%;
    transition: all 0.1s ease-in-out;
  }
  
  .numericDurationActive {
    text-shadow: 0 0 2px;
    transition: all 0.1s ease-in-out;
  }
  
  .kbShortcut {
    background-color: grey;
    border-radius: 8px;
    width: 3em;
    display:flex;
    vertical-align: middle;
    justify-content: center;
    filter: drop-shadow(3px 3px);
    user-select: none;
  }
  
  .close-button:hover {
    border-color: light-dark(hsl(0, 100%, 70%), hsl(0, 100%, 27%));
    color: light-dark(hsl(0, 100%, 70%), hsl(0, 100%, 27%));
    box-shadow: 0 0 10px 0px light-dark(hsl(0, 100%, 70%), hsl(0, 100%, 27%));
  }
  
  .redTimerButton {
    background-color: #f00;
    color: white;
    border-color: #f00;
    box-shadow: 0 0 10px 0px #f00;
  }
  .redTimerButton:hover {
    border-color: #fff;
    box-shadow: 0 0 10px 0px #fff;
  }
</style>