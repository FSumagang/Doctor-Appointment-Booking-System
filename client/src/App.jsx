import Signup from './Signup'
import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './Login'
import {CssBaseline, ThemeProvider} from "@mui/material"
import {createTheme} from "@mui/material/styles"
import { useSelector } from 'react-redux'
import {themeSettings} from "./assets/theme"
import {useMemo } from 'react'
import Layout from "./pages/components/Menu/Layout"
import DisplayDoctors from './DisplayDoctors'
import RequireAuth from './pages/components/hooks/requireAuth' 
import Profile from './pages/profile/Profile'
import AppointmentsTable from './pages/user/Appointments'
import AssistantsByDoctor from './pages/assistants/assistantsByDoctor'
import CreateAssistant from './pages/assistants/createAssistant'



const App = () => {


  const mode = useSelector((state) => state.global.mode)
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode])
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
        <Routes>
          <Route path='/Signup' element={<Signup />} />
          <Route path='/Login' element={<Login />} />

          <Route element={<Layout />}>
            <Route element={<RequireAuth allowedRoles={['patient', 'doctor', 'admin', 'assistant']} />}>
              <Route path='/profile' element={<Profile />} />
              <Route path='/Home' element={<DisplayDoctors />}/>
              <Route path='/appointments/list' element={<AppointmentsTable />} />
            </Route>


            <Route element={<RequireAuth allowedRoles={['doctor', 'admin']} />}>
              <Route path='/assistants' element={<AssistantsByDoctor />} />
              <Route path='/assistants/create' element={<CreateAssistant />} />
            </Route>


          </Route>

        </Routes>
    </ThemeProvider>
  )
}

export default App
