import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { getGallery, type GalleryItem } from "@/utils/dataService";

interface Props {
  limit?: number;
}

const ProjectsGallery = ({ limit }: Props) => {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [filterType, setFilterType] = useState("All");
  const [filterPlace, setFilterPlace] = useState("All");

  useEffect(() => {
    getGallery().then(setItems).catch(console.error);
  }, []);

  const types = ["All", ...Array.from(new Set(items.map(i => i.projectType)))];
  const places = ["All", ...Array.from(new Set(items.map(i => i.place)))];

  const filtered = items
    .filter(i => filterType === "All" || i.projectType === filterType)
    .filter(i => filterPlace === "All" || i.place === filterPlace);

  const displayed = limit ? filtered.slice(0, limit) : filtered;

  return (
    <section id="projects" className="py-24">
      <div className="container px-4">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
          <span className="text-primary font-body text-sm tracking-widest uppercase">Portfolio</span>
          <h2 className="text-3xl md:text-5xl font-display font-bold mt-3">Our Projects</h2>
        </motion.div>

        <div className="flex flex-wrap gap-3 justify-center mb-10">
          <select value={filterType} onChange={e => setFilterType(e.target.value)} className="bg-input border border-border rounded-lg px-4 py-2 text-foreground font-body text-sm">
            {types.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
          <select value={filterPlace} onChange={e => setFilterPlace(e.target.value)} className="bg-input border border-border rounded-lg px-4 py-2 text-foreground font-body text-sm">
            {places.map(p => <option key={p} value={p}>{p}</option>)}
          </select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayed.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="glass-card rounded-xl overflow-hidden group"
            >
              <div className="relative overflow-hidden aspect-[4/3]">
                <img
                  src={item.imageUrl}
                  alt={item.description}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                  <p className="text-foreground font-body text-sm">{item.description}</p>
                </div>
              </div>
              <div className="p-4">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-body px-2 py-0.5 rounded-full gold-gradient text-primary-foreground">{item.projectType}</span>
                  <span className="text-xs text-muted-foreground font-body">{item.place}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {limit && filtered.length > limit && (
          <div className="text-center mt-10">
            <a href="/projects" className="gold-gradient px-6 py-3 rounded-lg font-body font-semibold text-primary-foreground hover:opacity-90 transition-opacity inline-block">
              View All Projects
            </a>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProjectsGallery;
