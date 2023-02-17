import { useState } from "react";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import Link from "next/link";

//components
import { FacebookFeed, FeedVideo, Menu, SocialMedia } from "@sa/components";

const MainLayout = ({ children }) => {
  const router = useRouter();
  const { t } = useTranslation();
  const [selectedPill, setSelectedPill] = useState(0);

  const info = [
    {
      title: "who_we_are",
      desc: "who_we_are_desc",
    },
    {
      title: "dr_magdy_word",
      desc: "dr_magdy_word_desc",
    },
  ];

  return (
    <div id="__main">
      <Menu />
      <div id="__body">
        <div id="__body-content">{children}</div>
        
      </div>
    </div>
  );
};

export default MainLayout;
