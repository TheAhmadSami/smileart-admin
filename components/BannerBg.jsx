import React from "react";

//styles
import styles from "@sa/styles/components/BannerBg.module.scss";

const BannerBg = ({ title, subtitle, backgroundImage }) => {
  return (
    <div className={styles.banner} style={{ backgroundImage: `url('${backgroundImage}')`}}>
      <div className={styles.info}>
        <h1>{title}</h1>
        <h4>{subtitle}</h4>
      </div>
    </div>
  );
};

export default BannerBg;
