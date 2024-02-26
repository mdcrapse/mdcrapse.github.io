import react, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Accordion, Card } from "react-bootstrap";
import { Stack, Button, TextField } from "@mui/material";
import { useAccordionButton } from "react-bootstrap/AccordionButton";
import ConfettiExplosion from "react-confetti-explosion";

export default function ExamQuestion({ children, onRandomize, number = 1, id }) {
  return (
    <div id={id} style={{ maxWidth: "800px" }}>
      <Accordion className="accordion" defaultActiveKey="1">
        <Card>
          <Card.Header>
            Question {number}
            <Button type="button" onClick={onRandomize}>
              Randomize
            </Button>
          </Card.Header>
          {children}
        </Card>
      </Accordion>
    </div>
  );
}

ExamQuestion.Body = function Body({ children }) {
  return (
    <Card.Body>
      <Stack direction="column" gap={1}>
        {children}
      </Stack>
    </Card.Body>
  );
};

ExamQuestion.Answer = function Answer({ correctAnswer, onCorrect }) {
  const [answer, setAnswer] = useState("");
  const [isCorrect, setIsCorrect] = useState(false);

  function onSubmit() {
    const correct = answer === correctAnswer;
    setIsCorrect(correct);
    onCorrect(correct);
  }

  return (
    <Stack direction="row">
      <TextField
        value={answer}
        onChange={(e, value) => {
          setAnswer(e.target.value);
        }}
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            onSubmit();
          }
        }}
        fullWidth
        label="Answer"
        // helperText={isCorrect ? null : "Incorrect Answer"}
        error={!isCorrect}
      >
        Answer
      </TextField>
      <Button type="button" variant="outlined" color="primary" onClick={onSubmit}>
        Check
      </Button>
      {isCorrect ? <ConfettiExplosion force={0.4} duration={2200} particleCount={30} width={400} /> : null}
    </Stack>
  );
};

ExamQuestion.HintToggle = function HintToggle() {
  return <ContextAwareToggle eventKey="0">Stuck? Review related resources or use a hint.</ContextAwareToggle>;
};

ExamQuestion.Hint = function Hint({ children, answer }) {
  return (
    <Accordion.Collapse eventKey="0">
      <Card.Footer>
        {children} <br /> The correct answer is {answer}
      </Card.Footer>
    </Accordion.Collapse>
  );
};

const buttonLikeLinkStyle = {
  alignSelf: "flex-start",
  background: "none!important",
  border: "none",
  padding: "0!important",
  /*optional*/
  fontFamily: "arial, sans-serif",
  /*input has OS specific font-family*/
  color: "#069",
  // textDecoration: "underline",
  cursor: "pointer",
  fontSize: "75%",
};

/**
 * Represents the button that triggers the accordion component opening or closing.
 */
function ContextAwareToggle({ children, eventKey }) {
  const accordion = useAccordionButton(eventKey);

  return (
    <Button style={buttonLikeLinkStyle} type="button" onClick={accordion}>
      {children}
    </Button>
  );
}
