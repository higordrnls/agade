import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";

export default function Collection() {
  const collections = [
    {
      name: "Minimal",
      description: "Clean lines, subtle curves. The essence of contemporary eyewear.",
      image: "https://images.unsplash.com/photo-1755869985928-0e61815beddb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBleWVnbGFzc2VzJTIwbWluaW1hbHxlbnwxfHx8fDE3NzI1NDMyNzR8MA&ixlib=rb-4.1.0&q=80&w=1080",
      details: ["Ultra-thin frame • 12g weight • 4 colorways"]
    },
    {
      name: "Architect",
      description: "Geometric precision meets architectural inspiration.",
      image: "https://images.unsplash.com/photo-1769414217270-507459a16298?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsaXN0JTIwb3B0aWNhbCUyMGdsYXNzZXN8ZW58MXx8fHwxNzcyNTQzMjc1fDA&ixlib=rb-4.1.0&q=80&w=1080",
      details: ["Angular design • 14g weight • 6 colorways"]
    },
    {
      name: "Classic",
      description: "Timeless elegance with modern materials and construction.",
      image: "https://images.unsplash.com/photo-1769414259128-bf8a66a41701?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBleWV3ZWFyJTIwZGlzcGxheXxlbnwxfHx8fDE3NzI1NDMyNzV8MA&ixlib=rb-4.1.0&q=80&w=1080",
      details: ["Round frame • 15g weight • 8 colorways"]
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0 bg-black">
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 to-black" />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 text-center px-6"
        >
          <h1 className="text-6xl md:text-7xl text-white mb-4" style={{ fontFamily: 'var(--font-serif)' }}>
            Collection
          </h1>
          <p className="text-sm tracking-widest text-white/80" style={{ fontFamily: 'var(--font-mono)' }}>
            ENGINEERED FOR YOUR UNIQUE VISION
          </p>
        </motion.div>
      </section>

      {/* Introduction */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl mb-8" style={{ fontFamily: 'var(--font-serif)' }}>
              Three Philosophies, Infinite Possibilities
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed" style={{ fontFamily: 'var(--font-sans)' }}>
              Our collection represents three distinct design languages, each refined through years 
              of optical research. Choose your foundation, then customize every dimension to match 
              your facial geometry and personal aesthetic.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Collections Grid */}
      <section className="py-12 px-6">
        <div className="max-w-7xl mx-auto space-y-24">
          {collections.map((collection, index) => (
            <motion.div
              key={collection.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className={`grid md:grid-cols-2 gap-12 items-center ${
                index % 2 === 1 ? 'md:grid-flow-dense' : ''
              }`}
            >
              <div className={index % 2 === 1 ? 'md:col-start-2' : ''}>
                <div className="relative group overflow-hidden">
                  <img
                    src={collection.image}
                    alt={collection.name}
                    className="w-full h-[600px] object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
              </div>
              <div className={index % 2 === 1 ? 'md:col-start-1 md:row-start-1' : ''}>
                <motion.div
                  initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                >
                  <span className="text-sm tracking-widest text-accent mb-4 block" style={{ fontFamily: 'var(--font-mono)' }}>
                    COLLECTION {String(index + 1).padStart(2, '0')}
                  </span>
                  <h3 className="text-5xl mb-6" style={{ fontFamily: 'var(--font-serif)' }}>
                    {collection.name}
                  </h3>
                  <p className="text-xl text-muted-foreground mb-8 leading-relaxed" style={{ fontFamily: 'var(--font-sans)' }}>
                    {collection.description}
                  </p>
                  <div className="space-y-4 mb-8">
                    {collection.details.map((detail, detailIndex) => (
                      <div
                        key={detailIndex}
                        className="text-sm tracking-wide text-muted-foreground"
                        style={{ fontFamily: 'var(--font-mono)' }}
                      >
                        {detail}
                      </div>
                    ))}
                  </div>
                  <button className="inline-flex items-center gap-2 px-8 py-4 bg-black text-white hover:bg-accent transition-all duration-300">
                    <span style={{ fontFamily: 'var(--font-mono)' }}>Customize This Frame</span>
                    <ArrowRight size={20} />
                  </button>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Customization Section */}
      <section className="py-24 bg-black text-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl mb-6" style={{ fontFamily: 'var(--font-serif)' }}>
              Made for You
            </h2>
            <p className="text-lg text-white/70 max-w-3xl mx-auto" style={{ fontFamily: 'var(--font-sans)' }}>
              Each collection serves as a starting point. Our customization process ensures your 
              frames are optimized for your unique facial structure, prescription, and style preferences.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                title: "Facial Scan",
                description: "Precise 3D mapping of your face for perfect fit"
              },
              {
                title: "Prescription Integration",
                description: "Optimized for your exact optical requirements"
              },
              {
                title: "Color Selection",
                description: "Translucent pink, opaque black, white, or custom"
              },
              {
                title: "Final Adjustments",
                description: "Fine-tune every dimension to your preference"
              },
            ].map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-accent/20 flex items-center justify-center">
                  <span className="text-accent" style={{ fontFamily: 'var(--font-mono)' }}>
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>
                <h3 className="text-xl mb-3" style={{ fontFamily: 'var(--font-serif)' }}>
                  {step.title}
                </h3>
                <p className="text-sm text-white/70" style={{ fontFamily: 'var(--font-sans)' }}>
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Color Palette */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-5xl mb-6" style={{ fontFamily: 'var(--font-serif)' }}>
              Signature Colors
            </h2>
            <p className="text-lg text-muted-foreground" style={{ fontFamily: 'var(--font-sans)' }}>
              Our brand palette reflects minimalist sophistication
            </p>
          </motion.div>

          <div className="grid grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="w-full aspect-square bg-black mb-4 border border-black/10" />
              <h3 className="text-xl mb-2" style={{ fontFamily: 'var(--font-serif)' }}>Opaque Black</h3>
              <p className="text-sm text-muted-foreground" style={{ fontFamily: 'var(--font-mono)' }}>
                #000000
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-center"
            >
              <div className="w-full aspect-square bg-white border border-black/10 mb-4" />
              <h3 className="text-xl mb-2" style={{ fontFamily: 'var(--font-serif)' }}>Pure White</h3>
              <p className="text-sm text-muted-foreground" style={{ fontFamily: 'var(--font-mono)' }}>
                #FFFFFF
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-center"
            >
              <div className="w-full aspect-square bg-accent mb-4 opacity-60 border border-black/10" />
              <h3 className="text-xl mb-2" style={{ fontFamily: 'var(--font-serif)' }}>Translucent Pink</h3>
              <p className="text-sm text-muted-foreground" style={{ fontFamily: 'var(--font-mono)' }}>
                #FF6B7A
              </p>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="mt-12 text-center"
          >
            <p className="text-sm text-muted-foreground" style={{ fontFamily: 'var(--font-mono)' }}>
              Custom color matching available for orders of 3+ frames
            </p>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 bg-secondary">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl mb-6" style={{ fontFamily: 'var(--font-serif)' }}>
              Begin Your Journey
            </h2>
            <p className="text-xl text-muted-foreground mb-8" style={{ fontFamily: 'var(--font-sans)' }}>
              Schedule a consultation to experience the AGADE difference
            </p>
            <button className="inline-flex items-center gap-2 px-10 py-5 bg-black text-white hover:bg-accent transition-all duration-300 text-lg">
              <span style={{ fontFamily: 'var(--font-mono)' }}>Book Consultation</span>
              <ArrowRight size={24} />
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
