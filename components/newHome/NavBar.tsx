import { brandColors, uiBreakpoint, urlPathsEn } from "../../utils/helpers";
import Link from "next/link";
import Img from '../Img';
import React from "react";
import styled from "styled-components";

import Logo from "../../img/img_logo1.png";

import { Link as ReactScrollLink, scroller as reactScroll } from "react-scroll";
import { FaBars, FaChevronDown, FaTimes } from "react-icons/fa";
import { useRouter } from "next/router";
import { Button } from "../Button";
import Text from "../Text";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

type Props = {};

const NavBarDiv = styled.div`
  width: 100%;
  background-color: ${brandColors.white};
  position: sticky;
  top: 0;
  z-index: 49;

  box-shadow: 0px 0px 12px 5px ${brandColors.black}08;
`;

const ContentContainerDiv = styled.div`
  max-width: 1100px;
  margin: 0 auto;

  padding: 12px 12px;
`;

const LogoImg = styled.img`
  height: 50px;
`;

const MyLink = styled(ReactScrollLink)`
  cursor: pointer;
  color: ${brandColors.black};
  font-size: 1em;
  font-weight: 400;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }

  &.active {
    font-weight: 600;
    text-decoration: underline;
  }

  /* PHONE UI */
  @media only screen and (max-width: ${uiBreakpoint}px) {
    display: none;
  }
`;

const NavbarA = styled.a`
  cursor: pointer;
  color: ${brandColors.black};
  font-size: 1em;
  font-weight: 400;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }

  /* PHONE UI */
  @media only screen and (max-width: ${uiBreakpoint}px) {
    display: none;
  }
`;

const LanguageText = styled.p`
  cursor: pointer;

  font-size: 1rem;
  font-weight: 400;
  color: ${brandColors.black};

  &:hover {
    text-decoration: underline;
  }
`;

const DropdownDiv = styled.div`
  position: absolute;
  margin-top: 12px;
  padding: 24px;
  background-color: ${brandColors.white};
  border-radius: 5px;

  box-shadow: 0px 0px 12px 5px ${brandColors.black}08;

  /* PHONE UI */
  @media only screen and (max-width: ${uiBreakpoint}px) {
    display: none;
  }
`;

const DropdownItemDiv = styled.div`
  padding: 6px 0;
`;

// SIDEBAR

const HamburgerDiv = styled.div`
  display: none;

  /* PHONE UI */
  @media only screen and (max-width: ${uiBreakpoint}px) {
    display: flex;
    align-items: center;
    cursor: pointer;
  }
`;

const SideBarAside = styled.aside<{ isOpen: boolean }>`
  position: fixed;
  z-index: 999;
  width: 100%;
  height: 100%;
  background-color: ${brandColors.white};
  top: ${(props) => (props.isOpen ? "0" : "-100%")};
  opacity: ${(props) => (props.isOpen ? "100%" : "0")};
  transition: 0.3s ease-in-out;
`;

const CloseIcon = styled(FaTimes)`
  cursor: pointer;
  margin-left: 12px;
  margin-top: 24px;
  font-size: 2rem;
  color: ${brandColors.black};
`;

const MySidebarLink = styled(ReactScrollLink)`
  cursor: pointer;
  color: ${brandColors.black};
  font-size: 1em;
  font-weight: 700;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }

  &.active {
    font-weight: 600;
    text-decoration: underline;
  }
`;

const SidebarA = styled.a`
  cursor: pointer;
  color: ${brandColors.black};
  font-size: 1rem;
  font-weight: 700;
  text-decoration: none;
  text-align: center;

  &:hover {
    text-decoration: underline;
  }

  /* PHONE UI
    @media only screen and (max-width: ${uiBreakpoint}px) {
        display: none;
    } */
`;

const SidebarDropdownDiv = styled.div`
  margin-top: 12px;
  padding: 24px;

  background-color: ${brandColors.captionBlack};
`;

const BetaDiv = styled.div`
  position: fixed;
  top: 0;
  right: -120px;
  padding: 24px;
  background-color: ${brandColors.blue};
  width: 400px;
  text-align: center;

  color: ${brandColors.white};
  font-size: 1rem;
  font-weight: 500;

  transform: rotate(30deg);

  z-index: 9999;

  /* PHONE UI */
  @media only screen and (max-width: ${uiBreakpoint}px) {
    transform: scale(0.6) rotate(30deg);
    right: -150px;
  }
`;

function NavBar(props: Props) {
  const router = useRouter();
  const isHomeScreen = router.pathname === "/en" ? true : false;
  const [lang, setLang] = React.useState("en");
  const [showDropdown, setShowDropdown] = React.useState(false);
  const [showSidebarDropdown, setShowSidebarDropdown] = React.useState(false);

  const [openSidebar, setOpenSidebar] = React.useState(false);

  const handleLangChange = (event: SelectChangeEvent) => {
    router.push("/" + event.target.value);
  };

  return (
    <>
      <div className="flex h-[104px] items-center justify-between w-full">
        <div className="flex gap-4 md:gap-8 items-center justify-start w-auto">
          <Link href={urlPathsEn.home} passHref>
            <Img
              className="h-[59px] object-cover w-[184px]"
              src={Logo.src}
              alt="logoOne"
            />
          </Link>
          <FormControl sx={{ m: 1, minWidth: "100px" }} size="small">
            <Select
              value={lang}
              onChange={handleLangChange}
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}
            >
              <MenuItem value={"en"}>English</MenuItem>
              <MenuItem value={"ar"}>Arabian</MenuItem>
            </Select>
          </FormControl>
          <div className="flex xl:hidden">
            <FaBars
              onClick={() => setOpenSidebar(true)}
              color={brandColors.black}
              size={24}
            />
          </div>
        </div>
        <div className="hidden gap-8 xl:flex items-center justify-start">
          <ul className="hidden flex-row gap-8 sm:flex items-center justify-start w-auto sm:w-full common-row-list">
            <li>
              <Text
                className="text-base text-gray-800 hover:text-pink-600"
                size="txtIBMPlexSansMedium16Gray800"
              >
                Main
              </Text>
            </li>
            <li>
              <div className="flex flex-row gap-1 items-center justify-start">
                <Text
                  className="text-base text-gray-800 hover:text-pink-600 w-auto"
                  size="txtIBMPlexSansMedium16Gray800"
                >
                  Service
                </Text>
                <KeyboardArrowDownIcon className="text-base" />
              </div>
            </li>
            <li>
              <Link href="/en/creditcard">
                <Text
                  className="text-base cursor-pointer text-gray-800 hover:text-pink-600"
                  size="txtIBMPlexSansMedium16Pink600"
                >
                  Loans
                </Text>
              </Link>
            </li>
            <li>
              <Text
                className="text-base text-gray-800 hover:text-pink-600"
                size="txtIBMPlexSansMedium16Gray800"
              >
                FAQ
              </Text>
            </li>
            <li>
              <Text
                className="text-base text-gray-800 hover:text-pink-600"
                size="txtIBMPlexSansMedium16Gray800"
              >
                About
              </Text>
            </li>
            <li>
              <Text
                className="text-base text-gray-800 hover:text-pink-600"
                size="txtIBMPlexSansMedium16Gray800"
              >
                Tools
              </Text>
            </li>
          </ul>
          <div className="flex gap-6 items-center justify-center w-auto">
            <div className="flex flex-col items-center justify-start w-[22px]">
              <Img
                className="h-[22px] rounded-bl rounded-br w-[22px]"
                src="img/img_user.svg"
                alt="user"
              />
            </div>
            <div className="flex flex-col items-center justify-start w-[30px]">
              <div className="relative w-[30px]">
                <Img
                  className="h-[22px] mt-auto w-[22px]"
                  src="img/img_iconhavefavorites.svg"
                  alt="iconhavefavorit"
                />
                <Text
                  className="absolute bg-pink-600 flex h-4 items-center justify-center right-[0] rounded-[50%] text-[11px] text-center text-white-A700 top-[0] w-4"
                  size="txtIBMPlexSansMedium11"
                >
                  3
                </Text>
              </div>
            </div>
          </div>
        </div>
        <div className="hidden sm:flex gap-4 items-center justify-start w-auto">
          <Button
            className="cursor-pointer font-ibmplexsans font-medium leading-[normal] min-w-[128px] text-base text-center"
            shape="round"
            size="md"
            variant="gradient"
            color="pink_600_purple_800"
          >
            Register now
          </Button>
          <Button
            className="bg-transparent cursor-pointer font-ibmplexsans font-medium leading-[normal] min-w-[72px] text-base text-center"
            shape="round"
            size="md"
            variant="outline"
            color="pink_600_purple_800"
          >
            Login
          </Button>
        </div>
      </div>
      <SideBarAside isOpen={openSidebar}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <CloseIcon onClick={() => setOpenSidebar(false)} />
          <div></div>
        </div>
        <div style={{ marginTop: "24px", textAlign: "center" }}>
          <div>
            <Link href={urlPathsEn.home} passHref>
              <SidebarA
                style={{ marginLeft: "24px" }}
                onClick={() => setOpenSidebar(false)}
              >
                Home
              </SidebarA>
            </Link>
          </div>
          <div style={{ marginTop: "48px" }}>
            <MySidebarLink
              to="test"
              offset={-100}
              smooth={true}
              duration={1000}
              onClick={() => setShowSidebarDropdown(!showSidebarDropdown)}
            >
              Financing
              <FaChevronDown
                size={15}
                color={brandColors.black + "95"}
                style={{ marginLeft: "12px" }}
              />
            </MySidebarLink>
            {showSidebarDropdown && (
              <SidebarDropdownDiv>
                <div style={{ padding: "24px 0" }}>
                  <MySidebarLink
                    to="test"
                    offset={-100}
                    smooth={true}
                    duration={1000}
                    style={{ color: brandColors.white }}
                    onClick={() => setOpenSidebar(false)}
                  >
                    Personal
                  </MySidebarLink>
                </div>
                <div style={{ padding: "24px 0" }}>
                  <MySidebarLink
                    to="test"
                    offset={-100}
                    smooth={true}
                    duration={1000}
                    style={{ color: brandColors.white }}
                    onClick={() => setOpenSidebar(false)}
                  >
                    Re-financing
                  </MySidebarLink>
                </div>
                <div style={{ padding: "24px 0" }}>
                  <MySidebarLink
                    to="test"
                    offset={-100}
                    smooth={true}
                    duration={1000}
                    style={{ color: brandColors.white }}
                    onClick={() => setOpenSidebar(false)}
                  >
                    Dept purchase
                  </MySidebarLink>
                </div>
                <div style={{ padding: "24px 0" }}>
                  <MySidebarLink
                    to="test"
                    offset={-100}
                    smooth={true}
                    duration={1000}
                    style={{ color: brandColors.white }}
                    onClick={() => setOpenSidebar(false)}
                  >
                    Car
                  </MySidebarLink>
                </div>
                <div style={{ padding: "24px 0" }}>
                  <MySidebarLink
                    to="test"
                    offset={-100}
                    smooth={true}
                    duration={1000}
                    style={{ color: brandColors.white }}
                    onClick={() => setOpenSidebar(false)}
                  >
                    Mortgage
                  </MySidebarLink>
                </div>
              </SidebarDropdownDiv>
            )}
          </div>
          <div style={{ marginTop: "48px" }}>
            <MySidebarLink
              to="test"
              offset={-100}
              smooth={true}
              duration={1000}
              onClick={() => setOpenSidebar(false)}
            >
              Deposit
            </MySidebarLink>
          </div>
          <div style={{ marginTop: "48px" }}>
            {isHomeScreen ? (
              <MySidebarLink
                to="offer-section"
                offset={-100}
                smooth={true}
                duration={1000}
                onClick={() => setOpenSidebar(false)}
              >
                Offers
              </MySidebarLink>
            ) : (
              <Link href={urlPathsEn.home + "#offer-section"} passHref>
                <SidebarA
                  style={{ marginLeft: "24px" }}
                  onClick={() => setOpenSidebar(false)}
                >
                  Offers
                </SidebarA>
              </Link>
            )}
          </div>
          <div style={{ marginTop: "48px" }}>
            <Link href="http://blog.bonokey.com" passHref>
              <SidebarA
                style={{ marginLeft: "24px" }}
                onClick={() => setOpenSidebar(false)}
              >
                Blog
              </SidebarA>
            </Link>
          </div>
          <div style={{ marginTop: "48px" }}>
            <Link href={urlPathsEn.contact} passHref>
              <SidebarA
                style={{ marginLeft: "24px" }}
                onClick={() => setOpenSidebar(false)}
              >
                Contact Us
              </SidebarA>
            </Link>
          </div>
          <div style={{ marginTop: "48px" }}>
            <Link href="/" passHref>
              <SidebarA
                style={{ marginLeft: "24px" }}
                onClick={() => setOpenSidebar(false)}
              >
                Ar
              </SidebarA>
            </Link>
          </div>
        </div>
      </SideBarAside>
    </>
  );
}

export default NavBar;
