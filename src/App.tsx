import { useState } from "react";
import { motion } from "motion/react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card";
import { Wallet, Home, BarChart3, Target, TrendingUp } from "lucide-react";
import { FinanceOverview } from "./components/finance-overview";
import { TransactionForm } from "./components/transaction-form";
import { TransactionList } from "./components/transaction-list";
import { ExpenseChart } from "./components/expense-chart";
import { BudgetTracker } from "./components/budget-tracker";
import { useFinance } from "./hooks/use-finance";

export default function App() {
  const {
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
  } = useFinance();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading your finance data...</p>
        </div>
      </div>
    );
  }

  const stats = getStats();
  const expenseData = getExpensesByCategory();
  const monthlyTrend = getMonthlyTrend();

  return (
    <div className="min-h-screen bg-gradient-to-br from-muted/30 to-muted/70">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="container mx-auto py-4 sm:py-8 px-3 sm:px-4"
      >
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mb-6 sm:mb-8"
        >
          <div className="flex items-center gap-2 sm:gap-3 mb-2">
            <motion.div
              whileHover={{ rotate: 15, scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Wallet className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
            </motion.div>
            <h1 className="text-2xl sm:text-3xl font-bold">Finance Tracker</h1>
          </div>
          <p className="text-sm sm:text-base text-muted-foreground">
            Track your income, expenses, and budgets all in one place
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mb-6 sm:mb-8"
        >
          <FinanceOverview stats={stats} />
        </motion.div>

        <Tabs defaultValue="dashboard" className="space-y-4 sm:space-y-6">
          <TabsList className="grid w-full grid-cols-3 h-auto p-1">
            <TabsTrigger value="dashboard" className="flex items-center gap-1 sm:gap-2 py-2 sm:py-3 text-xs sm:text-sm">
              <Home className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="hidden xs:inline">Dashboard</span>
              <span className="xs:hidden">Home</span>
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-1 sm:gap-2 py-2 sm:py-3 text-xs sm:text-sm">
              <BarChart3 className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="hidden xs:inline">Analytics</span>
              <span className="xs:hidden">Charts</span>
            </TabsTrigger>
            <TabsTrigger value="budgets" className="flex items-center gap-1 sm:gap-2 py-2 sm:py-3 text-xs sm:text-sm">
              <Target className="h-3 w-3 sm:h-4 sm:w-4" />
              <span>Budgets</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-4 sm:space-y-6">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="grid gap-4 sm:gap-6 lg:grid-cols-5"
            >
              <div className="lg:col-span-2">
                <TransactionForm
                  categories={categories}
                  onAddTransaction={addTransaction}
                  onAddCategory={addCategory}
                />
              </div>
              <div className="lg:col-span-3">
                <TransactionList
                  transactions={transactions}
                  categories={categories}
                  onDeleteTransaction={deleteTransaction}
                  showLimit={true}
                />
              </div>
            </motion.div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-4 sm:space-y-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <ExpenseChart
                expenseData={expenseData}
                monthlyTrend={monthlyTrend}
              />
            </motion.div>
          </TabsContent>

          <TabsContent value="budgets" className="space-y-4 sm:space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <BudgetTracker
                budgets={budgets}
                categories={categories}
                transactions={transactions}
                onUpdateBudget={updateBudget}
              />
            </motion.div>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  );
}