# Architecture Overview

This document provides a detailed overview of the IQ Quiz Contest application architecture.

## 🏗️ System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     Base Mini App Client                     │
│  ┌───────────────────────────────────────────────────────┐  │
│  │              Next.js App (Client-Side)                │  │
│  │  ┌──────────────┐  ┌──────────────┐  ┌────────────┐ │  │
│  │  │   Farcaster  │  │    Wagmi     │  │   React    │ │  │
│  │  │     SDK      │  │  (Wallet)    │  │   Query    │ │  │
│  │  └──────────────┘  └──────────────┘  └────────────┘ │  │
│  └───────────────────────────────────────────────────────┘  │
│                         │                                     │
│                         │ Web3 Provider                       │
│                         ▼                                     │
│              ┌───────────────────────┐                        │
│              │   Base Blockchain     │                        │
│              │   (Ethereum L2)       │                        │
│              └───────────────────────┘                        │
└─────────────────────────────────────────────────────────────┘
```

## 📁 Project Structure

### App Layer (`app/`)

- **`layout.tsx`**: Root layout with metadata, viewport configuration, and providers
- **`page.tsx`**: Main quiz application with state management and navigation
- **`globals.css`**: Global styles and Tailwind CSS configuration

### Components Layer (`components/`)

#### Core Components

- **`providers.tsx`**: React Context providers (Farcaster, Wagmi, React Query)
- **`app-header.tsx`**: Persistent header with user profile
- **`wallet-auto-connect.tsx`**: Automatic wallet connection logic

#### Screen Components

- **`home-screen.tsx`**: Category selection screen
- **`category-screen.tsx`**: Quiz selection within a category
- **`welcome-screen.tsx`**: Quiz introduction and rules
- **`quiz-screen.tsx`**: Active quiz interface with timer
- **`payment-gate.tsx`**: Payment processing component
- **`results-screen.tsx`**: Score display and interpretation
- **`answer-breakdown-screen.tsx`**: Detailed answer review

#### UI Components

- **`ui/button.tsx`**: Reusable button component (shadcn/ui)

### Library Layer (`lib/`)

- **`farcaster-sdk.ts`**: Farcaster Mini App SDK initialization and utilities
- **`wagmi-config.ts`**: Wagmi configuration for Base chain + payment settings
- **`quiz-data.ts`**: Quiz content, categories, questions, and scoring logic
- **`utils.ts`**: General utility functions

### Public Assets (`public/`)

- **`.well-known/farcaster.json`**: Base Mini App manifest (required)
- **`icon.png`**: App icon (200x200)
- **`hero.png`**: Hero image for embedding (1200x630)
- **`splash.png`**: Splash screen (1284x2778)
- **`og-image.png`**: Open Graph image (1200x630)

## 🔄 Data Flow

### Initialization Flow

```
1. App loads → Providers mount
2. FarcasterContextProvider initializes SDK
3. SDK checks if in mini app context
4. SDK calls ready() → Hides splash screen
5. Wallet auto-connects (if in Base app)
6. User profile data fetched
7. App ready for interaction
```

### Quiz Flow

```
Home Screen
  ↓ User selects category
Category Screen
  ↓ User selects quiz
Welcome Screen
  ↓ User clicks "Start Quiz"
Quiz Screen (with timer)
  ↓ User answers 10 questions
  ↓ Timer expires OR user finishes
Payment Gate
  ↓ User approves payment
  ↓ Transaction confirmed on Base
Results Screen
  ↓ User can view breakdown
Answer Breakdown Screen
```

### Payment Flow

```
1. User completes quiz
2. PaymentGate component mounts
3. Wagmi checks wallet connection
4. If not connected → Auto-connect
5. Create transaction (send ETH to recipient)
6. User approves in wallet
7. Transaction submitted to Base
8. Wait for confirmation (useWaitForTransactionReceipt)
9. On confirmation → Show results
10. On error → Show error, allow retry
```

## 🔌 Integration Points

### Farcaster Mini App SDK

The app integrates with Farcaster's Mini App SDK for:

- **Context**: User data (FID, username, avatar)
- **Wallet Provider**: Ethereum provider for transactions
- **Actions**: `ready()`, `openUrl()`, `close()`, `composeCast()`
- **Safe Area Insets**: Device-specific UI spacing

**Key File**: `lib/farcaster-sdk.ts`

### Wagmi + Viem

Wagmi provides React hooks for Ethereum interactions:

- **useAccount**: Current wallet account
- **useConnect**: Wallet connection
- **useWalletClient**: Create transactions
- **useWaitForTransactionReceipt**: Transaction confirmation

**Key File**: `lib/wagmi-config.ts`

### Base Blockchain

All transactions occur on Base (Ethereum L2):

- **Chain ID**: 8453
- **Network**: Base Mainnet
- **Currency**: ETH
- **Payment Amount**: 0.0000033 ETH (configurable)

## 🎯 State Management

### React Context

- **FarcasterContext**: SDK state, user data, safe area insets
- **WagmiProvider**: Wallet connection state (via Wagmi)

### Local State (React Hooks)

- Quiz navigation state (`appState`)
- Selected category/quiz
- Current question index
- User answers
- Timer state
- Quiz results

### Server State (React Query)

- Transaction status
- Wallet connection status
- Transaction receipts

## 🔐 Security Considerations

### Client-Side Limitations

The current implementation is **client-side only**:

- Quiz answers are stored in component state
- Score calculation happens client-side
- Payment verification is front-end only

**For Production**: Consider adding:
- Server-side score calculation
- Backend payment verification API
- Signed score responses
- Database for user results

### Public Information

The following are intentionally public:

- Account association signature (domain verification)
- Wallet addresses (public on blockchain)
- Quiz questions/answers (educational content)
- App metadata (public configuration)

### Private Information

Never exposed or committed:

- Private keys
- API keys or secrets
- User personal data (handled by Farcaster SDK)
- Environment variables

## 🎨 UI/UX Patterns

### Mobile-First Design

- Touch targets: Minimum 44px
- Safe area insets: Respects device notches/indicators
- Viewport: Fixed, no scaling
- Full-screen: Optimized for mini app experience

### Responsive Design

- Desktop: Centered card layout
- Mobile: Full-width, optimized for Base app
- Breakpoints: Tailwind CSS defaults

### Animation & Transitions

- Smooth transitions between screens
- Loading states for async operations
- Hover effects (desktop only)
- Active states for interactions

## 📊 Performance Considerations

### Code Splitting

- Next.js automatically code-splits by route
- Components are lazy-loaded when possible

### Asset Optimization

- Images optimized via Next.js Image component
- SVG icons for scalability
- Minimal bundle size for fast loading

### Caching Strategy

- Static assets cached by CDN
- React Query caching for API calls
- Local storage for user preferences (if added)

## 🧪 Testing Strategy

### Manual Testing

- Test in Base mini app context
- Test wallet connection flow
- Test payment flow end-to-end
- Test on various devices/browsers

### Future Improvements

- Unit tests for utility functions
- Integration tests for payment flow
- E2E tests with Playwright/Cypress

## 🚀 Deployment Architecture

```
GitHub Repository
  ↓ (push to main)
Vercel (or similar)
  ↓ (build & deploy)
CDN + Edge Network
  ↓ (serves to users)
Base Mini App Client
```

### Build Process

1. `npm run build`: Next.js builds static assets
2. Server-side rendering: Initial HTML generated
3. Client-side hydration: React takes over
4. Static assets served via CDN

### Environment Configuration

- **Development**: `npm run dev` (localhost:3000)
- **Production**: Deployed to Vercel with custom domain
- **Staging**: Optional staging environment

## 📈 Scalability Considerations

### Current Limitations

- Client-side only (no backend)
- No user persistence
- Quiz content is static

### Future Enhancements

- Backend API for user accounts
- Database for quiz results
- Admin panel for quiz management
- Analytics and metrics
- Multi-language support
- More quiz categories

---

For questions or contributions, see [CONTRIBUTING.md](./CONTRIBUTING.md).

