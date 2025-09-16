import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { TrendingUp, TrendingDown, Wallet, DollarSign } from "lucide-react";
import { FinanceStats } from "../types/finance";

interface FinanceOverviewProps {
  stats: FinanceStats;
}

export function FinanceOverview({ stats }: FinanceOverviewProps) {
  // Palet warna modern dan profesional
  const colorPalette = {
    primary: '#3B82F6',    // Biru profesional
    secondary: '#64748B',  // Abu-abu netral
    success: '#10B981',    // Hijau untuk nilai positif
    danger: '#EF4444',     // Merah untuk nilai negatif
    background: '#F8FAFC', // Latar belakang soft
    card: '#FFFFFF',       // Warna kartu
    textPrimary: '#1E293B',// Teks utama
    textSecondary: '#64748B', // Teks sekunder
    border: '#E2E8F0',     // Warna border
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const cards = [
    {
      title: "Total Balance",
      value: stats.balance,
      icon: Wallet,
      color: stats.balance >= 0 ? colorPalette.success : colorPalette.danger,
      bgColor: stats.balance >= 0 ? '#ECFDF5' : '#FEF2F2',
      trend: stats.balance >= 0 ? "positive" : "negative",
    },
    {
      title: "Monthly Income",
      value: stats.monthlyIncome,
      icon: TrendingUp,
      color: colorPalette.success,
      bgColor: '#ECFDF5',
      trend: "positive",
    },
    {
      title: "Monthly Expenses",
      value: stats.monthlyExpenses,
      icon: TrendingDown,
      color: colorPalette.danger,
      bgColor: '#FEF2F2',
      trend: "negative",
    },
    {
      title: "Monthly Net",
      value: stats.monthlyBalance,
      icon: DollarSign,
      color: stats.monthlyBalance >= 0 ? colorPalette.success : colorPalette.danger,
      bgColor: stats.monthlyBalance >= 0 ? '#ECFDF5' : '#FEF2F2',
      trend: stats.monthlyBalance >= 0 ? "positive" : "negative",
    },
  ];

  return (
    <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
      {cards.map((card, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1, duration: 0.5 }}
          whileHover={{ y: -5, transition: { duration: 0.2 } }}
        >
          <Card 
            className="border-0 shadow-md rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg"
            style={{ backgroundColor: colorPalette.card }}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 px-4 pt-4">
              <CardTitle 
                className="text-sm font-medium truncate pr-2"
                style={{ color: colorPalette.textSecondary }}
              >
                {card.title}
              </CardTitle>
              <motion.div
                whileHover={{ scale: 1.2, rotate: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="p-2 rounded-lg flex-shrink-0"
                style={{ backgroundColor: card.bgColor }}
              >
                <card.icon 
                  className="h-4 w-4" 
                  style={{ color: card.color }} 
                />
              </motion.div>
            </CardHeader>
            <CardContent className="px-4 pb-4">
              <motion.div 
                className="text-xl font-bold truncate mb-1"
                style={{ color: card.color }}
                key={card.value}
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                {formatCurrency(card.value)}
              </motion.div>
              
              {card.title.includes('Monthly') && (
                <div className="flex items-center">
                  <div 
                    className={`w-0 h-0 border-l-4 border-l-transparent border-r-4 border-r-transparent border-t-4 mr-1 ${
                      card.trend === "positive" ? "border-t-green-500" : "border-t-red-500"
                    }`}
                    style={{ 
                      transform: card.trend === "positive" ? "rotate(0deg)" : "rotate(180deg)" 
                    }}
                  ></div>
                  <p 
                    className="text-xs"
                    style={{ color: colorPalette.textSecondary }}
                  >
                    This month
                  </p>
                </div>
              )}
              
              {card.title === "Total Balance" && (
                <div className="flex items-center">
                  <div 
                    className={`w-0 h-0 border-l-4 border-l-transparent border-r-4 border-r-transparent border-t-4 mr-1 ${
                      card.trend === "positive" ? "border-t-green-500" : "border-t-red-500"
                    }`}
                    style={{ 
                      transform: card.trend === "positive" ? "rotate(0deg)" : "rotate(180deg)" 
                    }}
                  ></div>
                  <p 
                    className="text-xs"
                    style={{ color: colorPalette.textSecondary }}
                  >
                    {card.trend === "positive" ? "Positive" : "Negative"} balance
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}