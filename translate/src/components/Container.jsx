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
import { useSpeechSynthesis } from "react-speech-kit";
import GridBox from "./GridBox";
import GridBox2 from "./GridBox2";

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
      setTranslatedText(data.responseData.translatedText || "");
      console.log(data.responseData.translatedText);

      setInput("");
      setCount(0);
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
  const handleCopy = async (text, type) => {
    try {
      await navigator.clipboard.writeText(text);
      if (type === "input") {
        setIsCopied(true);
      } else if (type === "translated") {
        setIsCopied2(true);
      }
      setTimeout(() => {
        setIsCopied(false);
        setIsCopied2(false);
      }, 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };
  //switch languages
  const handleSwitch = () => {
    const currentSourceLang = activeLanguage;
    const currentTargetLang = activeLanguage2;
    const currentInputText = input;
    const currentTranslatedText = translatedText;

    setActiveLanguage(currentTargetLang);
    setActiveLanguage2(currentSourceLang);
    setSelectedLanguage(selectedLanguage2);
    setSelectedLanguage2(selectedLanguage);
    setInput(currentTranslatedText);
    setTranslatedText("");
    setCount(currentInputText.length);
  };
  return (
    <Grid
      container
      spacing={{ xs: 1, md: 2 }}
      sx={{
        width: { xs: "100%", md: "85%" },
        margin: "auto",
        mt: { xs: 2, md: 0 },
        px: { xs: 2, md: 0 },
      }}
      className="absolute top-50 lg:left-25  "
    >
      <GridBox
        activeLanguage={activeLanguage}
        handleLanguageSelection={handleLanguageSelection}
        selectedLanguage={selectedLanguage}
        isEnglishOrFrench={isEnglishOrFrench}
        handleInputChange={handleInputChange}
        count={count}
        isCopied={isCopied}
        handleTranslation={handleTranslation}
        speak={speak}
        handleCopy={handleCopy}
        input={input}
      />
      <GridBox2
        activeLanguage2={activeLanguage2}
        selectedLanguage2={selectedLanguage2}
        handleLanguageSelection2={handleLanguageSelection2}
        handleSwitch={handleSwitch}
        isEnglishOrFrench={isEnglishOrFrench}
        isCopied2={isCopied2}
        handleCopy={handleCopy}
        translatedText={translatedText}
        setTranslatedText={setTranslatedText}
        speak={speak}
      />
    </Grid>
  );
};

export default Container;
