import React, { useEffect, useState } from "react";
import UsComponent from "../user-component";
import FormComponent from "../form-component";
import { Box, Container, Divider, Grid2, Paper, Typography, TextField, Button } from "@mui/material";
import {Login} from "../../FunctionResponse/setUS";

function GeneralComponent() {

    const [active, setActive] = useState(false)
    const [idStory, setStory] = useState(0)
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    useEffect(()=>{
        const loadUser = async ()=>{
            var login = localStorage.getItem("session")
            if (login === "activate") {
                const params = {
                    email: localStorage.getItem("email"),
                    password: localStorage.getItem("password")
                }
                setStory(await Login(params))
                setActive(true)
            }
        }

        loadUser();
    },[])

    const handleLogin = async (e) => {
        e.preventDefault();
        var id = await Login({email, password});
        if (id>0) {
            setStory(id)
            setActive(true)
            localStorage.setItem("email", email)
            localStorage.setItem("password", password)
            localStorage.setItem("session", "activate")
        }else{
            
        }
    };

    return (
        <>
            {
                active? 
                <Container>
                    <Box>
                        <Grid2 container>
                            <Grid2 size={12}>
                                <Box sx={{ display:'flex', justifyContent:'center', padding:'2rem'}}>
                                    <UsComponent idStory={idStory} />
                                </Box>
                                <Divider/>
                            </Grid2>
                            <Grid2 size={12}>
                                <Box sx={{ display:'flex', justifyContent:'center', padding:'2rem'}} >
                                <FormComponent idStory={idStory} />
                                </Box>
                            </Grid2>
                        </Grid2>
                    </Box>
                </Container>
                :
                <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
                <Paper elevation={3} sx={{ p: 4, width: 300 }}>
                    <Typography variant="h5" gutterBottom>
                    Iniciar Sesión
                    </Typography>
                    <form onSubmit={handleLogin}>
                    <TextField
                        label="Correo"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        fullWidth
                        margin="normal"
                        required
                    />
                    <TextField
                        label="Contraseña"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        fullWidth
                        margin="normal"
                        required
                    />
                    <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
                        Ingresar
                    </Button>
                    </form>
                </Paper>
                </Box>
            }
        </>
    )
}

export default GeneralComponent;