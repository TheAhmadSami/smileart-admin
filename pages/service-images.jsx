/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import { Button, Modal, TextField } from "@mui/material";
import SimpleImageSlider from "react-simple-image-slider";
import { get, post, put, remove } from "@sa/utils/axios";

//components
import { Banner, SectionTitle, CustomCard, ServiceCard } from "@sa/components";

//styles
import styles from "@sa/styles/pages/ServiceImages.module.scss";
import {
  ReactCompareSlider,
  ReactCompareSliderImage,
} from "react-compare-slider";

const ServiceImages = () => {
  const [services, setServices] = useState([]);
  const [activeService, setActiveService] = useState(null);
  const [imagesModalStatus, setImagesModalStatus] = useState(false);
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);

  const loadServices = async () => {
    get("/services").then((res) => {
      setServices(res?.data);
    });
  };

  const closeAlbumModal = () => {
    setNameEn("");
    setNameAr("");
    setActiveAlbum("");
    setAlbumModalStatus(false);
  };

  const closeImagesModal = () => {
    setImage1(null);
    setImage2(null);
    setActiveService(null);
    setImagesModalStatus(false);
  };

  const addImagesToService = () => {
    let data = new FormData();
    data.append("serviceId", activeService?.id);
    data.append("image1", image1);
    data.append("image2", image2);

    post("/service-images", data).then((res) => {
      console.log(res);
      closeImagesModal();
      loadServices();
    });
  };

  const deleteImage = (serviceId, imageId) => {
    remove(`/service-images`, { serviceId, imageId }).then((res) => {
      loadServices();
    });
  };

  useEffect(() => {
    loadServices();
  }, []);

  return (
    <div id={styles.albums} className="__page">

      <div className={styles.content}>
        {services.length > 0 &&
          services?.map((service, index) => (
            <div key={index} className={styles.albumContainer}>
              <SectionTitle
                title={`${service?.titleAr} (${service.titleEn})`}
                actionText="اضافة صور"
                onClick={() => {
                  setActiveService(service);
                  setImagesModalStatus(true);
                }}
              />
              <div className={styles.imagesContainer}>
                {service?.serviceImages?.length > 0 &&
                  service?.serviceImages?.map((image, index) => {
                    return (
                      image?.image1 &&
                      image?.image2 && (
                        <div style={{position: 'relative'}}>
                          <div
                            className={styles.deleteBtn}
                            title="حذف"
                            onClick={() => deleteImage(service?.id, image?.id)}
                          >
                            <i className="fas fa-trash-alt"></i>
                          </div>
                          <div className="compare-card">
                            <ReactCompareSlider
                              itemOne={
                                <ReactCompareSliderImage
                                  src={image?.image1}
                                  alt="Image one"
                                />
                              }
                              itemTwo={
                                <ReactCompareSliderImage
                                  src={image?.image2}
                                  alt="Image two"
                                />
                              }
                            />
                          </div>
                        </div>
                      )
                    );
                  })}
              </div>
            </div>
          ))}
      </div>

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
              title="image1"
              onChange={(e) => setImage1(e.target.files[0])}
              accept="image/png, image/gif, image/jpeg, image/jpg"
            />
            <input
              type="file"
              title="image2"
              onChange={(e) => setImage2(e.target.files[0])}
              accept="image/png, image/gif, image/jpeg, image/jpg"
            />
          </div>
          <div className={styles.imagesContainer}>
            {image1 && image2 && (
              <ReactCompareSlider
                itemOne={
                  <ReactCompareSliderImage
                    src={URL.createObjectURL(image1)}
                    alt="Image one"
                  />
                }
                itemTwo={
                  <ReactCompareSliderImage
                    src={URL.createObjectURL(image2)}
                    alt="Image two"
                  />
                }
              />
            )}
          </div>
          <div className="controls">
            <Button variant="contained" onClick={addImagesToService}>
              اضافة
            </Button>
            <Button variant="outlined" onClick={closeImagesModal}>
              الغاء
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ServiceImages;
