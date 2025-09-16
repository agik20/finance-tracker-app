import { useState, useEffect, useCallback } from 'react';
import { Transaction, Category, Budget, FinanceStats } from '../types/finance';
import { financeStorage } from '../lib/finance-storage';

export function useFinance() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [loading, setLoading] = useState(true);

  // Load data on mount
  useEffect(() => {
    financeStorage.initializeData();
    setTransactions(financeStorage.getTransactions());
    setCategories(financeStorage.getCategories());
    setBudgets(financeStorage.getBudgets());
    setLoading(false);
  }, []);

  // Add transaction
  const addTransaction = useCallback((transaction: Omit<Transaction, 'id' | 'createdAt'>) => {
    const newTransaction: Transaction = {
      ...transaction,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    };
    financeStorage.saveTransaction(newTransaction);
    setTransactions(prev => [...prev, newTransaction]);
  }, []);

  // Delete transaction
  const deleteTransaction = useCallback((id: string) => {
    financeStorage.deleteTransaction(id);
    setTransactions(prev => prev.filter(t => t.id !== id));
  }, []);

  // Add category
  const addCategory = useCallback((category: Omit<Category, 'id'>) => {
    const newCategory: Category = {
      ...category,
      id: crypto.randomUUID(),
    };
    financeStorage.saveCategory(newCategory);
    setCategories(prev => [...prev, newCategory]);
  }, []);

  // Update budget
  const updateBudget = useCallback((budget: Budget) => {
    financeStorage.saveBudget(budget);
    setBudgets(prev => {
      const index = prev.findIndex(b => b.category === budget.category);
      if (index !== -1) {
        const updated = [...prev];
        updated[index] = budget;
        return updated;
      }
      return [...prev, budget];
    });
  }, []);

  // Calculate stats
  const getStats = useCallback((): FinanceStats => {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    const monthlyTransactions = transactions.filter(t => {
      const transactionDate = new Date(t.date);
      return transactionDate.getMonth() === currentMonth && 
             transactionDate.getFullYear() === currentYear;
    });

    const totalIncome = transactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);

    const totalExpenses = transactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);

    const monthlyIncome = monthlyTransactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);

    const monthlyExpenses = monthlyTransactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);

    return {
      totalIncome,
      totalExpenses,
      balance: totalIncome - totalExpenses,
      monthlyIncome,
      monthlyExpenses,
      monthlyBalance: monthlyIncome - monthlyExpenses,
    };
  }, [transactions]);

  // Get expense by category
  const getExpensesByCategory = useCallback(() => {
    const expenseCategories = categories.filter(c => c.type === 'expense');
    return expenseCategories.map(category => {
      const categoryExpenses = transactions
        .filter(t => t.type === 'expense' && t.category === category.name)
        .reduce((sum, t) => sum + t.amount, 0);
      
      return {
        name: category.name,
        value: categoryExpenses,
        color: category.color,
        icon: category.icon,
      };
    }).filter(item => item.value > 0);
  }, [transactions, categories]);

  // Get monthly trend
  const getMonthlyTrend = useCallback(() => {
    const months = [];
    const now = new Date();
    
    for (let i = 5; i >= 0; i--) {
      const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const month = date.toLocaleString('default', { month: 'short' });
      const year = date.getFullYear();
      
      const monthTransactions = transactions.filter(t => {
        const transactionDate = new Date(t.date);
        return transactionDate.getMonth() === date.getMonth() && 
               transactionDate.getFullYear() === year;
      });

      const income = monthTransactions
        .filter(t => t.type === 'income')
        .reduce((sum, t) => sum + t.amount, 0);

      const expenses = monthTransactions
        .filter(t => t.type === 'expense')
        .reduce((sum, t) => sum + t.amount, 0);

      months.push({
        month,
        income,
        expenses,
        net: income - expenses,
      });
    }

    return months;
  }, [transactions]);

  return {
    transactions,
    categories,
    budgets,
    loading,
    addTransaction,
    deleteTransaction,
    addCategory,
    updateBudget,
    getStats,
    getExpensesByCategory,
    getMonthlyTrend,
  };
}