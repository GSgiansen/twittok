import React, { useState } from 'react';
import supabase from '@/supabaseClient'; // Import your Supabase client instance here
import { AuthTokenResponse } from '@supabase/supabase-js';

function AuthComponent() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [username, setUsername] = useState<string>('');
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
      const res = await supabase.auth.getSession();
      console.log("uuid is ", res)
      const uuid = res.data.session.user.id;
      const {err} = await supabase.from("profiles").insert({id: uuid, email: email, username: username})
      if (error || err) {
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
        <label>Username</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
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
          onChange={(e) => setPassword(e.target.value)}
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
