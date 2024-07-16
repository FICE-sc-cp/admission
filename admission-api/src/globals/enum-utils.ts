export const getEnumKeyByValue = (enumerated, value: string) => {
  return Object.keys(enumerated)[
    Object.values(enumerated).indexOf(value as typeof enumerated)
  ];
};