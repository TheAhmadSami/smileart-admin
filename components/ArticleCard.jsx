import React from "react";
import Image from "next/image";

//styles
import styles from "@sa/styles/components/ArticleCard.module.scss";

const ArticleCard = ({ article, onClick, onDelete, onEdit }) => {
  return (
    <div className={styles.categoryCard}>
      <div onClick={onClick} style={{ cursor: "pointer" }}>
        <p>{article?.titleAr}</p>
        <p>{article?.titleEn}</p>
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

export default ArticleCard;
