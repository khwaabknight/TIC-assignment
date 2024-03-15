import { Button } from "../shadcn/ui/button"
import { useNavigate } from "react-router-dom";
import { IconType } from "react-icons/lib";

type HeroSectionProps= {
  bg:string,
  title:string,
  p1:string,
  p2:string,
  btn1:string,
  btn1link:string,
  btn2:string,
  btn2link:string,
  icon1:IconType,
  icon2:IconType,
}

function HeroSection({bg,title,p1,p2,btn1,btn1link,btn2,btn2link,icon1:Icon1,icon2:Icon2}:HeroSectionProps) {
    const navigate = useNavigate();

  return (
    <div className={`${bg} text-slate-100 sm:py-28 py-10`}>
        <div className="w-11/12 max-w-7xl mx-auto flex flex-col justify-center items-center gap-5">
          <h2 className="text-4xl font-semibold py-3">{title}</h2>
          <div className="text-center">
            <p className="text-lg font-thin py-2-">{p1}</p>
            <p>{p2}</p>
          </div>

          <div className="flex gap-5 my-5">
            <Button className="gap-2" variant={'yellow'} onClick={() => navigate(btn1link)}>
              <p>{btn1}</p>
              <Icon1 />            
            </Button>
            <Button  className="gap-2 text-black" variant={'outline'} onClick={() => navigate(btn2link)}>
              <p>{btn2}</p>
              <Icon2 />            
            </Button>
          </div>
        </div>
      </div>
  )
}

export default HeroSection