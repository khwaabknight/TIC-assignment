import { AiFillTwitterCircle, AiFillLinkedin, AiFillGithub, AiFillFacebook, AiFillInstagram } from 'react-icons/ai';

function Footer() {
  return (
    <div className="bg-slate-800 p-1 mt-20">
      <div 
        className=" text-white p-2 w-11/12 max-w-7xl mx-auto flex justify-between items-center bg-slate-800 rounded-lg"
      >
        <div className="flex space-x-4">
            <a href="https://x.com/" target="_blank" rel="noopener noreferrer">
            <AiFillTwitterCircle className="text-2xl hover:text-blue-400" />
            </a>
            <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer">
            <AiFillLinkedin className="text-2xl hover:text-blue-400" />
            </a>
            <a href="https://github.com/" target="_blank" rel="noopener noreferrer">
            <AiFillGithub className="text-2xl hover:text-blue-400" />
            </a>
            <a href="https://facebook.com/" target="_blank" rel="noopener noreferrer">
            <AiFillFacebook className="text-2xl hover:text-blue-400" />
            </a>
            <a href="https://instagram.com/" target="_blank" rel="noopener noreferrer">
            <AiFillInstagram className="text-2xl hover:text-blue-400" />
            </a>
        </div>
        <div className="ml-auto text-sm">
            &copy; {new Date().getFullYear()} Logo Co. All Rights Reserved.
        </div>
      </div>
    </div>
  )
}

export default Footer