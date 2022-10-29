import { helpLinks, categoryLinks, supportLinks } from "./../../../data";
import UsefulLinks from "./usefulLinks";
import Logo from "../../UI/logo";

import { BsFacebook, BsTwitter } from "react-icons/bs/index";
import { RiInstagramFill } from "react-icons/ri/index";
import { Link } from "react-router-dom";

import styles from "./footer.module.scss";
import Copyright from "./copyright";

const Footer = () => {
  return (
    <footer>
      <div className={styles.container}>
        <div className={styles.footerLeft}>
          <div>
            <Logo />
            <p>plantme.com is Link popular e-commerce</p>
            <p>site exclusively for plant and plant care.</p>
            <p>We provide the best for plants</p>
            <p>and also provide best services.</p>
          </div>
          <div className={styles.iconContainer}>
            <Link to="/">
              <BsTwitter className={styles.icon} />
            </Link>
            <Link to="/">
              <BsFacebook className={styles.icon} />
            </Link>
            <Link to="/">
              <RiInstagramFill className={styles.icon} />
            </Link>
          </div>
        </div>
        <div className={styles.usefulLinksContainer}>
          <UsefulLinks title="Help" links={helpLinks} />
          <UsefulLinks title="Store" links={categoryLinks} />
          <UsefulLinks title="Support" links={supportLinks} />
        </div>
      </div>
      <Copyright />
    </footer>
  );
};

export default Footer;
