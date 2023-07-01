import React, { useEffect, useState } from 'react';
import { Box, Button, Divider, TextField, Typography,  } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Brightness6, Close, LightModeOutlined, } from '@mui/icons-material';

const App = () => {
  const [mode, setmode] = useState(localStorage.getItem('moder') === null ? 'light' : localStorage.getItem('moder') === 'light' ? 'light' : 'dark');
  const darkTheme = createTheme({
    palette: {
      mode: mode,
    },
  });

  const ss = JSON.parse(localStorage.getItem('element'))

  const [arrayText , setarrayText] = useState(localStorage.getItem('element') ? ss : [])
  // const arrayText = localStorage.getItem('element') ? ss : []

  const creating = () => {
    const iText = document.querySelector('.inputText input')
    while(iText.value !== ''){
      console.log('not empty')

      // arrayText.push({
      //   id: Date.now(),
      //   text: iText.value
      // })

      setarrayText([...arrayText, {
        id: Date.now(),
        text: iText.value
      }])

      // localStorage.setItem('element', JSON.stringify(arrayText))

      // window.location.reload()

      iText.value = ''

      console.log(arrayText)
    }
  }

  useEffect(()=>{
    localStorage.setItem('element', JSON.stringify(arrayText))
    console.log('ray')
  },[arrayText])

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Box sx={{
        display: 'flex',
        justifyContent: 'center',
        gap: '30px',
        padding: '20px',
      }}>
        <TextField
        variant='outlined'
        sx={{
          width: '300px',
        }}
        label='Do To List '
        placeholder='Type Something to Add '
        autoComplete='off'
        className='inputText'
        />
        <Button 
        variant='contained' color='primary'
        onClick={()=> creating()}
        >
          Add
        </Button>
        <Button 
        variant='contained'
        color='secondary'
        onClick={()=>{
          localStorage.setItem('moder', darkTheme.palette.mode === 'light' ? 'dark' : 'light')
          setmode(darkTheme.palette.mode === 'light' ? 'dark' : 'light')
        }}
        >
        {
          mode === 'light' ? <Brightness6 sx={{ color: 'white' }} /> : <LightModeOutlined sx={{ color: 'white' }} />
        }
      </Button>
      </Box>
      <Divider />
        
      <div className='aniAll'>
        {
          arrayText.map((e,k)=>{
            return (
              <div key={k} className='aniEle' >
                <Box sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center' ,
                  padding: '20px',
                  gap: '20px',
                }}>
                  <Typography variant='h5' sx={{
                    flexGrow: '2'
                  }}>
                    {e.text}
                  </Typography>
                  <Button
                  color='error'
                  variant='contained'
                  onClick={()=>{
                    setarrayText(arrayText.filter((item)=> item.id !== e.id ))
                  }}
                  >
                    <Close />
                  </Button>
                </Box>
                <Divider/>
              </div>
            )
          })
        }
      </div>


    </ThemeProvider>
  );
}

export default App;
