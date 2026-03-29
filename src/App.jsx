import { useState, useEffect } from "react";
import { collection, query, orderBy, onSnapshot, doc, deleteDoc } from "firebase/firestore";
import { db } from "./services/firebase";
import AddExpense from "./components/AddExpense";
import ExpenseList from "./components/ExpenseList";
import AllowanceCard from "./components/AllowanceCard";

function App() {
  const getDaysLeftInMonth = () => {
    const today = new Date();
    const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    return lastDayOfMonth.getDate() - today.getDate();
  };

  const [income, setIncome] = useState(0); 
  const [expenses, setExpenses] = useState([]);
  const [daysLeft, setDaysLeft] = useState(getDaysLeftInMonth());

  useEffect(() => {
    const q = query(collection(db, "expenses"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const expensesData = [];
      querySnapshot.forEach((doc) => {
        expensesData.push({ id: doc.id, ...doc.data() });
      });
      setExpenses(expensesData);
    });

    return () => unsubscribe();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "expenses", id));
    } catch (err) {
      console.error("Error deleting expense:", err);
    }
  };

  return (
    <div className="container">
      <header className="header">
        <h1 className="title">Smart Budget Engine</h1>
        <p className="subtitle">Master your daily allowance with real-time tracking</p>
      </header>
      
      <main className="main-grid">
        <section>
          <AllowanceCard 
            income={income} 
            expenses={expenses} 
            daysLeft={daysLeft} 
          />
          <AddExpense />
        </section>

        <aside>
          <div className="glass-card" style={{ marginBottom: "2rem" }}>
            <h2 style={{ fontSize: "1.25rem", fontWeight: 700, marginBottom: "1.5rem", color: "white" }}>Settings</h2>
            <div style={{ display: "grid", gap: "1.25rem" }}>
              <div>
                <label className="label">Monthly Income</label>
                <div style={{ position: "relative" }}>
                  <span style={{ position: "absolute", left: "1rem", top: "50%", transform: "translateY(-50%)", color: "var(--text-dim)" }}>₹</span>
                  <input 
                    type="number" 
                    className="input-field" 
                    style={{ paddingLeft: "2.2rem" }}
                    value={income || ""}
                    onChange={(e) => setIncome(e.target.value === "" ? 0 : Number(e.target.value))}
                  />
                </div>
              </div>
              <div>
                <label className="label">Days Remaining</label>
                <input 
                  type="number" 
                  className="input-field" 
                  value={daysLeft || ""}
                  onChange={(e) => setDaysLeft(e.target.value === "" ? 0 : Number(e.target.value))}
                />
              </div>
            </div>
          </div>
          <ExpenseList expenses={expenses} onDelete={handleDelete} />
        </aside>
      </main>
    </div>
  );
}

export default App;
