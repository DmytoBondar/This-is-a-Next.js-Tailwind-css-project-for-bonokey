import {useState, useEffect} from 'react';
import { useRouter } from 'next/router';
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

function Signup () {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const { authState, setAuthState } = useAuth();
  const route = useRouter();
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email.match(emailRegex)) return true;
    return false;
  }

  const handleSignup = async () => {
    if(password === confirmPassword) {
      if(email != '' && password != '') {
        if(validateEmail(email)) {
          const res = await fetch(`/api/auth/signup`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ 
            email: email,
              password: password,
            }),
          });
          const json = await res.json();
          if(res.ok) {
            setAuthState({isAuthenticated: true, compareList: authState.compareList, favoriteNumber: 0});
            localStorage.setItem('access_token', json.access_token);
            localStorage.setItem('user_id', json.user_id);
            route.push('/en/creditcard');
          }
          else setError(json.message)
        }
        else {
          setError("Please enter valid email address.");
          return;
        }
      }
      else setError("Please check your email and password.")
    }
    else if (email == '') setError("Please enter your email address.")
    else setError("Please confirm your password.");
  }

  return (
    <section className="w-full">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white-A700 rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0 ">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-blue_gray-800 md:text-2xl font-ibmplexsans">
                Create a new account
            </h1>
            {error && <div className="font-ibmplexsans text-base text-red-600 font-normal">{error}</div>}
            <form className="space-y-4 md:space-y-6" action="#">
              <div>
                <div className="flex mb-2 text-sm sm:text-base font-ibmplexsans font-medium text-blue_gray-800">Your email</div>
                <CssStyledTextfield type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="bg-gray-50 border font-ibmplexsans border-gray-300 text-blue_gray-800 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 w-full" placeholder="name@company.com"/>
              </div>
              <div>
                <div className="flex mb-2 text-sm sm:text-base font-ibmplexsans font-medium text-blue_gray-800">Password</div>
                <CssStyledTextfield type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" className="bg-gray-50 border font-ibmplexsans border-gray-300 text-blue_gray-800 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 w-full" />
              </div>
              <div>
                <div className="flex mb-2 text-sm sm:text-base font-ibmplexsans font-medium text-blue_gray-800">Confirm Password</div>
                <CssStyledTextfield type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="••••••••" className="bg-gray-50 border font-ibmplexsans border-gray-300 text-blue_gray-800 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 w-full" />
              </div>
              <div onClick={handleSignup} className="w-full text-white-A700 bg-blue-600 cursor-pointer hover:bg-primary-700 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm sm:text-base font-ibmplexsans px-5 py-2.5 text-center">Sign up</div>
              <p className="text-sm font-light font-ibmplexsans text-gray-500">
                  Do you already have an account? <Link href="/en/signin"><span className="font-medium text-blue-600 hover:underline text-sm font-ibmplexsans cursor-pointer">Sign in</span></Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Signup;