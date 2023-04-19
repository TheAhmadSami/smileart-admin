/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
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
    fromDay: 'saturday',
    toDay: 'saturday',
    fromTime: '',
    toTime: '',
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
    console.log(configs);
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
      </div>

      <h2>أوقات العمل</h2>
      <div className="flex-start-center gap20">
        <div>
          <div className='flex-start-center gap10'>
            <p>من</p>
            <input type="time" value={configs?.fromTime} onChange={(e) => setConfigs({ ...configs, ["fromTime"]: e.target.value })} />
          </div>
        </div>

        <div>
          <div className='flex-start-center gap10'>
            <p>إلى</p>
            <input type="time" value={configs?.toTime} onChange={(e) => setConfigs({ ...configs, ["toTime"]: e.target.value })} />
          </div>
        </div>
      </div>

      <br />

      <h2>أيام العمل</h2>
      <div className="flex-start-center gap20">
        <div>
          <div className='flex-start-center gap10'>
            <p>من</p>
            <FormControl fullWidth style={{ width: '200px' }}>
              <InputLabel id="demo-simple-select-label">اليوم</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={configs?.fromDay}
                label="اليوم"
                onChange={(e) =>
                  setConfigs({ ...configs, ["fromDay"]: e.target.value })
                }
              >
                <MenuItem value='saturday'>السبت</MenuItem>
                <MenuItem value='sunday'>الأحد</MenuItem>
                <MenuItem value='monday'>الإثنين</MenuItem>
                <MenuItem value='tuesday'>الثلاثاء</MenuItem>
                <MenuItem value='wednesday'>الأربعاء</MenuItem>
                <MenuItem value='thursday'>الخميس</MenuItem>
                <MenuItem value='friday'>الجمعة</MenuItem>
              </Select>
            </FormControl>
          </div>
        </div>

        <div>
          <div className='flex-start-center gap10'>
            <p>إلى</p>
            <FormControl fullWidth style={{ width: '200px' }}>
              <InputLabel id="demo-simple-select-label">اليوم</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={configs?.toDay}
                label="اليوم"
                onChange={(e) =>
                  setConfigs({ ...configs, ["toDay"]: e.target.value })
                }
              >
                <MenuItem value='saturday'>السبت</MenuItem>
                <MenuItem value='sunday'>الأحد</MenuItem>
                <MenuItem value='monday'>الإثنين</MenuItem>
                <MenuItem value='tuesday'>الثلاثاء</MenuItem>
                <MenuItem value='wednesday'>الأربعاء</MenuItem>
                <MenuItem value='thursday'>الخميس</MenuItem>
                <MenuItem value='friday'>الجمعة</MenuItem>
              </Select>
            </FormControl>
          </div>
        </div>
      </div>



      <br />


      <Button variant="contained" onClick={saveConfigs}>
        حفظ
      </Button>
    </div>
  );
};

export default Gallery;
