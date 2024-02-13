import React, { useState, useEffect, MouseEvent } from "react";
import Typography from '@mui/material/Typography';
import CloseableCard from "./Card/CloseableCard";
import Text from "./Text";
import { Close, Search, FilterList, KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';
import CustomCheckbox from './CustomCheckbox';
import Slider from '@mui/material/Slider';
import { Button } from "./Button";
import styled from "styled-components";
import Skeleton from '@mui/material/Skeleton';

type Props = {
  className?: string;
  cardType?: number;
  filters?:Object;
  handleClose?: Function;
  handlefilterschange?: Function;
  handlefilterreset?: Function;
  loading: boolean;
  setLoading: Function;
}

const StyledSlider = styled(Slider)({
  '& .MuiSlider-thumb': {
    height: 28,
    width: 28,
    backgroundColor: '#47AFC8',
  },
  '& .MuiSlider-track': {
    border: 'none',
    backgroundColor: '#47AFC8',
  },
  '& .MuiSlider-rail': {
    opacity: 0.5,
    backgroundColor: '#EEEEEE',
  },
  '& .MuiSlider-valueLabel': {
    fontSize: 12,
    fontWeight: 'normal',
    top: -6,
    backgroundColor: 'unset',
    '&:before': {
      display: 'none',
    },
  },
})

function Filter (props: Props) {
  const [issuingFee, setIssuingFee] = useState<number[]>([0, 1]);
  const [airportLounges, setAirportLounges] = useState<number[]>([0, 1]);
  const [localCashback, setLocalCashback] = useState<number[]>([0, 1]);
  const [cashWithdrawal, setCashWithdrawal] = useState<number[]>([0, 1]);
  const [issuerList, setIssuerList] = useState([]);
  const [issuerFilter, setIssuerFilter] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [offerList, setOfferList] = useState([]);
  const [offerFilter, setOfferFilter] = useState([]);

  const [issueRange, setIssueRange] = useState({
    min: 0,
    max: 0
  })

  const [airportRange, setAirportRange] = useState({
    min: 0,
    max: 0
  })

  const [localRange, setLocalRange] = useState({
    min: 0,
    max: 0
  })

  const [cashRange, setCashRange] = useState({
    min: 0,
    max: 0
  })
  
  const loadFilterInfo = async() => {
    props.setLoading(true);
    const res = await fetch(`/api/getCCFilters`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        cardType: props.cardType,
      })
    });
    const json = await res.json();
    if (!json.error) {
      setIssuingFee([json.data.fee.min, json.data.fee.max]);
      setAirportLounges([json.data.lounges.min, json.data.lounges.max]);
      setLocalCashback([json.data.cashback.min, json.data.cashback.max]);
      setCashWithdrawal([json.data.withdraw.min, json.data.withdraw.max]);
      setIssueRange(json.data.fee);
      setAirportRange(json.data.lounges);
      setLocalRange(json.data.cashback);
      setCashRange(json.data.withdraw);
      let issuers = json.data.issuers;
      issuers = issuers.map(item => {
        return {
          ...item,
          checked: false
        }
      })
      setSelectAll(false);
      setIssuerList(issuers);
      setIssuerFilter(json.data.issuers.map(issuer => {return issuer.issuerID }));
      let offers = json.data.offers;
      offers = offers.map(item => {
        return {
          ...item,
          checked: false,
        }
      })
      setOfferList(offers);
      setOfferFilter([]);
      props.handlefilterschange({
        issue: [json.data.fee.min, json.data.fee.max],
        airport: [json.data.lounges.min, json.data.lounges.max],
        local: [json.data.cashback.min, json.data.cashback.max],
        withdraw: [json.data.withdraw.min, json.data.withdraw.max],
        issuers: json.data.issuers.map(issuer => {return issuer.issuerID }),
        offer: [],
      })
    }
  }

  useEffect(() => {
    loadFilterInfo();
    setSelectAll(true);
  }, [props.cardType]);

  useEffect( () => {
    const mobileMediaQuery = window.matchMedia('(max-width: 638px)'); // Adjust the breakpoint as needed
    const handleMobileChange = (event) => {
      setIsMobile(event.matches);
    };
    mobileMediaQuery.addEventListener('change', handleMobileChange);
    setIsMobile(mobileMediaQuery.matches);
    return () => {
      mobileMediaQuery.removeEventListener('change', handleMobileChange);
    };
  }, []);

  const handleSelectAll = () => {
    let tempIssuerList = issuerList;
    tempIssuerList = tempIssuerList.map(item => {
      return {
        ...item,
        checked: !selectAll,
      }
    });
    setIssuerList(tempIssuerList);
    const tempIssuers = tempIssuerList.filter(item => {return item.checked});
    if(tempIssuers.length > 0) {
      setIssuerFilter(tempIssuers.map(item => { if(item.checked) return item.issuerID;}))
      props.handlefilterschange({
        issue: issuingFee,
        airport: airportLounges,
        local: localCashback,
        withdraw: cashWithdrawal,
        issuers: tempIssuers.map(item => { if(item.checked) return item.issuerID;}),
        offer: offerFilter,
      })
    }
    else {
      setIssuerFilter([]);
      props.handlefilterschange({
        issue: issuingFee,
        airport: airportLounges,
        local: localCashback,
        withdraw: cashWithdrawal,
        issuers: [],
        offer: offerFilter,
      })
    }
    setSelectAll(!selectAll);
  }

  const handleIssuingFeeChangeCommitted = (event: Event, newValue: number | number[]) => {
    setIssuingFee(newValue as number[]);
    props.handlefilterschange({
      issue: newValue,
      airport: airportLounges,
      local: localCashback,
      withdraw: cashWithdrawal,
      issuers: issuerFilter,
      offer: offerFilter,
    })
  };
  
  const handleIssuingFeeChange = (event: Event, newValue: number | number[]) => {
    setIssuingFee(newValue as number[]);
  };

  const handleAirportloungeChangeCommitted = (event: Event, newValue: number | number[]) => {
    setAirportLounges(newValue as number[]);
    props.handlefilterschange({
      issue: issuingFee,
      airport: newValue,
      local: localCashback,
      withdraw: cashWithdrawal,
      issuers: issuerFilter,
      offer: offerFilter,
    })
  };

  const handleAirportloungeChange = (event: Event, newValue: number | number[]) => {
    setAirportLounges(newValue as number[]);
  };

  const handleLocalCashbackChangeCommitted = (event: Event, newValue: number | number[]) => {
    setLocalCashback(newValue as number[]);
    props.handlefilterschange({
      issue: issuingFee,
      airport: airportLounges,
      local: newValue,
      withdraw: cashWithdrawal,
      issuers: issuerFilter,
      offer: offerFilter,
    })
  };

  const handleLocalCashbackChange = (event: Event, newValue: number | number[]) => {
    setLocalCashback(newValue as number[]);
  };

  const handleCashwithdrawalChangeCommitted = (event: Event, newValue: number | number[]) => {
    setCashWithdrawal(newValue as number[]);
    props.handlefilterschange({
      issue: issuingFee,
      airport: airportLounges,
      local: localCashback,
      withdraw: newValue,
      issuers: issuerFilter,
      offer: offerFilter,
    })
  };

  const handleCashwithdrawalChange = (event: Event, newValue: number | number[]) => {
    setCashWithdrawal(newValue as number[]);
  };

  const handleClose = (event: MouseEvent<HTMLDivElement>) => {
    if(isMobile){
      props.handleClose();
    }
  };

  const handleReset = async () => {
    props.handlefilterreset();
    loadFilterInfo();
  }

  const handleIssuerCheckCommitted = (checked: boolean, issuerID: number) => {
    let issuers = issuerList;
    issuers = issuers.map((item) => {
      if (item.issuerID != issuerID) {
        return item;
      } 
      return {
        ...item,
        checked: checked
      }
    });
    setIssuerList(issuers);
    const tempFilter_obj = issuers.filter(item => {return item.checked});
    const tempFilter = tempFilter_obj.map(item => {return item.issuerID});
    setIssuerFilter(tempFilter);
    props.handlefilterschange({
      issue: issuingFee,
      airport: airportLounges,
      local: localCashback,
      withdraw: cashWithdrawal,
      issuers: tempFilter,
      offer: offerFilter,
    })
  }

  const handleOfferSelected = (offer: string, checked: boolean) => {
    const tempOfferList = offerList.map((item) => {
      if (item.offerDetails === offer) return {...item, checked: checked}
      else return item
    })
    setOfferList(tempOfferList);
    let tempOfferFilter = tempOfferList.filter(item => item.checked);
    tempOfferFilter = tempOfferFilter.map(item => { return item.offerDetails; })
    setOfferFilter(tempOfferFilter);
    props.handlefilterschange({
      issue: issuingFee,
      airport: airportLounges,
      local: localCashback,
      withdraw: cashWithdrawal,
      issuers: issuerFilter,
      offer: tempOfferFilter,
    })
  };

  return (
    <div className={`w-full md:w-1/3 lg:w-1/4 ${props.className}`}>
      <div className="w-full flex justify-between items-center mb-6 sm:mb-8">
        <div className="flex mr-4 items-center cursor-pointer" onClick={handleClose}>
          <Close className="!flex sm:!hidden text-2xl mr-2" />
          <Text className="text-2xl font-normal font-ibmplexsans">Filters</Text>
        </div>
        <button className="font-ibmplexsans text-base bg-transparent border-0 flex items-center gap-1 text-[#47AFC880] hover:bg-blue_gray-100_3f cursor-pointer px-2 py-1"
          onClick={handleReset}
        >
          Reset
          <Close className="text-lg text-[]" />
        </button>
      </div>
      
      {/* Filter Box */}
      <div className="flex flex-col">
        <CloseableCard title="Bank" customClass="mb-4">
          <div className="flex flex-col items-start justify-between">
            <CustomCheckbox type='selectAll' label="All" checked={selectAll} handleCheckCommitted={handleSelectAll} />
            {
              issuerList.map((issuer, index) => (
                <CustomCheckbox key={index} type='issuer' label={issuer.issuerName} issuerID={issuer.issuerID} number={issuer.count} checked={issuer.checked} handleCheckCommitted={handleIssuerCheckCommitted} />
              ))
            }
          </div>
        </CloseableCard>
        <CloseableCard title="Issuing Fee" customClass="mb-4">
          <div className="flex flex-col items-center w-full">
            <StyledSlider
              getAriaLabel={() => 'Temperature range'}
              value={issuingFee}
              onChangeCommitted={handleIssuingFeeChangeCommitted}
              onChange={handleIssuingFeeChange}
              min={issueRange.min}
              max={issueRange.max}
            />
            <div className="flex items-center justify-between w-full">
              <span className="text-left text-base text-gray-0 w-auto font-ibmplexsans font-medium">{issuingFee[0]} SAR</span>
              <span className="text-left text-base text-gray-0 w-auto font-ibmplexsans font-medium">{issuingFee[1]} SAR</span>
            </div>
          </div>
          {<div className={`${offerList.length > 0?'flex':'hidden'} pt-5 h-px w-full`}></div>}
          <div className="flex flex-col items-start justify-between">
            {
              offerList.map((offer, index) => (
                <CustomCheckbox key={index} type='offerType' checked={offer.checked} label={offer.offerDetails} number={offer._count.cardId} handleCheckCommitted={handleOfferSelected} />
              ))
            }
          </div>
        </CloseableCard>
        <CloseableCard title="Airport lounges" customClass="mb-4">
          <div className="flex flex-col items-center w-full pb-5">
            <StyledSlider
              getAriaLabel={() => 'Temperature range'}
              value={airportLounges}
              onChangeCommitted={handleAirportloungeChangeCommitted}
              onChange={handleAirportloungeChange}
              min={airportRange.min}
              max={airportRange.max}
            />
            <div className="flex items-center justify-between w-full">
              <span className="text-left text-base text-gray-0 w-auto font-ibmplexsans font-medium">{airportLounges[0]}</span>
              <span className="text-left text-base text-gray-0 w-auto font-ibmplexsans font-medium">{airportLounges[1]}</span>
            </div>
          </div>
        </CloseableCard>
        <CloseableCard title="Local cashback" customClass="mb-4">
          <div className="flex flex-col items-center w-full pb-5">
            <StyledSlider
              getAriaLabel={() => 'Temperature range'}
              value={localCashback}
              onChangeCommitted={handleLocalCashbackChangeCommitted}
              onChange={handleLocalCashbackChange}
              min={localRange.min}
              max={localRange.max}
            />
            <div className="flex items-center justify-between w-full">
              <span className="text-left text-base text-gray-0 w-auto font-ibmplexsans font-medium">{localCashback[0]}%</span>
              <span className="text-left text-base text-gray-0 w-auto font-ibmplexsans font-medium">{localCashback[1]}%</span>
            </div>
          </div>
        </CloseableCard>
        <CloseableCard title="Cash withdrawal" subTitle="(Bank's ATM)" customClass="mb-4">
          <div className="flex flex-col items-center w-full pb-5">
            <StyledSlider
              getAriaLabel={() => 'Temperature range'}
              value={cashWithdrawal}
              onChangeCommitted={handleCashwithdrawalChangeCommitted}
              onChange={handleCashwithdrawalChange}
              min={cashRange.min}
              max={cashRange.max}
            />
            <div className="flex items-center justify-between w-full">
              <span className="text-left text-base text-gray-0 w-auto font-ibmplexsans font-medium">{cashWithdrawal[0]} SAR</span>
              <span className="text-left text-base text-gray-0 w-auto font-ibmplexsans font-medium">{cashWithdrawal[1]} SAR</span>
            </div>
          </div>
        </CloseableCard>
      </div>
      {/* End Filter Box */}
    </div>
  )
}

export default Filter;