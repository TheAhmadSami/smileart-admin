import React, { useEffect, useState } from "react";
import { Button, Modal, TextField } from "@mui/material";
import { get, post, remove } from "@sa/utils/axios";

//components
import { SectionTitle, CustomCard } from "@sa/components";

//styles
import styles from "@sa/styles/pages/Services.module.scss";
import assets from "@sa/assets";
import Compress from "compress.js";

const Service = () => {
  const [services, setServices] = useState([]);
  const [modalStatus, setModalStatus] = useState(false);
  const [titleEn, setTitleEn] = useState("");
  const [subtitleEn, setSubtitleEn] = useState("");
  const [titleAr, setTitleAr] = useState("");
  const [subtitleAr, setSubtitleAr] = useState("");
  const [image, setImage] = useState("");
  const [link, setLink] = useState("");
  // const [compressedFile, setCompressedFile] = useState(null);

  const loadServices = async () => {
    get("/services").then((res) => {
      if (res?.data) setServices(res.data);
    });
  };

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setImage(event.target.files[0]);
      // resizeImage(event.target.files[0]);
    }
  };

  // const resizeImage = async (file) => {
  //   const resizedImage = await Compress.compress([file], {
  //     size: 1, // the max size in MB, defaults to 2MB
  //     quality: .7, // the quality of the image, max is 1,
  //     maxWidth: 500, // the max width of the output image, defaults to 1920px
  //     maxHeight: 500, // the max height of the output image, defaults to 1920px
  //     resize: true, // defaults to true, set false if you do not want to resize the image width and height
  //   });
  //   const img = resizedImage[0];
  //   const base64str = img.data;
  //   const imgExt = img.ext;
  //   const resizedFiile = Compress.convertBase64ToFile(base64str, imgExt);
  //   setCompressedFile(resizedFiile);
  // };

  const addToService = () => {
    let data = new FormData();
    data.append("titleEn", titleEn);
    data.append("subtitleEn", subtitleEn);
    data.append("titleAr", titleAr);
    data.append("subtitleAr", subtitleAr);
    data.append("image", image);

    post("/services", data).then((res) => {
      closeModal();
      loadServices();
    });
  };

  const closeModal = () => {
    setTitleEn("");
    setSubtitleEn("");
    setTitleAr("");
    setSubtitleAr("");
    setImage(null);
    setModalStatus(false);
  };

  useEffect(() => {
    loadServices();
  }, []);

  const deleteService = (serviceId) => {
    remove(`/services/${serviceId}`).then((res) => {
      loadServices();
    });
  }

  return (
    <div id={styles.services} className="__page">
      <SectionTitle
        title="الخدمات"
        actionText="إضافة خدمة"
        onClick={() => setModalStatus(true)}
      />

      <div className={styles.servicesDetails}>
        {services.length > 0 &&
          services?.map((service, index) => {
            return <CustomCard key={index} info={service} onDelete={() => deleteService(service?.id)} />;
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
              value={titleEn}
              onChange={(e) => setTitleEn(e.target.value)}
              label="العنوان (إنجليزي)"
              variant="outlined"
              className="textInput ltr"
            />
            <TextField
              id="outlined-basic"
              value={subtitleEn}
              multiline
              rows={4}
              onChange={(e) => setSubtitleEn(e.target.value)}
              label="الوصف (إنجليزي)"
              variant="outlined"
              className="textInput ltr"
            />
            <br />
            <TextField
              id="outlined-basic"
              value={titleAr}
              onChange={(e) => setTitleAr(e.target.value)}
              label="العنوان (عربي)"
              variant="outlined"
              className="textInput"
            />
            <TextField
              id="outlined-basic"
              value={subtitleAr}
              multiline
              rows={4}
              onChange={(e) => setSubtitleAr(e.target.value)}
              label="الوصف (عربي)"
              variant="outlined"
              className="textInput"
            />
            <br />
            <TextField
              id="outlined-basic"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              label="رابط الحالات"
              variant="outlined"
              className="textInput"
            />
          </div>

          <div className="controls">
            <Button variant="contained" onClick={addToService}>
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

export default Service;
