import React from 'react';
import { Activity } from 'lucide-react';

export default function RiskDistribution({ highRisk, moderateRisk, lowRisk }) {
  const riskData = [
    { label: 'High Risk', value: highRisk, color: 'red', bgColor: 'bg-red-500/20', textColor: 'text-red-400' },
    { label: 'Moderate', value: moderateRisk, color: 'yellow', bgColor: 'bg-yellow-500/20', textColor: 'text-yellow-400' },
    { label: 'Low Risk', value: lowRisk, color: 'green', bgColor: 'bg-green-500/20', textColor: 'text-green-400' },
  ];

  return (
    <div className="bg-gradient-to-br from-indigo-500/10 to-purple-500/10 backdrop-blur-sm border border-indigo-400/30 rounded-xl p-6">
      <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
        <Activity className="w-5 h-5" />
        Risk Distribution
      </h3>
      <div className="grid grid-cols-3 gap-4">
        {riskData.map((risk) => (
          <div key={risk.label} className="text-center">
            <div className={`w-16 h-16 mx-auto ${risk.bgColor} rounded-full flex items-center justify-center mb-2`}>
              <span className={`text-2xl font-bold ${risk.textColor}`}>{risk.value}</span>
            </div>
            <p className={`${risk.textColor} text-sm`}>{risk.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
