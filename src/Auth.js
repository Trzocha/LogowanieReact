import React, { Component } from 'react';

var firebase = require("firebase");

var config = {
   apiKey: "AIzaSyB9PQ1US0tCEzYlYvM74dAJnr6V_Sz4kOk",
   authDomain: "log-in-out-dd0b6.firebaseapp.com",
   databaseURL: "https://log-in-out-dd0b6.firebaseio.com",
   projectId: "log-in-out-dd0b6",
   storageBucket: "log-in-out-dd0b6.appspot.com",
   messagingSenderId: "160074762534"
 };
  firebase.initializeApp(config);

class Auth extends Component {

  login(event){
    const email = this.refs.email.value;
    const password = this.refs.password.value;

    const auth = firebase.auth();
    const promise = auth.signInWithEmailAndPassword(email,password);

    promise.then(user =>{
      var lout = document.getElementById("logout");
      var logIn = document.getElementById("logIn");
      var signUp = document.getElementById("signUp");

      lout.classList.remove('hide');
      logIn.classList.add('hide');
      signUp.classList.add('hide');
    });

    promise
    .then(user => {
      var okk = "Welcome in account "+ user.user.email;
      var err = "";
      this.setState({okk: okk});
      this.setState({err:err});
    });

    promise.catch(e=>{
      var err = e.message;
      console.log(err);
      this.setState({err: err});
    });
  }

  signup(){
    const email = this.refs.email.value;
    const password = this.refs.password.value;

    const auth = firebase.auth();
    const promise = auth.createUserWithEmailAndPassword(email,password);

    promise
    .then(user => {
      var okk = "You are sign upd "+ user.user.email;
      var err = "";
      firebase.database().ref('users/'+user.uid).set({
        email: user.user.email
      });
      console.log(user);
      this.setState({okk: okk});
      this.setState({err:err});
    });

    promise
    .catch(e =>{
      var err = e.message;
      console.log(err);
      this.setState({err:err});
    });
  }

  logout(){
    firebase.auth().signOut();
    var lout = document.getElementById("logout");
    var logIn = document.getElementById("logIn");
    var signUp = document.getElementById("signUp");

    lout.classList.add('hide');
    logIn.classList.remove('hide');
    signUp.classList.remove('hide');

    var okk = "Bye Bye, we will check you again;) ";
    this.setState({okk:okk});

  }

  constructor(props){
    super(props);

    this.state={
      err:"",
      okk:""
    };
    this.login = this.login.bind(this);
    this.signup = this.signup.bind(this);
    this.logout = this.logout.bind(this);
  }

  render() {
    return (
      <div id="elements">
          <input id="email" ref="email" type='email' placeholder="Enter your email"/><br/>
          <input id="pass" ref="password" type='password' placeholder="Enter your password"/><br/>
          <p id="red">{this.state.err}</p><br/>
          <p id="green">{this.state.okk}</p>
          <button onClick={this.login} id="logIn" className="">Log In</button>
          <button onClick={this.signup} id="signUp" className="">Sign Up</button>
          <button onClick={this.logout} id="logout" className="hide">Log out</button>

      </div>
    );
  }
}

export default Auth;
