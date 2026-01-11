/**
 * Formats a number as a currency string based on the locale.
 * @param amount - The amount to format.
 * @param locale - The locale code (e.g., 'en', 'th').
 * @returns The formatted currency string.
 */
export const formatCurrency = (amount: number, locale: string): string => {
  const isThai = locale === "th";
  const currency = isThai ? "THB" : "USD";

  // Create formatter
  const formatter = new Intl.NumberFormat(isThai ? "th-TH" : "en-US", {
    style: "currency",
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  return formatter.format(amount);
};

/**
 * Gets the currency symbol based on the locale.
 * @param locale - The locale code.
 * @returns The currency symbol ('฿' or '$').
 */
export const getCurrencySymbol = (locale: string): string => {
  return locale === "th" ? "฿" : "$";
};
