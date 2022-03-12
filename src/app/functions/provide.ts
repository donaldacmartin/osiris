export function playlistTitle(): string {
  let options: any = { day: 'numeric', month: 'long' };
  return new Date().toLocaleDateString('fr-CA', options);
}
