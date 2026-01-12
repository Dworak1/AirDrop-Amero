---
description: How to deploy the Next.js application to Vercel
---

# Deploying to Vercel

This workflow outlines the steps to deploy your Next.js application to Vercel using the Vercel CLI.

## Prerequisites

-   A Vercel account (https://vercel.com/signup)
-   Node.js installed (which you already have)

## Steps

1.  **Install Vercel CLI**
    Run the following command to install the Vercel CLI globally:
    ```bash
    npm i -g vercel
    ```

2.  **Login to Vercel**
    Authenticate your terminal with your Vercel account:
    ```bash
    vercel login
    ```
    Follow the prompts to log in via your browser.

3.  **Deploy**
    Run the deployment command in your project root:
    ```bash
    vercel
    ```
    -   **Set up and deploy?** [Y/n]: **y**
    -   **Which scope do you want to deploy to?**: Select your account.
    -   **Link to existing project?** [y/N]: **n** (unless you already created one on the dashboard)
    -   **What’s your project’s name?**: Press Enter or type a name (e.g., `airdrop-crypto`).
    -   **In which directory is your code located?**: `./` (Press Enter)
    -   **Want to modify these settings?** [y/N]: **n** (Use default Next.js settings)

4.  **Production Deployment**
    After testing the preview deployment, deploy to production:
    ```bash
    vercel --prod
    ```

## Environment Variables
If your app uses environment variables (like private keys or API URLs), you need to add them in the Vercel Dashboard under **Settings > Environment Variables** or via CLI:
```bash
vercel env add
```
