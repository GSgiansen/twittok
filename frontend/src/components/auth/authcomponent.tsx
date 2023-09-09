import React, { useState } from 'react';
import supabase from '@/supabaseClient'; // Import your Supabase client instance here
import { AuthTokenResponse } from '@supabase/supabase-js';

function AuthComponent() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async () => {
    try {
      const { user, error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) {
        setError(error.message);
      } else {
        console.log('Logged in as:', user);
        // You can perform further actions upon successful login
      }
    } catch (error) {
      console.error('Error logging in:', error.message);
    }

  };

  const handleSignup = async () => {
    try {
      const { user, error } = await supabase.auth.signUp({ email, password });
      if (error) {
        setError(error.message);
      } else {
        console.log('Signed up as:', user);
        // You can perform further actions upon successful signup
      }
    } catch (error) {
      console.error('Error signing up:', error.message);
    }
  };

  return (
    <div>
      <h1>Authentication</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}s
        />
      </div>
      <div>
        <button onClick={handleLogin}>Login</button>
        <button onClick={handleSignup}>Signup</button>
      </div>
    </div>
  );
}

export default AuthComponent;
