import { Box, Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, TextField, Button, Divider } from "@mui/material";
import React, { useState } from "react";
import { SetUsParameters } from "../../FunctionResponse/setUS";
  
const checkpointsList = [
  "Well-formed",
  "Atomic",
  "Minimal",
  "Conceptually sound",
  "Problem-oriented",
  "Unambiguos",
  "Conflict-free",
  "Full sentence",
  "Estimable",
  "Unique",
  "Uniform",
  "Independent",
  "Complete",
];
  
function FormComponent({idStory}) {
    const [checkpoints, setCheckpoints] = useState(
      checkpointsList.reduce((acc, key) => ({ ...acc, [key]: false }), {})
    );
    
    const [userStory, setUserStory] = useState("");
    const [isCorrect, setCorrect] = useState(false);
  
    const handleCheckboxChange = (event) => {
      setCheckpoints((prev) => ({
        ...prev,
        [event.target.name]: event.target.checked,
      }));
    };

    const handleCheckboxUs = (event) => {
      setCorrect(event.target.checked)
    }
  
    const isAnyChecked = Object.values(checkpoints).some((value) => value);
  
    const handleSubmit = async () => {
      const selectedCheckpoints = Object.entries(checkpoints)
      .filter(([_, value]) => value)
      .map(([key]) => key);
      
      const payload = {
        selectedCheckpoints: isCorrect? [] : selectedCheckpoints ,
        userStory: isCorrect? "" : userStory,
        isCorrect: isCorrect
      };

      await SetUsParameters(payload, idStory)
    };
  
    return (
      <Box sx={{ width: "90%" }}>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <FormControl sx={{ width: "90%" }}>
            <FormLabel component="legend">Quality criterion not met</FormLabel>
            <FormGroup>
              {checkpointsList.map((label) => (
                <FormControlLabel
                  key={label}
                  control={
                    <Checkbox
                      name={label}
                      checked={checkpoints[label]}
                      onChange={handleCheckboxChange}
                      disabled={isCorrect}
                    />
                  }
                  label={label}
                />
              ))}
              <Divider sx={{backgroundColor:'#1976d2'}} />
              {
                !isAnyChecked? 
                <FormControlLabel
                sx={{color:'#1976d2'}}
                key={"correct_us"}
                control={
                  <Checkbox
                  name="User Story"
                  onChange={handleCheckboxUs}
                  />
                }
                label="The User Story is correct"
              />:<></>
              }
            </FormGroup>
  
            {isAnyChecked && (
              <>
                <TextField
                  id="standard-multiline-flexible"
                  label="Correct User Story"
                  multiline
                  rows={4}
                  value={userStory}
                  onChange={(e) => setUserStory(e.target.value)}
                  sx={{ marginTop: "1rem" }}
                />
                
              </>
            )}
            <Button
              variant="contained"
              color="primary"
              sx={{ marginTop: "1rem", width: "fit-content" }}
              onClick={handleSubmit}
            >
              Enviar
            </Button>
          </FormControl>
        </Box>
      </Box>
    );
}
  
export default FormComponent;
  