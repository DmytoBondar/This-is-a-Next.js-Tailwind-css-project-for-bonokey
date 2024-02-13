import { useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../context/AuthContext";
import Header from "./en/Header";

import ArNavbar from "./ar/ArNavbar";

import Footer from "./en/Footer";
import ArFooter from "./ar/ArFooter";
import Text from "./Text";
import Link from "next/link";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import styled from "styled-components";
import Badge from '@mui/material/Badge';
import Img from './Img';
import { Button } from "./Button";
import { Line } from "../components/Line";
import Compare from "../img/compare.svg";
import Compare_active from "../img/compare-active.svg";
import Favorite from "../img/favorites.svg";
import Favorite_inactive from "../img/favorite_inactive.svg";


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


export default function Layout({ children }) {
  const router = useRouter();
  const [openSidebar, setOpenSidebar] = useState(false);
  const {authState, setAuthState} = useAuth();
  const Navigate = (url : string) => {
    setOpenSidebar(false);
    router.push(url);
  }
  const handleLogout = () => {
    localStorage.removeItem('access_token');
    setAuthState({ isAuthenticated: false, compareList: authState.compareList, favoriteNumber: 0});
  }

  return (
    <>
      <main className="flex flex-col items-center justify-start px-4 sm:px-6 md:px-8 lg:px-12 xl:px-24 w-full bg-white-A700">
        { router.locale == 'en-US' ? 
        <Header openSidebar={openSidebar} setOpenSidebar={setOpenSidebar} /> : 
        <ArNavbar openSidebar={openSidebar} setOpenSidebar={setOpenSidebar} />}
        {openSidebar &&
        <div className="w-full flex xl:hidden flex-col py-6 justify-between" style={{height: 'calc(100vh - 84px)'}}>
          <ul className="flex flex-col gap-6 px-4 sm:flex items-start justify-start w-auto sm:w-full common-row-list">
            <li>
              <Text
                className="text-base text-gray-0 hover:text-mainBlue text-left"
                size="txtIBMPlexSansMedium16Gray800"
              >
                Home
              </Text>
            </li>
            <li>
              {/* <div className="flex flex-row gap-1 items-center justify-start">
                <Text
                  className="text-base text-gray-0 hover:text-mainBlue w-auto"
                  size="txtIBMPlexSansMedium16Gray800"
                  onClick={() => {Navigate("/en/creditcard")}}
                >
                  Service
                </Text>
                <KeyboardArrowDownIcon className="text-base" />
              </div> */}
              <Text
                  className="text-base text-gray-0 hover:text-mainBlue w-auto"
                  size="txtIBMPlexSansMedium16Gray800"
                  onClick={() => {Navigate("/en/creditcard")}} 
                >
                Credit Cards
              </Text>
            </li>
            <li>
              <Text
                className="text-base cursor-pointer text-gray-0 hover:text-mainBlue"
                size="txtIBMPlexSansMedium16Pink600"
                onClick={() => {Navigate("/en/loan")}}
              >
                Loans
              </Text>
            </li>
            <li>
              <Text
                className="text-base text-gray-0 hover:text-mainBlue"
                size="txtIBMPlexSansMedium16Gray800"
              >
                FAQ
              </Text>
            </li>
            <li>
              <Text
                className="text-base text-gray-0 hover:text-mainBlue"
                size="txtIBMPlexSansMedium16Gray800"
              >
                About
              </Text>
            </li>
            <li>
              <Text
                className="text-base text-gray-0 hover:text-mainBlue"
                size="txtIBMPlexSansMedium16Gray800"
              >
                Tools
              </Text>
            </li>
          </ul>
          {authState.isAuthenticated && <div className="flex flex-col gap-4 items-start justify-center w-auto">
            <div className="flex flex-row items-center justify-start">
              <div className="flex flex-col items-center mx-4 justify-start w-[22px]">
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
              <span className={`font-ibmplexsans font-medium text-sm ${authState.compareList.length > 0?'text-[#3559E0]':'text-[#34405440]'}`}>Compare</span>
            </div>
            <Line className="bg-blue_gray-100_7f h-px w-full" />
            <div className="flex flex-row items-center justify-start">
              <div className="relative mx-4">
                <StyledBadge badgeContent={authState.favoriteNumber}>
                  <Img
                    className="h-[22px] w-[22px]"
                    src={Favorite.src}
                    alt="iconhavefavorit"
                  />
                </StyledBadge>
              </div>
              <span className={`font-ibmplexsans font-medium text-sm ${authState.favoriteNumber > 0?'text-[#3559E0]':'text-[#34405440]'}`}>Favorite</span>
            </div>
          </div>}
          
          {authState.isAuthenticated?
            <div className="flex flex-col w-auto items-center">
              <Button
                className="bg-transparent cursor-pointer border border-mainBlue font-ibmplexsans font-medium leading-[normal] w-full text-base text-center"
                shape="round"
                size="md"
                onClick={handleLogout}
              >Log out</Button>
            </div>
            :<div className="flex flex-col gap-4 items-center justify-start w-auto">
              <Button
                className="cursor-pointer border border-mainBlue bg-mainBlue text-white-A700 font-ibmplexsans font-medium leading-[normal] w-full text-base text-center"
                shape="round"
                size="md"
                onClick={() => Navigate("/en/signup")}
              >Register now</Button>
              <Button
                className="bg-transparent cursor-pointer border border-mainBlue font-ibmplexsans font-medium leading-[normal] w-full text-base text-center"
                shape="round"
                size="md"
                onClick={() => Navigate("/en/signin")}
              >Login</Button>
            </div>}
        </div>}
        {children}
      </main>
      { router.locale == 'en-US' ? <Footer /> : <ArFooter />}
    </>
  )
}