import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Progress } from "./ui/progress";
import { Badge } from "./ui/badge";
import { Plus, Trash2, X } from "lucide-react";
import { Budget, Category, Transaction } from "../types/finance";

interface BudgetTrackerProps {
  budgets: Budget[];
  categories: Category[];
  transactions: Transaction[];
  onUpdateBudget: (budget: Budget) => void;
  onDeleteBudget?: (id: string) => void;
}

export function BudgetTracker({ budgets, categories, transactions, onUpdateBudget, onDeleteBudget }: BudgetTrackerProps) {
  const [showAddBudget, setShowAddBudget] = useState(false);
  const [newBudgetCategory, setNewBudgetCategory] = useState('');
  const [newBudgetLimit, setNewBudgetLimit] = useState('');
  const [newBudgetPeriod, setNewBudgetPeriod] = useState<'monthly' | 'weekly' | 'yearly'>('monthly');

  // Palet warna modern dan profesional
  const colorPalette = {
    primary: '#3B82F6',    // Biru profesional
    secondary: '#64748B',  // Abu-abu netral
    success: '#10B981',    // Hijau untuk progress baik
    warning: '#F59E0B',    // Kuning untuk peringatan
    danger: '#EF4444',     // Merah untuk over budget
    background: '#F8FAFC', // Latar belakang soft
    card: '#FFFFFF',       // Warna kartu
    textPrimary: '#1E293B',// Teks utama
    textSecondary: '#64748B', // Teks sekunder
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'IDR',
    }).format(amount);
  };

  const expenseCategories = categories.filter(c => c.type === 'expense');

  // Calculate spent amount for each budget
  const getBudgetData = (budget: Budget) => {
    const now = new Date();
    let startDate: Date;

    switch (budget.period) {
      case 'weekly':
        startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7);
        break;
      case 'yearly':
        startDate = new Date(now.getFullYear(), 0, 1);
        break;
      default: // monthly
        startDate = new Date(now.getFullYear(), now.getMonth(), 1);
    }

    const spent = transactions
      .filter(t => 
        t.type === 'expense' && 
        t.category === budget.category &&
        new Date(t.date) >= startDate
      )
      .reduce((sum, t) => sum + t.amount, 0);

    const percentage = budget.limit > 0 ? (spent / budget.limit) * 100 : 0;
    const remaining = budget.limit - spent;

    return { spent, percentage, remaining };
  };

  const handleAddBudget = () => {
    if (!newBudgetCategory || !newBudgetLimit) return;

    const budget: Budget = {
      id: crypto.randomUUID(),
      category: newBudgetCategory,
      limit: parseFloat(newBudgetLimit),
      period: newBudgetPeriod,
      spent: 0,
    };

    onUpdateBudget(budget);
    setNewBudgetCategory('');
    setNewBudgetLimit('');
    setShowAddBudget(false);
  };

  const getProgressColor = (percentage: number) => {
    if (percentage >= 100) return colorPalette.danger;
    if (percentage >= 80) return colorPalette.warning;
    return colorPalette.success;
  };

  const getStatusBadge = (percentage: number) => {
    if (percentage >= 100) {
      return <Badge className="bg-red-100 text-red-800 hover:bg-red-200 border-0">Over Budget</Badge>;
    }
    if (percentage >= 80) {
      return <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-200 border-0">Warning</Badge>;
    }
    return <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-200 border-0">On Track</Badge>;
  };

  return (
    <Card className="overflow-hidden border-0 shadow-md rounded-xl" style={{ backgroundColor: colorPalette.card }}>
      <CardHeader className="pb-3 border-b" style={{ borderColor: '#F1F5F9' }}>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold" style={{ color: colorPalette.textPrimary }}>
            Budget Tracker
          </CardTitle>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              onClick={() => setShowAddBudget(!showAddBudget)}
              size="sm"
              className="text-sm rounded-lg flex items-center gap-1"
              style={{ 
                backgroundColor: showAddBudget ? colorPalette.secondary : colorPalette.primary,
              }}
            >
              {showAddBudget ? (
                <X className="h-4 w-4" />
              ) : (
                <Plus className="h-4 w-4" />
              )}
              <span className="hidden sm:inline">
                {showAddBudget ? 'Cancel' : 'Add Budget'}
              </span>
            </Button>
          </motion.div>
        </div>
      </CardHeader>
      
      <CardContent className="pt-6" style={{ backgroundColor: colorPalette.background }}>
        <AnimatePresence>
          {showAddBudget && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden mb-6"
            >
              <div className="p-4 rounded-lg space-y-4" style={{ backgroundColor: colorPalette.card, border: `1px solid #F1F5F9` }}>
                <div className="space-y-2">
                  <Label className="text-sm font-medium" style={{ color: colorPalette.textPrimary }}>
                    Category
                  </Label>
                  <Select value={newBudgetCategory} onValueChange={setNewBudgetCategory}>
                    <SelectTrigger className="rounded-md border-gray-200 py-5">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {expenseCategories
                        .filter(cat => !budgets.some(b => b.category === cat.name))
                        .map(category => (
                        <SelectItem key={category.id} value={category.name} className="py-3">
                          <div className="flex items-center gap-2">
                            <span>{category.icon}</span>
                            <span>{category.name}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium" style={{ color: colorPalette.textPrimary }}>
                    Budget Limit
                  </Label>
                  <Input
                    type="number"
                    step="0.01"
                    value={newBudgetLimit}
                    onChange={(e) => setNewBudgetLimit(e.target.value)}
                    placeholder="0.00"
                    className="py-5 rounded-md border-gray-200"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium" style={{ color: colorPalette.textPrimary }}>
                    Period
                  </Label>
                  <Select value={newBudgetPeriod} onValueChange={(value: any) => setNewBudgetPeriod(value)}>
                    <SelectTrigger className="rounded-md border-gray-200 py-5">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="weekly" className="py-3">Weekly</SelectItem>
                      <SelectItem value="monthly" className="py-3">Monthly</SelectItem>
                      <SelectItem value="yearly" className="py-3">Yearly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex flex-col sm:flex-row gap-2 pt-2">
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="flex-1">
                    <Button 
                      onClick={handleAddBudget} 
                      className="w-full py-5 rounded-md font-medium"
                      style={{ backgroundColor: colorPalette.primary }}
                      disabled={!newBudgetCategory || !newBudgetLimit}
                    >
                      Add Budget
                    </Button>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="flex-1">
                    <Button 
                      variant="outline" 
                      onClick={() => setShowAddBudget(false)} 
                      className="w-full py-5 rounded-md border-gray-300 font-medium"
                      style={{ color: colorPalette.textSecondary }}
                    >
                      Cancel
                    </Button>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="space-y-4">
          <AnimatePresence>
            {budgets.length === 0 ? (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-8 rounded-lg border border-dashed"
                style={{ 
                  color: colorPalette.textSecondary, 
                  borderColor: '#E2E8F0',
                  backgroundColor: colorPalette.card
                }}
              >
                <div className="mb-2 flex justify-center">
                  <div className="p-3 rounded-full" style={{ backgroundColor: '#F1F5F9' }}>
                    <Plus className="h-6 w-6" style={{ color: colorPalette.secondary }} />
                  </div>
                </div>
                <p className="font-medium" style={{ color: colorPalette.textPrimary }}>
                  No budgets yet
                </p>
                <p className="text-sm mt-1">
                  Add a budget to start tracking your spending limits.
                </p>
                <Button 
                  onClick={() => setShowAddBudget(true)} 
                  size="sm" 
                  className="mt-4 rounded-md"
                  style={{ backgroundColor: colorPalette.primary }}
                >
                  Create Budget
                </Button>
              </motion.div>
            ) : (
              budgets.map((budget, index) => {
                const { spent, percentage, remaining } = getBudgetData(budget);
                const categoryInfo = expenseCategories.find(c => c.name === budget.category);

                return (
                  <motion.div
                    key={budget.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.3 }}
                    whileHover={{ y: -2, transition: { duration: 0.2 } }}
                    className="p-4 rounded-lg space-y-4 transition-all duration-200"
                    style={{ 
                      backgroundColor: colorPalette.card, 
                      border: `1px solid #F1F5F9`,
                      boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.05)'
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 min-w-0 flex-1">
                        <div 
                          className="p-2 rounded-lg flex-shrink-0"
                          style={{ backgroundColor: '#F1F5F9' }}
                        >
                          <span className="text-lg" style={{ color: colorPalette.primary }}>
                            {categoryInfo?.icon || '💰'}
                          </span>
                        </div>
                        <div className="min-w-0 flex-1">
                          <h4 
                            className="font-medium truncate text-base"
                            style={{ color: colorPalette.textPrimary }}
                          >
                            {budget.category}
                          </h4>
                          <p 
                            className="text-sm capitalize"
                            style={{ color: colorPalette.textSecondary }}
                          >
                            {budget.period} budget • Limit: {formatCurrency(budget.limit)}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        {getStatusBadge(percentage)}
                        {onDeleteBudget && (
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => onDeleteBudget(budget.id)}
                            className="p-1 rounded-md hover:bg-gray-100 transition-colors"
                            aria-label="Delete budget"
                          >
                            <Trash2 className="h-4 w-4" style={{ color: colorPalette.textSecondary }} />
                          </motion.button>
                        )}
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span style={{ color: colorPalette.textPrimary }}>
                          Spent: {formatCurrency(spent)}
                        </span>
                        <span style={{ color: colorPalette.textPrimary }}>
                          {formatCurrency(remaining)} {remaining >= 0 ? 'left' : 'over'}
                        </span>
                      </div>
                      
                      <div className="relative">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: "100%" }}
                          transition={{ delay: index * 0.1 + 0.3, duration: 0.8 }}
                        >
                          <Progress 
                            value={Math.min(percentage, 100)} 
                            className="h-2 rounded-full bg-gray-200"
                            style={{
                              backgroundColor: '#E2E8F0',
                              ['--progress-color' as any]: getProgressColor(percentage)
                            }}
                          />
                        </motion.div>
                      </div>
                      
                      <div className="flex justify-between text-xs"
                        style={{ color: colorPalette.textSecondary }}
                      >
                        <span>{percentage.toFixed(1)}% used</span>
                        <span>
                          {percentage >= 100 
                            ? `Exceeded by ${formatCurrency(Math.abs(remaining))}`
                            : `${formatCurrency(remaining)} remaining`
                          }
                        </span>
                      </div>
                    </div>
                  </motion.div>
                );
              })
            )}
          </AnimatePresence>
        </div>
      </CardContent>
    </Card>
  );
}