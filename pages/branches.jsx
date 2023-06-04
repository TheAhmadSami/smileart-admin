import React, { useEffect, useState } from "react";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
} from "@mui/material";
import { get, post, put, remove } from "@sa/utils/axios";

//components
import { SectionTitle, BranchCard } from "@sa/components";

//styles
import styles from "@sa/styles/pages/Branches.module.scss";
import assets from "@sa/assets";
import Compress from "compress.js";

const Branches = () => {
  const [branches, setBranches] = useState([]);
  const [modalStatus, setModalStatus] = useState(false);
  const [activeBranch, setActiveBranch] = useState("");
  const [nameAr, setNameAr] = useState("");
  const [nameEn, setNameEn] = useState("");
  const [addressAr, setAddressAr] = useState("");
  const [addressEn, setAddressEn] = useState("");
  const [phone1, setPhone1] = useState("");
  const [phone2, setPhone2] = useState("");
  const [phone3, setPhone3] = useState("");
  const [mapLink, setMapLink] = useState("");
  const [mapDisplayLink, setMapDisplayLink] = useState("");
  const [fromTime, setFromTime] = useState("");
  const [toTime, setToTime] = useState("");
  const [fromDay, setFromDay] = useState("");
  const [toDay, setToDay] = useState("");

  const loadBranches = async () => {
    get("/branches").then((res) => {
      if (res?.data) setBranches(res.data);
    });
  };

  const addToBranch = () => {
    let branchData = {
      nameAr,
      nameEn,
      addressAr,
      addressEn,
      phone1,
      phone2,
      phone3,
      mapLink,
      mapDisplayLink,
      fromTime,
      toTime,
      fromDay,
      toDay,
    };

    let data = new FormData();
    data.append("branchData", JSON.stringify(branchData));

    post("/branches", data).then((res) => {
      closeModal();
      loadBranches();
    });
  };

  const openEditBranch = (branch) => {
    setNameAr(branch?.nameAr);
    setNameEn(branch?.nameEn);
    setAddressAr(branch?.addressAr);
    setAddressEn(branch?.addressEn);
    setPhone1(branch?.phone1);
    setPhone2(branch?.phone2);
    setPhone3(branch?.phone3);
    setMapLink(branch?.mapLink);
    setFromTime(branch?.fromTime);
    setToTime(branch?.toTime);
    setFromDay(branch?.fromDay);
    setToDay(branch?.toDay);
    setActiveBranch(branch);
    setModalStatus(true);
  };

  const editBranch = () => {
    let branchData = {
      id: activeBranch?.id,
      nameAr,
      nameEn,
      addressAr,
      addressEn,
      phone1,
      phone2,
      phone3,
      mapLink,
      mapDisplayLink,
      fromTime,
      toTime,
      fromDay,
      toDay,
    };

    let data = new FormData();
    data.append("branchData", JSON.stringify(branchData));

    put("/branches", data).then((res) => {
      closeModal();
      loadBranches();
    });
  };

  const closeModal = () => {
    setNameAr("");
    setNameEn("");
    setAddressAr("");
    setAddressEn("");
    setPhone1("");
    setPhone2("");
    setPhone3("");
    setMapLink("");
    setMapDisplayLink("");
    setFromTime("");
    setToTime("");
    setFromDay("");
    setToDay("");
    setActiveBranch(null);
    setModalStatus(false);
  };

  useEffect(() => {
    loadBranches();
  }, []);

  const deleteBranch = (branchId) => {
    remove(`/branches/${branchId}`).then((res) => {
      loadBranches();
    });
  };

  return (
    <div id={styles.branches} className="__page">
      <SectionTitle
        title="الفروع"
        actionText="إضافة فرع"
        onClick={() => setModalStatus(true)}
      />

      <div className={styles.branchesDetails}>
        {branches.length > 0 &&
          branches?.map((branch, index) => {
            return (
              <BranchCard
                key={index}
                branch={branch}
                onEdit={() => openEditBranch(branch)}
                onDelete={() => deleteBranch(branch?.id)}
              />
            );
          })}
      </div>

      <Modal
        open={modalStatus}
        onClose={closeModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="modal">
          <div className={styles.addBranchContainer}>
            <TextField
              id="outlined-basic"
              value={nameAr}
              onChange={(e) => setNameAr(e.target.value)}
              label="اسم العنوان (عربي)"
              placeholder="مثال: فرع مدينة نصر"
              variant="outlined"
              className="textInput"
            />
            <TextField
              id="outlined-basic"
              value={nameEn}
              onChange={(e) => setNameEn(e.target.value)}
              label="اسم العنوان (انجليزي)"
              variant="outlined"
              placeholder="Ex. Nasr City Branch"
              dir="ltr"
              className="textInput"
            />
            <TextField
              id="outlined-basic"
              value={addressAr}
              onChange={(e) => setAddressAr(e.target.value)}
              label="العنوان (عربي)"
              placeholder="مثال: ١٤ شارع اسحاق يعقوب"
              variant="outlined"
              className="textInput"
            />
            <TextField
              id="outlined-basic"
              value={addressEn}
              onChange={(e) => setAddressEn(e.target.value)}
              label="العنوان (انجليزي)"
              placeholder="Ex. 14 Eshaq Taquob st."
              dir="ltr"
              variant="outlined"
              className="textInput"
            />
            <TextField
              id="outlined-basic"
              value={phone1}
              onChange={(e) => setPhone1(e.target.value)}
              label="رقم الهاتف 1"
              placeholder="Ex. +20 123 456 7890"
              dir="ltr"
              variant="outlined"
              className="textInput"
            />
            <TextField
              id="outlined-basic"
              value={phone2}
              onChange={(e) => setPhone2(e.target.value)}
              label="رقم الهاتف 2"
              placeholder="Ex. +20 123 456 7890"
              dir="ltr"
              variant="outlined"
              className="textInput"
            />
            <TextField
              id="outlined-basic"
              value={phone3}
              onChange={(e) => setPhone3(e.target.value)}
              label="رقم الهاتف 3"
              placeholder="Ex. +20 123 456 7890"
              dir="ltr"
              variant="outlined"
              className="textInput"
            />
            <TextField
              id="outlined-basic"
              value={mapLink}
              onChange={(e) => setMapLink(e.target.value)}
              label="رابط الخريطة (خرائط جوجل)"
              dir="ltr"
              variant="outlined"
              className="textInput"
            />
            <TextField
              id="outlined-basic"
              value={mapDisplayLink}
              onChange={(e) => setMapDisplayLink(e.target.value)}
              label="رابط عرض الخريطة (خرائط جوجل)"
              dir="ltr"
              variant="outlined"
              className="textInput"
            />

            <h2>أوقات العمل</h2>
            <div className="flex-start-center gap20">
              <div>
                <div className="flex-start-center gap10">
                  <p>من</p>
                  <input
                    type="time"
                    value={fromTime}
                    onChange={(e) => setFromTime(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <div className="flex-start-center gap10">
                  <p>إلى</p>
                  <input
                    type="time"
                    value={toTime}
                    onChange={(e) => setToTime(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <br />

            <h2>أيام العمل</h2>
            <div className="flex flex-col gap20">
              <div>
                <div className="flex-start-center gap10">
                  <p>من</p>
                  <FormControl fullWidth style={{ width: "200px" }}>
                    <InputLabel id="demo-simple-select-label">اليوم</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={fromDay}
                      label="اليوم"
                      onChange={(e) => setFromDay(e.target.value)}
                    >
                      <MenuItem value="saturday">السبت</MenuItem>
                      <MenuItem value="sunday">الأحد</MenuItem>
                      <MenuItem value="monday">الإثنين</MenuItem>
                      <MenuItem value="tuesday">الثلاثاء</MenuItem>
                      <MenuItem value="wednesday">الأربعاء</MenuItem>
                      <MenuItem value="thursday">الخميس</MenuItem>
                      <MenuItem value="friday">الجمعة</MenuItem>
                    </Select>
                  </FormControl>
                </div>
              </div>

              <div>
                <div className="flex-start-center gap10">
                  <p>إلى</p>
                  <FormControl fullWidth style={{ width: "200px" }}>
                    <InputLabel id="demo-simple-select-label">اليوم</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={toDay}
                      label="اليوم"
                      onChange={(e) => setToDay(e.target.value)}
                    >
                      <MenuItem value="saturday">السبت</MenuItem>
                      <MenuItem value="sunday">الأحد</MenuItem>
                      <MenuItem value="monday">الإثنين</MenuItem>
                      <MenuItem value="tuesday">الثلاثاء</MenuItem>
                      <MenuItem value="wednesday">الأربعاء</MenuItem>
                      <MenuItem value="thursday">الخميس</MenuItem>
                      <MenuItem value="friday">الجمعة</MenuItem>
                    </Select>
                  </FormControl>
                </div>
              </div>
            </div>
          </div>

          <div className="controls">
            {activeBranch ? (
              <Button variant="contained" onClick={editBranch}>
                تعديل
              </Button>
            ) : (
              <Button variant="contained" onClick={addToBranch}>
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

export default Branches;
