import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import './account.css';
import Avatar from '@mui/material/Avatar';
import { useState,  useEffect } from 'react';

function Account (props) {
    const [account, setAccount] = useState(null);
    console.log(props);

    useEffect(() => {
        const account = async () => {
            console.log("aaaa");
            setAccount(props.account);
        };
        account();
    },[]);

    return (
        <div className='center'>
            <Box
            sx={{
                display: 'flex',
                flexWrap: 'wrap',
                '& > :not(style)': {
                m: 1,
                width: 800,
                height: 300,
                },
            }}
            >
            <Paper elevation={0} >
                <Avatar src="/broken-image.jpg" />
                <div className='account-content'>
                    Name: Halo world
                    <br/>
                    Address: {account}
                    <br/>
                    Balance: 10 ETH
                </div>
            </Paper>
            </Box>
        </div>
    );
}

export default Account;