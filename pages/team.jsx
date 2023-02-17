import React, { useEffect, useState } from "react";
import { Button, Modal, TextField } from "@mui/material";
import { get, post, remove } from "@sa/utils/axios";

//components
import {SectionTitle, CustomCard } from "@sa/components";

//styles
import styles from "@sa/styles/pages/Team.module.scss";
import assets from "@sa/assets";

const Team = () => {
  const [team, setTeam] = useState([]);
  const [modalStatus, setModalStatus] = useState(false);
  const [titleEn, setTitleEn] = useState("");
  const [subtitleEn, setSubtitleEn] = useState("");
  const [titleAr, setTitleAr] = useState("");
  const [subtitleAr, setSubtitleAr] = useState("");
  const [image, setImage] = useState("");

  const loadTeam = async () => {
    get("/staff").then((res) => {
      setTeam(res.data);
    });
  };

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setImage(event.target.files[0]);
    }
  };

  const addToStaff = () => {
    let data = new FormData();
    data.append("titleEn", titleEn);
    data.append("subtitleEn", subtitleEn);
    data.append("titleAr", titleAr);
    data.append("subtitleAr", subtitleAr);
    data.append("image", image);

    post('/staff', data).then(res => {
      closeModal();
      loadTeam();
    })
  };

  const closeModal = () => {
    setTitleEn('');
    setSubtitleEn('');
    setTitleAr("");
    setSubtitleAr("");
    setImage(null)
    setModalStatus(false);
  }

  useEffect(() => {
    loadTeam();
  }, []);

    const deleteStaff = (userId) => {
      remove(`/staff/${userId}`).then((res) => {
        loadTeam();
      });
    };

  return (
    <div id={styles.team} className="__page">
      <SectionTitle
        title="فريق العمل"
        actionText="إضافة عضو"
        onClick={() => setModalStatus(true)}
      />

      <div className={styles.servicesDetails}>
        {team.length > 0 &&
          team?.map((user, index) => {
            return (
              <CustomCard
                key={index}
                info={user}
                onDelete={() => deleteStaff(user?.id)}
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
          <div className={styles.addstaffContainer}>
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
              className="textInput"
            />
            <TextField
              id="outlined-basic"
              value={subtitleEn}
              multiline
              rows={4}
              onChange={(e) => setSubtitleEn(e.target.value)}
              label="الوصف (إنجليزي)"
              variant="outlined"
              className="textInput"
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
          </div>

          <div className="controls">
            <Button variant="contained" onClick={addToStaff}>اضافة</Button>
            <Button variant="outlined" onClick={closeModal}>
              الغاء
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Team;