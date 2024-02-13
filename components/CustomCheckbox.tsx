import { useState, useEffect } from 'react';
import Img from './Img';
import CheckboxImg from '../img/Сheckbox.svg';
import CheckboxActiveImg from '../img/Сheckbox-active.svg';

type Props = {
  type?: string,
  label?: string,
  number?: number,
  className?: string,
  handleCheckCommitted?: Function,
  issuerID?: number,
  checked?: boolean,
}
function CustomCheckbox(props: Props) {
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    setChecked(props.checked);
  }, [props]);

  const handleCheck = () => {
    if (props.type === 'issuer') {
      props.handleCheckCommitted(!checked, props.issuerID);
    }
    else if (props.type === 'selectAll') {
      props.handleCheckCommitted();
    }
    else if (props.type === 'offerType') {
      console.log("control point")
      props.handleCheckCommitted(props.label, !checked);
    }
    else {
      props.handleCheckCommitted();
    }
  }

  return (
    <div className="flex items-center w-full py-3 border-b last:border-b-0 cursor-pointer" onClick={handleCheck}>
      <div className="flex items-center">
        <Img src={checked?CheckboxActiveImg.src:CheckboxImg.src} className="w-6 h-6" alt="checkbox" loading="lazy" />
        <div className={`${props.className?props.className:'text-base'} text-left w-auto font-ibmplexsans font-medium mx-3 ${checked?'text-gray-0':'text-blue_gray-800_bf'}`}>{props.label}</div>
        <div className={`text-left  text-sm tracking-[0.70px] uppercase font-ibmplexsans font-medium ${checked?'text-mainBlue':'text-blue_gray-800_bf'}`}>{props.number}</div>
      </div>
    </div>
  )
}

export default CustomCheckbox;
