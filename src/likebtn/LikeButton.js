import React, {Component} from 'react';
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import "./LikeButton.css"


class LikeButton extends Component{         //Created a like button component to add functionality to like buttons and 
                                            //to make sure like buttons of different cards don't conflict and 
                                            //to make code organised

    constructor()
    {
        super();
        this.state = {
            color: "black"
        }
    }

    likeClickHandler = () =>{
        if(this.state.color === "black"){
            this.setState({color: "red"})
        } else if (this.state.color === "red"){
            this.setState({color: "black"})
        }
    }


    render(){
        return(
            <div className = "like-icon">       {/* Made sure i gave a unique id to each like button so they dont collide*/}
                <FavoriteBorderOutlinedIcon id = {this.props.num}  className = {this.state.color} onClick = {this.likeClickHandler} />
            </div>
        )
    }
}

export default LikeButton;
