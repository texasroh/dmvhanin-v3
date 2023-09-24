export const charNumOnly = (code: string) =>
  code.trim().replace(/[^0-9a-zA-Z]/g, "");
