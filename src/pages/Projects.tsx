import ProjectsGallery from "@/components/ProjectsGallery";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingButtons from "@/components/FloatingButtons";

const Projects = () => (
  <>
    <Navbar />
    <div className="pt-20">
      <ProjectsGallery />
    </div>
    <Footer />
    <FloatingButtons />
  </>
);

export default Projects;
