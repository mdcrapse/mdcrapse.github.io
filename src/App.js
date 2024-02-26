import react, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { createTheme, ThemeProvider } from "@mui/material";
import ExamQuestion from "./ExamQuestion";
import { Stack } from "react-bootstrap";

export default function App() {
  const theme = createTheme({
    typography: {
      button: {
        textTransform: "none",
      },
    },
    // palette: {
    //   mode: "light",
    //   primary: {
    //     main: "#424242",
    //     lGray: "#f3f3f3",
    //     contrastText: "#fff", //button text white instead of black
    //   },
    //   secondary: {
    //     main: "#f47920",
    //   },
    //   white: {
    //     main: "#ffffff",
    //   },
    // },
  });

  return (
    <ThemeProvider theme={theme}>
      <div className="container my-5">
        <div className="d-flex flex-column">
          <ExamQuestionnaire />
        </div>
      </div>
    </ThemeProvider>
  );
}

function questionFloatBinary() {
  return {
    description: `Consider an 8-bit floating-point format in which there are k=4 exponent bits and n=3 fraction bits. Given
    this format, consider the bit representation consisting of 00000101 What is E in this case? (Note: this
    question is not asking for the lowercase e, but rather the uppercase E) You should give your answer as a
    decimal integer with the sign only if the integer is negative.`,
    answer: ``,
    hint: `Hint for the float binary question`,
  };
}

function ExamQuestionnaire({ questions }) {
  return (
    <Stack direction="column" gap={3}>
      <ExamDynamicQuestion randomQuestion={questionFloatBinary} />
    </Stack>
  );
}

function ExamDynamicQuestion({ randomQuestion }) {
  const [question, setQuestion] = useState({});

  useEffect(() => {
    setQuestion(randomQuestion());
  }, []);

  return (
    <ExamQuestion number={""}>
      <ExamQuestion.Body>
        <p>{question.description}</p>
        <ExamQuestion.Answer correctAnswer={question.answer}></ExamQuestion.Answer>
        <ExamQuestion.HintToggle />
      </ExamQuestion.Body>
      <ExamQuestion.Hint>{question.hint}</ExamQuestion.Hint>
    </ExamQuestion>
  );
}
