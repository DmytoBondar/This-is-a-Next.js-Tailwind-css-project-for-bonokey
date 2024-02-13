import {useState, useEffect} from 'react';
import { useRouter } from 'next/router';
import { FormEvent } from 'react'
import Img from '../../components/Img'
import styled from "styled-components";
import Link from 'next/link';
import TextField from '@mui/material/TextField';
import CustomCheckbox from '../../components/CustomCheckbox';
import { useAuth } from '../../context/AuthContext';

const CssStyledTextfield = styled(TextField)({
  '& .MuiInputBase-input' : {
    borderRadius: '8px',
    padding: '12px 16px',
    lineHeight: '1.25rem',
    fontFamily: 'IBM Plex Sans',
    fontSize: '1rem',
  }
})

function Signin () {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const { authState, setAuthState } = useAuth();
  const route = useRouter();

  const handleLogin = async (event) => {
    event.preventDefault()
    const response = await fetch('/api/auth/signin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })
    const json = await response.json();
    if (response.ok) {
      route.push('/en/creditcard')
      setAuthState({isAuthenticated: true, compareList: authState.compareList, favoriteNumber: json.favoriteNumber});
      localStorage.setItem('access_token', json.access_token);
      localStorage.setItem('user_id', json.user_id);
    } else {
      setError(json.message)
    }
  }
  
  return (
    <section className="w-full">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white-A700 rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0 ">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-blue_gray-800 md:text-2xl font-ibmplexsans">
                Sign in to your account
            </h1>
            {error && <div className="font-ibmplexsans text-base text-red-600 font-normal">{error}</div>}
            <div className="space-y-4 md:space-y-6">
              <div>
                <div className="flex mb-2 text-sm sm:text-base font-ibmplexsans font-medium text-blue_gray-800">Your email</div>
                <CssStyledTextfield type="email" name="email" value={email} onChange={(event) => setEmail(event.target.value)} className="bg-gray-50 border font-ibmplexsans border-gray-300 text-blue_gray-800 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 w-full" placeholder="name@company.com" required />
              </div>
              <div>
                <div className="flex mb-2 text-sm sm:text-base font-ibmplexsans font-medium text-blue_gray-800">Password</div>
                <CssStyledTextfield type="password" name="password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="••••••••" className="bg-gray-50 border font-ibmplexsans border-gray-300 text-blue_gray-800 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 w-full" />
              </div>
              {/* <div className="flex items-center justify-between">
                <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <CustomCheckbox label="Remember me" checked={rememberMe} handleCheckCommitted={() => {setRememberMe(!rememberMe)}} className="" />
                    </div>
                </div>
                <Link href="#"><span className="text-sm font-medium font-ibmplexsans text-blue-700 hover:underline">Forgot password?</span></Link>
              </div> */}
              <div onClick={handleLogin} className="w-full text-white-A700 bg-blue-600 cursor-pointer hover:bg-primary-700 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm sm:text-base font-ibmplexsans px-5 py-2.5 text-center">Sign in</div>
              <p className="text-sm font-light font-ibmplexsans text-gray-500">
                  Don’t have an account yet? <Link href="/en/signup"><span className="font-medium text-blue-600 hover:underline text-sm font-ibmplexsans cursor-pointer">Sign up</span></Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Signin;