import "./App.css";
import { useState, useEffect } from 'react'
import Main from "./components/Main";
import { ThemeProvider } from "./components/theme-provider";
import supabase from "./supabaseClient";
import Auth from "./components/auth/authcomponent";

function App() {
  const [session, setSession] = useState(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])
  
  return (
    <>
      <ThemeProvider defaultTheme="dark">
      {!session ? <Auth /> : <Main key={session.user.id} session={session} />}
      </ThemeProvider>
    </>
  );
}

export default App;
