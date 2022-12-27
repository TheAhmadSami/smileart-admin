/* eslint-disable @next/next/no-title-in-document-head */
import { Html, Head, Main, NextScript } from "next/document";

const Document = (props) => {

  return (
    <Html dir={props.locale === "ar" ? "rtl" : "ltr"} lang={props.locale}>
      <Head>
        <title>Smile Art</title>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

export const getInitialProps = async (ctx) => {
  const initialProps = await Document.getInitialProps(ctx);
  return { ...initialProps, locale: ctx?.locale || "ar" };
};

export default Document;
