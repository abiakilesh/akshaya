import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { getLeads, deleteLead, isAdminLoggedIn, adminLogout, type Lead } from "@/utils/dataService";
import { Trash2, Download, LogOut, Search } from "lucide-react";

const AdminLeads = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const init = async () => {
      if (!(await isAdminLoggedIn())) { navigate("/admin"); return; }
      setLeads(await getLeads());
    };
    init();
  }, [navigate]);

  const handleDelete = async (id: string) => {
    await deleteLead(id);
    setLeads(await getLeads());
  };

  const exportCSV = () => {
    const headers = "Name,Phone,Email,Project Type,Place,Message,Date\n";
    const rows = leads.map(l => `"${l.name}","${l.phone}","${l.email}","${l.projectType}","${l.place}","${l.message}","${new Date(l.createdAt).toLocaleDateString()}"`).join("\n");
    const blob = new Blob([headers + rows], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = "leads.csv"; a.click();
    URL.revokeObjectURL(url);
  };

  const filtered = leads.filter(l =>
    [l.name, l.phone, l.email, l.projectType, l.place].some(v => v.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="container px-4 flex items-center justify-between h-16">
          <h1 className="font-display text-lg font-bold gold-text-gradient">Admin Panel</h1>
          <div className="flex items-center gap-3">
            <Link to="/admin/leads" className="font-body text-sm text-primary">Leads</Link>
            <Link to="/admin/gallery" className="font-body text-sm text-muted-foreground hover:text-primary transition-colors">Gallery</Link>
            <button onClick={async () => { await adminLogout(); navigate("/admin"); }} className="text-muted-foreground hover:text-destructive transition-colors">
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      <div className="container px-4 py-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <h2 className="text-2xl font-display font-bold text-foreground">Leads ({filtered.length})</h2>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="relative flex-1 sm:flex-initial">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input placeholder="Search leads..." value={search} onChange={e => setSearch(e.target.value)} className="w-full sm:w-60 bg-input border border-border rounded-lg pl-10 pr-4 py-2 text-foreground font-body text-sm placeholder:text-muted-foreground focus:outline-none focus:border-primary" />
            </div>
            <button onClick={exportCSV} className="gold-gradient px-4 py-2 rounded-lg font-body text-sm font-semibold text-primary-foreground hover:opacity-90 transition-opacity flex items-center gap-2 whitespace-nowrap">
              <Download className="w-4 h-4" /> CSV
            </button>
          </div>
        </div>

        {filtered.length === 0 ? (
          <p className="text-muted-foreground font-body text-center py-12">No leads yet. They will appear here when submitted via the website.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm font-body">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-3 text-muted-foreground font-medium">Name</th>
                  <th className="text-left py-3 px-3 text-muted-foreground font-medium hidden sm:table-cell">Phone</th>
                  <th className="text-left py-3 px-3 text-muted-foreground font-medium hidden md:table-cell">Email</th>
                  <th className="text-left py-3 px-3 text-muted-foreground font-medium hidden lg:table-cell">Type</th>
                  <th className="text-left py-3 px-3 text-muted-foreground font-medium hidden lg:table-cell">Place</th>
                  <th className="text-left py-3 px-3 text-muted-foreground font-medium hidden xl:table-cell">Message</th>
                  <th className="text-left py-3 px-3 text-muted-foreground font-medium">Date</th>
                  <th className="py-3 px-3"></th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(l => (
                  <tr key={l.id} className="border-b border-border/50 hover:bg-secondary/30 transition-colors">
                    <td className="py-3 px-3 text-foreground">{l.name}</td>
                    <td className="py-3 px-3 text-foreground hidden sm:table-cell">{l.phone}</td>
                    <td className="py-3 px-3 text-foreground hidden md:table-cell">{l.email}</td>
                    <td className="py-3 px-3 hidden lg:table-cell"><span className="text-xs px-2 py-0.5 rounded-full gold-gradient text-primary-foreground">{l.projectType}</span></td>
                    <td className="py-3 px-3 text-foreground hidden lg:table-cell">{l.place}</td>
                    <td className="py-3 px-3 text-muted-foreground hidden xl:table-cell max-w-[200px] truncate">{l.message}</td>
                    <td className="py-3 px-3 text-muted-foreground">{new Date(l.createdAt).toLocaleDateString()}</td>
                    <td className="py-3 px-3">
                      <button onClick={() => handleDelete(l.id)} className="text-muted-foreground hover:text-destructive transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminLeads;
