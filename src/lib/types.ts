export interface TimerCollection {
  ids: number[],
  data: {
    [key: number]: {
      name: string,
      time: number,
      status: boolean, /* true: on, false: off */
      internal: {
        time: number, /* internal count of total time measured */
        latestTurnOn: number | null, /* timestamp */
        defaultName: {
          key: string,
          originalLocale: string,
        }
      }
    }
  }
}

export interface TimersExport {
    timers: TimerCollection,
    meta: {
        timeFrozen: number,
    },
}