import React, { Suspense } from "react";
import { ThemeProvider } from "styled-components";

import Routing from "./routing/routing";
import { ThemesType } from "./shared/enums/themes-type";
import { themes } from "./styles/themes";
import { useLocalStorage } from "./shared/hooks/local-storage";
import { StorageSessionType } from "./shared/enums/storage";

function App() {
  const [theme, setTheme] = useLocalStorage(
    StorageSessionType.Theme,
    ThemesType.Light
  );

  const toggleTheme = () => {
    setTheme(ThemesType.Light);
  };
  return (
    <ThemeProvider theme={themes[theme]}>
      <Suspense fallback="loading">
        <Routing toggleTheme={toggleTheme}></Routing>
      </Suspense>
    </ThemeProvider>
  );
}

export default App;
