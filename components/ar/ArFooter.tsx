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
            لا عقود طويلة الأجل.
          </Text>
          <Text
            className="text-blue_gray-100_7f text-center text-lg w-auto"
            size="txtIBMPlexSansSemiBold18Bluegray1007f"
          >
            ابدأ تجربتك المجانية لمدة 30 يومًا. إلغاء في أي وقت.
          </Text>
        </div>
        <div className="flex gap-4 items-center justify-center w-auto">
          <Button
            className="cursor-pointer flex items-center justify-center min-w-[111px] outline outline-[0.5px] outline-blue_gray-800_7f"
            rightIcon={
              <Img
                className="h-6 ml-3"
                src="img/img_overflowmenu.svg"
                alt="overflow_menu"
              />
            }
            shape="round"
            color="white_A700"
            size="md"
            variant="fill"
          >
            <div className="!text-blue_gray-800 font-ibmplexsans font-medium leading-[normal] text-base text-right">
              العرض التوضيحي
            </div>
          </Button>
          <Button
            className="cursor-pointer font-ibmplexsans font-medium h-12 leading-[normal] text-base text-center"
            shape="round"
            size="md"
            variant="gradient"
            color="pink_600_purple_800"
          >
            ابدأ الآن
          </Button>
        </div>
      </div>
      <Line className="bg-blue_gray-100_7f h-px w-full" />
      <div className="flex flex-col md:flex-row items-center justify-between px-4 sm:px-6 md:px-8 lg:px-12 xl:px-18 w-full">
        <div className="flex flex-col gap-4 items-center mt-4 md:mt-0 justify-start w-auto">
          <Text
            className="text-base text-right text-white-A700 w-auto"
            size="txtIBMPlexSansMedium16WhiteA700"
          >
            احصل عل التطبيق... قريبا
          </Text>
          <div className="flex flex-col gap-4 items-start justify-start w-auto">
            <div className="border border-solid border-white-A700 flex flex-col items-start justify-end p-1.5 rounded-[7px] w-full">
              <div className="flex flex-row gap-[7px] items-start justify-start md:ml-[0] ml-[3px] w-[81%] md:w-full">
                <Img
                  className="h-[21px]"
                  src="img/img_user_white_a700.svg"
                  alt="user_One"
                />
                <div className="flex flex-col items-start justify-start w-[76%]">
                  <Img
                    className="h-1.5"
                    src="img/img_settings_white_a700.svg"
                    alt="settings_One"
                  />
                  <Img
                    className="h-[15px] mt-0.5"
                    src="img/img_settings_white_a700_15x75.svg"
                    alt="settings_Two"
                  />
                </div>
              </div>
            </div>
            <div className="border border-solid border-white-A700 flex flex-col items-center justify-end p-[5px] rounded-[5px] w-full">
              <div className="flex flex-row gap-2 items-center justify-between w-[92%] md:w-full">
                <Img
                  className="h-[25px]"
                  src="img/img_subtract.svg"
                  alt="subtract"
                />
                <div className="flex flex-col items-start justify-start">
                  <Img
                    className="h-1.5"
                    src="img/img_settings_white_a700_6x38.svg"
                    alt="settings_Three"
                  />
                  <Img
                    className="h-[17px] mt-[3px]"
                    src="img/img_settings_white_a700_17x84.svg"
                    alt="settings_Four"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-6 items-end justify-between">
          <div className="flex flex-col gap-4 items-end justify-start">
            <div className="flex flex-col justify-start w-auto">
              <div className="flex flex-row gap-[11px] items-center justify-between">
                <Img className="h-[43px]" src="img/img_.svg" alt="Six" />
                <Img
                  className="h-[43px] object-cover"
                  src="img/img_logofav1.png"
                  alt="logofavOne"
                />
              </div>
              <Img
                className="h-1 ml-5 md:ml-[0]"
                src="img/img_bonoky.svg"
                alt="bonoky"
              />
            </div>
            <Text
              className="text-base text-right text-blue_gray-100"
              size="txtIBMPlexSansMedium16Bluegray100"
            >
              صمم تجربة رقمية مذهلة تخلق المزيد من السعادة في العالم.
            </Text>
          </div>
          <ul className="hidden sm:flex flex-row gap-8 items-center justify-center">
            <li>
              <Text
                className="text-base text-blue_gray-100_7f"
                size="txtIBMPlexSansMedium16Bluegray1007f"
              >
                خصوصية
              </Text>
            </li>
            <li>
              <Text
                className="text-base text-blue_gray-100_7f"
                size="txtIBMPlexSansMedium16Bluegray1007f"
              >
                يساعد
              </Text>
            </li>
            <li>
              <Text
                className="text-base text-blue_gray-100_7f"
                size="txtIBMPlexSansMedium16Bluegray1007f"
              >
                وظائف
              </Text>
            </li>
            <li>
              <Text
                className="text-base text-blue_gray-100_7f"
                size="txtIBMPlexSansMedium16Bluegray1007f"
              >
                التسعير
              </Text>
            </li>
            <li>
              <Text
                className="text-base text-blue_gray-100_7f"
                size="txtIBMPlexSansMedium16Bluegray1007f"
              >
                سمات
              </Text>
            </li>
            <li>
              <Text
                className="text-base text-blue_gray-100_7f"
                size="txtIBMPlexSansMedium16Bluegray1007f"
              >
                ملخص
              </Text>
            </li>
          </ul>
        </div>
      </div>
      <Line className="bg-blue_gray-100_7f h-px w-full" />
      <div className="flex flex-col sm:flex-row items-center justify-between px-4 sm:px-6 md:px-8 lg:px-12 xl:px-18 w-full">
        <div className="flex flex-row gap-6 items-center justify-start w-auto">
          <Img
            className="h-6 w-6"
            src="img/img_socialicon.svg"
            alt="socialicon"
          />
          <Img className="h-6 w-6" src="img/img_link.svg" alt="link" />
          <Img
            className="h-6 w-6"
            src="img/img_socialicon_blue_gray_300.svg"
            alt="socialicon_One"
          />
          <Img
            className="h-6 w-6"
            src="img/img_socialicon_blue_gray_300_24x24.svg"
            alt="socialicon_Two"
          />
          <Img
            className="h-6 w-6"
            src="img/img_socialicon_24x24.svg"
            alt="socialicon_Three"
          />
          <Img className="h-6 w-6" src="img/img_globe.svg" alt="globe" />
        </div>
        <Text
          className="text-base text-blue_gray-300 w-auto"
          size="txtAbelRegular16"
        >
          © 2024 BONOKY UI. All rights reserved.
        </Text>
      </div>
    </div>
  );
}

export default Footer;
