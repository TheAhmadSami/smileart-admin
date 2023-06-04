/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import { Button, Modal, TextField } from "@mui/material";
import SimpleImageSlider from "react-simple-image-slider";
import { mediaLink, get, post, remove } from "@sa/utils/axios";

//components
import { SectionTitle } from "@sa/components";

//styles
import styles from "@sa/styles/pages/Reviews.module.scss";

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [modalStatus, setModalStatus] = useState(false);
  const [imageModal, setImageModal] = useState(false);
  const [image, setImage] = useState(null);
  const [video, setVideo] = useState(null);

  const loadReviews = async () => {
    get("/reviews").then((res) => {
      setReviews(res.data);
    });
  };

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setImage(event.target.files[0]);
    }
  };

  const addToReviews = () => {
    let data = new FormData();
    if (image) {
      data.append("image", image);
      data.append("type", "image");
    }
    if (video) {
      data.append("video", video);
      data.append("type", "video");
    }

    if (image && video) {
      alert("خطأ. قم باختيار صورة او فيديو");
      return;
    }

    if (image || video) {
      post("/reviews", data).then((res) => {
        closeModal();
        loadReviews();
      });
    }
  };

  const closeModal = () => {
    setImage(null);
    setModalStatus(false);
  };

  const deleteImage = (imageId) => {
    remove(`/reviews/${imageId}`).then((res) => {
      closeModal();
      loadReviews();
    });
  };

  useEffect(() => {
    loadReviews();
  }, []);

  return (
    <div id={styles.reviews} className="__page">
      <SectionTitle
        title="آراء العملاء"
        actionText="اضافة"
        onClick={() => setModalStatus(true)}
      />

      <div className={styles.content}>
        {reviews.length > 0 &&
          reviews?.map((item, index) => {
            return (
              item?.type == "image" && (
                <div key={index} className={styles.imageContainer}>
                  <img
                    src={`${mediaLink}/reviews/${item?.url}`}
                    className={styles.img}
                    alt="Smile Art"
                    onClick={() => setImageModal(true)}
                  />
                  <div
                    onClick={() => deleteImage(item?.id)}
                    className={styles.deleteBtn}
                  >
                    <i className="fas fa-trash-alt"></i>
                  </div>
                </div>
              )
            );
          })}
      </div>

      <SectionTitle
        title="آراء العملاء"
        actionText="اضافة"
        onClick={() => setModalStatus(true)}
      />
      <div className={styles.content}>
        {reviews.length > 0 &&
          reviews?.map((item, index) => {
            return (
              item?.type == "video" && (
                <div key={index} className={styles.imageContainer}>
                  <iframe
                    className={styles.video}
                    src={item?.url}
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowfullscreen
                  ></iframe>
                  <div
                    onClick={() => deleteImage(item?.id)}
                    className={styles.deleteBtn}
                  >
                    <i className="fas fa-trash-alt"></i>
                  </div>
                </div>
              )
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
            images={reviews}
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
          <div className={styles.addReviewsContainer}>
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

          <p style={{ textAlign: "center" }}>
            يرجي اختيار خيار واحد فقط. اذا قمت باختيار خيارين بالخطأ، الرجاء
            الضغط على إلغاء ثم الاضافة مرة أخرى
          </p>

          <TextField
            id="outlined-basic"
            value={video}
            onChange={(e) => setVideo(e.target.value)}
            label="رابط الفيديو"
            variant="outlined"
            className="textInput"
          />

          <div className="controls">
            <Button variant="contained" onClick={addToReviews}>
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

export default Reviews;
