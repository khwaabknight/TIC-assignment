import React, { useState } from 'react'
import { RxEyeClosed, RxEyeOpen } from "react-icons/rx";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Input } from '../shadcn/ui/input';
import { Label } from '../shadcn/ui/label';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/shadcn/ui/hover-card"
import { Button } from '../shadcn/ui/button';
import { IoLogInOutline } from "react-icons/io5";
import { useDispatch } from 'react-redux';
import { setToken } from '@/store/features/auth/authSlice';
import { setUser } from '@/store/features/user/userSlice';

type LoginFormVals = {
  email:string,
  password:string,
}

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState<LoginFormVals>({
    email:"",
    password:"",    
  })
  const [showPass, setShowPass] = useState(false);

  const changeHandler = (e : React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  }

  const submitHandler = (e:any) => {
    e.preventDefault();

    axios.post(`${import.meta.env.VITE_API_BASE_URL}/auth/login`,formData)
    .then((res) => {
      console.log(res)

      const token = res?.data?.data?.token;
      const user = res?.data?.data?.user;
      localStorage.setItem("token", token)
      localStorage.setItem("user", JSON.stringify(user))
      
      dispatch(setToken(token))
      dispatch(setUser(user))
      navigate('/')
    }).catch((error) => {
      console.log(error);
    })
  }
  
  return (
    <div className='h-[80dvh] flex justify-around items-center max-w-6xl mx-auto'>

      <div className='md:w-1/2 sm:w-3/5 w-full flex justify-center items-center'>
        <div className='border rounded-lg relative flex flex-col items-center gap-3 p-5 h-full md:w-2/3 sm:w-3/5 w-5/6'>
          <div className='rounded-full p-1 border bg-white absolute top-0 left-1/2 -translate-y-1/2 -translate-x-1/2'>
            <div className='aspect-square rounded-full overflow-hidden '>
              <img src='/images/auth.jpg' alt='' className='object-contain h-16'/>
            </div>
          </div>
          <div className='text-center w-full mb-10'>
            <h2 className='py-3 font-bold text-lg'>Welcome back!!</h2>
            <p>Sign in to your account</p>
          </div>

          <form className='max-w-[250px] w-11/12 flex flex-col gap-5' onSubmit={submitHandler}>
            {/* Email */}
            <div>
              <Label htmlFor='email'/>
              <Input type='email' placeholder='Enter email' name='email' id='email' onChange={changeHandler}/>
            </div>

            {/* Password */}
            <div className='relative'>
              <Label htmlFor='password'/>
              <Input type={showPass ? 'text' : 'password'} placeholder='Enter password' name='password' id='password' className='pr-16' onChange={changeHandler}/>
              <button type='button' className='absolute bottom-1/2 right-5' onClick={() => setShowPass(!showPass)}>
                {
                  !showPass ? <RxEyeClosed/> : <RxEyeOpen />
                }
              </button>
              <div>
                <HoverCard>
                  <HoverCardTrigger className='text-sky-600 underline text-xs flex justify-end pr-2 pt-1'>Forget Password?</HoverCardTrigger>
                  <HoverCardContent >
                    Sorry, this function has not been created for now.
                  </HoverCardContent>
                </HoverCard>
              </div>
            </div>

            {/* Submit */}
            <Button type='submit' className='gap-4'>
              <p>Login</p>
              <IoLogInOutline size={18}/>
            </Button>

            {/* Signup link */}
            <div>
              <div className='relative'>
                <div className='absolute inset-0 flex items-center'>
                  <div className='w-full border-t border-gray-300'/>
                </div>
                <div className='relative flex justify-center text-sm'>
                  <span className=' bg-white px-2 text-gray-500'>
                    Or
                  </span>
                </div>
              </div>
              <div className='flex gap-2 justify-center text-sm px-2 my-2 text-gray-500'>
                <p>Don't have an account?</p>
                <Link to={'/signup'} className='underline cursor-pointer'>
                    Create an account
                </Link>
              </div>
            </div>
          </form>
        </div>

      </div>

      <div className='md:w-1/2 sm:w-2/5 w-0 p-5'>
        <img src='/images/login-side.jpg' alt='' className='object-contain'/>
      </div>
    </div>
  )
}

export default Login