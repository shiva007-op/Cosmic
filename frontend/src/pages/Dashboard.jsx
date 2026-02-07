import { useEffect, useState } from "react";
import { api } from "../services/api";

const ITEMS_PER_PAGE = 6;

export default function Dashboard() {
  const [asteroids, setAsteroids] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    api.get("/neos/today")
      .then(res => {
        setAsteroids(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  // 🔧 FIX: scroll to top on page change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page]);

  if (loading) {
    return (
      <div style={styles.loading}>
        ☄️ Scanning near-Earth space...
      </div>
    );
  }

  const totalPages = Math.ceil(asteroids.length / ITEMS_PER_PAGE);
  const start = (page - 1) * ITEMS_PER_PAGE;
  const currentData = asteroids.slice(start, start + ITEMS_PER_PAGE);

  return (
    <div style={styles.page}>

      {/* ================= HEADER ================= */}
      <header style={styles.header}>
        <div style={styles.container}>
          <h1 style={styles.title}>☄️ Cosmic Watch</h1>
          <p style={styles.subtitle}>Near-Earth Object Threat Monitor</p>

          <div style={styles.legend}>
            <Legend color="#52c41a" label="Low Risk" />
            <Legend color="#faad14" label="Moderate Risk" />
            <Legend color="#ff4d4f" label="High Risk" />
          </div>
        </div>
      </header>

      {/* ================= CONTENT ================= */}
      <main style={styles.container}>

        <div style={styles.grid}>
          {currentData.map((a, index) => (
            <div
              key={a.id}
              style={{
                ...styles.card,
                borderLeft: `5px solid ${riskColor(a.risk.level)}`,
                animationDelay: `${index * 80}ms`
              }}
            >
              <div style={styles.cardHeader}>
                <h3 style={styles.name}>{a.name}</h3>
                <span
                  style={{
                    ...styles.badge,
                    backgroundColor: riskColor(a.risk.level)
                  }}
                >
                  {a.risk.level} Risk
                </span>
              </div>

              <div style={styles.details}>
                <p><b>Diameter:</b> {a.diameter_m} m</p>
                <p><b>Miss Distance:</b> {a.miss_distance_km.toLocaleString()} km</p>
                <p><b>Velocity:</b> {a.velocity_km_s} km/s</p>
                <p><b>Close Approach:</b> {a.close_approach_date}</p>
                <p><b>Risk Score:</b> {a.risk.score}</p>
              </div>
            </div>
          ))}
        </div>

        {/* ================= PAGINATION ================= */}
        <div style={styles.pagination}>
          <button
            style={styles.pageBtn}
            disabled={page === 1}
            onClick={() => setPage(p => p - 1)}
          >
            ◀ Prev
          </button>

          <span style={styles.pageInfo}>
            Page {page} of {totalPages}
          </span>

          <button
            style={styles.pageBtn}
            disabled={page === totalPages}
            onClick={() => setPage(p => p + 1)}
          >
            Next ▶
          </button>
        </div>

      </main>

      {/* ================= FOOTER ================= */}
      <footer style={styles.footer}>
        © 2026 Cosmic Watch • NASA NEO Data • Student Hackathon Project
      </footer>
    </div>
  );
}

/* ================= HELPERS ================= */

function riskColor(level) {
  if (level === "High") return "#ff4d4f";
  if (level === "Moderate") return "#faad14";
  return "#52c41a";
}

function Legend({ color, label }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
      <span style={{
        width: 12,
        height: 12,
        backgroundColor: color,
        borderRadius: "50%"
      }} />
      <span>{label}</span>
    </div>
  );
}

/* ================= STYLES ================= */

const styles = {
  page: {
    minHeight: "100vh",
    background: "radial-gradient(circle at top, #18204a, #0b0f1a)",
    color: "white"
  },

  // 🔧 FIX: proper content width
  container: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "0 24px"
  },

  header: {
    padding: "40px 0 30px",
    borderBottom: "1px solid rgba(255,255,255,0.1)",
    marginBottom: 40
  },

  title: {
    fontSize: "3rem",
    marginBottom: 6,
    textShadow: "0 0 14px rgba(88,101,242,0.6)"
  },

  subtitle: {
    opacity: 0.75,
    marginBottom: 14
  },

  legend: {
    display: "flex",
    gap: 20,
    fontSize: "0.85rem",
    opacity: 0.85
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
    gap: 28
  },

  card: {
    background: "linear-gradient(180deg, #161d3a, #0f1326)",
    padding: 22,
    borderRadius: 16,
    boxShadow: "0 18px 45px rgba(0,0,0,0.55)",
    animation: "fadeUp 0.6s ease forwards",
    opacity: 0
  },

  cardHeader: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: 12
  },

  name: {
    fontSize: "1.2rem"
  },

  badge: {
    padding: "4px 12px",
    borderRadius: 20,
    fontSize: "0.75rem",
    fontWeight: 600
  },

  details: {
    lineHeight: 1.6,
    opacity: 0.9
  },

  pagination: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: 24,
    margin: "60px 0"
  },

  pageBtn: {
    background: "#1b2250",
    color: "white",
    border: "none",
    padding: "10px 20px",
    borderRadius: 10,
    cursor: "pointer"
  },

  pageInfo: {
    opacity: 0.75
  },

  footer: {
    padding: "24px 0",
    textAlign: "center",
    fontSize: "0.85rem",
    opacity: 0.6,
    borderTop: "1px solid rgba(255,255,255,0.1)"
  },

  loading: {
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "1.6rem"
  }
};

/* ================= ANIMATION ================= */
const sheet = document.styleSheets[0];
sheet.insertRule(`
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(24px); }
  to { opacity: 1; transform: translateY(0); }
}
`, sheet.cssRules.length);
