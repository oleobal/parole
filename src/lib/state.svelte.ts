export let timers : {
  ids: number[],
  data: {
    [key: number]: {
      name: string,
      time: number,
      status: boolean,
      internal: {
        time: number,
        latestTurnOn: number,
        defaultName: {
          key: string,
          originalLocale: string,
        }
      }
    }
  }
} = $state({
  ids: [],
  data: {},
})

export let appSettings : {[key: string]: any} = $state({
  multipleSpeakers: false,
  locale: "en"
})