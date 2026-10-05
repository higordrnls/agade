import { motion } from "motion/react";
import { Link } from "react-router";
import { ArrowRight, Sparkles, Recycle, LineChart } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/imagens/catalog/drop-01/05-horizonte.png"
            alt="AGADE Eyewear"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-white" />
        </div>

        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-6xl md:text-8xl mb-6 text-white" style={{ fontFamily: 'var(--font-serif)' }}>
              Vision Reimagined
            </h1>
            <p className="text-xl md:text-2xl mb-4 text-white/90" style={{ fontFamily: 'var(--font-sans)' }}>
              Where 3D Precision Meets Brazilian Luxury
            </p>
            <p className="text-sm md:text-base mb-12 text-white/70 tracking-widest uppercase" style={{ fontFamily: 'var(--font-mono)' }}>
              CONCEPT PROJECT • DROP 01
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/collection"
                className="px-8 py-4 bg-white text-black hover:bg-accent hover:text-white transition-all duration-300 flex items-center justify-center gap-2"
              >
                <span style={{ fontFamily: 'var(--font-mono)' }}>Explore Collection</span>
                <ArrowRight size={20} />
              </Link>
              <Link
                to="/story"
                className="px-8 py-4 border-2 border-white text-white hover:bg-white hover:text-black transition-all duration-300"
              >
                <span style={{ fontFamily: 'var(--font-mono)' }}>Our Story</span>
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-px h-16 bg-white/50"
          />
        </motion.div>
      </section>

      {/* Core Values Section */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl md:text-6xl mb-4" style={{ fontFamily: 'var(--font-serif)' }}>
              Our Pillars
            </h2>
            <p className="text-sm tracking-widest text-muted-foreground" style={{ fontFamily: 'var(--font-mono)' }}>
              INNOVATION • SUSTAINABILITY • IDENTITY
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-12">
            {[
              {
                icon: <Sparkles size={40} />,
                title: "Innovation",
                description: "3D-printed eyewear explored through form, digital fabrication and material experimentation.",
                link: "/technology",
              },
              {
                icon: <Recycle size={40} />,
                title: "Sustainability",
                description: "A conceptual circular model connecting recycled material, digital fabrication and product design.",
                link: "/sustainability",
              },
              {
                icon: <LineChart size={40} />,
                title: "Identity",
                description: "A Brazilian design language built around architecture, identity and contemporary eyewear.",
                link: "/story",
              },
            ].map((pillar, index) => (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="group cursor-pointer"
              >
                <Link to={pillar.link} className="block">
                  <div className="mb-6 text-accent group-hover:scale-110 transition-transform duration-300">
                    {pillar.icon}
                  </div>
                  <h3 className="text-3xl mb-4 group-hover:text-accent transition-colors" style={{ fontFamily: 'var(--font-serif)' }}>
                    {pillar.title}
                  </h3>
                  <p className="text-muted-foreground mb-6" style={{ fontFamily: 'var(--font-sans)' }}>
                    {pillar.description}
                  </p>
                  <span className="text-sm tracking-wide flex items-center gap-2 group-hover:gap-4 transition-all" style={{ fontFamily: 'var(--font-mono)' }}>
                    Learn More <ArrowRight size={16} />
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Image Section */}
      <section className="py-24 bg-black text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <img
                src="/imagens/catalog/drop-01/12-marco-zero.png"
                alt="AGADE Collection"
                className="w-full h-[600px] object-cover"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-sm tracking-widest text-accent mb-4 block" style={{ fontFamily: 'var(--font-mono)' }}>
                HIGH-TECH ENGINEERING
              </span>
              <h2 className="text-5xl mb-6" style={{ fontFamily: 'var(--font-serif)' }}>
                Crafted with Precision
              </h2>
              <p className="text-lg text-white/80 mb-8 leading-relaxed" style={{ fontFamily: 'var(--font-sans)' }}>
                Each frame is a conceptual exploration of 3D-printed eyewear, combining expressive form, digital fabrication and a circular material narrative.
              </p>
              <Link
                to="/collection"
                className="inline-flex items-center gap-2 px-8 py-4 bg-accent text-white hover:bg-accent/80 transition-all"
              >
                <span style={{ fontFamily: 'var(--font-mono)' }}>View Collection</span>
                <ArrowRight size={20} />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 px-6 border-t border-black/10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
            {[
              { number: "12", label: "Concept Models", suffix: "" },
              { number: "48", label: "Concept SKUs", suffix: "" },
              { number: "3D", label: "Printing Language", suffix: "" },
              { number: "4", label: "Colorways per Model", suffix: "" },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-5xl md:text-6xl mb-2 text-accent" style={{ fontFamily: 'var(--font-serif)' }}>
                  {stat.number}{stat.suffix}
                </div>
                <div className="text-xs tracking-widest uppercase text-muted-foreground" style={{ fontFamily: 'var(--font-mono)' }}>
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
