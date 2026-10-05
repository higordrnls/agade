import { motion } from "motion/react";
import { Leaf, Recycle, Package, TrendingDown, Heart, Globe } from "lucide-react";

export default function Sustainability() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1756362399416-503694e40cf5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdXN0YWluYWJsZSUyMHJlY3ljbGluZyUyMGJvdHRsZXN8ZW58MXx8fHwxNzcyNTQzMjc1fDA&ixlib=rb-4.1.0&q=80&w=1080"
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
            FROM BOTTLE TO BEAUTY
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
              Circular Economy in Action
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed" style={{ fontFamily: 'var(--font-sans)' }}>
              Every AGADE frame tells a story of transformation. What was once a discarded PET bottle 
              becomes a statement of luxury and responsibility. This is our commitment to the planet, 
              to our craft, and to future generations.
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
                description: "Post-consumer PET bottles sourced from certified recycling programs"
              },
              {
                icon: <Recycle size={32} />,
                title: "Processing",
                description: "Bottles cleaned, sorted, and broken down into polymer granules"
              },
              {
                icon: <Leaf size={32} />,
                title: "Conversion",
                description: "PET transformed into high-grade PETg filament for 3D printing"
              },
              {
                icon: <TrendingDown size={32} />,
                title: "Production",
                description: "Precision 3D printing with minimal waste and zero harmful emissions"
              },
              {
                icon: <Heart size={32} />,
                title: "Creation",
                description: "Premium eyewear frames ready to enhance your vision and style"
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
              Our Environmental Impact
            </h2>
            <p className="text-lg text-muted-foreground" style={{ fontFamily: 'var(--font-sans)' }}>
              Measurable results from our commitment to sustainability
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-12">
            {[
              {
                metric: "100%",
                label: "Recycled Materials",
                description: "Every frame is made entirely from post-consumer recycled PET bottles",
                icon: <Recycle size={40} />
              },
              {
                metric: "85%",
                label: "Less CO₂",
                description: "Compared to traditional acetate frame production methods",
                icon: <TrendingDown size={40} />
              },
              {
                metric: "0",
                label: "Waste to Landfill",
                description: "Our closed-loop system ensures zero production waste",
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
                title: "Carbon Neutral by 2028",
                description: "We're on track to achieve complete carbon neutrality across our entire supply chain within two years, offsetting all emissions through verified renewable energy projects."
              },
              {
                title: "Closed-Loop Manufacturing",
                description: "Every scrap of material from our production process is recaptured and reused. Nothing goes to waste. Every defective frame is remelted and reprinted."
              },
              {
                title: "Ethical Sourcing",
                description: "We work exclusively with certified recycling facilities that uphold the highest labor and environmental standards, ensuring our materials are sourced responsibly."
              },
              {
                title: "Lifetime Warranty",
                description: "Our frames are built to last. We offer a lifetime warranty on all structural components, reducing the need for replacement and encouraging long-term use."
              },
              {
                title: "Take-Back Program",
                description: "When your AGADE frames reach the end of their life, return them to us. We'll recycle them into new frames, completing the circle."
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
                <div className="text-4xl mb-2 text-accent" style={{ fontFamily: 'var(--font-serif)' }}>15</div>
                <div className="text-sm tracking-widest" style={{ fontFamily: 'var(--font-mono)' }}>
                  PET BOTTLES PER FRAME
                </div>
              </div>
              <div className="bg-white border border-black/10 p-6">
                <div className="text-4xl mb-2 text-accent" style={{ fontFamily: 'var(--font-serif)' }}>50+</div>
                <div className="text-sm tracking-widest" style={{ fontFamily: 'var(--font-mono)' }}>
                  YEARS EXPECTED LIFESPAN
                </div>
              </div>
              <div className="bg-white border border-black/10 p-6">
                <div className="text-4xl mb-2 text-accent" style={{ fontFamily: 'var(--font-serif)' }}>∞</div>
                <div className="text-sm tracking-widest" style={{ fontFamily: 'var(--font-mono)' }}>
                  RECYCLING CYCLES POSSIBLE
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
