import React, { useState } from 'react'
import { RxEyeClosed, RxEyeOpen } from "react-icons/rx";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Input } from '../shadcn/ui/input';
import { Label } from '../shadcn/ui/label';
import { Button } from '../shadcn/ui/button';
import { RadioGroup, RadioGroupItem } from "@/components/shadcn/ui/radio-group"
import { IoLogInOutline } from "react-icons/io5";
import { useDispatch } from 'react-redux';
import { setToken } from '@/store/features/auth/authSlice';
import { setUser } from '@/store/features/user/userSlice';
import { accountTypes } from '@/data/constants';

type SignupFormVals = {
    name: string,
    email: string,
    password: string,
    confirmPassword: string,
    accountType: 'CONSUMER' | 'ADMIN',
}

function Signup() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [formData, setFormData] = useState<SignupFormVals>({
        name:"",
        email:"",
        password:"",
        confirmPassword:"",
        accountType: 'CONSUMER',
    })
    const [showPass, setShowPass] = useState(false);
    const [showConfirmPass, setShowConfirmPass] = useState(false);

    const changeHandler = (e : React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setFormData({
          ...formData,
          [e.target.name]: e.target.value
        });
        
    }

    const submitHandler = (e:any) => {
        e.preventDefault();
        console.log(formData)
    
        axios.post(`${import.meta.env.VITE_API_BASE_URL}/auth/signup`,formData)
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
        <div className='h-[80dvh] w-full max-w-7xl mx-auto mt-10'>
            <div className='flex justify-around items-center'>
                <div className='md:w-1/2 sm:w-2/5 w-0 md:p-20 sm:p-10 flex justify-center items-center overflow-hidden'>
                    <div>
                        <img src='/images/signup-side.jpg' alt='' className='object-contain'/>
                    </div>
                </div>

                <div className='md:w-1/2 sm:w-3/5 w-full flex justify-center items-center'>
                    <div className='border rounded-lg relative flex flex-col items-center gap-3 py-5 h-full w-10/12'>
                        <div className='rounded-full p-1 border bg-white absolute top-0 left-1/2 -translate-y-1/2 -translate-x-1/2'>
                            <div className='aspect-square rounded-full overflow-hidden '>
                            <img src='/images/auth.jpg' alt='' className='object-contain h-16'/>
                            </div>
                        </div>
                        <div className='text-center w-full mb-10'>
                            <h2 className='py-3 font-bold text-lg'>Register</h2>
                            <p>Sign up as a New User</p>
                        </div>

                        <form className='max-w-[250px] w-full flex flex-col gap-5' onSubmit={submitHandler}>
                            {/* Name */}
                            <div>
                                <Label htmlFor='name'/>
                                <Input type='text' placeholder='Enter name' name='name' id='name' value={formData.name} onChange={changeHandler}/>
                            </div>
                            {/* Email */}
                            <div>
                                <Label htmlFor='email'/>
                                <Input type='email' placeholder='Enter email' name='email' id='email' value={formData.email} onChange={changeHandler}/>
                            </div>

                            {/* Password */}
                            <div className='relative'>
                                <Label htmlFor='password'/>
                                <Input type={showPass ? 'text' : 'password'} placeholder='Enter password' name='password' id='password' className='pr-16' onChange={changeHandler} value={formData.password}/>
                                <button type='button' className='absolute bottom-1/2 translate-y-1/2 right-5' onClick={() => setShowPass(!showPass)}>
                                    {
                                    !showPass ? <RxEyeClosed/> : <RxEyeOpen />
                                    }
                                </button>
                            </div>
                            <div className='relative'>
                                <Label htmlFor='confirmPassword'/>
                                <Input type={showPass ? 'text' : 'password'} placeholder='Re-enter password' name='confirmPassword' id='confirmPassword' className='pr-16' onChange={changeHandler} value={formData.confirmPassword}/>
                                <button type='button' className='absolute bottom-1/2 translate-y-1/2 right-5' onClick={() => setShowConfirmPass(!showConfirmPass)}>
                                    {
                                    !showConfirmPass ? <RxEyeClosed/> : <RxEyeOpen />
                                    }
                                </button>
                            </div>

                            {/* Account type select */}
                            <div className='text-slate-500'>
                                <RadioGroup defaultValue={accountTypes.consumer} name='accountType' onChange={changeHandler} className='grid-cols-3'>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value={accountTypes.admin} id="admin" />
                                        <Label htmlFor="admin">{accountTypes.admin}</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value={accountTypes.consumer} id="consumer"/>
                                        <Label htmlFor="consumer">{accountTypes.consumer}</Label>
                                    </div>
                                </RadioGroup>
                            </div>

                            {/* Submit */}
                            <Button type='submit' className='gap-4'>
                                <p>Signup</p>
                                <IoLogInOutline size={18} />
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
                                <p>Already have an account?</p>
                                <Link to={'/login'} className='underline cursor-pointer'>
                                    Login
                                </Link>
                            </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            
        </div>
    )
}

export default Signup