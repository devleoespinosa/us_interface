import { Box, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import GetUserStory from "../../FunctionResponse/getUS";


function UsComponent({idStory}) {

    const [story, setStory] = useState("")

    useEffect(()=>{
            const loadStory = async ()=>{
                setStory(await GetUserStory(idStory))
            }
            loadStory();
    },[])
    
    return(
        <>
            <Box sx={{display:'inline-block'}} >
                <Typography variant="h6" >User Story</Typography>
                <Typography variant="subtitle" sx={{color:'blue'}}>"{story}"</Typography>
            </Box>
        </>
    )
}

export default UsComponent;