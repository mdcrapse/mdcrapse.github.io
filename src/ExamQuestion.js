import react, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Accordion, Card } from "react-bootstrap";
import { Stack, Button, TextField } from "@mui/material";
import { useAccordionButton } from "react-bootstrap/AccordionButton";

export default function ExamQuestion({ children, onRandomize, number = 1 }) {
  return (
    <div>
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

ExamQuestion.Answer = function Answer({ correctAnswer }) {
  const [answer, setAnswer] = useState("");
  const [isCorrect, setIsCorrect] = useState(true);

  function onSubmit() {
    setIsCorrect(answer === correctAnswer);
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
      <Button type="button" onClick={onSubmit}>
        Check
      </Button>
    </Stack>
  );
};

ExamQuestion.HintToggle = function HintToggle() {
  return (
    <ContextAwareToggle eventKey="0">
      Stuck? Review related resources or use a hint.
    </ContextAwareToggle>
  );
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
  return (
    <Button
      style={buttonLikeLinkStyle}
      type="button"
      onClick={useAccordionButton(eventKey)}
    >
      {children}
    </Button>
  );
}
