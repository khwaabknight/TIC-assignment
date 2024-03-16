import {
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogFooter,
} from "@/components/shadcn/ui/alert-dialog"
import { Input } from "../shadcn/ui/input";
import { Label } from "../shadcn/ui/label";
import { Textarea } from "@/components/shadcn/ui/textarea"

import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import toast from "react-hot-toast";
import { useRef } from "react";

type ProductDataType = {
    title:string,
    description:string,
    image:string | null,
    price:string,
    productType:string,
}

type ProductFormType = {
    productData: ProductDataType,
    setProductData: any,
    add:boolean,
    _id?:string
}

function ProductForm({productData,setProductData,add,_id}:ProductFormType) {
    const {token} = useSelector((state : RootState) => state.auth);
    const imageShow = useRef(null);
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
          setProductData({
            ...productData,
            image:file
          })
        }else{
            setProductData({
            ...productData,
            [e.target.name]:e.target.value
          })
        }
    }
    const submitHandler = (e:any) => {
        e.preventDefault();
        const formData = new FormData();

        for (const key in productData) {
            const value = productData[key as keyof typeof productData] ?? '';
            formData.append(key, value);
        }
        if(_id){
            formData.append("_id",_id)
        }

        if(add){
            axios.post(`${import.meta.env.VITE_API_BASE_URL}/product/addproduct`,formData,{
                headers:{
                    Authorization: `Bearer ${token}`,
                }
            }).then((res) => {
                console.log(res);
                toast.success(`${productData.productType} created successfully`);
            }).catch((error:any) => {
                console.log(error)
                toast.error('An error occured !')
            })
        }else {
            axios.put(`${import.meta.env.VITE_API_BASE_URL}/product/updateproduct`,formData,{
                headers:{
                    Authorization: `Bearer ${token}`,
                }
            }).then((res) => {
                console.log(res);
                toast.success(`${productData.productType} created successfully`)
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
                <input type="file" className="hidden" name="image" accept="image/*" onChange={changeHandler}/>
                <div className="cursor-pointer relative  border">
                    <img src={'/images/placeholder-product.jpg'} alt="" id="blah" className=" max-w-full max-h-36 h-auto w-auto" ref={imageShow}/>
                </div>
            </label>
        </div>
        <div className="w-full">
            <Label className="ml-1">Title</Label>
            <Input type="text" value={productData.title} name="title" onChange={changeHandler}/>
        </div>
        <div className="w-full">
            <Label className="ml-1">Description</Label>
            <Textarea value={productData.description} name="description" onChange={changeHandler}/>
        </div>
        <div className="w-full">
            <Label className="ml-1">Price (in number):</Label>
            <Input type="text" value={productData.price} name="price" onChange={changeHandler}/>
        </div>
        <div className="flex justify-end w-full">
            <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction><button type="submit">{add ? "Add Product" : "Update Product"}</button></AlertDialogAction>
            </AlertDialogFooter>
        </div>
    </form>
  )
}

export default ProductForm