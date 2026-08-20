import React from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
} from 'recharts';
import { normTableGraph3, getPersonalityPattern } from '../utils/discCalculator';
import { DISCType } from '../types';

interface Graph3ChartProps {
  rawD: number;
  rawI: number;
  rawS: number;
  rawC: number;
  title?: string;
  className?: string;
}

export const Graph3Chart: React.FC<Graph3ChartProps> = ({
  rawD,
  rawI,
  rawS,
  rawC,
  title = "Graph 3: CHANGE (Perceived Self)",
  className = "",
}) => {
  // Convert raw change scores to Graph 3 Norm Coordinates using normTableGraph3
  const getNorm = (trait: DISCType, rawScore: number): number => {
    return normTableGraph3[String(rawScore)]?.[trait] ?? 0;
  };

  const normD = getNorm('D', rawD);
  const normI = getNorm('I', rawI);
  const normS = getNorm('S', rawS);
  const normC = getNorm('C', rawC);

  const patternCode = getPersonalityPattern(rawD, rawI, rawS, rawC);

  const data = [
    { trait: 'D', fullLabel: 'Dominance', raw: rawD, norm: normD, color: '#f43f5e' },
    { trait: 'I', fullLabel: 'Influence', raw: rawI, norm: normI, color: '#f59e0b' },
    { trait: 'S', fullLabel: 'Steadiness', raw: rawS, norm: normS, color: '#10b981' },
    { trait: 'C', fullLabel: 'Conscientiousness', raw: rawC, norm: normC, color: '#3b82f6' },
  ];

  return (
    <div className={`bg-white border border-slate-200 rounded-2xl p-5 shadow-sm ${className}`}>
      {/* Header Info */}
      <div className="flex flex-wrap items-center justify-between gap-2 mb-4 pb-3 border-b border-slate-100">
        <div>
          <h3 className="text-sm font-bold text-slate-900 flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-indigo-600 inline-block"></span>
            <span>{title}</span>
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Grafik Koordinat Norm (-8 s/d +8) dari Skor Change (Most - Least)
          </p>
        </div>
        <div className="bg-slate-900 text-white px-3 py-1 rounded-lg text-xs font-bold tracking-wide">
          Pattern: <span className="text-indigo-300 font-black">{patternCode}</span>
        </div>
      </div>

      {/* Recharts Line Chart */}
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 15, right: 25, left: -15, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis
              dataKey="trait"
              stroke="#64748b"
              fontSize={13}
              fontWeight="bold"
              tickLine={false}
            />
            <YAxis
              domain={[-8, 8]}
              ticks={[-8, -6, -4, -2, 0, 2, 4, 6, 8]}
              stroke="#64748b"
              fontSize={11}
              tickLine={false}
            />
            {/* Prominent Baseline Zero-Line at Y=0 */}
            <ReferenceLine
              y={0}
              stroke="#334155"
              strokeWidth={2}
              strokeDasharray="4 2"
              label={{
                value: 'Baseline (0)',
                position: 'insideBottomLeft',
                fill: '#475569',
                fontSize: 10,
                fontWeight: 'bold',
              }}
            />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const item = payload[0].payload;
                  return (
                    <div className="bg-slate-900 text-white text-xs p-2.5 rounded-lg shadow-lg border border-slate-700">
                      <p className="font-bold text-indigo-300">
                        {item.trait} ({item.fullLabel})
                      </p>
                      <p className="mt-1">
                        Raw Change Score: <strong className="text-amber-300">{item.raw > 0 ? `+${item.raw}` : item.raw}</strong>
                      </p>
                      <p>
                        Norm Score (Y-axis): <strong className="text-emerald-300">{item.norm > 0 ? `+${item.norm}` : item.norm}</strong>
                      </p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Line
              type="linear"
              dataKey="norm"
              stroke="#4f46e5"
              strokeWidth={3}
              dot={{ r: 6, fill: '#4f46e5', stroke: '#ffffff', strokeWidth: 2 }}
              activeDot={{ r: 8, fill: '#6366f1' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Summary Score Table */}
      <div className="mt-4 pt-3 border-t border-slate-100">
        <div className="grid grid-cols-4 gap-2 text-center text-xs">
          {data.map((item) => (
            <div key={item.trait} className="bg-slate-50 border border-slate-100 p-2 rounded-xl">
              <span className="font-bold block text-slate-800" style={{ color: item.color }}>
                {item.trait}
              </span>
              <span className="text-[11px] text-slate-500 block">
                Change: <strong className="text-slate-700">{item.raw > 0 ? `+${item.raw}` : item.raw}</strong>
              </span>
              <span className="text-[11px] text-slate-500 block">
                Norm: <strong className={item.norm > 0 ? 'text-emerald-600 font-bold' : 'text-slate-600'}>
                  {item.norm > 0 ? `+${item.norm}` : item.norm}
                </strong>
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
