import React from "react";

//styles
import styles from "@sa/styles/components/SectionTitle.module.scss";

const SectionTitle = ({ title, actionText, onClick }) => {
  return (
    <div className={styles.sectionTitleContainer}>
      <h1 className={styles.sectionTitle}>{title}</h1>
      {onClick && (
        <div className={styles.actionContainer}>
          <i className="far fa-plus-circle"></i>
          <p onClick={onClick}>{actionText}</p>
        </div>
      )}
    </div>
  );
};

export default SectionTitle;
