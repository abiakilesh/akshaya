import { motion } from "framer-motion";
import { useState } from "react";
import { Phone, Mail, MapPin, Send } from "lucide-react";
import { addLead } from "@/utils/dataService";

const Contact = () => {
  const [form, setForm] = useState({ name: "", phone: "", email: "", projectType: "Construction", place: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addLead(form);
      setSent(true);
      setTimeout(() => setSent(false), 3000);
      setForm({ name: "", phone: "", email: "", projectType: "Construction", place: "", message: "" });
    } catch (err) {
      console.error("Failed to submit lead:", err);
    }
  };

  return (
    <section id="contact" className="py-24">
      <div className="container px-4">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <span className="text-primary font-body text-sm tracking-widest uppercase">Get In Touch</span>
          <h2 className="text-3xl md:text-5xl font-display font-bold mt-3">Contact Us</h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <div className="space-y-6 mb-8">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg gold-gradient flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5 text-primary-foreground" />
                </div>
                <div>
                  <h4 className="font-body font-semibold text-foreground">Phone</h4>
                  <a href="tel:9500705340" className="text-muted-foreground font-body hover:text-primary transition-colors">9500705340</a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg gold-gradient flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5 text-primary-foreground" />
                </div>
                <div>
                  <h4 className="font-body font-semibold text-foreground">Email</h4>
                  <a href="mailto:sreeraa.ceo@gmail.com" className="text-muted-foreground font-body hover:text-primary transition-colors">sreeraa.ceo@gmail.com</a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg gold-gradient flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-primary-foreground" />
                </div>
                <div>
                  <h4 className="font-body font-semibold text-foreground">Address</h4>
                  <p className="text-muted-foreground font-body text-sm">NO 3/2A, Pappampatti, Kannampalayam, Nachiyar Nagar, Coimbatore – 641016, Tamil Nadu, India</p>
                </div>
              </div>
            </div>

            <div className="rounded-xl overflow-hidden border border-border h-64">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3916.2649!2d76.9558!3d11.0168!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTHCsDAxJzAwLjUiTiA3NsKwNTcnMjAuOSJF!5e0!3m2!1sen!2sin!4v1234567890"
                width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy" title="Akshaya Construction Location"
              />
            </div>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            onSubmit={handleSubmit}
            className="glass-card rounded-xl p-8 space-y-5"
          >
            <input required placeholder="Your Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="w-full bg-input border border-border rounded-lg px-4 py-3 text-foreground font-body placeholder:text-muted-foreground focus:outline-none focus:border-primary" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input required placeholder="Phone" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} className="w-full bg-input border border-border rounded-lg px-4 py-3 text-foreground font-body placeholder:text-muted-foreground focus:outline-none focus:border-primary" />
              <input type="email" required placeholder="Email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} className="w-full bg-input border border-border rounded-lg px-4 py-3 text-foreground font-body placeholder:text-muted-foreground focus:outline-none focus:border-primary" />
            </div>
            <select value={form.projectType} onChange={e => setForm({ ...form, projectType: e.target.value })} className="w-full bg-input border border-border rounded-lg px-4 py-3 text-foreground font-body focus:outline-none focus:border-primary">
              <option>Construction</option>
              <option>Interior Design</option>
              <option>2D/3D Planning</option>
              <option>Real Estate Development</option>
              <option>100% Vastu Design</option>
              <option>Bank Loan Assistance</option>
            </select>
            <input required placeholder="Place / Location" value={form.place} onChange={e => setForm({ ...form, place: e.target.value })} className="w-full bg-input border border-border rounded-lg px-4 py-3 text-foreground font-body placeholder:text-muted-foreground focus:outline-none focus:border-primary" />
            <textarea required rows={4} placeholder="Your Message" value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} className="w-full bg-input border border-border rounded-lg px-4 py-3 text-foreground font-body placeholder:text-muted-foreground focus:outline-none focus:border-primary resize-none" />
            <button type="submit" className="w-full gold-gradient py-3 rounded-lg font-body font-semibold text-primary-foreground hover:opacity-90 transition-opacity flex items-center justify-center gap-2">
              <Send className="w-4 h-4" /> {sent ? "Sent Successfully!" : "Send Message"}
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
