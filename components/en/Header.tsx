import { brandColors, uiBreakpoint, urlPathsEn } from "../../utils/helpers";
import Link from "next/link";
import React, { useEffect } from "react";
import Img from '../Img';
import styled from "styled-components";
import Logo from "../../img/logo-black.svg";
import SaudiFlag from "../../img/saudi-flag.svg";
import UKFlag from "../../img/uk-flag.svg";
import Compare from "../../img/compare.svg";
import Compare_active from "../../img/compare-active.svg";
import Favorite from "../../img/favorites.svg";
import Favorite_inactive from "../../img/favorite_inactive.svg";
import Badge from '@mui/material/Badge';

import { FaBars, FaChevronDown } from "react-icons/fa";
import CloseIcon from '@mui/icons-material/Close';
import { useRouter } from "next/router";
import { Button } from "../Button";
import Text from "../Text";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { Line } from "../../components/Line";
import { useAuth } from '../../context/AuthContext';
import { RemoveCircleOutlineRounded } from "@mui/icons-material";

type Props = {
  openSidebar?: Boolean;
  setOpenSidebar?: Function;
};

const StyledMenuItem = styled(MenuItem)({
  '& .MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input': {
    padding: '6px 8px !important',
  },
  '& .MuiMenuItem-root': {
    justifyContent: 'arround',
  }
})

const StyledSelect = styled(Select)({
  '& .MuiSelect-root:before': {
    borderBottom: "none !important",
  },
})

const StyledBadge = styled(Badge)({
  '& .MuiBadge-badge': {
    background: "#3559E0",
    color: "#fff",
    minHeight:"16px",
    height: "16px",
    minWidth: "16px",
    width: "16px",
    fontSize:"10px",
  }
});

const StyledBarBarge = styled(Badge)({
  '& .MuiBadge-badge': {
    background: "#47AFC8",
    color: "#fff",
    minHeight:"16px",
    height: "16px",
    minWidth: "16px",
    width: "16px",
    fontSize:"10px",
  }
});

interface CountryType {
  code: string;
  label: string;
  value: string;
  source: string;
}

const countries: readonly CountryType[] = [
  { code: 'GB', label: "ENG", value: 'en-US', source: UKFlag.src },
  { code: 'SA', label: "AR", value: 'ar-SA', source: SaudiFlag.src },
]

function Header(props: Props) {
  const router = useRouter();
  const [lang, setLang] = React.useState("");
  const { authState, setAuthState } = useAuth();

  const handleLangChange = (event: SelectChangeEvent) => {
    router.push(router.asPath, router.asPath, { locale: event.target.value});
  };
  
  const handleLogout = () => {
    localStorage.removeItem('access_token');
    setAuthState({ isAuthenticated: false, compareList: [], favoriteNumber: 0, });
  }

  useEffect(() => {
    setLang(router.locale)
  }, [ router.locale ]);

  return (
    <>
      <div className="flex h-[84px] sm:h-[104px] items-center justify-between w-full">
        <div className="flex flex-row justify-between sm:gap-4 md:gap-8 items-center sm:justify-start w-full sm:w-auto h-auto">
          <Link href={urlPathsEn.home} passHref>
            <Img
              className="w-[80px] h-[32px] object-cover sm:h-[58px] sm:w-[148px]"
              src={Logo.src}
              alt="logoOne"
            />
          </Link>
          <FormControl className="w-[70px] h-[32px] sm:w-[118px] sm:h-auto" size="small">
            <StyledSelect
              value={lang}
              onChange={handleLangChange}
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}
              defaultValue=""
            >
              { countries.map((item, index) => {
                return (
                <StyledMenuItem key={index} value={item.value}>
                  <div className="flex items-center justify-around w-full">
                    <Img
                      loading="lazy"
                      width="35"
                      height="30"
                      src={item.source}
                      alt=""
                      className="hidden sm:flex"
                    />
                    <span>{item.label}</span>
                  </div>
                </StyledMenuItem>
                )
              })
              }
            </StyledSelect>
          </FormControl>
          <div className="flex xl:hidden">
            {props.openSidebar ?
              <CloseIcon className="cursor-pointer"
                onClick={() => props.setOpenSidebar(false)}
              />
              :
              <StyledBarBarge badgeContent={authState.compareList.length}>
                <FaBars
                  onClick={() => props.setOpenSidebar(true)}
                  color={brandColors.black}
                  size={24}
                />
              </StyledBarBarge>}
          </div>
        </div>
        <div className="hidden gap-8 xl:flex items-center justify-start">
          <ul className="hidden flex-row gap-8 sm:flex items-center justify-start w-auto sm:w-full common-row-list">
            <li>
              <Link href="/">
                <Text
                  className="text-base text-gray-0 hover:text-mainBlue cursor-pointer"
                  size="txtIBMPlexSansMedium16Gray800"
                >
                  Home
                </Text>
              </Link>
            </li>
            <li>
              {/* <div className="flex flex-row gap-1 items-center justify-start">
                <Link href="/en/creditcard">
                  <Text
                    className="text-base text-gray-0 hover:text-mainBlue w-auto cursor-pointer"
                    size="txtIBMPlexSansMedium16Gray800"
                  >
                    Service
                  </Text>
                </Link>
                <KeyboardArrowDownIcon className="text-base" />
              </div> */}
              <Link href="/en/creditcard">
                <Text
                  className="text-base text-gray-0 hover:text-mainBlue w-auto cursor-pointer"
                  size="txtIBMPlexSansMedium16Gray800"
                >
                  Credit Cards
                </Text>
              </Link>
            </li>
            <li>
              <Link href="/en/loan">
                <Text
                  className="text-base cursor-pointer text-gray-0 hover:text-mainBlue"
                  size="txtIBMPlexSansMedium16Pink600"
                >
                  Loans
                </Text>
              </Link>
            </li>
            <li>
              <Text
                className="text-base text-gray-0 hover:text-mainBlue cursor-pointer"
                size="txtIBMPlexSansMedium16Gray800"
              >
                FAQ
              </Text>
            </li>
            <li>
              <Text
                className="text-base text-gray-0 hover:text-mainBlue cursor-pointer"
                size="txtIBMPlexSansMedium16Gray800"
              >
                About
              </Text>
            </li>
            <li>
              <Text
                className="text-base text-gray-0 hover:text-mainBlue cursor-pointer"
                size="txtIBMPlexSansMedium16Gray800"
              >
                Tools
              </Text>
            </li>
          </ul>
          {authState.isAuthenticated && <div className="flex gap-6 items-center justify-center w-auto">
            <div className="flex flex-col items-center justify-start w-[22px]">
              <StyledBadge badgeContent={authState.compareList.length}>
                { authState.compareList.length > 0 ?
                  <Img
                    className="h-[22px] rounded-bl rounded-br w-[22px]"
                    src={Compare_active.src}
                    alt="user"
                  />
                  :
                  <Img
                    className="h-[22px] rounded-bl rounded-br w-[22px]"
                    src={Compare.src}
                    alt="user"
                  />
                }
              </StyledBadge>
            </div>
            <div className="flex flex-col items-center justify-start w-[22px]">
              <StyledBadge badgeContent={authState.favoriteNumber}>
                { authState.favoriteNumber > 0 ?
                  <Img
                    className="h-[22px] rounded-bl rounded-br w-[22px]"
                    src={Favorite.src}
                    alt="user"
                  />
                  :
                  <Img
                    className="h-[22px] rounded-bl rounded-br w-[22px]"
                    src={Favorite_inactive.src}
                    alt="user"
                  />
                }
              </StyledBadge>
            </div>
            {/* <div className="flex flex-col items-center justify-start w-[30px]">
              <div className="relative w-[30px]">
                <StyledBadge badgeContent={authState.favoriteNumber}>
                  <Img
                    className="h-[22px] mt-auto w-[22px]"
                    src={Favorite.src}
                    alt="iconhavefavorit"
                  />
                </StyledBadge>
              </div>
            </div> */}
          </div>}
        </div>
        {authState.isAuthenticated ?<div className="hidden xl:flex items-center justify-start w-auto">
          <Button
            className="bg-transparent cursor-pointer border border-mainBlue font-ibmplexsans font-medium leading-[normal] min-w-[72px] text-base text-center"
            shape="round"
            size="md"
            onClick={handleLogout}
          >Log out</Button>
        </div>
        : 
        <div className="hidden xl:flex gap-4 items-center justify-start w-auto">
          <Link href="/en/signup">
            <Button
              className="cursor-pointer border border-mainBlue bg-mainBlue text-white-A700 font-ibmplexsans font-medium leading-[normal] min-w-[128px] text-base text-center"
              shape="round"
              size="md"
            >Register now</Button>
          </Link>
          <Link href="/en/signin">
            <Button
              className="bg-transparent cursor-pointer border border-mainBlue font-ibmplexsans font-medium leading-[normal] min-w-[72px] text-base text-center"
              shape="round"
              size="md"
            >Login</Button>
          </Link>
        </div>}
      </div>
      <Line className="bg-blue_gray-100_7f h-px w-full" />
    </>
  );
}

export default Header;
