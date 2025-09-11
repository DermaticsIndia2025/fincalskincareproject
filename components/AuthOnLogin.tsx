import React, { useEffect } from 'react';
import { getCurrentUser } from 'aws-amplify/auth';
import { upsertUser } from '../services/userApi';

const AuthOnLogin: React.FC = () => {
  useEffect(() => {
    let isMounted = true;
    (async () => {
      try {
        const user = await getCurrentUser();
        if (!isMounted) return;
        const email = (user?.signInDetails as any)?.loginId as string | undefined;
        await upsertUser({ userId: user.userId, email });
      } catch {
        // Ignore silently to not block UI
      }
    })();
    return () => {
      isMounted = false;
    };
  }, []);
  return null;
};

export default AuthOnLogin;



