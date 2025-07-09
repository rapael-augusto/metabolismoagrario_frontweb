export const filterTextInput = (
  value: string,
  options?: {
    allowNumbers?: boolean;
    allowSpecialChars?: boolean;
  }
): string => {
  let filter = value.replace(/\s{2,}/g, " ").replace(/-{2,}/g, "-");
  if (options?.allowNumbers && !options?.allowSpecialChars) {
    filter = filter.replace(/[^a-zA-ZÀ-ÿ0-9\s-]/g, "");
  } else if (options?.allowSpecialChars) {
    filter = filter.replace(
      /[^a-zA-ZÀ-ÿ0-9\s-!@#$%^&*()_+={}\[\]:;"'<>,.?/\\|`~]/g,
      ""
    );
  } else {
    filter = filter.replace(/[^a-zA-ZÀ-ÿ\s-]/g, "");
  }

  if (
    value.charAt(0) === " " ||
    value.charAt(0) === "-" ||
    (value.charAt(0) >= "0" && value.charAt(0) <= "9")
  ) {
    filter = "";
  }

  return filter;
};

export const isOnlyNumbers = (str: string): boolean => {
  return str.split("").every((char) => char >= "0" && char <= "9");
};
