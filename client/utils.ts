/**
 * Format a number as a percentage.
 * @param n the number to format.
 * @returns the formattted string.
 */
export const formatPercent = (n: number): string => Math.round(n * 100) + '%'
