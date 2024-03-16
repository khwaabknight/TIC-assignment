import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { allproductTypes } from "@/data/constants";
import ProductDisplay from "./ProductDisplay";
import MyProductsSummary from "./MyProductsSummary";
import AddCourseBtn from "./AddProductModal";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/shadcn/ui/tabs"



function MyProducts() {
  const {token} = useSelector((state:RootState) => state.auth)
  const [products, setProducts] = useState({allproducts:[],courses:[],events:[]});
  const [chartData, setChartData] = useState([
    { name: 'Courses', value: 0 },
    { name: 'Events', value: 0 },
  ]);
  const allProductsRef = useRef(null);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_BASE_URL}/product/getinstructorproducts`,{
      headers:{
        Authorization: `Bearer ${token}`
      }
    }).then((res) => {
      const newProducts = res.data?.data
      setProducts(newProducts);
      setChartData([
        { name: 'Courses', value: newProducts.courses ? newProducts.courses.length :0 },
        { name: 'Events', value: newProducts.events ? newProducts.events.length :0 },
      ])
      if (allProductsRef.current) {
        (allProductsRef.current as HTMLElement).click();
      }
    }).catch((error:any) => {
      console.log(error);  
    })
  },[])


  return (
    <div className="w-11/12 max-w-7xl mx-auto mt-10">
      <div className="grid md:grid-cols-3 sm:grid-cols-2">

        {/* Products */}
        <div className="md:col-span-2 sm:col-span-1 w-full">
          <Tabs defaultValue={allproductTypes.all} className="w-full">
            <TabsList className="w-full">
              <div className="sm:w-1/2 grid grid-cols-3">
                <TabsTrigger 
                  value={allproductTypes.all}
                >{allproductTypes.all}</TabsTrigger>
                <TabsTrigger 
                  value={allproductTypes.course}
                >{allproductTypes.course}</TabsTrigger>
                <TabsTrigger
                value={allproductTypes.event}
                >{allproductTypes.event}</TabsTrigger>
              </div>
              <AddCourseBtn />
            </TabsList>
              <TabsContent value={allproductTypes.all} className="grid md:grid-cols-2 grid-cols-1 space-x-4">
                {
                  products.allproducts.map((product : ProductType) => (
                    <ProductDisplay key={product._id.toString()} data={product} />
                  ))
                }
              </TabsContent>

              <TabsContent value={allproductTypes.course} className="grid md:grid-cols-2 grid-cols-1">
                {
                  products.courses.map((product : ProductType) => (
                    <ProductDisplay key={product._id.toString()} data={product} />
                  ))
                }
              </TabsContent>

              <TabsContent value={allproductTypes.event} className="grid md:grid-cols-2 grid-cols-1">
                {
                  products.events.map((product : ProductType) => (
                    <ProductDisplay key={product._id.toString()} data={product}/>
                  ))
                }
              </TabsContent>
          </Tabs>
        </div>
        {/* Summary */}
        <MyProductsSummary chartData={chartData}/>

      </div>

      
    </div>
  )
}

export default MyProducts