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
    <div className='flex flex-col justify-center h-screen'>
      <h1 className="mb-4 text-2xl font-bold">Log in to TikTok</h1>
      {error && <p className="text-red-500">{error}</p>}
      <div className="mb-4">
        <label className="block mb-2 text-left font-medium">Username:</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full px-3 py-2 border rounded bg-white text-black"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2 text-left font-medium">Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-3 py-2 border rounded bg-white text-black"
        />
      </div>
      
      <div className="mb-4">
        <label className="block mb-2 text-left font-medium">Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-3 py-2 border rounded bg-white text-black"
        />
      </div>
      <div className="flex mt-4">
        <button 
          onClick={handleLogin}
          className="w-1/2 mr-2 px-3 py-2 bg-tiktok-red text-white rounded-3xl font-medium"
        >
          Log in
        </button>
        <button 
          onClick={handleSignup}
          className="w-1/2 px-3 py-2 bg-tiktok-red text-white rounded-3xl font-medium"
        >
          Sign up
        </button>
      </div>
    </div>
  );
}

export default AuthComponent;
