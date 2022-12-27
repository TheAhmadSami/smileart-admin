
import { appWithTranslation } from "next-i18next";
import MainLayout from "@sa/layouts/MainLayout";

import '@sa/styles/globals.scss'

const MyApp = ({ Component, pageProps }) => {
  return (
    <MainLayout>
      <Component {...pageProps} />
    </MainLayout>
  );
  
}

export default appWithTranslation(MyApp);
