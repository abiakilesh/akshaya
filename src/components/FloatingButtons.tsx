import { Phone, MessageCircle } from "lucide-react";

const FloatingButtons = () => (
  <div className="fixed right-4 bottom-4 z-40 flex flex-col gap-3">
    <a
      href="https://wa.me/919500705340"
      target="_blank"
      rel="noopener noreferrer"
      className="w-14 h-14 rounded-full gold-gradient flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="w-6 h-6 text-primary-foreground" />
    </a>
    <a
      href="tel:9500705340"
      className="w-14 h-14 rounded-full gold-gradient flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
      aria-label="Call us"
    >
      <Phone className="w-6 h-6 text-primary-foreground" />
    </a>
  </div>
);

export default FloatingButtons;
