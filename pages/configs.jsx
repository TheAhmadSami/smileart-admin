/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import { Button, TextField } from "@mui/material";
import { get, post } from "@sa/utils/axios";

//components
import { SectionTitle } from "@sa/components";

//styles
import styles from "@sa/styles/pages/Gallery.module.scss";

const Gallery = () => {
  const [configs, setConfigs] = useState({
    facebook: "",
    instagram: "",
    twitter: "",
    tiktok: "",
    youtube: "",
    youtubeVideo: "",
    phone: "",
    mobile: "",
    whatsapp: "",
    aboutAr: "",
    aboutEn: "",
    wordAr: "",
    wordEn: "",
    email: "",
  });

  const loadConfigs = async () => {
    get("/configs").then((res) => {
      if (res?.data) setConfigs(res.data[0]); 
    });
  };

  useEffect(() => {
    loadConfigs();
  }, []);

  const saveConfigs = () => {
    let data = new FormData();
    data.append("configs", JSON.stringify(configs));

    post("/configs", data).then((res) => {
      alert("تم حفظ البيانات بنجاح");
    });
  };

  return (
    <div id={styles.gallery} className="__page">
      <SectionTitle title="أخرى" />

      <div className="configs-container">
        <TextField
          id="outlined-basic"
          value={configs?.facebook}
          onChange={(e) =>
            setConfigs({ ...configs, ["facebook"]: e.target.value })
          }
          label="Facebook Link"
          variant="outlined"
          className="textInput textinput2 ltr"
        />

        <TextField
          id="outlined-basic"
          value={configs?.instagram}
          onChange={(e) =>
            setConfigs({ ...configs, ["instagram"]: e.target.value })
          }
          label="Instgarm Link"
          variant="outlined"
          className="textInput textinput2 ltr"
        />

        <TextField
          id="outlined-basic"
          value={configs?.twitter}
          onChange={(e) =>
            setConfigs({ ...configs, ["twitter"]: e.target.value })
          }
          label="Twitter Link"
          variant="outlined"
          className="textInput textinput2 ltr"
        />

        <TextField
          id="outlined-basic"
          value={configs?.tiktok}
          onChange={(e) =>
            setConfigs({ ...configs, ["tiktok"]: e.target.value })
          }
          label="TikTok Link"
          variant="outlined"
          className="textInput textinput2 ltr"
        />

        <TextField
          id="outlined-basic"
          value={configs?.youtube}
          onChange={(e) =>
            setConfigs({ ...configs, ["youtube"]: e.target.value })
          }
          label="YouTube Link"
          variant="outlined"
          className="textInput textinput2 ltr"
        />

        <TextField
          id="outlined-basic"
          value={configs?.youtubeVideo}
          onChange={(e) =>
            setConfigs({ ...configs, ["youtubeVideo"]: e.target.value })
          }
          label="Youtube Video Link"
          variant="outlined"
          className="textInput textinput2 ltr"
        />

        <TextField
          id="outlined-basic"
          value={configs?.phone}
          onChange={(e) =>
            setConfigs({ ...configs, ["phone"]: e.target.value })
          }
          label="Phone Number"
          placeholder="Ex. +20 2 1234 5678"
          variant="outlined"
          className="textInput textinput2 ltr"
        />

        <TextField
          id="outlined-basic"
          value={configs?.mobile}
          onChange={(e) =>
            setConfigs({ ...configs, ["mobile"]: e.target.value })
          }
          label="Mobile Number"
          placeholder="Ex. +20 123 456 7890"
          variant="outlined"
          className="textInput textinput2 ltr"
        />

        <TextField
          id="outlined-basic"
          value={configs?.email}
          onChange={(e) =>
            setConfigs({ ...configs, ["email"]: e.target.value })
          }
          label="Email"
          placeholder="Ex. example@email.com"
          variant="outlined"
          className="textInput textinput2 ltr"
        />

        <TextField
          id="outlined-basic"
          value={configs?.whatsapp}
          onChange={(e) =>
            setConfigs({ ...configs, ["whatsapp"]: e.target.value })
          }
          label="WhatsApp Number"
          placeholder="+20 123 456 7890"
          variant="outlined"
          className="textInput textinput2 ltr"
        />

        <TextField
          id="outlined-basic"
          value={configs?.aboutAr}
          onChange={(e) =>
            setConfigs({ ...configs, ["aboutAr"]: e.target.value })
          }
          label="من نحن (عربي)"
          variant="outlined"
          className="textInput"
        />

        <TextField
          id="outlined-basic"
          value={configs?.aboutEn}
          onChange={(e) =>
            setConfigs({ ...configs, ["aboutEn"]: e.target.value })
          }
          label="Who we are (English)"
          variant="outlined"
          className="textInput ltr"
        />

        <TextField
          id="outlined-basic"
          value={configs?.wordAr}
          onChange={(e) =>
            setConfigs({ ...configs, ["wordAr"]: e.target.value })
          }
          label="كلمة الدكتور مجدي (عربي)"
          variant="outlined"
          className="textInput"
        />

        <TextField
          id="outlined-basic"
          value={configs?.wordEn}
          onChange={(e) =>
            setConfigs({ ...configs, ["wordEn"]: e.target.value })
          }
          label="Dr. Magdy Word (English)"
          variant="outlined"
          className="textInput ltr"
        />
      </div>

      <Button variant="contained" onClick={saveConfigs}>
        حفظ
      </Button>
    </div>
  );
};

export default Gallery;
