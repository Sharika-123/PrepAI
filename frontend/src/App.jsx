
import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [subjects, setSubjects] = useState([]);
  const [subject, setSubject] = useState('Python');
  const [difficulty, setDifficulty] = useState('Beginner');
  const [questions, setQuestions] = useState([]);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
 const [score, setScore] = useState(() => {
  return Number(localStorage.getItem('prepAI_score')) || 0;
});

const [attempted, setAttempted] = useState(() => {
  return JSON.parse(localStorage.getItem('prepAI_attempted') || '[]');
});
useEffect(() => {
  localStorage.setItem('prepAI_score', score);
  localStorage.setItem('prepAI_attempted', JSON.stringify(attempted));
}, [score, attempted]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Load available subjects
  useEffect(() => {
    fetch('http://localhost:5000/api/subjects')
      .then((response) => {
        if (!response.ok) throw new Error('Could not load subjects');
        return response.json();
      })
      .then((data) => setSubjects(data))
      .catch(() => {
        setError('Unable to connect to the backend. Please check your server.');
      });
  }, []);

  // Load and filter questions
  useEffect(() => {
    if (!subject) return;

    setLoading(true);
    setError('');
    setQuestions([]);
    setQuestionIndex(0);
    setShowAnswer(false);

    fetch(`http://localhost:5000/api/questions/${encodeURIComponent(subject)}`)
      .then((response) => {
        if (!response.ok) throw new Error('Could not load questions');
        return response.json();
      })
      .then((data) => {
        const filteredQuestions = data.filter(
          (item) => item.difficulty === difficulty
        );

        setQuestions(filteredQuestions);
        setLoading(false);
      })
      .catch(() => {
        setError('Unable to load questions. Please check your backend.');
        setLoading(false);
      });
  }, [subject, difficulty]);
  function markCorrect() {
  const questionId = `${subject}-${difficulty}-${questionIndex}`;

  if (!attempted.includes(questionId)) {
    setScore(score + 1);
    setAttempted([...attempted, questionId]);
  }
}
  function nextQuestion() {
    if (questions.length === 0) return;

    setQuestionIndex((previousIndex) =>
      (previousIndex + 1) % questions.length
    );
    setShowAnswer(false);
  }

  const currentQuestion = questions[questionIndex];

  return (
    <div className="app">
      <header className="navbar">
        <div className="logo">Prep<span>AI</span></div>
        <div className="nav-label">INTERVIEW PREPARATION</div>
      </header>

      <main className="main-content">
        <div className="dashboard-stats">
  <div className="stat-card">
    <h3>Total Questions</h3>
    <p>120</p>
  </div>

  <div className="stat-card">
    <h3>Your Score</h3>
    <p>{score}</p>
  </div>

  <div className="stat-card">
    <h3>Accuracy</h3>
    <p>
      {attempted.length
        ? Math.round((score / attempted.length) * 100)
        : 0}%
    </p>
  </div>
</div>
        <section className="welcome">
          <p className="tagline">YOUR PERSONAL INTERVIEW PARTNER</p>
          <h1>
            Prepare smarter.<br />
            <span>Interview better.</span>
          </h1>
          <p className="description">
            Practice technical interview questions, understand concepts
            and build confidence one question at a time.
          </p>
        </section>

        <section className="practice-card">
          <div className="card-heading">
            <div>
              <p className="small-heading">PRACTICE SESSION</p>
              <h2>Choose your subject</h2>
            </div>

            <span className="question-count">
              {loading ? 'LOADING...' : `${questions.length} QUESTIONS`}
            </span>
          </div>

          <div className="subject-list">
            {subjects.map((item) => (
              <button
                key={item}
                className={subject === item ? 'subject active' : 'subject'}
                onClick={() => setSubject(item)}
              >
                {item}
              </button>
            ))}
          </div>

          <h2>Select Difficulty</h2>

          <div className="subject-list">
            {['Beginner', 'Intermediate', 'Advanced'].map((level) => (
              <button
                key={level}
                className={difficulty === level ? 'subject active' : 'subject'}
                onClick={() => setDifficulty(level)}
              >
                {level}
              </button>
            ))}
          </div>
<div className="score-box">
  <div className="progress-container">
  <div className="progress-info">
    <span>Practice Progress</span>
    <span>{attempted.length} / {questions.length}</span>
  </div>

  <div className="progress-bar">
    <div
      className="progress-fill"
      style={{
        width: questions.length
          ? `${(attempted.length / questions.length) * 100}%`
          : '0%'
      }}
    ></div>
  </div>
</div>
  <p>Your Score: {score}</p>
  <p>Questions Attempted: {attempted.length}</p>
  <p>
  Accuracy: {attempted.length
    ? Math.round((score / attempted.length) * 100)
    : 0}%
</p>

  <button
    className="answer-button"
    onClick={() => {
      setScore(0);
      setAttempted([]);
    }}
  >
    Reset Score
  </button>
</div>
          <div className="question-area">
            {loading ? (
              <p className="hint">Loading interview questions...</p>
            ) : error ? (
              <p className="hint">{error}</p>
            ) : currentQuestion ? (
              <>
                <p className="question-label">
                  {difficulty.toUpperCase()} LEVEL
                </p>

                <p className="question-label">
                  QUESTION {questionIndex + 1} OF {questions.length}
                </p>

                <h3>{currentQuestion.question}</h3>

                {showAnswer ? (
                  <div className="answer-box">
                    <p className="answer-label">SIMPLE EXPLANATION</p>
                    <p>{currentQuestion.answer}</p>
                  </div>
                ) : (
                  <p className="hint">
                    Think about your answer before revealing the explanation.
                  </p>
                )}

                <div className="action-buttons">
                  <button
                    className="answer-button"
                    onClick={() => setShowAnswer(!showAnswer)}
                  >
                    {showAnswer ? 'Hide Answer' : 'Show Answer'}
                  </button>
{showAnswer && (
  <>
    <button
      className="answer-button"
      onClick={markCorrect}
    >
      I Got It Correct ✓
    </button>

    <button
      className="next-button"
      onClick={() => {
        const questionId = `${subject}-${difficulty}-${questionIndex}`;

        if (!attempted.includes(questionId)) {
          setAttempted([...attempted, questionId]);
        }
      }}
    >
      I Got It Wrong ✗
    </button>
  </>
)}
                  <button
                    className="next-button"
                    onClick={nextQuestion}
                  >
                    Next Question →
                  </button>
                </div>
              </>
            ) : (
              <p className="hint">
                No questions available for this difficulty.
              </p>
            )}
          </div>
        </section>

        <p className="footer-text">
          Built for students preparing for their next opportunity.
        </p>
      </main>
    </div>
  );
}

export default App;
