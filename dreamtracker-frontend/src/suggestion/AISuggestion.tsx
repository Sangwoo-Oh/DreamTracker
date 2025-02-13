import {
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { getAISuggestedItems } from "../services/ai/ai.service";

interface Suggestion {
  suggest_id: number;
  title: string;
}

export default function AISuggestion() {
  const [windowOpen, setWindowOpen] = useState(false);
  const [goalNumber, setGoalNumber] = useState(0);
  const [occupation, setOccupation] = useState("");
  const [gender, setGender] = useState("");
  const [preferences, setPreferences] = useState("");
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [suggestionLoading, setSuggestionLoading] = useState(false);
  const [suggestionError, setSuggestionError] = useState("");

  const handleClick = () => {
    setWindowOpen(!windowOpen);
  };

  const handleClickAISuggestion = async () => {
    try {
      setSuggestionError("");
      setSuggestionLoading(true);
      const data = {
        numberOfItems: goalNumber,
        language: "Japanese",
        attributes: occupation + "、" + gender,
        preferences: preferences,
      };
      const response = await getAISuggestedItems(data);
      console.log(response);

      setSuggestions(response);
    } catch (error: unknown) {
      if (error instanceof Error) {
        setSuggestionError("The AI suggestion failed. Please try again later.");
        console.error("GetAISuggestedItems Error:", error.message);
      } else {
        console.error("Unexpected error", error);
      }
    } finally {
      setSuggestionLoading(false);
    }
  };

  return (
    <>
      <Button
        variant="outlined"
        color="primary"
        fullWidth
        onClick={handleClick}
      >
        AI suggestion {windowOpen ? "▲" : "▼"}
      </Button>
      {windowOpen && (
        <Box className="mb-6">
          <Box component="form" noValidate autoComplete="off">
            <TextField
              required
              fullWidth
              label="Number of goals"
              type="number"
              size="small"
              margin="normal"
              onChange={(e) => setGoalNumber(parseInt(e.target.value))}
            />
            <TextField
              required
              fullWidth
              size="small"
              label="Occupation"
              margin="normal"
              onChange={(e) => setOccupation(e.target.value)}
            />
            <TextField
              required
              fullWidth
              size="small"
              label="Gender"
              margin="normal"
              onChange={(e) => setGender(e.target.value)}
            />
            <TextField
              required
              fullWidth
              size="small"
              label="Preferences"
              margin="normal"
              onChange={(e) => setPreferences(e.target.value)}
            />
            {suggestionLoading ? (
              <div className="text-center">
                <CircularProgress />
              </div>
            ) : (
              <Button
                variant="contained"
                color="primary"
                fullWidth
                disabled={
                  goalNumber === 0 ||
                  occupation === "" ||
                  gender === "" ||
                  preferences === ""
                }
                onClick={handleClickAISuggestion}
              >
                Get suggestions
              </Button>
            )}
          </Box>
          <Box>
            {suggestionError && (
              <Typography color="error">{suggestionError}</Typography>
            )}
            {suggestions.length > 0 &&
              suggestions.map((suggestion) => (
                <Typography key={suggestion.suggest_id}>
                  {suggestion.title}
                </Typography>
              ))}
          </Box>
        </Box>
      )}
    </>
  );
}
