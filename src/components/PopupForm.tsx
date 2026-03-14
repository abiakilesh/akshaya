import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { addLead } from "@/utils/dataService";

const PopupForm = () => {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", email: "", projectType: "Construction", place: "", message: "" });

  useEffect(() => {
    const timer = setTimeout(() => setOpen(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addLead(form);
    } catch (err) {
      console.error("Failed to save lead:", err);
    }
    setOpen(false);

    const whatsappMessage = `Hello Akshaya Construction 👋\n\nI am interested in your construction services.\n\nName: ${form.name}\nPhone: ${form.phone}\nProject Type: ${form.projectType}\nPlace: ${form.place}\n\nMessage:\n${form.message}\n\nPlease contact me.`;
    window.open(`https://wa.me/919500705340?text=${encodeURIComponent(whatsappMessage)}`);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/60 backdrop-blur-sm">
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="glass-card rounded-2xl p-6 sm:p-8 w-full max-w-md relative border border-primary/30">
            <button onClick={() => setOpen(false)} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors">
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-2xl font-display font-bold gold-text-gradient mb-1">Get Free Consultation</h3>
            <p className="text-muted-foreground font-body text-sm mb-6">Tell us about your project and we'll get back to you.</p>
            <form onSubmit={handleSubmit} className="space-y-3">
              <input required placeholder="Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="w-full bg-input border border-border rounded-lg px-4 py-2.5 text-foreground font-body text-sm placeholder:text-muted-foreground focus:outline-none focus:border-primary" />
              <div className="grid grid-cols-2 gap-3">
                <input required placeholder="Phone" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} className="w-full bg-input border border-border rounded-lg px-4 py-2.5 text-foreground font-body text-sm placeholder:text-muted-foreground focus:outline-none focus:border-primary" />
                <input type="email" placeholder="Email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} className="w-full bg-input border border-border rounded-lg px-4 py-2.5 text-foreground font-body text-sm placeholder:text-muted-foreground focus:outline-none focus:border-primary" />
              </div>
              <select value={form.projectType} onChange={e => setForm({ ...form, projectType: e.target.value })} className="w-full bg-input border border-border rounded-lg px-4 py-2.5 text-foreground font-body text-sm focus:outline-none focus:border-primary">
                <option>Construction</option>
                <option>Interior Design</option>
                <option>2D/3D Planning</option>
                <option>Real Estate Development</option>
                <option>100% Vastu Design</option>
                <option>Bank Loan Assistance</option>
              </select>
              <input required placeholder="Place / Location" value={form.place} onChange={e => setForm({ ...form, place: e.target.value })} className="w-full bg-input border border-border rounded-lg px-4 py-2.5 text-foreground font-body text-sm placeholder:text-muted-foreground focus:outline-none focus:border-primary" />
              <textarea rows={3} placeholder="Your Message" value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} className="w-full bg-input border border-border rounded-lg px-4 py-2.5 text-foreground font-body text-sm placeholder:text-muted-foreground focus:outline-none focus:border-primary resize-none" />
              <button type="submit" className="w-full gold-gradient py-2.5 rounded-lg font-body font-semibold text-primary-foreground hover:opacity-90 transition-opacity">
                Submit & Connect on WhatsApp
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PopupForm;
