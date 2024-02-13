import { Button } from '@mui/material';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Img from '../../components/Img';
import styled from "styled-components";
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import { Input } from '@mui/material';
import Slider from '@mui/material/Slider';
import { PieChart, Pie, Cell } from "recharts";

import Rent from '../../img/Rent.svg';
import Food from '../../img/food.svg';
import Car from '../../img/car.svg';
import Fuel from '../../img/gas.svg';
import Gym from '../../img/fitness.svg';
import Entertainment from '../../img/activity.svg';
import Saving from '../../img/savings.svg';
import HappyFace from '../../img/happy-face.svg';
import SadNews from '../../img/sad-news.svg';
import PattyPopper from '../../img/Party popper.svg';
import OfferRectangle from "../../img/offerRectangle.svg";


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

const StyledSlider = styled(Slider)({
  '& .MuiSlider-thumb': {
    height: 20,
    width: 20,
    backgroundColor: '#FFFFFF',
    border: '1px solid #555555',
    boxShadow: '0 0 2px 0px rgba(0, 0, 0, 0.1)',
    '&:focus, &:hover, &.Mui-active': {
      boxShadow: '0px 0px 3px 1px rgba(0, 0, 0, 0.1)',
    },
    '&:before': {
      boxShadow:
        '0px 0px 1px 0px rgba(0,0,0,0.2), 0px 0px 0px 0px rgba(0,0,0,0.14), 0px 0px 1px 0px rgba(0,0,0,0.12)',
    },
  },
  '& .MuiSlider-track': {
    border: 'none',
    height: 10,
    background: 'transparent',
  },
  '& .MuiSlider-rail': {
    opacity: 0.5,
    height: 8,
    boxShadow: 'inset 0px 0px 4px -2px #000',
    background: 'linear-gradient(90deg, #16AB60 0%, #D1ED1F 46.35%, #D61C5E 100%) !important',
  },
  '& .MuiSlider-valueLabel': {
    lineHeight: 1.2,
    fontSize: 12,
    background: 'unset',
    padding: 0,
    width: 32,
    height: 32,
    backgroundColor: 'transparent',
    transformOrigin: 'bottom left',
    transform: 'translate(50%, -100%) rotate(-45deg) scale(0)',
    '&::before': { display: 'none' },
    '&.MuiSlider-valueLabelOpen': {
      transform: 'translate(50%, -100%) rotate(-45deg) scale(1)',
    },
    '& > *': {
      transform: 'rotate(45deg)',
    },
  },
})

type BankInfo = {
  name: string;
  logo: string;
  mobile: string;
  apr: number;
  loan: number;
  monthly: number;
  total: number;
  fees: number;
  maxLoan: number;
  salaryTransfer: boolean;
  revenue: number;
  minLoan: number;
  offer: boolean;
  useMaxLoan: boolean;
  loanDurationInYears: number;
  sector: string;
  userMonthlySalary: number;
  bankUrl: string;
}
type Props = {
  bankInfo: BankInfo,
  monthlySalary: number,
  loanAmount: number,
  duration: number,
  rentAmount: number,
  setRentAmount: Function,
  foodAmount: number,
  setFoodAmount: Function,
  carInsuranceAmount: number,
  setCarInsuranceAmount: Function,
  fuelAmount: number,
  setFuelAmount: Function,
  gymAmount: number,
  setGymAmount: Function,
  activityAmount: number,
  setActivityAmount: Function,
  otherAmount: number,
  setOtherAmount: Function,
}

function IncreaseOption (props) {
  const { value, setIncrease, index, increaseOption, setIncreaseOption } = props;
  const handleClick = () => {
    setIncreaseOption(index);
    setIncrease(value);
  }

  return (<div onClick={handleClick} className={`${index == increaseOption ?' border border-blue-600':''} px-4 py-2 sm:px-6 sm:py-3 text-center font-base font-medium font-ibmplexsans bg-white-A700 rounded-[44px] cursor-pointer w-full sm:w-auto`}>
    {value} SAR
  </div>)
}

function LoanCard (props: Props) {
  const [showDetail, setShowDetail] = useState(false);
  const [showAdvice, setShowAdvice] = useState(false);
  const [step, setStep] = useState(1);
  const [monthlyExpenseOption, setMonthlyExpenseOption] = useState('');
  const [increaseOption, setIncreaseOption] = useState(-1);
  const [loanAmount, setLoanAmount] = useState(0);
  const [repaymentRate, setRepaymentRate] = useState(0);
  const [repaymentPercentage, setRepaymentPercentage] = useState(0);  //for chart
  const [rentPercentage, setRentPercentage] = useState(0);
  const [foodPercentage, setFoodPercentage] = useState(0);
  const [carInsurancePercentage, setCarInsurancePercentage] = useState(0);
  const [fuelPercentage, setFuelPercentage] = useState(0);
  const [gymPercentage, setGymPercentage] = useState(0);
  const [activityPercentage, setActivityPercentage] = useState(0);
  const [otherPercentage, setOtherPercentage] = useState(0);
  const [restPercentage, setRestPercentage] = useState(0);

  const [isSalaryRaise, setIsSalaryRaise] = useState(false);
  const [outcome, setOutcome] = useState(0);
  const [goodForLoan, setGoodForLoan] = useState(false);
  const [increase, setIncrease] = useState<number>();
  const [showGPTAnswer, setShowGPTAnswer] = useState(false);
  const [showMoreIncreaseInput, setShowMoreIncreaseInput] = useState(false);
  const [showPerformance, setShowPerformance] = useState(false);
  const [answers, setAnswers] = useState([]);
  const [performance, setPerformance] = useState(0);
  const [hardLevel, setHardLevel] = useState(0);
  const [chartData, setChartData] = useState([
    { name: "Monthly Installment", value: 0 },
    { name: "Rent", value: 0 },
    { name: "Food", value: 0 },
    { name: "Car insurance", value: 0 },
    { name: "Fuel", value: 0 },
    { name: "Gym", value: 0 },
    { name: "Entertainment", value: 0 },
    { name: "Other", value: 0 },
    { name: "Saving", value: 0 },
  ]);

  const COLORS = ["#4F30AB", "#D1ED1F", "#16AB60", "#FB542B", "#9b581d", "#a1b962", "#6ebdb3", "#74aae7", "#0752eb"];
  const LEVELS = ["Easy", "Medium", "Hard"];

  useEffect(() => {
    if(props.loanAmount == undefined) setLoanAmount(props.bankInfo.loan);
    else setLoanAmount(props.loanAmount);
    setShowAdvice(false);
    setShowDetail(false);
  }, [props.loanAmount, props.bankInfo]);

  useEffect(() => {
    setChartData([
      { name: "Monthly Installment", value: repaymentPercentage },
      { name: "Rent", value: rentPercentage },
      { name: "Food", value: foodPercentage },
      { name: "Car insurance", value: carInsurancePercentage },
      { name: "Fuel", value: fuelPercentage },
      { name: "Gym", value: gymPercentage },
      { name: "Entertainment", value: activityPercentage },
      { name: "Other", value: otherPercentage },
      { name: "Saving", value: restPercentage },
    ]);
    setPerformance(100 - restPercentage);
  }, [showPerformance])

  const handleShowAdvice = () => {
    initialsteps();
    setShowAdvice(!showAdvice);
  }

  const monthlyExpensOptions = [
    'I will fill in my expenses.',
    'Yes, I can connect you with my bank.',
    'Sure, I will upload my banks statements.',
  ];

  const stepLabels = [
    'Hi! Can you please let us know more about your monthly expenses?',
    'If you want fill in the following monthly expenses.',
    'Do you expect a salary raise/promotion next year?',
    'How much you expect to get increase?',
    'Here is your result:'
  ];

  const increaseOptions = [
    {label:'500 SAR', value: 500},
    {label:'1000 SAR', value: 1000},
    {label:'3000 SAR', value: 3000},
  ]

  const handleExpenseOptionChange = (event) => {
    if(event) {
      setMonthlyExpenseOption(event.target.childNodes[0])
      if(event.target.childNodes[0].data == "I will fill in my expenses.") setStep(2);
    }
  }

  const handleSkip = () => {
    if( props.rentAmount == undefined ) props.setRentAmount(0);
    if( props.foodAmount == undefined ) props.setFoodAmount(0);
    if( props.carInsuranceAmount == undefined ) props.setCarInsuranceAmount(0);
    if( props.fuelAmount == undefined ) props.setFuelAmount(0);
    if( props.gymAmount == undefined ) props.setGymAmount(0);
    if( props.activityAmount == undefined ) props.setActivityAmount(0);
    if( props.otherAmount == undefined ) props.setOtherAmount(0);
    setStep(3);
  };

  const evaluateResult = () => {
    let outcome_temp = props.rentAmount + props.foodAmount + props.carInsuranceAmount + props.gymAmount + props.fuelAmount + props.activityAmount + props.otherAmount
    if(!isNaN(outcome_temp) && outcome_temp > 0) setOutcome(outcome_temp);
    if (props.monthlySalary - outcome_temp > 1000) setGoodForLoan(true);
    else setGoodForLoan(false);
    const NetIncome = props.monthlySalary - outcome_temp;
    let loanRepaymentRate = 0;
    if(NetIncome > 0) loanRepaymentRate = props.bankInfo.monthly / NetIncome;
    else loanRepaymentRate = 100;
    setRepaymentRate(loanRepaymentRate * 100);
    if(loanRepaymentRate < 0.2) setHardLevel(0);
    else if( 0.2 <= loanRepaymentRate && loanRepaymentRate < 0.35 ) setHardLevel(1);
    else setHardLevel(2);
    const tmpRepaymentPct = Math.round(props.bankInfo.monthly / props.monthlySalary * 100);
    setRepaymentPercentage(tmpRepaymentPct);
    const tmpRentPct = Math.round(props.rentAmount / props.monthlySalary * 100);
    setRentPercentage(tmpRentPct);
    const tmpFoodPct = Math.round(props.foodAmount / props.monthlySalary * 100);
    setFoodPercentage(tmpFoodPct);
    const tmpCarInsurancePct = Math.round(props.carInsuranceAmount / props.monthlySalary * 100);
    setCarInsurancePercentage(tmpCarInsurancePct);
    const tmpFuelPct = Math.round(props.fuelAmount / props.monthlySalary * 100)
    setFuelPercentage(tmpFuelPct);
    const tmpGymPct = Math.round(props.gymAmount / props.monthlySalary * 100)
    setGymPercentage(tmpGymPct);
    const tmpActivityPct = Math.round(props.activityAmount / props.monthlySalary * 100)
    setActivityPercentage(tmpActivityPct);
    const tmpOtherPct = Math.round(props.otherAmount / props.monthlySalary * 100)
    setOtherPercentage(tmpOtherPct);

    const rest = 100 - tmpRepaymentPct - tmpRentPct - tmpFoodPct - tmpCarInsurancePct - tmpFuelPct - tmpGymPct - tmpActivityPct - tmpOtherPct;
    if(rest > 0) setRestPercentage(rest);
    else setRestPercentage(0)
    setShowPerformance(true);
  }

  const handleExpectSalary = async (isExpect: boolean) => {
    setShowMoreIncreaseInput(false);
    setIsSalaryRaise(isExpect);
    if(isExpect) setStep(4);
    else {
      setStep(5);
      evaluateResult();
      await makePrompt();
    }
  }

  const handleIncreaseInput = (event) => {
    setIncrease(event.target.value);
  }

  const handleNext = async () => {
    setStep(5);
    evaluateResult();
    await makePrompt();
  }

  const initialsteps = () => {
    setShowAdvice(false);
    setStep(1);
    setGoodForLoan(false);
    setMonthlyExpenseOption('');
    setIsSalaryRaise(false);
    setIncrease(0);
    setOutcome(0);
    setAnswers([]);
    setShowMoreIncreaseInput(false);
    setShowPerformance(false);
    setPerformance(0);
    setRentPercentage(0);
    setFoodPercentage(0);
    setRepaymentPercentage(0);
    setIncreaseOption(-1)
    setHardLevel(-1);
  }

  const handleAdviceClose = () => {
    initialsteps();
  }
  
  const makePrompt = async () => {
    const prompt = `Provide a simplified financial analysis and advice for a person seeking a personal loan. 
    They have a monthly income of ${props.monthlySalary} SAR and monthly expenses totaling ${outcome} SAR. 
    They are considering a personal loan of ${props.bankInfo.useMaxLoan?props.bankInfo.maxLoan:props.loanAmount} SAR at an annual interest rate of ${props.bankInfo.apr}% to be repaid over ${props.duration} years. 
    Avoid complex formulas and focus on a clear, concise breakdown of their financial situation, the monthly loan repayment amount, and practical advice on their financial planning considering their tight budget.`;

    try {
      setShowGPTAnswer(false);
      const response = await fetch(`/api/getGPTAdvice`, {
        method: "POST",
        body: JSON.stringify({
          message: prompt,
        }),
      });
      if (!response.ok) {
        console.log("failed");
        throw (
          response.statusText ||
          new Error(`Request failed with status ${response.status}`)
        );
      }
      setShowGPTAnswer(true)
      const data = response.body;
      const reader = data.getReader();
      const decoder = new TextDecoder();
      let done = false;
      let text = "";
      const lastAnswers = answers;
      while (!done) {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;
        const chunkValue = decoder.decode(value);
        text += chunkValue;
        setAnswers([...lastAnswers, text]);
      }
      console.log(answers);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className={`bg-white-A700 w-full rounded-2xl border relative ${showDetail || showAdvice ?'border border-[#FB542B]':''}`}>
      <div className={`${props.bankInfo.offer || !props.bankInfo.salaryTransfer ? 'flex items-center gap-2':'hidden'} absolute -top-3 left-8 z-30`}>
        {props.bankInfo.offer && <div className="flex items-center">
          <span className="rounded-l-sm pl-[14px] pr-[10px] text-center text-white-A700 text-[12px] leading-[20px] font-ibmplexsans bg-[#4F30AB]">No Admin Fee</span>
          <Img className="h-[20px] w-auto" src={OfferRectangle.src} />
        </div>}
        {!props.bankInfo.salaryTransfer && <div className="rounded-sm px-[14px] text-center text-white-A700 font-ibmplexsans text-[12px] leading-[20px] bg-[#FB542B]">No Salary transfer</div>}
      </div>
      <div className='flex flex-col sm:flex-row bg-gray-25 p-4 sm:p-6 gap-4 items-center justify-between'>
        <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 items-center w-full sm:w-auto sm:flex-1">
          <div className='flex gap-10 px-3 py-1 bg-white-A700 border rounded w-full sm:w-auto'>
            <div className='relative'>
              <span className="text-[22px] sm:text-[32px] font-semibold text-mainBlue">{props.bankInfo.apr}%</span>
              <div className="absolute top-[-10px] left-3/4 text-sm text-white-A700_b2 bg-[#47AFC8] px-2 rounded-sm">fixed</div>{/* {props.bankInfo.annualType} */}
            </div>
            <span className='flex items-center text-xs sm:text-base font-normal leading-tight text-blue_gray-800_bf'>Annual percentage rate(APR)</span>
          </div>
          <div className="flex flex-row items-center w-full sm:w-auto gap-4 justify-around">
            <div className='flex items-center'><Img src={props.bankInfo.logo} className='w-32 h-auto sm:w-40 sm:h-auto'/></div>
            <div className='flex-grow text-blue_gray-800 text-base sm:text-[22px] font-semibold flex items-center'>{props.bankInfo.name}</div>
          </div>
        </div>
        <button className='flex flex-row items-center justify-center cursor-pointer bg-mainBlue text-white-A700 font-ibmplexsans font-medium leading-tight text-sm sm:text-base text-center w-full sm:w-48 rounded-lg p-3'>
          <Link href={props.bankInfo.bankUrl?props.bankInfo.bankUrl:'#'} target='_blank'>Contact bank</Link>
        </button>
      </div>
      <div className={`bg-white-A700 flex flex-col sm:flex-row gap-4 sm:gap-6 p-4 sm:p-6 ${showDetail || showAdvice ?'':'rounded-b-2xl'}`}>
        <div className='flex flex-col sm:flex-row items-center px-4 sm:px-6 py-6 gap-3 sm:justify-between flex-1'>
          <div className='flex flex-row-reverse sm:flex-col items-center w-full sm:w-auto justify-between sm:gap-2'>
            <span className='text-sm sm:text-[22px] font-semibold text-[#6733E1]'>{ Math.round(props.bankInfo.loan).toLocaleString() } SAR</span>
            <span className='text-base font-normal text-blue_gray-800'>Loan Amount</span>
          </div>
          <div className="bg-blue_gray-100_7f h-px sm:w-px w-full sm:h-full" ></div>
          <div className='flex flex-row-reverse sm:flex-col items-center w-full sm:w-auto justify-between sm:gap-2'>
            <span className='text-sm sm:text-[22px] font-semibold text-[#6733E1]'>{ Math.round(props.bankInfo.monthly).toLocaleString() } SAR</span>
            <span className='text-base font-normal text-blue_gray-800'>Monthly Installment</span>
          </div>
          <div className="bg-blue_gray-100_7f h-px sm:w-px w-full sm:h-full" ></div>
          <div className='flex flex-row-reverse sm:flex-col items-center w-full sm:w-auto justify-between sm:gap-2'>
            <span className='text-sm sm:text-[22px] font-semibold text-[#6733E1]'>{ Math.round(props.bankInfo.fees).toLocaleString() } SAR</span>
            <span className='text-base font-normal text-blue_gray-800'>Admin Fee</span>
          </div>
          <div className="bg-blue_gray-100_7f h-px sm:w-px w-full sm:h-full" ></div>
          <div className='flex flex-row-reverse sm:flex-col items-center w-full sm:w-auto justify-between sm:gap-2'>
            <span className='text-sm sm:text-[22px] font-semibold text-[#6733E1]'>{ Math.round(props.bankInfo.total).toLocaleString() } SAR</span>
            <span className='text-base font-normal text-blue_gray-800'>Total Amount</span>
          </div>
        </div>
        <div className='flex flex-col w-full sm:w-48 items-end gap-4'>
          <button onClick={handleShowAdvice} className="text-gray-900 border rounded-lg bg-gray-70 font-semibold flex flex-row items-center justify-center h-11 cursor-pointer leading-[normal] text-sm sm:text-base text-center sm:w-48 w-full p-3">
            I need advice
          </button>
          <button onClick={() => setShowDetail(prev => !prev)} className="text-gray-600 border rounded-lg bg-white-A700 font-semibold flex flex-row items-center justify-center h-11 cursor-pointer leading-[normal] text-sm sm:text-base text-center sm:w-48 w-full p-3">
            {showDetail ? <>Less details<ArrowDropUpIcon/></>: <>More details<ArrowDropDownIcon/></>}
            </button>
        </div>
      </div>
      {showDetail && 
      <div className='flex flex-col p-4 sm:p-6 bg-[#FB542B1A] border border-t-[#FB542BB2] gap-3 sm:gap-4 rounded-b-2xl'>
        <div className='text-lg sm:text-[28px] font-semibold flex flex-row justify-between items-center'>
          <div>Features</div>
          <div className='cursor-pointer' onClick={() => setShowDetail(false)}>&#x2715;</div>
        </div>
        <div className='flex flex-col gap-4 sm:grid sm:grid-cols-2 sm:gap-6'>
          <div className='bg-white-A700 p-4 sm:p-6 rounded-2xl flex flex-col gap-3'>
            <div className='flex items-center text-base font-medium font-ibmplexsans'><div className='flex items-center justify-center gap-3'><Img src="/img/Variant12.svg" width={24} height={24} /><span className='text-sm sm:text-base font-medium font-ibmplexsans'>Shariah compliant</span></div></div>
            <div className='border-t h-px text-[#F0F0F0B2]'/>
            <div className='flex items-center text-base font-medium font-ibmplexsans'><div className='flex items-center justify-center gap-3'><Img src="/img/Variant12.svg" width={24} height={24} /><span className='text-sm sm:text-base font-medium font-ibmplexsans'>Instant approval</span></div></div>
            <div className='border-t h-px text-[#F0F0F0B2]'/>
            <div className='flex items-center text-base font-medium font-ibmplexsans'><div className='flex items-center justify-center gap-3'><Img src="/img/Variant12.svg" width={24} height={24} /><span className='text-sm sm:text-base font-medium font-ibmplexsans'>Repayment periods from 3 months up to 12 months</span></div></div>
            <div className='border-t h-px text-[#F0F0F0B2]'/>
            <div className='flex items-center text-base font-medium font-ibmplexsans'><div className='flex items-center justify-center gap-3'><Img src="/img/Variant12.svg" width={24} height={24} /><span className='text-sm sm:text-base font-medium font-ibmplexsans'>Possibility of early settlement</span></div></div>
            <div className='border-t h-px text-[#F0F0F0B2]'/>
            <div className='flex items-center text-base font-medium font-ibmplexsans'><div className='flex items-center justify-center gap-3'><Img src="/img/Variant12.svg" width={24} height={24} /><span className='text-sm sm:text-base font-medium font-ibmplexsans'>Possibility of postponing the installment of the month of Ramadan.</span></div></div>
          </div>
          <div className='bg-white-A700 p-4 sm:p-6 rounded-2xl flex flex-col gap-3 h-min sm:h-auto'>
            <div className='flex flex-row items-center justify-between text-sm sm:text-base font-medium text-[#FB542B]'><span className='font-ibmplexsans'>Admin Fees + Tax</span><span className='font-ibmplexsans'>{props.bankInfo.fees.toFixed(0)} SAR</span></div>
            <div className='border-t h-px text-[#F0F0F0B2]'/>
            <div className='flex flex-row items-center justify-between text-sm sm:text-base font-medium text-[#FB542B]'><span className='font-ibmplexsans'>Minimum Loan</span><span className='font-ibmplexsans'>{props.bankInfo.minLoan.toFixed(0)} SAR</span></div>
            <div className='border-t h-px text-[#F0F0F0B2]'/>
            <div className='flex flex-row items-center justify-between text-sm sm:text-base font-medium text-[#FB542B]'><span className='font-ibmplexsans'>Maximum Loan</span><span className='font-ibmplexsans'>{props.bankInfo.maxLoan.toFixed(0)} SAR</span></div>
            <div className='border-t h-px text-[#F0F0F0B2]'/>
            <div className='flex flex-row items-center justify-between text-sm sm:text-base font-medium text-[#FB542B]'><span className='font-ibmplexsans'>Bank&apos;s Profit</span><span className='font-ibmplexsans'>{props.bankInfo.revenue.toFixed(0)} SAR</span></div>
            <div className='border-t h-px text-[#F0F0F0B2]'/>
            <div className='flex flex-row items-center justify-between text-sm sm:text-base font-medium text-[#FB542B]'><span className='font-ibmplexsans'>Salary Transfer</span><span className='font-ibmplexsans'>{props.bankInfo.salaryTransfer? 'YES': 'NO'}</span></div>
          </div>
        </div>
      </div>}
      {showAdvice && 
        <div className='p-4 sm:p-6 bg-[#EDF3FF80] flex flex-col gap-4 sm:gap-6 rounded-b-2xl'>
          <div className='flex flex-row items-center justify-between gap-4 sm:gap-6'>
            <div className='flex flex-row items-center gap-6'>
              <div className={`gap-2 items-center cursor-pointer px-4 py-3 bg-white-A700 rounded-xl h-auto sm:h-12 ${step == 1 || step == 5?'hidden':'flex flex-row'}`} onClick={() => setStep(step-1)}>
                <ArrowBackIcon sx={{fontSize:'medium'}} />
                <span className='text-base font-medium font-ibmplexsans leading-none'>Back</span>
              </div>
              <div className='flex flex-col items-start gap-1'>
                {step === 5?<div className='font-base font-normal font-ibmplexsans text-[#4F30AB]'>Your result is below</div>:<div className='text-sm sm:text-base font-ibmplexsans font-normal'><span className='text-[#FB542B] font-ibmplexsans'>{step} step</span><span className='font-ibmplexsans'> of 5</span></div>}
                <div className='hidden sm:flex text-lg sm:text-[28px] font-semibold font-ibmplexsans'>{stepLabels[step-1]}</div>
                {step === 2 && <div className='hidden sm:flex text-base font-normal text-blue_gray-800_bf mt-1'>This will help us calculate the best offer for you. But this step is optional.</div>}
              </div>
            </div>
            <div className='cursor-pointer text-lg sm:text-2xl' onClick={handleAdviceClose}>&#x2715;</div>
          </div>
          <div className='flex sm:hidden flex-col gap-4'>
            <div className='flex text-lg sm:text-[28px] font-semibold font-ibmplexsans'>{stepLabels[step-1]}</div>
            {step === 2 && <div className='flex text-base font-normal text-blue_gray-800_bf'>This will help us calculate the best offer for you. But this step is optional.</div>}
          </div>
          {
            step === 1 &&  
            <div className='flex flex-col sm:grid sm:grid-cols-3 gap-4 sm:gap-6'>
              {monthlyExpensOptions.map((monthlyExpenseOption, index) => {
                return (<div onClick={handleExpenseOptionChange}
                  key={index}
                  className='cursor-pointer py-2 sm:py-4 w-full text-center bg-white-A700 text-sm sm:text-base font-normal font-ibmplexsans text-[#343546] rounded-[44px]'>
                  {monthlyExpenseOption}
                </div>);
              })}
            </div>
          }
          {
            step === 2  &&  
            <div className='flex flex-col gap-4 sm:gap-8'>
              <div className='h-px w-full bg-[#F0F0F0]'></div>
              <div className='flex flex-col gap-6'>
                <div className='flex flex-col sm:grid sm:grid-cols-4 gap-4 sm:gap-6'>
                  <div className='flex flex-col gap-3 items-start'>
                    <div className='flex flex-row gap-2 items-center'><Img src={Rent.src} className='w-6 h-6' /><span className='text-base sm:text-lg font-semibold font-ibmplexsans'>Rent*</span></div>
                    <CssStyledTextfield
                      hiddenLabel
                      name="textfield"
                      type="number"
                      placeholder="0"
                      value={props.rentAmount}
                      onChange={(event) => props.setRentAmount(parseInt(event.target.value))}
                      InputProps={{
                        endAdornment: <InputAdornment position="end">SAR</InputAdornment>,
                      }}
                      className="font-ibmplexsans font-medium leading-0 md:h-auto p-0 placeholder:text-blue_gray-800_7f sm:h-auto w-full rounded-3xl"
                    ></CssStyledTextfield>
                  </div>
                  <div className='flex flex-col gap-3 items-start'>
                    <div className='flex flex-row gap-2 items-center'><Img src={Food.src} className='w-6 h-6' /><span className='text-base sm:text-lg font-semibold font-ibmplexsans'>Food</span></div>
                    <CssStyledTextfield
                      hiddenLabel
                      name="textfield"
                      type="number"
                      placeholder="0"
                      value={props.foodAmount}
                      onChange={(event) => props.setFoodAmount(parseInt(event.target.value))}
                      InputProps={{
                        endAdornment: <InputAdornment position="end">SAR</InputAdornment>,
                      }}
                      className="font-ibmplexsans font-medium leading-0 md:h-auto p-0 placeholder:text-blue_gray-800_7f sm:h-auto w-full rounded-3xl"
                    ></CssStyledTextfield>
                  </div>
                  <div className='flex flex-col gap-3 items-start'>
                    <div className='flex flex-row gap-2 items-center'><Img src={Car.src} className='w-6 h-6' /><span className='text-base sm:text-lg font-semibold font-ibmplexsans'>Car Insurance</span></div>
                    <CssStyledTextfield
                      hiddenLabel
                      name="textfield"
                      placeholder="0"
                      type="number"
                      value={props.carInsuranceAmount}
                      onChange={(event) => props.setCarInsuranceAmount(parseInt(event.target.value))}
                      InputProps={{
                        endAdornment: <InputAdornment position="end">SAR</InputAdornment>,
                      }}
                      className="font-ibmplexsans font-medium leading-0 md:h-auto p-0 placeholder:text-blue_gray-800_7f sm:h-auto w-full rounded-3xl"
                    ></CssStyledTextfield>
                  </div>
                  <div className='flex flex-col gap-3 items-start'>
                    <div className='flex flex-row gap-2 items-center'><Img src={Fuel.src} className='w-6 h-6' /><span className='text-base sm:text-lg font-semibold font-ibmplexsans'>Fuel</span></div>
                    <CssStyledTextfield
                      hiddenLabel
                      name="textfield"
                      type="number"
                      placeholder="0"
                      value={props.fuelAmount}
                      onChange={(event) => props.setFuelAmount(parseInt(event.target.value))}
                      InputProps={{
                        endAdornment: <InputAdornment position="end">SAR</InputAdornment>,
                      }}
                      className="font-ibmplexsans font-medium leading-0 md:h-auto p-0 placeholder:text-blue_gray-800_7f sm:h-auto w-full rounded-3xl"
                    ></CssStyledTextfield>
                  </div>
                </div>
                <div className='flex flex-col sm:grid sm:grid-cols-4 gap-4 sm:gap-6'>
                  <div className='flex flex-col gap-3 items-start'>
                    <div className='flex flex-row gap-2 items-center'><Img src={Gym.src} className='w-6 h-6' /><span className='text-base sm:text-lg font-semibold font-ibmplexsans'>Gym</span></div>
                    <CssStyledTextfield
                      hiddenLabel
                      name="textfield"
                      placeholder="0"
                      type="number"
                      value={props.gymAmount}
                      onChange={(event) => props.setGymAmount(parseInt(event.target.value))}
                      InputProps={{
                        endAdornment: <InputAdornment position="end">SAR</InputAdornment>,
                      }}
                      className="font-ibmplexsans font-medium leading-0 md:h-auto p-0 placeholder:text-blue_gray-800_7f sm:h-auto w-full rounded-3xl"
                    ></CssStyledTextfield>
                  </div>
                  <div className='flex flex-col gap-3 items-start'>
                    <div className='flex flex-row gap-2 items-center'><Img src={Entertainment.src} className='w-6 h-6' /><span className='text-base sm:text-lg font-semibold font-ibmplexsans'>Entertainment</span></div>
                    <CssStyledTextfield
                      hiddenLabel
                      name="textfield"
                      type="number"
                      placeholder="0"
                      value={props.activityAmount}
                      onChange={(event) => props.setActivityAmount(parseInt(event.target.value))}
                      InputProps={{
                        endAdornment: <InputAdornment position="end">SAR</InputAdornment>,
                      }}
                      className="font-ibmplexsans font-medium leading-0 md:h-auto p-0 placeholder:text-blue_gray-800_7f sm:h-auto w-full rounded-3xl"
                    ></CssStyledTextfield>
                  </div>
                  <div className='flex flex-col gap-3 items-start'>
                    <div className='flex flex-row gap-2 items-center'><Img src={Saving.src} className='w-6 h-6' /><span className='text-base sm:text-lg font-semibold font-ibmplexsans'>Other</span></div>
                    <CssStyledTextfield
                      hiddenLabel
                      name="textfield"
                      type="number"
                      placeholder="0"
                      value={props.otherAmount}
                      onChange={(event) => props.setOtherAmount(parseInt(event.target.value))}
                      InputProps={{
                        endAdornment: <InputAdornment position="end">SAR</InputAdornment>,
                      }}
                      className="font-ibmplexsans font-medium leading-0 md:h-auto p-0 placeholder:text-blue_gray-800_7f sm:h-auto w-full rounded-3xl"
                    ></CssStyledTextfield>
                  </div>
                </div>
              </div>
              <div className='flex flex-row justify-end'>
                <div onClick={handleSkip} className='px-4 py-2 sm:px-5 sm:py-3 bg-[#F0F0F0B2] text-center text-base font-normal font-ibmplexsans w-28 sm:w-44 rounded-[44px] cursor-pointer'>Next</div>
              </div>
            </div>
          }
          {
            step === 3 && 
            <div className='flex flex-row items-center gap-6 justify-end sm:justify-start ml-0 sm:ml-32'>
              <div onClick={() => handleExpectSalary(true)} className={`text-center px-4 py-2 sm:px-6 sm:py-5 rounded-[44px] text-base font-normal font-ibmplexsans cursor-pointer ${isSalaryRaise?'bg-blue-600 text-white-A700':'bg-white-A700 text-blue_gray-800'}`}>Yes</div>
              <div onClick={() => handleExpectSalary(false)} className={`text-center px-4 py-2 sm:px-6 sm:py-5 rounded-[44px] text-base font-normal font-ibmplexsans cursor-pointer ${isSalaryRaise?'bg-white-A700 text-blue_gray-800':'bg-blue-600 text-white-A700'}`}>No</div>
            </div>
          }
          {
            step === 4 &&
            <div className="flex flex-col gap-4">
              <div className={`flex flex-col sm:grid sm:grid-cols-4 gap-4 sm:gap-6 items-center justify-between`}>
                {increaseOptions.map((option, index) => {
                  return (<IncreaseOption value={option.value} index={index} setIncreaseOption={setIncreaseOption} increaseOption={increaseOption} setIncrease={setIncrease} key={index} />)
                })}
                { !showMoreIncreaseInput && <div onClick={() => {setShowMoreIncreaseInput(true)}} className={`flex flex-col text-center px-4 py-2 sm:px-6 sm:py-3 font-base font-medium font-ibmplexsans bg-white-A700 rounded-[44px] cursor-pointer w-full sm:w-auto`}>More</div>}
                { showMoreIncreaseInput && <CssStyledTextfield
                    hiddenLabel
                    name="textfield"
                    type="number"
                    placeholder="0"
                    value={increase}
                    onChange={handleIncreaseInput}
                    InputProps={{
                      endAdornment: <InputAdornment position="end">SAR</InputAdornment>,
                    }}
                    className="font-ibmplexsans font-medium leading-0 p-0 placeholder:text-blue_gray-800_7f h-auto w-auto rounded-[40px]"
                  ></CssStyledTextfield>
                }
              </div>
              <div className="w-full flex flex-row items-center justify-end">
                <div onClick={handleNext} className='px-4 py-2 sm:px-5 sm:py-3 bg-[#F0F0F0B2] text-center text-base font-normal font-ibmplexsans w-28 sm:w-44 rounded-[44px] cursor-pointer'>Next</div>
              </div>
            </div>
          }
          {
            step === 5 && 
            <div className="flex flex-col gap-4 sm:gap-11">
              <div className={`flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-6 p-4 sm:p-6 rounded-3xl border ${goodForLoan?'border-[#63C38F]':'border-[#FB542B]'}`}>
                <Img src={goodForLoan?HappyFace.src:SadNews.src} className="w-[50px] h-[50px] sm:w-20 sm:h-20" alt={goodForLoan?'good':'bad'} />
                <div className="flex flex-col items-start gap-3">
                  <div className="flex flex-row gap-3 items-center">
                    <span className="text-[22px] sm:text-3xl font-semibold font-ibmplexsans text-blue_gray-800">{goodForLoan?'Good News':'Sorry, but we have some bad news.'}</span>
                    {goodForLoan &&<Img src={PattyPopper.src} className="w-11 h-11" />}
                  </div>
                  <div className="font-ibmplexsans text-sm sm:text-lg font-semibold text-blue_gray-800_bf">
                    {goodForLoan?'Based on your income you can afford to take a loan from this bank.':'But based on your income and expenses, we recommend that you should hold off on the idea of taking out a loan.'}
                  </div>
                </div>
              </div>
              <div className={`flex flex-col sm:grid sm:grid-cols-2 gap-4 sm:gap-6`}>
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col p-4 sm:p-6 rounded-2xl bg-white-A700 gap-4 sm:gap-6">
                    <div className="flex flex-col gap-2 sm:gap-3"><span className="font-ibmplexsans text-[22px] sm:text-[28px] font-semibold text-[#343546]">Analyze</span><span className="font-ibmplexsans text-xs sm:text-base font-normal text-[#34354680]">Following your Income & Outcome history we offer you the best variations</span></div>
                    <div className="h-px bg-[#F0F0F0] w-full"></div>
                    <div className="grid grid-cols-2 gap-6 items-center">
                      <div className="flex flex-col items-center gap-1"><span className={`font-ibmplexsans text-sm sm:text-[22px] font-medium ${goodForLoan?'text-[#343546]':'text-[#FB542B]'}`}>{props.monthlySalary.toLocaleString()}</span><span className="text-xs sm:text-base font-ibmplexsans font-medium text-[#4F30AB80]">Income</span></div>
                      <div className="flex flex-col items-center gap-1"><span className="text-[#343546] font-ibmplexsans text-sm sm:text-[22px] font-medium">{outcome.toLocaleString()}</span><span className="text-xs sm:text-base font-ibmplexsans font-medium text-[#4F30AB80]">Outcome</span></div>
                    </div>
                    <div className={`${goodForLoan?'hidden':'h-px bg-[#F0F0F0] w-full'}`}></div>
                    <div className={`${goodForLoan?'hidden':'text-sm sm:text-base font-ibmplexsans font-normal text-[#FB542B] w-full'}`}>For the amount you wish to borrow, you must have an income of at least {outcome + 1000} SAR</div>
                  </div>
                  <div className={`flex flex-col gap-4 sm:gap-6 p-4 sm:p-6 bg-white-A700 rounded-2xl`}>
                    <div className="flex flex-col items-center gap-2"><span className="text-base sm:text-[22px] font-ibmplexsans font-medium text-[#34354680]">Period:</span><span className="text-[22px] sm:text-[32px] font-ibmplexsans font-semibold text-[#343546]">{props.duration * 12 } month</span><span className="text-sm sm:text-lg font-ibmplexsans font-normal text-[#34354680]">{loanAmount.toLocaleString()} SAR</span></div>
                    <div className="flex flex-col gap-4">
                      <StyledSlider value={hardLevel} step={1} marks min={0} max={2} disabled />
                      <div className="flex flex-row justify-between w-full">
                        { LEVELS.map((level, index) => <div key={index} className="text-sm sm:text-lg font-semibold font-ibmplexsans">{level}</div>)}
                      </div>
                      <div>
                        <span className="font-ibmplexsans text-xs sm:text-sm font-normal">Loan Affordability Assessment: {LEVELS[hardLevel]}</span>
                        <p className="font-ibmplexsans text-xs sm:text-sm font-normal">Based on the information you provided, your monthly loan repayment represents {repaymentRate.toFixed(1)}% of your net income after expenses. This places your loan repayment burden in the {LEVELS[hardLevel]} category.</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col h-auto sm:h-full">
                  { showPerformance && <div className={`flex flex-col bg-white-A700 rounded-2xl p-4 sm:p-6 h-auto sm:h-full justify-between`}>
                    <div className="flex flex-col justify-between gap-1 items-center"><span className=" text-3xl font-ibmplexsans font-semibold">{performance}%</span><span className="font-ibmplexsans text-base sm:text-lg font-normal text-[#343546BF]">Monthly expenses</span></div>
                    <div className="flex items-center justify-center">
                      <PieChart width={300} height={300}>
                        <Pie
                          data={chartData}
                          cx={150}
                          cy={150}
                          innerRadius={120}
                          outerRadius={130}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {chartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                      </PieChart>
                    </div>
                    <div className="grid grid-rows-2 grid-cols-2 gap-2 sm:gap-4">
                      {chartData.map((item, index) => {
                        if (item.value > 0) return (<div key={index} className="flex flex-row gap-2 sm:gap-4 items-center">
                          <span className={`rounded-full w-3 h-3 sm:w-4 sm:h-4`} style={{backgroundColor: COLORS[index]}}></span>
                          <span className="font-ibmplexsans text-sm sm:text-lg font-normal max-w-min pr-0 sm:pr-4 text-blue_gray-800_bf">{item.name}</span>
                          <span className="font-ibmplexsans text-sm sm:text-lg font-normal text-blue_gray-800_bf">{item.value}%</span>
                        </div>)
                        return;
                      })}
                    </div>
                  </div>}
                </div>
              </div>
              {goodForLoan && <div className="w-full bg-white-A700 rounded-2xl p-4 sm:p-6">
                { showGPTAnswer && <div className="text-sm sm:text-base font-normal font-ibmplexsans text-blue_gray-800">
                {answers[0] &&
                  answers[0].split("\n").map((line, index) => (
                    <p
                      key={index}
                      className="text-sm sm:text-base font-ibmplexsans font-normal text-blue_gray-800"
                    >
                      {line.length == 0 ? <br /> : line}
                    </p>
                  ))}
                </div>}
              </div>}
              <div className={`${goodForLoan?'flex':'hidden'} flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6`}>
                <div className="flex flex-col items-start gap-2 w-full sm:w-auto">
                  <span className="text-base sm:text-[22px] font-ibmplexsans font-medium text-[#2A3139]">To save this information, send it to your email inbox</span>
                  <span className="text-xs font-ibmplexsans font-normal text-[#343546BF]">By clicking the button  “Send it to me” you agree with our personal data policy</span>
                </div>
                <CssStyledTextfield
                  hiddenLabel
                  name="textfield"
                  placeholder="Put your e-mail"
                  className="font-ibmplexsans font-medium leading-[normal] md:h-auto p-0 rounded-md placeholder:text-blue_gray-800_7f sm:h-auto text-base text-left w-full sm:w-[320px]"
                ></CssStyledTextfield>
                <div className="bg-[#FB542B] w-full sm:w-auto py-2 sm:px-5 sm:py-3 text-center cursor-pointer font-ibmplexsans text-sm sm:text-base font-normal text-white-A700 rounded-3xl">Send it to me</div>
              </div>
            </div>
          }
        </div>
      }
    </div>
  )
}

export default LoanCard;