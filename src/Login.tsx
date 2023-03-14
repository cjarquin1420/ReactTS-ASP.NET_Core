import React, { useState } from "react";
import axios, { AxiosError } from "axios";
import { makeStyles } from "@material-ui/core/styles";
import {
  Typography,
  Container,
  TextField,
  Button,
  Grid,
  Card,
  CardContent,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.palette.grey[100],
  },
  card: {
    minWidth: 300,
  },
  form: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  submitButton: {
    margin: theme.spacing(2, 0),
  },
  error: {
    color: theme.palette.error.main,
  },
}));

const Login: React.FC = () => {
  const classes = useStyles();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://localhost:7210/api/User/login", {
        username,
        password,
      });
      console.log(response.data);
      setError("");
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        const axiosErr = err as AxiosError<{ message?: string }>;
        setError(axiosErr.response?.data?.message ?? "Invalid username or password");
      } else {
        setError((err as Error).message ?? "Invalid username or password");
      }
    }
  };
  
  
  

  return (
    <div className={classes.root}>
      <Container maxWidth="xs">
        <Card className={classes.card}>
          <CardContent>
            <Typography variant="h4" align="center" gutterBottom>
              Login
            </Typography>
            <form className={classes.form} onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="username"
                    label="Username"
                    name="username"
                    autoComplete="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Grid>
                {error && (
                  <Grid item xs={12}>
                    <Typography variant="body1" className={classes.error}>
                      {error}
                    </Typography>
                  </Grid>
                )}
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submitButton}
                  >
                    Login
                  </Button>
                </Grid>
              </Grid>
            </form>
          </CardContent>
        </Card>
      </Container>
    </div>
  );
};

export default Login;
