<script lang="ts">
  import { onMount } from 'svelte';
  import { appSettings, timers } from './state.svelte';
  import { humanTimeFromMilliseconds, keyboardAlphabet } from './util';
  import { localized } from './locales';
  import Button from './elements/Button.svelte';
  
  let { id } = $props();
  let index = $derived(timers.ids.indexOf(id))
  let kbShortcut = $derived(keyboardAlphabet[index])
  
  const trashIcon = '<svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><defs><style>.cls-1{fill:none;stroke:currentColor;stroke-miterlimit:10;stroke-width:1.91px;}</style></defs><path class="cls-1" d="M16.88,22.5H7.12a1.9,1.9,0,0,1-1.9-1.8L4.36,5.32H19.64L18.78,20.7A1.9,1.9,0,0,1,16.88,22.5Z"/><line class="cls-1" x1="2.45" y1="5.32" x2="21.55" y2="5.32"/><path class="cls-1" d="M10.09,1.5h3.82a1.91,1.91,0,0,1,1.91,1.91V5.32a0,0,0,0,1,0,0H8.18a0,0,0,0,1,0,0V3.41A1.91,1.91,0,0,1,10.09,1.5Z"/><line class="cls-1" x1="12" y1="8.18" x2="12" y2="19.64"/><line class="cls-1" x1="15.82" y1="8.18" x2="15.82" y2="19.64"/><line class="cls-1" x1="8.18" y1="8.18" x2="8.18" y2="19.64"/></svg>'
  
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
    const isSure = confirm(localized("deleteTimer")+` ${timers.names[id]} ?`)
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
    <div class="kbShortcut" title={localized("keyboardShortcut")}>{kbShortcut?.toUpperCase()}</div>
    <span contenteditable="true" bind:innerText={timers.names[id]} style="flex-grow: 1">
      {timers.names[id]?timers.names[id]:"Participant"}
    </span>
    <Button onclick={deleteTimer} color="light-dark(hsl(0, 100%, 70%), hsl(0, 100%, 27%))" htmlContents={trashIcon} title={localized("deleteTimer")} isSquare height="3em"/>
  </div>
  <button
    onclick={press}
    class="timer-button"
    style="margin: 10px 0; width: 4em; height: 3em;"
    class:redTimerButton={timers.statuses[id]}
    title={localized(timers.statuses[id]?"stopTimer":"startTimer")}
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
    20%{background-position:0% 100%}
    50%{background-position:100% 100%}
    70%{background-position:100% 0%}
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
    color: white;
    border-radius: 8px;
    flex: none;
    height: 2em;
    padding: calc(2em * 0.2);
    aspect-ratio: 1 / 1;
    display:flex;
    vertical-align: middle;
    text-align: center;
    justify-content: center;
    align-items: center;
    filter: drop-shadow(3px 3px);
    user-select: none;
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