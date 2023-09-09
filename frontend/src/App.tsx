import { createContext, useEffect, useState } from "react";
import "./App.css";
import Main from "./components/Main";
import Auth from "./components/auth/authcomponent";
import { ThemeProvider } from "./components/theme-provider";
import supabase from "./supabaseClient";
export const AuthContext = createContext({});
//@ts-ignore
function App() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      //@ts-ignore
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      //@ts-ignore
      setSession(session);
    });
  }, []);

  return (
    <>
      <ThemeProvider defaultTheme="dark">
        {!session ? (
          <Auth />
        ) : (
          <AuthContext.Provider value={session}>
            <Main //@ts-ignore
            key={session.user.id} session={session} />
          </AuthContext.Provider>
        )}
      </ThemeProvider>
    </>
  );
}

export default App;
