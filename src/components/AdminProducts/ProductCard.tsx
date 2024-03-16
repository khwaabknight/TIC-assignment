import {
    Card,
    CardContent,
    CardHeader,
} from "@/components/shadcn/ui/card"
import { Badge } from "@/components/shadcn/ui/badge"

import { MdEditDocument } from "react-icons/md";
import { productTypes } from "@/data/constants";

type ProductCardType = {
    data : ProductType,
    instructor ?: boolean
}

function ProductCard({data,instructor}:ProductCardType) {
  return (
    <div className="p-2 parent-hidden-child">
        
        <Card className="relative bg-slate-50">
            {instructor && <div className="hidden-child absolute inset-0 w-full h-full bg-blue-300/10 backdrop-blur-sm rounded-xl flex items-center justify-center">
                <div className="text-yellow-600 text-3xl flex items-center justify-center gap-2">
                    <p>Edit</p>
                    <MdEditDocument />
                </div>
            </div>}
            <CardHeader>
                <div className="flex items-center justify-center">
                    <img src={(data.image as FileType).url} alt="" className="max-h-60 h-auto max-w-60 w-11/12" />
                </div>
            </CardHeader>
            <CardContent>
                <div className="text-left flex flex-col gap-2 p-3">
                    <div className="flex gap-2 justify-between items-center">
                        <p className="font-semibold text-lg text-slate-700">{data.title}</p>
                        <Badge 
                            variant="secondary" 
                            className={data.productType === productTypes.course ? 'bg-[#0088FE]' : 'bg-[#FFBB28]'}
                        >{data.productType}</Badge>
                    </div>
                    <p className="text-slate-500">{data.description.substring(0,90)}...</p>
                    <p className="font-semibold text-2xl text-slate-400">Rs. {data.price}</p>
                </div>
            </CardContent>
        </Card>
    </div>
  )
}

export default ProductCard