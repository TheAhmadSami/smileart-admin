import React, { useEffect, useState } from "react";
import { Button, Modal, TextField } from "@mui/material";
import { get, post, remove } from "@sa/utils/axios";

//components
import { SectionTitle, CustomCard, CategoryCard } from "@sa/components";

//styles
import styles from "@sa/styles/pages/Category.module.scss";
import assets from "@sa/assets";
import { put } from "@sa/utils/axios";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [modalStatus, setModalStatus] = useState(false);
  const [nameEn, setNameEn] = useState("");
  const [nameAr, setNameAr] = useState("");
  const [activeCategory, setActiveCategory] = useState("");

  const loadCategories = async () => {
    get("/category").then((res) => {
      setCategories(res.data);
    });
  };

  const closeModal = () => {
    setNameEn("");
    setNameAr("");
    setActiveCategory("");
    setModalStatus(false);
  };

  const addCategory = () => {
    let data = new FormData();
    data.append("nameAr", nameAr);
    data.append("nameEn", nameEn);
    post("/category", data).then((res) => {
      closeModal();
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
      closeModal();
      loadCategories();
    });
  };
  useEffect(() => {
    loadCategories();
  }, []);

  return (
    <div id={styles.article} className="__page">
      <SectionTitle
        title="الأقسام"
        actionText="إضافة قسم"
        onClick={() => setModalStatus(true)}
      />

      <div className={styles.categoryContainer}>
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
                setModalStatus(true);
              }}
            />
          ))}
      </div>

      <Modal
        open={modalStatus}
        onClose={() => setModalStatus(false)}
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
            <Button variant="outlined" onClick={closeModal}>
              الغاء
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Categories;
