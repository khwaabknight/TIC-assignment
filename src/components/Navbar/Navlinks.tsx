import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuList,
  } from "@/components/shadcn/ui/navigation-menu"
import { Link } from "react-router-dom"
import navlinks from "@/data/navlinks";


  

function Navlinks() {

    

  return (
    <div>
        <NavigationMenu>
            <NavigationMenuList>
                {
                    navlinks.map(() => (
                        <NavigationMenuItem className="">
                            <Link to={'/home'}>
                                Home
                            </Link>
                        </NavigationMenuItem>
                    ))
                }                
            </NavigationMenuList>
        </NavigationMenu>
    </div>
  )
}

export default Navlinks