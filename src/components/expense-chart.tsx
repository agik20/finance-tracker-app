import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend, BarChart, Bar, XAxis, YAxis } from 'recharts';

interface ExpenseChartProps {
  expenseData: Array<{
    name: string;
    value: number;
    color: string;
    icon: string;
  }>;
  monthlyTrend: Array<{
    month: string;
    income: number;
    expenses: number;
    net: number;
  }>;
}

export function ExpenseChart({ expenseData, monthlyTrend }: ExpenseChartProps) {
  // Palet warna modern dan profesional
  const colorPalette = {
    primary: '#3B82F6',    // Biru profesional
    secondary: '#64748B',  // Abu-abu netral
    success: '#10B981',    // Hijau untuk income
    danger: '#EF4444',     // Merah untuk expenses
    background: '#F8FAFC', // Latar belakang soft
    card: '#FFFFFF',       // Warna kartu
    textPrimary: '#1E293B',// Teks utama
    textSecondary: '#64748B', // Teks sekunder
    border: '#E2E8F0',     // Warna border
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div 
          className="p-3 rounded-lg shadow-md border"
          style={{ 
            backgroundColor: colorPalette.card,
            borderColor: colorPalette.border
          }}
        >
          <p className="font-medium" style={{ color: colorPalette.textPrimary }}>
            {data.name}
          </p>
          <p className="text-sm mt-1" style={{ color: colorPalette.textSecondary }}>
            {formatCurrency(data.value)}
          </p>
        </div>
      );
    }
    return null;
  };

  const MonthlyTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div 
          className="p-3 rounded-lg shadow-md border"
          style={{ 
            backgroundColor: colorPalette.card,
            borderColor: colorPalette.border
          }}
        >
          <p className="font-medium mb-2" style={{ color: colorPalette.textPrimary }}>
            {label}
          </p>
          {payload.map((entry: any, index: number) => (
            <p 
              key={index} 
              className="text-sm flex items-center gap-2"
              style={{ color: colorPalette.textPrimary }}
            >
              <span 
                className="inline-block w-3 h-3 rounded-full"
                style={{ backgroundColor: entry.color }}
              ></span>
              {entry.dataKey === 'income' ? 'Income' : 'Expenses'}: {formatCurrency(entry.value)}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="grid gap-4 sm:gap-6 lg:grid-cols-2">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="overflow-hidden border-0 shadow-md rounded-xl" style={{ backgroundColor: colorPalette.card }}>
          <CardHeader className="pb-3 border-b" style={{ borderColor: colorPalette.border }}>
            <CardTitle className="text-lg font-semibold" style={{ color: colorPalette.textPrimary }}>
              Expenses by Category
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            {expenseData.length > 0 ? (
              <div className="h-64 sm:h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={expenseData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={window.innerWidth < 640 ? 70 : 90}
                      paddingAngle={2}
                      dataKey="value"
                      label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                      labelLine={false}
                      labelStyle={{
                        fontSize: window.innerWidth < 640 ? '10px' : '12px',
                        fill: colorPalette.textPrimary,
                        fontWeight: 500,
                      }}
                    >
                      {expenseData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} stroke={colorPalette.card} strokeWidth={2} />
                      ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                    <Legend
                      verticalAlign="bottom"
                      height={36}
                      iconType="circle"
                      iconSize={10}
                      formatter={(value, entry) => (
                        <span 
                          style={{ 
                            color: colorPalette.textSecondary, 
                            fontSize: window.innerWidth < 640 ? '11px' : '13px',
                            marginLeft: '4px',
                            marginRight: '10px'
                          }}
                        >
                          {entry.payload?.icon} {value}
                        </span>
                      )}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="h-64 sm:h-80 flex flex-col items-center justify-center rounded-lg border border-dashed p-4"
                style={{ 
                  color: colorPalette.textSecondary, 
                  borderColor: colorPalette.border,
                  backgroundColor: colorPalette.background
                }}
              >
                <div className="mb-3">
                  <svg className="w-12 h-12 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <p className="text-center text-sm font-medium">
                  No expense data available
                </p>
                <p className="text-center text-xs mt-1">
                  Add expenses to see category breakdown
                </p>
              </motion.div>
            )}
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <Card className="overflow-hidden border-0 shadow-md rounded-xl" style={{ backgroundColor: colorPalette.card }}>
          <CardHeader className="pb-3 border-b" style={{ borderColor: colorPalette.border }}>
            <CardTitle className="text-lg font-semibold" style={{ color: colorPalette.textPrimary }}>
              Monthly Trend
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="h-64 sm:h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart 
                  data={monthlyTrend} 
                  margin={{ top: 5, right: 10, left: 0, bottom: 5 }}
                  barGap={5}
                  barCategoryGap="15%"
                >
                  <XAxis 
                    dataKey="month" 
                    tick={{ 
                      fontSize: window.innerWidth < 640 ? 10 : 12,
                      fill: colorPalette.textSecondary
                    }}
                    axisLine={{ stroke: colorPalette.border }}
                    tickLine={{ stroke: colorPalette.border }}
                  />
                  <YAxis 
                    tickFormatter={formatCurrency} 
                    tick={{ 
                      fontSize: window.innerWidth < 640 ? 10 : 12,
                      fill: colorPalette.textSecondary
                    }}
                    axisLine={{ stroke: colorPalette.border }}
                    tickLine={{ stroke: colorPalette.border }}
                  />
                  <Tooltip content={<MonthlyTooltip />} cursor={{ fill: colorPalette.background }} />
                  <Bar 
                    dataKey="income" 
                    fill={colorPalette.success} 
                    name="Income" 
                    radius={[4, 4, 0, 0]}
                  />
                  <Bar 
                    dataKey="expenses" 
                    fill={colorPalette.danger} 
                    name="Expenses" 
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}