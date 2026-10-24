import { useEffect, useRef, useState } from 'react';
import { authService, isAuthConfigured } from '../services/authService';
import { AuthContext } from './authContextValue';

export function AuthProvider({ children }) {
  const sessionVersion = useRef(0);
  const [user, setUser] = useState(null);
  const [challenge, setChallenge] = useState(null);
  const [phone, setPhone] = useState('');
  const [sessionStatus, setSessionStatus] = useState(
    isAuthConfigured ? 'loading' : 'guest',
  );

  useEffect(() => {
    if (!isAuthConfigured) return;
    let active = true;
    const version = sessionVersion.current;
    authService
      .session()
      .then((nextUser) => {
        if (active && version === sessionVersion.current) {
          setUser(nextUser);
          setSessionStatus(nextUser ? 'authenticated' : 'guest');
        }
      })
      .catch(() => {
        if (active && version === sessionVersion.current)
          setSessionStatus('guest');
      });
    return () => {
      active = false;
    };
  }, []);

  function acceptUser(nextUser) {
    sessionVersion.current += 1;
    setUser(nextUser);
    setSessionStatus('authenticated');
    setChallenge(null);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        acceptUser,
        challenge,
        setChallenge,
        phone,
        setPhone,
        sessionStatus,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
