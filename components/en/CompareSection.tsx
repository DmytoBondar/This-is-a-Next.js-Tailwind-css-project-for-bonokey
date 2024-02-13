import { useState, useEffect } from 'react';
import { useRouter } from "next/router";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Close } from '@mui/icons-material';
import { useAuth } from "../../context/AuthContext";
import Img from '../Img';
import CancelIcon from '@mui/icons-material/Cancel';
import { toast } from "react-hot-toast";

type CompareCard = {
  id: number,
  name: string,
  creditCardPhoto: string,
};

function CompareSection() {
  const { authState, setAuthState } = useAuth();
  const router = useRouter();
  const [compareCards, setCompareCards] = useState<CompareCard[]>(authState.compareList)

  const handleRemove = async (id: number)=> {
    const tempCompareList = authState.compareList.filter(item => {return item.id != id})
    setAuthState({ isAuthenticated: authState.isAuthenticated, compareList: tempCompareList, favoriteNumber: authState.favoriteNumber });
  };

  const handleReset = () => {
    setAuthState({ isAuthenticated: authState.isAuthenticated, compareList: [], favoriteNumber: authState.favoriteNumber });
  }
  
  useEffect(()=> {
    setCompareCards(authState.compareList);
  }, [authState]);

  return (<div className="-mx-4 sm:-mx-6 md:-mx-8 lg:-mx-24 xl:-mx-18 box-border w-screen py-4 px-4 sm:py-6 sm:px-28 rounded-t-3xl sticky bottom-0 bg-white-A700" style={{boxShadow: "6px -10px 25px 0px rgba(16, 24, 40, 0.08)"}}>
    <div className="flex flex-row gap-6 items-center justify-between">
      <div className="hidden sm:flex flex-row gap-4 items-center">
        {compareCards.map((cardInfo, index) => {return <div key={index} className="p-1.5 border border-red-300 rounded-lg relative">
          <Img src={cardInfo.creditCardPhoto} className="w-[100px] h-[64px]"/>
          <CancelIcon className="absolute w-5 h-5 -top-2.5 -right-2.5 text-blue_gray-800_bf cursor-pointer" onClick={() => {handleRemove(cardInfo.id)}}/>
        </div>})}
      </div>
      <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 w-full sm:w-auto">
        {compareCards.length == 3 && <div className="flex flex-row gap-4 items-center w-full sm:w-auto">
          <span className="font-ibmplexsans text-base sm:text-[22px] font-medium text-[#2A3139] text-left">You have more than 3 cards to compare</span>
          <ArrowForwardIcon className="hidden sm:flex" sx={{fontSize: "16px"}} />
        </div>}
        <div className="flex flex-row gap-3 items-center w-full sm:w-auto">
          <span className="bg-[#A3278F] cursor-pointer text-white-A700 text-center py-2 sm:py-3 sm:px-5 rounded-[44px] w-full sm:w-64">Compare</span>
          <div onClick={handleReset} className="hidden sm:flex flex-row gap-2 items-center cursor-pointer">
            <span className="text-base font-ibmplexsans font-medium text-[#A3278F80]">Reset</span>
            <Close className="flex text-2xl text-[#A3278F80]"/>
          </div>
        </div>
      </div>
    </div>
    <CancelIcon className="absolute flex sm:hidden w-8 h-8 -top-4 right-4 text-blue_gray-800_bf cursor-pointer" onClick={handleReset}/>
  </div>)
}

export default CompareSection;