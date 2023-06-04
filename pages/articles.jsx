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
import { get, mediaLink, post, remove } from "@sa/utils/axios";

const ReactQuill =
  typeof window === "object" ? require("react-quill") : () => false;
import "react-quill/dist/quill.snow.css";

//components
import { ArticleCard, CategoryCard, SectionTitle } from "@sa/components";

//styles
import styles from "@sa/styles/pages/Article.module.scss";
import assets from "@sa/assets";
import { put } from "@sa/utils/axios";

const Article = () => {
  //category
  const [categories, setCategories] = useState([]);
  const [categoryModalStatus, setCategoryModalStatus] = useState(false);
  const [nameEn, setNameEn] = useState("");
  const [nameAr, setNameAr] = useState("");
  const [activeCategory, setActiveCategory] = useState("");

  //article
  const [articleModalStatus, setArticleModalStatus] = useState(false);
  const [titleEn, setTitleEn] = useState("");
  const [titleAr, setTitleAr] = useState("");
  const [contentEn, setContentEn] = useState("");
  const [contentAr, setContentAr] = useState("");
  const [category, setCategory] = useState();
  const [activeArticle, setActiveArticle] = useState("");
  const [image, setImage] = useState("");

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, false] }],
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
      [
        {
          color: ["red", "blue", "yellow"],
        },
      ],
      ["link", "image", "video"],
      ["clean"],
      [{ direction: "rtl" }, { direction: "ltr" }],
    ],
    clipboard: {
      matchVisual: false,
    },
  };

  const formats = [
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
    "color",
  ];

  //catgeory
  const loadCategories = async () => {
    get("/category").then((res) => {
      setCategories(res.data);
    });
  };

  const closeCategoryModal = () => {
    setNameEn("");
    setNameAr("");
    setActiveCategory("");
    setCategoryModalStatus(false);
  };

  const addCategory = () => {
    let data = new FormData();
    data.append("nameAr", nameAr);
    data.append("nameEn", nameEn);
    post("/category", data).then((res) => {
      closeCategoryModal();
      loadCategories();
    });
  };

  const deleteCategory = (category) => {
    remove(`/category/${category?.id}`).then((res) => {
      loadCategories();
    });
  };

  const editCategory = () => {
    let data = new FormData();
    data.append("nameAr", nameAr);
    data.append("nameEn", nameEn);
    data.append("id", activeCategory?.id);
    put("/category", data).then((res) => {
      closeCategoryModal();
      loadCategories();
    });
  };

  const closeArticleModal = () => {
    setTitleEn("");
    setTitleAr("");
    setContentEn("");
    setContentAr("");
    setActiveArticle("");
    setArticleModalStatus(false);
  };

  useEffect(() => {
    console.log("activeArticle=-=-=-=--", activeArticle);
  }, [activeArticle]);

  const addArticle = () => {
    let checker = true;

    if ((!titleEn, !titleAr, !contentEn, !contentAr, !image)) {
      checker = false;
      alert("قم بملئ جميع الحقول");
    }

    if (!category) {
      checker = false;
      alert("قم باختيار القسم الخاص بالمقالة");
    }

    if (checker) {
      let data = new FormData();
      data.append("titleAr", titleAr);
      data.append("titleEn", titleEn);
      data.append("contentAr", contentAr);
      data.append("contentEn", contentEn);
      data.append("categoryId", category);
      data.append("image", image);
      post("/article", data).then((res) => {
        closeArticleModal();
        loadCategories();
      });
    }
  };

  const deleteArticle = (articleId) => {
    remove(`/article/${articleId}`).then((res) => {
      loadCategories();
    });
  };

  const openEditArticle = (article) => {
    setTitleAr(article?.titleAr);
    setTitleEn(article?.titleEn);
    setContentAr(article?.contentAr);
    setContentEn(article?.contentEn);
    setCategory(article?.categoryId);
    setActiveArticle(article);
    setArticleModalStatus(true);
  };

  const editArticle = () => {
    let checker = true;

    if ((!titleEn, !titleAr, !contentEn, !contentAr, !image)) {
      checker = false;
      alert("قم بملئ جميع الحقول");
    }

    if (!category) {
      checker = false;
      alert("قم باختيار القسم الخاص بالمقالة");
    }

    if (checker) {
      let data = new FormData();
      data.append("articleId", activeArticle?.id);
      data.append("titleAr", titleAr);
      data.append("titleEn", titleEn);
      data.append("contentAr", contentAr);
      data.append("contentEn", contentEn);
      data.append("categoryId", category);
      data.append("image", image);
      put("/article", data).then((res) => {
        closeArticleModal();
        loadCategories();
      });
    }
  };

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setImage(event.target.files[0]);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  return (
    <div id={styles.article} className="__page">
      <SectionTitle
        title="الأقسام"
        actionText="إضافة قسم"
        onClick={() => setCategoryModalStatus(true)}
      />

      <div className="articleContainer">
        {categories?.length > 0 &&
          categories?.map((category, i) => (
            <CategoryCard
              key={i}
              category={category}
              onDelete={() => deleteCategory(category)}
              onEdit={() => {
                setNameAr(category?.nameAr);
                setNameEn(category?.nameEn);
                setActiveCategory(category);
                setCategoryModalStatus(true);
              }}
            />
          ))}
      </div>

      <Modal
        open={categoryModalStatus}
        onClose={() => setCategoryModalStatus(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="modal">
          <div className={styles.addstaffContainer}>
            <TextField
              id="outlined-basic"
              value={nameAr}
              onChange={(e) => setNameAr(e.target.value)}
              label="اسم القسم (عربي)"
              variant="outlined"
              className="textInput"
            />
            <TextField
              id="outlined-basic"
              value={nameEn}
              onChange={(e) => setNameEn(e.target.value)}
              label="اسم القسم (انجليزي)"
              variant="outlined"
              className="textInput"
            />
          </div>

          <div className="controls">
            {activeCategory ? (
              <Button variant="contained" onClick={editCategory}>
                تعديل
              </Button>
            ) : (
              <Button variant="contained" onClick={addCategory}>
                اضافة
              </Button>
            )}
            <Button variant="outlined" onClick={closeCategoryModal}>
              الغاء
            </Button>
          </div>
        </div>
      </Modal>

      {categories?.length > 0 &&
        categories?.map((category) => (
          <div key={category?.id} className={styles.categoryContainer}>
            <SectionTitle
              title={`${category?.nameAr} (${category?.nameEn})`}
              actionText="إضافة مقالة"
              onClick={() => setArticleModalStatus(true)}
            />
            <div className={styles.articleContainer}>
              {category?.articles?.length > 0 &&
                category?.articles?.map((article) => (
                  <ArticleCard
                    key={article?.id}
                    article={article}
                    onClick={() => openEditArticle(article)}
                    onDelete={() => deleteArticle(article?.id)}
                    onEdit={() => openEditArticle(article)}
                  />
                ))}
            </div>
          </div>
        ))}

      <Modal
        open={articleModalStatus}
        onClose={() => setArticleModalStatus(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className={styles.articleModal}>
          <div
            className="articleImage"
            style={{
              backgroundImage: `url(${
                image
                  ? URL.createObjectURL(image)
                  : activeArticle
                  ? `${mediaLink}/articles/${activeArticle?.id}/${activeArticle?.image}`
                  : null
              })`,
            }}
          >
            <input type="file" onChange={onImageChange} />
            {!image && !activeArticle?.image && (
              <i className="fas fa-camera"></i>
            )}
          </div>
          <div className="articleContainer">
            <div className="arabicSection">
              <TextField
                id="outlined-basic"
                value={titleAr}
                onChange={(e) => setTitleAr(e.target.value)}
                label="عنوان المقالة (عربي)"
                variant="outlined"
                className="textInput"
              />
              <div className="editorContainer">
                <ReactQuill
                  modules={modules}
                  formats={formats}
                  theme="snow"
                  value={contentAr}
                  onChange={setContentAr}
                />
              </div>
            </div>
            <div className="englishSection">
              <TextField
                id="outlined-basic"
                value={titleEn}
                onChange={(e) => setTitleEn(e.target.value)}
                label="عنوان المقالة (انجليزي)"
                variant="outlined"
                className="textInput"
              />
              <div className="editorContainer">
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
            <Button variant="outlined" onClick={closeArticleModal}>
              الغاء
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Article;
