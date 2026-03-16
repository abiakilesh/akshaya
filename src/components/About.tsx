import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const stats = [
  { value: 10, suffix: "+", label: "Years Experience" },
  { value: 40, suffix: "+", label: "Projects Completed" },
  { value: 80, suffix: "+", label: "Happy Clients" },
];

function AnimatedCounter({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          let current = 0;
          const step = Math.ceil(target / 40);
          const interval = setInterval(() => {
            current += step;
            if (current >= target) { setCount(target); clearInterval(interval); }
            else setCount(current);
          }, 40);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return <div ref={ref} className="text-5xl md:text-6xl font-display font-bold text-primary">{count}{suffix}</div>;
}

const About = () => (
  <section id="about" className="py-24 bg-secondary/30">
    <div className="container px-4">
      <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-16">
        <span className="text-primary font-body text-sm tracking-widest uppercase">About Us</span>
        <h2 className="text-3xl md:text-5xl font-display font-bold mt-3 mb-6">Who We Are</h2>
        <p className="text-muted-foreground max-w-3xl mx-auto text-lg font-body">
          Akshaya Construction is a premier construction company based in Coimbatore, Tamil Nadu. With over 10 years of industry expertise, we specialize in delivering world-class residential and commercial projects with 100% Vastu compliance. Led by Er. Karthik V, we blend traditional wisdom with modern engineering to create spaces that inspire.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.15 }}
            className="glass-card rounded-xl p-8 text-center"
          >
            <AnimatedCounter target={stat.value} suffix={stat.suffix} />
            <p className="text-muted-foreground mt-2 font-body">{stat.label}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default About;
