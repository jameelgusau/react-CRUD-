import React, { Component } from 'react';
import { connect } from 'react-redux'
import { signIn, signOut } from './../actions'

class GoogleAuth extends Component {

    componentDidMount(){
        window.gapi.load('client:auth2',()=> {
        window.gapi.client.init({
            client_id: '796831732844-l3ggcns2p1nobnb82aorf8432jjm7iio.apps.googleusercontent.com',
                scope: 'profile email'
        }).then(()=>{
            this.auth = window.gapi.auth2.getAuthInstance()
            this.onAuthChange(this.auth.isSignedIn.get())
            this.auth.isSignedIn.listen(this.onAuthChange)
        })
        })
    }

    onAuthChange = (isSignedIn)=>{
        if(isSignedIn){
            this.props.signIn(this.auth.currentUser.get().getId())
        }else{
            this.props.signOut()
        }
    }

    onSignInClick =()=>{
        window.gapi.auth2.getAuthInstance().signIn()
    }

    onSignOutClick =()=>{
        window.gapi.auth2.getAuthInstance().signOut()
    }

    renderAuthButton(){
        if(this.props.isSignedIn === null){
            return null
        }else if(this.props.isSignedIn){
            return(
                <button onClick = {this.onSignOutClick} className='ui red google button'>
                    <i className= 'google icon'/>
                    sign out
                </button>
            )
        }else{
            return(
                <button onClick = {this.onSignInClick} className='ui red google button'>
                    <i className = 'google icon'/>
                    sign In with google
                </button>
            )
        }
    }
    render() {
        return (
            <div>
                {this.renderAuthButton()}
            </div>
        );
    }
}

const mapStateToProps =(state)=>{
    return { isSignedIn:state.auth.isSignedIn } 
}
export default connect(mapStateToProps, {
    signIn, signOut
})(GoogleAuth);