<script lang="ts">
  import { onMount } from 'svelte';
  import { appSettings, timers } from './state.svelte';
  import { humanTimeFromMilliseconds, keyboardAlphabet } from './util';
  import { localize } from './locales';
  import Button from './elements/Button.svelte';
  import { trashIcon } from './icons';
  import TimerButton from './elements/TimerButton.svelte';
  
  let { id, smallMode = false} = $props();
  let index = $derived(timers.ids.indexOf(id))
  let kbShortcut = $derived(keyboardAlphabet[index])
  
  const press = () => {
    timers.data[id].status = !timers.data[id].status
    if (!appSettings.multipleSpeakers) {
      Object.entries(timers.data).forEach(([k, v]) => { if (v.status && k!=id) {timers.data[Number(k)].status=false}})
    }
  }
  
  $effect(() => {
    // overwrite time to avoid drift, as the code lower down sums floats every frame
    if (timers.data[id].status && timers.data[id].internal.latestTurnOn === null) {
      timers.data[id].internal.latestTurnOn = performance.now()
    } else if (!timers.data[id].status && timers.data[id].internal.latestTurnOn !== null) {
      timers.data[id].internal.time += (performance.now() - timers.data[id].internal.latestTurnOn)
      timers.data[id].time = timers.data[id].internal.time
      timers.data[id].internal.latestTurnOn = null;
    }
  })
  
  const deleteTimer = () => {
    const isSure = confirm(localize("deleteTimer")+` ${timers.data[id].name} ?`)
    if (!isSure) { return; }
    delete timers.data[id]
    timers.ids.splice(timers.ids.indexOf(id), 1);
  }
  
  const onKeyDown = (e:KeyboardEvent) => {
    if (e.key.toLowerCase() === kbShortcut) {
      press()
    }
  }
  
  
  onMount(() => {
    let lastTime : number | null = null;

    let frame = requestAnimationFrame(function update(time) {
      frame = requestAnimationFrame(update);

      if (timers.data[id].status) {
        if (!lastTime) {
          lastTime = performance.now();
        }
        timers.data[id].time += time - lastTime;
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

<div class={{
  "timer": true,
  "timer-animated": appSettings.enableAnimations,
  "timer-active": timers.data[id].status
}}>
{#if !smallMode}
  <div style="display: flex; gap: 10px;">
    <div class="kbShortcut" title={localize("keyboardShortcut")}>{kbShortcut?.toUpperCase()}</div>
    <div contenteditable="true" bind:innerText={timers.data[id].name} class="name">
      {timers.data[id].name}
    </div>
    <Button onclick={deleteTimer} color="light-dark(hsl(0, 100%, 70%), hsl(0, 100%, 27%))" htmlContents={trashIcon} title={localize("deleteTimer")} isSquare height="3em"/>
  </div>
  <TimerButton timerId={id} onclick={press} />
  <div>
    <span class="numeric-duration" style="font-size: 50px;">{humanTimeFromMilliseconds(timers.data[id].time)}</span>
  </div>
{:else}
  <div style="display: flex; gap: 10px;justify-content: space-around;align-items: center;">
    <div style="display: flex; flex-direction: column;">
      <Button onclick={deleteTimer} color="light-dark(hsl(0, 100%, 70%), hsl(0, 100%, 27%))" htmlContents={trashIcon} title={localize("deleteTimer")} isSquare height="3em"/>
      <div class="kbShortcut" title={localize("keyboardShortcut")}>{kbShortcut?.toUpperCase()}</div>
    </div>
   
    <div style="display: flex; flex-direction: column; flex: 1;">
      <div contenteditable="true" bind:innerText={timers.data[id].name} class="name">
        {timers.data[id].name}
      </div>
      <div style="flex: 1">
        <span class="numeric-duration" style="font-size: 50px;">{humanTimeFromMilliseconds(timers.data[id].time)}</span>
      </div>
    </div>
  
    
      <TimerButton timerId={id} onclick={press} />
  </div>
{/if}
</div>

<style>
  .timer {
    border: 1px solid;
    margin: 10px;
    padding: 10px;
    flex: 1;
    
    background: light-dark(rgba(255,255,255,0.5), rgba(0,0,0,0.5));
    
    background-size: 200% 200%;
  }
  .timer-animated {
    animation: Animation 20s ease infinite;
  }
  
  
  @keyframes Animation { 
    0%{background-position:0% 0%}
    20%{background-position:0% 100%}
    50%{background-position:100% 100%}
    70%{background-position:100% 0%}
    100%{background-position:0% 0%}
  }
  .timer:not(.timer-active):hover {
    background: radial-gradient(
      light-dark(hsl(271, 100%, 86%), hsl(162, 100%, 20%)),
      light-dark(hsl(162, 100%, 86%), hsl(271, 100%, 20%))
    );
    background-size: 200% 200%;
  }
  .timer-active {
    text-shadow: 0 0 2px;
    border-color: #f00;
    box-shadow: 0 0 10px 0px red;
    
    background: radial-gradient(
      light-dark(hsl(0, 100%, 86%), hsl(162, 100%, 20%)),
      light-dark(hsl(162, 100%, 86%), hsl(0, 100%, 17%))
    );
    background-size: 200% 200%;
    transition: all 0.1s ease-in-out;
  }
  
  .name {
    flex-grow: 1;
    font-size: 1.2rem;
    
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .kbShortcut {
    color: light-dark(var(--light-text), var(--dark-text));
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
    user-select: none;
  }
</style>