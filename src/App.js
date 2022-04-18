import { useState } from 'react';
import axios from "axios"
import './App.css';

function App() {
  const [loginInput, setLoginInput] = useState({email:"", password:""})
  const [showChangeForm, setShowChangeForm] = useState(false)
  const [problemText, setProblemText] = useState()

  function loginCheck(e){
    e.preventDefault()

    if(loginInput.email === process.env.REACT_APP_USERNAME && loginInput.password === process.env.REACT_APP_PASSWORD){
      setShowChangeForm(true)
    }
  }

  function changeLoginText(e){
    setLoginInput(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  function changeProblemText(e){
    setProblemText(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }


  function postProblem(e){
    e.preventDefault()
    axios.post(process.env.REACT_APP_APIURI, problemText)
    .then(() => {
      setProblemText()
    })

    document.getElementById('problemText1').value = ""
    document.getElementById('problemText2').value = ""
    document.getElementById('problemText3').value = ""
    document.getElementById('problemText4').value = ""

  }

  return (
    <div className="App">
      {!showChangeForm ? <h1>Login</h1> : <h1>Submit Puzzle</h1>}
      {!showChangeForm ? <form onSubmit={loginCheck}>
        <input onChange={changeLoginText} name="email" type="text" placeholder="email"></input>
        <input onChange={changeLoginText} name="password" type="text" placeholder="password"></input>

        <button type="submit">Submit</button>
      </form>
      : null}

      {showChangeForm ? <form className='post-container' onSubmit={postProblem}>
        <input required className='problem-input' id="problemText1" onChange={changeProblemText} name="e1" type="text" placeholder="Top Line"></input>
        <input required className='problem-input' id="problemText2" onChange={changeProblemText} name="e2" type="text" placeholder="Line"></input>
        <input required className='problem-input' id="problemText3" onChange={changeProblemText} name="e3" type="text" placeholder="Line"></input>
        <input required className='problem-input' id="problemText4" onChange={changeProblemText} name="e4" type="text" placeholder="Bottom Line"></input>


        <button className='submit-button' type="submit">Submit</button>
      </form>
      : null}
    </div>
  );
}

export default App;
