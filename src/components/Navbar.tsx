import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const links = [
    { label: "Home", href: "/#home" },
    { label: "About", href: "/#about" },
    { label: "Services", href: "/#services" },
    { label: "Projects", href: "/projects" },
    { label: "Contact", href: "/#contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
      <div className="container px-4 flex items-center justify-between h-16">
        <Link to="/" className="font-display text-xl font-bold gold-text-gradient">
          Akshaya Construction
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-6">
          {links.map(l => (
            <a key={l.label} href={l.href} className="font-body text-sm text-muted-foreground hover:text-primary transition-colors">
              {l.label}
            </a>
          ))}
          <a href="tel:9500705340" className="gold-gradient px-4 py-2 rounded-lg font-body text-sm font-semibold text-primary-foreground hover:opacity-90 transition-opacity">
            Call Now
          </a>
        </div>

        {/* Mobile toggle */}
        <button onClick={() => setOpen(!open)} className="md:hidden text-foreground">
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-card border-t border-border p-4 space-y-3">
          {links.map(l => (
            <a key={l.label} href={l.href} onClick={() => setOpen(false)} className="block font-body text-sm text-muted-foreground hover:text-primary transition-colors py-2">
              {l.label}
            </a>
          ))}
          <a href="tel:9500705340" className="block gold-gradient px-4 py-2 rounded-lg font-body text-sm font-semibold text-primary-foreground text-center">
            Call Now
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
