import React from 'react';
import { Amplify } from 'aws-amplify';
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import amplifyConfig from '../amplifyConfig';
import { CompanyLogo } from './Icons';

Amplify.configure(amplifyConfig);

type AuthGateProps = {
  children: React.ReactNode;
};

const AuthGate: React.FC<AuthGateProps> = ({ children }) => {
  return (
    <div className="w-full h-screen bg-brand-bg">
      <Authenticator
        className="w-full h-full"
        hideSignUp={false}
        components={{
          Header() {
            return (
              <div className="w-full flex flex-col items-center justify-center gap-3 py-3 -mt-2 text-center">
                <CompanyLogo className="h-8 w-auto" />
                <div className="text-center">
                  <h1 className="text-base font-bold text-brand-text-main mb-1">AI Skincare Advisor</h1>
                  <p className="text-xs text-brand-text-muted">Your personalized path to healthier skin</p>
                </div>
              </div>
            );
          },
          Footer() {
            return (
              <div className="py-4 text-xs text-center text-brand-text-muted">
                By continuing you agree to our Terms & Privacy Policy
              </div>
            );
          },
          SignIn: {
            Header() {
              return (
              <div className="text-center py-4">
                <h2 className="text-base font-semibold text-brand-text-main mb-1">Welcome back</h2>
                <p className="text-xs text-brand-text-muted">Sign in to continue your skincare journey</p>
              </div>
              );
            },
          },
          SignUp: {
            Header() {
              return (
              <div className="text-center py-4">
                <h2 className="text-base font-semibold text-brand-text-main mb-1">Create your Dermatics account</h2>
                <p className="text-xs text-brand-text-muted">Start your personalized skincare journey</p>
              </div>
              );
            },
          },
        }}
        loginMechanisms={['email']}
        formFields={{
          signIn: {
            username: {
              label: 'Email address',
              placeholder: 'Enter your email',
            },
          },
          signUp: {
            name: {
              label: 'Full name',
              placeholder: 'Enter your full name',
              isRequired: false,
            },
            email: {
              label: 'Email address',
              placeholder: 'Enter your email',
            },
            password: {
              label: 'Password',
              placeholder: 'Create a strong password',
            },
          },
          forceNewPassword: {
            password: {
              label: 'New password',
              placeholder: 'Enter your new password',
            },
          },
        }}
      >
        {({ user }) => (
          <div className="w-full h-full">{children}</div>
        )}
      </Authenticator>
    </div>
  );
};

export default AuthGate;


