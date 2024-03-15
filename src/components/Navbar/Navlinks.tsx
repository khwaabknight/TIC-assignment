import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuList,
  } from "@/components/shadcn/ui/navigation-menu"
import { Link } from "react-router-dom"
import navlinks from "@/data/navlinks";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import { accountTypes } from "@/data/constants";


type NavlinksProps = {
    col?:boolean
}
  

function Navlinks({col}:NavlinksProps) {

    const {accountType} = useSelector((state : RootState) => state.user.user ?? {accountType:accountTypes.public});

  return (
    <div className="px-10 ">
        <NavigationMenu>
            <NavigationMenuList className={col ? "flex-col" : ""}>
                {
                    navlinks.map((item) => {
                        if(item.access === accountTypes.public || item.access === accountType){
                            return (
                                <NavigationMenuItem key={item.title} className="hover:bg-slate-900 py-3 px-5 rounded-lg text-white">
                                    <Link to={item.url}>
                                        {item.title}
                                    </Link>
                                </NavigationMenuItem>
                            )
                        }else {
                            return null
                        }
                    })
                }                
            </NavigationMenuList>
        </NavigationMenu>
    </div>
  )
}

export default Navlinks