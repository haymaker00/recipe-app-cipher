import React, {Component} from 'react';
import './Home.css';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Modal from 'react-modal';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import FormHelperText from '@material-ui/core/FormHelperText';
import PropTypes from 'prop-types';
import RecipeCard from '../recipecards/RecipeCard';    //created a seperate component for recipe cards which take the data from the api and on import send the recipe cards for display on home.js
import AddRecipe from '../addrecipe/AddRecipe';


const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }
};

const TabContainer = function (props) {
    return (
        <Typography component="div" style={{ padding: 0, textAlign: 'center' }}>
            {props.children}
        </Typography>
    )
}

TabContainer.propTypes = {
    children: PropTypes.node.isRequired
}


class Home extends Component{         /*Created for the purpose of reusability in case we decide to make more pages */
    
    constructor() {
        super();
        this.state = {
            modalIsOpen: false,
            value: 0,
            usernameRequired: "dispNone",
            username: "",
            loginPasswordRequired: "dispNone",
            loginPassword: "",
            firstnameRequired: "dispNone",
            firstname: "",
            lastnameRequired: "dispNone",
            lastname: "",
            emailRequired: "dispNone",
            email: "",
            registerPasswordRequired: "dispNone",
            registerPassword: "",
            contactRequired: "dispNone",
            contact: "",
            registrationSuccess: false,
            clickValue : 0
        }
    }

    openModalHandler = () => {
        this.setState({
            modalIsOpen: true,
            value: 0,
            usernameRequired: "dispNone",
            username: "",
            loginPasswordRequired: "dispNone",
            loginPassword: "",
            firstnameRequired: "dispNone",
            firstname: "",
            lastnameRequired: "dispNone",
            lastname: "",
            emailRequired: "dispNone",
            email: "",
            registerPasswordRequired: "dispNone",
            registerPassword: "",
            contactRequired: "dispNone",
            contact: "",
            errorDisplay: "dispNone",
            recipes : null
        });
    }

    closeModalHandler = () => {
        this.setState({ modalIsOpen: false });
    }

    tabChangeHandler = (event, value) => {
        this.setState({ value });
    }

    loginHandler = async () =>{              
        let arr = ['a', 'b', 'c', 'd', 'e', 'f'] 
        let rand = Math.floor(Math.random()*6)                   //onCLicking the get recipes button,  we fetch the data using the input entered by user which we tracked continously using state.
        this.setState({...this.state, recipes:null, errorDisplay: "dispNone"})
        let url = "https://www.themealdb.com/api/json/v1/1/search.php?s="+ arr[rand];  
        let response = await fetch(url);                                                   //Used Fetch API to get data from mealdb api
        let data = await response.json();
        this.setState({...this.state, recipes: data.meals, greetingDisplay: "dispNone"})                  //Soon as we hit search, the greeting message disappears

        if (data.meals=== null || this.state.searchInput === ""){                          // if api call doesnt get the data or if the user didnt input anything, error message is displayed
            this.setState({...this.state, errorDisplay: "DispBlock", recipes: null});
        }

    }

    loginClickHandler = () => {
        this.state.username === "" ? this.setState({ usernameRequired: "dispBlock" }) : this.setState({ usernameRequired: "dispNone" });
        this.state.loginPassword === "" ? this.setState({ loginPasswordRequired: "dispBlock" }) : this.setState({ loginPasswordRequired: "dispNone" });

        if (this.state.username!=="" && this.state.password!==""){
            this.setState({
                ...this.state,
                loggedIn: true
            });
            this.loginHandler();
            this.closeModalHandler();
        }

        


        
    };


    

    inputUsernameChangeHandler = (e) => {
        this.setState({ username: e.target.value });
    }

    inputLoginPasswordChangeHandler = (e) => {
        this.setState({ loginPassword: e.target.value });
    }

    registerClickHandler = () => {

        this.state.firstname === "" ? this.setState({ firstnameRequired: "dispBlock" }) : this.setState({ firstnameRequired: "dispNone" });
        this.state.lastname === "" ? this.setState({ lastnameRequired: "dispBlock" }) : this.setState({ lastnameRequired: "dispNone" });
        (this.state.email === "" || !this.state.email.includes("@")) ? this.setState({ emailRequired: "dispBlock" }) : this.setState({ emailRequired: "dispNone" });
        this.state.registerPassword === "" ? this.setState({ registerPasswordRequired: "dispBlock" }) : this.setState({ registerPasswordRequired: "dispNone" });
        this.state.contact === "" ? this.setState({ contactRequired: "dispBlock" }) : this.setState({ contactRequired: "dispNone" });
        this.setState({
                    registrationSuccess: true
                })
            
    }
        
    
    inputFirstNameChangeHandler = (e) => {
        this.setState({ firstname: e.target.value });
    }

    inputLastNameChangeHandler = (e) => {
        this.setState({ lastname: e.target.value });
    }

    inputEmailChangeHandler = (e) => {
        this.setState({ email: e.target.value });
    }

    inputRegisterPasswordChangeHandler = (e) => {
        this.setState({ registerPassword: e.target.value });
    }

    inputContactChangeHandler = (e) => {
        this.setState({ contact: e.target.value });
    }

    logoutHandler = (e) => {



        this.setState({
            loggedIn: false
        });
        window.location.reload(false);
    } 

    addHandler = () =>{
        this.setState({...this.state, clickValue: this.state.clickValue+1})
    }
    
    
    render(){
        return(
            <div>
                <div className = "heading">
                    <Typography variant = "h2" style = {{fontWeight: 'bold'}}>The Recipe App</Typography>       {/*Added a Bold title at the top of the web page as asked */}
                </div>
                <div className = "flex-container">
                    {!this.state.loggedIn ?
                            <div className="login-button">
                                <Typography variant ="h4"  style ={{textAlign:'center', marginTop: 16, fontWeight: 'bold'}}component = "div"><span>Login or Sign Up to see your recipes</span></Typography>
                                <button className = "btn" style ={{textAlign:'center', marginTop: 16}} onClick = {this.openModalHandler} >Login / SignUp</button>

                            </div>
                            :
                            <div className="login-button">
                                <Typography variant ="h4"  style ={{textAlign:'center', marginTop: 16, fontWeight: 'bold'}}component = "div"><span>{`Welcome! ${this.state.username}. You can Browse your Recipes below.`}</span></Typography>
                                <div>
                                    <button className = "btn" style ={{textAlign:'center', marginTop: 16}} onClick = {this.logoutHandler} >Logout</button>
                                </div>
                                <button className = "btn" style ={{textAlign:'center', marginTop: 16}} onClick = {this.addHandler} >Add Recipe</button>

                            </div>
                        }
                </div>


                <Modal
                    ariaHideApp={false}
                    isOpen={this.state.modalIsOpen}
                    contentLabel="Login"
                    onRequestClose={this.closeModalHandler}
                    style={customStyles}
                >
                    <Tabs className="tabs" value={this.state.value} onChange={this.tabChangeHandler}>
                        <Tab label="Login" />
                        <Tab label="Register" />
                    </Tabs>

                    {this.state.value === 0 &&
                        <TabContainer>
                            <FormControl required>
                                <InputLabel htmlFor="username">Username</InputLabel>
                                <Input required = {true} id="username" type="text" username={this.state.username} onChange={this.inputUsernameChangeHandler} />
                                <FormHelperText className={this.state.usernameRequired}>
                                    <span className="red">required</span>
                                </FormHelperText>
                            </FormControl>
                            <br /><br />
                            <FormControl required>
                                <InputLabel htmlFor="loginPassword">Password</InputLabel>
                                <Input required = {true} id="loginPassword" type="password" loginpassword={this.state.loginPassword} onChange={this.inputLoginPasswordChangeHandler} />
                                <FormHelperText className={this.state.loginPasswordRequired}>
                                    <span className="red">required</span>
                                </FormHelperText>
                            </FormControl>
                            <br /><br />
                            {this.state.loggedIn === true &&
                                <FormControl>
                                    <span className="successText">
                                        Login Successful!
                                    </span>
                                </FormControl>
                            }
                            <br /><br />
                            <Button variant="contained" color="primary" onClick={this.loginClickHandler}>LOGIN</Button>
                        </TabContainer>
                    }

                    {this.state.value === 1 &&
                        <TabContainer>
                            <FormControl required>
                                <InputLabel htmlFor="firstname">First Name</InputLabel>
                                <Input id="firstname" type="text" firstname={this.state.firstname} onChange={this.inputFirstNameChangeHandler} />
                                <FormHelperText className={this.state.firstnameRequired}>
                                    <span className="red">required</span>
                                </FormHelperText>
                            </FormControl>
                            <br /><br />
                            <FormControl required>
                                <InputLabel htmlFor="lastname">Last Name</InputLabel>
                                <Input id="lastname" type="text" lastname={this.state.lastname} onChange={this.inputLastNameChangeHandler} />
                                <FormHelperText className={this.state.lastnameRequired}>
                                    <span className="red">required</span>
                                </FormHelperText>
                            </FormControl>
                            <br /><br />
                            <FormControl required>
                                <InputLabel htmlFor="email">Email</InputLabel>
                                <Input  id="email" type="text" email={this.state.email} onChange={this.inputEmailChangeHandler} />
                                <FormHelperText className={this.state.emailRequired}>
                                    <span className="red">Not a Valid email</span>
                                </FormHelperText>
                            </FormControl>
                            <br /><br />
                            <FormControl required>
                                <InputLabel htmlFor="registerPassword">Password</InputLabel>
                                <Input id="registerPassword" type="password" registerpassword={this.state.registerPassword} onChange={this.inputRegisterPasswordChangeHandler} />
                                <FormHelperText className={this.state.registerPasswordRequired}>
                                    <span className="red">required</span>
                                </FormHelperText>
                            </FormControl>
                            <br /><br />
                            <FormControl required>
                                <InputLabel htmlFor="contact">Contact No.</InputLabel>
                                <Input id="contact" type="number" contact={this.state.contact} onChange={this.inputContactChangeHandler} />
                                <FormHelperText className={this.state.contactRequired}>
                                    <span className="red">required</span>
                                </FormHelperText>
                            </FormControl>
                            <br /><br />
                            {this.state.registrationSuccess === true &&
                                <FormControl>
                                    <span className="successText">
                                        Registration Successful. Please Login!
                                      </span>
                                </FormControl>
                            }
                            <br /><br />
                            <Button variant="contained" color="primary" onClick={this.registerClickHandler}>REGISTER</Button>
                        </TabContainer>
                    }
                </Modal>


                <div>

                    {(this.state.clickValue >0)?
                        Array(this.state.clickValue).fill(0).map((item, index) => {
                            return (
                                <AddRecipe key = {`addedRecipeindex${index}`} num = {index} id = {`add${index}`} />
                            )}):
                        null
                    
                    }


                    {(this.state.recipes != null) &&            /*We check if the data returned by api is not null, then we send that data in the form of props to the recipeCard.js file*/
                    
                    this.state.recipes.map(recipe =>{           /* The dta recieved is an array. So we map that array and return a recipecard component for each index of the recipes array*/
                        let i =0;                               /*Defined this i to assign a different key and different attributes to each recipeCard */
                        i++
                        return (
                        <RecipeCard key = {recipe.idMeal + i} id = {recipe.idMeal +i} likeId = {i} recipe = {recipe}/>)

                    })
                    }

                </div>
            </div>


            
        )
    }
}

export default Home;


