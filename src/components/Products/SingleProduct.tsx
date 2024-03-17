import { useParams } from "react-router-dom"
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import Footer from "../Footer/Footer";

import SectionDisplay from "./SectionDisplay";
import { productTypes } from "@/data/constants";


type SingleProductProps = {
  admin?: boolean;
}

function SingleProduct({admin}:SingleProductProps) {
  const {token} = useSelector((state:RootState) => state.auth);
  const { productId } = useParams();
  const [product, setProduct] = useState({
    _id: productId,
    title: '',
    description: '',
    price: 0,
    author: {},
    image: {
      url: '',
    },
    productType: '',
    sections: [],
  });

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_BASE_URL}/product/getproduct/${productId}`,{
      headers:{
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => {
        console.log(response.data?.data)
        setProduct(response.data?.data);
      })
      .catch(error => {
        console.error("Error fetching product:", error);
      });
  }, [productId,setProduct,token]);

  return (
    <div className="w-full bg-slate-50">
      <div className="w-11/12 max-w-7xl mx-auto min-h-[95dvh] p-10 bg-white shadow-lg">
        <div className="flex justify-center items-center">
          <img src={product.image.url} alt={product.title} className="max-h-[50dvh] h-auto"/>
        </div>
        <div className="mt-5 flex flex-col justify-start gap-4">
          <hr />
          <h1 className="text-5xl font-semibold text-slate-600">{product.title}</h1>
          <hr />
          <p className="text-lg text-slate-500">{product.description}</p>
          <p className="text-3xl text-slate-500">Price: Rs.{product.price}</p>
        </div>
        <div className="md:w-1/2 mx-auto">
          {
            admin && product.productType === productTypes.course &&
            (
              <SectionDisplay product={product}/>
            )
          }
          {/* Add payment button */}
          {
            !admin &&
            <div className="flex justify-center items-center gap-5">
              <button className="bg-blue-500 text-white p-2 rounded-lg">Buy Now</button>
              <button className="bg-green-500 text-white p-2 rounded-lg">Add to Cart</button>
            </div>
          }
        </div>

      </div>
      <Footer classes="mt-0" />
    </div>
  );
}

export default SingleProduct;