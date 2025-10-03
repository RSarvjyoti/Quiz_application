import React, { useEffect, useState } from "react";
import axios from "axios";
import { BaseURL } from "../api";
import { FiTrendingUp, FiCheckCircle, FiXCircle, FiUser } from "react-icons/fi";

const ProgressTrack = () => {
  const [progress, setProgress] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("accessToken");
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const res = await axios.get(`${BaseURL}/progress/get`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = Array.isArray(res.data) ? res.data : [];

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

          if (!acc[category].lastUpdated || updatedAt > acc[category].lastUpdated) {
            acc[category].lastUpdated = updatedAt;
          }

          return acc;
        }, {});

        const grouped = Object.values(groupedObj).map((item) => {
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
      style={{ background: "linear-gradient(135deg, #182232 0%, #4d5156 100%)", paddingTop: "40px" }}
    >
      <div className="max-w-3xl w-full mx-auto text-center mb-10">
        <FiTrendingUp className="mx-auto text-[#dd8725] w-12 h-12 mb-2" />
        <h1 className="text-3xl font-bold text-[#dd8725] mb-2">Your Progress</h1>
        <p className="text-[#ffffffcc] text-lg" style={{marginBottom: "30px"}}>
          Track your quiz performance by category.
        </p>
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
          <div  className="grid grid-cols-7 text-center border-b border-[#4d5156] font-semibold text-[#dd8725]">
            {/* Header */}
            <div className="py-3 px-2">Category</div>
            <div className="py-3 px-2">Correct</div>
            <div className="py-3 px-2">Wrong</div>
            <div className="py-3 px-2">Total Attempt</div>
            <div className="py-3 px-2">Attempts</div>
            <div className="py-3 px-2">Score</div>
            <div className="py-3 px-2">Last Updated</div>

            {/* Rows */}
            {progress.map((row, idx) => (
              <React.Fragment key={idx}>
                <div className="py-3 px-2 font-semibold text-[#dd8725] border-b border-[#4d5156] hover:bg-[#182232] transition">
                  {row.category}
                </div>
                <div className="py-3 px-2 text-green-400 flex items-center justify-center gap-1 border-b border-[#4d5156] hover:bg-[#182232] transition">
                  <FiCheckCircle />
                  <span>{row.correctAnswers}</span>
                </div>
                <div className="py-3 px-2 text-red-400 flex items-center justify-center gap-1 border-b border-[#4d5156] hover:bg-[#182232] transition">
                  <FiXCircle />
                  <span>{row.wrongAnswers}</span>
                </div>
                <div className="py-3 px-2 border-b border-[#4d5156] hover:bg-[#182232] transition">
                  {row.total}
                </div>
                <div className="py-3 px-2 border-b border-[#4d5156] hover:bg-[#182232] transition">
                  {row.attempts}
                </div>
                <div className="py-3 px-2 border-b border-[#4d5156] hover:bg-[#182232] transition">
                  <span className="bg-[#dd8725] text-[#1f1f1f] px-3 py-1 rounded-full font-bold">
                    {row.score}%
                  </span>
                </div>
                <div className="py-3 px-2 text-[#ffffff99] border-b border-[#4d5156] hover:bg-[#182232] transition">
                  {row.lastUpdated ? new Date(row.lastUpdated).toLocaleString() : "-"}
                </div>
              </React.Fragment>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProgressTrack;