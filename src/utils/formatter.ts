/**
 * Pluralize a word if necessary based on the number
 * @param word The word to pluralize if necessary
 * @param nb The number which precedes the word
 * @returns The word pluralized if it was necessary
 */
export const pluralize = (word: string, nb: number): string =>
  `${word}${nb > 1 ? 's' : ''}`;

/**
 * Format price from cents to euros with proper formatting
 * E_PRD_15: Backend stores prices in cents, frontend displays in euros
 * @param priceInCents The price in cents (e.g., 1234 = 12.34€)
 * @returns The formatted price in euros (e.g., "12,34 €")
 */
export const priceFormatter = (priceInCents: number): string => {
  const priceInEuros = priceInCents / 100;
  const formatter = new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
  });
  return formatter.format(priceInEuros);
};

/**
 * Parse price from euros string to cents for backend
 * @param priceString The price string (e.g., "12,34 €")
 * @returns The price in cents (e.g., 1234)
 */
export const parsePriceToCents = (priceString: string): number => {
  if (!priceString) return 0;
  const cleaned = priceString.replaceAll(/[€\s]/g, '').replaceAll(',', '.');
  return Math.round(Number.parseFloat(cleaned) * 100);
};
