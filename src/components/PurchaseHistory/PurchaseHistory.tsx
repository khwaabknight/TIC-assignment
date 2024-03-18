import { useSelector } from "react-redux"
import { Button } from "../shadcn/ui/button"
import { RootState } from "@/store/store";
import { useEffect, useState } from "react";
import axios from "axios";
import Footer from "../Footer/Footer";
import { Link } from "react-router-dom";


function PurchaseHistory() {

    const {token} = useSelector((state: RootState) => state.auth);

    const [purchases, setPurchases] = useState([]);

    useEffect(() => {

        axios.get(`${import.meta.env.VITE_API_BASE_URL}/profile/getUserProducts`,{
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(res => {
            setPurchases(res.data?.data?.purchases);
        }
        ).catch(err => {
            console.log(err);
        })
    },[])


  return (
    <div className="w-full">
        <div className="w-11/12 max-w-7xl mx-auto py-8 px-5 bg-slate-50 shadow-lg min-h-[90dvh] h-full">
            <h2 className="text-2xl font-bold text-slate-700 border-b p-2">Purchases</h2>

            {                
                purchases.length > 0 ?
                (
                    purchases.map((purchase:any) => (
                        <Link to={`/purchases/${purchase._id}`} className="mt-5">
                            <div className="flex justify-between items-center mt-2 gap-3">
                                <div className="flex items-center">
                                    <img src={purchase.image.url || "/images/placeholder-product.jpg"} alt="Product" className="w-20 h-20 object-cover" />
                                    <div className="ml-5">
                                        <h4 className="text-lg font-bold text-slate-700">{purchase.title}</h4>
                                        <p className="text-slate-500">{purchase.description.substring(0,50)}...</p>
                                    </div>
                                </div>
                                <p className="text-slate-700 font-bold text-center">{purchase.productSections.length} sections</p>
                            </div>
                        </Link>
                    ))
                ):(
                    <div className="flex flex-col justify-center items-center h-full py-10 gap-5">
                        <p className="text-xl text-slate-700">You have no purchases yet</p>
                        <Button variant={'yellow'} size={'lg'}>Shop Now</Button>
                    </div>
                )
            }
        </div>
        <Footer />
        
    </div>
  )
}

export default PurchaseHistory