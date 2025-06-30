export const filterTextInput = (
  value: string,
  options?: {
    allowNumbers?: boolean;
  }
): string => {
  let filter = value
    .replace(/[^a-zA-ZÀ-ÿ\s-]/g, "")
    .replace(/\s{2,}/g, " ")
    .replace(/-{2,}/g, "-");

  if (options?.allowNumbers) {
    filter = value
      .replace(/[^a-zA-ZÀ-ÿ0-9\s-]/g, "")
      .replace(/\s{2,}/g, " ")
      .replace(/-{2,}/g, "-");
  }

  if (
    value.charAt(0) === " " ||
    value.charAt(0) === "-"
  ) {
    filter = filter.trimStart();
  }

  return filter;
};

export const isOnlyNumbers = (str: string): boolean => {
  return str.split("").every((char) => char >= "0" && char <= "9");
};
