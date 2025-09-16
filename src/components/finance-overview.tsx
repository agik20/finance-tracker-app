import { motion } from "motion/react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { TrendingUp, TrendingDown, Wallet, DollarSign } from "lucide-react";
import { FinanceStats } from "../types/finance";

interface FinanceOverviewProps {
  stats: FinanceStats;
}

export function FinanceOverview({ stats }: FinanceOverviewProps) {
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
      color: stats.balance >= 0 ? "text-green-600" : "text-red-600",
    },
    {
      title: "Monthly Income",
      value: stats.monthlyIncome,
      icon: TrendingUp,
      color: "text-green-600",
    },
    {
      title: "Monthly Expenses",
      value: stats.monthlyExpenses,
      icon: TrendingDown,
      color: "text-red-600",
    },
    {
      title: "Monthly Net",
      value: stats.monthlyBalance,
      icon: DollarSign,
      color: stats.monthlyBalance >= 0 ? "text-green-600" : "text-red-600",
    },
  ];

  return (
    <div className="grid gap-3 sm:gap-4 grid-cols-2 lg:grid-cols-4">
      {cards.map((card, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1, duration: 0.5 }}
          whileHover={{ y: -5, transition: { duration: 0.2 } }}
        >
          <Card className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 px-3 sm:px-6 pt-3 sm:pt-6">
              <CardTitle className="text-xs sm:text-sm font-medium truncate pr-2">{card.title}</CardTitle>
              <motion.div
                whileHover={{ scale: 1.2, rotate: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <card.icon className={`h-3 w-3 sm:h-4 sm:w-4 ${card.color} flex-shrink-0`} />
              </motion.div>
            </CardHeader>
            <CardContent className="px-3 sm:px-6 pb-3 sm:pb-6">
              <motion.div 
                className={`text-base sm:text-2xl font-bold ${card.color} truncate`}
                key={card.value}
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                {formatCurrency(card.value)}
              </motion.div>
              {card.title.includes('Monthly') && (
                <p className="text-xs text-muted-foreground mt-1">
                  This month
                </p>
              )}
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}