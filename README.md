# 🧠 IQ Quiz Contest - Base Mini App

A modern, interactive IQ-style quiz application built as a **Base Mini App** with seamless wallet integration, on-chain payments, and beautiful UI. Test your logic, pattern recognition, and problem-solving skills across multiple categories.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/v0-iq-quiz-base-app)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## ✨ Features

- 🎯 **Multiple Quiz Categories**: History, Crypto, Tech, and more
- ⏱️ **Time-Pressured Challenges**: 10-minute time limit per quiz
- 💎 **On-Chain Payments**: Pay with ETH on Base to unlock results
- 👛 **Auto Wallet Connection**: Seamless wallet integration within Base app
- 👤 **User Profile Display**: Shows Farcaster username/avatar or wallet address
- 📱 **Mobile Optimized**: Perfect for Base mini app experience
- 🎨 **Beautiful UI**: Modern, gradient-based design with smooth animations
- 📊 **Detailed Results**: View score breakdown and answer explanations
- 🔐 **Safe Area Support**: Respects device safe areas (notches, etc.)

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm
- A Base-compatible wallet (if testing payments)
- A deployed domain with HTTPS (required for Base mini apps)

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/v0-iq-quiz-base-app.git
cd v0-iq-quiz-base-app

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📖 Documentation

### Project Structure

```
├── app/
│   ├── api/
│   │   └── webhook/
│   │       └── route.ts          # Webhook endpoint for Base events
│   ├── globals.css                # Global styles
│   ├── layout.tsx                 # Root layout with metadata
│   └── page.tsx                   # Main quiz page
├── components/
│   ├── app-header.tsx             # Persistent header with user profile
│   ├── answer-breakdown-screen.tsx
│   ├── category-screen.tsx        # Quiz category selection
│   ├── home-screen.tsx            # Home screen with categories
│   ├── payment-gate.tsx           # Payment handling component
│   ├── providers.tsx              # Farcaster + Wagmi providers
│   ├── quiz-screen.tsx            # Active quiz interface
│   ├── results-screen.tsx         # Results display
│   ├── user-profile.tsx           # User profile component
│   ├── wallet-auto-connect.tsx    # Auto wallet connection
│   ├── welcome-screen.tsx         # Quiz welcome screen
│   └── ui/
│       └── button.tsx             # Reusable button component
├── lib/
│   ├── farcaster-sdk.ts           # Farcaster SDK initialization
│   ├── quiz-data.ts               # Quiz content and data
│   ├── utils.ts                   # Utility functions
│   └── wagmi-config.ts            # Wagmi configuration + payment settings
├── public/
│   ├── .well-known/
│   │   └── farcaster.json         # Base mini app manifest
│   ├── icon.png                   # App icon (required)
│   ├── hero.png                   # Hero image (required)
│   ├── splash.png                 # Splash screen (required)
│   └── og-image.png               # Open Graph image
└── QUIZ_GUIDE.md                  # Guide for adding quiz content
```

### Key Files Explained

#### `public/.well-known/farcaster.json`

This is the **Base Mini App manifest** that tells Base about your app:

```json
{
  "accountAssociation": {
    "header": "...",      // Base64 encoded: { fid, type, key }
    "payload": "...",     // Base64 encoded: { domain }
    "signature": "..."    // Cryptographic proof of domain ownership
  },
  "baseBuilder": {
    "allowedAddresses": ["0x..."]  // Wallet addresses allowed to build
  },
  "miniapp": {
    "version": "1",
    "name": "IQ Quiz Contest",
    "homeUrl": "https://your-domain.com",
    "iconUrl": "https://your-domain.com/icon.png",
    // ... more metadata
  }
}
```

**⚠️ Important**: The `accountAssociation` signature is **public by design** - it's used to verify domain ownership, similar to SSL certificates. It's safe to include in public repositories.

#### `lib/farcaster-sdk.ts`

Handles Farcaster Mini App SDK initialization:

- Checks if running in mini app context
- Calls `sdk.actions.ready()` to signal app readiness
- Provides utility functions for URL opening, closing app, etc.

#### `lib/wagmi-config.ts`

Wagmi configuration for Base chain:

- Configures Base chain (chain ID: 8453)
- Sets up Farcaster's injected wallet provider
- Defines payment configuration (recipient address, amount)

#### `components/providers.tsx`

React context providers:

- **FarcasterContextProvider**: Manages SDK state, user data, safe area insets
- **WagmiProvider**: Wallet connection state
- **QueryClientProvider**: React Query for async state

#### `components/wallet-auto-connect.tsx`

Automatically connects the user's wallet when the app opens in Base. This provides a seamless experience - no manual connection required!

## 🔧 Configuration

### Update Payment Recipient

Edit `lib/wagmi-config.ts`:

```typescript
export const PAYMENT_CONFIG = {
  recipientAddress: "0xYOUR_WALLET_ADDRESS" as `0x${string}`,
  paymentAmountWei: BigInt(3300000000000), // 0.0000033 ETH
  chainId: base.id,
}
```

### Update Domain URLs

1. **Manifest** (`public/.well-known/farcaster.json`): Update all URLs to your domain
2. **Layout** (`app/layout.tsx`): Update `fc:miniapp` metadata URLs
3. **Base App ID**: Update `base:app_id` in `app/layout.tsx` if you have one

### Account Association

You need to generate account association credentials:

1. Use Base/Farcaster tools to create the signature
2. Update `public/.well-known/farcaster.json` with:
   - `header`: Base64 encoded header
   - `payload`: Base64 encoded domain payload
   - `signature`: Cryptographic signature

See [Base Mini Apps documentation](https://docs.base.org/docs/mini-apps) for details.

### Add Quiz Content

See [QUIZ_GUIDE.md](./QUIZ_GUIDE.md) for detailed instructions on adding categories, quizzes, and questions.

Quick example:

```typescript
// In lib/quiz-data.ts
const myQuizzes: Quiz[] = [
  {
    id: "my-quiz-1",
    name: "My Quiz",
    description: "Test your knowledge",
    icon: "🎯",
    timeLimit: 600, // 10 minutes
    questions: [
      {
        id: 1,
        questionText: "What is 2 + 2?",
        options: ["3", "4", "5", "6"],
        correctOptionIndex: 1,
        explanation: "2 + 2 equals 4.",
      },
      // ... 9 more questions
    ],
  },
]
```

## 🚢 Deployment

### Deploy to Vercel

1. **Connect your repository** to Vercel
2. **Set environment variables** (if needed)
3. **Deploy** - Vercel will auto-detect Next.js

```bash
# Or use Vercel CLI
npm i -g vercel
vercel --prod
```

### Required Assets

Ensure these files exist in `/public`:

- `icon.png` (200x200) - App icon
- `hero.png` (1200x630) - Hero/OG image
- `splash.png` (1284x2778) - Splash screen
- `og-image.png` (1200x630) - Open Graph preview

### Post-Deployment Checklist

- [ ] Verify `https://your-domain.com/.well-known/farcaster.json` is accessible
- [ ] Check all image URLs are valid
- [ ] Test wallet connection in Base app
- [ ] Test payment flow end-to-end
- [ ] Verify user profile displays correctly

## 🎮 How It Works

### User Flow

```
1. User opens app in Base
   ↓
2. Wallet auto-connects (seamless!)
   ↓
3. User selects category → quiz
   ↓
4. Takes 10 questions (10 min time limit)
   ↓
5. Quiz finishes → Payment gate appears
   ↓
6. User pays 0.0000033 ETH on Base
   ↓
7. Results + IQ score revealed
   ↓
8. User can view answer breakdown
```

### Payment Flow

The app uses **on-chain payments** on Base:

1. User completes quiz
2. Payment gate component requests transaction
3. User approves payment in wallet
4. Transaction is submitted to Base
5. App waits for confirmation
6. Results are revealed after confirmation

**Payment Amount**: 0.0000033 ETH (configurable in `lib/wagmi-config.ts`)

## 🛠️ Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Blockchain**: [Wagmi](https://wagmi.sh/) + [Viem](https://viem.sh/)
- **Chain**: Base (Ethereum L2)
- **SDK**: [@farcaster/miniapp-sdk](https://github.com/farcasterxyz/miniapp-sdk)
- **UI Components**: Radix UI + shadcn/ui
- **State Management**: React Context + React Query

## 📝 Development

### Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

### Environment Variables

No environment variables are required by default. If you need to add API keys or other secrets:

1. Create `.env.local` file
2. Add variables:
   ```env
   NEXT_PUBLIC_APP_URL=https://your-domain.com
   # Add other variables as needed
   ```
3. Ensure `.env*` is in `.gitignore` (already included)

## 🔒 Security Considerations

### Public Information

The following are **safe to make public**:

- ✅ Account association signature (public verification)
- ✅ Wallet addresses (public on blockchain)
- ✅ App metadata (public configuration)
- ✅ Quiz questions/answers (client-side)

### Private Information

Never commit:

- ❌ Private keys
- ❌ API keys or secrets
- ❌ Environment variables with sensitive data
- ❌ `.env` files

The `.gitignore` already excludes these files.

### Front-End Limitations

⚠️ **Note**: This app uses client-side gating. For production applications handling real payments, consider:

- Server-side score verification
- Backend payment verification before revealing results
- Signed responses to prevent tampering

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built for [Base](https://base.org/) ecosystem
- Uses [Farcaster](https://www.farcaster.xyz/) Mini App SDK
- Inspired by the Base Mini Apps program

## 📞 Support

- 🐛 **Issues**: [GitHub Issues](https://github.com/yourusername/v0-iq-quiz-base-app/issues)
- 💬 **Discussions**: [GitHub Discussions](https://github.com/yourusername/v0-iq-quiz-base-app/discussions)
- 📖 **Documentation**: [Base Docs](https://docs.base.org/docs/mini-apps)

## 🌟 Features in Detail

### Auto Wallet Connection

When users open the app in Base, their wallet automatically connects - no manual steps required! This is handled by `components/wallet-auto-connect.tsx` and `components/providers.tsx`.

### User Profile Display

The app shows user information in the top-right corner:
- **Farcaster users**: Avatar + username
- **Wallet-only users**: Truncated wallet address (e.g., `0x1234...5678`)

This is handled by `components/user-profile.tsx` and `components/app-header.tsx`.

### Safe Area Support

The app respects device safe areas (notches, home indicators) using Farcaster SDK's `safeAreaInsets`. All screens automatically adjust padding to avoid UI overlap.

### Payment Gating

After completing a quiz, users must pay a small amount (0.0000033 ETH) to view their results. This creates a small monetization opportunity while keeping the payment barrier low.

### Multiple Categories

The app supports multiple quiz categories, each with multiple quizzes. Easily extend by adding new categories in `lib/quiz-data.ts` (see [QUIZ_GUIDE.md](./QUIZ_GUIDE.md)).

---

**Made with ❤️ for the Base ecosystem**
