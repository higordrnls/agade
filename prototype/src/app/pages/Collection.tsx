import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { dropOneProducts } from "../data/catalog";

export default function Collection() {
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
            <p className="text-sm tracking-widest text-accent mb-4" style={{ fontFamily: 'var(--font-mono)' }}>
              DROP 01 · 12 MODELS · 48 SKUS
            </p>
            <h2 className="text-5xl mb-8" style={{ fontFamily: 'var(--font-serif)' }}>
              Twelve Forms, One Material Language
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed" style={{ fontFamily: 'var(--font-sans)' }}>
              The first official AGADE drop brings together twelve authorial models,
              each developed around architecture, digital fabrication and a distinct
              point of view.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Catalog Grid */}
      <section className="py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
            {dropOneProducts.map((product, index) => (
              <motion.article
                key={product.ref}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: (index % 3) * 0.08 }}
                className="border border-black/10 bg-secondary/30"
              >
                <div className="aspect-[4/3] bg-white flex items-center justify-center overflow-hidden">
                  <img
                    src={product.image}
                    alt={`Render conceitual do modelo ${product.name}, REF ${product.ref}`}
                    className="h-full w-full object-cover scale-[1.08]"
                  />
                </div>

                <div className="p-7">
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div>
                      <span
                        className="text-xs tracking-widest text-muted-foreground"
                        style={{ fontFamily: 'var(--font-mono)' }}
                      >
                        DROP 01 · {product.ref}
                      </span>
                      <h3 className="text-3xl mt-2" style={{ fontFamily: 'var(--font-serif)' }}>
                        {product.name}
                      </h3>
                    </div>
                  </div>

                  <p className="text-base leading-relaxed mb-3" style={{ fontFamily: 'var(--font-sans)' }}>
                    {product.description}
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-6" style={{ fontFamily: 'var(--font-sans)' }}>
                    {product.concept}
                  </p>

                  <div className="border-t border-black/10 pt-5">
                    <p
                      className="text-xs tracking-widest text-muted-foreground mb-3"
                      style={{ fontFamily: 'var(--font-mono)' }}
                    >
                      COLORWAYS
                    </p>
                    <div className="space-y-2">
                      {product.colors.map((color) => (
                        <div key={color.name} className="text-sm" style={{ fontFamily: 'var(--font-sans)' }}>
                          <span className="font-medium">{color.name}</span>
                          <span className="text-muted-foreground"> — {color.description}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <button className="mt-7 inline-flex items-center gap-2 text-sm hover:text-accent transition-colors">
                    <span style={{ fontFamily: 'var(--font-mono)' }}>View Model</span>
                    <ArrowRight size={18} />
                  </button>
                </div>
              </motion.article>
            ))}
          </div>
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
              Each model is a starting point for a future customization flow.
              The MVP will focus on color and lens type before the virtual try-on experience.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                title: "Model Selection",
                description: "Choose the frame that matches your visual language"
              },
              {
                title: "Color Selection",
                description: "Select one of the four defined color variations"
              },
              {
                title: "Lens Type",
                description: "Prescription, sun or blue-light/rest lenses"
              },
              {
                title: "Virtual Try-On",
                description: "Preview the selected configuration before purchase"
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

      {/* CTA */}
      <section className="py-24 px-6 bg-secondary">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl mb-6" style={{ fontFamily: 'var(--font-serif)' }}>
              Explore the Drop
            </h2>
            <p className="text-xl text-muted-foreground mb-8" style={{ fontFamily: 'var(--font-sans)' }}>
              Twelve models. Four color variations each. Built around a single material language.
            </p>
            <button className="inline-flex items-center gap-2 px-10 py-5 bg-black text-white hover:bg-accent transition-all duration-300 text-lg">
              <span style={{ fontFamily: 'var(--font-mono)' }}>Explore Drop 01</span>
              <ArrowRight size={24} />
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}