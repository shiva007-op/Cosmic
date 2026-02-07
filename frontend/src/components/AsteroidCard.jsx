function riskClass(level) {
  if (level === "High") return "border-red-500 bg-red-500/10 text-red-400";
  if (level === "Moderate") return "border-yellow-400 bg-yellow-400/10 text-yellow-300";
  return "border-green-400 bg-green-400/10 text-green-300";
}

export default function AsteroidCard({ asteroid, delay }) {
  const risk = asteroid.risk.level;

  return (
    <div
      className={`group relative overflow-hidden rounded-2xl p-6 
      bg-gradient-to-br from-slate-800/50 to-slate-900/50 
      backdrop-blur-xl border border-white/10
      shadow-2xl hover:shadow-3xl 
      transform hover:-translate-y-2 
      transition-all duration-500 ease-out
      animate-fadeUp`}
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* Glow effect */}
      <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500
        ${risk === "High" ? "bg-gradient-to-r from-red-500/20 to-orange-500/20" : 
          risk === "Moderate" ? "bg-gradient-to-r from-yellow-500/20 to-amber-500/20" : 
          "bg-gradient-to-r from-green-500/20 to-emerald-500/20"}`} />
      
      {/* Content */}
      <div className="relative z-10">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="font-bold text-xl text-white mb-1 group-hover:text-blue-300 transition-colors">
              {asteroid.name}
            </h3>
            <p className="text-xs text-gray-400 uppercase tracking-wider">Near-Earth Object</p>
          </div>
          <span className={`px-3 py-1.5 text-xs font-bold rounded-full ${riskClass(risk)} 
            shadow-lg transform group-hover:scale-110 transition-transform duration-300`}>
            {risk} RISK
          </span>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
            <span className="text-gray-400 text-sm flex items-center gap-2">
              <span className="text-lg">📏</span> Diameter
            </span>
            <span className="text-white font-semibold">{asteroid.diameter_m} m</span>
          </div>

          <div className="flex items-center justify-between p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
            <span className="text-gray-400 text-sm flex items-center gap-2">
              <span className="text-lg">🚀</span> Velocity
            </span>
            <span className="text-white font-semibold">{asteroid.velocity_km_s} km/s</span>
          </div>

          <div className="flex items-center justify-between p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
            <span className="text-gray-400 text-sm flex items-center gap-2">
              <span className="text-lg">🌍</span> Miss Distance
            </span>
            <span className="text-white font-semibold">{asteroid.miss_distance_km.toLocaleString()} km</span>
          </div>

          <div className="flex items-center justify-between p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
            <span className="text-gray-400 text-sm flex items-center gap-2">
              <span className="text-lg">📅</span> Approach Date
            </span>
            <span className="text-white font-semibold">{asteroid.close_approach_date}</span>
          </div>

          <div className="flex items-center justify-between p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
            <span className="text-gray-400 text-sm flex items-center gap-2">
              <span className="text-lg">⚠️</span> Risk Score
            </span>
            <span className={`font-bold text-lg ${risk === "High" ? "text-red-400" : risk === "Moderate" ? "text-yellow-400" : "text-green-400"}`}>
              {asteroid.risk.score}
            </span>
          </div>
        </div>
      </div>

      {/* Animated border */}
      <div className={`absolute inset-0 rounded-2xl border-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500
        ${risk === "High" ? "border-red-500/50" : risk === "Moderate" ? "border-yellow-500/50" : "border-green-500/50"}`} />
    </div>
  );
}
