import { useState } from "react";
import { db } from "../services/firebase";
import { collection, addDoc } from "firebase/firestore";

export default function AddExpense({ onCalculate }) {
  const [formData, setFormData] = useState({
    amount: "",
    category: "food",
    date: new Date().toISOString().split("T")[0],
    isUnexpected: false
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.amount) return;

    const expense = {
      ...formData,
      amount: parseFloat(formData.amount),
      createdAt: new Date()
    };

    try {
      await addDoc(collection(db, "expenses"), expense);
      setFormData({
        amount: "",
        category: "food",
        date: new Date().toISOString().split("T")[0],
        isUnexpected: false
      });
      if (onCalculate) onCalculate();
    } catch (err) {
      console.error("Error adding expense: ", err);
    }
  };

  return (
    <div className="glass-card">
      <h2 style={{ fontSize: "1.25rem", fontWeight: 700, marginBottom: "1.5rem", color: "white" }}>Record Expense</h2>
      <form onSubmit={handleSubmit} style={{ display: "grid", gap: "1rem" }}>
        <div>
          <label className="label">Amount Spent</label>
          <div style={{ position: "relative" }}>
            <span style={{ position: "absolute", left: "1rem", top: "50%", transform: "translateY(-50%)", color: "var(--text-dim)" }}>₹</span>
            <input
              className="input-field"
              style={{ paddingLeft: "2.2rem" }}
              type="number"
              placeholder="0.00"
              value={formData.amount}
              onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
              required
            />
          </div>
        </div>
        
        <div>
          <label className="label">Category</label>
          <select
            className="input-field"
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
          >
            <option value="food">🍲 Food & Dining</option>
            <option value="transport">🚗 Transport</option>
            <option value="rent">🏠 Rent/Utilities</option>
            <option value="entertainment">🎬 Entertainment</option>
            <option value="other">📦 Other</option>
          </select>
        </div>

        <div>
          <label className="label">Date</label>
          <input
            className="input-field"
            type="date"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
          />
        </div>

        <label style={{ 
          display: "flex", 
          justifyContent: "space-between", 
          alignItems: "center",
          padding: "1rem",
          background: "rgba(255,255,255,0.03)",
          borderRadius: "0.8rem",
          cursor: "pointer",
          border: `1px solid ${formData.isUnexpected ? 'rgba(239, 68, 68, 0.3)' : 'transparent'}`
        }}>
          <div>
            <div style={{ fontWeight: 600, color: formData.isUnexpected ? 'var(--danger)' : 'white' }}>⚠️ Curveball?</div>
            <div style={{ fontSize: "0.75rem", color: "var(--text-dim)" }}>Is this an unplanned expense?</div>
          </div>
          <input
            type="checkbox"
            checked={formData.isUnexpected}
            onChange={(e) => setFormData({ ...formData, isUnexpected: e.target.checked })}
            style={{ width: "1.25rem", height: "1.25rem", accentColor: "var(--danger)" }}
          />
        </label>

        <button type="submit" className="btn-primary" style={{ marginTop: "0.5rem" }}>
          Add Expense Record
        </button>
      </form>
    </div>
  );
}
