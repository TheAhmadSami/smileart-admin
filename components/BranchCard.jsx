/* eslint-disable @next/next/no-img-element */
import React from "react";
import Image from "next/image";

//styles
import styles from "@sa/styles/components/BranchCard.module.scss";

const BranchCard = ({ branch, onEdit, onDelete }) => {
  return (
    <div className={styles["team-card"]}>
      <iframe
        className={styles?.img}
        src={branch?.mapDisplayLink}
        style={{ border: 0 }}
        allowFullScreen
      />
      <p className={styles?.title}>{branch?.nameAr}</p>
      <p className={styles?.title}>{branch?.nameEn}</p>
      <p className={styles?.job}>{branch?.addressAr}</p>
      <p className={styles?.job}>{branch?.addressEn}</p>
      {branch?.phone1 && <p className={styles?.job}>{branch?.phone1}</p>}
      {branch?.phone2 && <p className={styles?.job}>{branch?.phone2}</p>}
      {branch?.phone3 && <p className={styles?.job}>{branch?.phone3}</p>}
      <p className={styles?.job}>{branch?.fromTime}</p>
      <p className={styles?.job}>{branch?.toTime}</p>
      <p className={styles?.job}>{branch?.fromDay}</p>
      <p className={styles?.job}>{branch?.toDay}</p>

      <div className={styles.editBtn} title="تعديل" onClick={onEdit}>
        <i className="fas fa-pen"></i>
      </div>

      <div className={styles.deleteBtn} title="حذف" onClick={onDelete}>
        <i className="fas fa-trash-alt"></i>
      </div>
    </div>
  );
};

export default BranchCard;
