import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import Router from "next/router";

//components
import { FacebookFeed, FeedVideo, Menu, SocialMedia } from "@sa/components";
import { Button, TextField } from "@mui/material";
import { post } from "@sa/utils/axios";

const MainLayout = ({ children }) => {
  const router = useRouter();
  const { t } = useTranslation();
  const [selectedPill, setSelectedPill] = useState(0);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  
  useEffect(() => {
    const userTmp = localStorage.getItem("user_t");
    setUser(userTmp)
  }, [])

  const login = () => {

    let data = new FormData();
    data.append('email', email);
    data.append('password', password);

    post("/login", data)
      .then((res) => {
        if(res?.data){
          localStorage.setItem(
            "user_t",
            Math.floor(10000000 + Math.random() * 90000000).toString()
          );
          Router.reload();
        }else{
          alert("خطأ في البريد الالكتروني أو كلمة المرور");
        }
      })
  };
  const forgotPassword = () => {
    post("/forgot-password")
      .then((res) => {
        alert("تم ارسال كلمة مرور مؤقتة إلى البريد الالكتروني المسجل لدينا");
      })
      .catch((err) => {
        alert("حدث خطأ ما");
      });
  };

  return (
    <div id="__main">
      <Menu />
      {user ? (
        <div id="__body">
          <div id="__body-content">{children}</div>
        </div>
      ) : (
        <div id="__login">
          <TextField
            id="outlined-basic"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            label="البريد الالكتروني"
            variant="outlined"
            className="textInput textinput2 ltr"
          />

          <TextField
            id="outlined-basic"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            label="كلمة المرور"
            variant="outlined"
            type="password"
            className="textInput textinput2 ltr"
          />

          <Button variant="contained" onClick={login}>
            تسجيل الدخول
          </Button>
          <Button variant="outlined" onClick={forgotPassword}>
            نسيت كلمة المرور
          </Button>
        </div>
      )}
    </div>
  );
};

export default MainLayout;
