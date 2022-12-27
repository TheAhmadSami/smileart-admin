import React, { useEffect, useState } from "react";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { Button, Modal, TextField } from "@mui/material";
import { get, post } from "@sa/utils/axios";

//components
import { Banner, SectionTitle, CustomCard } from "@sa/components";

//styles
import styles from "@sa/styles/pages/Team.module.scss";
import assets from "@sa/assets";

const Team = () => {
  const { t } = useTranslation();
  const [team, setTeam] = useState([]);
  const [modalStatus, setModalStatus] = useState(false);
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
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
    data.append("title", title);
    data.append("subtitle", subtitle);
    data.append("image", image);

    post('/staff', data).then(res => {
      closeModal();
      loadTeam();
    })
  };

  const closeModal = () => {
    setTitle('');
    setSubtitle('');
    setImage(null)
    setModalStatus(false);
  }

  useEffect(() => {
    loadTeam();
  }, []);

  return (
    <div id={styles.team} className="__page">
      <SectionTitle
        title={t("team")}
        actionText="اضافة عضو"
        onClick={() => setModalStatus(true)}
      />

      <div className={styles.servicesDetails}>
        {team.length > 0 &&
          team?.map((team, index) => {
            return (
              <CustomCard
                key={index}
                title={team?.title}
                image={team?.image}
                description={team?.subtitle}
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

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}
