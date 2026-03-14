import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="bg-card border-t border-border py-12">
    <div className="container px-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        <div>
          <h3 className="font-display text-xl font-bold gold-text-gradient mb-3">Akshaya Construction</h3>
          <p className="text-muted-foreground font-body text-sm leading-relaxed">
            Premium construction services with 100% Vastu compliance. Building excellence across Tamil Nadu since 2016.
          </p>
        </div>
        <div>
          <h4 className="font-body font-semibold text-foreground mb-3">Quick Links</h4>
          <div className="space-y-2">
            <a href="/#about" className="block text-muted-foreground font-body text-sm hover:text-primary transition-colors">About Us</a>
            <a href="/#services" className="block text-muted-foreground font-body text-sm hover:text-primary transition-colors">Services</a>
            <Link to="/projects" className="block text-muted-foreground font-body text-sm hover:text-primary transition-colors">Projects</Link>
            <a href="/#contact" className="block text-muted-foreground font-body text-sm hover:text-primary transition-colors">Contact</a>
            <Link to="/admin" className="block text-muted-foreground font-body text-xs hover:text-primary transition-colors mt-2 opacity-50">Admin</Link>
          </div>
        </div>
        <div>
          <h4 className="font-body font-semibold text-foreground mb-3">Contact Info</h4>
          <p className="text-muted-foreground font-body text-sm">📞 9500705340</p>
          <p className="text-muted-foreground font-body text-sm">✉️ sreeraa.ceo@gmail.com</p>
          <p className="text-muted-foreground font-body text-sm mt-2">📍 NO 3/2A, Pappampatti, Kannampalayam, Nachiyar Nagar, Coimbatore – 641016</p>
        </div>
      </div>
      <div className="border-t border-border pt-6 text-center">
        <p className="text-muted-foreground font-body text-sm">© {new Date().getFullYear()} Akshaya Construction. All rights reserved.</p>
      </div>
    </div>
  </footer>
);

export default Footer;
