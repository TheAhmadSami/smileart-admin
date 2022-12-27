import React from "react";

//styles
import styles from "@sa/styles/components/TextInput.module.scss";

const TextInput = ({ label, placeholder }) => {
  return (
    <div className={styles["text-input"]}>
      <div className={styles["label"]}>{label}</div>
      <input
        className={styles["input"]}
        type="text"
        placeholder={placeholder}
      />
    </div>
  );
};

export default TextInput;
