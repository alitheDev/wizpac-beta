import React, { useState, useEffect } from 'react'
import './Login.css'
import logo from '../../../Assets/Images/PACRA_logo.png'
import { Alert, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, Snackbar, TextField } from '@mui/material'
import { Visibility, VisibilityOff } from '@material-ui/icons'
import LoginIcon from '@mui/icons-material/Login';
import Account from '../../../API/Account'
import Auth from '../../../middleWare/Auth/Auth'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'



const index = (props) => {

    const history = useNavigate();

    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')
    const [sendingReq, setsendingReq] = useState(false)
    const [errorMessage, seterrorMessage] = useState(false)

    const Login = async (e) => {
        setsendingReq(true)
        e.preventDefault()
        const res = Account.LoginApi(email, password)
        res.then((value) => {
            setsendingReq(false)
            setemail(email)
            setpassword(password)

            if (value !== undefined && value.data.status == true) {
                localStorage.setItem('loggedIn', 'true')
                const username = value.data.user.name;
                const userID = value.data.user[1];
                localStorage.setItem('username', username)
                localStorage.setItem('userID', userID)
                Auth.login()
            }
            else
                seterrorMessage(true)

        })
        const image = Account.UserImageApi(email)
        image.then((value) => {
            setemail(email)
            if (value !== undefined || localStorage.getItem('loggedIn') == true) {
                const avatar_file = value.data.avatar_file;
                const departmentName = value.data.department;
                localStorage.setItem('userImage', avatar_file)
                localStorage.setItem('depName', departmentName)
                goToDashboard(departmentName)
            }
        })
    }

    const goToDashboard = (departmentName) => {
        if (departmentName == 9) {
            history('/Ratings')
        }
        else history('/pacra-wide')
        window.location.reload()
    }

    const [isHidden, setisHidden] = useState(true)
    const handleClickShowPassword = () => {
        setisHidden(!isHidden)
    };
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    return (
        <body className='themeContainer items_middle'>
            <div className='row w-100 mx-auto justify-content-center'>
                <form onSubmit={Login} className='col-12 min_height shadow_1 col-md-5 col-lg-4'>
                    <div className='my-auto p-3 mx-auto mx-md-5'>
                        <div className='text-center'>
                            <img src={logo} className="logo_size mx-auto" />
                            <h3 className='my-2 mx-auto fw-bold theme_text'>Login Here</h3>
                        </div>

                        <FormControl className='w-100 mt-3' variant="outlined">
                            <TextField
                                id="outlined-basic"
                                label="Email / Username"
                                name="user_id"
                                variant="outlined"
                                value={email}
                                autoFocus
                                required
                                onChange={(e) => { setemail(e.target.value) }} />
                        </FormControl>

                        <FormControl className='w-100 mt-3' variant="outlined">
                            <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-password"
                                type={!isHidden ? 'text' : 'password'}
                                name="user_password"
                                value={password}
                                required
                                onChange={(e) => { setpassword(e.target.value) }}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                        >
                                            {isHidden ? <VisibilityOff className='theme_text' /> : <Visibility className='theme_text' />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                label="Password"
                            />
                        </FormControl>
                        <button type='submit' className='button_'>
                            {sendingReq ? (
                                <div className='loader'></div>
                            ) : (
                                <>Log In<LoginIcon className='ms-2' /></>
                            )}
                        </button>
                        {errorMessage ?
                            // <div class="toast align-items-center" role="alert" aria-live="assertive" aria-atomic="true">
                            //     <div class="d-flex">
                            //         <div class="toast-body">
                            //             Wrong Credentials
                            //         </div>
                            //     </div>
                            // </div>
                                <Alert severity="error">Wrong Credentials</Alert>
                            :
                            null
                        }
                    </div>
                </form>
            </div>
        </body >
    )
}

export default index