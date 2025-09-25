<script lang="ts">
  import { onMount } from 'svelte';
  import { locale, timerTimes, timerNames, timerStatuses, appSettings, timerIds } from './state.svelte';
  import { humanTimeFromMilliseconds, keyboardAlphabet } from './util';
  import { text } from './locales';
  
  let { id } = $props();
  let index = $derived(timerIds.indexOf(id))
  let kbShortcut = $derived(keyboardAlphabet[index])
  
  const press = () => {
    timerStatuses[id] = !timerStatuses[id]
    if (!appSettings.multipleSpeakers) {
      Object.entries(timerStatuses).forEach(([k, v]) => { if (v && k!=id) {timerStatuses[k]=false}})
    }
  }
  
  const deleteTimer = () => {
    const isSure = confirm(text.deleteTimer[locale]+` ${timerNames[id]} ?`)
    if (!isSure) { return; }
    delete timerNames[id];
    delete timerStatuses[id];
    delete timerTimes[id];
    timerIds.splice(timerIds.indexOf(id), 1);
  }
  
  const onKeyDown = (e:KeyboardEvent) => {
    if (e.key.toLowerCase() === kbShortcut) {
      press()
    }
  }
  
  
  onMount(() => {
    let lastTime = null;
    if (timerTimes[id] === undefined) {
      timerTimes[id] = 0;
    }
    if (timerStatuses[id] === undefined) {
      timerStatuses[id] = false;
    }
    

    let frame = requestAnimationFrame(function update(time) {
      frame = requestAnimationFrame(update);

      if (timerStatuses[id]) {
        if (!lastTime) {
          lastTime = performance.now();
        }
        timerTimes[id] += time - lastTime;
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

<div class="timer" class:timerActive={timerStatuses[id]}>
  <div style="display: flex;">
    <span class="kbShortcut"><p style="color: white;">{kbShortcut?.toUpperCase()}</p></span>
    <span contenteditable="true" bind:innerText={timerNames[id]} style="flex-grow: 1">
      {timerNames[id]?timerNames[id]:"Participant"}
    </span>
    <button class="close-button" style="width: 3em; display: flex; justify-content: center; align-items: center;" onclick={deleteTimer}>×</button>
  </div>
  <button onclick={press} class="timer-button" style="margin: 10px 0; width: 4em; height: 3em;" class:redTimerButton={timerStatuses[id]}>
    {timerStatuses[id]?"⏸":"▶"}
  </button>
  <div>
    <span class="numeric-duration" style="font-size: 50px;">{humanTimeFromMilliseconds(timerTimes[id])}</span>
  </div>
</div>

<style>
  .timer {
    border: 1px solid;
    margin: 10px;
    padding: 10px;
    flex: 1;
  }
  .timerActive {
    border-color: #f00;
  }
  
  .kbShortcut {
    background-color: grey;
    border-radius: 5px;
    width: 3em;
    display:flex;
    vertical-align: middle;
    justify-content: center;
    filter: drop-shadow(3px 3px);
  }
  
  .redTimerButton {
    background-color: #f00;
  }
  
  .timer-button:hover {
    border-color: #646cff;
  }
  .close-button:hover {
    border-color: #800;
  }
</style>