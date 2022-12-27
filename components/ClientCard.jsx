import React from "react";
import Image from "next/image";

//styles
import styles from "@sa/styles/components/ClientCard.module.scss";

const ClientCard = ({ title, description, image }) => {
  return (
    <div className={styles["review-card"]}>
      <div className={styles["content"]}>
        <div className={styles["client-name"]}>{title}</div>
        <div className={styles["client-review"]}>{description}</div>
      </div>
      <Image src={image} alt="hi" className={styles["img"]} width='170' height='170'/>
    </div>
  );
};

export default ClientCard;
