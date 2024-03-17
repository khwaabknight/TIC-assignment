import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/shadcn/ui/alert-dialog";
import { Button } from "../shadcn/ui/button";
import { Badge } from "@/components/shadcn/ui/badge"

import { FaShare } from "react-icons/fa6";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

type ReferButtonType = {
    productId: string
}

function ReferButton({productId}:ReferButtonType) {
    const [referralCode, setReferralCode] = useState({
        _id: '',
        provider: '',
        product: '',
    });
    const {token} = useSelector((state:RootState) => state.auth);

    useEffect(() => {

        // Fetch referral code from server
        axios.post(`${import.meta.env.VITE_API_BASE_URL}/referral/createReferral`,{productId},{
            headers:{
                Authorization: `Bearer ${token}`
            }
        }).then((res) => {
            const newReferralCode = res.data?.data;
            console.log(newReferralCode)
            setReferralCode(newReferralCode);
        }).catch((error:any) => {
            console.log(error);  
        })

    },[setReferralCode]);
  return (
    <AlertDialog>
        <AlertDialogTrigger>
            <Button variant={'yellow'} className="gap-2 text-gray-100">
                <p>Refer</p>
                <FaShare />
            </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
            <AlertDialogHeader>
                <AlertDialogTitle>Refer to your friends-</AlertDialogTitle>
                <AlertDialogDescription className="flex flex-col items-center justify-center gap-5">
                    <p>Your referral code is: </p>
                    <Badge variant={'outline'}>{referralCode._id}</Badge>
                    <p>Share this code with your friends and earn rewards</p>
                    <p>Enter while purchasing the product</p>
                </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
            </AlertDialogFooter>
        </AlertDialogContent>
    </AlertDialog>
  )
}

export default ReferButton