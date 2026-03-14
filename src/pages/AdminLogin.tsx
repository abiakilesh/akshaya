import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { adminLogin } from "@/utils/dataService";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const success = await adminLogin(email, password);
    setLoading(false);
    if (success) {
      navigate("/admin/leads");
    } else {
      setError("Invalid credentials.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="glass-card rounded-2xl p-8 w-full max-w-md border border-primary/30">
        <h1 className="text-3xl font-display font-bold gold-text-gradient mb-2 text-center">Admin Panel</h1>
        <p className="text-muted-foreground font-body text-sm text-center mb-8">Akshaya Construction</p>

        {error && <p className="text-destructive font-body text-sm mb-4 text-center">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="email" required placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} className="w-full bg-input border border-border rounded-lg px-4 py-3 text-foreground font-body placeholder:text-muted-foreground focus:outline-none focus:border-primary" />
          <input type="password" required placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} className="w-full bg-input border border-border rounded-lg px-4 py-3 text-foreground font-body placeholder:text-muted-foreground focus:outline-none focus:border-primary" />
          <button type="submit" disabled={loading} className="w-full gold-gradient py-3 rounded-lg font-body font-semibold text-primary-foreground hover:opacity-90 transition-opacity disabled:opacity-50">
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
