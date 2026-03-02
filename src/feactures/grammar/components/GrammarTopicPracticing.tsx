import { useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  LinearProgress,
  Paper,
  Typography,
} from "@mui/material";
import { stylesPracticing } from "../styles/practicing";
import type {
  GrammarTopic,
  QuizQuestion,
} from "../interfaces/grammar.interface";
import { generateQuizQuestionsWithGemini } from "../services/api_grammar_gemini";
import {
  CheckCircle,
  ChevronRight,
  Lightbulb,
  Play,
  RotateCcw,
  Trophy,
  XCircle,
} from "lucide-react";

interface Props {
  grammarTopic: GrammarTopic;
}

type QuizState = "idle" | "loading" | "quiz" | "results";

const OPTION_LABELS = ["A", "B", "C", "D"];

export const GrammarTopicPracticing = ({ grammarTopic }: Props) => {
  const [quizState, setQuizState] = useState<QuizState>("idle");
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isChecked, setIsChecked] = useState(false);
  const [answers, setAnswers] = useState<(number | null)[]>([]);

  const currentQuestion = questions[currentIndex];
  const totalQuestions = questions.length;
  const score = answers.reduce<number>(
    (acc, ans, i) => acc + (ans === questions[i]?.correctAnswer ? 1 : 0),
    0
  );

  const handleStartQuiz = async () => {
    setQuizState("loading");
    try {
      const generated = await generateQuizQuestionsWithGemini(grammarTopic);
      setQuestions(generated);
      setCurrentIndex(0);
      setSelectedOption(null);
      setIsChecked(false);
      setAnswers([]);
      setQuizState("quiz");
    } catch (error) {
      console.error("Failed to generate quiz:", error);
      setQuizState("idle");
    }
  };

  const handleCheckAnswer = () => {
    setIsChecked(true);
    setAnswers((prev) => [...prev, selectedOption]);
  };

  const handleNextQuestion = () => {
    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsChecked(false);
    } else {
      setQuizState("results");
    }
  };

  const handleTryAgain = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsChecked(false);
    setAnswers([]);
    setQuizState("idle");
  };

  const getOptionStyle = (index: number) => {
    const styles = stylesPracticing.optionCard;
    if (!isChecked) {
      return selectedOption === index ? styles.selected : styles.default;
    }
    if (index === currentQuestion.correctAnswer) return styles.correct;
    if (index === selectedOption && index !== currentQuestion.correctAnswer)
      return styles.incorrect;
    return styles.default;
  };

  const getScoreGradient = () => {
    const pct = score / totalQuestions;
    if (pct >= 0.8) return "linear-gradient(135deg, #10b981 0%, #059669 100%)";
    if (pct >= 0.6) return "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)";
    return "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)";
  };

  const getScoreMessage = () => {
    const pct = score / totalQuestions;
    if (pct === 1) return "Perfect Score!";
    if (pct >= 0.8) return "Excellent Work!";
    if (pct >= 0.6) return "Good Job!";
    if (pct >= 0.4) return "Keep Practicing!";
    return "Don't Give Up!";
  };

  // --- IDLE ---
  if (quizState === "idle") {
    return (
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
        <Paper sx={stylesPracticing.quizSection.container} elevation={0}>
          <Box
            sx={{
              width: 56,
              height: 56,
              borderRadius: "50%",
              background: "linear-gradient(135deg, #7a00e9 0%, #9252e0 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Play size={24} color="#fff" fill="#fff" />
          </Box>
          <Typography sx={stylesPracticing.quizSection.title}>
            Practice Quiz
          </Typography>
          <Typography sx={stylesPracticing.quizSection.subtitle}>
            Test your knowledge with 5 TOEFL-style questions about{" "}
            {grammarTopic.title}
          </Typography>
          <Button
            onClick={handleStartQuiz}
            sx={stylesPracticing.quizButton}
            startIcon={<Play size={18} />}
          >
            Start Quiz
          </Button>
        </Paper>
      </Box>
    );
  }

  // --- LOADING ---
  if (quizState === "loading") {
    return (
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
        <Paper
          sx={{
            ...stylesPracticing.quizSection.container,
            py: 6,
          }}
          elevation={0}
        >
          <CircularProgress sx={{ color: "#7a00e9" }} size={48} />
          <Typography sx={stylesPracticing.quizSection.title}>
            Generating Questions...
          </Typography>
          <Typography sx={stylesPracticing.quizSection.subtitle}>
            Creating TOEFL-style questions for {grammarTopic.title}
          </Typography>
        </Paper>
      </Box>
    );
  }

  // --- RESULTS ---
  if (quizState === "results") {
    return (
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
        <Paper sx={stylesPracticing.paper.mainContent} elevation={0}>
          <Box sx={stylesPracticing.resultsScore.container}>
            <Box
              sx={{
                ...stylesPracticing.resultsScore.circle,
                background: getScoreGradient(),
                boxShadow: "0 8px 32px rgba(0,0,0,0.15)",
              }}
            >
              <Typography sx={stylesPracticing.resultsScore.scoreText}>
                {score}/{totalQuestions}
              </Typography>
              <Typography sx={stylesPracticing.resultsScore.scoreLabel}>
                correct
              </Typography>
            </Box>
            <Trophy
              size={28}
              color={score / totalQuestions >= 0.8 ? "#f59e0b" : "#a78bfa"}
            />
            <Typography sx={stylesPracticing.resultsScore.message}>
              {getScoreMessage()}
            </Typography>
          </Box>

          <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5, mt: 2 }}>
            {questions.map((q, i) => {
              const isCorrect = answers[i] === q.correctAnswer;
              return (
                <Box
                  key={i}
                  sx={
                    isCorrect
                      ? stylesPracticing.resultItem.correct
                      : stylesPracticing.resultItem.incorrect
                  }
                >
                  <Box
                    sx={{ display: "flex", alignItems: "center", gap: 1 }}
                  >
                    {isCorrect ? (
                      <CheckCircle size={18} color="#10b981" />
                    ) : (
                      <XCircle size={18} color="#ef4444" />
                    )}
                    <Typography sx={stylesPracticing.resultItem.questionText}>
                      {i + 1}. {q.question}
                    </Typography>
                  </Box>
                </Box>
              );
            })}
          </Box>

          <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
            <Button
              onClick={handleTryAgain}
              sx={stylesPracticing.quizButton}
              startIcon={<RotateCcw size={18} />}
            >
              Try Again
            </Button>
          </Box>
        </Paper>
      </Box>
    );
  }

  // --- QUIZ ---
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
      <Paper sx={stylesPracticing.paper.mainContent} elevation={0}>
        {/* Progress */}
        <Box sx={{ mb: 2 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 1,
            }}
          >
            <Typography sx={stylesPracticing.questionCounter}>
              Question {currentIndex + 1} of {totalQuestions}
            </Typography>
            <Typography sx={stylesPracticing.questionCounter}>
              {Math.round(((currentIndex + 1) / totalQuestions) * 100)}%
            </Typography>
          </Box>
          <LinearProgress
            variant="determinate"
            value={((currentIndex + 1) / totalQuestions) * 100}
            sx={stylesPracticing.progressBar}
          />
        </Box>

        {/* Question */}
        <Box sx={stylesPracticing.questionBox}>
          <Typography sx={stylesPracticing.questionText}>
            {currentQuestion.question}
          </Typography>
        </Box>

        {/* Options */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
          {currentQuestion.options.map((option, index) => (
            <Box
              key={index}
              onClick={() => {
                if (!isChecked) setSelectedOption(index);
              }}
              sx={{
                ...getOptionStyle(index),
                display: "flex",
                alignItems: "center",
                gap: 1.5,
              }}
            >
              <Typography sx={stylesPracticing.optionLabel}>
                {OPTION_LABELS[index]}
              </Typography>
              <Typography sx={stylesPracticing.optionText}>{option}</Typography>
              {isChecked && index === currentQuestion.correctAnswer && (
                <CheckCircle
                  size={18}
                  color="#10b981"
                  style={{ marginLeft: "auto" }}
                />
              )}
              {isChecked &&
                index === selectedOption &&
                index !== currentQuestion.correctAnswer && (
                  <XCircle
                    size={18}
                    color="#ef4444"
                    style={{ marginLeft: "auto" }}
                  />
                )}
            </Box>
          ))}
        </Box>

        {/* Explanation */}
        {isChecked && (
          <Box sx={stylesPracticing.explanationBox}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 0.5 }}>
              <Lightbulb size={16} color="#92400e" />
              <Typography
                sx={{ ...stylesPracticing.explanationText, fontWeight: 700 }}
              >
                Explanation
              </Typography>
            </Box>
            <Typography sx={stylesPracticing.explanationText}>
              {currentQuestion.explanation}
            </Typography>
          </Box>
        )}

        {/* Action button */}
        <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
          {!isChecked ? (
            <Button
              onClick={handleCheckAnswer}
              disabled={selectedOption === null}
              sx={{
                ...stylesPracticing.quizButton,
                ...(selectedOption === null && {
                  opacity: 0.5,
                  pointerEvents: "none",
                }),
              }}
            >
              Check Answer
            </Button>
          ) : (
            <Button
              onClick={handleNextQuestion}
              sx={stylesPracticing.quizButton}
              endIcon={<ChevronRight size={18} />}
            >
              {currentIndex < totalQuestions - 1
                ? "Next Question"
                : "See Results"}
            </Button>
          )}
        </Box>
      </Paper>
    </Box>
  );
};
