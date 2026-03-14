import { motion } from "framer-motion";
import heroBg from "@/assets/hero-bg.jpg";

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-secondary to-background" />
      <div className="absolute inset-0 opacity-20" style={{ backgroundImage: `url(${heroBg})`, backgroundSize: "cover", backgroundPosition: "center" }} />
      <div className="absolute inset-0 bg-background/70" />

      <div className="container relative z-10 px-4 text-center">
        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <span className="inline-block px-4 py-1.5 mb-6 text-sm font-body font-medium tracking-widest uppercase border border-primary/40 rounded-full text-primary">
            Building Dreams Since 2016
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-4xl sm:text-5xl md:text-7xl font-display font-bold mb-6 leading-tight"
        >
          <span className="text-foreground">Building </span>
          <span className="gold-text-gradient">Excellence,</span>
          <br />
          <span className="text-foreground">Crafting </span>
          <span className="gold-text-gradient">Legacies</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 font-body"
        >
          Premium construction services with 100% Vastu compliance. Turning your vision into architectural masterpieces across Tamil Nadu.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <a href="#contact" className="gold-gradient px-8 py-4 rounded-lg font-body font-semibold text-primary-foreground hover:opacity-90 transition-opacity text-lg">
            Start Your Project
          </a>
          <a href="#projects" className="px-8 py-4 rounded-lg font-body font-semibold border border-primary/40 text-primary hover:bg-primary/10 transition-colors text-lg">
            View Our Work
          </a>
        </motion.div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default Hero;
