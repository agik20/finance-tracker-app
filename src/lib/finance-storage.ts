import { Transaction, Category, Budget } from '../types/finance';

const STORAGE_KEYS = {
  TRANSACTIONS: 'finance-tracker-transactions',
  CATEGORIES: 'finance-tracker-categories',
  BUDGETS: 'finance-tracker-budgets',
};

// Default categories
const defaultCategories: Category[] = [
  { id: '1', name: 'Salary', type: 'income', icon: '💰', color: '#10b981' },
  { id: '2', name: 'Freelance', type: 'income', icon: '💻', color: '#3b82f6' },
  { id: '3', name: 'Investment', type: 'income', icon: '📈', color: '#8b5cf6' },
  { id: '4', name: 'Food & Dining', type: 'expense', icon: '🍕', color: '#ef4444' },
  { id: '5', name: 'Transportation', type: 'expense', icon: '🚗', color: '#f59e0b' },
  { id: '6', name: 'Shopping', type: 'expense', icon: '🛍️', color: '#ec4899' },
  { id: '7', name: 'Entertainment', type: 'expense', icon: '🎬', color: '#6366f1' },
  { id: '8', name: 'Utilities', type: 'expense', icon: '💡', color: '#84cc16' },
  { id: '9', name: 'Healthcare', type: 'expense', icon: '🏥', color: '#06b6d4' },
  { id: '10', name: 'Education', type: 'expense', icon: '📚', color: '#8b5cf6' },
];

export const financeStorage = {
  // Transactions
  getTransactions(): Transaction[] {
    const stored = localStorage.getItem(STORAGE_KEYS.TRANSACTIONS);
    return stored ? JSON.parse(stored) : [];
  },

  saveTransaction(transaction: Transaction): void {
    const transactions = this.getTransactions();
    transactions.push(transaction);
    localStorage.setItem(STORAGE_KEYS.TRANSACTIONS, JSON.stringify(transactions));
  },

  updateTransaction(id: string, updates: Partial<Transaction>): void {
    const transactions = this.getTransactions();
    const index = transactions.findIndex(t => t.id === id);
    if (index !== -1) {
      transactions[index] = { ...transactions[index], ...updates };
      localStorage.setItem(STORAGE_KEYS.TRANSACTIONS, JSON.stringify(transactions));
    }
  },

  deleteTransaction(id: string): void {
    const transactions = this.getTransactions().filter(t => t.id !== id);
    localStorage.setItem(STORAGE_KEYS.TRANSACTIONS, JSON.stringify(transactions));
  },

  // Categories
  getCategories(): Category[] {
    const stored = localStorage.getItem(STORAGE_KEYS.CATEGORIES);
    return stored ? JSON.parse(stored) : defaultCategories;
  },

  saveCategory(category: Category): void {
    const categories = this.getCategories();
    categories.push(category);
    localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(categories));
  },

  // Budgets
  getBudgets(): Budget[] {
    const stored = localStorage.getItem(STORAGE_KEYS.BUDGETS);
    return stored ? JSON.parse(stored) : [];
  },

  saveBudget(budget: Budget): void {
    const budgets = this.getBudgets();
    const index = budgets.findIndex(b => b.category === budget.category);
    if (index !== -1) {
      budgets[index] = budget;
    } else {
      budgets.push(budget);
    }
    localStorage.setItem(STORAGE_KEYS.BUDGETS, JSON.stringify(budgets));
  },

  deleteBudget(id: string): void {
    const budgets = this.getBudgets().filter(b => b.id !== id);
    localStorage.setItem(STORAGE_KEYS.BUDGETS, JSON.stringify(budgets));
  },

  // Initialize default data
  initializeData(): void {
    if (!localStorage.getItem(STORAGE_KEYS.CATEGORIES)) {
      localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(defaultCategories));
    }
  }
};