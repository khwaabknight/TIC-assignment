import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/shadcn/ui/accordion"



function Referrals() {

  const {token} = useSelector((state: any) => state.auth);
  const [referrals, setReferrals] = useState([]);
  
  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_BASE_URL}/referral/getmyreferrals`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then((res) => {      
      console.log(res.data.data)
      setReferrals(res.data.data)
    })
    .catch((err) => {
      console.log(err)
    })
  },[])

  return (
    <div className="w-full">
      <div className="w-11/12 max-w-7xl mx-auto py-5 bg-slate-50 min-h-[90dvh] shadow-lg p-5">
        <h1>Your Referrals</h1>
        {
          referrals.length > 0 ? (<div>
            {
              referrals.map((referral: any, index: number) => {
                return (
                  <Accordion key={index} type="single" collapsible className="md:w-10/12 mx-auto">
                    <AccordionItem value="item-1">
                      <AccordionTrigger>
                        <div className="flex md:flex-row flex-col md:justify-between justify-center items-center gap-2 w-full">
                          <p>{referral.product.title}</p>
                          <p>{new Date(referral.createdAt).toLocaleString()}</p>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="">
                        <div>
                          <p>Referral Code: {referral._id} </p>
                          <p>Used by: {referral.usedBy.length}</p>
                          {
                            referral.usedBy.length > 0 && 
                            <div className="py-3">                          
                              <h1>Used By</h1>
                              {
                                referral.usedBy.map((usedBy: any, index: number) => {
                                  return (
                                    <div key={index} className="flex justify-start items-center gap-10">
                                      <div>
                                        <p>{usedBy.email}</p>
                                      </div>
                                      <div>
                                        <p>{usedBy.name}</p>
                                      </div>
                                    </div>
                                  )
                                })
                              }
                          </div>
                        }
                      </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>

                  // <div  className="flex justify-between items-center border-b-2 py-3">
                  //   <div>
                  //     <p>{referral._id}</p>
                  //   </div>
                  //   <div>
                  //     <p>{referral.product.title}</p>
                  //   </div>
                  //   <div>
                  //     <p>used by {referral.usedBy.length}</p>
                  //   </div>
                  // </div>
                )
              })
            
            }

          </div>) : (<div>
            <p>You have no referrals</p>
          </div>)
        }

      </div>


    </div>
  )
}

export default Referrals