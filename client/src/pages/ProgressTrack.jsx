import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BaseURL } from '../api';
import { FiTrendingUp, FiCheckCircle, FiXCircle, FiUser } from 'react-icons/fi';

const ProgressTrack = () => {
  const [progress, setProgress] = useState([]); 
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("accessToken");
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const res = await axios.get(`${BaseURL}/progress/get`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const data = Array.isArray(res.data) ? res.data : [];

        // Aggregate by category
        const groupedObj = data.reduce((acc, row) => {
          const category = row.category || "Unknown";
          const correct = Number(row.correctAnswers || 0);
          const wrong = Number(row.wrongAnswers || 0);
          const updatedAt = row.updatedAt ? new Date(row.updatedAt) : new Date();

          if (!acc[category]) {
            acc[category] = {
              category,
              correctAnswers: 0,
              wrongAnswers: 0,
              attempts: 0,
              lastUpdated: updatedAt,
            };
          }

          acc[category].correctAnswers += correct;
          acc[category].wrongAnswers += wrong;
          acc[category].attempts += 1;

          // keep the latest updatedAt
          if (!acc[category].lastUpdated || updatedAt > acc[category].lastUpdated) {
            acc[category].lastUpdated = updatedAt;
          }

          return acc;
        }, {});

        // Convert to array and compute total & score
        const grouped = Object.values(groupedObj).map(item => {
          const total = item.correctAnswers + item.wrongAnswers;
          const score = total > 0 ? Math.round((item.correctAnswers / total) * 100) : 0;
          return { ...item, total, score };
        });

        setProgress(grouped);
      } catch (err) {
        console.error("Progress fetch error:", err);
        setProgress([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProgress();
  }, [token]);

  return (
    <div
      className="min-h-screen flex flex-col items-center px-4 py-8"
      style={{ background: "linear-gradient(135deg, #182232 0%, #4d5156 100%)" }}
    >
      <div className="max-w-3xl w-full mx-auto text-center mb-10">
        <FiTrendingUp className="mx-auto text-[#dd8725] w-12 h-12 mb-2" />
        <h1 className="text-3xl font-bold text-[#dd8725] mb-2">Your Progress</h1>
        <p className="text-[#ffffffcc] text-lg">Track your quiz performance by category.</p>
      </div>

      <div className="max-w-4xl w-full mx-auto bg-[#1f1f1f] rounded-xl shadow-2xl p-6">
        <div className="mb-4 flex items-center gap-2 text-[#dd8725] font-semibold text-lg">
          <FiUser />
          {user.name || "User"}
        </div>

        {loading ? (
          <div className="text-center text-[#dd8725] py-8">Loading progress...</div>
        ) : progress.length === 0 ? (
          <div className="text-center text-[#dd8725] py-8">No progress data found.</div>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#4d5156] text-[#dd8725]">
                <th className="py-3 px-4 rounded-tl-xl">Category</th>
                <th className="py-3 px-4">Correct</th>
                <th className="py-3 px-4">Wrong</th>
                <th className="py-3 px-4">Total Attempt</th>
                <th className="py-3 px-4">Score</th>
                <th className="py-3 px-4">Attempts</th>
                <th className="py-3 px-4 rounded-tr-xl">Last Updated</th>
              </tr>
            </thead>
            <tbody>
              {progress.map((row, idx) => (
                <tr key={idx} className="border-b border-[#4d5156] hover:bg-[#182232] transition">
                  <td className="py-3 px-4 font-semibold text-[#dd8725]">{row.category}</td>
                  <td className="py-3 px-4 flex items-center gap-2 text-green-400">
                    <FiCheckCircle /> {row.correctAnswers}
                  </td>
                  <td className="py-3 px-4 flex items-center gap-2 text-red-400">
                    <FiXCircle /> {row.wrongAnswers}
                  </td>
                  <td className="py-3 px-4">{row.total}</td>
                  <td className="py-3 px-4">{row.attempts}</td>
                  <td className="py-3 px-4">
                    <span className="bg-[#dd8725] text-[#1f1f1f] px-3 py-1 rounded-full font-bold">
                      {row.score}%
                    </span>
                  </td>
                  <td className="py-3 px-4 text-[#ffffff99]">
                    {row.lastUpdated ? new Date(row.lastUpdated).toLocaleString() : "-"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default ProgressTrack;