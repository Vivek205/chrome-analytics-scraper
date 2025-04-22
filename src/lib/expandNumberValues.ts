type MultiplierConstant = "K" | "M";

const MultiplierMap: Record<MultiplierConstant, number> = {
  K: 1_000,
  M: 1_000_000,
};

export const parseCompactNumber = (value: string | undefined) => {
  console.log("value", value);
  if (!value) {
    return;
  }

  const trimmedValue = value.trim();
  let multiplier = 1;

  const suffix = trimmedValue.slice(-1).toUpperCase();

  if (suffix in MultiplierMap) {
    multiplier = MultiplierMap[suffix as MultiplierConstant];
  }

  let output = parseFloat(value);
  if (isNaN(output)) {
    throw new Error(`parseCompactNumber: Invalid number => ${value}`);
  }

  output *= multiplier;
  return output;
};
