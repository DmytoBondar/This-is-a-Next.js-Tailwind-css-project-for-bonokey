import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Img from '../Img';
import Rating from '@mui/material/Rating';
import AddIcon from '@mui/icons-material/Add';
import CheckIcon from '@mui/icons-material/Check';
import styled from "styled-components";
import TextField from '@mui/material/TextField';

import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Favorite from '../../img/favorites.svg';
import FavoriteAdded from '../../img/favorites-added.svg';
import Link from "next/link";
import OfferRectangle from "../../img/offerRectangle.svg";
import { useAuth } from '../../context/AuthContext';
import { toast } from "react-hot-toast";

type CardIssuer = {
  issuerID: string,
  issuerName: string,
}
type CardOffer = {
  offerDetails: string,
  validFrom: string,
  validTo: string,
}
type UserFavorite = {
  cardId: number,
  createdAt: Date,
  id: number,
  isFavorite: boolean,
  updatedAt: Date,
  userId: number,
}
type UserReview = {
  cardId: number,
  createdAt: Date,
  rating: number,
  reviewDate: Date,
  reviewID: number,
  reviewText: string,
  updatedAt: Date,
  userId: number,
}
type CardInfo = {
  id: string,
  categoryId: string,
  bankLogo?: string,
  bankName?: string,
  creditCardPhoto?: string,
  name?: string,
  fee?: number,
  localCashback?: number,
  cashWithdrawalBanksAtm?: number,
  airportLounges?: string,
  annualFee?: number,
  cashWithdrawalInternationalAtm?: string,
  cashbackCap: string,
  minToGetCashback: string,
  cashbackConditions: string,
  percentageCashback: string,
  internationalCashback: string,
  localCouponYield: string,
  pointsForEvery100sarLocally: string,
  supplymentaryCard: string,
  numberOfCurrencies: string,
  mainCurrencies: string,
  dollarExchangeRate: string,
  addCurrencyFee: string,
  otherCurrencies: string,
  supportsPhysicalCard: string,
  actualExchangeRateAfterReturn: string,
  travelInsurance?: string,
  specialCluses?: string,
  monthlyProfitRate?: string,
  welcomingPoints?: string,
  percentageOfInternationalTransactionFees: string,
  amountOfInternationalTransactionFees?: string,
  link?: string,
  favorite?: boolean,
  cardIssuer?: CardIssuer,
  cardOffers?: CardOffer[],
  userFavorites?: UserFavorite[],
  userReviews?: UserReview[],
};
type Props= {
  cardInfo?: CardInfo;
};

const CssStyledTextfield = styled(TextField)({
  '& .MuiInputBase-input':{
    padding: '12px 16px',
    lineHeight: '1.25rem',
    fontFamily: 'IBM Plex Sans',
    fontSize: '1rem',
  },
  '& .MuiInputBase-input:active': {
    border: 'none !important',
  },
  '& .MuiOutlinedInput-root': {
  },
  '& .MuiOutlinedInput-root:focus': {
    border: 'none !important',
  },
})

const modalStyle = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const BankCard = (props: Props) => {
  const { authState, setAuthState } = useAuth();
  const [minimized, setMinimized] = useState(true);
  const [favorite, setFavorite] = useState(props.cardInfo.userFavorites.length>0?props.cardInfo.userFavorites[0].isFavorite:false);
  const [added, setAdded] = useState(false);
  const router = useRouter();
  const [cardDetails, setCardDetails] = useState([]);
  const [loading, setLoading] = useState(false);
  const [ratingAvg, setRatingAvg] = useState(0);
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    if(Object.keys(props.cardInfo).length > 0) {
      console.log("bank info:", props.cardInfo)
      setMinimized(true);
      let tempCardDetails = [];
      switch (parseInt(props.cardInfo.categoryId)) {
        case 1 : {
          tempCardDetails.push({ label: 'Annual Fees', value: props.cardInfo.annualFee?props.cardInfo.annualFee+' SAR':'-'})
          tempCardDetails.push({ label: 'Annual Fee Waiver', value: props.cardInfo.specialCluses? props.cardInfo.specialCluses: '-'})
          tempCardDetails.push({ label: 'Cashback', value: "Local: " + props.cardInfo.localCashback+"%"+"<br>"+"Intl: "+props.cardInfo.internationalCashback+"%"})
          tempCardDetails.push({ label: 'Airport Lounges', value: props.cardInfo.airportLounges})
          tempCardDetails.push({ label: 'Monthly Profit Rate', value: props.cardInfo.monthlyProfitRate? props.cardInfo.monthlyProfitRate: '-'})
          tempCardDetails.push({ label: 'Supplymentary Card', value: props.cardInfo.supplymentaryCard})
          tempCardDetails.push({ label: 'Welcome Reward Points', value: props.cardInfo.welcomingPoints?props.cardInfo.welcomingPoints:'-'})
          tempCardDetails.push({ label: 'Travel benefits', value: props.cardInfo.travelInsurance=="checked"?'Insurance': '-'})
          break;
        }
        case 2 : {
          tempCardDetails.push({ label: 'Annual Fees', value: 'SAR '+props.cardInfo.annualFee})
          tempCardDetails.push({ label: 'Cashback', value: "Local: " + props.cardInfo.localCashback+"%"+"<br>"+"Intl: "+props.cardInfo.internationalCashback+"%"})
          if(props.cardInfo.cashbackConditions) {
            const formattedText = props.cardInfo.cashbackConditions.replaceAll("\\n", "<br>");
            tempCardDetails.push({ label: 'Cashback Category', value: formattedText })
          }
          else tempCardDetails.push({ label: 'Cashback Category', value: '-'})
          tempCardDetails.push({ label: 'Cashback Cap', value: props.cardInfo.cashbackCap?'SAR'+props.cardInfo.cashbackCap: '-'})
          tempCardDetails.push({ label: 'Min spend to get cashback', value: props.cardInfo.minToGetCashback?props.cardInfo.minToGetCashback:'-'})
          tempCardDetails.push({ label: 'Monthly Profit Rate', value: props.cardInfo.monthlyProfitRate? props.cardInfo.monthlyProfitRate: '-'})
          tempCardDetails.push({ label: 'Airport Lounges', value: props.cardInfo.airportLounges})
          tempCardDetails.push({ label: 'Travel benefits', value: props.cardInfo.travelInsurance=="checked"?"Insurance":'-'})
          break;
        }
        case 3 : {
          tempCardDetails.push({ label: 'Issuring Fee', value: 'SAR'+props.cardInfo.fee})
          tempCardDetails.push({ label: 'Welcoming Miles', value: props.cardInfo.welcomingPoints? props.cardInfo.welcomingPoints: '-'})
          tempCardDetails.push({ label: 'Mile per SAR', value: props.cardInfo.localCouponYield? props.cardInfo.localCouponYield: '-'})
          tempCardDetails.push({ label: 'Extra Mile when spending', value: props.cardInfo.pointsForEvery100sarLocally? 'SAR'+props.cardInfo.pointsForEvery100sarLocally: '-'})
          tempCardDetails.push({ label: 'Airport lounges', value: props.cardInfo.airportLounges?props.cardInfo.airportLounges:'-'})
          tempCardDetails.push({ label: 'Supplymentary Card', value: props.cardInfo.supplymentaryCard})
          tempCardDetails.push({ label: 'Travel benefits', value: props.cardInfo.travelInsurance=="checked"?"Insurance":'-'})
          tempCardDetails.push({ label: 'International transaction Rates', value: props.cardInfo.amountOfInternationalTransactionFees? "SAR "+props.cardInfo.amountOfInternationalTransactionFees: '-'})
          break;
        }
        case 4 : {
          tempCardDetails.push({ label: 'Annual Fees', value: 'SAR '+props.cardInfo.annualFee})
          tempCardDetails.push({ label: 'Number of Currencies', value: props.cardInfo.numberOfCurrencies? props.cardInfo.numberOfCurrencies: '-'})
          tempCardDetails.push({ label: 'Main Currencies', value: props.cardInfo.mainCurrencies? props.cardInfo.mainCurrencies: '-'})
          tempCardDetails.push({ label: 'USD Exchange Rate', value: props.cardInfo.dollarExchangeRate? props.cardInfo.dollarExchangeRate: '-'})
          tempCardDetails.push({ label: 'Add Currency Fee', value: props.cardInfo.addCurrencyFee? 'SAR'+props.cardInfo.addCurrencyFee: '-'})
          tempCardDetails.push({ label: 'Other Currencies', value: props.cardInfo.otherCurrencies?props.cardInfo.otherCurrencies: '-'})
          tempCardDetails.push({ label: 'Welcome Reward Points', value: props.cardInfo.welcomingPoints? props.cardInfo.welcomingPoints: '-'})
          tempCardDetails.push({ label: 'Lounge', value: props.cardInfo.airportLounges})
          tempCardDetails.push({ label: 'Travel benefits', value: props.cardInfo.travelInsurance=="checked"?"Insurance":'-'})
          break;
        }
        case 5 : {
          tempCardDetails.push({ label: 'Annual Fees', value: 'SAR '+props.cardInfo.annualFee})
          tempCardDetails.push({ label: 'Monthly Fee', value: 'SAR'+props.cardInfo.fee})
          tempCardDetails.push({ label: 'Cashback', value: "Local: " + props.cardInfo.localCashback+"%"+"<br>"+"Intl: "+props.cardInfo.internationalCashback+"%"})
          tempCardDetails.push({ label: 'Physical Card', value: props.cardInfo.supportsPhysicalCard? 'Yes': 'No'})
          tempCardDetails.push({ label: 'International transactions exchange', value: props.cardInfo.percentageOfInternationalTransactionFees})
          tempCardDetails.push({ label: 'Additional Card Fee', value: props.cardInfo.addCurrencyFee?props.cardInfo.addCurrencyFee:'-'})
          tempCardDetails.push({ label: 'Airport Lounges', value: props.cardInfo.airportLounges?props.cardInfo.airportLounges:'-'})
          tempCardDetails.push({ label: 'Travel benefits', value: props.cardInfo.travelInsurance=="checked"?"Insurance":'-'})
          break;
        }
      };
      setCardDetails(tempCardDetails);
      const compareIdList = authState.compareList.map(item => {return item.id});
      setAdded(compareIdList.indexOf(parseInt(props.cardInfo.id)) > -1?true: false)
      if(props.cardInfo.userReviews.length > 0) {
        let total_rating = 0;
        props.cardInfo.userReviews.map(item => {return total_rating += item.rating});
        setRatingAvg(total_rating / props.cardInfo.userReviews.length);
        if(authState.isAuthenticated) {
          const user_id = Number(localStorage.getItem('user_id'));
          console.log("authenticated:", authState.isAuthenticated, user_id)
          const userReview = props.cardInfo.userReviews.filter(item => item.userId == user_id);
          setRating(userReview[0].rating);
          setReview(userReview[0].reviewText);
        }
      }
    }
  }, [props, authState.compareList]);

  const handleExpand = () => {
    setMinimized(!minimized)
  }

  const handleRating = () => {
    if(authState.isAuthenticated) handleOpen();
    else router.push("/en/signin")
  }

  const handleReview = (event) => setReview(event.target.value)

  const handleReviewSubmit = async () => {
    handleClose();
    if(authState.isAuthenticated) {
      toast.loading("Submiting your review.")
      const auth_header = "Bearer "+localStorage.getItem("access_token");
      const res = await fetch(`/api/addReview`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": auth_header,
        },
        body: JSON.stringify({ 
          cardId: props.cardInfo.id,
          rating: rating,
          reviewText: review,
        }),
      });
      const json = await res.json();
      if(json.status == "success") {
        let total_rating = 0;
        json.data.map(item => {return total_rating += item.rating})
        setRatingAvg(total_rating / json.data.length );
        toast.dismiss()
        toast.success("Your review successfully stored.")
      }
      else if(json.status == "Unauthorized" || json.status == "token is invalid") {
        setRating(0);
        setReview("");
        toast.dismiss();
        router.push("/en/signin");
      }
      else {
        setRating(0);
        setReview("");
        toast.dismiss();
        toast.error("Something went wrong.");
      }
    }
    else {
      toast.dismiss();
      router.push("/en/signin");
    }
  }
  
  const handleFavorite = async () => {
    if(!loading) {
      if(authState.isAuthenticated) {
        setLoading(true);
        toast.loading(!favorite?"Credit card adding to favorites.":"Credit card removing from favorites.")
        const auth_header = "Bearer "+localStorage.getItem("access_token");
        const res = await fetch(`/api/addToFavorite`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": auth_header,
          },
          body: JSON.stringify({ 
            cardId: props.cardInfo.id,
            isFavorite: !favorite,
          }),
        });
        const json = await res.json();
        setLoading(false);
        if(json.status == "success") {
          setFavorite(json.data.isFavorite);
          toast.dismiss()
          toast.success(json.data.isFavorite?"Credit card added to favorites.":"Credit card removed from favorites.")
          setAuthState({ isAuthenticated: authState.isAuthenticated, compareList: authState.compareList, favoriteNumber: json.favoriteNumber });
        }
        else if(json.status == "Unauthorized" || json.status == "token is invalid") {
          toast.dismiss();
          router.push("/en/signin");
        }
        else {
          toast.dismiss();
          toast.error("Something went wrong.");
        }
      }
      else {
        toast.dismiss();
        router.push("/en/signin");
      }
    }
  }

  const handleAdd = async () => {
    let tempCompareList = authState.compareList;
    if(!added && tempCompareList.length < 3) tempCompareList.push({ id: Number(props.cardInfo.id), name: props.cardInfo.name, creditCardPhoto: props.cardInfo.creditCardPhoto});
    else if(!added && tempCompareList.length == 3) {
      toast.error("You have more than 3 cards to compare.");
      return;  
    }
    else tempCompareList = tempCompareList.filter(item => {return item.id != Number(props.cardInfo.id)})
    setAuthState({ isAuthenticated: authState.isAuthenticated, compareList: tempCompareList, favoriteNumber: authState.favoriteNumber });
    setAdded(!added);
  }

  return (
    <div className={`bg-white-A700 rounded-lg ${minimized?'':'border border-[#47AFC8]'}`}>
      <div className="p-6 flex justify-between w-full items-center bg-blue_gray-800_05">
        <div className="flex gap-4 items-center">
          <div className="w-auto h-6">
            <Img src={props.cardInfo.bankLogo} className="max-w-full max-h-full" alt="bank image" />
          </div>
          <span className="flex mb-0 text-sm sm:text-xl font-medium font-ibmplexsans">{props.cardInfo.cardIssuer.issuerName}</span>
        </div>
        <button onClick={handleFavorite} className="bg-transparent border-0 flex gap-2 text-[#6733E1]_7f font-ibmplexsans">
          <span className="text-[#34405440] font-ibmplexsans text-sm hidden sm:flex">Add card to favorites</span>
          {favorite ? 
            <Img
              className="h-[22px] mt-auto w-[22px]"
              src={FavoriteAdded.src}
              alt="iconhavefavorit"
            /> : 
            <Img
              className="h-[22px] mt-auto w-[22px]"
              src={Favorite.src}
              alt="iconhavefavorit"
            />}
        </button> 
      </div>
      <div className="flex flex-col lg:flex-row bg-white-A700_b2 m-0.5">
        <div className="w-full sm:h-auto min-h-[300px] lg:w-72 flex flex-col py-4 px-6 lg:border-r md:border-blue_gray-100_7f">
          <div className="flex flex-1 items-center justify-start">
            <div className="flex relative h-28">
              <Img src={props.cardInfo.creditCardPhoto} className="h-28 w-auto" alt="Card image" />
              {props.cardInfo.cardOffers.length > 0 && 
              <div className="flex flex-col items-start gap-[2px] absolute -left-3 bottom-3">
                <div className="flex flex-row items-center">
                  <div className="rounded-l-sm pl-[14px] pr-[10px] text-center text-white-A700 text-[12px] leading-[20px] font-ibmplexsans bg-[#4F30AB]">{props.cardInfo.cardOffers[0].offerDetails}</div>
                  <Img className="h-[20px] w-auto" src={OfferRectangle.src} />
                </div>
                <div className="rounded-sm px-[14px] text-center text-white-A700 font-ibmplexsans text-[12px] leading-[20px] bg-[#A3278F]">{props.cardInfo.cardOffers[0].validTo}</div>
              </div>
              }
            </div>
          </div>
          <div className="flex flex-col items-start justify-between gap-2">
            <div className="text-lg font-bold font-ibmplexsans text-blue_gray-800_bf leading-4 py-1">{props.cardInfo.name}</div>
            <div onClick={handleRating} className="px-2 py-1 flex items-center cursor-pointer justify-start border rounded-lg border-blue_gray-800_19 w-full">
              <Rating name="half-rating-read" readOnly value={ratingAvg} />
              <div className="text-lg font-bold font-ibmplexsans ml-2 text-purple-800">{ratingAvg>0?ratingAvg:""}</div>
            </div>
            <div className={`flex items-center justify-center text-lg rounded-lg w-full py-2 cursor-pointer ${added?'bg-[#692D90]':'bg-purple-50_7f'}`} onClick={handleAdd}>
              {added?<CheckIcon sx={{color: '#fff'}} />:<AddIcon sx={{ color: '#3559E0'}}/>}
              <div className={`text-sm font-ibmplexsans font-normal ml-2 ${added?'text-white-A700':'text-mainBlue'}`}>{added?'Added':'Add to compare'}</div>
            </div>
      </div>
        </div>
        <div className="w-full md:flex-1 px-6 py-4 flex flex-col">
          <div className="flex flex-col justify-center items-center w-full">
            {cardDetails.map((cardDetail, index) => {
              if(index < 4) return <div className={`flex items-center justify-between border-b last:border-b-0 border-blue_gray-100_7f w-full py-3`}>
                <span className="text-base text-blue_gray-800_bf font-ibmplexsans font-medium">{cardDetail.label}</span>
                <span className="text-base text-[#6733E1] font-ibmplexsans font-medium max-w-[150px] sm:max-w-[300px]" dangerouslySetInnerHTML={{__html:cardDetail.value}}></span>
              </div>
              if (!minimized) return <div className={`flex items-center justify-between border-b last:border-b-0 border-blue_gray-100_7f w-full py-3`}>
                <span className="text-base text-blue_gray-800_bf font-ibmplexsans font-medium ">{cardDetail.label}</span>
                <span className="text-base text-[#6733E1] font-ibmplexsans font-medium max-w-[150px] sm:max-w-[300px]" dangerouslySetInnerHTML={{__html:cardDetail.value}}></span>
              </div>
            })}
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mt-4">
            <div className="flex w-full items-center justify-center sm:w-56 px-4 py-3 border rounded-lg cursor-pointer" onClick={handleExpand}>
              {minimized?
              (<div className="flex gap-2 bg-white-A700">
                <span className="!text-blue_gray-800_7f font-ibmplexsans font-medium leading-[normal] text-base mr-3">More details</span>
                <KeyboardArrowDownIcon sx={{fontSize:'16'}}/>
              </div>):
              (<div className="flex gap-2">
                <span className="!text-blue_gray-800_7f font-ibmplexsans font-medium leading-[normal] text-base mr-3">Less details</span>
                <KeyboardArrowUpIcon sx={{fontSize:'16'}}/>
              </div>)}
            </div>
            <Link href={props.cardInfo.link?props.cardInfo.link:'#'} target="_blank">
              <div className="flex flex-1 w-full items-center justify-center px-4 py-3 cursor-pointer bg-mainBlue rounded-lg font-ibmplexsans font-medium leading-6 text-base text-center text-white-A700">Apply now</div>
            </Link>
          </div>
        </div>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle} className="flex flex-col gap-6 px-6 py-4 sm:px-8 sm:py-6 bg-[#F0F0F0] rounded-2xl border-none w-72 sm:w-[400px] mx-auto my-auto">
          <Typography className="text-base sm:text-xl font-medium font-ibmplexsans text-blue_gray-800">Please enter your review here</Typography>
          <div className="flex flex-col gap-4">
            <div className="flex flex-row gap-4 items-center">
              <Rating value={rating} defaultValue={0} onChange={(event, newValue) => { setRating(newValue);}}/>
              <Typography className="text-base font-normal font-ibmplexsans text-blue_gray-800">{rating}</Typography>
            </div>
            <CssStyledTextfield hiddenLabel type="text" value={review} onChange={handleReview} multiline rows={5}></CssStyledTextfield>
          </div>
          <div 
            onClick={handleReviewSubmit}
            className="flex flex-1 w-full items-center justify-center px-4 py-2 sm:py-3 cursor-pointer bg-mainBlue rounded-lg font-ibmplexsans font-medium leading-6 text-base text-center text-white-A700">
            Save
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default BankCard;