# Nags 'N' Dogs Lite Bot - Phase 1

A cross-platform Electron + React + TailwindCSS trading automation application with neon-dark theming and mock data simulation.

## 🚀 Quick Start Guide

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn package manager

### Installation

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Run in Development Mode**
   ```bash
   npm run dev
   ```
   This will start both the Vite dev server and Electron app simultaneously.

3. **Build for Production**
   ```bash
   npm run build
   ```

### Platform-Specific Builds

- **Windows**: `npm run dist:win`
- **macOS**: `npm run dist:mac`
- **Linux**: `npm run dist:linux`

Built applications will be available in the `release/` directory.

## 📁 Project Structure

```
src/
├── components/          # React UI components
│   ├── Header.tsx      # App header with status indicators
│   ├── AccountDisplay.tsx # Account info and balance display
│   └── GlobalSettings.tsx # Settings panel
├── hooks/              # Custom React hooks
│   └── useMockData.ts  # Mock data management hooks
├── mock/               # Mock data and simulation
│   └── mockData.ts     # Mock data types and generators
├── types/              # TypeScript type definitions
│   └── electron.d.ts   # Electron API types
└── App.tsx            # Main application component

electron/
├── main.ts            # Electron main process
├── preload.ts         # Preload script for secure IPC
└── tsconfig.json      # Electron TypeScript config
```

## 🎨 Features (Phase 1)

### ✅ Implemented
- **Cross-platform Electron app** (Windows, Mac, Linux)
- **Neon-dark themed UI** with TailwindCSS
- **Global Settings Panel** with mock controls
- **Account Display Area** with live mock data
- **Real-time data simulation** (updates every 3-10 seconds)
- **Connection status monitoring**
- **Responsive design** for different window sizes
- **TypeScript support** throughout the codebase

### 🔄 Mock Data Features
- Account balance simulation with random fluctuations
- Connection status with realistic latency simulation
- Settings persistence during app session
- Live data updates to simulate real trading environment

## 🛠️ Development

### Available Scripts
- `npm run dev` - Start development environment
- `npm run build` - Build for production
- `npm run dist` - Build and package for all platforms
- `npm run lint` - Run ESLint

### Code Quality
- **Modular Architecture**: Each component is isolated and reusable
- **TypeScript**: Full type safety throughout the application
- **ESLint**: Code linting and formatting
- **Mock Data Layer**: Clean separation between UI and data

## 🎯 Phase 2 Preparation

The application is architected with Phase 2 in mind:

- **API Integration Points**: Clearly marked in `electron/main.ts`
- **Mock Data Hooks**: Easy to replace with real API calls
- **Component Structure**: Ready for additional trading UI components
- **Settings System**: Extensible for additional configuration options

## 📝 Mock Data Behavior

The app simulates realistic trading data:
- **Account Balance**: Random fluctuations between £1000-6000
- **Connection Status**: 85% uptime simulation with latency
- **Live Updates**: Data refreshes every 3-10 seconds
- **Settings**: Persist during app session, reset on restart

## 🎨 Design System

### Color Palette
- **Neon Cyan**: `#00ffff` - Primary accents and connections
- **Neon Purple**: `#bf00ff` - Secondary accents and settings
- **Neon Green**: `#00ff41` - Success states and profits
- **Neon Blue**: `#0080ff` - Information and notifications
- **Dark Grays**: Various shades for backgrounds and borders

### Typography
- **Headers**: Gradient text effects with neon colors
- **Data**: Monospace font for numerical values
- **UI Text**: Clean sans-serif for readability

## 🔧 Troubleshooting

### Common Issues

1. **Electron app won't start**
   - Ensure Node.js v18+ is installed
   - Delete `node_modules` and run `npm install` again

2. **Build fails**
   - Check that all dependencies are properly installed
   - Ensure proper platform-specific build tools are available

3. **Mock data not updating**
   - Check browser console for errors
   - Verify that the mock data provider is properly initialized

## 📄 License

Private project - Phase 1 implementation for Nags 'N' Dogs Lite Bot.