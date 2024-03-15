import HeroSection from "../Common/HeroSection"
import { FaArrowRight } from "react-icons/fa";
import { GiUpgrade } from "react-icons/gi";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/shadcn/ui/carousel"



function Products() {
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
      <div className="w-11/12 max-w-5xl mx-auto" id="courses">
        <Carousel>
          <CarouselContent>
            <CarouselItem className="flex justify-center"><img src="/images/placeholder-product.jpg"/></CarouselItem>
            <CarouselItem><img src="/images/placeholder-product.jpg"/></CarouselItem>
            <CarouselItem><img src="/images/placeholder-product.jpg"/></CarouselItem>
          </CarouselContent>
          <CarouselPrevious/>
          <CarouselNext />
        </Carousel>   
      </div>
      <div>
        Events
        registration for events
      </div>
      <div>
        footer
      </div>

        
    </div>
  )
}

export default Products