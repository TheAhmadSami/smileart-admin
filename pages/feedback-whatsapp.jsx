/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import { Button, Modal, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import SimpleImageSlider from "react-simple-image-slider";
import { get, post, remove } from "@sa/utils/axios";

//components
import { SectionTitle } from "@sa/components";

//styles
import styles from "@sa/styles/pages/Feedback.module.scss";

const Feedback = () => {
  const [feedback, setFeedback] = useState([]);
  const [modalStatus, setModalStatus] = useState(false);
  const [imageModal, setImageModal] = useState(false);
  const [image, setImage] = useState("");

  const loadFeedback = async () => {
    get("/feedback-whatsapp").then((res) => {
      setFeedback(res.data);
    });
  };

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setImage(event.target.files[0]);
    }
  };

  const addToFeedback = () => {
    let data = new FormData();
    data.append("image", image);

    post("/feedback-whatsapp", data).then((res) => {
      closeModal();
      loadFeedback();
    });
  };

  const closeModal = () => {
    setImage(null);
    setModalStatus(false);
  };

  const deleteImage = (imageId) => {
    remove(`/feedback-whatsapp/${imageId}`).then((res) => {
      closeModal();
      loadFeedback();
    });
  };

  useEffect(() => {
    loadFeedback();
  }, []);

  return (
    <div id={styles.feedback} className="__page">
      <SectionTitle
        title="آراء العملاء (واتساب)"
        actionText="اضافة"
        onClick={() => setModalStatus(true)}
      />

      <div className={styles.content}>
        {feedback.length > 0 &&
          feedback?.map((item, index) => {
            return (
              <div key={index} className={styles.imageContainer}>
                <img
                  src={item?.url}
                  className={styles.img}
                  alt="Smile Art"
                  onClick={() => setImageModal(true)}
                />
                <div onClick={() => deleteImage(item?.id)} className={styles.deleteBtn}>
                  <i className="fas fa-trash-alt"></i>
                </div>
              </div>
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
            images={feedback}
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
          <div className={styles.addFeedbackContainer}>
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
            <Button variant="contained" onClick={addToFeedback}>
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

export default Feedback;
