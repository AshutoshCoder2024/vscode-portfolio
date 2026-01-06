# vscode-portfolio
[![Open is Visual Studio Code](https://open.vscode.dev/badges/open-in-vscode.svg)](https://open.vscode.dev/AshutoshCoder2024/vscode-portfolio)

A Visual Studio Code themed developer portfolio website built with Next.js and deployed on Vercel.

![vscode-portfolio banner](https://imgur.com/JXJ9mpO.gif)

## Features Roadmap

- [ ] Themes and customizations
  - [x] GitHub Dark (default)
  - [ ] One Dark Pro
  - [x] Dracula
  - [x] Ayu
  - [x] Nord
- [ ] Interactive custom terminal

For other features and themes suggestions, please open an issue.

## Environment Variables

### Local Development

Create a `.env.local` file in the project root with:

```env
NEXT_PUBLIC_GITHUB_TOKEN=your_github_token_here
NEXT_PUBLIC_GITHUB_USERNAME=your_username
```

**To get a GitHub token:**
1. Go to [GitHub Settings → Tokens](https://github.com/settings/tokens)
2. Click "Generate new token (classic)"
3. Give it a name (e.g., "Portfolio Token")
4. Select scope: **public_repo**
5. Click "Generate token" and copy it
6. Add it to your `.env.local` file

### Deployment (Vercel)

When deploying to Vercel, you need to add environment variables in the Vercel dashboard:

1. Go to your project on [Vercel Dashboard](https://vercel.com/dashboard)
2. Click on your project
3. Go to **Settings** → **Environment Variables**
4. Add the following variables:
   - `NEXT_PUBLIC_GITHUB_TOKEN` = `your_github_token_here`
   - `NEXT_PUBLIC_GITHUB_USERNAME` = `your_username` (optional)
5. Select the environments (Production, Preview, Development)
6. Click **Save**
7. **Redeploy** your application for the changes to take effect

**Important:** 
- Never commit your `.env.local` file to git (it's already in `.gitignore`)
- Environment variables in Vercel are secure and encrypted
- After adding variables, you must redeploy for them to take effect

## Running Development Server

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

All VSCode related components can be found in the `components` folder. To change the content of the portfolio, check out the `pages` folder. To add or remove pages, modify `components/Sidebar.jsx` and `components/Tabsbar.jsx`.

## Next.js Resources

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/)

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

### Quick Deploy Steps:

1. Push your code to GitHub
2. Import your repository on [Vercel](https://vercel.com/new)
3. **Add Environment Variables** (see Environment Variables section above)
4. Click Deploy
5. Your site will be live! 🎉

**Note:** Make sure to add `NEXT_PUBLIC_GITHUB_TOKEN` in Vercel's environment variables for the GitHub page to work properly.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
