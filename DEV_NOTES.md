# Developer Handover Notes - Phase 1

## 🏗️ Architecture Overview

This application follows a modular architecture designed for easy extension in Phase 2. The codebase is split into clear layers:

### **Frontend (React + TypeScript)**
- **Components**: Isolated, reusable UI components
- **Hooks**: Custom hooks for data management and state
- **Mock Layer**: Simulated data and real-time updates

### **Backend (Electron)**
- **Main Process**: Window management and IPC handlers
- **Preload Script**: Secure communication bridge
- **Mock API**: Phase 1 simulation endpoints

## 📦 Component Breakdown

### **Header.tsx**
- **Purpose**: App title, connection status, action buttons
- **Props**: `connectionStatus` object
- **Features**: 
  - Real-time connection indicator with latency
  - Animated status dots with glow effects
  - Placeholder action buttons for Phase 2

**Future Extension Points:**
```typescript
// Add these handlers in Phase 2:
const handleSettingsClick = () => { /* Open settings modal */ };
const handleActivityClick = () => { /* Open activity log */ };
```

### **AccountDisplay.tsx**
- **Purpose**: Display account balance, exposure, status
- **Props**: `accountInfo` and `loading` state
- **Features**:
  - Formatted currency display
  - Status indicators with color coding
  - Responsive grid layout

**API Integration Points:**
```typescript
// Replace mock hook with real API:
// const { accountInfo, loading } = useAccountInfo();
// with:
// const { accountInfo, loading } = useBetfairAccount();
```

### **GlobalSettings.tsx**
- **Purpose**: App configuration and risk management
- **Props**: `settings` object and `onSettingsChange` handler
- **Features**:
  - Toggle switches for boolean settings
  - Number inputs for risk management values
  - Organized into sections (General, Risk, Notifications)

**Extension for Phase 2:**
- Add strategy-specific settings
- Include API connection settings
- Add export/import settings functionality

## 🔄 Mock Data System

### **mockData.ts**
Contains all mock data types, generators, and the `MockDataProvider` class.

**Key Components:**
```typescript
// Data Types
interface AccountInfo { ... }
interface ConnectionStatus { ... }
interface GlobalSettings { ... }

// Real-time Simulation
class MockDataProvider {
  start()  // Begin simulated updates
  stop()   // Stop simulated updates
  onAccountInfoUpdate(callback)    // Subscribe to account changes
  onConnectionStatusUpdate(callback) // Subscribe to connection changes
}
```

**Phase 2 Migration Path:**
1. Replace `MockDataProvider` with `BetfairAPIProvider`
2. Keep the same interface for seamless component integration
3. Update hooks to use real API endpoints

### **useMockData.ts**
Custom hooks that abstract data access from components.

**Current Hooks:**
- `useAccountInfo()` - Account balance and status
- `useConnectionStatus()` - API connection state
- `useGlobalSettings()` - App configuration

**Migration Strategy:**
```typescript
// Phase 1 (Mock)
const { accountInfo, loading } = useAccountInfo();

// Phase 2 (Real API) - Same interface!
const { accountInfo, loading } = useAccountInfo(); // Now calls real API
```

## 🔌 Electron Integration

### **main.ts**
The Electron main process handles:
- Window creation and management
- IPC (Inter-Process Communication) setup
- Mock API endpoints

**Critical Phase 2 Integration Points:**
```typescript
// Current mock handlers:
ipcMain.handle('api:get-account-info', async () => { /* mock data */ });
ipcMain.handle('api:get-connection-status', async () => { /* mock data */ });

// Phase 2: Replace with real API calls:
ipcMain.handle('api:get-account-info', async () => {
  return await betfairAPI.getAccountInfo();
});
```

### **preload.ts**
Secure bridge between renderer and main process.

**Exposed APIs:**
```typescript
window.electronAPI = {
  getAppVersion: () => Promise<string>,
  api: {
    getAccountInfo: () => Promise<AccountInfo>,
    getConnectionStatus: () => Promise<ConnectionStatus>,
  }
};
```

**Phase 2 Extensions:**
- Add Betfair authentication methods
- Include market data fetching
- Add strategy execution endpoints

## 🎨 Design System Implementation

### **TailwindCSS Configuration**
Extended with neon color palette and custom animations:

```javascript
// tailwind.config.js
theme: {
  extend: {
    colors: {
      neon: { cyan, purple, green, pink, blue },
      dark: { 900, 800, 700, 600, 500, 400 }
    },
    animations: {
      'pulse-glow': 'Glowing effect for status indicators',
      'data-flow': 'Data streaming animation',
      'neon-flicker': 'Subtle flicker effect'
    }
  }
}
```

### **Component Styling Patterns**
1. **Cards**: `bg-dark-800 rounded-lg border border-dark-600`
2. **Hover States**: `hover:border-neon-cyan/30 transition-colors duration-300`
3. **Status Indicators**: Animated dots with `animate-pulse-glow`
4. **Typography**: Gradient text for headers, monospace for data

## 📋 Phase 2 Implementation Checklist

### **High Priority**
- [ ] Replace mock data provider with Betfair API integration
- [ ] Implement real authentication system
- [ ] Add market data components (bottom UI section)
- [ ] Create strategy configuration interface
- [ ] Add bet placement and management system

### **Medium Priority**
- [ ] Implement data persistence (settings, history)
- [ ] Add logging and error handling systems
- [ ] Create automated testing suite
- [ ] Add real-time notifications system

### **Low Priority**
- [ ] Add user preferences and themes
- [ ] Implement data export functionality
- [ ] Add keyboard shortcuts
- [ ] Create user documentation

## 🔧 Known Technical Debt

### **Areas for Improvement**
1. **Error Handling**: Mock data doesn't simulate error states
2. **State Management**: Consider Redux/Zustand for complex state
3. **Testing**: No unit tests implemented yet
4. **Performance**: Mock data updates could be optimized
5. **Accessibility**: ARIA labels and keyboard navigation needed

### **Refactoring Opportunities**
```typescript
// Current: Inline state management
const [settings, setSettings] = useState(defaultSettings);

// Better: Context or global state management
const { settings, updateSettings } = useSettingsContext();
```

## 🚀 Build and Deployment

### **Development Workflow**
```bash
npm run dev          # Start dev environment
npm run build        # Build for production
npm run dist:win     # Windows executable
npm run dist:mac     # macOS app bundle
npm run dist:linux   # Linux AppImage
```

### **File Structure After Build**
```
release/
├── win/             # Windows installer and portable
├── mac/             # macOS .dmg and .app
└── linux/           # Linux AppImage
```

## 📝 Important Notes for Phase 2

### **API Integration Strategy**
1. **Gradual Migration**: Start with one component (account info)
2. **Fallback System**: Keep mock data as fallback for testing
3. **Error States**: Implement proper error handling for API failures
4. **Rate Limiting**: Respect Betfair API rate limits

### **Security Considerations**
- Store API keys securely using electron-store
- Implement proper session management
- Add input validation for all user inputs
- Consider implementing user authentication

### **Performance Optimization**
- Implement data caching for frequently accessed information
- Add virtual scrolling for large data sets (market lists)
- Optimize re-renders using React.memo and useMemo
- Consider worker threads for heavy calculations

## 🤝 Handover Checklist

- [x] All Phase 1 components implemented and tested
- [x] Mock data system fully functional
- [x] Cross-platform builds working
- [x] Code documented and organized
- [x] TypeScript types defined
- [x] Electron IPC architecture established
- [x] UI/UX design system implemented
- [ ] Phase 2 integration points clearly marked
- [ ] Component extension examples provided
- [ ] Build and deployment process documented

---

**Next Developer**: Refer to the README.md for quick start instructions and this document for detailed architecture understanding. All Phase 2 integration points are marked with `// TODO: Phase 2` comments throughout the codebase.