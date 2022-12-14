import { Button, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import Head from "next/head";
import login from "../utility/login.js";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase.js";
import FirebaseUploadForm from "../components/FirebaseUploadForm.js";

const artConfig = {
    category: "artwork",
    fields: [
        { name: "Title", type: "text", value: "" },
        {
            name: "Description",
            type: "text",
            value: "",
            multiline: true,
            rows: 4,
        },
        { name: "Year", type: "number", value: "" },
        { name: "Price", type: "number", value: "" },
        { name: "Medium", type: "text", value: "" },
    ],
};

const clothingConfig = {
    category: "clothing",
    fields: [
        { name: "Title", type: "text", value: "" },
        {
            name: "Description",
            type: "text",
            value: "",
            multiline: true,
            rows: 4,
        },
        { name: "Year", type: "number", value: "" },
        { name: "Price", type: "number", value: "" },
        { name: "Medium", type: "text", value: "" },
    ],
};

const Admin = () => {
    const [isAdmin, setIsAdmin] = useState(false);

    const handleSignIn = async () => {
        const user = await login();
        const userRef = doc(db, "users", user.uid);
        const task = await getDoc(userRef).then((response) => {
            setIsAdmin(response.data().admin);
        });
    };

    return (
        <>
            <Head>
                <title>Admin</title>
            </Head>
            <Typography variant="h1">Admin</Typography>
            <Box sx={{ padding: "4rem 0" }}>
                <Button variant="contained" onClick={handleSignIn}>
                    Sign in with google
                </Button>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                        <FirebaseUploadForm config={artConfig} />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <FirebaseUploadForm config={clothingConfig} />
                    </Grid>
                </Grid>
            </Box>
        </>
    );
};

export default Admin;
