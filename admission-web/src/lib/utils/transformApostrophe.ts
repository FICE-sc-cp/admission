export function transformApostrophe(input: string): string {
  const regex = /['’]/g;
  return input.replace(regex, '`');
}

export function transformNullableApostrophe(input: string | null): string | null {
  const regex = /['’]/g;
  return input ? input.replace(regex, '`') : null;
}
