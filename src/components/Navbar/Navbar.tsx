import { useDispatch, useSelector } from "react-redux";
import Navlinks from "./Navlinks"
import { RootState } from "@/store/store";
import { Button } from "../shadcn/ui/button";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/shadcn/ui/avatar"
import { TbLogout } from "react-icons/tb";
import { RiMenuFoldFill } from "react-icons/ri";
import { FaPen } from "react-icons/fa";
import { resetToken } from "@/store/features/auth/authSlice";
import { resetUser,setUser } from "@/store/features/user/userSlice";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/shadcn/ui/sheet"
import Brand from "./Brand";
import { useRef, useState } from "react";
import { Input } from "../shadcn/ui/input";
import { Label } from "../shadcn/ui/label";
import axios from "axios";
import toast from "react-hot-toast";



function Navbar() {

  const {token} = useSelector((state : RootState) => state.auth);
  const {name, email, image} = useSelector((state : RootState) => state.user.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [profileData,setProfileData] = useState({
    name:name,
    email:email,
    image:null,
  })
  const imageShow = useRef(null);

  const logoutHandler = () => {
    dispatch(resetToken())
    dispatch(resetUser())
  }

  const changeHandler = (e:any) => {
    e.preventDefault();
    if(e.target.name === 'image'){
      const chooseFile = e.target;
      const file = chooseFile.files[0];
      if (file) {
        if (imageShow.current) {
          (imageShow.current as HTMLImageElement).src = URL.createObjectURL(file);
        }
      }
      setProfileData({
        ...profileData,
        image:file
      })
    }else{
      setProfileData({
        ...profileData,
        [e.target.name]:e.target.value
      })
    }
  }

  const profileUpdateHandler = (e:any) => {
    e.preventDefault();
    const formData = new FormData();

    for (const key in profileData) {
      const value = profileData[key as keyof typeof profileData] ?? '';
      formData.append(key, value);
    }
    axios.put(`${import.meta.env.VITE_API_BASE_URL}/profile/updateProfile`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      console.log(res)
      
      const user = res?.data?.data?.user;
      localStorage.setItem('user',JSON.stringify(user))
      dispatch(setUser(user))
      window.location.reload();
      toast.success('User updated')
      
      console.log("res got")
    }).catch((error:any) => {
      console.log('error while updating profile:', error)
      logoutHandler();
      window.location.reload();
      toast.error('Invalid credentials')
    })
  }

  return (
    <div className="bg-slate-800 p-1 z-40">
      <div 
        className=" text-white p-2 w-11/12 max-w-7xl mx-auto flex justify-between items-center bg-slate-800 rounded-lg"
      >
        {/* hamburger navlink */}
        <div className="sm:hidden">
          <Sheet>
            <SheetTrigger>
              <Button size={'icon'} onClick={() => navigate('/login')}>
                <RiMenuFoldFill />
              </Button>
            </SheetTrigger>
            <SheetContent side={'left'} className="bg-slate-800 border-slate-900 text-white">
              <SheetHeader>
                <SheetTitle className="px-10 py-5">
                  <Brand />
                </SheetTitle>
                <SheetDescription>
                  <Navlinks col/>
                </SheetDescription>
              </SheetHeader>
            </SheetContent>
          </Sheet>
        </div>

        {/* Brand */}
        <div className="sm:block hidden">
          <Brand />
        </div>

        {/* NavLinks */}
        <div className="sm:block hidden">
          <Navlinks/>
        </div>



        {/* Auth and Profile */}
        <div >
          <div className="flex gap-2">
            {
              !token && (
                <Button variant={'ghost'} size={'lg'} onClick={() => navigate('/login')}>Login</Button>
              )
            }
            {
              !token && (
                <Button variant={'ghost'} size={'lg'} onClick={() => navigate('/signup')}>Signup</Button>
              )
            }
            {
              token && (
                <Sheet>
                  <SheetTrigger>
                    <Avatar className="cursor-pointer">
                      <AvatarImage src={image || '/images/man-placeholder.png'} />
                      <AvatarFallback>Avatar</AvatarFallback>
                    </Avatar>
                  </SheetTrigger>
                  <SheetContent side={'right'} className=" border-slate-900">
                    <SheetHeader>
                      <SheetTitle className="px-10 py-5 text-center">
                        Your Profile
                      </SheetTitle>
                    </SheetHeader>
                    <SheetDescription>
                      <form onSubmit={profileUpdateHandler} className="flex flex-col justify-center items-center gap-5">
                        <div className="">
                          <label className="relative">
                            <input type="file" className="hidden" name="image" accept="image/*" onChange={changeHandler}/>
                            <Avatar className="cursor-pointer relative h-20 w-20">
                              <img src={image || '/images/man-placeholder.png'} alt="" id="blah" ref={imageShow}/>
                            </Avatar>
                            <div className="absolute bottom-0 translate-y-1/2 -translate-x-1/2 left-1/2 h-4 w-4 bg-white rounded-full text-blue-500 m-1">
                              <FaPen size={12}/>
                            </div>
                          </label>
                        </div>
                        <div className="w-full">
                          <Label className="ml-1">Name</Label>
                          <Input type="text" value={profileData.name} name="name" onChange={changeHandler}/>
                        </div>
                        <div className="w-full">
                          <Label className="ml-1">Email</Label>
                          <Input type="email" value={profileData.email} name="email" onChange={changeHandler}/>
                        </div>

                        <Button type="submit">Save Changes</Button>

                      </form>
                    </SheetDescription>
                  </SheetContent>
                </Sheet>
                
              )
            }
            {
              token && (
                <Button variant={'ghost'} size={'icon'} onClick={logoutHandler}>
                  <TbLogout size={18}/>
                </Button>
              )
            }

          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar

