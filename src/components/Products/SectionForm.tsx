import {
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogFooter,
} from "@/components/shadcn/ui/alert-dialog"
import { Label } from "../shadcn/ui/label";
import { Input } from "../shadcn/ui/input";
import { Textarea } from "../shadcn/ui/textarea";
import { RootState } from "@/store/store";
import axios from "axios";
import { useRef } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

type SectionDataType = {
    name:string,
    description:string,
    video:string | null,
}

type SectionFormType = {
    sectionData: SectionDataType,
    setSectionData: any,
    add:boolean,
    productId?:string
}

function SectionForm({sectionData,setSectionData,add,productId}:SectionFormType) {
    const {token} = useSelector((state : RootState) => state.auth);
    const videoShow = useRef(null);
    const changeHandler = (e:any) => {
        e.preventDefault();
        if(e.target.name === 'image'){
          const chooseFile = e.target;
          const file = chooseFile.files[0];
          if (file) {
            if (videoShow.current) {
              (videoShow.current as HTMLImageElement).src = URL.createObjectURL(file);
            }
          }
          setSectionData({
            ...sectionData,
            image:file
          })
        }else{
            setSectionData({
            ...sectionData,
            [e.target.name]:e.target.value
          })
        }
    }
    const submitHandler = (e:any) => {
        e.preventDefault();
        const formData = new FormData();

        for (const key in sectionData) {
            const value = sectionData[key as keyof typeof sectionData] ?? '';
            formData.append(key, value);
        }
        if(productId){
            formData.append("productId",productId)
        }

        console.log(productId)

        if(add){
            axios.post(`${import.meta.env.VITE_API_BASE_URL}/section/createSection`,formData,{
                headers:{
                    Authorization: `Bearer ${token}`,
                }
            }).then((res) => {
                console.log(res);
                toast.success(`Section created successfully`);
            }).catch((error:any) => {
                console.log(error)
                toast.error('An error occured !')
            })
        }else {
            axios.put(`${import.meta.env.VITE_API_BASE_URL}/section/updateSection`,formData,{
                headers:{
                    Authorization: `Bearer ${token}`,
                }
            }).then((res) => {
                console.log(res);
                toast.success(`Section updated successfully`)
            }).catch((error:any) => {
                console.log(error)
                toast.error('An error occured !')
            })
        }
    }
  return (
    <form onSubmit={submitHandler} className="flex flex-col justify-center items-center gap-5">
        <div className="mt-2">
            <label className="relative">
                <input type="file" className="hidden" name="image" accept="video/*" onChange={changeHandler}/>
                <div className="cursor-pointer relative  border">
                    <video src={'/images/placeholder-product.jpg'} autoPlay id="blah" className=" max-w-full max-h-36 h-auto w-auto" ref={videoShow}/>
                </div>
            </label>
        </div>
        <div className="w-full">
            <Label className="ml-1">Title</Label>
            <Input type="text" value={sectionData.name} name="name" onChange={changeHandler}/>
        </div>
        <div className="w-full">
            <Label className="ml-1">Description</Label>
            <Textarea value={sectionData.description} name="description" onChange={changeHandler}/>
        </div>
        <div className="flex justify-end w-full">
            <AlertDialogFooter className="w-full gap-5">
                <AlertDialogAction><button type="submit">{add ? "Add Section" : "Update Section"}</button></AlertDialogAction>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
            </AlertDialogFooter>
        </div>
    </form>
  )
}

export default SectionForm