import HowWorks from "../extra/HowWorks";
import Testimonials from "../extra/Testimonial";
import WhyChoose from "../extra/WhyChoose";
import Featured from "../featured/Featured";
import Footer from "../footer/Footer";
import Hero from "../hero/Hero";
import Service from "../services/Services";

const Home = () => {
    return (
        <div>
           <Hero/>
           <Service/>
           <Featured/>
           <WhyChoose/>
           <HowWorks/>
           <Testimonials/>
           <Footer/>
        </div>
    );
};

export default Home;