import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Stack,
  TextField,
  IconButton,
  Grid,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import VolumeUpIcon from "@mui/icons-material/VolumeUp"; 
import ContentCopyIcon from "@mui/icons-material/ContentCopy"; 
import SwapHorizontalCircleOutlinedIcon from "@mui/icons-material/SwapHorizontalCircleOutlined";
import allLanguages from "./Languages";
import { useSpeechSynthesis } from 'react-speech-kit';


const Container = () => {
  const [selectedLanguage, setSelectedLanguage] = useState("es");
  const [activeLanguage, setActiveLanguage] = useState("en");

  const [selectedLanguage2, setSelectedLanguage2] = useState("es");
  const [activeLanguage2, setActiveLanguage2] = useState("en");

  const handleLanguageSelection = (langId) => {
    setSelectedLanguage(langId); // Update the dropdown's value
    setActiveLanguage(langId); // Update the active visual state
    console.log(`Language selected: ${langId}`);
  };
  const handleLanguageSelection2 = (langId) => {
    setSelectedLanguage2(langId); // Update the dropdown's value
    setActiveLanguage2(langId); // Update the active visual state
    console.log(`Language selected: ${langId}`);
  };
  const isEnglishOrFrench = (langId) => langId === "en" || langId === "fr";

  //input
  const [input, setInput] = useState("");
  const [count, setCount] = useState(0);
  const [translatedText, setTranslatedText] = useState("");
  const handleInputChange = (event) => {
    setInput(event.target.value);
    setCount(event.target.value.length);
  };

  const translate = async () => {
    try {
      console.log("fetching translation");
      const encodedInput = encodeURIComponent(input);
      const langPair = `${activeLanguage}|${activeLanguage2}`;
      // Construct the URL with query parameters for GET request
      const apiUrl = `https://api.mymemory.translated.net/get?q=${encodedInput}&langpair=${langPair}`;
      console.log(`API URL: ${apiUrl}`); // Log the API URL for debugging
      const response = await fetch(apiUrl);
      console.log(`Response status: ${response.status}`); // Log the response status

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setTranslatedText(data.responseData.translatedText || '');
      console.log(data.responseData.translatedText);

      setInput('')
      setCount(0)
    } catch (error) {
      console.log(error);
    }
  };
  
  const handleTranslation = () => {
    translate();
  };

  //text to speech
  const { speak } = useSpeechSynthesis();
  //copy text
    const [isCopied, setIsCopied] = useState(false);
        const [isCopied2, setIsCopied2] = useState(false);
  const handleCopy = async (text, type) =>{
    try{
      await navigator.clipboard.writeText(text)
      if (type === 'input') {
        setIsCopied(true);
        
      }else if (type === 'translated') {
        setIsCopied2(true);
      }
      setTimeout(() => {
        setIsCopied(false)
        setIsCopied2(false)
      }, 2000);
    }catch (err) {
      console.error('Failed to copy text: ', err);
    }
    

  }
  //switch languages
  const handleSwitch = () =>{
     const currentSourceLang = activeLanguage;
    const currentTargetLang = activeLanguage2;
    const currentInputText = input;
    const currentTranslatedText = translatedText;

   
    setActiveLanguage(currentTargetLang);
    setActiveLanguage2(currentSourceLang );
    setSelectedLanguage(selectedLanguage2);
    setSelectedLanguage2(selectedLanguage);
    setInput(currentTranslatedText)
    setTranslatedText('')
    setCount(currentInputText.length)
   
  }
  return (
    <Grid
      container
      spacing={{ xs: 1, md: 2 }}
      sx={{
        width: { xs: '100%', md: '80%' },
        margin: 'auto',
        mt: { xs: 2, md: 0 },
        px: { xs: 2, md: 0 },
      }}
      className="absolute top-50 lg:left-33  "
    >
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
              flexWrap: 'wrap',
              mb: 2,
              pl: 2,
              pb: 2,
              gap: 4,
              borderBottom: "1px solid #424863ff",
              fontSize: "12px",
            }}
          >
            <Typography
              variant="body1"
              sx={{ color: "white", fontSize: "16px" }}
            >
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
              <IconButton sx={{ color: "#94A3B8" }} onClick={() => speak({ text: input })}>
                <VolumeUpIcon />
              </IconButton>
              <IconButton sx={{ color: "#94A3B8" }} onClick={() => handleCopy(input, 'input')}>
                <ContentCopyIcon />
              </IconButton>
              {isCopied && (
                <Typography variant="caption" sx={{ color: "#94A3B8" , fontSize: '14px'}}>
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
              flexWrap: 'wrap',
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
            <SwapHorizontalCircleOutlinedIcon fontSize="medium" onClick={handleSwitch}/>
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
              <IconButton sx={{ color: "#94A3B8" }} onClick={() => speak({ text: translatedText })}>
                <VolumeUpIcon />
              </IconButton>
              <IconButton sx={{ color: "#94A3B8" }} onClick={() => handleCopy(translatedText, 'translated')}>
                <ContentCopyIcon />
              </IconButton>
               {isCopied2 && (
                <Typography variant="caption" sx={{ color: "#94A3B8" , fontSize: '14px'}}>
                  Copied!
                </Typography>
              )}
            </Box>

            <Button
              variant="contained"
              onClick={() => setTranslatedText('')}
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
    </Grid>
  );
};

export default Container;
