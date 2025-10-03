import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { BaseURL } from '../api';
import { FiHelpCircle, FiCheckCircle, FiXCircle } from 'react-icons/fi';

const Questions = () => {
  const location = useLocation();
  const category = location.state?.category;
  const [questions, setQuestions] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const token = localStorage.getItem("accessToken");
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const userId = user.id;

  useEffect(() => {
    if (category) {
      axios.get(`${BaseURL}/question/questions/${category}`, {
        headers: { Authorization: `Bearer ${token}` }
      }).then(res => setQuestions(res.data))
        .catch(() => setQuestions([]));
    }
  }, [category, token]);



  if (!category) {
    return <div className="text-center text-[#dd8725] mt-8">No category selected.</div>;
  }

  if (!questions || questions.length === 0) {
    return <div className="text-center text-[#dd8725] mt-8">No questions found for this category.</div>;
  }

  const handleOptionChange = (qIdx, opt) => {
    setSelectedAnswers({ ...selectedAnswers, [qIdx]: opt });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);

    // Calculate correct and wrong answers
    const correctAnswers = questions.filter(
      (q, idx) => selectedAnswers[idx] === q.answer
    ).length;
    const wrongAnswers = questions.length - correctAnswers;

    // Save progress to backend
    try {
      await axios.post(
        `${BaseURL}/progress/save`,
        {
           userId,  
          category,
          correctAnswers,
          wrongAnswers,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      // Optionally show a toast or message here
      console.log("Save progress");
      
    } catch (err) {
      // Optionally handle error here
      console.log(err);
      console.log("Save progress err");
      
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-start px-4 py-8"
      style={{
        background: "linear-gradient(135deg, #182232 0%, #4d5156 100%)",
        paddingTop: "40px"
      }}
    >
      <div className="max-w-2xl w-full mx-auto mb-8 text-center">
        <FiHelpCircle className="mx-auto text-[#dd8725] w-12 h-12 mb-2" />
        <h2 className="text-3xl font-bold text-[#dd8725] mb-2">{category} MCQ Quiz</h2>
        <p style={{marginBottom:"20px"}} className="text-[#ffffffcc] text-lg">Select the correct answer for each question below.</p>
      </div>
      <form className="flex flex-col gap-8 w-full max-w-2xl" onSubmit={handleSubmit}>
        {questions.map((q, idx) => (
          <div key={idx} className="bg-[#1f1f1f] rounded-xl p-6 shadow-lg flex flex-col gap-3 border border-[#4d5156]">
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-[#dd8725] text-[#1f1f1f] rounded-full px-3 py-1 font-bold text-sm">{idx + 1}</span>
              <h4 className="text-lg font-semibold text-[#dd8725]">{q.question}</h4>
            </div>
            <div className="flex flex-col gap-2 mt-2">
              {q.options.map((opt, i) => (
                <label
                  key={i}
                  className={`flex items-center gap-2 px-3 py-2 rounded cursor-pointer transition
                    ${
                      submitted
                        ? opt === q.answer
                          ? "bg-[#dd8725] text-[#1f1f1f] font-bold"
                          : selectedAnswers[idx] === opt
                          ? "bg-[#4d5156] text-[#ffffff]"
                          : ""
                        : selectedAnswers[idx] === opt
                        ? "bg-[#4d5156] text-[#dd8725]"
                        : ""
                    }
                  `}
                >
                  <input
                    type="radio"
                    name={`question-${idx}`}
                    value={opt}
                    checked={selectedAnswers[idx] === opt}
                    onChange={() => handleOptionChange(idx, opt)}
                    disabled={submitted}
                    className="accent-[#dd8725]"
                  />
                  <span className="text-base">{opt}</span>
                </label>
              ))}
            </div>
            {submitted && (
              <div className="mt-2 text-sm flex items-center gap-2">
                {selectedAnswers[idx] === q.answer ? (
                  <>
                    <FiCheckCircle className="text-green-400" />
                    <span className="text-green-400 font-semibold">Correct!</span>
                  </>
                ) : (
                  <>
                    <FiXCircle className="text-red-400" />
                    <span className="text-red-400 font-semibold">
                      Wrong! Correct answer: <span className="text-[#dd8725]">{q.answer}</span>
                    </span>
                  </>
                )}
              </div>
            )}
          </div>
        ))}
        {!submitted && (
          <button
            type="submit"
            className="w-full bg-[#dd8725] text-[#1f1f1f] py-3 px-4 rounded-lg text-lg font-semibold hover:bg-[#4d5156] hover:text-[#dd8725] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#dd8725] focus:ring-offset-2 mt-4"
          >
            Submit Answers
          </button>
        )}
        {submitted && (
          <div className="text-center mt-6 text-lg text-[#dd8725] font-bold">
            <span className="bg-[#4d5156] px-4 py-2 rounded-full">
              Score: {Object.keys(selectedAnswers).filter(idx => questions[idx].answer === selectedAnswers[idx]).length} / {questions.length}
            </span>
          </div>
        )}
      </form>
    </div>
  );
};

export default Questions;