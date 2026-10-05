import { motion } from "motion/react";
import { Leaf, Recycle, Package, TrendingDown, Heart, Globe } from "lucide-react";

export default function Sustainability() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/imagens/catalog/drop-01/10-contraste.png"
            alt="Sustainability"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 text-center px-6"
        >
          <h1 className="text-6xl md:text-7xl text-white mb-4" style={{ fontFamily: 'var(--font-serif)' }}>
            Sustainability
          </h1>
          <p className="text-sm tracking-widest text-white/80" style={{ fontFamily: 'var(--font-mono)' }}>
            FROM MATERIAL TO OBJECT
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
              Circularity as a Design Direction
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed" style={{ fontFamily: 'var(--font-sans)' }}>
              The project explores recycled PET-G as a possible material direction for digitally fabricated eyewear. The process described here is conceptual and would require material, manufacturing and environmental validation.
            </p>
          </motion.div>
        </div>
      </section>

      {/* The Process */}
      <section className="py-24 bg-black text-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl mb-6" style={{ fontFamily: 'var(--font-serif)' }}>
              The Journey of a Bottle
            </h2>
            <p className="text-lg text-white/70" style={{ fontFamily: 'var(--font-sans)' }}>
              From waste to wearable art
            </p>
          </motion.div>

          <div className="grid md:grid-cols-5 gap-8">
            {[
              {
                icon: <Package size={32} />,
                title: "Collection",
                description: "Recycled material sourcing to be validated"
              },
              {
                icon: <Recycle size={32} />,
                title: "Processing",
                description: "Material preparation and processing"
              },
              {
                icon: <Leaf size={32} />,
                title: "Conversion",
                description: "PET-G filament as the explored fabrication input"
              },
              {
                icon: <TrendingDown size={32} />,
                title: "Production",
                description: "3D printing with waste and emissions to be measured"
              },
              {
                icon: <Heart size={32} />,
                title: "Creation",
                description: "Conceptual eyewear ready for testing and validation"
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
                <div className="mx-auto mb-6 w-16 h-16 flex items-center justify-center rounded-full bg-accent/20 text-accent">
                  {step.icon}
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

      {/* Impact Metrics */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl mb-6" style={{ fontFamily: 'var(--font-serif)' }}>
              Potential Impact
            </h2>
            <p className="text-lg text-muted-foreground" style={{ fontFamily: 'var(--font-sans)' }}>
              Impact metrics are not yet validated
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-12">
            {[
              {
                metric: "Concept",
                label: "Recycled Material Direction",
                description: "The concept explores recycled PET-G; final material composition is not yet validated",
                icon: <Recycle size={40} />
              },
              {
                metric: "TBD",
                label: "CO₂ Impact",
                description: "To be measured against a defined production baseline",
                icon: <TrendingDown size={40} />
              },
              {
                metric: "0",
                label: "Production Waste",
                description: "Waste recovery and circularity targets require future validation",
                icon: <Leaf size={40} />
              },
            ].map((impact, index) => (
              <motion.div
                key={impact.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="text-center border border-black/10 p-8 hover:border-accent/50 transition-colors"
              >
                <div className="text-accent mb-6 flex justify-center">
                  {impact.icon}
                </div>
                <div className="text-6xl mb-4 text-accent" style={{ fontFamily: 'var(--font-serif)' }}>
                  {impact.metric}
                </div>
                <h3 className="text-xl mb-4" style={{ fontFamily: 'var(--font-serif)' }}>
                  {impact.label}
                </h3>
                <p className="text-muted-foreground" style={{ fontFamily: 'var(--font-sans)' }}>
                  {impact.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Commitments */}
      <section className="py-24 bg-secondary">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl mb-6" style={{ fontFamily: 'var(--font-serif)' }}>
              Our Commitments
            </h2>
          </motion.div>

          <div className="space-y-8">
            {[
              {
                title: "Carbon Impact Target",
                description: "A future carbon strategy would require measurement, a defined baseline and verified reduction or compensation methods."
              },
              {
                title: "Material Recovery",
                description: "The project explores material recovery as a future direction; actual recycling and reprocessing workflows still need physical validation."
              },
              {
                title: "Responsible Sourcing",
                description: "Supplier criteria and certifications would be defined before any commercial operation."
              },
              {
                title: "Product Longevity",
                description: "Long-term durability and warranty terms would be defined after product and manufacturing validation."
              },
              {
                title: "Take-Back Concept",
                description: "A future take-back flow could connect returned frames to material recovery and the circular wallet concept."
              },
            ].map((commitment, index) => (
              <motion.div
                key={commitment.title}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="border-l-4 border-accent pl-6"
              >
                <h3 className="text-2xl mb-3" style={{ fontFamily: 'var(--font-serif)' }}>
                  {commitment.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed" style={{ fontFamily: 'var(--font-sans)' }}>
                  {commitment.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Globe size={80} className="text-accent mb-6" />
              <h2 className="text-4xl mb-6" style={{ fontFamily: 'var(--font-serif)' }}>
                Luxury Without Compromise
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6" style={{ fontFamily: 'var(--font-sans)' }}>
                For too long, luxury has been synonymous with excess. We believe the future of luxury 
                lies in responsibility, transparency, and innovation.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed" style={{ fontFamily: 'var(--font-sans)' }}>
                Every AGADE frame is proof that sustainable practices and premium quality aren't 
                mutually exclusive—they're inseparable.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="bg-white border border-black/10 p-6">
                <div className="text-4xl mb-2 text-accent" style={{ fontFamily: 'var(--font-serif)' }}>Concept</div>
                <div className="text-sm tracking-widest" style={{ fontFamily: 'var(--font-mono)' }}>
                  MATERIAL INPUT — TO BE VALIDATED
                </div>
              </div>
              <div className="bg-white border border-black/10 p-6">
                <div className="text-4xl mb-2 text-accent" style={{ fontFamily: 'var(--font-serif)' }}>TBD</div>
                <div className="text-sm tracking-widest" style={{ fontFamily: 'var(--font-mono)' }}>
                  EXPECTED LIFESPAN — TO BE VALIDATED
                </div>
              </div>
              <div className="bg-white border border-black/10 p-6">
                <div className="text-4xl mb-2 text-accent" style={{ fontFamily: 'var(--font-serif)' }}>∞</div>
                <div className="text-sm tracking-widest" style={{ fontFamily: 'var(--font-mono)' }}>
                  RECYCLING CYCLES — TO BE VALIDATED
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
