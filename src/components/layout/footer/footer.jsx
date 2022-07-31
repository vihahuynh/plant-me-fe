import { helpLinks, categoryLinks, supportLinks } from "./../../../data";
import UsefulLinks from "./usefulLinks";
import Logo from "../../UI/logo";

import { BsFacebook, BsTwitter } from "react-icons/bs/index";
import { RiInstagramFill } from "react-icons/ri/index";

import styles from "./footer.module.scss";
import Copyright from "./copyright";

const Footer = () => {
  return (
    <footer>
      <div className={styles.container}>
        <div>
          <Logo />
          <p>plantme.com is a popular e-commerce</p>
          <p>site exclusively for plant and plant care.</p>
          <p>We provide the best for plants</p>
          <p>and also provide best services.</p>
          <div className={styles.iconContainer}>
            <a href="#">
              <BsTwitter className={styles.icon} />
            </a>
            <a href="#">
              <BsFacebook className={styles.icon} />
            </a>
            <a href="#">
              <RiInstagramFill className={styles.icon} />
            </a>
          </div>
        </div>
        <UsefulLinks title="Help" links={helpLinks} />
        <UsefulLinks title="Store" links={categoryLinks} />
        <UsefulLinks title="Support" links={supportLinks} />
      </div>
      <Copyright />
    </footer>
  );
};

export default Footer;
