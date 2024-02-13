import { brandColors } from "../../utils/helpers";
import React from "react";
import Img from '../Img';
import styled from "styled-components";
import Link from "next/link";
import Text from "../Text";
import { Button } from "../Button";
import { Line } from "../Line";

type Props = {};

function Footer(props: Props) {
  return (
    <div className="bg-blue_gray-900 flex flex-col gap-12 items-center justify-center w-full py-16">
      <div className="flex flex-col gap-8 items-center justify-center px-4 sm:px-6 md:px-8 lg:px-12 xl:px-18 sm:w-full">
        <div className="flex flex-col gap-4 items-center justify-start w-auto sm:w-full">
          <Text
            className="md:text-3xl sm:text-[28px] text-[32px] text-center text-white-A700 w-auto"
            size="txtIBMPlexSansSemiBold32"
          >
            No long-term contracts
          </Text>
          <Text
            className="text-blue_gray-100_7f text-center text-lg w-auto"
            size="txtIBMPlexSansSemiBold18Bluegray1007f"
          >
            Start the 30 day trial version. You can cancel it at any time
          </Text>
        </div>
        <div className="flex gap-4 items-center justify-center w-auto">
          <Button
            className="cursor-pointer flex items-center justify-center min-w-[111px] outline outline-[0.5px] outline-blue_gray-800_7f"
            rightIcon={
              <Img
                className="h-6 ml-3"
                src="/img/img_overflowmenu.svg"
                alt="overflow_menu"
              />
            }
            shape="round"
            color="white_A700"
            size="md"
            variant="fill"
          >
            <div className="!text-blue_gray-800 font-ibmplexsans font-medium leading-[normal] text-base text-left">
              Demo
            </div>
          </Button>
          <Button
            className="cursor-pointer font-ibmplexsans font-medium h-12 leading-[normal] text-base text-center"
            shape="round"
            size="md"
            variant="gradient"
            color="pink_600_purple_800"
          >
            Apply now
          </Button>
        </div>
      </div>
      <Line className="bg-blue_gray-100_7f h-px w-full" />
      <div className="flex flex-col md:flex-row items-center justify-between px-4 sm:px-6 md:px-8 lg:px-12 xl:px-18 w-full">
        <div className="flex flex-col gap-6 items-start justify-between">
          <div className="flex flex-col gap-4 items-start justify-start">
            <Img
              className="h-16 object-cover w-[200px]"
              src="/img/img_logwhite.png"
              alt="logwhite"
            />
            <Text
              className="text-base text-blue_gray-100"
              size="txtIBMPlexSansMedium16Bluegray100"
            >
              Design an amazing digital experience that creates more happiness
              in the world.
            </Text>
          </div>
          <ul className="hidden sm:flex flex-row gap-8 items-center justify-center">
            <li>
              <Text
                className="text-base text-blue_gray-100_7f"
                size="txtIBMPlexSansMedium16Bluegray1007f"
              >
                Main
              </Text>
            </li>
            <li>
              <Text
                className="text-base text-blue_gray-100_7f"
                size="txtIBMPlexSansMedium16Bluegray1007f"
              >
                Service
              </Text>
            </li>
            <li>
              <Text
                className="text-base text-blue_gray-100_7f"
                size="txtIBMPlexSansMedium16Bluegray1007f"
              >
                Loans
              </Text>
            </li>
            <li>
              <Text
                className="text-base text-blue_gray-100_7f"
                size="txtIBMPlexSansMedium16Bluegray1007f"
              >
                FAQ
              </Text>
            </li>
            <li>
              <Text
                className="text-base text-blue_gray-100_7f"
                size="txtIBMPlexSansMedium16Bluegray1007f"
              >
                About
              </Text>
            </li>
            <li>
              <Text
                className="text-base text-blue_gray-100_7f"
                size="txtIBMPlexSansMedium16Bluegray1007f"
              >
                Tools
              </Text>
            </li>
          </ul>
        </div>
        <div className="flex flex-col gap-4 items-center mt-4 md:mt-0 justify-start w-auto">
          <Text
            className="text-base text-left text-white-A700 w-auto"
            size="txtIBMPlexSansMedium16WhiteA700"
          >
            Download app here
          </Text>
          <div className="flex flex-col gap-4 items-start justify-start w-auto">
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
              <div className="flex flex-row gap-2 items-center justify-between w-[92%] md:w-full">
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
      <div className="flex flex-col sm:flex-row items-center justify-between px-4 sm:px-6 md:px-8 lg:px-12 xl:px-18 w-full">
        <Text
          className="text-base text-blue_gray-300 w-auto"
          size="txtAbelRegular16"
        >
          © 2024 BONOKY UI. All rights reserved.
        </Text>
        <div className="flex flex-row gap-6 items-center justify-start w-auto">
          <Img
            className="h-6 w-6"
            src="/img/img_socialicon.svg"
            alt="socialicon"
          />
          <Img className="h-6 w-6" src="/img/img_link.svg" alt="link" />
          <Img
            className="h-6 w-6"
            src="/img/img_socialicon_blue_gray_300.svg"
            alt="socialicon_One"
          />
          <Img
            className="h-6 w-6"
            src="/img/img_socialicon_blue_gray_300_24x24.svg"
            alt="socialicon_Two"
          />
          <Img
            className="h-6 w-6"
            src="/img/img_socialicon_24x24.svg"
            alt="socialicon_Three"
          />
          <Img className="h-6 w-6" src="/img/img_globe.svg" alt="globe" />
        </div>
      </div>
    </div>
  );
}

export default Footer;
