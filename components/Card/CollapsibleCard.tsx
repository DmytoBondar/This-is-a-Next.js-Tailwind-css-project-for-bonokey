import { ReactNode, useEffect, useState } from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import LiveHelpIcon from '@mui/icons-material/LiveHelp';

type Props = {
  question: string,
  answer : string,
  minimized: boolean, 
  customClass?: string,
  children?: ReactNode,
}

const CollapsibleCard = (props:Props) => {
  const [open, SetOpen] = useState(props?.minimized);

  return (<div className={`h-fit w-full sm:w-1/2 rounded-2xl bg-white-A700 ${props.customClass} ${open?'border-2 border-[#4F30AB]':'border border-[#4F30AB44]'}`}>
  <div className={`py-3 px-4 sm:py-4 sm:px-5 flex flex-row w-full items-center gap-4 sm:gap-5 ${open?'rounded-t-2xl':'rounded-2xl'}`}>
    <div className="p-3 bg-[#4F30AB0C] rounded-full"><LiveHelpIcon className="text-xl"/></div>
    <span className={`text-left text-base sm:text-[22px] w-auto font-ibmplexsans font-medium ${open?'text-[#4F30AB]':'text-gray-0'}`}>{ props.question }</span>
    <button onClick={() => SetOpen(!open)} className="bg-transparent border-0">
      {open ?
        <KeyboardArrowDownIcon sx={{fontSize: '22'}} /> :
        <KeyboardArrowUpIcon sx={{fontSize: '22'}} />
      }
    </button>
  </div>
  {open && (
    <div className="flex flex-col gap-4 items-start py-3 px-4 sm:py-4 sm:px-5">
      <div className="h-px bg-gray-0 w-full opacity-50"></div>
      <div className="text-gray-0 opacity-75 font-ibmplexsans text-sm sm:text-lg">{props.answer}</div>
      <div className="bg-[#4F30AB0C] rounded-[44px] text-[#4F30AB88] text-sm sm:text-base font-medium py-2 px-4 cursor-pointer">Learn more</div>
    </div>
  )}
</div>);
}

export default CollapsibleCard