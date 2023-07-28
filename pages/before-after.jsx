/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import { Button, Modal, TextField } from "@mui/material";
import SimpleImageSlider from "react-simple-image-slider";
import { get, post, put, remove } from "@sa/utils/axios";

//components
import { Banner, SectionTitle, CustomCard, CategoryCard } from "@sa/components";

//styles
import styles from "@sa/styles/pages/Albums.module.scss";

const BeforeAfter = () => {
  //album
  const [albums, setAlbums] = useState([]);
  const [albumModalStatus, setAlbumModalStatus] = useState(false);
  const [nameEn, setNameEn] = useState("");
  const [nameAr, setNameAr] = useState("");
  const [activeAlbum, setActiveAlbum] = useState("");

  //images
  const [images, setImages] = useState([]);
  const [imagesModalStatus, setImagesModalStatus] = useState(false);
  const [imageModal, setImageModal] = useState(false);
  const [activeImages, setActiveImages] = useState([]);
  const [image, setImage] = useState("");

  const loadAlbums = async () => {
    get("/before-after").then((res) => {
      console.log(res?.data);
      setAlbums(res?.data);
    });
  };

  const closeAlbumModal = () => {
    setNameEn("");
    setNameAr("");
    setActiveAlbum("");
    setAlbumModalStatus(false);
  };

  const closeImagesModal = () => {
    setImages([]);
    setActiveAlbum("");
    setImagesModalStatus(false);
  };

  const addAlbum = () => {
    let data = new FormData();
    data.append("nameAr", nameAr);
    data.append("nameEn", nameEn);
    post("/before-after", data).then((res) => {
      closeAlbumModal();
      loadAlbums();
    });
  };

  const editAlbum = () => {
    let data = new FormData();
    data.append("nameAr", nameAr);
    data.append("nameEn", nameEn);
    data.append("id", activeAlbum?.id);
    put("/before-after", data).then((res) => {
      closeAlbumModal();
      loadAlbums();
    });
  };

  const deleteAlbum = (album) => {
    remove(`/before-after/${album?.id}`).then((res) => {
      loadAlbums();
    });
  };

  const addMoreImages = (e) => {
    let imagesTmp =
      images?.length > 0 ? [...images, ...e.target.files] : e.target.files;
    setImages(imagesTmp);
  };

  const addImagesToAlbum = () => {
    let data = new FormData();
    data.append("albumId", activeAlbum?.id);
    for (let i = 0; i < images.length; i++) {
      data.append("images", images[i]);
    }

    post("/before-after-images", data).then((res) => {
      closeImagesModal();
      loadAlbums();
    });
  };

  const deleteImage = (albumId, imageName) => {
    remove(`/before-after-images`, { albumId, imageName }).then((res) => {
      loadAlbums();
    });
  };

  useEffect(() => {
    loadAlbums();
  }, []);

  return (
    <div id={styles.albums} className="__page">
      <SectionTitle
        title="ألبومات قبل وبعد"
        actionText="اضافة آلبوم"
        onClick={() => setAlbumModalStatus(true)}
      />
      <div className={styles.imagesContainer}>
        {albums?.length > 0 &&
          albums?.map((album, i) => (
            <CategoryCard
              key={i}
              category={album}
              onDelete={() => deleteAlbum(album)}
              onEdit={() => {
                setNameAr(album?.nameAr);
                setNameEn(album?.nameEn);
                setActiveAlbum(album);
                setAlbumModalStatus(true);
              }}
            />
          ))}
      </div>

      <div className={styles.content}>
        {albums.length > 0 &&
          albums?.map((album, index) => (
            <div key={index} className={styles.albumContainer}>
              <SectionTitle
                title={`${album?.nameAr} (${album.nameEn})`}
                actionText="اضافة صور"
                onClick={() => {
                  setActiveAlbum(album);
                  setImagesModalStatus(true);
                }}
              />
              <div className={styles.imagesContainer}>
                {album?.beforeAfterImages?.length > 0 &&
                  album?.beforeAfterImages?.map((image, index) => (
                    <div key={index} className={styles.imageContainer}>
                      <img
                        src={image?.url}
                        className={styles.imgPreview}
                        alt="Smile Art"
                        onClick={() => {
                          setActiveImages(album?.images);
                          setTimeout(() => {
                            setImageModal(true);
                          }, 300);
                        }}
                      />
                      <div
                        onClick={() => deleteImage(album?.id, image?.urlRaw)}
                        className={styles.deleteBtn}
                      >
                        <i className="fas fa-trash-alt"></i>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          ))}
      </div>

      <Modal
        open={albumModalStatus}
        onClose={() => setAlbumModalStatus(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="modal">
          <div className={styles.addstaffContainer}>
            <TextField
              id="outlined-basic"
              value={nameAr}
              onChange={(e) => setNameAr(e.target.value)}
              label="اسم الألبوم (عربي)"
              variant="outlined"
              className="textInput"
            />
            <TextField
              id="outlined-basic"
              value={nameEn}
              onChange={(e) => setNameEn(e.target.value)}
              label="اسم الألبوم (انجليزي)"
              variant="outlined"
              className="textInput"
            />
          </div>

          <div className="controls">
            {activeAlbum ? (
              <Button variant="contained" onClick={editAlbum}>
                تعديل
              </Button>
            ) : (
              <Button variant="contained" onClick={addAlbum}>
                اضافة
              </Button>
            )}
            <Button variant="outlined" onClick={closeAlbumModal}>
              الغاء
            </Button>
          </div>
        </div>
      </Modal>

      <Modal
        open={imagesModalStatus}
        onClose={() => setImagesModalStatus(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="modal">
          <div className={styles.addstaffContainer}></div>
          <div className="chooseImages">
            <input
              type="file"
              multiple
              onChange={(e) => addMoreImages(e)}
              accept="image/png, image/gif, image/jpeg, image/jpg"
            />
          </div>
          <div className={styles.imagesContainer}>
            {images?.length > 0 &&
              [...images].map((image, index) => {
                return (
                  <div
                    key={index}
                    className={styles.imgPreview}
                    style={{
                      backgroundImage: `url(${
                        image && URL.createObjectURL(image)
                      })`,
                    }}
                  ></div>
                );
              })}
          </div>
          <div className="controls">
            <Button variant="contained" onClick={addImagesToAlbum}>
              اضافة
            </Button>
            <Button variant="outlined" onClick={closeImagesModal}>
              الغاء
            </Button>
          </div>
        </div>
      </Modal>

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
            images={activeImages}
            showBullets={true}
            showNavs={true}
          />
        </div>
      </Modal>
    </div>
  );
};

export default BeforeAfter;
