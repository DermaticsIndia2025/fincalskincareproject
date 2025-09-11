import { ResourcesConfig } from 'aws-amplify';

// Configure Amplify Auth (Cognito) via environment variables provided at build time.
// Set these in your local .env and in AWS Amplify environment variables.
// VITE_AMPLIFY_REGION, VITE_USER_POOL_ID, VITE_USER_POOL_CLIENT_ID

const amplifyConfig: ResourcesConfig = {
  Auth: {
    Cognito: {
      userPoolId: (import.meta.env.VITE_USER_POOL_ID as string)?.trim(),
      userPoolClientId: (import.meta.env.VITE_USER_POOL_CLIENT_ID as string)?.trim(),
      identityPoolId: undefined,
      loginWith: {
        username: false,
        email: true,
        phone: false,
      },
      signUpVerificationMethod: 'code',
      userAttributes: {
        email: {
          required: true,
        },
        name: {
          required: false,
        },
      },
      allowGuestAccess: false,
      region: (import.meta.env.VITE_AMPLIFY_REGION as string)?.trim(),
    },
  },
};

export default amplifyConfig;


