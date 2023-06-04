/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import { Button, TextField } from "@mui/material";
import { get, post } from "@sa/utils/axios";

//components
import { SectionTitle } from "@sa/components";

//styles
import styles from "@sa/styles/pages/Albums.module.scss";

const Gallery = () => {
  const [configs, setConfigs] = useState({
    facebook: "",
    instagram: "",
    twitter: "",
    tiktok: "",
    youtube: "",
    snapchat: "",
    youtubeVideo: "",
    phone: "",
    mobile: "",
    whatsapp: "",
    aboutAr: "",
    aboutEn: "",
    wordAr: "",
    wordEn: "",
    titleEn: "",
    titleAr: "",
    email: "",
    keywords: "",
  });

  const [password, setPassword] = useState(null);
  const [image, setImage] = useState(null);
  const [articlePageImage, setArticlePageImage] = useState(null);

  const loadConfigs = async () => {
    get("/configs").then((res) => {
      if (res?.data) {
        setConfigs(res?.data?.[0]);
        setArticlePageImage(res?.data?.[0]?.articleImage);
      }
    });
  };

  useEffect(() => {
    loadConfigs();
  }, []);

  const saveConfigs = () => {
    let data = new FormData();
    console.log(configs);
    data.append("configs", JSON.stringify(configs));

    post("/configs", data).then((res) => {
      alert("تم حفظ البيانات بنجاح");
    });
  };

  const saveArticleImage = () => {
    let data = new FormData();
    data.append("image", image);

    post("/article-image", data).then((res) => {
      alert("تم حفظ البيانات بنجاح");
    });
  };

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setImage(event.target.files[0]);
    }
  };

  const changePass = () => {
    if (password) {
      let data = new FormData();
      data.append("password", password);

      post("/change-password", data).then((res) => {
        alert("تم تغيير كلمة المرور بنجاح");
      });
    } else {
      alert("لا يمكن ترك كلمة المرور فارغة");
    }
  };

  return (
    <div id={styles.gallery} className="__page">
      <SectionTitle title="صورة صفحة المقالات" />
      <div
        className="articleImage"
        style={{
          backgroundImage: `url(${
            image ? URL.createObjectURL(image) : articlePageImage ?? null
          })`,
        }}
      >
        <input type="file" onChange={onImageChange} />
        {!image && !articlePageImage && <i className="fas fa-camera"></i>}
      </div>
      <br />

      <Button variant="contained" onClick={saveArticleImage}>
        حفظ الصورة
      </Button>

      <br />
      <br />
      <br />

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
          value={configs?.snapchat}
          onChange={(e) =>
            setConfigs({ ...configs, ["snapchat"]: e.target.value })
          }
          label="Snapchat Link"
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
          value={configs?.titleAr}
          onChange={(e) =>
            setConfigs({ ...configs, ["titleAr"]: e.target.value })
          }
          label="العنوان الرئيسي (عربي)"
          variant="outlined"
          className="textInput"
        />

        <TextField
          id="outlined-basic"
          value={configs?.titleEn}
          onChange={(e) =>
            setConfigs({ ...configs, ["titleEn"]: e.target.value })
          }
          label="Main Title (English)"
          variant="outlined"
          className="textInput ltr"
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
          label="من هو الدكتور مجدي (عربي)"
          variant="outlined"
          className="textInput"
        />

        <TextField
          id="outlined-basic"
          value={configs?.wordEn}
          onChange={(e) =>
            setConfigs({ ...configs, ["wordEn"]: e.target.value })
          }
          label="Who is Dr. Magdy (English)"
          variant="outlined"
          className="textInput ltr"
        />
        <TextField
          id="outlined-basic"
          value={configs?.keywords}
          onChange={(e) =>
            setConfigs({ ...configs, ["keywords"]: e.target.value })
          }
          label="Keywords"
          variant="outlined"
          className="textInput ltr"
        />
      </div>

      <Button variant="contained" onClick={saveConfigs}>
        حفظ
      </Button>

      <br />
      <br />
      <br />

      <SectionTitle title="كلمة المرور" />
      <br />

      <TextField
        id="outlined-basic"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        label="كلمة المرور"
        variant="outlined"
        className="textInput ltr"
      />
      <br />
      <br />
      
      <Button variant="contained" onClick={changePass}>
        تغيير كلمة المرور
      </Button>
    </div>
  );
};

export default Gallery;
