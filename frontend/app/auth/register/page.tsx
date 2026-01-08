import RegisterForm from "@/components/forms/RegisterForm";
import logo from "@/public/Images/brand-logo.svg"

export default function RegisterPage() {
    return (
        <div className="min-h-screen bg-[linear-gradient(126.04deg,#F7FAFC_15%,#F7FAFC_45%,#522463_85%)]">
      
     
      <div className="absolute top-6 left-6">
        <img
          src={logo.src}
          alt="OptiPrep Logo"
          className="w-28 h-auto"
        />
      </div>

    
      <div className="min-h-screen flex items-center justify-center px-6">
       <RegisterForm/>
      </div>
    </div>
    );
}
