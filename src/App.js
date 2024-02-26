import react, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { createTheme, ThemeProvider } from "@mui/material";
import ExamQuestionnaire from "./ExamQuestionnaire";
import { MathJaxContext } from "better-react-mathjax";
import ExamOverview from "./ExamOverview";

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

  const [correct, setCorrect] = useState([]);

  return (
    <MathJaxContext>
      <ThemeProvider theme={theme}>
        <div className="container my-5" style={{ display: "flex", justifyContent: "center" }}>
          <div className="d-flex flex-column">
            <ExamQuestionnaire onCorrect={setCorrect} />
          </div>
        </div>
        <ExamOverview correct={correct} />
      </ThemeProvider>
    </MathJaxContext>
  );
}
