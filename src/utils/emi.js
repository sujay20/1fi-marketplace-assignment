// Pure functions for turning (price + EMI template) into a plan a user can pick.
// Kept isolated so the math can be unit-tested and reused by both the API
// layer and, later, any real backend contract without touching components.

export function formatCurrency(amount) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * @param {number} price - principal amount for the selected variant
 * @param {object} template - one entry from EMI_TEMPLATES
 */
export function buildEmiPlan(price, template) {
  const processingFee = Math.round((price * template.processingFeePct) / 100);

  if (template.type === 'no-cost') {
    const monthlyAmount = Math.ceil(price / template.tenureMonths);
    return {
      id: template.id,
      tenureMonths: template.tenureMonths,
      type: template.type,
      monthlyAmount,
      totalInterest: 0,
      processingFee,
      totalPayable: price + processingFee,
      label: `${template.tenureMonths} months`,
      tag: 'No-cost EMI',
    };
  }

  // Simple flat-interest approximation for standard plans.
  const totalInterest = Math.round(
    (price * template.annualInterestPct * template.tenureMonths) / (12 * 100)
  );
  const totalPayable = price + totalInterest + processingFee;
  const monthlyAmount = Math.ceil(totalPayable / template.tenureMonths);

  return {
    id: template.id,
    tenureMonths: template.tenureMonths,
    type: template.type,
    monthlyAmount,
    totalInterest,
    processingFee,
    totalPayable,
    label: `${template.tenureMonths} months`,
    tag: `${template.annualInterestPct}% p.a.`,
  };
}

export function buildEmiPlans(price, templates) {
  return templates.map((template) => buildEmiPlan(price, template));
}
