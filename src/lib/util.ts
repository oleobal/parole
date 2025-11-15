export const keyboardAlphabet = "1234567890"; // should be detected with getLayoutMap()

export const humanTimeFromMilliseconds = (s: number) => {
  function pad(n: number | string) {
    return ('00' + n).slice(-2);
  }

  let ms = s % 1000;
  let cs = Math.floor(ms / 10)
  s = (s - ms) / 1000;
  let secs = s % 60;
  s = (s - secs) / 60;
  let mins = s % 60;
  let hrs = (s - mins) / 60;

  if (hrs)
    return hrs + ':' + pad(mins) + ':' + pad(secs) + '.' + pad(cs);
  else if (mins)
    return mins + ':' + pad(secs) + '.' + pad(cs);
  else 
    return secs + '.' + pad(cs);
}

export const trimMargin = (text: string) => {
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