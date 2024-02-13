import React, { useState, useEffect } from 'react';
import Text from "../../components/Text";
import BreadCrumb from '../../components/en/BreadCrumb';
import CustomTabPanel from '../../components/CustomTabPanel';
import CompareSection from '../../components/en/CompareSection';
import styled from "styled-components";
import Filter from "../../components/Filter";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { useAuth } from "../../context/AuthContext";

const StyledTabs = styled(Tabs)({
  '& .MuiTabs-flexContainer': {
    justifyContent: 'space-between'
  },
  '& .MuiTab-root': {
    display: 'flex',
    padding: '16px 24px',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    fontSize: '1.125rem',
    background: '#fff',
    color: '#344054BF',
    fontFamily: 'IBM Plex Sans',
    fontWeight: '600',
    border: '1px solid #F0F0F0',
    borderRadius: '16px 16px 0px 0px !important',
    borderBottom: 'none !important',
    textTransform: 'none',
  },
  '& .Mui-selected': {
    display: 'flex',
    padding: '16px 24px',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    fontSize: '18px',
    color: '#2A3139',
    borderRadius: '16px 16px 0px 0px !important',
    background: '#F0F0F0',
    fontFamily: 'IBM Plex Sans',
    fontWeight: '600',
  },
  '& .MuiTabs-indicator': {
    display: 'none !important',
  },
});

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

function CreditCard(props) {
  const [cardType, setCardType] = useState(1);
  const [isMobile, setIsMobile] = useState(false);
  const [filters, setFilters] = useState({});
  const [totalCount, setTotalCount] = useState(0);
  const [cardTypes, setCardTypes] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { authState, setAuthState } = useAuth();

  useEffect(() => {
    const mobileMediaQuery = window.matchMedia('(max-width: 638px)'); // Adjust the breakpoint as needed
    const handleMobileChange = (event) => {
      setIsMobile(event.matches);
    };
    mobileMediaQuery.addEventListener('change', handleMobileChange);
    setIsMobile(mobileMediaQuery.matches);
    loadCardTypes();
    return () => {
      mobileMediaQuery.removeEventListener('change', handleMobileChange);
    };
  }, []);

  const loadCardTypes = async () => {
    const res = await fetch(`/api/getCardTypes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
    });
    const json = await res.json();
    if (!json.error) {
      setCardTypes(json.data)
    }
    else setError(json.error);
  }

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setCardType(newValue);
  };

  const handleFiltersChange = (filterData) => {
    setFilters(filterData)
  }

  const handleFilterReset = () => { 
    setFilters({});
  };

  return (
    <div className="flex flex-col w-full min-h-screen relative">
      <BreadCrumb mainhref='/' mainLabel='Main' subhref='/' subLabel='Service' corehref='' coreLabel='Credit Cards' />
      { error === '' ?
      <div className="flex flex-col gap-12 justify-start mt-6 mb-0 sm:mb-12 w-auto md:w-full">
        <div className="flex flex-col gap-2 md:h-auto items-start justify-between">
          <Text
            className="text-mainBlue text-sm tracking-[0.70px] font-ibmplexsans uppercase w-auto"
          >
            {totalCount} cards
          </Text>
          <Text
            className="md:max-w-full sm:text-2xl md:text-3xl text-lg font-ibmplexsans text-gray-800 font-semibold"
          >
            Explore our credit cards & choose best option for you
          </Text>
        </div>
        
        {/* Main Content */}
        <div className="w-full flex flex-row gap-6">
          <Filter className="hidden md:flex md:flex-col" 
          filters={filters} cardType={cardType} handlefilterschange={handleFiltersChange} handlefilterreset={handleFilterReset}
          loading={loading} setLoading={setLoading} />
          <div className="w-full md:w-2/3 lg:w-3/4">
            <Box className="w-full h-full flex flex-col">
              <Box>
                <StyledTabs value={cardType} onChange={handleTabChange} variant="scrollable" scrollButtons >
                  { cardTypes.length > 0 && cardTypes.map((cardType, index) =>(
                    <Tab className="sm:flex-1" key={index + 1} label={cardType.typeName} value={cardType.typeID} {...a11yProps(index)} />
                  ))}
                </StyledTabs>
              </Box>
              <CustomTabPanel className={"flex-1 bg-[#F0F0F0] sm:rounded-3xl -mx-4 sm:mx-0"} 
                cardType={cardType} filters={filters} handlefilterschange={handleFiltersChange} setTotalCount={setTotalCount} 
                handlefilterreset={handleFilterReset} setError={setError} loading={loading} setLoading={setLoading} />
            </Box>
          </div>
        </div>
        {/* End Main Content */}
      </div>
      :
      <div className="my-6 flex flex-col gap-4 p-6 items-start justify-between bg-white-A700 border border-pink-600 border-solid rounded-2xl text-3xl font-ibmplexsans text-red-600">
        Something went wrong.
      </div>}
      { authState.compareList.length > 0 && <CompareSection />}
    </div>
  );
}

export default CreditCard;
