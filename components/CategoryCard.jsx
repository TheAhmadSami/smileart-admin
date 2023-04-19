import React from "react";
import Image from "next/image";

//styles
import styles from "@sa/styles/components/CategoryCard.module.scss";

const CategoryCard = ({ category, onDelete, onEdit }) => {
  return (
    <div className={styles.categoryCard}>
      <div>
        <p>{category?.nameAr}</p>
        <p>{category?.nameEn}</p>
      </div>
      <div className={styles.controls}>
        <p className={styles.edit} onClick={onEdit}>
          <i className="far fa-pen"></i>
        </p>
        <p className={styles.delete} onClick={onDelete}>
          <i className="far fa-trash"></i>
        </p>
      </div>
    </div>
  );
};

export default CategoryCard;
