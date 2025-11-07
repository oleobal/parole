<script lang="ts">
  import { timers } from "../state.svelte";
  import { localize } from "../locales";
  import { pauseIcon, playIcon } from "../icons";
  
  let { timerId, onclick } = $props()
</script>

<button
  onclick={onclick}
  class="timer-button"
  class:redTimerButton={timers.data[timerId].status}
  title={localize(timers.data[timerId].status?"stopTimer":"startTimer")}
>
  {#if timers.data[timerId].status}
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