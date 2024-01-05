import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min'
import TriviaApp from './Components/TriviaApp'
import Navbar from './Components/Navbar'

function App () {
  return (
    <>
      <Navbar />
      <TriviaApp />
    </>
  )
}

export default App
