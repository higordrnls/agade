import { motion } from "motion/react";
import { Cpu, Layers, Zap, Eye, Microscope, Settings } from "lucide-react";

export default function Technology() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/imagens/catalog/drop-01/04-pulso.png"
            alt="3D Printing Technology"
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
            Technology
          </h1>
          <p className="text-sm tracking-widest text-white/80" style={{ fontFamily: 'var(--font-mono)' }}>
            DIGITAL FABRICATION AS DESIGN LANGUAGE
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
              The Technology Behind the Concept
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed" style={{ fontFamily: 'var(--font-sans)' }}>
              This prototype explores 3D printing as a design and manufacturing language for eyewear. The technical details shown here are conceptual and serve as a direction for future validation.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 3D Printing Process */}
      <section className="py-24 bg-black text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-sm tracking-widest text-accent mb-4 block" style={{ fontFamily: 'var(--font-mono)' }}>
                ADDITIVE MANUFACTURING
              </span>
              <h2 className="text-5xl mb-6" style={{ fontFamily: 'var(--font-serif)' }}>
                3D Printing Precision
              </h2>
              <p className="text-lg text-white/80 mb-6 leading-relaxed" style={{ fontFamily: 'var(--font-sans)' }}>
                We utilize state-of-the-art 3D printing technology to construct each frame layer by layer. 
                This additive manufacturing process allows for:
              </p>
              <ul className="space-y-4 mb-8">
                {[
                  "Controlled geometry through digital modeling",
                  "Exploration of lightweight structural forms",
                  "Digital variation without traditional tooling",
                  "Potential for more material-efficient prototyping",
                ].map((item, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <span className="text-accent mt-1">→</span>
                    <span className="text-white/90">{item}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <img
                src="/imagens/catalog/drop-01/08-essencia.png"
                alt="Precision Engineering"
                className="w-full h-[500px] object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Technical Features */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl mb-6" style={{ fontFamily: 'var(--font-serif)' }}>
              Advanced Features
            </h2>
            <p className="text-sm tracking-widest text-muted-foreground" style={{ fontFamily: 'var(--font-mono)' }}>
              INNOVATION IN EVERY DETAIL
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Eye size={32} />,
                title: "Optical Precision",
                specs: [
                  "Conceptual lens alignment target",
                  "Future fit validation",
                  "Fit geometry to be validated",
                  "Prescription parameters to be validated"
                ]
              },
              {
                icon: <Layers size={32} />,
                title: "Material Science",
                specs: [
                  "Recycled PETg polymer",
                  "UV-resistant coating",
                  "Hypoallergenic properties",
                  "Temperature stable -20°C to 60°C"
                ]
              },
              {
                icon: <Cpu size={32} />,
                title: "Digital Design",
                specs: [
                  "CAD-optimized geometry",
                  "FEA stress analysis",
                  "Parametric customization",
                  "Digital twin simulation"
                ]
              },
              {
                icon: <Zap size={32} />,
                title: "Manufacturing",
                specs: [
                  "Example layer height: 0.05mm",
                  "Conceptual post-processing workflow",
                  "Quality control: to be validated",
                  "Production timeline: to be determined"
                ]
              },
              {
                icon: <Microscope size={32} />,
                title: "Research-Backed",
                specs: [
                  "Conceptual research direction",
                  "User testing planned for future validation",
                  "Peer-reviewed methods",
                  "Continuous improvement"
                ]
              },
              {
                icon: <Settings size={32} />,
                title: "Customization",
                specs: [
                  "Parametric variations",
                  "Defined colorway system",
                  "Fit logic planned for future validation",
                  "Digital try-on ready"
                ]
              },
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="border border-black/10 p-8 hover:border-accent/50 transition-colors"
              >
                <div className="text-accent mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-2xl mb-6" style={{ fontFamily: 'var(--font-serif)' }}>
                  {feature.title}
                </h3>
                <ul className="space-y-3">
                  {feature.specs.map((spec, specIndex) => (
                    <li key={specIndex} className="text-sm text-muted-foreground flex items-start gap-2" style={{ fontFamily: 'var(--font-mono)' }}>
                      <span className="text-accent text-xs">▪</span>
                      {spec}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Timeline */}
      <section className="py-24 bg-secondary">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl mb-6" style={{ fontFamily: 'var(--font-serif)' }}>
              From Concept to Creation
            </h2>
            <p className="text-lg text-muted-foreground" style={{ fontFamily: 'var(--font-sans)' }}>
              Each AGADE frame undergoes a meticulous 8-stage process
            </p>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: "01", title: "Digital Scan", description: "Facial measurements" },
              { step: "02", title: "Design Optimization", description: "Parametric design exploration" },
              { step: "03", title: "3D Printing", description: "Layer-by-layer construction" },
              { step: "04", title: "Post-Processing", description: "Finishing and quality" },
              { step: "05", title: "Optical Testing", description: "Optical validation" },
              { step: "06", title: "Surface Treatment", description: "Surface treatment" },
              { step: "07", title: "Assembly", description: "Lens integration" },
              { step: "08", title: "Final Inspection", description: "Final quality review" },
            ].map((stage, index) => (
              <motion.div
                key={stage.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="text-center"
              >
                <div className="text-4xl mb-4 text-accent" style={{ fontFamily: 'var(--font-mono)' }}>
                  {stage.step}
                </div>
                <h3 className="text-xl mb-2" style={{ fontFamily: 'var(--font-serif)' }}>
                  {stage.title}
                </h3>
                <p className="text-sm text-muted-foreground" style={{ fontFamily: 'var(--font-sans)' }}>
                  {stage.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Closing Statement */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl mb-8" style={{ fontFamily: 'var(--font-serif)' }}>
              Engineering Excellence
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed" style={{ fontFamily: 'var(--font-sans)' }}>
              At AGADE, technology isn't just a tool—it's the language through which we express our 
              commitment to precision, sustainability, and innovation. Every technical decision we make 
              serves a dual purpose: advancing optical science and creating timeless, wearable art.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
