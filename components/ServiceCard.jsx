import React from "react";
import Image from "next/image";

//styles
import styles from "@sa/styles/components/CategoryCard.module.scss";

const ServiceCard = ({ service }) => {
  return (
    <div className={styles.categoryCard}>
      <div>
        <p>{service?.titleAr}</p>
        <p>{service?.titleEn}</p>
      </div>
    </div>
  );
};

export default ServiceCard;
