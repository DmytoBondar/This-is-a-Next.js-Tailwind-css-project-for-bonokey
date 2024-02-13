import { useEffect, useState } from "react"; 
import styled from "styled-components";
import TextField from '@mui/material/TextField';

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

function RoundTextField(props) {
  return (<CssStyledTextfield {...props}></CssStyledTextfield>)
}

export default RoundTextField;