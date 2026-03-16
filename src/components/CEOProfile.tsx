import { motion } from "framer-motion";
import ceoPhoto from "@/assets/ceo-photo.jpg";

const CEOProfile = () => (
  <section id="ceo" className="py-24 bg-secondary/30">
    <div className="container px-4">
      <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
        <span className="text-primary font-body text-sm tracking-widest uppercase">Leadership</span>
        <h2 className="text-3xl md:text-5xl font-display font-bold mt-3">Meet Our CEO</h2>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="glass-card rounded-2xl p-8 md:p-12 max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-8"
      >
        <div className="w-48 h-48 md:w-56 md:h-56 rounded-2xl overflow-hidden border-2 border-primary/40 flex-shrink-0">
          <img src={ceoPhoto} alt="Er. Karthik V - CEO of Akshaya Construction" className="w-full h-full object-cover" />
        </div>
        <div>
          <h3 className="text-2xl md:text-3xl font-display font-bold gold-text-gradient mb-1">Er. Karthik V</h3>
          <p className="text-primary font-body text-sm tracking-wider uppercase mb-4">Founder & CEO</p>
          <p className="text-muted-foreground font-body leading-relaxed">
            With over 10 years of experience in the construction industry, Er. Karthik V founded Akshaya Construction with a vision to redefine quality in building. His expertise spans residential construction, interior design, and Vastu-compliant architectural planning. Under his leadership, Akshaya Construction has completed 18+ prestigious projects and served over 50 satisfied clients across Tamil Nadu.
          </p>
        </div>
      </motion.div>
    </div>
  </section>
);

export default CEOProfile;
