import React, { useState } from 'react';
import { Grid,Paper, Avatar, TextField, Button, Typography,Link } from '@mui/material'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { useNavigate } from 'react-router-dom'
const Login=()=>{
    const [value, setValue] = useState(0);

    const paperStyle={padding :20,height:'73vh',width:300, margin:"0 auto"}
    const avatarStyle={backgroundColor:'#1bbd7e'}
    const btnstyle={margin:'8px 0'}
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [error, setErrorMessage] = useState('');
    const navigate = useNavigate();
    const doLogin = async () => {
        
        
        if (!email) { 
            setErrorMessage('Mohon isi password'); 
            return; 
        }
        try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts/10', {
            method: 'GET',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })

        if (response.ok) { 
            const userData = await response.json();        
            if (userData.username === username){
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


    //     const response = await fetch('https://jsonplaceholder.typicode.com/posts/10', {
    //         method: 'POST',
    //         body: JSON.stringify({
    //             username: username,
    //             password: password

    //         }),
    //         headers: {
    //             'Content-type': 'application/json; charset=UTF-8',
    //         },
    //     })

    //     const res = await response.json()
    //     alert(JSON.stringify(res))
    //     navigate('../crud')

    // };
    // navigate('../Profile')

    // const handlePasswordChange = (e) => {
    //     setPassword(e.target.value);
    //     setErrorMessage('');
    // };
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
                
    {error && <p style={{ color: 'red' }}>{error}</p>}
                <Button onClick={doLogin} type='submit' color='primary' variant="contained" style={btnstyle} fullWidth>Log in</Button>
                
            </Paper>
        </Grid>
        
    )
}

export default Login