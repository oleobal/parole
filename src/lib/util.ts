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