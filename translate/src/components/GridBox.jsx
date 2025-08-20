import React from "react";
import {
  Grid,
  Box,
  Typography,
  Button,
  Stack,
  TextField,
  IconButton,
  Select,
  MenuItem,
  FormControl,
} from "@mui/material";
import allLanguages from "./Languages";
import VolumeUpIcon from "@mui/icons-material/VolumeUp"; 
import ContentCopyIcon from "@mui/icons-material/ContentCopy"; 

const GridBox = ({
  activeLanguage,
  handleLanguageSelection,
  selectedLanguage,
  isEnglishOrFrench,
  handleInputChange,
  count,
  isCopied,
  handleTranslation,
  speak,
  handleCopy,
  input,
}) => {
  return (
    <Grid size={{ xs: 12, md: 6 }}>
      <Box
        sx={{
          p: 3,
          width: { xs: "100%", sm: "100%" },
          minHeight: "250px",
          backgroundColor: "#222636",
          color: "white",
          borderRadius: "12px",
          boxShadow: 6,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            alignItems: { xs: "flex-start", sm: "center" },

            mb: 2,
            pl: 2,
            pb: 2,
            gap: 4,
            borderBottom: "1px solid #424863ff",
            fontSize: "12px",
          }}
        >
          <Typography variant="body1" sx={{ color: "white", fontSize: "16px" }}>
            Detect Language
          </Typography>
          <Stack
            direction="row"
            variant="text"
            aria-label="language selection"
            sx={{ gap: 3 }}
          >
            <Button
              sx={{
                color: "white",
                fontSize: "15px",
                textTransform: "none",
                backgroundColor:
                  activeLanguage === "en" ? "#475569" : "transparent",
                borderRadius: activeLanguage === "en" ? "8px" : "0",
                borderColor: "#475569",
              }}
              onClick={() => handleLanguageSelection("en")}
              value="en"
            >
              English
            </Button>
            <Button
              sx={{
                color: "white",
                fontSize: "15px",
                textTransform: "none",
                backgroundColor:
                  activeLanguage === "fr" ? "#475569" : "transparent",
                borderRadius: activeLanguage === "fr" ? "8px" : "0",
                borderColor: "#475569",
              }}
              onClick={() => handleLanguageSelection("fr")}
              value="fr"
            >
              French
            </Button>
            <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
              <Select
                labelId="language-select-label"
                id="language-select"
                value={selectedLanguage}
                onChange={(event) =>
                  handleLanguageSelection(event.target.value)
                }
                variant="standard"
                sx={{
                  color: "white",
                  fontSize: "15px",
                  width: "100px",
                  padding: "0 6px",
                  backgroundColor: !isEnglishOrFrench(activeLanguage)
                    ? "#475569"
                    : "",
                  borderRadius: !isEnglishOrFrench(activeLanguage)
                    ? "8px"
                    : "0",

                  // Target the standard variant's underline for white color
                  "& .MuiInputBase-root:before": {
                    // Default state underline
                    borderBottomColor: "white !important",
                  },
                  "& .MuiInputBase-root:after": {
                    // Focused state underline
                    borderBottomColor: "white !important",
                  },
                  // Ensure the dropdown arrow icon is white
                  "& .MuiSelect-icon": {
                    color: "white",
                  },
                  borderColor: "transparent",
                }}
                MenuProps={{
                  PaperProps: {
                    sx: {
                      backgroundColor: "white",
                      color: "black",
                    },
                  },
                }}
              >
                {/* Map over allLanguages to create MenuItem components */}
                {allLanguages.map((language) => (
                  <MenuItem
                    key={language.id}
                    value={language.id}
                    sx={{
                      color: "#333",
                      "&.Mui-selected": {
                        backgroundColor: "rgba(0, 0, 0, 0.1)",
                        color: "#333",
                      },

                      "&:hover": {
                        backgroundColor: "rgba(0, 0, 0, 0.05)",
                      },
                    }}
                  >
                    {language.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Stack>
        </Box>

        {/* Text Input Area */}
        <TextField
          multiline
          rows={4}
          placeholder="Hello, how are you?"
          variant="standard"
          onChange={handleInputChange}
          value={input}
          InputProps={{
            disableUnderline: true, // Remove the default underline
            sx: { color: "white", fontSize: "1.1rem" },
          }}
          sx={{
            flexGrow: 1,
            mb: 2,

            "& .MuiInputBase-root": {
              padding: "8px",
            },
          }}
        />

        {/* Bottom section: Character Count and Action Buttons */}

        <Typography
          variant="caption"
          sx={{ color: "#94A3B8", textAlign: "right", paddingBottom: "5px" }}
        >
          {count}/500
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mt: "auto",
          }}
        >
          <Box sx={{ display: "flex", gap: 1 }}>
            <IconButton
              sx={{ color: "#94A3B8" }}
              onClick={() => speak({ text: input })}
            >
              <VolumeUpIcon />
            </IconButton>
            <IconButton
              sx={{ color: "#94A3B8" }}
              onClick={() => handleCopy(input, "input")}
            >
              <ContentCopyIcon />
            </IconButton>
            {isCopied && (
              <Typography
                variant="caption"
                sx={{ color: "#94A3B8", fontSize: "14px" }}
              >
                Copied!
              </Typography>
            )}
          </Box>

          <Button
            variant="contained"
            onClick={handleTranslation}
            sx={{
              border: "2px solid #4763beff",
              backgroundColor: "#263ea8",
              fontSize: "12px",
              padding: "8px 24px",
              borderRadius: "10px",
            }}
          >
            Translate
          </Button>
        </Box>
      </Box>
    </Grid>
  );
};

export default GridBox;
