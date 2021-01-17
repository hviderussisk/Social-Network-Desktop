import { CircularProgress } from '@material-ui/core';
import React from 'react';
import { connect } from 'react-redux';
import App from './App';
import { getDataUserAC } from './redux/profile-reducer';

class AppCont extends React.Component {
  
    componentWillMount(){
          this.props.getDataUser()
    }

    render() {
        return  <App state={this.props.state}/> 
    }
}

let mapStateToProps = (state) => {
    return {
        state: state
    }
}
let mapDispatchToProps = (dispatch) => {
    return {
      getDataUser: () =>{
        dispatch(getDataUserAC())
      }
    }
}
let AppContainer = connect(mapStateToProps, mapDispatchToProps)(AppCont)

export default AppContainer;
