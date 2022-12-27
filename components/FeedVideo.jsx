import React from "react";

//styles
import styles from "@sa/styles/components/FeedVideo.module.scss";

const FeedVideo = () => {
  return (
    <div id={styles["main-video"]}>
      <iframe
        width="100%"
        height="100%"
        src="https://www.youtube.com/embed/_oIlv59bTL4"
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe>
    </div>
  );
};

export default FeedVideo;
