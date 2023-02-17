/* eslint-disable @next/next/no-img-element */
import React from "react";
import Image from "next/image";

//styles
import styles from "@sa/styles/components/CustomCard.module.scss";

const CustomCard = ({ info, onEdit, onDelete }) => {
  return (
    <div className={styles["team-card"]}>
      <img src={info?.image} className={styles["img"]} alt={info?.titleEn} />
      <div className={styles["title"]}>{info?.titleEn}</div>
      <div className={styles["title"]}>{info?.titleAr}</div>
      <div className={styles["job"]}>{info?.subtitleEn}</div>
      <div className={styles["job"]}>{info?.subtitleAr}</div>

      <div className={styles.editBtn} title="تعديل" onClick={onEdit}>
        <i className="fas fa-pen"></i>
      </div>

      <div className={styles.deleteBtn} title="حذف" onClick={onDelete}>
        <i className="fas fa-trash-alt"></i>
      </div>
    </div>
  );
};

export default CustomCard;
