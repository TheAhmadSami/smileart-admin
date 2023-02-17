import { createTheme, ThemeProvider } from "@mui/material";
import MainLayout from "@sa/layouts/MainLayout";

import "@sa/styles/globals.scss";

const App = ({ Component, pageProps }) => {

  const rtlTheme = createTheme({ direction: "rtl" });

  return (
    <ThemeProvider theme={rtlTheme}>
      <MainLayout>
        <Component {...pageProps} />
      </MainLayout>
    </ThemeProvider>
  );
};

export default App;
