import { useState } from 'react'
import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom'
import Home from './pages/home'
import Login from './pages/login'
import Profile from './pages/profile'

import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { createTheme } from '@mui/material/styles'
import { themeSettings } from './theme'

function App() {
  const mode = useSelector((state) => state.mode) 
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode])
  const isLogged = Boolean(useSelector((state) => state.token))
  return (
    <div className="App">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline>
            <Routes>
              <Route path="/" element={<Login/>}/>
              <Route path="/home" element={isLogged ? <Home/> : <Navigate to="/"/> }/>
              <Route path="/profile/:user_id" element={isLogged ? <Profile/> : <Navigate to="/"/> }/>
            </Routes>
          </CssBaseline>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  )
}

export default App
