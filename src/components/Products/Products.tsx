import HeroSection from "../Common/HeroSection"
import { FaArrowRight } from "react-icons/fa";
import { GiUpgrade } from "react-icons/gi";
import { useEffect, useState } from "react";
import Footer from "../Footer/Footer";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import axios from "axios";
import ProductCard from "../AdminProducts/ProductCard";

function Products() {

  const {token} = useSelector((state:RootState) => state.auth);
  const [productsData,setProductsData] = useState({
    allproducts: [],
    instructorproducts: [],
    purchasedproducts: []
  });

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_BASE_URL}/product/getproducts`,{
      headers:{
        Authorization: `Bearer ${token}`
      }
    }).then((res) => {
      const newProducts = res.data?.data;
      console.log(newProducts)
      setProductsData(newProducts);
    }).catch((error:any) => {
      console.log(error);  
    })
  },[setProductsData,token]);

  return (
    <div className="w-full">
      {/* Hero Section */}
      <HeroSection 
        bg='hero-products'
        title='Invest in Yourself. Invest in Your Career.'
        p1='Learn Anytime, Anywhere. Your Future Starts Here.'
        p2='Our curated courses are designed to equip you with the knowledge and skills you need to achieve success.'
        btn1='Upgrade Your Skills Now'
        btn1link="/products"
        btn2='Refer to your friends'
        btn2link="/referrals"
        icon1={GiUpgrade}
        icon2={FaArrowRight}
      />
      <div className="w-11/12 max-w-5xl mx-auto grid md:grid-cols-2 min-h-screen" id="courses">
        {
          productsData?.allproducts.map((product:any) => {
            return (
              <ProductCard data={product}/>
            )
          })
        }        
      </div>
      <div>
        <Footer />
      </div>

        
    </div>
  )
}

export default Products