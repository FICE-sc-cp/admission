export const kirillicRegex = /^[А-Я]{2}$/;
export const ukRegex = /^[ҐЄІЇЬА-ЩЮЯґєіїьа-щюя0-9\-`'’‘“”*,. ]+$/;
export const dateRegex =
  /^\s*((?:3[01]|[12][0-9]|0[1-9])\.(1[012]|0[1-9])\.((?:19|20)\d{2}))\s*$/;

export const phoneRegex = new RegExp(
  /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
);
