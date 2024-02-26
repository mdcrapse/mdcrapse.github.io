import react, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import ExamQuestion from "./ExamQuestion";
import { Stack } from "react-bootstrap";

export default function ExamQuestionnaire() {
  return (
    <Stack direction="column" gap={3}>
      <ExamDynamicQuestion randomQuestion={questionBinaryToFraction} />
      <ExamDynamicQuestion randomQuestion={questionFractionToBinary} />
    </Stack>
  );
}

function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function questionFractionToBinary() {
  const shift = randInt(1, 4);
  const d = 1 << shift;
  const n = randInt(d, 31) + 1;
  const bits = n.toString(2);
  const dotIdx = bits.length - shift;
  const answer = `${bits.slice(0, dotIdx)}.${bits.slice(
    dotIdx,
    Math.max(bits.lastIndexOf("1"), dotIdx) + 1
  )}`;

  return {
    description: `Convert the fractional value ${n}/${d} into binary. Your answer should consist only of the characters 1, 0, and the binary point ('.'). You should have no leading 0s.`,
    answer: answer,
    hint: `Answer: ${answer}`,
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
    hint: `Answer: ${answer}`,
  };
}

function ExamDynamicQuestion({ randomQuestion }) {
  const [question, setQuestion] = useState({});

  useEffect(() => {
    setQuestion(randomQuestion());
  }, []);

  return (
    <ExamQuestion onRandomize={() => setQuestion(randomQuestion())} number={""}>
      <ExamQuestion.Body>
        <p>{question.description}</p>
        <ExamQuestion.Answer
          correctAnswer={question.answer}
        ></ExamQuestion.Answer>
        <ExamQuestion.HintToggle />
      </ExamQuestion.Body>
      <ExamQuestion.Hint answer={question.answer}>
        {question.hint}
      </ExamQuestion.Hint>
    </ExamQuestion>
  );
}
