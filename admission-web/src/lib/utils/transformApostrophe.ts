export function transformApostrophe(input: string): string {
  const regex = /['’]/g;
  return input.replace(regex, '`');
}
