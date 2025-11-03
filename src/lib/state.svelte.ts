export let timers : {
  ids: number[],
  names: {[key: number]: string},
  times: {[key: number]: number},
  statuses: {[key: number]: boolean}
} = $state({
  ids: [],
  names: {},
  times: {},
  statuses: {},
})

export let appSettings : {[key: string]: any} = $state({
  multipleSpeakers: false,
  locale: "en"
})