import React, { useEffect, useState } from "react";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { Button, Modal, TextField } from "@mui/material";
import { get, post } from "@sa/utils/axios";

//components
import { Banner, SectionTitle, CustomCard } from "@sa/components";

//styles
import styles from "@sa/styles/pages/Services.module.scss";
import assets from "@sa/assets";

const Services = () => {
  const { t } = useTranslation();
  const [services, setServices] = useState([]);
  const [modalStatus, setModalStatus] = useState(false);
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [image, setImage] = useState("");

  const loadServices = async () => {
    get("/services").then((res) => {
      setServices(res.data);
    });
  };

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setImage(event.target.files[0]);
    }
  };

  const addToServices = () => {
    let data = new FormData();
    data.append("title", title);
    data.append("subtitle", subtitle);
    data.append("image", image);

    post("/services", data).then((res) => {
      closeModal();
      loadServices();
    });
  };

  const closeModal = () => {
    setTitle("");
    setSubtitle("");
    setImage(null);
    setModalStatus(false);
  };

  useEffect(() => {
    loadServices();
  }, []);

  return (
    <div id={styles.services} className="__page">
      <SectionTitle
        title={t("services")}
        actionText="اضافة عضو"
        onClick={() => setModalStatus(true)}
      />

      <div className={styles.servicesDetails}>
        {services.length > 0 &&
          services?.map((service, index) => {
            return (
              <CustomCard
                key={index}
                image={service?.image}
                title={service?.title}
                description={service?.subtitle}
              />
            );
          })}
      </div>

      <Modal
        open={modalStatus}
        onClose={() => setModalStatus(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="modal">
          <div className={styles.addServiceContainer}>
            <div
              className={styles.userImage}
              style={{
                backgroundImage: `url(${image && URL.createObjectURL(image)})`,
              }}
            >
              <input type="file" onChange={onImageChange} />
              {!image && <i className="fas fa-camera"></i>}
            </div>
            <TextField
              id="outlined-basic"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              label="العنوان"
              variant="outlined"
              className="textInput"
            />
            <TextField
              id="outlined-basic"
              value={subtitle}
              multiline
              rows={4}
              onChange={(e) => setSubtitle(e.target.value)}
              label="الوصف"
              variant="outlined"
              className="textInput"
            />
          </div>

          <div className="controls">
            <Button variant="contained" onClick={addToServices}>
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

export default Services;

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}
