import React, { useState, useEffect } from 'react';
import { Line } from "../../components/Line";
import BreadCrumb from '../../components/en/BreadCrumb';
import Img from '../../components/Img';
import TextField from '@mui/material/TextField';
import Loanback from '../../img/loan-back.svg';
import styled from "styled-components";
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Menu from '@mui/material/Menu';
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import InputAdornment from '@mui/material/InputAdornment';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import LoanCard from '../../components/Card/LoanCard';
import FindCompareIcon from '../../img/Find&Compare Icon.svg';
import FinancialIcon from '../../img/Financial Icon.svg';
import BestRateIcon from '../../img/Best Rate Icon.svg';
import SortImg from '../../img/sort.svg';
import SortActiveImg from '../../img/sort-active.svg';

const CssStyledTextfield = styled(TextField)({
  '& .MuiInputBase-input':{
    borderRadius: '40px',
    padding: '12px 16px',
    lineHeight: '1.25rem',
    fontFamily: 'IBM Plex Sans',
    fontSize: '1rem',
    backgroundColor: '#ffffff',
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
const StyledList = styled(List)({
  '& .MuiList-root': {
    padding: '0 !important'
  },
  '& .MuiListItem-root': {
    padding: '0 !important'
  }
})

const StyledPagination = styled(Pagination)({
  '& .MuiPaginationItem-root': {
    border: 'none !important',
  },
  '& .MuiPagination-root': {
    padding: '8px !important',
  }
})

const StyledSelect = styled(Select)({
  '& .MuiInputBase-root': {
    borderRadius: '32px !important',
  },
  '& .MuiSelect-root': {
    borderRadius: '32px !important',
  },
  '& .MuiSelect-select': {
    width: '100%',
    fontSize:'1rem',
    fontFamily: 'IBM Plex Sans',
    color: '#2A3139',
    padding: '12px 16px !important',
    borderRadius: '32px !important',
    backgroundColor: '#FFFFFF',
  },
  '& .MuiOutlinedInput-root': {
    borderRadius: '32px !important',
  },
  '& .MuiInputBase-root-MuiOutlinedInput-root-MuiSelect-root':{
    borderRadius: '32px !important',
  }
})

const NextButton = () => {
  return (
    <div className="flex items-center gap-2">
      <span className="text-base text-blue_gray-800 font-ibmplexsans font-medium">Next</span>
      <ArrowForwardIcon sx={{fontSize: '16px'}} />
    </div>
  )
}

const PrevButton = () => {
  return (
    <div className="flex items-center gap-2">
      <ArrowBackIcon sx={{fontSize: '16px'}} />
      <span className="text-base text-blue_gray-800 font-ibmplexsans font-medium">Prev</span>
    </div>
  )
}

const Duration = [1, 2, 3, 4, 5];

type BankProps = {
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
};

async function getSalaryGroup(salary: number) {
  const res = await fetch("/api/salary/get", {
    method: "POST",
    body: JSON.stringify({ salary }),
  }).then((res) => res.json());
  return res?.salary;
}

function Loan () {
  const [jobSectorsArray, setJobSectorsArray] = useState([]);
  const [loanBankArray, setLoanBankArray] = useState([]);
  const [jobSector, setJobSector] = useState(0);
  const [maxLoan, setMaxLoan] = useState(false);
  const [duration, setDuration] = useState(1);
  const [monthlySalarySTR, setMonthlySalarySTR] = useState('');
  const [monthlySalary, setMonthlySalary] = useState<number>();
  const [loanAmountSTR, setLoanAmountSTR] = useState('');
  const [loanAmount, setLoanAmount] = useState<number>();

  const [isMonthlyActive, setIsMonthlyActive] = useState(false);
  const [isJobSectorActive, setIsJobSectorActive] = useState(false);
  const [isLoanActive, setIsLoanActive] = useState(false);
  const [isDurationActive, setIsDurationActive] = useState(false);
  const [disableApply, setDisableApply] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [monthYear, setMonthYear] = useState("December 2023");
  const [sortBy, setSortBy] = useState('');
  const [totalPages, setTotalPages] = useState(0);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(5);
  const [error, setError] = useState('');
  const [filteredBestBanks, setFilteredBestBanks] = useState([]);
  const [staticBestBanks, setStaticBestBanks] = useState([]);
  const [pageFilteredBanks, setPageFilteredBanks] = useState([]);

  const [rentAmount, setRentAmount] = useState<number>();
  const [foodAmount, setFoodAmount] = useState<number>();
  const [carInsuranceAmount, setCarInsuranceAmount] = useState<number>();
  const [fuelAmount, setFuelAmount] = useState<number>();
  const [gymAmount, setGymAmount] = useState<number>();
  const [activityAmount, setActivityAmount] = useState<number>();
  const [otherAmount, setOtherAmount] = useState<number>();

  const loadJobSectors = async() => {
    const res = await fetch(`/api/getJobSectors`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await res.json();
    if (!json.error) {
      setJobSectorsArray(json.data);
    }
  }

  const loadLoanBanks = async () => {
    const res = await fetch(`/api/getLoanBanks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await res.json();
    if (!json.error) {
      setLoanBankArray(json.data);
    }
  }
  
  useEffect(() => {
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleString('en-US', { month: 'long', year: 'numeric' });
    setMonthYear(formattedDate);

    const mobileMediaQuery = window.matchMedia('(max-width: 638px)'); // Adjust the breakpoint as needed

    const handleMobileChange = (event) => {
      setIsMobile(event.matches);
    };

    setTotalPages(Math.ceil(filteredBestBanks.length / limit));
    loadJobSectors();
    loadLoanBanks();

    mobileMediaQuery.addEventListener('change', handleMobileChange);
    setIsMobile(mobileMediaQuery.matches);
    return () => {
      mobileMediaQuery.removeEventListener('change', handleMobileChange);
    };
  }, []);

  useEffect(() => {
    setTotalPages(Math.ceil(filteredBestBanks.length / limit));
    setPageFilteredBanks(filteredBestBanks.slice(0, limit));
  }, [filteredBestBanks, limit]);

  useEffect(() => {
    if(!isNaN(monthlySalary) && jobSector >= 0 && (!isNaN(loanAmount) || maxLoan)) {
      setDisableApply(false);
    }
    else setDisableApply(true);

  }, [monthlySalary, jobSector, loanAmount, maxLoan])

  const loadShowMore = () => {
    setLimit(limit + 5);
  };
  const open = Boolean(anchorEl);
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleJobSectorChange = (event) => {
    setJobSector(event.target.value)
  }

  const handleDuration = (event) => {
    setDuration(event.target.value);
  }

  const handleClickListItem = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const labels = [
    'By lowest APR',
    'Offers',
    'No salary transfer',
  ]

  const handleMenuItemClick = (
    event: React.MouseEvent<HTMLElement>,
    value: string,
    index: number,
  ) => {
    handleSortby(value);
    setSortBy(labels[index])
    setAnchorEl(null);
  };

  const handleSortby = (filter: string) => {
    const filteredBanks =
      filter === "all"
        ? staticBestBanks.filter((bank, index) => bank)
        : filter === "offers"
        ? staticBestBanks.filter((bank, index) => bank.offer)
        : filter === "no-salary-transfer"
        ? staticBestBanks.filter((bank, index) => !bank.salaryTransfer)
        : null;
    filteredBanks.sort((a, b) => a.apr - b.apr);
    setFilteredBestBanks(filteredBanks);
  };

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPageFilteredBanks(filteredBestBanks.slice((value - 1) * limit, value * limit));
    setPage(value)
  }

  const handleLoanBankSearch = async () => {
    setSortBy('');
    if (!disableApply) {
      setError(null);

      const sector = jobSectorsArray.find(
        (obj) => obj.name === jobSectorsArray[jobSector].name
      );

      const lowestApr = Math.min(...loanBankArray.map((bank) => Math.min(...bank.aprValues.map((aprValue) => aprValue.value))));
      const minimumLoan = Math.min(...loanBankArray.map((bank) => bank.minLoan));
      const maximumLoan = (monthlySalary * (1 / 3) * (duration * 12)) / (1 + (lowestApr / 100) * duration);
      const minSalary = Math.min(...loanBankArray.map((bank) => bank.minSalary));
      const salaryGroup = await getSalaryGroup(monthlySalary);
      // Check for errors
      console.log("params:", loanAmount, maximumLoan, minimumLoan, maxLoan, monthlySalary, minSalary)
      if (loanAmount > maximumLoan && !maxLoan)
        setError(
          `Sorry, based on your salary and term the maximum loan you can get is ${maximumLoan.toFixed(1).toLocaleString()} SAR. Try a different search.`
        );
      if (loanAmount < minimumLoan && !maxLoan)
        setError(
          `Sorry, the minimum loan amount we could find is ${minimumLoan.toLocaleString()} SAR. Try a different search.`
        );
      if (monthlySalary < minSalary)
        setError(
          `Sorry, the minimum monthly salary we could find is ${minSalary.toLocaleString()} SAR. Try a different search.`
        );
      
      if( error === "" || error === null) {
        const banksProps: BankProps[] = loanBankArray.map((bank) => {
          const banks = {} as BankProps;
          banks.name = bank.name;
          banks.logo = bank.logo;
          banks.mobile = bank.mobile;
          banks.bankUrl = bank.url;
          banks.apr = bank.aprValues.find(
            ({ bankId, salaryId, sectorId }) =>
              bankId === bank.id &&
              salaryId === salaryGroup?.id &&
              sectorId === sector.id
          )?.value;
          banks.total = maxLoan
            ? monthlySalary * (1 / 3) * (duration * 12)
            : loanAmount +
              loanAmount * duration * (banks.apr / 100);
          banks.loan = maxLoan
            ? banks.total / (1 + (banks.apr / 100) * duration)
            : loanAmount;
          banks.monthly = banks.total / (duration * 12);
          banks.fees =
            0.01 * banks.total > 5000 ? 5000 : 0.01 * banks.total;
          banks.maxLoan =
            (monthlySalary * (1 / 3) * (duration * 12)) /
            (1 + (banks.apr / 100) * duration);
          banks.salaryTransfer = bank.salaryTransfer;
          banks.revenue = banks.total - banks.loan;
          banks.minLoan = bank.minLoan;
          banks.offer = bank.offer;
          banks.useMaxLoan = maxLoan;
  
          banks.loanDurationInYears = duration;
          banks.sector = sector.name;
          banks.userMonthlySalary = monthlySalary;
  
          if (
            !banks.apr ||
            monthlySalary < bank.minSalary ||
            (loanAmount < bank.minLoan && !maxLoan) ||
            banks.loan > banks.maxLoan
          )
          return null;
  
          return banks;
        });

        if (banksProps.length > 0 && banksProps != null) {
          // Filter and sort banks
          const filteredBanks = banksProps.filter((bank, index) => bank);
          filteredBanks.sort((a, b) => a.apr - b.apr);
          setStaticBestBanks(filteredBanks);
          setFilteredBestBanks(filteredBanks);
        }
        else {
          setError("No result. Try a different search")
        }
      }
    }
  }

  return (
    <>
      <div className="flex flex-col w-full gap-2">
        <BreadCrumb mainhref='/' mainLabel='Main' corehref="" coreLabel='Loans' />
        <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-between mb-4">
          <div className="flex flex-col items-start gap-3 pt-4 pb-6">
            <div className="flex px-6 py-2 rounded-[50px] bg-[#6733E11A] font-ibmplexsans text-base font-normal text-blue_gray-800 leading-none">Find the right personal loan rate for you</div>
            <div className="font-ibmplexsans text-[22px] sm:text-[48px] text-[#2A3139] font-semibold leading-tight max-w-[540px]">We show your options, you score the win.</div>
          </div>
          <Img src={Loanback.src} className="hidden sm:flex w-[600px] h-auto" />
        </div>
        <div className="flex flex-col p-4 sm:p-8 -mx-4 rounded-3xl bg-[#EEEEEE80] gap-6 sm:gap-8">
          <div className="font-ibmplexsans text-lg sm:text-2xl font-semibold text-[#2A3139]">Compare The Best Loans</div>
          <div className="flex flex-col sm:grid sm:grid-cols-4 gap-6 items-center">
            <div className="flex flex-col items-start gap-3 w-full">
              <div className={`font-ibmplexsans text-base sm:text-lg font-semibold ${isMonthlyActive?'text-[#6733E1]':'text-blue_gray-800_bf'}`}>Your monthly salary*</div>
              <CssStyledTextfield
                hiddenLabel
                name="textfield"
                placeholder="Put your salary here"
                value={monthlySalarySTR}
                onChange={(event) => {
                  let tempMonthlySalary = "";
                  if (Number(event.target.value.replace(/\D/g, '')) > 90000) tempMonthlySalary = "90,000";
                  else tempMonthlySalary = Number(event.target.value.replace(/\D/g, '')).toLocaleString();
                  setMonthlySalarySTR(tempMonthlySalary); 
                  setMonthlySalary(parseInt(tempMonthlySalary.replace(/\D/g, '')))
                  }
                }
                onFocus={() => setIsMonthlyActive(true)}
                onBlur={() => setIsMonthlyActive(false)}
                InputProps={{
                  endAdornment: <InputAdornment position="end">SAR</InputAdornment>,
                }}
                className="font-ibmplexsans font-medium leading-0 md:h-auto p-0 placeholder:text-blue_gray-800_7f sm:h-auto w-full"
              ></CssStyledTextfield>
            </div>
            <div className="flex flex-col items-start gap-3 w-full">
              <div className={`font-ibmplexsans text-base sm:text-lg font-semibold ${isJobSectorActive?'text-[#6733E1]':'text-blue_gray-800_bf'}`}>Job sector*</div>
              <StyledSelect value={jobSector} displayEmpty
                className='!rounded-[32px] w-full'
                inputProps={{ 'aria-label': 'Without label' }}
                onChange={handleJobSectorChange}
                onOpen={() => setIsJobSectorActive(true)}
                onClose={() => setIsJobSectorActive(false)}
              >
                {jobSectorsArray.map((jobSector, index) => {
                  return (<MenuItem key={index} value={index}>{jobSector.name}</MenuItem>)
                })}
              </StyledSelect>
            </div>
            <div className="flex flex-col items-start gap-3 w-full">
              <div className={`font-ibmplexsans text-base sm:text-lg font-semibold ${isLoanActive?'text-[#6733E1]':'text-blue_gray-800_bf'}`}>Loan amount*</div>
              <div className="flex flex-row gap-2 items-center w-full">
                <CssStyledTextfield
                  hiddenLabel
                  name="textfield"
                  placeholder="Your amount"
                  className="font-ibmplexsans flex-1 font-medium leading-0 md:h-auto p-0 placeholder:text-blue_gray-800_7f sm:h-auto"
                  sx={{width:'auto'}}
                  value={loanAmountSTR}
                  onChange={(event) => {
                    let tempLoanAmount = "";
                    if(Number(event.target.value.replace(/\D/g, '')) > 1000000) tempLoanAmount = "1,000,000";
                    else tempLoanAmount = Number(event.target.value.replace(/\D/g, '')).toLocaleString();
                    setLoanAmountSTR(tempLoanAmount); 
                    setLoanAmount(parseInt(tempLoanAmount.replace(/\D/g, '')))
                    }
                  }
                  onFocus={() => setIsLoanActive(true)}
                  onBlur={() => setIsLoanActive(false)}
                  disabled={maxLoan}
                ></CssStyledTextfield>
                <div className={`cursor-pointer text-sm sm:text-base font-ibmplexsans font-semibold px-4 py-3 rounded-lg border w-[108px] h-[48px] flex items-center justify-center ${maxLoan?'text-white-A700 bg-[#692D90]':'text-blue_gray-800_bf border-[#34405480] bg-white-A700'}`}
                  onClick={() => setMaxLoan(!maxLoan)}
                >Max Loan</div>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-6 items-end w-full">
              <div className="flex flex-col items-start gap-3 w-full sm:w-[200px]">
                <div className={`font-ibmplexsans text-base sm:text-lg font-semibold ${isDurationActive?'text-[#6733E1]':'text-blue_gray-800_bf'}`}>Duration (Years)</div>
                <StyledSelect value={duration} displayEmpty
                  inputProps={{ 'aria-label': 'Without label' }} className="w-full !rounded-[32px]"
                  onChange={handleDuration}
                  onOpen={() => setIsDurationActive(true)}
                  onClose={() => setIsDurationActive(false)}
                >
                  {Duration.map((dura, index) => {
                    return (<MenuItem key={index} value={index+1}>{dura}</MenuItem>)
                  })}
                </StyledSelect>
              </div>
              <div className={`flex flex-1 w-full items-center justify-center px-4 py-3 cursor-pointer rounded-lg font-ibmplexsans font-medium leading-6 text-sm sm:text-base text-center text-white-A700 ${disableApply?'bg-blue-300':'bg-mainBlue'}`}
                onClick={handleLoanBankSearch}
              >
                Search
              </div>
            </div>
          </div>
          {error != "" && <div className='font-base font-ibmplexsans font-normal text-red-500'>{error}</div>}
        </div>
        {
          filteredBestBanks.length > 0 ?
          <div className="flex flex-col items-start mt-14">
            <div className="flex flex-col items-start rounded-t-[24px] sm:rounded-t-[44px] -mx-4 sm:-mx-6 md:-mx-8 lg:-mx-24 xl:-mx-18 box-border w-screen px-4 py-8 sm:px-[108px] sm:py-20 gap-6 sm:gap-11 bg-[#EEEEEEB2]">
              <div className="flex flex-col sm:flex-row items-center justify-between w-full">
                <div className="flex flex-col items-start gap-3 w-full sm:w-auto">
                  <div className="text-2xl sm:text-[40px] font-semibold font-ibmplexsans text-[#2A3139]">Best Loans proposals in {monthYear}</div>
                  <div className="text-sm sm:text-base font-normal leading-tight font-ibmplexsans text-blue_gray-800_bf max-w-[704px]">The APR may vary depending on the loan amount, salary, employer, and term. It may be affected by each client’s credit scoring.</div>
                </div>
                <div className="flex items-center justify-end w-full sm:w-auto">
                  <StyledList
                    className="bg-transparent"
                  >
                    <ListItem
                      id="lock-button"
                      aria-haspopup="listbox"
                      aria-controls="lock-menu"
                      aria-expanded={open ? 'true' : undefined}
                      onClick={handleClickListItem}
                    >
                      <div className="flex items-center cursor-pointer bg-white-A700 gap-1 px-2 py-1 sm:px-4 sm:py-2 rounded-xl">
                        <Img src={sortBy? SortActiveImg.src:SortImg.src} className="w-8 h-8 sm:w-11 sm:h-11" width="44" height="44" alt="" />
                        <span className="flex font-ibmplexsans mx-2 text-sm sm:text-lg font-semibold text-blue_gray-800">Sort by</span>
                        <div className="flex font-ibmplexsans text-[#3559E0] text-sm sm:text-lg font-semibold">{sortBy}</div>
                      </div>
                    </ListItem>
                  </StyledList>
                  <Menu
                    id="lock-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                      'aria-labelledby': 'lock-button',
                      role: 'listbox',
                    }}
                  >
                    <MenuItem sx={{width: 180}} onClick={(event) => handleMenuItemClick(event, "all", 0)}>
                      <div className="flex items-center justify-between w-full">
                        <span className="font-ibmplexsans text-base">By lowest APR</span>
                        <ArrowDownwardIcon sx={{fontSize:'16px'}} />
                      </div>
                    </MenuItem>
                    <MenuItem sx={{width: 180}} onClick={(event) => handleMenuItemClick(event, "offers", 1)}>
                      <div className="flex items-center justify-between w-full">
                        <span className="font-ibmplexsans text-base">Offers</span>
                      </div>
                    </MenuItem>
                    <MenuItem sx={{width: 180}} onClick={(event) => handleMenuItemClick(event, "no-salary-transfer", 2)}>
                      <div className="flex items-center justify-between w-full">
                        <span className="font-ibmplexsans text-base">No salary transfer</span>
                      </div>
                    </MenuItem>
                  </Menu>
                </div>
              </div>
              <div className="flex flex-col gap-4 sm:gap-6 w-full">
                {pageFilteredBanks.map((loanBank, index) => {
                  return <LoanCard key={index} bankInfo={loanBank} monthlySalary={monthlySalary} loanAmount={loanAmount} duration={duration}
                  rentAmount={rentAmount} setRentAmount={setRentAmount} foodAmount={foodAmount} setFoodAmount={setFoodAmount} carInsuranceAmount={carInsuranceAmount} setCarInsuranceAmount={setCarInsuranceAmount}
                  fuelAmount={fuelAmount} setFuelAmount={setFuelAmount} gymAmount={gymAmount} setGymAmount={setGymAmount} activityAmount={activityAmount} setActivityAmount={setActivityAmount} 
                  otherAmount={otherAmount} setOtherAmount={setOtherAmount} />
                })}
              </div>
              { totalPages > 1 ? 
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 w-full">
                <div className="!text-blue_gray-800_7f cursor-pointer font-ibmplexsans font-medium leading-[normal] text-sm sm:text-base text-center w-full sm:w-48 rounded-lg py-2 px-3 sm:py-3 sm:px-4 outline outline-[0.5px] outline-blue_gray-800_7f" onClick={loadShowMore} >
                  Show more
                </div>
                <div className="flex flex-row items-center gap-4 w-full sm:w-auto">
                  <StyledPagination count={totalPages} defaultPage={1} siblingCount={0} boundaryCount={1} variant="outlined" size={isMobile?'small':'large'} shape="rounded" sx={{padding: '8px 16px', background: '#fff', borderRadius:'8px'}}
                    renderItem={(item) => (
                      <PaginationItem
                        slots={{ previous: PrevButton, next: NextButton }}
                        {...item}
                      />
                    )}
                    onChange={handlePageChange}
                   />
                  <div className="text-left text-blue_gray-800_7f text-sm w-auto font-ibmplexsans font-medium">{page} of {totalPages}</div>
                </div>
              </div>
              :<></>
              }
            </div>
          </div>
          :<div className="flex flex-col items-start">
            <div className="px-0 sm:pl-6 py-[44px] sm:py-24 w-full sm:max-w-[704px] font-ibmplexsans text-lg sm:text-3xl text-blue_gray-800_bf">
              The Best Loans offers in will be displayed here after you have entered your data.
            </div>
            <div className="flex flex-col items-start rounded-t-[24px] sm:rounded-t-[44px] -mx-4 sm:-mx-6 md:-mx-8 lg:-mx-24 xl:-mx-18 box-border w-screen px-4 py-8 sm:px-[108px] sm:py-20 gap-6 sm:gap-11 bg-[#EEEEEEB2]">
              <div className="text-lg sm:text-3xl font-ibmplexsans font-semibold text-blue_gray-800">Why are we the choice of thousands?</div>
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex flex-col items-start gap-6 p-6 bg-white-A700 rounded-2xl">
                  <Img src={FindCompareIcon.src} className="w-[60px] h-[60px] sm:w-[120px] sm:h-[120px]" />
                  <div className="flex flex-col items-start gap-4">
                    <div className="text-base sm:text-[22px] font-medium font-ibmplexsans text-blue_gray-800">Find & compare</div>
                    <div className="text-sm sm:text-base font-normal leading-tight font-ibmplexsans text-blue_gray-800_bf">Easily find and compare the best product that fits your needs and learn its benefits and features.</div>
                  </div>
                </div>
                <div className="flex flex-col items-start gap-6 p-6 bg-white-A700 rounded-2xl">
                  <Img src={BestRateIcon.src} className="w-[60px] h-[60px] sm:w-[120px] sm:h-[120px]" />
                  <div className="flex flex-col items-start gap-4">
                    <div className="text-base sm:text-[22px] font-medium font-ibmplexsans text-blue_gray-800">Best rates</div>
                    <div className="text-sm sm:text-base font-normal leading-tight font-ibmplexsans text-blue_gray-800_bf">Lowest APR rate and financial products offers that are exclusive only on Bonokey and match your profile.</div>
                  </div>
                </div>
                <div className="flex flex-col items-start gap-6 p-6 bg-white-A700 rounded-2xl">
                  <Img src={FinancialIcon.src} className="w-[60px] h-[60px] sm:w-[120px] sm:h-[120px]" />
                  <div className="flex flex-col items-start gap-4">
                    <div className="text-base sm:text-[22px] font-medium font-ibmplexsans text-blue_gray-800">Financial advisor</div>
                    <div className="text-sm sm:text-base font-normal leading-tight font-ibmplexsans text-blue_gray-800_bf">You need to speak to expert to help you understand and help you in your financial needs? We get you covered.</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        }
      </div>
    </>
  );
}

export default Loan; 