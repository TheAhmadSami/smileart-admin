import React, { useEffect, useState } from "react";
import Image from "next/image";
import { get } from "@sa/utils/axios";

//translation
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

//components
import { ModalImage, SectionTitle } from "@sa/components";


//styles
import styles from "@sa/styles/pages/Gallery.module.scss";

const Gallery = () => {
  const { t } = useTranslation();
  const [gallery, setGallery] = useState([]);

  const loadGallery = async () => {
    get("/gallery").then((res) => {
      setGallery(res.data);
    });
  };

  useEffect(() => {
    loadGallery();
  }, []);

  return (
    <div id={styles["gallery"]} className="__page">
      <SectionTitle
        title={t("gallery")}
        actionText="اضافة صورة/فيديو"
        onClick={() => alert("server error")}
      />

      <div className={styles.content}>
        {gallery.length > 0 &&
          gallery?.map((image, index) => {
            return (
              <Image
                key={index}
                src={image.Image}
                className={styles["img"]}
                alt="r"
                onClick={() => getImage(image.id)}
                width={250}
                height={250}
              />
            );
          })}
      </div>
    </div>
  );
};

export default Gallery;

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}
