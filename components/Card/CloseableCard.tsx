import { useState } from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

const CloseableCard = (props) => {
  const [minimized, setMinimized] = useState(props?.minimized);

  const {title, subTitle, customClass} = props
  return (
    <div className={`border rounded-2xl ${customClass}`}>
      <div className={`px-6 py-4 bg-blue_gray-100_3f flex w-full items-center gap-3 ${minimized?'rounded-2xl':'rounded-t-2xl'}`}>
        <div className="flex flex-col justify-start">
          <span className="text-left text-gray-0 text-lg w-auto font-ibmplexsans font-semibold">{ title }</span>
          {subTitle? <span className="text-blue_gray-800_7f font-ibmplexsans text-left text-sm font-medium">{ subTitle }</span>: <></>}
        </div>
        <button onClick={() => setMinimized(!minimized)} className="bg-transparent border-0">
          {minimized ?
            <KeyboardArrowDownIcon sx={{fontSize: '16'}} /> :
            <KeyboardArrowUpIcon sx={{fontSize: '16'}} />
          }
        </button>
      </div>
      {!minimized && (
        <div className="py-4 px-6">
          {props.children}
        </div>
      )}
    </div>
  );
};

export default CloseableCard;