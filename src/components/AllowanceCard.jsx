import { 
  calculateBalance, 
  calculateDailyAllowance, 
  calculateSpentPercentage, 
  calculateCategoryBreakdown 
} from "../utils/calculations";

export default function AllowanceCard({ income, expenses, daysLeft }) {
  const balance = calculateBalance(income, expenses);
  const daily = calculateDailyAllowance(income, expenses, daysLeft);
  const spentPercent = calculateSpentPercentage(income, expenses);
  const categories = calculateCategoryBreakdown(expenses).slice(0, 3);
  const wasRecentUnexpected = expenses.length > 0 && expenses[0].isUnexpected;

  return (
    <div className={`glass-card ${wasRecentUnexpected ? 'animate-pulse' : ''}`} style={{
      borderTop: `4px solid ${wasRecentUnexpected ? "var(--danger)" : "var(--primary)"}`,
      marginBottom: "2rem"
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1rem" }}>
        {wasRecentUnexpected && (
          <div className="badge badge-danger">⚠️ Curveball Detected</div>
        )}
        <div className="badge badge-success" style={{ marginLeft: "auto" }}>
          Budget: ₹{income.toLocaleString('en-IN')}
        </div>
      </div>
      
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "1.5rem" }}>
        <div>
          <p className="label">Daily Allowance</p>
          <div style={{ fontSize: "3.5rem", fontWeight: 900, color: "white", textShadow: "0 0 30px var(--primary-glow)" }}>
            ₹{daily.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
          </div>
        </div>
        <div style={{ textAlign: "right" }}>
          <p className="label">Available</p>
          <div style={{ fontSize: "1.5rem", fontWeight: 700, color: balance < (income * 0.1) ? 'var(--danger)' : 'var(--success)' }}>
            ₹{balance.toLocaleString('en-IN')}
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div style={{ marginBottom: "2rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.75rem", marginBottom: "0.5rem" }}>
          <span className="label">Budget Spent</span>
          <span style={{ fontWeight: 700, color: spentPercent > 80 ? 'var(--danger)' : 'white' }}>{spentPercent.toFixed(1)}%</span>
        </div>
        <div style={{ 
          height: "8px", 
          background: "rgba(255,255,255,0.05)", 
          borderRadius: "10px", 
          overflow: "hidden",
          border: "1px solid rgba(255,255,255,0.05)"
        }}>
          <div style={{ 
            height: "100%", 
            width: `${Math.min(spentPercent, 100)}%`, 
            background: spentPercent > 80 ? 'var(--danger)' : 'linear-gradient(to right, var(--primary), var(--secondary))',
            transition: "width 1s cubic-bezier(0.175, 0.885, 0.32, 1.275)"
          }} />
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
        <div style={{ padding: "1rem", background: "rgba(255,255,255,0.03)", borderRadius: "1rem", border: "1px solid rgba(255,255,255,0.05)" }}>
          <p className="label" style={{ marginBottom: "0.5rem" }}>Days Remaining</p>
          <p style={{ fontWeight: 700, fontSize: "1.1rem" }}>{daysLeft} Days</p>
        </div>
        
        {/* Top Spend Categories */}
        <div style={{ padding: "1rem", background: "rgba(255,255,255,0.03)", borderRadius: "1rem", border: "1px solid rgba(255,255,255,0.05)" }}>
          <p className="label" style={{ marginBottom: "0.5rem" }}>Top Spend</p>
          <div style={{ display: "flex", gap: "5px" }}>
            {categories.length > 0 ? categories.map(c => (
              <span key={c.name} title={`${c.name}: ₹${c.amount}`} style={{ opacity: 0.8 }}>
                {c.name === 'food' ? '🍲' : c.name === 'transport' ? '🚗' : c.name === 'rent' ? '🏠' : c.name === 'entertainment' ? '🎬' : '📦'}
              </span>
            )) : <span style={{ fontSize: "0.75rem", color: "var(--text-dim)" }}>No data</span>}
          </div>
        </div>
      </div>
    </div>
  );
}
