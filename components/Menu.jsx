import React from "react";
import { useRouter } from "next/router";

//components
import { WorkTimeCard, MenuItem } from "@sa/components";

import assets from "@sa/assets";

//styles
import styles from "@sa/styles/components/Menu.module.scss";
import Link from "next/link";
import Image from "next/image";

const Menu = ({ mini }) => {
  const router = useRouter();

  const menuItems = [
    {
      label: "الخدمات",
      route: "/",
      name: "/",
      icon: "fal fa-hand-holding-medical",
    },
    {
      label: "المقالات",
      route: "articles",
      name: "/articles",
      icon: "fal fa-file",
    },
    {
      label: "فريق العمل",
      route: "team",
      name: "/team",
      icon: "fal fa-user-md",
    },
    {
      label: "ألبومات الصور",
      route: "albums",
      name: "/albums",
      icon: "fal fa-images",
    },
    {
      label: "آراء العملاء (فيسبوك)",
      route: "reviews-facebook",
      name: "/reviews-facebook",
      icon: "fal fa-images",
    },
    {
      label: "آراء العملاء (جوجل)",
      route: "reviews-google",
      name: "/reviews-google",
      icon: "fal fa-images",
    },
    {
      label: "أخرى",
      route: "configs",
      name: "/configs",
      icon: "fal fa-cog",
    },
  ];

  return (
    <div id={styles.menu}>
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
            label={menuItem.label}
            icon={menuItem.icon}
            active={router.pathname == menuItem.name ? true : false}
            mini={mini}
          />
        ))}
      </ul>
    </div>
  );
};

export default Menu;
