import React, {Component} from 'react';
import Home from '../home/Home';
import "./App.css";





class App extends Component{
    
    constructor()
    {
        super();
        this.state = {
            greetingDisplay : "dispBlock",   // states of the greeting message which displays when the page loads
            errorDisplay: "dispNone",   
            loginDisplay: "dispNone",     // states for the error message which displays when error occurs in api results
            modalDisplay: "dispNone",
            userName: "",    
            recipes: null
        }
        
    }


    

    render(){
        return (
            <div>
                <Home />                                          {/*imported the header file which contains the heading of the page. Purpose is to reuse it if we decide to create more pages*/}
            </div>
        )
    }
}

export default App;