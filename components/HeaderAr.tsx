import React from "react";
import Img from './Img';
import Link from "next/link";
import styles from "../styles/HeaderAr.module.scss";

type State = {
  mobileMenu: boolean;
};

type Props = {};

class HeaderAr extends React.Component<Props, State> {
  constructor(props) {
    super(props);

    this.state = {
      mobileMenu: false,
    };
  }

  render() {
    return (
      <header className={styles.header}>
        <div className={styles.wrapper}>
          <Link href="/">
            <a className={styles.logo}>
              <Img src="/img/logo.png" alt="" />
            </a>
          </Link>

          <ul className={styles.list}>
            <li>
              <Link href="/ar">
                <a>الرئيسية</a>
              </Link>
            </li>
            <li>
              <Link href="/ar">
                <a>التمويل الشخصي</a>
              </Link>
            </li>
            <li>
              <Link href="/ar">
                <a>التمويل العقاري</a>
              </Link>
            </li>
            <li>
              <Link href="/ar">
                <a> البطاقات الإتمانية</a>
              </Link>
            </li>
            <li>
              <Link href="http://blog.bonokey.com/">
                <a>المدونة</a>
              </Link>
            </li>
            <li>
              <Link href="/about">
                <a>تواصل معنا</a>
              </Link>
            </li>
            <li>
              <Link href="/">
                <a>EN</a>
              </Link>
            </li>
          </ul>

          <button
            className={styles.mobileButton}
            onClick={() => this.setState({ mobileMenu: true })}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
              <path d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z" />
            </svg>
          </button>

          <ul
            className={styles.mobileList}
            style={this.state.mobileMenu ? { display: "flex" } : {}}
          >
            <li
              className={styles.close}
              onClick={() => this.setState({ mobileMenu: false })}
            >
              <button>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                  <path d="M310.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L160 210.7 54.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L114.7 256 9.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 301.3 265.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L205.3 256 310.6 150.6z" />
                </svg>
              </button>
            </li>
            <li>
              <Link href="/">
                <a>EN</a>
              </Link>
            </li>
            <li>
              <Link href="/ar">
                <a>التمويل الشخصي</a>
              </Link>
            </li>
            <li>
              <Link href="/ar">
                <a>التمويل العقاري</a>
              </Link>
            </li>
            <li>
              <Link href="/ar">
                <a>الشركات</a>
              </Link>
            </li>
            <li>
              <Link href="http://blog.bonokey.com/">
                <a>المدونة</a>
              </Link>
            </li>
            <li>
              <Link href="/about">
                <a>تواصل </a>
              </Link>
            </li>
          </ul>
        </div>
      </header>
    );
  }
}

export default HeaderAr;
