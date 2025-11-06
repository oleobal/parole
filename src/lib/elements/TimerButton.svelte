<script lang="ts">
  import { timers } from "../state.svelte";
  import { localized } from "../locales";
  import { pauseIcon, playIcon } from "../icons";
  
  let { timerId, onclick } = $props()
</script>

<button
  onclick={onclick}
  class="timer-button"
  class:redTimerButton={timers.statuses[timerId]}
  title={localized(timers.statuses[timerId]?"stopTimer":"startTimer")}
>
  {#if timers.statuses[timerId]}
    {@html pauseIcon}
  {:else}
    {@html playIcon}
  {/if}
</button>
  
<style>
  .timer-button {
    margin: 10px 0;
    height: 4em;
    
    flex: none;
    aspect-ratio: 1 / 1;
    padding: calc(4em * 0.10);
  }
  .timer-button:hover{
    border-width: 3px;
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