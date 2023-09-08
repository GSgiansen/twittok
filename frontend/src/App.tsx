import "./App.css";
import Main from "./components/Main";
import { ThemeProvider } from "./components/theme-provider";

function App() {
  return (
    <>
      <ThemeProvider defaultTheme="dark">
        <Main />
      </ThemeProvider>
    </>
  );
}

export default App;
