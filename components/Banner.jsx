import React from "react";
import Image from "next/image";

//styles
import styles from "@sa/styles/components/Banner.module.scss";

const BannerBg = ({ title, subtitle, image }) => {
  return (
    <div className={styles.banner}>
      <div className={styles.info}>
        <h1>{title}</h1>
        <h4>{subtitle}</h4>
      </div>
      <div className={styles.imageContainer}>
        <img src={image.src} className={styles.image} alt="smile-art" />
      </div>
    </div>
  );
};

export default BannerBg;
