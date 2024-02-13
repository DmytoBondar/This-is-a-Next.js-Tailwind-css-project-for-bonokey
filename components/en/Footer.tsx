import { brandColors } from "../../utils/helpers";
import React from "react";
import Img from '../Img';
import styled from "styled-components";
import Link from "next/link";
import Text from "../Text";
import { Button } from "../Button";
import { Line } from "../Line";
import TextField from '@mui/material/TextField';
import WhiteLogo from '../../img/logo-white.svg';

type Props = {};

const CssStyledTextfield = styled(TextField)({
  '& .MuiInputBase-input':{
    borderRadius: '40px',
    padding: '12px 16px',
    lineHeight: '1.25rem',
    fontFamily: 'IBM Plex Sans',
    fontSize: '1rem',
  },
  '& .MuiInputBase-input:active': {
    border: 'none !important',
  },
  '& .MuiOutlinedInput-root': {
    borderRadius: '40px',
  },
  '& .MuiOutlinedInput-root:focus': {
    border: 'none !important',
  },
})
function Footer(props: Props) {
  return (
    <div className="bg-blue_gray-900 flex flex-col gap-6 sm:gap-12 items-center justify-center w-full py-8 sm:py-16">
      <div className="flex flex-col md:flex-row gap-6 sm:gap-8 items-center md:items-end justify-center px-4 sm:px-6 md:px-8 lg:px-12 xl:px-24 sm:w-full">
        <div className="flex flex-col md:flex-row gap-4 md:gap-11 items-start md:items-center  justify-start md:w-1/2">
          <Img
            className="h-[44px] w-[62px] sm:h-[100px] sm:w-auto max-h-[100px]"
            src="/img/img_iconnewsletter.svg"
            alt="iconnewsletter"
          />
          <div className="flex flex-1 flex-col gap-2 items-center md:items-start justify-start max-w-[400px]">
            <Text
              className="md:text-3xl sm:text-[24px] text-lg text-left text-white-A700 w-full font-ibmplexsans"
            >
              Newsletter subscription
            </Text>
            <Text
              className="leading-[130.00%] max-w-[388px] md:max-w-full text-sm sm:text-base text-left text-blue_gray-100_7f font-ibmplexsans"
            >
              Subscribe to our newsletter and get promos, new arrivals and stock updates straight to your inbox.
            </Text>
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-4 items-center justify-start sm:w-1/2 w-full">
          <CssStyledTextfield
            hiddenLabel
            name="textfield"
            placeholder="Put your e-mail here"
            type="email"
            className="bg-white-A700 font-ibmplexsans font-medium leading-[normal] md:h-auto p-0 mx-6 rounded-[40px] placeholder:text-blue_gray-800_7f sm:h-auto text-base text-left w-full"
          ></CssStyledTextfield>
          <Button
            className="flex flex-row items-center justify-center cursor-pointer bg-[#FB542B] text-white-A700 font-ibmplexsans font-medium h-11 leading-[normal] text-sm sm:text-base text-center sm:w-48 w-full"
            shape="round"
            size="md"
          >
            Subscribe
          </Button>
        </div>
      </div>
      <Line className="bg-blue_gray-100_7f h-px w-full" />
      <div className="flex flex-col md:flex-row items-center justify-between px-4 sm:px-6 md:px-8 lg:px-12 xl:px-24 w-full">
        <div className="flex flex-col gap-6 items-start justify-between">
          <div className="flex flex-col gap-4 items-start justify-start">
            <Img
              className="w-[80px] h-[32px] object-cover sm:h-[58px] sm:w-[148px]"
              src={WhiteLogo.src}
              alt="logwhite"
            />
            <Text
              className="text-[12px] sm:text-base text-blue_gray-100"
              size="txtIBMPlexSansMedium16Bluegray100"
            >
              Design an amazing digital experience that creates more happiness in the world.
            </Text>
          </div>
          <ul className="flex flex-row w-full sm:gap-8 items-center justify-between sm:justify-start">
            <li>
              <Text
                className="text-sm sm:text-base text-blue_gray-100_7f"
                size="txtIBMPlexSansMedium16Bluegray1007f"
              >
                Main
              </Text>
            </li>
            <li>
              <Text
                className="text-sm sm:text-base text-blue_gray-100_7f"
                size="txtIBMPlexSansMedium16Bluegray1007f"
              >
                Service
              </Text>
            </li>
            <li>
              <Text
                className="text-sm sm:text-base text-blue_gray-100_7f"
                size="txtIBMPlexSansMedium16Bluegray1007f"
              >
                Loans
              </Text>
            </li>
            <li>
              <Text
                className="text-sm sm:text-base text-blue_gray-100_7f"
                size="txtIBMPlexSansMedium16Bluegray1007f"
              >
                FAQ
              </Text>
            </li>
            <li>
              <Text
                className="text-sm sm:text-base text-blue_gray-100_7f"
                size="txtIBMPlexSansMedium16Bluegray1007f"
              >
                About
              </Text>
            </li>
            <li>
              <Text
                className="text-sm sm:text-base text-blue_gray-100_7f"
                size="txtIBMPlexSansMedium16Bluegray1007f"
              >
                Tools
              </Text>
            </li>
          </ul>
        </div>
        <div className="flex flex-col gap-4 items-center mt-4 md:mt-0 justify-start w-full sm:w-auto">
          <Text
            className="text-sm sm:text-base text-left text-white-A700 w-full sm:w-auto"
            size="txtIBMPlexSansMedium16WhiteA700"
          >
            Download app here
          </Text>
          <div className="flex flex-row sm:flex-col gap-4 items-start justify-start w-full sm:w-auto">
            <div className="border border-solid border-white-A700 flex flex-col items-start justify-end p-1.5 rounded-[7px] w-full">
              <div className="flex flex-row gap-[7px] items-start justify-start md:ml-[0] ml-[3px] w-[81%] md:w-full">
                <Img
                  className="h-[21px]"
                  src="/img/img_user_white_a700.svg"
                  alt="user_One"
                />
                <div className="flex flex-col items-start justify-start w-[76%]">
                  <Img
                    className="h-1.5"
                    src="/img/img_settings_white_a700.svg"
                    alt="settings_One"
                  />
                  <Img
                    className="h-[15px] mt-0.5"
                    src="/img/img_settings_white_a700_15x75.svg"
                    alt="settings_Two"
                  />
                </div>
              </div>
            </div>
            <div className="border border-solid border-white-A700 flex flex-col items-center justify-end p-[5px] rounded-[5px] w-full">
              <div className="flex flex-row gap-2 items-center justify-start w-[92%] md:w-full">
                <Img
                  className="h-[25px]"
                  src="/img/img_subtract.svg"
                  alt="subtract"
                />
                <div className="flex flex-col items-start justify-start">
                  <Img
                    className="h-1.5"
                    src="/img/img_settings_white_a700_6x38.svg"
                    alt="settings_Three"
                  />
                  <Img
                    className="h-[17px] mt-[3px]"
                    src="/img/img_settings_white_a700_17x84.svg"
                    alt="settings_Four"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Line className="bg-blue_gray-100_7f h-px w-full" />
      <div className="flex flex-col-reverse  sm:flex-row items-center justify-between gap-6 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-24 w-full">
        <Text
          className="text-base text-left text-blue_gray-300 w-full sm:w-auto"
          size="txtAbelRegular16"
        >
          &#169; 2024 Bonoky UI. All rights reserved.
        </Text>
        <div className="flex flex-row gap-6 items-center justify-between sm:justify-start w-full sm:w-auto">
          <Img
            className="h-5 w-5 sm:h-6 sm:w-6"
            src="/img/img_socialicon.svg"
            alt="socialicon"
          />
          <Img className="h-5 w-5 sm:h-6 sm:w-6" src="/img/img_link.svg" alt="link" />
          <Img className="h-5 w-5 sm:h-6 sm:w-6"
            src="/img/img_socialicon_blue_gray_300.svg"
            alt="socialicon_One"
          />
          <Img className="h-5 w-5 sm:h-6 sm:w-6"
            src="/img/img_socialicon_blue_gray_300_24x24.svg"
            alt="socialicon_Two"
          />
          <Img
            className="h-5 w-5 sm:h-6 sm:w-6"
            src="/img/img_socialicon_24x24.svg"
            alt="socialicon_Three"
          />
          <Img className="h-5 w-5 sm:h-6 sm:w-6" src="/img/img_globe.svg" alt="globe" />
        </div>
      </div>
    </div>
  );
}

export default Footer;
