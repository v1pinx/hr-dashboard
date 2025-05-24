"use client";
import React, { useEffect, useRef, useState } from "react";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  BarController,
  LineElement,
  LineController,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  BarController,
  LineElement,
  LineController,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const Analytics = () => {
  const departmentChartRef = useRef(null);
  const bookmarkTrendsRef = useRef(null);
  const departmentChart = useRef(null);
  const bookmarkChart = useRef(null);

  // Simple mock data for department performance
  const departmentData = {
    labels: ["Engineering", "Marketing", "Sales", "HR", "Finance"],
    datasets: [
      {
        label: "Average Performance Rating",
        data: [4.2, 3.8, 4.0, 4.1, 3.9],
        backgroundColor: [
          "rgba(59, 130, 246, 0.8)",
          "rgba(16, 185, 129, 0.8)",
          "rgba(245, 101, 101, 0.8)",
          "rgba(251, 191, 36, 0.8)",
          "rgba(139, 92, 246, 0.8)",
        ],
        borderColor: [
          "rgba(59, 130, 246, 1)",
          "rgba(16, 185, 129, 1)",
          "rgba(245, 101, 101, 1)",
          "rgba(251, 191, 36, 1)",
          "rgba(139, 92, 246, 1)",
        ],
        borderWidth: 2,
      },
    ],
  };

  // Simple mock data for bookmark trends
  const bookmarkTrendsData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Bookmarks Added",
        data: [12, 19, 15, 25, 22, 30],
        borderColor: "rgba(59, 130, 246, 1)",
        backgroundColor: "rgba(59, 130, 246, 0.1)",
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: "#e5e7eb",
          font: {
            size: 12,
          },
        },
      },
      title: {
        display: true,
        color: "#e5e7eb",
        font: {
          size: 16,
          weight: "bold",
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          color: "#9ca3af",
        },
        grid: {
          color: "#374151",
        },
      },
      x: {
        ticks: {
          color: "#9ca3af",
        },
        grid: {
          color: "#374151",
        },
      },
    },
  };

  const departmentChartOptions = {
    ...chartOptions,
    plugins: {
      ...chartOptions.plugins,
      title: {
        ...chartOptions.plugins.title,
        text: "Department-wise Average Performance",
      },
    },
  };

  const bookmarkChartOptions = {
    ...chartOptions,
    plugins: {
      ...chartOptions.plugins,
      title: {
        ...chartOptions.plugins.title,
        text: "Bookmark Trends",
      },
    },
  };

  useEffect(() => {
    if (departmentChart.current) {
      departmentChart.current.destroy();
    }
    if (bookmarkChart.current) {
      bookmarkChart.current.destroy();
    }

    if (departmentChartRef.current) {
      departmentChart.current = new ChartJS(departmentChartRef.current, {
        type: "bar",
        data: departmentData,
        options: departmentChartOptions,
      });
    }

    if (bookmarkTrendsRef.current) {
      bookmarkChart.current = new ChartJS(bookmarkTrendsRef.current, {
        type: "line",
        data: bookmarkTrendsData,
        options: bookmarkChartOptions,
      });
    }

    return () => {
      if (departmentChart.current) {
        departmentChart.current.destroy();
      }
      if (bookmarkChart.current) {
        bookmarkChart.current.destroy();
      }
    };
  }, []);

  const statsCards = [
    {
      title: "Total Employees",
      value: "245",
      change: "+8.2%",
      changeType: "positive",
    },
    {
      title: "Average Rating",
      value: "4.0",
      change: "+0.3",
      changeType: "positive",
    },
    {
      title: "Departments",
      value: "5",
      change: "Active",
      changeType: "neutral",
    },
    {
      title: "High Performers",
      value: "89",
      change: "36.3%",
      changeType: "positive",
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">HR Analytics Dashboard</h1>
          <p className="text-zinc-400">Performance insights and trends</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statsCards.map((stat, index) => (
            <div key={index} className="rounded-xl border border-zinc-800 p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <p className="text-sm text-zinc-400">{stat.title}</p>
                  <div className="space-y-1">
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <p className="text-xs text-zinc-400">
                      {stat.changeType === "neutral"
                        ? stat.change
                        : `${stat.change} from last month`}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Department Performance Chart */}
          <div className="rounded-xl border border-zinc-800 p-6">
            <div className="h-80">
              <canvas ref={departmentChartRef}></canvas>
            </div>
          </div>

          <div className="rounded-xl border border-zinc-800 p-6">
            <div className="h-80">
              <canvas ref={bookmarkTrendsRef}></canvas>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
