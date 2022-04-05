
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
