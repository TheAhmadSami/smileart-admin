/* eslint-disable @next/next/no-img-element */
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

//components
import { Map, SectionTitle, TextInput } from "@sa/components";

//styles
import styles from "@sa/styles/pages/Contact.module.scss";

const ContactUs = () => {
  const { t } = useTranslation();

  return (
    <div id={styles["contact"]} className="__page">
      <SectionTitle title={t("contact_us")} />

      <div className={styles.row}>
        <TextInput label={t("name")} placeholder={t("placeholder_name")} />
        <TextInput
          label={t("phone_number")}
          placeholder={t("placeholder_phone")}
        />
      </div>

      <div className={styles.textareaContainer}>
        <div className={styles.label}>{t("message")}</div>
        <div className={styles.textareaContainer2}>
          <textarea
            className={styles.textarea}
            type="text"
            placeholder={t("placeholder_message")}
          />
          <p className={styles.sendMessage}>
            <i className="fas fa-paper-plane"></i>
            <span>{t("send_message")}</span>
          </p>
        </div>
      </div>

      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3451.615331481977!2d31.36869731546059!3d30.105201222654088!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1458161561d19a55%3A0x6e972289f5cfc4d8!2sSmile%20Art%20-%20Dr.Magdy%20ElGhamry!5e0!3m2!1sen!2seg!4v1669888151148!5m2!1sen!2seg"
        className={styles.map}
        allowfullscreen=""
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  );
};

export default ContactUs;

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}
