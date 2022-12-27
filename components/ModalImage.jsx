/* eslint-disable @next/next/no-img-element */
import React from "react";

//styles
import styles from "@sa/styles/components/ModalImage.module.scss";

function ModalImage({ image, name, onClick }) {
  return (
    <div id={styles.ModalImage} onClick={onClick}>
      <img
        src={image}
        alt={name}
        style={{ width: '70%' }}
      />
    </div>
  );
}

export default ModalImage;
