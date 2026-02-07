import { useEffect, useState } from "react";
import { api } from "../services/api";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import AsteroidCard from "../components/AsteroidCard";
import StatCard from "../components/ui/StatCard";
import RiskDistribution from "../components/ui/RiskDistribution";
import Pagination from "../components/ui/Pagination";
import { Globe, AlertTriangle, Zap, Shield, TrendingUp } from "lucide-react";

const ITEMS_PER_PAGE = 6;

export default function Dashboard() {
  const [asteroids, setAsteroids] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    total: 0,
    highRisk: 0,
    moderateRisk: 0,
    lowRisk: 0,
    avgVelocity: 0,
    closestApproach: null
  });

  useEffect(() => {
    api
      .get("/neos/today")
      .then(res => {
        setAsteroids(res.data);
        calculateStats(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const calculateStats = (data) => {
    const total = data.length;
    const highRisk = data.filter(a => a.risk.level === "High").length;
    const moderateRisk = data.filter(a => a.risk.level === "Moderate").length;
    const lowRisk = data.filter(a => a.risk.level === "Low").length;
    const avgVelocity = data.reduce((sum, a) => sum + parseFloat(a.velocity_km_s), 0) / total;
    const closestApproach = data.reduce((closest, a) => 
      !closest || parseFloat(a.miss_distance_km) < parseFloat(closest.miss_distance_km) ? a : closest, null
    );
    
    setStats({ total, highRisk, moderateRisk, lowRisk, avgVelocity, closestApproach });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl tracking-wide">
        ☄️ Scanning near-Earth space...
      </div>
    );
  }

  const totalPages = Math.ceil(asteroids.length / ITEMS_PER_PAGE);
  const start = (page - 1) * ITEMS_PER_PAGE;
  const current = asteroids.slice(start, start + ITEMS_PER_PAGE);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <Header />

      {/* Body */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <main className="flex-1 p-8">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard
              title="Total Objects"
              value={stats.total}
              icon={Globe}
              gradient="from-blue-500/20 to-blue-600/10"
              borderColor="border-blue-400/30"
            />

            <StatCard
              title="High Risk"
              value={stats.highRisk}
              icon={AlertTriangle}
              gradient="from-red-500/20 to-red-600/10"
              borderColor="border-red-400/30"
            />

            <StatCard
              title="Avg Velocity"
              value={stats.avgVelocity.toFixed(1)}
              subtitle="km/s"
              icon={Zap}
              gradient="from-green-500/20 to-green-600/10"
              borderColor="border-green-400/30"
            />

            <StatCard
              title="Closest Approach"
              value={stats.closestApproach ? stats.closestApproach.miss_distance_km.toLocaleString() : 'N/A'}
              subtitle="km"
              icon={Shield}
              gradient="from-purple-500/20 to-purple-600/10"
              borderColor="border-purple-400/30"
            />
          </div>

          {/* Risk Distribution */}
          <RiskDistribution 
            highRisk={stats.highRisk}
            moderateRisk={stats.moderateRisk}
            lowRisk={stats.lowRisk}
          />

          {/* Asteroids Grid */}
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <TrendingUp className="w-6 h-6" />
            Near-Earth Objects Today
          </h2>
          <div className="grid grid-cols-[repeat(auto-fill,minmax(350px,1fr))] gap-6">
            {current.map((asteroid, index) => (
              <AsteroidCard
                key={asteroid.id}
                asteroid={asteroid}
                delay={index * 100}
              />
            ))}
          </div>

          {/* Pagination */}
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        </main>
      </div>
    </div>
  );
}
