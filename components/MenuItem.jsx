import React from "react";
import Link from "next/link";

//styles
import styles from "@sa/styles/components/MenuItem.module.scss";

const MenuItem = ({ route, label, icon, mini, active }) => {
  return (
    <Link
      href={route}
      className={`${styles.menuItem} ${mini && styles.mini} ${
        active && styles.active
      }`}
    >
      <i className={icon}></i>
      <p>{label}</p>
    </Link>
  );
};

export default MenuItem;
