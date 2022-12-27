/* eslint-disable @next/next/no-img-element */
import React from "react";
import Image from "next/image";

//styles
import styles from "@sa/styles/components/CustomCard.module.scss";

const CustomCard = ({ title, description, image }) => {
  return (
    <div className={styles["team-card"]}>
      <img src={image} className={styles["img"]} alt={title} />
      <div className={styles["title"]}>{title}</div>
      <div className={styles["job"]}>{description}</div>
    </div>
  );
};

export default CustomCard;
