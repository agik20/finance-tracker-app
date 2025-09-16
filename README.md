# 💰 Finance Tracker

A modern, feature-rich personal finance tracking application built with React, TypeScript, and Tailwind CSS. Track your income, expenses, and budgets with beautiful charts and animations, all stored locally in your browser.

![Finance Tracker Preview](https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=400&fit=crop)

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

## 🛠️ Technologies Used

- **Frontend Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS v4
- **Animations**: Motion (formerly Framer Motion)
- **Charts**: Recharts
- **Icons**: Lucide React
- **UI Components**: Shadcn/ui
- **Data Storage**: Browser localStorage
- **Build Tool**: Vite (assumed based on modern React setup)

## 📋 Prerequisites

Before running this project locally, make sure you have the following installed:

- **Node.js** (version 16.0 or higher)
- **npm** (version 7.0 or higher) or **yarn** (version 1.22 or higher)

You can check your versions by running:
```bash
node --version
npm --version
```

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/agik20/finance-tracker-app.git
cd finance-tracker-app
```

### 2. Install Dependencies

Using npm:
```bash
npm install
```

Or using yarn:
```bash
yarn install
```

### 3. Install Required Packages

This project uses several key dependencies. Make sure to install them:

```bash
# Core dependencies
npm install react react-dom typescript

# UI and Styling
npm install tailwindcss@next @tailwindcss/typography
npm install clsx tailwind-merge
npm install class-variance-authority

# Animation and Motion
npm install motion

# Charts and Visualization
npm install recharts

# Icons
npm install lucide-react

# UI Components (if using shadcn/ui)
npm install @radix-ui/react-accordion @radix-ui/react-alert-dialog
npm install @radix-ui/react-avatar @radix-ui/react-checkbox
npm install @radix-ui/react-collapsible @radix-ui/react-dialog
npm install @radix-ui/react-dropdown-menu @radix-ui/react-hover-card
npm install @radix-ui/react-label @radix-ui/react-popover
npm install @radix-ui/react-progress @radix-ui/react-radio-group
npm install @radix-ui/react-scroll-area @radix-ui/react-select
npm install @radix-ui/react-separator @radix-ui/react-slider
npm install @radix-ui/react-switch @radix-ui/react-tabs
npm install @radix-ui/react-toast @radix-ui/react-toggle
npm install @radix-ui/react-toggle-group @radix-ui/react-tooltip

# Form handling
npm install react-hook-form@7.55.0 @hookform/resolvers zod

# Development dependencies
npm install -D @types/react @types/react-dom
npm install -D vite @vitejs/plugin-react
```

### 4. Start the Development Server

```bash
npm run dev
```

Or with yarn:
```bash
yarn dev
```

The application will be available at `http://localhost:3000` (or the port shown in your terminal).

### 5. Build for Production

To create a production build:

```bash
npm run build
```

To preview the production build:
```bash
npm run preview
```

## 📁 Project Structure

```
finance-tracker/
├── App.tsx                 # Main application component
├── components/             # Reusable React components
│   ├── budget-tracker.tsx  # Budget management component
│   ├── expense-chart.tsx   # Charts and analytics
│   ├── finance-overview.tsx # Dashboard overview cards
│   ├── transaction-form.tsx # Form for adding transactions
│   ├── transaction-list.tsx # List and filter transactions
│   ├── figma/              # Figma-specific components
│   └── ui/                 # Shadcn/ui components
├── hooks/                  # Custom React hooks
│   └── use-finance.ts      # Main finance data management hook
├── lib/                    # Utility libraries
│   └── finance-storage.ts  # localStorage management
├── styles/                 # Global styles
│   └── globals.css         # Tailwind CSS and custom styles
├── types/                  # TypeScript type definitions
│   └── finance.ts          # Finance-related types
└── README.md              # This file
```

## 🎯 Usage

### Adding Transactions
1. Navigate to the **Dashboard** tab
2. Use the transaction form on the left to add income or expenses
3. Select or create categories, add descriptions, and set amounts
4. View your transactions in the list on the right

### Viewing Analytics
1. Go to the **Analytics** tab
2. View expense breakdown by category in the pie chart
3. Track monthly trends in the bar chart

### Managing Budgets
1. Visit the **Budgets** tab
2. Click "Add Budget" to set spending limits for categories
3. Monitor your progress with visual indicators
4. Get warnings when approaching or exceeding limits

### Mobile Usage
- The app is fully responsive and optimized for mobile devices
- Touch-friendly buttons and collapsible sections
- Swipe-friendly navigation and interactions

## 🎨 Customization

### Themes
The app supports both light and dark themes. The theme will automatically follow your system preference, or you can toggle it manually if a theme switcher is implemented.

### Categories
- Create custom categories with emojis
- Categories are automatically filtered by transaction type (income/expense)
- Edit or delete categories as needed

### Data Storage
- All data is stored locally in your browser's localStorage
- Data persists between sessions
- Export/import functionality can be added for backup

## 🚀 Future Enhancements

This project is ready for the following upgrades:

### Supabase Integration
The app is designed to easily integrate with Supabase for:
- Cross-device synchronization
- User authentication
- Cloud data backup
- Real-time updates

### Additional Features
- CSV import/export
- Receipt photo uploads
- Recurring transactions
- Financial goal tracking
- Notification system
- Multiple currency support

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Make your changes and commit: `git commit -m 'Add new feature'`
4. Push to the branch: `git push origin feature/new-feature`
5. Submit a pull request

## 📝 Development Notes

### Code Style
- Use TypeScript for type safety
- Follow React best practices with hooks
- Use Tailwind CSS for styling (avoid custom CSS when possible)
- Implement responsive design mobile-first
- Add animations sparingly for better UX

### Testing
- Test on multiple screen sizes
- Verify localStorage functionality
- Test form validations
- Check chart responsiveness

## 🐛 Troubleshooting

### Common Issues

**Port already in use:**
```bash
# Kill the process using port 3000
npx kill-port 3000
# Or use a different port
npm run dev -- --port 3001
```

**Module not found errors:**
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

**Styling issues:**
- Make sure Tailwind CSS is properly configured
- Check that globals.css is imported in your main component
- Verify all UI components are properly installed

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- [Shadcn/ui](https://ui.shadcn.com/) for the beautiful UI components
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Recharts](https://recharts.org/) for the responsive charts
- [Lucide](https://lucide.dev/) for the icon set
- [Motion](https://motion.dev/) for smooth animations

---

**Happy tracking! 💰✨**
