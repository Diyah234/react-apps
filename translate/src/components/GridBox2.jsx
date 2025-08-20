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
import SwapHorizontalCircleOutlinedIcon from "@mui/icons-material/SwapHorizontalCircleOutlined";

const GridBox2 = ({
  activeLanguage2,
  selectedLanguage2,
  handleLanguageSelection2,
  handleSwitch,
  isEnglishOrFrench,
  isCopied2,
  handleCopy,
  translatedText,
  setTranslatedText,
  speak,
}) => {
  return (
    <Grid size={{ xs: 12, md: 6 }}>
      <Box
        sx={{
          p: 3, // Padding: 3 * 8px = 24px
          width: { xs: "100%", sm: "100%" },
          minHeight: "320px",
          backgroundColor: "#101624",
          color: "white",
          borderRadius: "12px",
          boxShadow: 6,
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Top section: Detect Language and Language Selection Buttons */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            alignItems: { xs: "flex-start", sm: "center" },
            flexWrap: "wrap",
            justifyContent: "space-between",

            mb: 2,
            pl: 2,
            pb: 1,
            gap: 4,
            borderBottom: "1px solid #424863ff",
            fontSize: "12px",
          }}
        >
          <Stack
            direction="row"
            variant="text"
            aria-label="language selection"
            sx={{ gap: 3, alignItems: "center" }}
          >
            <Button
              sx={{
                color: "white",
                fontSize: "15px",
                textTransform: "none",
                backgroundColor:
                  activeLanguage2 === "en" ? "#475569" : "transparent",
                borderRadius: activeLanguage2 === "en" ? "8px" : "0",
                borderColor: "#475569",
              }}
              onClick={() => handleLanguageSelection2("en")}
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
                  activeLanguage2 === "fr" ? "#475569" : "transparent", // Gray background when active
                borderRadius: activeLanguage2 === "fr" ? "8px" : "0", // Rounded corners when active
                borderColor: "#475569",
              }}
              onClick={() => handleLanguageSelection2("fr")}
              value="fr"
            >
              French
            </Button>
            <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
              <Select
                labelId="language-select-label"
                id="language-select"
                value={selectedLanguage2}
                onChange={(event) =>
                  handleLanguageSelection2(event.target.value)
                }
                variant="standard"
                sx={{
                  color: "white", // Color of the selected text in the dropdown input
                  fontSize: "15px",
                  width: "100px",
                  padding: "0 6px",
                  backgroundColor: !isEnglishOrFrench(activeLanguage2)
                    ? "#475569"
                    : "", // Gray background when active
                  borderRadius: !isEnglishOrFrench(activeLanguage2)
                    ? "8px"
                    : "0", // Rounded corners when active

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
                // Styles for the dropdown menu paper (the actual list of options)
                MenuProps={{
                  PaperProps: {
                    sx: {
                      backgroundColor: "white", // <-- Changed to WHITE background for the dropdown menu
                      color: "black", // Default text color for menu items (will be overridden by MenuItem sx)
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
                      color: "#333", // <-- Dark color for MenuItem text when not selected
                      // Styling for the selected item's background
                      "&.Mui-selected": {
                        backgroundColor: "rgba(0, 0, 0, 0.1)", // Slightly darker background for selected item
                        color: "#333", // Ensure text remains dark when selected
                      },
                      // Styling for hover effect
                      "&:hover": {
                        backgroundColor: "rgba(0, 0, 0, 0.05)", // Even lighter dark background on hover
                      },
                    }}
                  >
                    {language.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Stack>
          <SwapHorizontalCircleOutlinedIcon
            fontSize="medium"
            onClick={handleSwitch}
          />
        </Box>

        {/* Text Input Area */}
        <TextField
          multiline
          rows={4}
          placeholder="Hello, how are you?"
          value={translatedText}
          variant="standard" // Use standard variant for a simpler look
          InputProps={{
            disableUnderline: true, // Remove the default underline
            sx: { color: "white", fontSize: "1.1rem" }, // Text color and size
          }}
          sx={{
            flexGrow: 1, // Allow text field to grow and fill space
            mb: 2,
            "& .MuiInputBase-root": {
              padding: "8px", // Adjust padding inside the input area
            },
          }}
        />

        {/* Bottom section: Character Count and Action Buttons */}
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
              onClick={() => speak({ text: translatedText })}
            >
              <VolumeUpIcon />
            </IconButton>
            <IconButton
              sx={{ color: "#94A3B8" }}
              onClick={() => handleCopy(translatedText, "translated")}
            >
              <ContentCopyIcon />
            </IconButton>
            {isCopied2 && (
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
            onClick={() => setTranslatedText("")}
            sx={{
              border: "2px solid #4763beff",
              backgroundColor: "#263ea8",
              fontSize: "12px",
              padding: "8px 24px",
              borderRadius: "10px",
            }}
          >
            Clear
          </Button>
        </Box>
      </Box>
    </Grid>
  );
};

export default GridBox2;
