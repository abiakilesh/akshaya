import { useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { getGallery, addGalleryItem, deleteGalleryItem, updateGalleryItem, uploadGalleryImage, isAdminLoggedIn, adminLogout, type GalleryItem } from "@/utils/dataService";
import { Trash2, LogOut, Upload, Edit2, X, Check, Loader2 } from "lucide-react";

const AdminGallery = () => {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [form, setForm] = useState({ projectType: "Construction", place: "", description: "" });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState("");
  const [uploading, setUploading] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [editData, setEditData] = useState({ projectType: "", place: "", description: "" });
  const [dragOver, setDragOver] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const init = async () => {
      if (!(await isAdminLoggedIn())) { navigate("/admin"); return; }
      setItems(await getGallery());
    };
    init();
  }, [navigate]);

  const handleFileChange = (file: File) => {
    setSelectedFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) handleFileChange(file);
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile) return;
    setUploading(true);
    try {
      const imageUrl = await uploadGalleryImage(selectedFile);
      await addGalleryItem({ imageUrl, ...form });
      setItems(await getGallery());
      setForm({ projectType: "Construction", place: "", description: "" });
      setSelectedFile(null);
      setPreview("");
    } catch (err) {
      console.error("Upload failed:", err);
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (item: GalleryItem) => {
    await deleteGalleryItem(item.id, item.imageUrl);
    setItems(await getGallery());
  };

  const handleUpdate = async (id: string) => {
    await updateGalleryItem(id, editData);
    setItems(await getGallery());
    setEditId(null);
  };

  const startEdit = (item: GalleryItem) => {
    setEditId(item.id);
    setEditData({ projectType: item.projectType, place: item.place, description: item.description });
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="container px-4 flex items-center justify-between h-16">
          <h1 className="font-display text-lg font-bold gold-text-gradient">Admin Panel</h1>
          <div className="flex items-center gap-3">
            <Link to="/admin/leads" className="font-body text-sm text-muted-foreground hover:text-primary transition-colors">Leads</Link>
            <Link to="/admin/gallery" className="font-body text-sm text-primary">Gallery</Link>
            <button onClick={async () => { await adminLogout(); navigate("/admin"); }} className="text-muted-foreground hover:text-destructive transition-colors">
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      <div className="container px-4 py-8">
        <h2 className="text-2xl font-display font-bold text-foreground mb-6">Gallery Management</h2>

        <form onSubmit={handleAdd} className="glass-card rounded-xl p-6 mb-8 border border-primary/20">
          <div
            onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
            onDrop={handleDrop}
            onClick={() => fileRef.current?.click()}
            className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors mb-4 ${dragOver ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"}`}
          >
            {preview ? (
              <img src={preview} alt="Preview" className="max-h-48 mx-auto rounded-lg" />
            ) : (
              <div>
                <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                <p className="text-muted-foreground font-body text-sm">Drag & drop image or click to browse</p>
              </div>
            )}
            <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={e => e.target.files?.[0] && handleFileChange(e.target.files[0])} />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
            <select value={form.projectType} onChange={e => setForm({ ...form, projectType: e.target.value })} className="bg-input border border-border rounded-lg px-4 py-2.5 text-foreground font-body text-sm focus:outline-none focus:border-primary">
              <option>Construction</option>
              <option>Interior Design</option>
              <option>2D/3D Planning</option>
              <option>Real Estate</option>
              <option>Vastu Design</option>
            </select>
            <input placeholder="Place" value={form.place} onChange={e => setForm({ ...form, place: e.target.value })} className="bg-input border border-border rounded-lg px-4 py-2.5 text-foreground font-body text-sm placeholder:text-muted-foreground focus:outline-none focus:border-primary" />
            <input placeholder="Description" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} className="bg-input border border-border rounded-lg px-4 py-2.5 text-foreground font-body text-sm placeholder:text-muted-foreground focus:outline-none focus:border-primary" />
          </div>
          <button type="submit" disabled={uploading || !selectedFile} className="gold-gradient px-6 py-2.5 rounded-lg font-body text-sm font-semibold text-primary-foreground hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center gap-2">
            {uploading ? <><Loader2 className="w-4 h-4 animate-spin" /> Uploading...</> : "Add to Gallery"}
          </button>
        </form>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map(item => (
            <div key={item.id} className="glass-card rounded-xl overflow-hidden">
              <img src={item.imageUrl} alt={item.description} className="w-full aspect-[4/3] object-cover" />
              <div className="p-4">
                {editId === item.id ? (
                  <div className="space-y-2">
                    <select value={editData.projectType} onChange={e => setEditData({ ...editData, projectType: e.target.value })} className="w-full bg-input border border-border rounded px-3 py-1.5 text-foreground font-body text-xs">
                      <option>Construction</option><option>Interior Design</option><option>2D/3D Planning</option><option>Real Estate</option><option>Vastu Design</option>
                    </select>
                    <input value={editData.place} onChange={e => setEditData({ ...editData, place: e.target.value })} className="w-full bg-input border border-border rounded px-3 py-1.5 text-foreground font-body text-xs" />
                    <input value={editData.description} onChange={e => setEditData({ ...editData, description: e.target.value })} className="w-full bg-input border border-border rounded px-3 py-1.5 text-foreground font-body text-xs" />
                    <div className="flex gap-2">
                      <button onClick={() => handleUpdate(item.id)} className="text-primary"><Check className="w-4 h-4" /></button>
                      <button onClick={() => setEditId(null)} className="text-muted-foreground"><X className="w-4 h-4" /></button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs px-2 py-0.5 rounded-full gold-gradient text-primary-foreground">{item.projectType}</span>
                      <span className="text-xs text-muted-foreground font-body">{item.place}</span>
                    </div>
                    <p className="text-muted-foreground text-xs font-body mb-2">{item.description}</p>
                    <div className="flex gap-2">
                      <button onClick={() => startEdit(item)} className="text-muted-foreground hover:text-primary transition-colors"><Edit2 className="w-4 h-4" /></button>
                      <button onClick={() => handleDelete(item)} className="text-muted-foreground hover:text-destructive transition-colors"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminGallery;
