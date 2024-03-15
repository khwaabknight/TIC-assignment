import { Button } from "../shadcn/ui/button"
import { FaLocationArrow } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Footer from "../Footer/Footer";
import HeroSection from "../Common/HeroSection";


function Home() {

  const navigate = useNavigate();

  return (
    <div className="w-full">
      {/* Hero section */}
      <HeroSection 
        bg='hero-home'
        title='Level Up Your Skills. Upgrade Your Career.'
        p1='Learn in-demand skills from industry experts.'
        p2='Take control of your future with our flexible online courses.'
        btn1='Signup today'
        btn1link='/signup'
        btn2='Explore courses now'
        btn2link="/products"
        icon1={FaLocationArrow}
        icon2={FaSearch}
      />

      {/* who we are */}
      <div className="w-11/12 max-w-6xl mx-auto grid sm:grid-cols-2 items-center gap-5">
        <div className="bg-slate-50 p-10 sm:order-1 order-2">
          <h3 className="text-2xl font-semibold py-3">Who We Are</h3>
          <p className="text-lg font-thin py-2-">We are passionate about making education accessible and empowering individuals to achieve their goals. Our platform offers high-quality courses taught by industry experts, designed to equip you with the skills you need to succeed in today's job market.</p>
        </div>
        <div className="p-10 sm:order-2 order-1">
          <img src="/images/personalized-learning.jpg" alt=""/>
        </div>
      </div>

      {/* Sign up as instructor */}
      <div className="w-11/12 max-w-6xl mx-auto grid sm:grid-cols-2 items-center gap-5">
        <div className="p-10">
          <img src="/images/home-instructor.jpg" alt=""/>
        </div>
        <div className="flex flex-col justify-center items-start gap-3">
            <h3>Are you Instructor ? </h3>
            <p>Share your expertise by :</p>
            <ul className=" list-disc pl-5">
              <li>Join a thriving community of passionate instructors and make a difference</li>
              <li>Reach a global audience of eager learners seeking valuable skills.</li>
              <li>Earn income by creating and sharing high-quality online courses.</li>
              <li>Gain recognition as a subject matter expert in your field.</li>
            </ul>
            <Button className="gap-4" variant={'yellow'} onClick={() => navigate('/signup')}>
              <p>Signup as Instructor</p>
              <FaArrowRight />      
            </Button>
        </div>
      </div>
      <Footer/>



    </div>
  )
}

export default Home