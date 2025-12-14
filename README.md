# IQ Quiz Contest - Farcaster Mini App

A fun 10-question IQ-style quiz built as a Farcaster Mini App with on-chain payment gating on Base.

## Features

- 🧠 10 logic/pattern recognition questions
- ⏱️ 10-minute time limit
- 💎 Payment gating: 0.0000033 ETH on Base to reveal score
- 🔗 Full Farcaster Mini App compatibility
- 👛 Farcaster wallet integration via Wagmi

---

## Core Architecture

### 1. Manifest Metadata (`public/.well-known/farcaster.json`)

The manifest file tells Farcaster clients about your Mini App:

```json
{
  "accountAssociation": {
    "header": "...",      // Base64 encoded header with your FID
    "payload": "...",     // Base64 encoded payload with your domain
    "signature": "..."    // Signed message proving domain ownership
  },
  "frame": {
    "version": "1",
    "name": "IQ Quiz Contest",
    "iconUrl": "https://your-domain.com/icon.png",
    "homeUrl": "https://your-domain.com",
    "imageUrl": "https://your-domain.com/og-image.png",
    "buttonTitle": "Take IQ Quiz"
  }
}
```

**Important**: The `domain` in the payload MUST match your deployed domain exactly.

### 2. SDK Initialization (`lib/farcaster-sdk.ts`)

The Farcaster SDK must call `ready()` to signal the app is loaded:

```typescript
import sdk from "@farcaster/miniapp-sdk"

export async function initializeFarcasterSDK(): Promise<void> {
  await sdk.actions.ready()
  // App is now ready inside Farcaster client
}
```

This is called in `app/page.tsx` on component mount.

### 3. Wallet Connector Configuration (`lib/wagmi-config.ts`)

Wagmi is configured with:
- **Base chain** for transactions
- **Farcaster Mini App SDK's ethereum provider** via injected connector

```typescript
import { injected } from "wagmi"
import { base } from "wagmi/chains"
import sdk from "@farcaster/miniapp-sdk"

export const wagmiConfig = createConfig({
  chains: [base],
  connectors: [
    injected({
      target: {
        id: "farcasterFrame",
        name: "Farcaster",
        provider: () => sdk.wallet.ethProvider,
      },
    }),
  ],
  // ...
})
```

### 4. Payment Flow (`components/payment-gate.tsx`)

The payment gate component handles:

1. **Wallet Connection**: Uses Farcaster's injected wallet
2. **Transaction Request**: Sends 0.0000033 ETH to configured address
3. **Confirmation Wait**: Uses `useWaitForTransactionReceipt` hook
4. **Score Reveal**: Only after transaction confirms

```typescript
// Payment states
type PaymentStatus =
  | "idle"           // Initial state
  | "connecting"     // Wallet connecting
  | "connected"      // Ready to pay
  | "requesting"     // Awaiting user approval
  | "pending"        // Transaction submitted
  | "confirmed"      // Payment successful
  | "rejected"       // User rejected or error
```

### 5. Quiz Flow with Payment Gating

```
Welcome → Quiz → Finish → Payment Gate → Results
                              ↓
                         (payment fails)
                              ↓
                     Back to Welcome
```

---

## Configuration

### Update Recipient Address

Edit `lib/wagmi-config.ts`:

```typescript
export const PAYMENT_CONFIG = {
  recipientAddress: "0xYOUR_WALLET_ADDRESS_HERE" as `0x${string}`,
  paymentAmountWei: BigInt(3300000000000), // 0.0000033 ETH
  chainId: base.id,
}
```

### Update Meta Tags

Edit `app/layout.tsx` to update the frame meta tags with your domain:

```typescript
other: {
  "fc:frame:image": "https://your-domain.com/og-image.png",
  "fc:frame:button:1:target": "https://your-domain.com",
}
```

---

## Deployment Instructions

### 1. Create Account Association

You need to create a signed account association proving you own the domain:

```bash
# Use Farcaster's tooling or manually create:
# 1. Create header: { fid: YOUR_FID, type: "custody", key: "YOUR_CUSTODY_ADDRESS" }
# 2. Create payload: { domain: "your-domain.com" }
# 3. Sign the payload with your custody key
# 4. Base64 encode all parts
```

### 2. Prepare Assets

Create and place these files in `/public`:
- `icon.png` - 200x200 app icon
- `og-image.png` - 1200x630 Open Graph image
- `splash.png` - Splash screen image

### 3. Update Manifest

Edit `public/.well-known/farcaster.json`:
- Replace all `your-domain.com` with your actual domain
- Add your account association signature

### 4. Deploy to Vercel (or similar)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

### 5. Verify Domain Alignment

After deployment, verify:
1. `https://your-domain.com/.well-known/farcaster.json` is accessible
2. The domain in the manifest matches exactly
3. All image URLs are valid

### 6. Register with Farcaster

Submit your Mini App to Farcaster's directory or share the frame URL directly.

---

## Testing

### Local Development

```bash
npm run dev
```

The app works in browser but wallet features require Farcaster context.

### Testing in Farcaster

1. Deploy to a public URL
2. Share the URL in Warpcast
3. The Mini App should render inline
4. Test the full payment flow

### Frame Debugger

Use [Farcaster Frame Debugger](https://warpcast.com/~/developers/frames) to validate your frame metadata.

---

## Limitations & Considerations

### Front-end Gating vs True Access Control

⚠️ **Important**: This implementation uses front-end gating only. The score calculation happens client-side, meaning a determined user could:
- Inspect the code to find answers
- Bypass the payment check

For true access control, implement:
- Server-side score calculation
- Payment verification on backend before returning results
- Signed score responses

### Insufficient Funds

If user lacks ETH on Base:
- Transaction will fail with "insufficient funds" error
- UX shows "Payment Failed" with retry option
- Consider adding a "Get ETH on Base" link

### Gas Estimation

The payment amount (0.0000033 ETH) is very small, but gas fees may exceed the payment itself. Consider:
- Informing users about gas costs
- Using a higher payment amount to make gas proportionally smaller

### Network Delays

Base transaction confirmation typically takes:
- ~2 seconds for inclusion
- May be longer during congestion

The UI shows a loading state during confirmation.

---

## File Structure

```
├── app/
│   ├── globals.css         # Tailwind styles
│   ├── layout.tsx          # Root layout with providers
│   └── page.tsx            # Main quiz page with payment flow
├── components/
│   ├── providers.tsx       # Wagmi + React Query providers
│   ├── payment-gate.tsx    # Payment gating component
│   ├── welcome-screen.tsx  # Quiz intro (mentions payment)
│   ├── quiz-screen.tsx     # Quiz questions
│   ├── results-screen.tsx  # Score display
│   ├── answer-breakdown-screen.tsx
│   └── ui/
│       └── button.tsx      # shadcn/ui button
├── lib/
│   ├── farcaster-sdk.ts    # SDK initialization
│   ├── wagmi-config.ts     # Wagmi + payment config
│   ├── quiz-data.ts        # Quiz questions
│   └── utils.ts            # Utilities
└── public/
    └── .well-known/
        └── farcaster.json  # Mini App manifest
```

---

## Dependencies

```json
{
  "@farcaster/miniapp-sdk": "latest",
  "wagmi": "^2.x",
  "viem": "^2.x",
  "@tanstack/react-query": "^5.x"
}
```

---

## License

MIT
"# v0-iq-quiz-base-app" 
