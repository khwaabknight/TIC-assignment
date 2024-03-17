import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/shadcn/ui/alert-dialog"

import { Button } from "../shadcn/ui/button";
import { IoIosCreate } from "react-icons/io";
import SectionForm from "./SectionForm";
import { useState } from "react";

function SectionModal({productId}: {productId:string}) {

    const [sectionData, setSectionData] = useState({
        name:"",
        description:"",
        video:null,
    })

  return (
    <div>
        <AlertDialog>
            <AlertDialogTrigger>
                <Button variant={'yellow'} size={'sm'}  className="gap-3">
                    <p>Add Section</p>
                    <IoIosCreate size={14}/>
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
            <AlertDialogHeader>
                <AlertDialogTitle>Fill details to create new section :</AlertDialogTitle>
                <AlertDialogDescription className="">
                    <SectionForm sectionData={sectionData} setSectionData={setSectionData} add productId={productId}/>
                </AlertDialogDescription>
            </AlertDialogHeader>
            </AlertDialogContent>
        </AlertDialog>
    </div>
  )
}


export default SectionModal