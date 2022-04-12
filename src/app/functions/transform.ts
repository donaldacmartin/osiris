export function chunk<T>(items: T[], size: number): T[][] {
  if (items.length <= size) {
    return [items];
  } else {
    let startIndexes = [...Array(Math.ceil(items.length / size)).keys()].map(
      (x) => x * size
    );

    return startIndexes.map((i) =>
      items.slice(i, i + size < items.length ? i + size : items.length + 1)
    );
  }
}

export function parseDuration(isoDuration: string): number {
  let hours = regexExtract(/\d+H/g, isoDuration) * 60 * 60;
  let mins = regexExtract(/\d+M/g, isoDuration) * 60;
  let secs = regexExtract(/\d+S/g, isoDuration);

  return hours + mins + secs;
}

export function readableDuration(duration: number): string {
  let hours = duration >= 3600 ? Math.floor(duration / 3600) : 0;
  let durationMinusHours = duration - hours * 3600;

  let minutes =
    durationMinusHours >= 60 ? Math.floor(durationMinusHours / 60) : 0;
  let seconds = durationMinusHours - minutes * 60;

  let result =
    minutes.toString().padStart(2, '0') +
    ':' +
    seconds.toString().padStart(2, '0');
  return hours > 0 ? hours + ':' + result : result;
}

function regexExtract(regex: RegExp, data: string): number {
  let match = regex.exec(data);
  return match && match.length > 0
    ? parseInt(match[0].substring(0, match[0].length - 1))
    : 0;
}
