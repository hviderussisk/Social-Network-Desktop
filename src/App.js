import React from 'react';
import './App.sass';
import Container from './container/container';
import { BrowserRouter} from 'react-router-dom'
import Header from './header/header';
import MainContainer from './container/main_FOLDER/mainCONTAINER';

function App(props) {
  let sessionAuth = props.state.profilePage.session
    if(!sessionAuth && props.state.auth.authError === "Unauthorized"){
      return (
        <div className="App padding_has_left_panel padding_has_right_panel">
          <div className="container">
            <MainContainer/>
          </div>
        </div>
       );
    }else if(!sessionAuth && JSON.stringify(props.state.auth.authError)==='{}'){
      return   <div className="App padding_has_left_panel padding_has_right_panel"></div> 
    }else if(sessionAuth){
      return (
        <BrowserRouter>
          <div className="App padding_has_left_panel padding_has_right_panel">
            <Header/>
            <div className="container">
              <Container/>
            </div>
          </div>
        </BrowserRouter>
      );
    }else{
      return (
        <div className="App padding_has_left_panel padding_has_right_panel">
          <div className="container">
            <MainContainer/>
          </div>
        </div>
       );
    }
}

export default App;
