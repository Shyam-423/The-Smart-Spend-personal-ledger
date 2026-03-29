export default function ExpenseList({ expenses, onDelete }) {
  if (expenses.length === 0) {
    return (
      <div className="glass-card" style={{ textAlign: "center", color: "var(--text-dim)" }}>
        <div style={{ fontSize: "3rem", marginBottom: "1rem", opacity: 0.3 }}>🧾</div>
        <p>No transactions found. Ready to track your first expense?</p>
      </div>
    );
  }

  const getCategoryIcon = (cat) => {
    switch(cat) {
      case 'food': return '🍲';
      case 'transport': return '🚗';
      case 'rent': return '🏠';
      case 'entertainment': return '🎬';
      default: return '📦';
    }
  };

  return (
    <div className="glass-card">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
        <h2 style={{ fontSize: "1.25rem", fontWeight: 700, color: "white" }}>Recent Activity</h2>
        <span className="badge badge-success">{expenses.length} Total</span>
      </div>
      <div style={{ display: "grid", gap: "1rem" }}>
        {expenses.map((e, idx) => (
          <div
            key={e.id || idx}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "1rem",
              background: "rgba(255,255,255,0.02)",
              borderRadius: "1rem",
              border: `1px solid ${e.isUnexpected ? 'rgba(239, 68, 68, 0.2)' : 'rgba(255,255,255,0.05)'}`,
              transition: "transform 0.2s ease",
              position: "relative",
              group: "true"
            }}
          >
            <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
              <div style={{ 
                width: "45px", 
                height: "45px", 
                borderRadius: "12px", 
                background: e.isUnexpected ? 'rgba(239, 68, 68, 0.1)' : 'rgba(139, 92, 246, 0.1)',
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1.25rem"
              }}>
                {getCategoryIcon(e.category)}
              </div>
              <div>
                <div style={{ fontWeight: 600, color: e.isUnexpected ? 'var(--danger)' : 'white', textTransform: "capitalize" }}>
                  {e.category} {e.isUnexpected && <span className="badge badge-danger" style={{ fontSize: '0.6rem', marginLeft: '5px' }}>Curveball</span>}
                </div>
                <div style={{ fontSize: "0.75rem", color: "var(--text-dim)" }}>
                  {new Date(e.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                </div>
              </div>
            </div>
            
            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              <div style={{ fontWeight: 800, color: e.isUnexpected ? 'var(--danger)' : 'white', fontSize: "1.1rem" }}>
                -₹{e.amount.toLocaleString('en-IN')}
              </div>
              <button 
                onClick={() => onDelete(e.id)}
                style={{
                  background: "transparent",
                  border: "none",
                  color: "rgba(255,255,255,0.2)",
                  cursor: "pointer",
                  fontSize: "1.2rem",
                  padding: "5px",
                  transition: "color 0.2s ease"
                }}
                onMouseOver={(e) => e.target.style.color = "var(--danger)"}
                onMouseOut={(e) => e.target.style.color = "rgba(255,255,255,0.2)"}
                title="Delete entry"
              >
                🗑️
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
