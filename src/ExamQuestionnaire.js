import react, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import ExamQuestion from "./ExamQuestion";
import { Stack } from "react-bootstrap";
import { MathJax } from "better-react-mathjax";

const QUESTIONS = [questionFloatExponent, questionBinaryToFraction, questionFractionToBinary];

export default function ExamQuestionnaire({ questions = QUESTIONS, onCorrect }) {
  const [correct, setCorrect] = useState([]);

  useEffect(() => {
    const newCorrect = Array(questions.length).fill(false);
    setCorrect(newCorrect);
    onCorrect(newCorrect);
  }, []);

  function onAnswerCorrect(isCorrect, index) {
    const newCorrect = [...correct];
    newCorrect[index] = isCorrect;
    setCorrect(newCorrect);
    onCorrect(newCorrect);
  }

  return (
    <Stack direction="column" gap={3}>
      {questions.map((question, index) => (
        <ExamDynamicQuestion
          key={`ExamQuestion:${index}`}
          id={`ExamQuestion:${index}`}
          randomQuestion={question}
          number={index + 1}
          onCorrect={(isCorrect) => onAnswerCorrect(isCorrect, index)}
        />
      ))}
    </Stack>
  );
}

function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function questionFloatExponent() {
  let bits = randInt(1, 1 + 2 + 4).toString(2);
  bits = "0".repeat(3 - bits.length) + bits;
  const k = randInt(3, 5);

  return {
    description: `Consider an 8-bit floating-point format in which there are k=${k}
      exponent bits and n=3 fraction bits. Given this format, consider the
      bit representation consisting of 0${"0".repeat(k)}${bits}
      What is E in this case? (Note: this question is not asking for the lowercase e, but rather
      the uppercase E) You should give your answer as a decimal integer
      with the sign only if the integer is negative.`,
    answer: `${1 - (Math.pow(2, k - 1) - 1)}`,
    hint: (
      <MathJax dynamic={true}>
        <span>{`\\(E = e - (2^{k-1}-1)\\) and \\(E = 1 - (2^{k-1}-1)\\).`}</span> <br />
        <span>{`\\(k = ${k}\\) and \\(e = 0\\)`}</span> <br />
        <span>{`\\(E = 1 - (2^{k-1}-1)\\)`}</span> <br />
        <span>{`\\(= 1 - (2^{${k}-1}-1)\\)`}</span> <br />
        <span>{`\\(= 1 - (2^{${k - 1}}-1)\\)`}</span> <br />
        <span>{`\\(= 1 - (${Math.pow(2, k - 1)}-1)\\)`}</span> <br />
        <span>{`\\(= ${1 - (Math.pow(2, k - 1) - 1)}\\)`}</span>
      </MathJax>
    ),
  };
}

function questionFractionToBinary() {
  const shift = randInt(1, 4);
  const d = 1 << shift;
  const n = randInt(d, 31) + 1;
  const bits = n.toString(2);
  const dotIdx = bits.length - shift;
  const answer = `${bits.slice(0, dotIdx)}.${bits.slice(dotIdx, Math.max(bits.lastIndexOf("1"), dotIdx) + 1)}`;

  return {
    description: `Convert the fractional value ${n}/${d} into binary. Your answer should consist only of the characters 1, 0, and the binary point ('.'). You should have no leading 0s.`,
    answer: answer,
    hint: `TODO`,
  };
}

function questionBinaryToFraction() {
  let bits = randInt(1, 15).toString(2);
  bits = bits.slice(0, bits.lastIndexOf("1") + 1);
  const allBits = `0.${bits}`;
  const d = 1 << bits.length;
  let n = 0;
  for (var i = 0; i < bits.length; i++) {
    n += bits[i] === "1" ? (1 << bits.length) >>> (i + 1) : 0;
  }
  const answer = `${n}/${d}`;

  return {
    description: `Convert the binary value ${allBits} into a fraction. Your answer should be given as a fraction in the form "a/b", where a and b are (decimal) integers. If applicable, the fraction should be reduced.`,
    answer: answer,
    hint: `TODO`,
  };
}

function ExamDynamicQuestion({ randomQuestion, number, onCorrect, id }) {
  const [question, setQuestion] = useState({});

  useEffect(() => {
    setQuestion(randomQuestion());
  }, []);

  return (
    <ExamQuestion id={id} onRandomize={() => setQuestion(randomQuestion())} number={number}>
      <ExamQuestion.Body>
        <p>{question.description}</p>
        <ExamQuestion.Answer correctAnswer={question.answer} onCorrect={onCorrect}></ExamQuestion.Answer>
        <ExamQuestion.HintToggle />
      </ExamQuestion.Body>
      <ExamQuestion.Hint answer={question.answer}>{question.hint}</ExamQuestion.Hint>
    </ExamQuestion>
  );
}
