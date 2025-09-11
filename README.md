<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/1DhKSvg0Tc2V57vqDZO8sCUQbsjpBei27

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

## Auth & User Storage Setup

This app uses AWS Amplify (Cognito) for signup/login and calls a backend API to store user records in MongoDB.

### Environment variables

Create a `.env` with:

```
VITE_AMPLIFY_REGION=your-aws-region
VITE_USER_POOL_ID=your-cognito-user-pool-id
VITE_USER_POOL_CLIENT_ID=your-cognito-app-client-id
VITE_USER_API_BASE_URL=https://your-api.example.com
```

Provide the same variables in AWS Amplify Console → App settings → Environment variables.

### Local dev

```
npm run dev
```

If `VITE_USER_API_BASE_URL` is not set, user upsert is skipped locally.

### Deploy on AWS Amplify

The included `amplify.yml` builds the Vite app and serves the `dist/` artifacts. Configure env vars and connect your repo.

## Backend (MongoDB)

A minimal Express server is included under `server/` to store users in MongoDB.

### Setup

1. Go to `server/` and install deps:
```
cd server
npm i
```
2. Create `.env` in `server/` with:
```
MONGODB_URI=your-mongodb-connection-string
PORT=8080
```
3. Run locally:
```
npm run dev
```
4. Set `VITE_USER_API_BASE_URL` in the frontend `.env` to point to this server URL (e.g., `http://localhost:8080`).

You can deploy this server to any Node hosting (Elastic Beanstalk, ECS, Lambda + API Gateway with an adapter, or services like Render/Heroku). Then set the deployed URL into `VITE_USER_API_BASE_URL` for production.
