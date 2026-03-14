import { motion } from "framer-motion";
import { Building2, Palette, Box, Home, Compass, Landmark } from "lucide-react";

const services = [
  { icon: Building2, title: "Construction", desc: "End-to-end construction services for residential and commercial buildings with premium quality materials." },
  { icon: Palette, title: "Interior Design", desc: "Bespoke interior design solutions that blend aesthetics with functionality for modern living." },
  { icon: Box, title: "2D/3D Planning", desc: "Advanced architectural visualization with detailed 2D blueprints and immersive 3D renderings." },
  { icon: Home, title: "Real Estate Development", desc: "Strategic real estate development projects with exceptional ROI and prime locations." },
  { icon: Compass, title: "100% Vastu Design", desc: "Complete Vastu Shastra compliant designs ensuring harmony, prosperity, and positive energy flow." },
  { icon: Landmark, title: "Bank Loan Assistance", desc: "Hassle-free bank loan processing assistance to help finance your dream construction project." },
];

const Services = () => (
  <section id="services" className="py-24">
    <div className="container px-4">
      <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
        <span className="text-primary font-body text-sm tracking-widest uppercase">Our Services</span>
        <h2 className="text-3xl md:text-5xl font-display font-bold mt-3">What We Offer</h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((s, i) => (
          <motion.div
            key={s.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            whileHover={{ y: -8 }}
            className="glass-card rounded-xl p-8 group cursor-pointer transition-all hover:border-primary/50"
          >
            <div className="w-14 h-14 rounded-lg gold-gradient flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
              <s.icon className="w-7 h-7 text-primary-foreground" />
            </div>
            <h3 className="text-xl font-display font-semibold mb-3 text-foreground">{s.title}</h3>
            <p className="text-muted-foreground font-body text-sm leading-relaxed">{s.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default Services;
