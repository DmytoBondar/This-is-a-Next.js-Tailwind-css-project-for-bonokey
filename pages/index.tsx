import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Img from '../components/Img';
import Link from "next/link";
import CollapsibleCard from "../components/Card/CollapsibleCard";
import SearchIcon from "@mui/icons-material/Search";
import TextField from '@mui/material/TextField';
import { Button } from "../components/Button";

import MoneyWithWings from "../img/Money with wings.svg";
import BackgroundImg from "../img/Bg.svg";
import CreditCard from "../img/Content.svg";
import PersonalLoan from "../img/personal-loan.svg";
import FinancialAdvisor from "../img/financial-advisor.svg";
import ComingSoon from "../img/Coming soon.svg";
import Logo1 from "../img/Logo1.svg";
import Logo2 from "../img/logo2.svg";
import Logo3 from "../img/logo3.svg";
import Logo4 from "../img/logo4.svg";
import Logo5 from "../img/logo5.svg";
import IPhone from "../img/iPhone 15 Pro.svg";
import MaxBook from "../img/MacBook Pro 16.svg";
import Img3 from "../img/img3.png";
import Img4 from "../img/Img4.png";
import Sparkles from "../img/Sparkles.svg";
import Benefits from "../img/Benefits.svg";
import LightBlub from "../img/Light bulb.svg";
import TwitterIcon from "../img/twitterIcon.svg";
import LinkedinIcon from "../img/Linkedin icon.svg";
import InstagramIcon from "../img/instagram.svg";
import ContackBg from "../img/Contact Bg.svg";
import VectorBg from "../img/Vector 160.svg";

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

type Faq = {
  question: string,
  answer: string,
}
function Index() {

  const [searchWord, setSearchWord] = useState("");
  const [faqs, setFaqs] = useState<Faq[]>([]);
  const handleSearchChange = (event) => {
    setSearchWord(event.target.value);
  }
 
  const loadFaqs = async () => {
    const res = await fetch(`/api/getFaqs`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await res.json();
    if(json.status == "success") {
      setFaqs(json.data);
    }
  }

  useEffect(() => {
    loadFaqs();
  }, [])

  return (
    <div className="w-full">
      <div className="flex flex-col items-start -mx-4 sm:-mx-6 md:-mx-8 lg:-mx-18 xl:-mx-24 box-border w-screen gap-6 sm:gap-11 ">
        <div className="flex flex-col gap-8 py-20 w-full relative overflow-hidden bg-[#EEEEEEB2] rounded-3xl px-4 sm:px-[100px]">
          <div className="flex flex-col gap-6 z-10 max-w-fit">
            <div className="flex flex-row items-center gap-3 sm:gap-4 py-1 px-3 sm:px-8 rounded-3xl bg-white-A700 max-w-fit">
              <Img src={MoneyWithWings.src} className="w-6 h-6sm:w-[44px] sm:h-[44px]" />
              <span className="text-sm sm:text-lg font-ibmplexsans font-semibold text-[#343546]">+160</span>
              <span className="font-medium text-sm sm:text-base font-ibmplexsans text-gray-700 opacity-75">financial products to select from</span>
            </div>
            <p className="text-[28px] sm:text-[48px] font-ibmplexsans text-[#2A3139] max-w-[560px] leading-tight font-semibold">Bonokey - Your Financial Compass in Saudi Arabia</p>
            <span className="text-base sm:text-[20px] font-normal font-ibmplexsans leading-normal text-gray-700 opacity-75">Discover the Best Financial Products with Ease</span>
          </div>
          <div className="flex flex-row gap-2 items-center z-10 w-full sm:w-auto">
            <Link href="/en/creditcards"><button className="bg-[#A3278F] text-white-A700 font-ibmplexsans font-medium text-sm sm:text-base px-6 py-2 rounded-3xl w-1/2 sm:min-w-[130px] sm:w-[130px]">Credit card</button></Link>
            <Link href="/en/loans"><button className="bg-[#4F30AB] text-white-A700 font-ibmplexsans font-medium text-sm sm:text-base px-6 py-2 rounded-3xl w-1/2 sm:min-w-[130px] sm:w-[130px]">Loans</button></Link>
          </div>
        </div>
        <div className="absolute w-full top-0 left-0 right-0">
          {/* <Img src={BackgroundImg.src} className="w-full h-[720px]"/> */}
        </div>
      </div>
      <div className="flex flex-col sm:grid sm:grid-cols-3 gap-8 items-center py-10 sm:py-24">
        <div className="relative">
          <Img src={CreditCard.src} className="absolute z-10 w-full h-auto"/>
          <div className="bg-[#4F30AB19] pt-48 px-3 pb-3 sm:px-6 sm:pb-6 rounded-2xl sm:rounded-3xl flex flex-col gap-4 mt-36 sm:mt-72">
            <span className="text-[22px] sm:text-[40px] font-semibold font-ibmplexsans leading-tight">Credit Card</span>
            <div className="p-3 sm:p-5 rounded-2xl sm:rounded-3xl gap-4 bg-white-A700 flex flex-col items-start">
              <p className="text-lg font-normal text-gray-700 opacity-75">Find the card that matches your lifestyle, spending habits, and rewards preferences.</p>
              <div className="p-3 text-[#4F30AB88] bg-[#4F30AB08] text-base rounded-3xl ">Learn more</div>
            </div>
          </div>
        </div>
        <div className="relative">
          <Img src={PersonalLoan.src} className="absolute z-10 w-full h-auto"/>
          <div className="bg-[#4F30AB19] pt-48 px-3 pb-3 sm:px-6 sm:pb-6 rounded-2xl sm:rounded-3xl flex flex-col gap-4 mt-36 sm:mt-72">
            <span className="text-[22px] sm:text-[40px] font-semibold font-ibmplexsans leading-tight">Personal Loan</span>
            <div className="p-3 sm:p-5 rounded-2xl sm:rounded-3xl gap-4 bg-white-A700 flex flex-col items-start">
              <p className="text-lg font-normal text-gray-700 opacity-75">Explore options with the best rates and terms suited for your financial goals.</p>
              <div className="p-3 text-[#4F30AB88] bg-[#4F30AB08] text-base rounded-3xl ">Learn more</div>
            </div>
          </div>
        </div>
        <div className="relative w-full">
          <Img src={FinancialAdvisor.src} className="absolute z-10 w-full h-auto"/>
          <div className="bg-[#4F30AB19] pt-48 px-3 pb-3 sm:px-6 sm:pb-6 rounded-2xl sm:rounded-3xl flex flex-col gap-4 mt-36 sm:mt-72">
            <span className="text-[22px] sm:text-[40px] font-semibold font-ibmplexsans leading-tight">Financial advisor</span>
            <div className="p-3 sm:p-5 rounded-2xl sm:rounded-3xl gap-4 bg-white-A700 flex flex-col items-center justify-center">
              <Img src={ComingSoon.src} className="sm:h-[120px] w-auto"/>
            </div>
          </div>
        </div>
      </div>
      <div className="hidden sm:flex flex-row justify-between pb-10 sm:pb-24">
        <Img src={Logo1.src} className="max-h-14"/>
        <Img src={Logo2.src} className="max-h-14"/>
        <Img src={Logo3.src} className="max-h-14"/>
        <Img src={Logo4.src} className="max-h-14"/>
        <Img src={Logo5.src} className="max-h-14"/>
      </div>
      <div className="flex flex-col gap-12 pb-10 sm:pb-24">
        <span className="text-[22px] sm:text-[40px] font-semibold font-ibmplexsans">How does our service work?</span>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-6">
            <div className="flex flex-col relative overflow-hidden items-start rounded-2xl sm:rounded-[32px] bg-[#A3278F88] px-4 sm:px-6 py-4 w-full sm:w-2/5">
              <div className="flex flex-col justify-center gap-4 w-1/2 h-[160px] sm:h-[242px]">
                <div>
                  <span className="text-lg sm:text-[28px] font-ibmplexsans font-semibold text-[#2A3139]">Compare</span>
                  <p className="text-base sm:text-xl font-normal text-gray-700">Compare all eligible offers, APR, rates and terms all on one simple screen</p>
                </div>
              </div>
              <Img src={IPhone.src} className="h-[160px] sm:h-[242px] absolute left-1/2 w-auto" />
            </div>
            <div className="w-full h-[160px] sm:w-1/5 sm:h-auto rounded-2xl sm:rounded-[32px] overflow-hidden relative">
              <Img src={Img3.src} className="absolute max-w-[550px] h-[360px] -top-[165px] -left-[150px] sm:-top-[270px] sm:-left-[200px] sm:max-w-[700px] sm:h-[600px]"/>
            </div>
            <div className="flex flex-col relative overflow-hidden items-start rounded-2xl sm:rounded-[32px] bg-[#4F30AB1a] px-4 sm:px-6 py-4 w-full sm:w-2/5">
              <div className="flex flex-col items-center justify-center gap-4 w-1/2 h-[160px] sm:h-[242px]">
                <div>
                  <span className="text-lg sm:text-[28px] font-ibmplexsans font-semibold text-[#2A3139]">Get Advise</span>
                  <p className="text-base sm:text-xl font-normal text-gray-700">Based on your data, our Financial Advisor will help you decide on the best deal for you</p>
                </div>
              </div>
              <Img src={MaxBook.src} className="h-[160px] sm:h-[242px] absolute left-1/2 w-auto" />
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-6">
            <div className="w-full h-[160px] sm:w-1/2 sm:h-auto rounded-2xl sm:rounded-[32px] overflow-hidden relative">
              <Img src={Img4.src} className="absolute max-w-[380px] h-[300px] -top-[100px] left-0 sm:-top-[150px] sm:left-0 sm:w-[900px] sm:max-w-[900px] sm:h-[400px]"/>
            </div>
            <div className="flex flex-col w-full sm:w-1/2 h-auto rounded-2xl sm:rounded-[32px] gap-4 sm:gap-6 p-4 sm:p-6 bg-[#FB542B1B]">
              <div className="flex flex-col gap-4">
                <span className="text-base sm:text-[28px] font-ibmplexsans font-semibold text-[#2A3139]">Select</span>
                <p className="text-base sm:text-xl font-normal text-gray-700">Do not leave your home, or office, apply for the financial service directly</p>
              </div>
              <div className="flex flex-col items-start sm:flex-row gap-4 sm:gap-6 sm:items-center">
                <div className="rounded-[44px] bg-[#4F30AB] text-white-A700 cursor-pointer py-2 px-4 sm:py-4 sm:min-w-[186px] text-center">Contact bank</div>
                <div className="text-[#4F30AB] text-base sm:text-xl font-ibmplexsans font-normal relative">
                  <span>And that`s when the magic happens.</span>
                  <Img src={Sparkles.src} className="absolute right-4 -top-6 w-[33px] h-[33px] rotate-12"/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Benefit section */}
      <div className="flex flex-col items-center justify-center -mx-4 sm:-mx-8 relative overflow-hidden">
        <div className="z-10 flex flex-col items-center bg-[#171737] w-full rounded-2xl sm:rounded-[32px] py-28">
          <span className="z-10 text-white-A700 text-3xl max-w-[272px] sm:max-w-full sm:text-[40px] font-ibmplexsans font-semibold mb-4 text-center">Be ahead, use Bonokey!</span>
          <p className="z-10 text-[#A0A1B2] text-sm sm:text-lg max-w-[272px] sm:max-w-[600px] mb-6 text-center">Join the Bonokey Community! Experience the future of financial decision-making. Sign up today and start exploring your options with us - where finance meets simplicity and intelligence.</p>
          <Link href="/en/signup"><div className="z-10 bg-[#A3278F] text-white-A700 cursor-pointer py-2 px-6 sm:py-3 min-w-[192px] rounded-[44px] text-center">Register now</div></Link>
          <Img src={Benefits.src} className="absolute  sm:top-0 sm:left-0 sm:right-0 sm:bottom-0 sm:h-full sm:w-full" />
        </div>
      </div>
      {/* Faq section */}
      <div className="flex flex-col mt-10 sm:mt-24 -mx-4 sm:-mx-6 md:-mx-8 lg:-mx-18 xl:-mx-24 box-border w-screen px-4 py-14 sm:p-24 bg-[#4F30AB1B] gap-6 sm:gap-12">
        <div className="flex flex-row justify-between items-center ">
          <span className="text-3xl sm:text-[40px] font-semibold font-ibmplexsans text-gray-0">FAQ</span>
          <div className={`w-auto flex flex-row items-center px-2 py-1 rounded-2xl mr-0 bg-white-A700 relative sm:max-w-[300px]`}>
            <SearchIcon className="w-6 h-6 sm:w-8 sm:h-8 text-blue_gray-800_bf" />
            <input className="border-0 flex-1 text-purple-800 flex max-w-[150px] sm:w-auto" placeholder="Search" value={searchWord} 
              onChange={handleSearchChange}
            />
          </div>
        </div>
        <div className="flex flex-col gap-4 sm:grid sm:grid-cols-2">
          {faqs.map((faq, index) => {
            return <CollapsibleCard key={index} question={faq.question} answer={faq.answer} minimized={false} />
          })}
          
        </div>
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="w-full cursor-pointer border-2 border-[#4F30AB] text-[#4F30AB] rounded-[44px] py-2 sm:py-3 sm:w-[184px] text-center">Show more</div>
          <div className="flex flex-row justify-between items-center gap-3">
            <Img src={LightBlub.src} className="w-8 h-8 sm:w-[44px] sm:h-[44px]"/>
            <span className="text-[#A3278F88] text-base sm:text-[22px] font-medium">Didn`t find the answer to your question? Ask here</span>
          </div>
        </div>
      </div>
      {/* Contact us */}
      <div className="flex flex-col -mx-4 sm:-mx-6 md:-mx-8 lg:-mx-18 xl:-mx-24 box-border w-screen px-4 py-14 sm:p-24 bg-[#4F30AB] gap-6 sm:gap-12 relative overflow-hidden">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between z-10 gap-6">
          <div className="flex flex-col items-start gap-2">
            <span className="text-white-A700 font-ibmplexsans font-medium sm:font-semibold text-[22px] sm:text-[40px] leading-normal">Contact us</span>
            <span className="text-white-A700 font-ibmplexsans text-base sm:text-lg font-light leading-normal">Have questions? Our team is ready to assist you.</span>
          </div>
          <div className="flex sm:hidden h-px bg-[#F0F0F0] opacity-50 w-full"></div>
          <div className="flex flex-row items-center gap-6 w-full sm:w-auto">
            <span className="text-[#F0F0F0] opacity-70 text-base sm:text-lg font-semibold w-full sm:w-auto">Follow us on:</span>
            <Img src={TwitterIcon.src} className="w-6 h-6 sm:w-8 sm:h-8" />
            <Img src={LinkedinIcon.src} className="w-6 h-6 sm:w-8 sm:h-8" />
            <Img src={InstagramIcon.src} className="w-6 h-6 sm:w-8 sm:h-8" />
          </div>
          <div className="flex sm:hidden h-px bg-[#F0F0F0] opacity-50 w-full"></div>
        </div>
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 z-10">
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-center sm:items-start w-full sm:w-1/2">
            <div className="flex flex-col items-start gap-4 sm:w-1/2 w-full">
              <span className="text-base sm:text-lg font-ibmplexsans font-semibold text-white-A700 opacity-75">Your name</span>
              <CssStyledTextfield
                hiddenLabel
                name="textfield"
                placeholder="Name"
                type="text"
                className="bg-white-A700 font-ibmplexsans font-medium leading-[normal] md:h-auto p-0 rounded-[40px] placeholder:text-blue_gray-800_7f sm:h-auto text-base text-left w-full"
              ></CssStyledTextfield>
            </div>
            <div className="flex flex-col items-start gap-4 sm:w-1/2 w-full">
              <span className="text-base sm:text-lg font-ibmplexsans font-semibold text-white-A700 opacity-75">E-mail</span>
              <CssStyledTextfield
                hiddenLabel
                name="textfield"
                placeholder="Put your e-mail here"
                type="email"
                className="bg-white-A700 font-ibmplexsans font-medium leading-[normal] md:h-auto p-0 rounded-[40px] placeholder:text-blue_gray-800_7f sm:h-auto text-base text-left w-full"
              ></CssStyledTextfield>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-end w-full sm:w-1/2">
            <div className="flex flex-col items-start gap-4 w-full">
              <span className="text-base sm:text-lg font-ibmplexsans font-semibold text-white-A700 opacity-75">Message</span>
              <CssStyledTextfield
                hiddenLabel
                name="textfield"
                placeholder="Put your message here"
                type="email"
                className="bg-white-A700 font-ibmplexsans font-medium leading-[normal] md:h-auto p-0 rounded-[40px] placeholder:text-blue_gray-800_7f sm:h-auto text-base text-left w-full"
              ></CssStyledTextfield>
            </div>
            <div className="flex flex-row items-center justify-center cursor-pointer rounded-[44px] bg-[#FB542B] text-white-A700 font-ibmplexsans font-medium leading-[normal] text-sm sm:text-base text-center py-3 w-full sm:w-48 ">
              Send
            </div>
          </div>
        </div>
        <Img src={ContackBg.src} className="absolute -top-[55px] left-[75px] max-w-[1000px] w-[1000px] h-[400px] sm:top-[44px] sm:left-[238px] sm:h-[290px] sm:w-[984px]" />
        <Img src={VectorBg.src} className="absolute top-0 -right-[100px] max-w-[691px] w-[691px] h-[626px] sm:top-0 sm:right-0 sm:h-[383px] sm:w-[423px]" />
      </div>
    </div>
  );
}

export default Index;
