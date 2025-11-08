import type { TimerCollection } from "./types"

export let timers : TimerCollection = $state({
  ids: [],
  data: {},
})

export let appSettings : {[key: string]: any} = $state({
  multipleSpeakers: false,
  locale: "en"
})