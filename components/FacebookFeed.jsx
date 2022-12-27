import React from "react";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { FacebookProvider, Page } from 'react-facebook';



//styles
import styles from "@sa/styles/components/FacebookFeed.module.scss";

const FacebookFeed = () => {
  const { t } = useTranslation();
  return (
    <div id={styles.facebookFeed}>
      <div className={styles.row}>
        <div className={styles.row2}>
          <i className="fab fa-facebook"></i>
          <h1 className={styles.title}>{t("facebookfeed")}</h1>
        </div>
      </div>
      <FacebookProvider appId="843984503317267">
        <Page href="https://www.facebook.com/SmileArtDrmagdy" tabs="timeline" />
      </FacebookProvider>
    </div>
  );
};

export default FacebookFeed;
