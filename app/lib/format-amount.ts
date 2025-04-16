export function formatAmount(amount: bigint | number | string, decimals: number = 9): string {
  // Convert from integer to decimal representation
  const value = Number(amount) / 10 ** decimals

  // Use Intl.NumberFormat for formatting
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: decimals,
  }).format(value)
}
