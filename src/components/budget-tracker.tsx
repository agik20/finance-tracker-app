import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
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
}

export function BudgetTracker({ budgets, categories, transactions, onUpdateBudget }: BudgetTrackerProps) {
  const [showAddBudget, setShowAddBudget] = useState(false);
  const [newBudgetCategory, setNewBudgetCategory] = useState('');
  const [newBudgetLimit, setNewBudgetLimit] = useState('');
  const [newBudgetPeriod, setNewBudgetPeriod] = useState<'monthly' | 'weekly' | 'yearly'>('monthly');

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
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
    if (percentage >= 100) return 'bg-red-500';
    if (percentage >= 80) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const getStatusBadge = (percentage: number) => {
    if (percentage >= 100) {
      return <Badge variant="destructive">Over Budget</Badge>;
    }
    if (percentage >= 80) {
      return <Badge className="bg-yellow-500 hover:bg-yellow-600">Warning</Badge>;
    }
    return <Badge className="bg-green-500 hover:bg-green-600">On Track</Badge>;
  };

  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base sm:text-lg">Budget Tracker</CardTitle>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              onClick={() => setShowAddBudget(!showAddBudget)}
              size="sm"
              className="text-xs sm:text-sm"
            >
              {showAddBudget ? <X className="h-4 w-4 mr-1 sm:mr-2" /> : <Plus className="h-4 w-4 mr-1 sm:mr-2" />}
              <span className="hidden sm:inline">
                {showAddBudget ? 'Cancel' : 'Add Budget'}
              </span>
              <span className="sm:hidden">
                {showAddBudget ? 'Cancel' : 'Add'}
              </span>
            </Button>
          </motion.div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <AnimatePresence>
          {showAddBudget && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="mb-4 sm:mb-6 p-3 sm:p-4 border rounded-lg space-y-3 sm:space-y-4">
                <div className="space-y-2">
                  <Label className="text-sm sm:text-base">Category</Label>
                  <Select value={newBudgetCategory} onValueChange={setNewBudgetCategory}>
                    <SelectTrigger className="text-sm sm:text-base">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {expenseCategories
                        .filter(cat => !budgets.some(b => b.category === cat.name))
                        .map(category => (
                        <SelectItem key={category.id} value={category.name}>
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
                  <Label className="text-sm sm:text-base">Budget Limit</Label>
                  <Input
                    type="number"
                    step="0.01"
                    value={newBudgetLimit}
                    onChange={(e) => setNewBudgetLimit(e.target.value)}
                    placeholder="0.00"
                    className="text-sm sm:text-base"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-sm sm:text-base">Period</Label>
                  <Select value={newBudgetPeriod} onValueChange={(value: any) => setNewBudgetPeriod(value)}>
                    <SelectTrigger className="text-sm sm:text-base">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                      <SelectItem value="yearly">Yearly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex flex-col sm:flex-row gap-2">
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="flex-1">
                    <Button onClick={handleAddBudget} className="w-full text-sm sm:text-base">
                      Add Budget
                    </Button>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="flex-1">
                    <Button variant="outline" onClick={() => setShowAddBudget(false)} className="w-full text-sm sm:text-base">
                      Cancel
                    </Button>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="space-y-3 sm:space-y-4">
          <AnimatePresence>
            {budgets.length === 0 ? (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-8 text-muted-foreground text-sm sm:text-base"
              >
                No budgets set. Add a budget to start tracking your spending limits.
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
                    whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
                    className="p-3 sm:p-4 border rounded-lg space-y-3 hover:shadow-md transition-shadow duration-200"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 min-w-0 flex-1">
                        <motion.span 
                          className="text-base sm:text-lg flex-shrink-0"
                          whileHover={{ scale: 1.2 }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          {categoryInfo?.icon || '💰'}
                        </motion.span>
                        <div className="min-w-0">
                          <h4 className="font-medium text-sm sm:text-base truncate">{budget.category}</h4>
                          <p className="text-xs sm:text-sm text-muted-foreground capitalize">
                            {budget.period} budget
                          </p>
                        </div>
                      </div>
                      <div className="flex-shrink-0">
                        {getStatusBadge(percentage)}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-xs sm:text-sm">
                        <span>Spent: {formatCurrency(spent)}</span>
                        <span>Limit: {formatCurrency(budget.limit)}</span>
                      </div>
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: "100%" }}
                        transition={{ delay: index * 0.1 + 0.3, duration: 0.8 }}
                      >
                        <Progress 
                          value={Math.min(percentage, 100)} 
                          className="h-2"
                        />
                      </motion.div>
                      <div className="flex justify-between text-xs sm:text-sm text-muted-foreground">
                        <span>{percentage.toFixed(1)}% used</span>
                        <span className="text-right">
                          {remaining >= 0 
                            ? `${formatCurrency(remaining)} remaining`
                            : `${formatCurrency(Math.abs(remaining))} over budget`
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