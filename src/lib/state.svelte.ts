export let locale : string = $state("en")

export let timerIds : number[] = $state([]);
export let timerNames : {[key: number]: string} = $state({})
export let timerTimes : {[key: number]: number} = $state({})
export let timerStatuses : {[key: number]: boolean} = $state({})

export let appSettings : {[key: string]: any} = $state({
  multipleSpeakers: false,
  locale: "en"
})