import { Link } from "react-router";
import { Instagram, Mail, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-black text-white py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div>
            <h3 className="text-3xl mb-4" style={{ fontFamily: 'var(--font-serif)' }}>
              AGADE
            </h3>
            <p className="text-sm text-white/60 leading-relaxed" style={{ fontFamily: 'var(--font-sans)' }}>
              Luxury sustainable eyewear combining 3D printing precision with Brazilian craftsmanship.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-sm tracking-widest mb-4" style={{ fontFamily: 'var(--font-mono)' }}>
              EXPLORE
            </h4>
            <ul className="space-y-2">
              {[
                { path: "/", label: "Home" },
                { path: "/story", label: "Story" },
                { path: "/technology", label: "Technology" },
                { path: "/collection", label: "Collection" },
                { path: "/sustainability", label: "Sustainability" },
              ].map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-white/60 hover:text-accent transition-colors text-sm"
                    style={{ fontFamily: 'var(--font-sans)' }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm tracking-widest mb-4" style={{ fontFamily: 'var(--font-mono)' }}>
              CONTACT
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <Mail size={16} className="mt-1 text-accent" />
                <a
                  href="mailto:hello@agade.com"
                  className="text-white/60 hover:text-accent transition-colors text-sm"
                  style={{ fontFamily: 'var(--font-sans)' }}
                >
                  hello@agade.com
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin size={16} className="mt-1 text-accent" />
                <span className="text-white/60 text-sm" style={{ fontFamily: 'var(--font-sans)' }}>
                  São Paulo, Brazil
                </span>
              </li>
              <li className="flex items-start gap-2">
                <Instagram size={16} className="mt-1 text-accent" />
                <a
                  href="https://instagram.com/agade"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/60 hover:text-accent transition-colors text-sm"
                  style={{ fontFamily: 'var(--font-sans)' }}
                >
                  @agade
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-sm tracking-widest mb-4" style={{ fontFamily: 'var(--font-mono)' }}>
              NEWSLETTER
            </h4>
            <p className="text-sm text-white/60 mb-4" style={{ fontFamily: 'var(--font-sans)' }}>
              Stay updated on new releases and innovations.
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 px-4 py-2 bg-white/10 border border-white/20 text-white placeholder:text-white/40 focus:border-accent focus:outline-none text-sm"
                style={{ fontFamily: 'var(--font-sans)' }}
              />
              <button className="px-4 py-2 bg-accent hover:bg-accent/80 transition-colors text-sm">
                →
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-white/40" style={{ fontFamily: 'var(--font-mono)' }}>
            © 2026 AGADE EYEWEAR. ALL RIGHTS RESERVED.
          </p>
          <div className="flex gap-6">
            <a
              href="#"
              className="text-xs text-white/40 hover:text-accent transition-colors"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              PRIVACY POLICY
            </a>
            <a
              href="#"
              className="text-xs text-white/40 hover:text-accent transition-colors"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              TERMS OF SERVICE
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
