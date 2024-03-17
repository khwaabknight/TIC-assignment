import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/shadcn/ui/alert-dialog"
import ProductForm from "./ProductForm"
import ProductCard from "./ProductCard"
import { useState } from "react"

type ProductDisplayProps = {
  data : ProductType, 
}

function ProductDisplay({data}:ProductDisplayProps) {

  const [productData,setProductData] = useState({
      title:data.title,
      description:data.description,
      image:null,
      price:data.price.toString(),
      productType:data.productType,
  });

  return (
    <AlertDialog>
        <AlertDialogTrigger className="outline-none">
          <ProductCard  data={data} instructor/>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
              <AlertDialogTitle>Fill details to update the product :</AlertDialogTitle>
              <AlertDialogDescription className="">
                  <ProductForm productData={productData} setProductData={setProductData} add={false} _id={data._id}/>
              </AlertDialogDescription>
          </AlertDialogHeader>
        </AlertDialogContent>
    </AlertDialog>
    
  )
}

export default ProductDisplay