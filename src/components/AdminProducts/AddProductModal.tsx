import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/shadcn/ui/alert-dialog"
import { Tabs, TabsList, TabsTrigger } from "@/components/shadcn/ui/tabs"

import { Button } from "../shadcn/ui/button";
import { IoIosCreate } from "react-icons/io";
import { productTypes } from "@/data/constants";
import { useState } from "react";
import ProductForm from "./ProductForm";


function AddCourseBtn() {
    return (
        <div>
            <AlertDialog>
                <AlertDialogTrigger>
                    <Button variant={'yellow'} size={'sm'}  className="gap-3">
                        <p>Add Product</p>
                        <IoIosCreate size={14}/>
                    </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Fill details to create new product :</AlertDialogTitle>
                    <AlertDialogDescription className="flex justify-stretch ">
                        <AddProductModal />
                    </AlertDialogDescription>
                </AlertDialogHeader>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    )
}

function AddProductModal() {    

    const [productData,setProductData] = useState({
        title:"",
        description:"",
        image:null,
        price:"100",
        productType:productTypes.course,
    })
    const setProductTypeCourse = () => {
        setProductData({
            ...productData,
            productType:productTypes.course
        })
    }
    const setProductTypeEvent = () => {
        setProductData({
            ...productData,
            productType:productTypes.event
        })
    }
    

  return (
    <Tabs defaultValue="Course" className="w-full flex flex-col">
        <TabsList className="flex justify-around">
            <TabsTrigger value="Course" className="w-full" onClick={setProductTypeCourse}>Course</TabsTrigger>
            <TabsTrigger value="Event" className="w-full" onClick={setProductTypeEvent}>Event</TabsTrigger>
        </TabsList>
    
        <ProductForm productData={productData} setProductData={setProductData} add={true}/>
    </Tabs>
  )
}


export default AddCourseBtn