import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { LoginPage, Dashboard } from './pages'
import { useAppContext } from "./Context/CredentialsContext"


function App() {

  const [credentials, setCredentials] = useAppContext()

  const { isLogged } = credentials || false

  return (

    <BrowserRouter basename="/" >
      <Routes>
        {
          !isLogged
            ?
            <>
              <Route path="/login" element={<LoginPage />} />
              <Route path="*" element={<Navigate to="/login" />} />
            </>
            :
            <Route path="/*" element={<Dashboard />} />
        }

      </Routes>
    </BrowserRouter>
  )
}

export default App
