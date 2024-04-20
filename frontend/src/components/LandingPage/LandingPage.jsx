import About from "../About/About";
import CarList from "../CarList/CarList";
import Footer from "../Footer/Footer";
import Hero from "../Hero/Hero";
import Services from "../Services/Services";
// import Testimonial from "../Testimonial/Testimonial";

const LandingPage = ({theme, setTheme}) => {
  return (
    <div className="bg-white dark:bg-black dark:text-white text-black overflow-x-hidden">
      <Hero theme={theme} />
      <About />
      <Services />
      <CarList />
      <Footer />
    </div>
  );
};
export default LandingPage;
