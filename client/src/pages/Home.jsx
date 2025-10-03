import React, { useEffect, useState } from 'react';
import Card from '../components/Card';
import { BaseURL } from '../api';
import axios from 'axios';
import { FiSearch, FiAward } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [categories, setCategories] = useState([]);
  const [counts, setCounts] = useState({});
  const [search, setSearch] = useState("");
  const token = localStorage.getItem("accessToken");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get(`${BaseURL}/question/categories`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setCategories(res.data);
      } catch (err) {
        setCategories([]);
      }
    };
    fetchCategories();
  }, [token]);

  const getCount = async (category) => {
    try {
      const res = await axios.get(`${BaseURL}/question/questions/${category}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return res.data.length;
    } catch {
      return 0;
    }
  };

  useEffect(() => {
    const loadCounts = async () => {
      const obj = {};
      for (const cat of categories) {
        obj[cat] = await getCount(cat);
      }
      setCounts(obj);
    };
    if (categories.length) loadCounts();
  }, [categories]);

  const filteredCategories = categories.filter(cat =>
    cat.toLowerCase().includes(search.toLowerCase())
  );

  const handleCardClick = (category) => {
    navigate('/questions', { state: { category } });
  };

  return (
    <div
      className="min-h-screen gap-7 flex flex-col items-center justify-start px-4 py-8"
      style={{
        background: "linear-gradient(135deg, #182232 0%, #4d5156 100%)",
        paddingTop: "40px"
      }}
    >
      {/* Header */}
      <div className="max-w-3xl mx-auto text-center mb-10">
        <div className="flex flex-col items-center gap-2">
          <FiAward className="text-[#dd8725] w-14 h-14 mb-2 drop-shadow-lg" />
          <h1 className="text-4xl font-extrabold text-[#dd8725] mb-2 tracking-wide">
            Ace Your Interview!
          </h1>
          <p className="text-[#ffffffcc] text-lg font-medium">
            Practice with top categories and boost your success.
          </p>
        </div>
      </div>
      {/* Search Bar */}
      <div className="max-w-xl w-full mx-auto mb-8 flex items-center bg-[#1f1f1f] rounded-full px-6 py-3 shadow-lg border border-[#4d5156]">
        <FiSearch className="text-[#dd8725] w-6 h-6 mr-3" />
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search category..."
          className="bg-transparent outline-none text-[#ffffff] w-full px-2 py-1 text-lg"
        />
      </div>
      {/* Category Cards */}
      <div className="max-w-6xl w-full mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {filteredCategories.length === 0 ? (
          <div className="col-span-full text-center text-[#dd8725] text-xl font-semibold mt-10">
            No categories found.
          </div>
        ) : (
          filteredCategories.map(cat => (
            <Card
              key={cat}
              name={cat}
              numberOfQuestion={counts[cat] || 0}
              onClick={() => handleCardClick(cat)}
            />
          ))
        )}
      </div>
      {/* Footer message */}
      <div className="mt-16 text-center text-[#ffffff99] text-base">
        <span className="px-4 py-2 rounded-full bg-[#4d5156] text-[#dd8725] font-semibold shadow">
          Start practicing now and get ready to ace your next interview!
        </span>
      </div>
    </div>
  );
};

export default Home;