import { useNavigate } from "react-router-dom";
import { Button } from "../shadcn/ui/button";
import { FaBackward } from "react-icons/fa";


function Error() {
  const navigate = useNavigate();
  return (
    <div className="max-w-6xl mx-auto flex justify-center items-center gap-3 mt-10">
      <div className="flex flex-col items-center justify-center w-1/3">
        <div className="">
          <h3 className="font-medium text-2xl text-center text-red-500">Look's like you got to wrong page !!</h3>
        </div>
        <div className="w-11/12 max-w-2xl h-fit ">
            <img src="/images/error.jpg" alt="" className="object-contain"/>
        </div>
        <p>Get back before something happens there!!</p>
        <Button variant={"destructive"} size={'lg'} className="gap-2 bg-yellow-400" onClick={() => navigate('/')}>
            <FaBackward size={14}/>
            <p className="font-medium text-lg">Go Back</p>
        </Button>
      </div>
    </div>
  )
}

export default Error