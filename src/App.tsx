import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Home from "./pages/home/Home";
import CoinPage from "./pages/coinPage/CoinPage";
import { Routes, Route } from "react-router-dom";
import { createContext, useState } from "react";


export interface IThemeContext {
  theme: string;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<IThemeContext | null>(null);

function App() {

  const [theme, setTheme] = useState<string>("dark");

  const toggleTheme = (): void => {
    setTheme((currTheme) => (currTheme === "light" ? "dark" : "light"))
  };


  return (
    <ThemeContext.Provider value={{theme, toggleTheme}}>
      <div className="app" id={theme}>
        <Header theme={theme} toggleTheme={toggleTheme}/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/coin/:coinId" element={<CoinPage />} />
        </Routes>
        <Footer />
      </div>
    </ThemeContext.Provider>
  )
}

export default App
