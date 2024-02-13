import * as React from 'react';Breadcrumbs
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import { Button } from '../Button';

type Props = {
  mainhref: string;
  mainLabel: string;
  subhref?: string;
  subLabel?: string;
  corehref?: string;
  coreLabel?: string;
}

function BreadCrumb(props: Props) {

  return (
    <div role="presentation" className="py-4">
      <Breadcrumbs aria-label="breadcrumb">
        <Link underline="hover" href={props.mainhref}>
          <Button
            className="!text-blue_gray-800_7f cursor-pointer font-ibmplexsans font-medium leading-[normal] py-1 px-3 rounded-[12px] text-center text-sm"
            color="blue_gray_100_3f"
            size="xs"
            variant="fill"
          >
            {props.mainLabel}
          </Button>
        </Link>
        {props.subLabel && 
        <Link underline="hover" href={props.subhref}>
          <Button
            className="!text-blue_gray-800_7f cursor-pointer font-ibmplexsans font-medium leading-[normal] py-1 px-3 rounded-[12px] text-center text-sm"
            color="blue_gray_100_3f"
            size="xs"
            variant="fill"
          >
            {props.subLabel}
          </Button>
        </Link>
        }
        {props.coreLabel &&
        <Link underline="hover" href={props.corehref} className="font-ibmplexsans font-medium leading-[normal] py-1 px-1 text-sm text-mainBlue">
          {props.coreLabel}
        </Link>
        }
      </Breadcrumbs>
    </div>
  )
}

export default BreadCrumb;