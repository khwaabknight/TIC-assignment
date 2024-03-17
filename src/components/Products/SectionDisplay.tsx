import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/shadcn/ui/accordion"
import { Button } from "../shadcn/ui/button"
import SectionModal from "./SectionModal"
import { MdDeleteForever } from "react-icons/md";
import axios from "axios";

function SectionDisplay({product}: {product:any}) {
    const deleteSection = (sectionId:string) => {
        console.log(sectionId);
        axios.delete(`${import.meta.env.VITE_API_BASE_URL}/section/deleteSection/${sectionId}`,{
            headers:{
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        }).then((res) => {
            console.log(res.data);
        }).catch((err) => {
            console.log(err);
        })
    }
  return (
    <div>
        <div>
            <h2>Your Course Sections</h2>
            <SectionModal productId={product._id}/>
        </div>

        <Accordion type="single" collapsible>
            {
                product.productSections
                ? (product.productSections.map((section:any) => (
                    <AccordionItem key={section._id} value={section._id}>
                        <AccordionTrigger>{section.name}</AccordionTrigger>
                        <AccordionContent className="">                            
                            <p className="p-2">{section.description}</p>
                            <div className="flex items-center justify-end">
                                <Button variant={"destructive"} size={'icon'} onClick={() => deleteSection(section._id)}>
                                    <MdDeleteForever size={20}/>
                                </Button>
                            </div>
                            <div className="flex items-center justify-center mt-3">
                                <video src={section.video.url} width="320" height="240" controls/>
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                ))) : (
                    <div>
                    <p>No sections available</p>
                </div>
                )
            }
        </Accordion>
    </div>
  )
}

export default SectionDisplay