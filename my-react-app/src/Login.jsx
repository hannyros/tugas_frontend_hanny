import React, { useState } from 'react';
import { Grid,Paper, Avatar, TextField, Button, Typography,Link } from '@mui/material'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { useNavigate } from 'react-router-dom'
const Login=()=>{
    const [value, setValue] = useState(0);

    const paperStyle={padding :20,height:'73vh',width:300, margin:"0 auto"}
    const avatarStyle={backgroundColor:'#0041ff'}
    const btnstyle={margin:'8px 0'}
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [error, setErrorMessage] = useState('');
    const navigate = useNavigate();
    const doLogin = async () => {
        
        
        if (!email || !username) { 
            setErrorMessage('Mohon Isi Password Anda'); 
            return; 
        }
        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/users/10', {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
              },
            });
      
            if (response.ok) {
              const userData = await response.json();
              if (userData.username === username) {
                navigate("/crud");
              } else {
                setErrorMessage('Username salah.');
              }
      
            } else {
              console.error('Autentikasi gagal');
              setErrorMessage('Terjadi kesalahan saat mencoba login.');
            }
          } catch (error) {
            console.error('Error:', error);
          }
      
        };
      
    return(
        <Grid>
            <Paper  style={paperStyle}>
            <br/><br/>
                <Grid align='center'>
                     <Avatar style={avatarStyle}><LockOutlinedIcon/></Avatar>
                    <h2>Log In</h2>
                </Grid>
                <TextField label='Username' placeholder='Enter username' value={username} onChange={(e) => setUsername(e.target.value)} fullWidth required/>
                <br/><br/>
                <TextField label='Email' placeholder='Enter email' value={email} onChange={(e) => setEmail(e.target.value)} fullWidth required/>
                <br/><br/>
                <Button onClick={doLogin} type='button' color='primary' variant="contained" style={btnstyle} fullWidth>Log in</Button>
                
                {error && <p style={{ color: 'red' }}>{error}</p>}
            </Paper>
        </Grid>
    )
}

export default Login