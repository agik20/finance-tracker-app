import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Textarea } from "./ui/textarea";
import { Badge } from "./ui/badge";
import { Plus, X } from "lucide-react";
import { Category, Transaction } from "../types/finance";

interface TransactionFormProps {
  categories: Category[];
  onAddTransaction: (transaction: Omit<Transaction, 'id' | 'createdAt'>) => void;
  onAddCategory: (category: Omit<Category, 'id'>) => void;
}

export function TransactionForm({ categories, onAddTransaction, onAddCategory }: TransactionFormProps) {
  // Palet warna modern dan profesional
  const colorPalette = {
    primary: '#3B82F6',    // Biru profesional
    secondary: '#64748B',  // Abu-abu netral
    success: '#10B981',    // Hijau untuk income
    danger: '#EF4444',     // Merah untuk expense
    background: '#F8FAFC', // Latar belakang soft
    card: '#FFFFFF',       // Warna kartu
    textPrimary: '#1E293B',// Teks utama
    textSecondary: '#64748B', // Teks sekunder
    border: '#E2E8F0',     // Warna border
  };

  const [type, setType] = useState<'income' | 'expense'>('expense');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [newCategoryIcon, setNewCategoryIcon] = useState('💰');

  const filteredCategories = categories.filter(c => c.type === type);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!amount || !category || !description) return;

    onAddTransaction({
      type,
      amount: parseFloat(amount),
      category,
      description,
      date,
    });

    // Reset form
    setAmount('');
    setCategory('');
    setDescription('');
    setDate(new Date().toISOString().split('T')[0]);
  };

  const handleAddCategory = () => {
    if (!newCategoryName) return;

    const colors = ['#EF4444', '#F59E0B', '#10B981', '#3B82F6', '#8B5CF6', '#EC4899'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];

    onAddCategory({
      name: newCategoryName,
      type,
      icon: newCategoryIcon,
      color: randomColor,
    });

    setNewCategoryName('');
    setNewCategoryIcon('💰');
    setShowAddCategory(false);
  };

  return (
    <Card className="overflow-hidden border-0 shadow-md rounded-xl" style={{ backgroundColor: colorPalette.card }}>
      <CardHeader className="pb-3 border-b" style={{ borderColor: colorPalette.border }}>
        <CardTitle className="text-lg font-semibold" style={{ color: colorPalette.textPrimary }}>
          Add Transaction
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
          {/* Type Toggle */}
          <motion.div 
            className="flex gap-3 p-1 rounded-lg"
            style={{ backgroundColor: colorPalette.background }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div 
              className="flex-1"
              whileHover={{ scale: 1.02 }} 
              whileTap={{ scale: 0.98 }}
            >
              <Button
                type="button"
                variant={type === 'expense' ? 'default' : 'ghost'}
                onClick={() => setType('expense')}
                className="w-full rounded-md font-medium"
                style={{ 
                  backgroundColor: type === 'expense' ? colorPalette.danger : 'transparent',
                  color: type === 'expense' ? 'white' : colorPalette.textSecondary,
                }}
              >
                Expense
              </Button>
            </motion.div>
            <motion.div 
              className="flex-1"
              whileHover={{ scale: 1.02 }} 
              whileTap={{ scale: 0.98 }}
            >
              <Button
                type="button"
                variant={type === 'income' ? 'default' : 'ghost'}
                onClick={() => setType('income')}
                className="w-full rounded-md font-medium"
                style={{ 
                  backgroundColor: type === 'income' ? colorPalette.success : 'transparent',
                  color: type === 'income' ? 'white' : colorPalette.textSecondary,
                }}
              >
                Income
              </Button>
            </motion.div>
          </motion.div>

          {/* Amount Input */}
          <motion.div 
            className="space-y-2"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1, duration: 0.3 }}
          >
            <Label htmlFor="amount" className="text-sm font-medium" style={{ color: colorPalette.textPrimary }}>
              Amount
            </Label>
            <Input
              id="amount"
              type="number"
              step="0.01"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
              className="py-5 rounded-md border-gray-200 text-base"
              required
              style={{ borderColor: colorPalette.border }}
            />
          </motion.div>

          {/* Category Selection */}
          <motion.div 
            className="space-y-2"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.3 }}
          >
            <div className="flex items-center justify-between">
              <Label htmlFor="category" className="text-sm font-medium" style={{ color: colorPalette.textPrimary }}>
                Category
              </Label>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowAddCategory(!showAddCategory)}
                  className="text-xs font-medium rounded-md"
                  style={{ color: colorPalette.primary }}
                >
                  {showAddCategory ? (
                    <X className="h-4 w-4 mr-1" />
                  ) : (
                    <Plus className="h-4 w-4 mr-1" />
                  )}
                  {showAddCategory ? 'Cancel' : 'Add Category'}
                </Button>
              </motion.div>
            </div>
            
            <AnimatePresence>
              {showAddCategory && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div 
                    className="flex flex-col sm:flex-row gap-2 p-3 border rounded-lg mb-2"
                    style={{ borderColor: colorPalette.border, backgroundColor: colorPalette.background }}
                  >
                    <Input
                      placeholder="Category name"
                      value={newCategoryName}
                      onChange={(e) => setNewCategoryName(e.target.value)}
                      className="text-sm flex-1"
                    />
                    <Input
                      placeholder="Icon"
                      value={newCategoryIcon}
                      onChange={(e) => setNewCategoryIcon(e.target.value)}
                      className="w-full sm:w-16 text-sm text-center"
                      maxLength={2}
                    />
                    <Button 
                      type="button" 
                      onClick={handleAddCategory} 
                      size="sm" 
                      className="text-sm font-medium rounded-md"
                      style={{ backgroundColor: colorPalette.primary }}
                      disabled={!newCategoryName}
                    >
                      Add
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <Select value={category} onValueChange={setCategory} required>
              <SelectTrigger 
                className="py-5 rounded-md border-gray-200 text-base"
                style={{ borderColor: colorPalette.border }}
              >
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {filteredCategories.map((cat) => (
                  <SelectItem 
                    key={cat.id} 
                    value={cat.name}
                    className="py-3"
                  >
                    <div className="flex items-center gap-2">
                      <span>{cat.icon}</span>
                      <span>{cat.name}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </motion.div>

          {/* Description Textarea */}
          <motion.div 
            className="space-y-2"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.3 }}
          >
            <Label htmlFor="description" className="text-sm font-medium" style={{ color: colorPalette.textPrimary }}>
              Description
            </Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter description"
              className="rounded-md border-gray-200 resize-none text-base"
              rows={3}
              required
              style={{ borderColor: colorPalette.border }}
            />
          </motion.div>

          {/* Date Input */}
          <motion.div 
            className="space-y-2"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.3 }}
          >
            <Label htmlFor="date" className="text-sm font-medium" style={{ color: colorPalette.textPrimary }}>
              Date
            </Label>
            <Input
              id="date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="py-5 rounded-md border-gray-200 text-base"
              required
              style={{ borderColor: colorPalette.border }}
            />
          </motion.div>

          {/* Submit Button */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.3 }}
          >
            <Button 
              type="submit" 
              className="w-full py-5 rounded-md font-medium text-base"
              style={{ backgroundColor: type === 'expense' ? colorPalette.danger : colorPalette.success }}
              disabled={!amount || !category || !description}
            >
              Add Transaction
            </Button>
          </motion.div>
        </form>
      </CardContent>
    </Card>
  );
}