import React, { useEffect, useState } from "react";
import {
  Button,
  Modal,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { get, post, remove } from "@sa/utils/axios";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

//components
import { ArticleCard, SectionTitle } from "@sa/components";

//styles
import styles from "@sa/styles/pages/Article.module.scss";
import assets from "@sa/assets";
import { put } from "@sa/utils/axios";

const Team = () => {
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState();
  const [articles, setArticles] = useState([]);
  const [modalStatus, setModalStatus] = useState(false);
  const [titleEn, setTitleEn] = useState("");
  const [titleAr, setTitleAr] = useState("");
  const [contentEn, setContentEn] = useState("");
  const [contentAr, setContentAr] = useState("");
  const [activeArticle, setActiveArticle] = useState("");

  const [modules, setModules] = useState({
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      [
        { align: "" },
        { align: "center" },
        { align: "right" },
        { align: "justify" },
      ],
      ["link", "image", "video"],
      ["clean"],
      [{ direction: "rtl" }, { direction: "ltr" }],
    ],
  });

  const [formats, setFormats] = useState([
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "video",
    "align",
    "direction",
  ]);

  const loadCategories = async () => {
    get("/category").then((res) => {
      setCategories(res.data);
    });
  };

  const loadArticles = async () => {
    get("/article").then((res) => {
      setArticles(res.data);
    });
  };

  const closeModal = () => {
    setTitleEn("");
    setTitleAr("");
    setContentEn("");
    setContentAr("");
    setActiveArticle("");
    setModalStatus(false);
  };

  const addArticle = () => {
    let checker = true;

    if ((!titleEn, !titleAr, !contentEn, !contentAr))
      alert("قم بملئ جميع الحقول");

    if (!category) alert("قم باختيار القسم الخاصة بالمقالة");

    let data = new FormData();
    data.append("titleAr", titleAr);
    data.append("titleEn", titleEn);
    data.append("contentAr", contentAr);
    data.append("contentEn", contentEn);
    data.append("categoryId", category);

    if (checker) {
      post("/article", data).then((res) => {
        closeModal();
        loadArticles();
      });
    }
  };

  const deleteArticle = () => {};

  const editArticle = (article) => {
    setTitleAr(article?.titleAr);
    setTitleEn(article?.titleEn);
    setContentAr(article?.contentAr);
    setContentEn(article?.contentEn);
    setCategory(article?.categoryId);
    setActiveArticle(article);
    setModalStatus(true);
  };

  useEffect(() => {
    loadCategories();
    loadArticles();
  }, []);

  return (
    <div id={styles.article} className="__page">
      <div className={styles.categoryContainer}></div>

      <SectionTitle
        title="المقالات"
        actionText="إضافة مقالة"
        onClick={() => setModalStatus(true)}
      />

      <div className="articlesContainer">
        {articles?.map((article) => (
          <ArticleCard
            key={article?.id}
            article={article}
            onClick={() => editArticle(article)}
            onDelete={deleteArticle}
            onEdit={editArticle}
          />
        ))}
      </div>

      <Modal
        open={modalStatus}
        onClose={() => setModalStatus(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className={styles.articleModal}>
          <div className={styles.articleContainer}>
            <div className={styles.arabicSection}>
              <TextField
                id="outlined-basic"
                value={titleAr}
                onChange={(e) => setTitleAr(e.target.value)}
                label="عنوان المقالة (عربي)"
                variant="outlined"
                className="textInput"
              />
              <div className={styles.editorContainer}>
                <ReactQuill
                  modules={modules}
                  formats={formats}
                  theme="snow"
                  value={contentAr}
                  onChange={setContentAr}
                />
              </div>
            </div>
            <div className={styles.EnglishSection}>
              <TextField
                id="outlined-basic"
                value={titleEn}
                onChange={(e) => setTitleEn(e.target.value)}
                label="عنوان المقالة (انجليزي)"
                variant="outlined"
                className="textInput"
              />
              <div className={styles.editorContainer}>
                <ReactQuill
                  modules={modules}
                  formats={formats}
                  theme="snow"
                  value={contentEn}
                  onChange={setContentEn}
                />
              </div>
            </div>
          </div>

          <div className={styles.controls}>
            <FormControl fullWidth style={{ width: "100%" }}>
              <InputLabel id="demo-simple-select-label" dir="rtl">
                القسم
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={category}
                label="القسم"
                onChange={(e) => setCategory(e.target.value)}
              >
                {categories?.map((category) => (
                  <MenuItem key={category?.id} value={category?.id}>
                    {`${category?.nameAr} (${category?.nameEn})`}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            {activeArticle ? (
              <Button variant="contained" onClick={editArticle}>
                تعديل
              </Button>
            ) : (
              <Button variant="contained" onClick={addArticle}>
                اضافة
              </Button>
            )}
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
