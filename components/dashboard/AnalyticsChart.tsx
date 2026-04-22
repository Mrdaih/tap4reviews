"use client";

import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export function AnalyticsChart({ series }: { series: { date: string; count: number }[] }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={series} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
        <CartesianGrid stroke="rgba(255,255,255,0.06)" strokeDasharray="3 3" />
        <XAxis
          dataKey="date"
          tick={{ fontSize: 11, fill: "rgba(255,255,255,0.5)" }}
          tickFormatter={(v) => v.slice(5)}
        />
        <YAxis
          tick={{ fontSize: 11, fill: "rgba(255,255,255,0.5)" }}
          allowDecimals={false}
        />
        <Tooltip
          contentStyle={{
            background: "#1a1a2e",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: 8,
            fontSize: 12,
          }}
          labelStyle={{ color: "#fff" }}
          cursor={{ stroke: "rgba(212,168,67,0.3)" }}
        />
        <Line type="monotone" dataKey="count" stroke="#D4A843" strokeWidth={2} dot={false} />
      </LineChart>
    </ResponsiveContainer>
  );
}
