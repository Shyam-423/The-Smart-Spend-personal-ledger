export function calculateTotalExpenses(expenses = []) {
  return expenses.reduce((sum, e) => sum + Number(e.amount || 0), 0);
}

export function calculateBalance(income = 0, expenses = []) {
  return Number(income) - calculateTotalExpenses(expenses);
}

export function calculateDailyAllowance(income = 0, expenses = [], daysLeft = 1) {
  const currentBalance = calculateBalance(income, expenses);
  return daysLeft > 0 ? (currentBalance / daysLeft) : currentBalance;
}

export function calculateCategoryBreakdown(expenses = []) {
  const totals = expenses.reduce((acc, e) => {
    acc[e.category] = (acc[e.category] || 0) + Number(e.amount || 0);
    return acc;
  }, {});
  
  const total = calculateTotalExpenses(expenses);
  if (total === 0) return [];
  
  return Object.entries(totals).map(([name, amount]) => ({
    name,
    amount,
    percentage: (amount / total) * 100
  })).sort((a, b) => b.amount - a.amount);
}

export function calculateSpentPercentage(income = 0, expenses = []) {
  if (income === 0) return 0;
  return (calculateTotalExpenses(expenses) / income) * 100;
}
