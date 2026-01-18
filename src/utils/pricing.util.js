/**
 * Calculate final price based on tax rules
 */
exports.calculateFinalPrice = (basePrice, taxApplicable, taxPercentage) => {
  if (taxApplicable) {
    const taxAmount = (basePrice * taxPercentage) / 100;
    return basePrice + taxAmount;
  }
  return basePrice;
};
