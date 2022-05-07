import { Typography }   from '@material-ui/core';
import React, {Component} from 'react';
import "./AddRecipe.css";
import recipe from "../common/recipe.jpg"
import LikeButton from "../likebtn/LikeButton"         //Like button will be imported from another file to make code clean and to make sure the file is not overcrowded with setState methods
import ContentEditable from 'react-contenteditable';


class AddRecipe extends Component{

    constructor(props)
    {
        
        super(props);
        this.state = {   
            heading: `Dish ${this.props.num +1} (Click to edit)`,
            category: "click to edit",
            area: "click to edit",
            ingredients: "click to edit",
            recipe: "click to edit",
            delete: false
                                       
        }
    }


    headingChange = (e) => {
        this.setState({heading: e.target.value})}

    categoryHandler = (e) => {
        this.setState({category: e.target.value})}

    areaHandler = (e) => {
        this.setState({area: e.target.value})}

    ingredientsHandler = (e) => {
        this.setState({ingredients: e.target.value})}

    recipeHandler = (e) => {
        this.setState({recipe: e.target.value})}

    deleteHandler = () => {
        this.setState({delete: true})}





    render(){
        return (
            <div>
                {!this.state.delete ? 
                <div className = "cardContainer" >
                                <div className = "card-header-container">  {/*Added heading with an achor tag which directs to the source url of the recipe provided by the api*/}
                                    <div className = "recipe-heading"  style = {{fontWeight: 'bold'}}><ContentEditable html={this.state.heading} disabled = {false} onChange={this.headingChange}/></div>
                                    <div className = "like-icon">    
                                        <LikeButton  id = {"like"+this.props.id} num = {this.props.id}/>    {/*Like button comonent is called here for a card */}
                                    </div>                               
                                </div>

                                <div className = "cardContent">
                                    <div className = "left">    {/*Created left right classes to divide the picture and content in a way that was required */}
                                        <img className = "pic"src = {recipe} alt = ""/>  {/*Used image from api data */}
                                    </div>
                                
                                    <div className = "right">   {/*Created left right classes to divide the picture and content in a way that was required */}
                                        <div className = "description">
                                            <div><span style = {{fontStyle: "italic"}}>Category of Meal - <ContentEditable html={this.state.category} disabled = {false} onChange = {this.categoryHandler}/></span></div>
                                            <div><span style = {{fontStyle: "italic"}}>Area of the Meal - <ContentEditable html={this.state.area} disabled = {false} onChange = {this.areaHandler}/></span></div>
                                        </div>
                                        <div>
                                            <Typography><span style = {{fontStyle: "italic"}}>Ingredients</span></Typography>
                                            <div className = "ingredients-container">
                                                <ContentEditable html={this.state.ingredients} disabled = {false} onChange = {this.ingredientsHandler}/>
                            
                                            </div>
                                            <div className = "recipe">          {/*We get recipe data from the api */}
                                                <Typography style = {{textAlign: 'center'}}><span style = {{fontStyle:"italic"}}>Recipe</span></Typography>
                                                <div className = "recipe-container">
                                                    <ContentEditable html = {this.state.recipe} disabled = {false} onChange = {this.recipeHandler}/>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                </div>: null}
            </div>
        )
    }

}

export default AddRecipe;
