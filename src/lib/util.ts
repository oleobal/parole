export const keyboardAlphabet = "1234567890"; // should be detected with getLayoutMap()

export enum HumanTimeDecimals {
  INCLUDE,
  EXCLUDE,
  AUTO,
}

function timeFromMilliseconds(s: number) {
  let ms = s % 1000;
  let cs = Math.floor(ms / 10)
  s = (s - ms) / 1000;
  let secs = s % 60;
  s = (s - secs) / 60;
  let mins = s % 60;
  let hrs = (s - mins) / 60;
  
  return {
    cs: cs,
    secs: secs,
    mins: mins,
    hrs: hrs,
  }
}

function padTimeElement(n: number | string) {
  return ('00' + n).slice(-2);
}

export function veryHumanTimeFromMilliseconds(s: number) {
  let { cs, secs, mins, hrs } = timeFromMilliseconds(s)
  
  if (hrs) {
    return (
      hrs + "hr"
      + ' ' + mins + "mn"
    );
  }
  else if (mins) {
    return (
      mins + "mn"
      + ' ' + secs + "s"
    );
  }
  else {
    return (
      secs + '.' + padTimeElement(cs) + "s"
    );
  }
}

export function humanTimeFromMilliseconds(
  s: number,
  decimals: HumanTimeDecimals = HumanTimeDecimals.AUTO,
) : string {
  let { cs, secs, mins, hrs } = timeFromMilliseconds(s)

  if (hrs) {
    return (
      hrs
      + ':' + padTimeElement(mins)
      + ':' + padTimeElement(secs)
      + (decimals == HumanTimeDecimals.INCLUDE ? '.' + padTimeElement(cs) : '')
    );
  }
  else if (mins) {
    return (
      mins
      + ':' + padTimeElement(secs)
      + (decimals != HumanTimeDecimals.EXCLUDE ? '.' + padTimeElement(cs) : '')
    );
  }
  else {
    return (
      secs
      + (decimals != HumanTimeDecimals.EXCLUDE ? '.' + padTimeElement(cs) : '')
    );
  }
}

export const trimMargin = (text: string) : string => {
  /// look at the first line to determine the leading whitespace, so it should be empty of text
  
  const lead = text.match(RegExp(/^[\s]+/))?.[0]
  return lead ? text.replaceAll(lead, "\n") : text
}

export function styleElementAsJustCopied(it: string | HTMLElement) {
  let e : HTMLElement | null;
  if (typeof it === "string") {
    e = document.getElementById(it)
  } else {
    e = it;
  }
  if (!e) { return }
  e.classList.remove("just-copied");
  e.classList.add("just-copied");
  setTimeout(() => {
    e.classList.remove("just-copied");
  }, 1000);
}

export function capitalize(str: string) : string {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

/** returns a new array */
export function shuffle<T>(array: T[]) : T[] {
  let newArr = array.slice();
  
  for (let i = newArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  }
  return newArr;
}
