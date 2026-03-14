import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import WhyChooseUs from "@/components/WhyChooseUs";
import ProjectsGallery from "@/components/ProjectsGallery";
import CEOProfile from "@/components/CEOProfile";
import Contact from "@/components/Contact";
import PopupForm from "@/components/PopupForm";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingButtons from "@/components/FloatingButtons";

const Home = () => (
  <>
    <Navbar />
    <Hero />
    <About />
    <Services />
    <WhyChooseUs />
    <ProjectsGallery limit={6} />
    <CEOProfile />
    <Contact />
    <Footer />
    <FloatingButtons />
    <PopupForm />
  </>
);

export default Home;
