import { motion } from "framer-motion";
import { ShieldCheck, Clock, Award, Handshake } from "lucide-react";

const reasons = [
  { icon: ShieldCheck, title: "Quality Assured", desc: "Premium materials and rigorous quality checks at every stage of construction." },
  { icon: Clock, title: "On-Time Delivery", desc: "We respect timelines and deliver projects on schedule, every time." },
  { icon: Award, title: "Vastu Expertise", desc: "100% Vastu compliant designs by experienced Vastu consultants." },
  { icon: Handshake, title: "Transparent Pricing", desc: "No hidden costs. Complete transparency in estimates and billing." },
];

const WhyChooseUs = () => (
  <section className="py-24 bg-secondary/30">
    <div className="container px-4">
      <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
        <span className="text-primary font-body text-sm tracking-widest uppercase">Why Akshaya</span>
        <h2 className="text-3xl md:text-5xl font-display font-bold mt-3">Why Choose Us</h2>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {reasons.map((r, i) => (
          <motion.div
            key={r.title}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="text-center p-6"
          >
            <motion.div whileHover={{ rotate: 10, scale: 1.1 }} className="w-16 h-16 rounded-full gold-gradient flex items-center justify-center mx-auto mb-4">
              <r.icon className="w-8 h-8 text-primary-foreground" />
            </motion.div>
            <h3 className="text-lg font-display font-semibold mb-2">{r.title}</h3>
            <p className="text-muted-foreground text-sm font-body">{r.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default WhyChooseUs;
