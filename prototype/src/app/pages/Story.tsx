import { motion } from "motion/react";

export default function Story() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/imagens/catalog/drop-01/11-aura.png"
            alt="AGADE Story"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 text-center px-6"
        >
          <h1 className="text-6xl md:text-7xl text-white mb-4" style={{ fontFamily: 'var(--font-serif)' }}>
            Our Story
          </h1>
          <p className="text-sm tracking-widest text-white/80" style={{ fontFamily: 'var(--font-mono)' }}>
            A JOURNEY OF VISION AND PURPOSE
          </p>
        </motion.div>
      </section>

      {/* Timeline Section */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h2 className="text-5xl mb-6" style={{ fontFamily: 'var(--font-serif)' }}>
              A Concept in Development
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed" style={{ fontFamily: 'var(--font-sans)' }}>
              AGADE is a portfolio concept exploring how Brazilian design, digital fabrication and circular materials could come together in a contemporary eyewear experience.
            </p>
          </motion.div>

          <div className="space-y-16">
            {[
              {
                year: "CONCEPT",
                title: "The Beginning",
                description: "The concept began with a question: how can eyewear combine expressive form, digital fabrication and a more circular material narrative?"
              },
              {
                year: "MATERIAL",
                title: "Material Innovation",
                description: "Recycled PET-G became part of the material direction explored by the project, connecting additive manufacturing with a circular design narrative."
              },
              {
                year: "FABRICATION",
                title: "3D Printing Mastery",
                description: "3D printing became the central fabrication language explored in the prototype, enabling complex forms and a more direct relationship between digital design and physical production."
              },
              {
                year: "DROP 01",
                title: "Brand Launch",
                description: "The first conceptual catalog was organized as Drop 01, with twelve models developed as a visual and product-system exercise."
              },
              {
                year: "NEXT",
                title: "Global Recognition",
                description: "The next phase is to test the experience, refine the system and gradually translate the concept into a stronger technical implementation."
              },
            ].map((milestone, index) => (
              <motion.div
                key={milestone.year}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative pl-12 border-l-2 border-accent/30"
              >
                <div className="absolute -left-[13px] top-0 w-6 h-6 rounded-full bg-accent border-4 border-white" />
                <div className="text-sm tracking-widest text-accent mb-2" style={{ fontFamily: 'var(--font-mono)' }}>
                  {milestone.year}
                </div>
                <h3 className="text-3xl mb-4" style={{ fontFamily: 'var(--font-serif)' }}>
                  {milestone.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed" style={{ fontFamily: 'var(--font-sans)' }}>
                  {milestone.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-black text-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl md:text-6xl mb-6" style={{ fontFamily: 'var(--font-serif)' }}>
              What Drives Us
            </h2>
            <p className="text-lg text-white/70 max-w-3xl mx-auto" style={{ fontFamily: 'var(--font-sans)' }}>
              Our core values aren't just words on a page—they're the foundation of every decision we make, 
              every frame we craft, and every relationship we build.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-12">
            {[
              {
                title: "Innovation",
                description: "We push boundaries. We use design, prototyping and digital fabrication as tools for exploring new forms of eyewear."
              },
              {
                title: "Sustainability",
                description: "The project explores how circular materials and digital fabrication can participate in a more responsible vision of luxury."
              },
              {
                title: "Identity",
                description: "We tell stories. Each piece reflects Brazilian creativity and craftsmanship, blending minimalist aesthetics with rich cultural heritage."
              },
            ].map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="text-center"
              >
                <h3 className="text-3xl mb-4 text-accent" style={{ fontFamily: 'var(--font-serif)' }}>
                  {value.title}
                </h3>
                <p className="text-white/80 leading-relaxed" style={{ fontFamily: 'var(--font-sans)' }}>
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl mb-8" style={{ fontFamily: 'var(--font-serif)' }}>
              High-Tech Engineering,<br />Humanistic Luxury
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed mb-8" style={{ fontFamily: 'var(--font-sans)' }}>
              We exist at the intersection of precision and poetry. Our frames are engineered with 
              scientific rigor, yet they speak to something deeper—the human desire for beauty, 
              individuality, and connection.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed" style={{ fontFamily: 'var(--font-sans)' }}>
              Inspired by brands like Misci and Gentle Monster, we've created our own language—one 
              that honors Brazilian heritage while embracing global innovation. This is AGADE.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
