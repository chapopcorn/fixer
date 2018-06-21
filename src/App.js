import React, { Component } from 'react';
import { Router, browserHistory, Route } from 'react-router';
import Firebase from '../src/config/firebase';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import landingPage from './landingPage.jpeg';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import Modal from 'react-modal';
import Navbar from './Navbar';
import Categories from './Categories'

class HomeCard extends React.Component {
  render() {
    return <div className="col-md-4"><h4>{this.props.title}</h4>
                <p>{this.props.text}</p>
            </div>;
  }
}

/*Modals*/
// var loginStatus;
Modal.setAppElement("#root")

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};





/*we can use default props to set the initial value of the jobs that load when the page opens*/







  

/*Pages*/


class Home extends React.Component {
  constructor() {
    super();

    this.state = {
      modalIsOpen: false,
      //loginStatus: false,
      email : '',
      password : '',
      reenterPassword : '',
      passwordMisMatch : false,
      error : null
    };this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleSignUp = this.handleSignUp.bind(this);
    this.handleInput = this.handleInput.bind(this);
  }
  

  openModal() {
    this.setState({modalIsOpen: true});
  }

  afterOpenModal() {
    // references are now sync'd and can be accessed.
    this.subtitle.style.color = '#f00';
  }

  closeModal() {
    this.setState({modalIsOpen: false});
  }
  signUpFunction(){
    
  }
  handleSignUp(){
    //var email ="asa@yahoo.com";
    //var password = "12345678";
    
    ((this.state.password === this.state.reenterPassword) && this.state.email !=="") ? 
    Firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
       var errorMessage = error.message;
      
      console.log(errorCode,errorMessage)
      // ...
    })
    
    : this.setState({
      passwordMisMatch : true
    })
    
  }
  handleInput(event){
    
      if(event.target.placeholder === 'email'){
        this.setState({
          email : event.target.value
        })
      }else if(event.target.placeholder === 'password'){
        this.setState({
          password : event.target.value,
          passwordMisMatch : false
        })
      }else if(event.target.placeholder === 're-enter password'){
        this.setState({
          reenterPassword : event.target.value,
          passwordMisMatch : false
        })
      }

    }
    componentWillUpdate(){
      console.log(this.props.title)
   } 
    


  render(){
   
    return <div>
        <div id="home">
    <Navbar title="Home" action={this.openModal}/>
    {/* <SignIn /> */}
         <Modal
           isOpen={this.state.modalIsOpen}
           onAfterOpen={this.afterOpenModal}
           onRequestClose={this.closeModal}
           style={customStyles}
           contentLabel="Example Modal"
         >
           <button onClick={this.closeModal}>close</button>
           <Button color="secondary" onClick={this.closeModal}>Sign In</Button>
           <h2 ref={subtitle => this.subtitle = subtitle}>Sign Up</h2>
           
          
           <form>
           <div class= "col mb-3">
                   <input type="email" value={this.state.email} onChange={this.handleInput}
                    class="form-control" required placeholder="email" />               
                 </div>
                 <div class="col mb-3">
                   <input type="text" value={this.state.password} onChange={this.handleInput}
                    class="form-control" placeholder="password" />               
                 </div>
                 <div class="col  mb-3">
                   <input type="text" value={this.state.reenterPassword} onChange={this.handleInput}
                    class="form-control" placeholder="re-enter password" />  
                    
                   {
                     (this.state.passwordMisMatch) ?  <p style={{color:"red"}}
                     >passwords did not match</p> : null
                    
                   }
                    {
                       (this.state.error) ? <p style={{color:"red"}}>{this.state.error}</p>: null
                    }
                           
                 </div>
                 
           </form>
           <div class="align-right">
           <button  type="submit" onClick={this.handleSignUp} >hello</button>
           </div>
   
           
         </Modal>  
         

  <div className="landingPageImage">
   <img src={landingPage} style={{width:"1520px"}} alt="landing page" />
  </div>
  {/*How it Works section*/}
  <div style={{textAlign:"center"}}>
    <h3 className="titles">How It Works</h3>
    <div className="row container-fluid">
   <HomeCard title="I want to get hired" text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."/>
   <HomeCard title="I want to hire someone" text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."/>
   <HomeCard title="I want to be a partner" text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."/>
    </div>
    
  </div>
  
  </div>

    </div>
  }
}

const About = (props) => (
  <Navbar title="About"/>
);


  
  
  



class App extends Component {
  render() {
    return (
      <Router history={browserHistory}>
        <Route path="/" component={Home}/>
        <Route path="/about" component={About}/>
        <Route path="/categories" component={Categories}/>
        <Route path="/login" component={Home}/>
      </Router>
    );
  }
}

export default App;