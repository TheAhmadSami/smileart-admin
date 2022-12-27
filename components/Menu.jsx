import React from "react";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

//components
import { WorkTimeCard, MenuItem } from "@sa/components";

import assets from "@sa/assets";

//styles
import styles from "@sa/styles/components/Menu.module.scss";
import Link from "next/link";
import Image from "next/image";

const Menu = ({ mini }) => {
  const { t } = useTranslation();
  const router = useRouter();

  const menuItems = [
    {
      label: "services",
      route: `${router.locale}`,
      name: "/",
      icon: "fal fa-hand-holding-medical",
    },
    {
      label: "team",
      route: `${router.locale}/team`,
      name: "/team",
      icon: "fal fa-user-md",
    },
    {
      label: "gallery",
      route: `${router.locale}/gallery`,
      name: "/gallery",
      icon: "fal fa-images",
    },
    {
      label: "clients",
      route: `${router.locale}/clients`,
      name: "/clients",
      icon: "fal fa-users-crown",
    },
    {
      label: "contact_us",
      route: `${router.locale}/contact-us`,
      name: "/contact-us",
      icon: "fal fa-comment-lines",
    },
  ];

  return (
    <div id={styles.menu} className={mini ? styles.mini : null}>
      {mini || (
        <Link href={`${router.locale}`} className={styles.logo}>
          <Image
            src={assets.logo.src}
            width="0"
            height="0"
            sizes="100vw"
            style={{ height: "auto", width: "70%" }}
            alt="logo"
          />
        </Link>
      )}

      <ul className={styles.menuList}>
        {menuItems.map((menuItem, i) => (
          <MenuItem
            key={i}
            route={menuItem.route}
            label={t(menuItem.label)}
            icon={menuItem.icon}
            active={router.pathname == menuItem.name ? true : false}
            mini={mini}
          />
        ))}
      </ul>
      {mini || <WorkTimeCard />}
    </div>
  );
};

export default Menu;

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}
