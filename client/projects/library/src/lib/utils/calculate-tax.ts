export function calculateTax(subTotal: number, taxPercent: number) {
  // @see https://stackoverflow.com/questions/11832914/how-to-round-to-at-most-2-decimal-places-if-necessary
  return Math.floor(((subTotal * taxPercent) / 100) * 100) / 100;
}

export function calculateTaxCurry(taxPercent: number) {
  return function taxCalculator(subTotal: number) {
    return calculateTax(subTotal, taxPercent);
  };
}
