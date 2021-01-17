import React from 'react';
import { connect } from 'react-redux';
import Main from './main';

class mainCont extends React.Component {
    render() {
        return <Main authError={this.props.authError} syncErrors={this.props.syncErrors}/>
    }
}

let mapStateToProps = (state) => {
    return {
        authError: state.auth.authError,
        syncErrors: state
    }
}
let mapDispatchToProps = (dispatch) => {
    return {
       
        }
}

let mainContainer = connect(mapStateToProps, mapDispatchToProps)(mainCont)

export default mainContainer;