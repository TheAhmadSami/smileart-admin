import React from "react";

//styles
import styles from "@sa/styles/components/SocialMedia.module.scss";
import Link from "next/link";

const SocialMedia = ({ float }) => {
  const socialLinks = [
    {
      icon: "fab fa-facebook-f",
      bgColor: "linear-gradient(0deg, #0062E0 3.86%, #19AFFF 100.94%)",
      href: "https://facebook.com/",
    },
    {
      icon: "fab fa-twitter",
      bgColor: "#1C97E2",
      href: "https://twitter.com/",
    },
    {
      icon: "fab fa-instagram",
      bgColor: "linear-gradient(140.6deg, #3B198D -4.9%, #C93F7C 98.08%)",
      href: "https://instagram.com/",
    },
    {
      icon: "fab fa-tiktok",
      bgColor: "#000000",
      href: "https://tiktok.com/",
    },
    {
      icon: "fab fa-youtube",
      bgColor: "#F20000",
      href: "https://youtube.com/",
    },
  ];

  return (
    <div className={`${styles.socialMediaContainer} ${float && styles.float}`}>
      <div className={styles.socialMedia}>
        {socialLinks.map((link, i) => (
          <Link
            href={link.href}
            key={i}
            className={styles.socialIcon}
            style={{ background: link.bgColor }}
            target="_blank"
          >
            <i className={link.icon}></i>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SocialMedia;
