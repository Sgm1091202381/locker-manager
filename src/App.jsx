import { useState } from "react";
import "./App.css";

function App() {
  const [records, setRecords] = useState([
    {
      id: 1,
      type: "VNR",
      equipment: "VNR del kiosk 1",
      problem: "Código CL",
      repaired: false,
    },
    {
      id: 2,
      type: "Lock",
      equipment: "Locker 305",
      problem: "Cerradura atascada",
      repaired: false,
    },
  ]);

  const [type, setType] = useState("Lock");
  const [equipment, setEquipment] = useState("");
  const [problem, setProblem] = useState("");
  const [filter, setFilter] = useState("Todos");

  const pending = records.filter((r) => !r.repaired).length;
  const repaired = records.length - pending;

  const visible = records.filter((r) => {
    if (filter === "Pendientes") return !r.repaired;
    if (filter === "Reparados") return r.repaired;
    return true;
  });

  function addRecord(event) {
    event.preventDefault();

    if (!equipment.trim() || !problem.trim()) return;

    const newRecord = {
      id: Date.now(),
      type,
      equipment: equipment.trim(),
      problem: problem.trim(),
      repaired: false,
    };

    setRecords((previous) => [...previous, newRecord]);
    setEquipment("");
    setProblem("");
    setFilter("Todos");
  }

  function markRepaired(id) {
    setRecords((previous) =>
      previous.map((record) =>
        record.id === id ? { ...record, repaired: true } : record
      )
    );
  }

  return (
    <main className="app">
      <header>
        <h1>🔧 Locker Manager</h1>
        <p>Sistema de gestión de mantenimiento</p>
      </header>

      <section className="dashboard">
        <div className="stat">
          <h2>{records.length}</h2>
          <p>Total de incidencias</p>
        </div>

        <div className="stat">
          <h2 className="red">{pending}</h2>
          <p>Pendientes</p>
        </div>

        <div className="stat">
          <h2 className="green">{repaired}</h2>
          <p>Reparadas</p>
        </div>
      </section>

      <section className="panel">
        <h2>Registrar nueva falla</h2>

        <form onSubmit={addRecord}>
          <label>Tipo de equipo</label>
          <select value={type} onChange={(e) => setType(e.target.value)}>
            <option value="Lock">Lock - Cerradura individual</option>
            <option value="Panel">Panel - Control de lockers</option>
            <option value="VNR">VNR - Validador de billetes</option>
          </select>

          <label>Identificación del equipo</label>
          <input
            value={equipment}
            onChange={(e) => setEquipment(e.target.value)}
            placeholder="Ej. Locker 204"
            required
          />

          <label>Descripción del problema</label>
          <input
            value={problem}
            onChange={(e) => setProblem(e.target.value)}
            placeholder="Ej. Lock no abre"
            required
          />

          <button type="submit">+ Registrar incidencia</button>
        </form>
      </section>

      <section className="panel">
        <h2>Historial de mantenimiento</h2>

        <div className="filters">
          {["Todos", "Pendientes", "Reparados"].map((item) => (
            <button
              key={item}
              className={filter === item ? "selected" : "secondary"}
              onClick={() => setFilter(item)}
            >
              {item}
            </button>
          ))}
        </div>

        {visible.length === 0 && <p>No hay incidencias.</p>}

        {visible.map((record) => (
          <div className="record" key={record.id}>
            <div>
              <span className="tag">{record.type}</span>
              <h3>{record.equipment}</h3>
              <p>{record.problem}</p>
              <small>
                {record.repaired ? "✅ Reparado" : "⚠️ Pendiente"}
              </small>
            </div>

            {!record.repaired && (
              <button onClick={() => markRepaired(record.id)}>
                Marcar reparado
              </button>
            )}
          </div>
        ))}
      </section>
    </main>
  );
}

export default App;