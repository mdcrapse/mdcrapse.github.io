import react, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { AppBar, Toolbar } from "@mui/material";
import { Stack, IconButton, Typography, Grid, Button } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

export default function ExamOverview({ correct }) {
  const [open, setOpen] = useState(false);

  return (
    <AppBar color="primary" position="fixed" sx={{ top: "auto", bottom: 0 }}>
      <Toolbar variant="dense">
        <Stack direction="column" style={{ width: "100%" }}>
          <Stack direction="row" style={{ alignItems: "center", justifyContent: "center" }} gap={3}>
            <IconButton
              sx={{ alignSelf: "flex-start" }}
              color="inherit"
              aria-label="open drawer"
              type="button"
              onClick={() => setOpen(!open)}
            >
              <MenuIcon />
            </IconButton>
            <ExamResultStats correct={correct} />
          </Stack>
          {open ? <ExamResultCards correct={correct} /> : null}
          {/* I have given up on trying to make a nicely transitioning toolbar. */}
          {/* <Slide appear={false} direction="up" in={open}> */}
          {/* </Slide> */}
        </Stack>
      </Toolbar>
    </AppBar>
  );
}

function ExamResultStats({ correct }) {
  let numCorrect = 0;
  for (const isCorrect of correct) {
    if (isCorrect) {
      numCorrect += 1;
    }
  }

  return (
    <Typography>
      Correct Answers: {numCorrect}/{correct.length}
    </Typography>
  );
}

function ExamResultCards({ correct }) {
  return (
    <Grid
      container
      style={{ paddingBottom: "5px", alignItems: "center", justifyContent: "center", width: "100%" }}
      direction="row"
      justifyContent="flex-start"
      alignItems="flex-start"
    >
      {correct.map((isCorrect, index) => (
        <div style={{ margin: 3 }} key={`ExamResultCard:${index}`}>
          <Button
            variant="contained"
            color={isCorrect ? "success" : "error"}
            style={{ width: "50px", minWidth: "50px", height: "50px", minHeight: "50px" }}
            onClick={() => {
              // HACK: don't use `getElementById` directly in a React project
              const element = document.getElementById(`ExamQuestion:${index}`);
              if (element) {
                element.scrollIntoView({ behavior: "smooth" });
              }
            }}
          >
            {index + 1}
          </Button>
        </div>
      ))}
    </Grid>
  );
}
