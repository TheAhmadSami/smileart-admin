/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { Button, Modal, TextField } from "@mui/material";
import SimpleImageSlider from "react-simple-image-slider";
import { get, post } from "@sa/utils/axios";

//components
import { Banner, SectionTitle, CustomCard } from "@sa/components";

//styles
import styles from "@sa/styles/pages/Gallery.module.scss";


const Gallery = () => {
  const { t } = useTranslation();
  const [gallery, setGallery] = useState([]);
  const [modalStatus, setModalStatus] = useState(false);
  const [imageModal, setImageModal] = useState(false);
  const [image, setImage] = useState("");

  const loadGallery = async () => {
    get("/gallery").then((res) => {
      setGallery(res.data);
    });
  };

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setImage(event.target.files[0]);
    }
  };

  const addToGallery = () => {
    let data = new FormData();
    data.append("image", image);

    post("/gallery", data).then((res) => {
      closeModal();
      loadGallery();
    });
  };

  const closeModal = () => {
    setImage(null);
    setModalStatus(false);
  };

  useEffect(() => {
    loadGallery();
  }, []);

  return (
    <div id={styles.gallery} className="__page">
      <SectionTitle
        title={t("gallery")}
        actionText="اضافة صورة/فيديو"
        onClick={() => setModalStatus(true)}
      />

      <div className={styles.content}>
        {gallery.length > 0 &&
          gallery?.map((item, index) => {
            return (
              <img
                key={index}
                src={item?.url}
                className={styles.img}
                alt="Smile Art"
                onClick={() => setImageModal(true)}
              />
            );
          })}
      </div>

      <Modal
        open={imageModal}
        onClose={() => setImageModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="imageSliderContainer">
          <SimpleImageSlider
            width={1920 / 2.5}
            height={1080 / 2.5}
            images={gallery}
            showBullets={true}
            showNavs={true}
          />
        </div>
      </Modal>

      <Modal
        open={modalStatus}
        onClose={() => setModalStatus(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="modal">
          <div className={styles.addGalleryContainer}>
            <div
              className={styles.userImage}
              style={{
                backgroundImage: `url(${image && URL.createObjectURL(image)})`,
              }}
            >
              <input type="file" onChange={onImageChange} />
              {!image && <i className="fas fa-camera"></i>}
            </div>
          </div>

          <div className="controls">
            <Button variant="contained" onClick={addToGallery}>
              اضافة
            </Button>
            <Button variant="outlined" onClick={closeModal}>
              الغاء
            </Button>
          </div>
        </div>
      </Modal>
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
