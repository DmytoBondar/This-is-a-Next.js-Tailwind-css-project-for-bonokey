import React, { useState, useEffect, ChangeEvent } from "react";
import { useRouter } from "next/router"; 
import { useAuth } from '../context/AuthContext';
import Img from "./Img";
import styled from "styled-components";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import BankCard from "./Card/BankCard";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Filter from "./Filter";
import TuneIcon from "@mui/icons-material/Tune";
import CancelIcon from '@mui/icons-material/Cancel';
import loadCustomRoutes from "next/dist/lib/load-custom-routes";
import Badge from "@mui/material/Badge";
import SortImg from "../img/sort.svg";
import SortActiveImg from "../img/sort-active.svg";
import Loading from '../img/loading.svg';

const StyledPagination = styled(Pagination)({
  "& .MuiPaginationItem-root": {
    border: "none !important",
  },
  "& .MuiPagination-root": {
    padding: "8px !important",
  }
})

const StyledBadge = styled(Badge)({
  "& .MuiBadge-badge": {
    background: "#47AFC8",
    color: "#fff",
    minHeight:"12px",
    height: "12px",
    minWidth: "12px",
    width: "12px",
    fontSize:"10px",
    borderRadius: "12px",
  }
});

const StyledList = styled(List)({
  "& .MuiList-root": {
    padding: "0 !important"
  },
  "& .MuiListItem-root": {
    padding: "0 !important"
  }
})

interface TabPanelProps {
  children?: React.ReactNode;
  className?: string;
  cardType?: number;
  filters?: object;
  setError?: Function;
  handlefilterschange?: Function;
  handlefilterreset?: Function;
  setTotalCount?: Function;
  loading: boolean;
  setLoading: Function;
}

const NextButton = () => {
  return (
    <div className="flex items-center gap-2">
      <span className="text-base text-blue_gray-800 font-ibmplexsans font-medium">Next</span>
      <ArrowForwardIcon sx={{fontSize: "16px"}} />
    </div>
  )
}

const PrevButton = () => {
  return (
    <div className="flex items-center gap-2">
      <ArrowBackIcon sx={{fontSize: "16px"}} />
      <span className="text-base text-blue_gray-800 font-ibmplexsans font-medium">Prev</span>
    </div>
  )
}

function CustomTabPanel(props: TabPanelProps) {
  const [searchWord, setSearchWord] = useState("");
  const [searchMessage, setSearchMessage] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [page, setPage] = useState(1);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [searchBarActive, setSearchBarActive] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const [limit, setLimit] = useState(10);
  const [totalPage, setTotalPage] = useState(0);
  const [creditCards, setCreditCards] = useState([]); 
  const [staticCreditCardList, setStaticCreditCardList] = useState([]);
  const [pageCreditCards, setPageCreditCards] = useState([]);
  const [searchResult, setSearchResult] = useState(false);
  const { authState, setAuthState } = useAuth();
  const router = useRouter();

  const loadCreditCards = async (cardType: number, filters: Object) => {
    if(Object.keys(filters).length > 0) {
      props.setLoading(true);
      let auth_header = "";
      if(authState.isAuthenticated) {
        auth_header = "Bearer "+localStorage.getItem('access_token');
      }
      const res = await fetch(`/api/getCreditCards`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": auth_header,
        },
        body: JSON.stringify({ 
          cardType: cardType,
          filters: filters,
        }),
      });
      const json = await res.json();
      if (!json.error) {
        setCreditCards(json.data);
        setStaticCreditCardList(json.data);
        props.setTotalCount(json.total_count);
        setTotalPage(Math.ceil(json.data.length / limit));
        setPageCreditCards(json.data.slice(0, limit))
        setPage(1);
        setSortBy("");
      }
      else if (json.error === "token is invalid") {
        router.push("/en/signin");
      }
      else props.setError(json.error);
      props.setLoading(false);
    }
  }

  const open = Boolean(anchorEl);
  const handleClickListItem = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  useEffect(() => {
    const mobileMediaQuery = window.matchMedia("(max-width: 638px)"); // Adjust the breakpoint as needed

    const handleMobileChange = (event) => {
      setIsMobile(event.matches);
    };
    mobileMediaQuery.addEventListener("change", handleMobileChange);
    setIsMobile(mobileMediaQuery.matches);
    return () => {
      mobileMediaQuery.removeEventListener("change", handleMobileChange);
    };
  }, []);

  useEffect(() => {
    loadCreditCards(props.cardType, props.filters);
  }, [props.filters, authState.isAuthenticated]);
  
  useEffect(() => {
    setTotalPage(Math.ceil(creditCards.length / limit));
    setPageCreditCards(creditCards.slice(0, limit))
    setPage(1);
  }, [creditCards, sortBy]);

  useEffect(() => {
    setTotalPage(Math.ceil(creditCards.length / limit));
    let tempCreditCards = creditCards;
    setPageCreditCards(tempCreditCards.slice((page - 1) * limit, page * limit));
  }, [limit])

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    let tempCreditCards = creditCards;
    setPageCreditCards(tempCreditCards.slice((value - 1) * limit, value * limit));
    setPage(value)
  }

  const labels = [
    [
      { label: "Offers & Welcome Reward Points", asc: false},
      { label: "Annual Fee", asc: true},
      { label: "Cashback", asc: true},
    ],
    [
      { label: "Offer & Cashback %", asc: false},
      { label: "Annual Fee", asc: true},
      { label: "Cashback Cap", asc: true},
    ],
    [
      { label: "Offers & welcoming Miles", asc: false},
      { label: "Annual Fee", asc: true},
      { label: "Mile per SAR", asc: false},
      { label: "Airport loung", asc: false},
      { label: "Insurance", asc: true},
    ],
    [
      { label: "Offers & Number of Currencies", asc: true},
      { label: "Annual Fee", asc: true},
      { label: "Welcome Reward Points", asc: true},
    ],
    [
      { label: "Offers & Cashback", asc: true},
      { label: "Annual Fee", asc: true},
      { label: "Physical Card", asc: true},
    ],
  ]

  const handleSortby = (index) => {
    if (index != "") {
      switch (index) {
        case "Offers & Welcome Reward Points": {
          creditCards.sort((temp1, temp2) => temp2.welcomingPoints - temp1.welcomingPoints);
          break;
        }
        case "Annual Fee": {
          creditCards.sort((temp1, temp2) => temp1.annualFee - temp2.annualFee);
          break;
        }
        case "Cashback": {
          creditCards.sort((temp1, temp2) => temp1.localCashback - temp2.localCashback);
          break;
        }
        case "Offer & Cashback %": {
          creditCards.sort((temp1, temp2) => temp2.localCashback - temp1.localCashback);
          break;
        }
        case "Cashback Cap": {
          creditCards.sort((temp1, temp2) => temp1.cashbackCap - temp2.cashbackCap);
          break;
        }
        case "Offers & welcoming Miles": {
          creditCards.sort((temp1, temp2) => temp1.welcomingPoints - temp2.welcomingPoints);
          break;
        }
        case "Mile per SAR": {
          creditCards.sort((temp1, temp2) => temp2.localCouponYield - temp1.localCouponYield);
          break;
        }
        case "Airport loung": {
          creditCards.sort((temp1, temp2) => temp2.airportLounges - temp1.airportLounges);
          break;
        }
        case "Insurance": {
          creditCards.sort((temp1, temp2) => temp1.travelInsurance - temp2.travelInsurance);
          break;
        }
        case "Offers & Number of Currencies": {
          creditCards.sort((temp1, temp2) => temp1.numberOfCurrencies - temp2.numberOfCurrencies);
          break;
        }
        case "Welcome Reward Points": {
          creditCards.sort((temp1, temp2) => temp1.welcomingPoints - temp2.welcomingPoints);
          break;
        }
        case "Offers & Cashback": {
          creditCards.sort((temp1, temp2) => temp2.localCashback - temp1.localCashback);
          break;
        }
        case "Physical Card": {
          creditCards.sort((temp1, temp2) => temp2.supportsPhysicalCard - temp1.supportsPhysicalCard);
          break;
        }
      }
    }
  };

  const handleMenuItemClick = (
    event: React.MouseEvent<HTMLElement>,
    index: number,
  ) => {
    handleSortby(labels[props.cardType-1][index].label);
    setSortBy(labels[props.cardType-1][index].label)
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleActive = () => {
    setSearchBarActive(!searchBarActive);
  }

  const handleSearchChange = async (event: ChangeEvent<HTMLInputElement>) => {
    setSearchWord(event.target.value);
    if(event.target.value != ""){
      const tempCreditCards = staticCreditCardList.filter((creditCard) => {
        return creditCard.name.toUpperCase().indexOf(event.target.value.toUpperCase()) > -1;
      });
      setCreditCards(tempCreditCards);
      setSearchResult(true);
    }
    else {
      loadCreditCards(props.cardType, props.filters)
      setSearchResult(false);
    }
  }
  
  const loadShowMore = () => {
    setLimit(limit + 10);
  };

  return (
    <div
      role="tabpanel"
      className={props.className}
    >
      { (filterOpen && isMobile) && <Filter className="absolute z-10 bg-white-A700 p-4 sm:p-0" 
        filters={props.filters}
        cardType={props.cardType}
        handlefilterschange={props.handlefilterschange} 
        handleClose={() => {setFilterOpen(false)}} 
        handlefilterreset={props.handlefilterreset} loading={props.loading} setLoading={props.setLoading}/> 
      }
      { !props.loading?<Box sx={{ p: 3 }} className="flex flex-col gap-4" >
        <div className="flex items-center justify-between w-full">
          <div className="flex sm:hidden w-8 h-8 mr-4 sm:mr-0" onClick={() => setFilterOpen(!filterOpen)}>
            <StyledBadge variant="dot" invisible={Object.keys(props.filters).length == 0}>
              <TuneIcon sx={{fontSize: "32px"}} />
            </StyledBadge>
          </div>
          <div className={`flex flex-row items-center justify-end sm:justify-between w-full ${searchBarActive?"flex-1 ml-2":""}`}>
            {isMobile?
            <div className={`flex flex-col w-full items-end`}>
              {
                searchBarActive?
                <div className={`w-full flex flex-row items-center px-2 py-1 rounded-2xl mr-0 bg-white-A700 relative`}>
                  <SearchIcon className="w-8 h-8 text-blue_gray-800_bf" />
                  <input className={`border-0 flex-1 text-purple-800 ${searchBarActive?"flex":"hidden sm:flex"} ${searchMessage?"flex-1":""}`} placeholder="Search" value={searchWord} 
                    onChange={handleSearchChange}
                  />
                  <CancelIcon className="w-5 h-5 absolute text-blue_gray-800_bf -top-2 -right-2" onClick={() => {
                    setSearchBarActive(false);
                    setSearchWord("");
                    loadCreditCards(props.cardType, props.filters)
                    setSearchResult(false);
                  }}/>
                </div>
                :<SearchIcon className="w-8 h-8 text-blue_gray-800_bf" onClick={() => {
                  setSearchBarActive(true);
                  setSearchWord("");
                }} />
              }
            </div>
            :
            <div className={`flex flex-col items-start w-auto sm:max-w-[560px] ${searchMessage?"flex-1 gap-3":""} ${searchBarActive?"flex-1":"md:w-72"}`} onFocus={handleActive} onBlur={handleActive}>
              <div className={`w-auto sm:w-full flex items-center px-4 py-1 rounded-2xl mr-0 sm:mr-6 bg-white-A700 min-h-[42px] ${searchMessage?"border border-mainBlue":""}`}>
                <SearchIcon className="w-8 h-8 sm:w-6 sm:h-6" />
                <input className={`border-0 flex-1 text-purple-800 ${searchBarActive?"flex":"hidden sm:flex"} ${searchMessage?"flex-1":""}`} placeholder="Search" value={searchWord} 
                  onChange={handleSearchChange}
                />
              </div>
              {searchMessage&&<div className="hidden sm:flex">{searchMessage}</div>}
            </div>}
            <div className="flex items-center">
              <StyledList
                className="bg-transparent"
              >
                <ListItem
                  id="lock-button"
                  aria-haspopup="listbox"
                  aria-controls="lock-menu"
                  aria-expanded={open?"true":undefined}
                  onClick={handleClickListItem}
                >
                  <div className="flex items-center cursor-pointer">
                    <Img src={sortBy? SortActiveImg.src:SortImg.src} width="50" height="50" alt="" />
                    <span className="hidden sm:flex font-ibmplexsans mx-2 text-lg font-semibold text-blue_gray-800_bf">Sort by</span>
                    <div className="hidden sm:flex font-ibmplexsans text-[#3559E0] text-lg font-semibold">{sortBy}</div>
                  </div>
                </ListItem>
              </StyledList>
              <Menu
                id="lock-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  "aria-labelledby": "lock-button",
                  role: "listbox",
                }}
              >
                {labels[props.cardType-1].map((item, index) => {
                  return <MenuItem key={index} onClick={(event) => handleMenuItemClick(event, index)}>
                    <div className="flex items-center justify-between w-full">
                      <span className="font-ibmplexsans text-base mr-2">{item.label}</span>
                      {item.asc?<ArrowDownwardIcon sx={{fontSize:"16px"}} />:<ArrowUpwardIcon sx={{fontSize:"16px"}} />}
                    </div>
                  </MenuItem>
                })}
              </Menu>
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          {
          pageCreditCards.length == 0 && !props.loading ?
            <div className="my-6 flex flex-col gap-4 p-6 items-start justify-between bg-white-A700 border border-pink-600 border-solid rounded-2xl">
              <span className="text-left sm:text-2xl md:text-[28px] text-[26px] text-pink-600 w-full font-ibmplexsans font-semibold">Oops&#33; Something went wrong.</span>
              <span className="text-left text-[16px] sm:text-lg text-pink-600 md:text-xl w-full font-ibmplexsans font-medium">Nothing was found for your filter.</span>
              <span className="text-left text-lg text-pink-600 w-full font-ibmplexsans font-semibold">Try changing the filter.</span>
            </div>
            :
            <div className="flex flex-col gap-6 relative">
              { searchResult &&
                <div className="my-2 font-ibmplexsans text-2xl font-semibold">
                  There are {creditCards.length} matches for your request&#58;
                </div>
              }
              <div className="flex flex-col gap-6">
                {
                  pageCreditCards.map((creditCard, index) => {
                    return (
                      <BankCard cardInfo={creditCard} key={index} />
                    )
                  })
                }
              </div>
              { totalPage > 1 && <div className="bg-blue_gray-800_3f h-px w-full"></div>}
              {
                totalPage > 1 &&
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="text-blue_gray-800_7f cursor-pointer font-ibmplexsans font-medium leading-[normal] text-base text-center w-full sm:w-48 rounded-lg py-3 px-4 outline outline-[0.5px] outline-blue_gray-800_7f" onClick={loadShowMore} >
                    Show more
                  </div>
                  <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
                    <StyledPagination count={totalPage} defaultPage={1} siblingCount={0} boundaryCount={1} variant="outlined" size={isMobile?"small":"large"} shape="rounded" sx={{padding:"8px 16px", background: "#fff", borderRadius:"8px"}}
                      renderItem={(item) => (
                        <PaginationItem
                          slots={{ previous: PrevButton, next: NextButton }}
                          {...item}
                        />
                      )}
                      onChange={handlePageChange}
                     />
                    <div className="text-left text-blue_gray-800_7f text-sm w-auto font-ibmplexsans font-medium">{page} of {totalPage}</div>
                  </div>
                </div>
              }
            </div>
          }
        </div>
        </Box>
      :<Box className="flex flex-col justify-center items-center min-h-screen">
        <Img src={Loading.src} className="w-40 h-40"/>
      </Box>}
    </div>
  );
}

export default CustomTabPanel;