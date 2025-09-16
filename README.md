# 💰 Finance Tracker

A modern, feature-rich personal finance tracking application built with React, TypeScript, and Tailwind CSS. Track your income, expenses, and budgets with beautiful charts and animations, all stored locally in your browser.

![Finance Tracker](https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=400&fit=crop&auto=format)

## ✨ Features

- **📊 Dashboard Overview**: Get a quick snapshot of your financial health with key metrics
- **💸 Transaction Management**: Add, view, and delete income/expense transactions
- **📈 Visual Analytics**: Interactive pie charts for expense categories and bar charts for monthly trends
- **🎯 Budget Tracking**: Set spending limits and monitor your progress with visual indicators
- **📱 Mobile Responsive**: Optimized for both desktop and mobile devices
- **🎭 Smooth Animations**: Subtle animations and transitions for enhanced user experience
- **🌙 Dark Mode Support**: Built-in dark/light theme switching
- **💾 Local Storage**: All data persists locally in your browser
- **🏷️ Custom Categories**: Create and manage your own expense/income categories

## 🛠️ Tech Stack

![React](https://img.shields.io/badge/React-18.2-blue?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38bdf8?style=flat-square&logo=tailwindcss)
![Vite](https://img.shields.io/badge/Vite-5.0-646cff?style=flat-square&logo=vite)

## 📋 Prerequisites

Before running this project, ensure you have:

- **Node.js** (version 16.0 or higher)
- **npm** (version 7.0 or higher) or **yarn** (version 1.22 or higher)

Verify installations:
```bash
node --version
npm --version
```

## 🚀 Quick Start

### 1. Clone & Setup

```bash
git clone https://github.com/agik20/finance-tracker-app.git
cd finance-tracker-app
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Start Development Server

```bash
npm run dev
```

Visit `http://localhost:3000` to view the application.

### 4. Build for Production

```bash
npm run build
npm run preview
```

## 📁 Project Structure

```
finance-tracker/
├── src/
│   ├── components/          # Reusable components
│   │   ├── ui/             # Shadcn/ui components
│   │   ├── budget-tracker.tsx
│   │   ├── expense-chart.tsx
│   │   ├── finance-overview.tsx
│   │   ├── transaction-form.tsx
│   │   └── transaction-list.tsx
│   ├── hooks/              # Custom React hooks
│   │   └── use-finance.ts
│   ├── lib/                # Utilities
│   │   └── finance-storage.ts
│   ├── types/              # TypeScript definitions
│   │   └── finance.ts
│   └── styles/             # Global styles
│       └── globals.css
├── public/                 # Static assets
└── package.json
```

## 🎯 Core Dependencies

```json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "typescript": "^5.0.0",
    "tailwindcss": "^4.0.0",
    "motion": "^10.0.0",
    "recharts": "^2.8.0",
    "lucide-react": "^0.300.0",
    "react-hook-form": "^7.45.0",
    "zod": "^3.22.0"
  }
}
```

Install all required packages:
```bash
npm install react react-dom typescript tailwindcss@next motion recharts lucide-react react-hook-form@7.45.0 zod @hookform/resolvers
```

## 🎨 UI Components

This project uses [shadcn/ui](https://ui.shadcn.com/) components. Install them with:

```bash
npx shadcn-ui@latest init
npx shadcn-ui@latest add button card chart dialog input label select table
```

## 💾 Data Management

All financial data is stored locally using browser localStorage. The app includes:

- Transaction history (income/expenses)
- Custom categories with emojis
- Budget limits and tracking
- User preferences (theme, currency)

## 📊 Analytics Features

- **Expense Breakdown**: Pie chart by category
- **Monthly Trends**: Bar chart showing income vs expenses
- **Budget Progress**: Visual indicators for spending limits
- **Financial Summary**: Key metrics dashboard

## 📱 Responsive Design

Optimized for all devices:
- Mobile-first approach
- Touch-friendly interfaces
- Collapsible navigation
- Adaptive charts and layouts

## 🔧 Development Scripts

```bash
npm run dev          # Start development server
npm run build        # Create production build
npm run preview      # Preview production build
npm run lint         # Run ESLint
npm run type-check   # TypeScript validation
```

## 🎨 Customization Guide

### Adding New Categories
Edit the `categories` array in `src/types/finance.ts`:

```typescript
export const defaultCategories = [
  { id: '1', name: 'Food', emoji: '🍕', type: 'expense' },
  { id: '2', name: 'Salary', emoji: '💰', type: 'income' },
  // Add your custom categories here
];
```

### Modifying Themes
Edit color schemes in `tailwind.config.js`:

```javascript
theme: {
  extend: {
    colors: {
      primary: {
        DEFAULT: 'hsl(222.2 84% 4.9%)',
        foreground: 'hsl(210 40% 98%)'
      }
    }
  }
}
```

## 🚀 Deployment

### Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### Netlify
```bash
npm run build
# Drag and drop dist folder to Netlify
```

### GitHub Pages
```bash
npm install --save-dev gh-pages
# Add to package.json:
"homepage": "https://yourusername.github.io/repo-name",
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d dist"
}
```

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

If you encounter any issues:

1. Check the [Troubleshooting](#troubleshooting) section below
2. Search existing [GitHub Issues](https://github.com/agik20/finance-tracker-app/issues)
3. Create a new issue with details about your problem

## 🐛 Troubleshooting

### Common Issues

**Build Failures:**
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

**Styling Issues:**
- Ensure Tailwind CSS is properly configured
- Check that `globals.css` is imported in main component

**TypeScript Errors:**
```bash
npm run type-check  # Identify type issues
```

**Port Already in Use:**
```bash
# Use different port
npm run dev -- --port 3001
```

## 🔮 Future Roadmap

- [ ] **Supabase Integration** - Cloud sync & authentication
- [ ] **Recurring Transactions** - Automated entries
- [ ] **Export/Import** - CSV & PDF reports
- [ ] **Multi-Currency Support** - Global finance tracking
- [ ] **Mobile App** - React Native version
- [ ] **API Integration** - Bank connectivity

## 🙏 Acknowledgments

- [Shadcn/ui](https://ui.shadcn.com/) for beautiful component library
- [Tailwind CSS](https://tailwindcss.com/) for utility-first styling
- [Recharts](https://recharts.org/) for responsive data visualization
- [Lucide](https://lucide.dev/) for beautiful icons

---

<div align="center">

**Made with ❤️ by [Your Name]**

[![GitHub Stars](https://img.shields.io/github/stars/agik20/finance-tracker-app?style=social)](https://github.com/agik20/finance-tracker-app/stargazers)
[![GitHub Forks](https://img.shields.io/github/forks/agik20/finance-tracker-app?style=social)](https://github.com/agik20/finance-tracker-app/network/members)

</div>
