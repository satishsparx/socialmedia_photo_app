import React, { Component } from 'react';
// import '../Styles/Card.scss';
import './Card.css';

class Card extends Component {
    constructor(props){
        super(props);
        this.state = {
            likes: props.data.likes,
            buttonLabel: "Like",
            comments: props.data.comments,
            comment: "",
            category: props.data.category
        }

    }
    likeHandle = () => {
        if(this.state.buttonLabel === 'Like'){
            this.setState({
                buttonLabel: "Unlike",
                likes: this.state.likes + 1
            })
        }
        else{
            this.setState({
                buttonLabel: "Like",
                likes: this.state.likes - 1
            })
        }
    }
    addComment = () => {
        if(this.state.comment !== ""){
            this.setState({
                comments: this.state.comments.concat(this.state.comment)
            })
        }
    }
    getComment = (e) => {
        this.setState({
            comment: e.target.value
        })
    }
    render() {
        return (
            <div>
                <img src={this.props.data.url} alt={this.props.data.category} width="230" height="160"/> <br/>
                    <span className="number">{this.state.likes}</span>
                    <span className="like"><a href="#" onClick={this.likeHandle}>{this.state.buttonLabel}</a></span>
                    <span className="category">{this.props.data.category}</span> 
                    <br/>
                    <input type="text" id={this.props.data.id} name={this.props.data.id} onChange={(e)=> this.getComment(e)} placeholder="Type your comment here..."></input>
                    <button type="button" onClick={this.addComment} >POST</button><br/>
                    <div className="temp">
                        {this.state.comments.map(comment => {
                            return <p className="hello">{comment}</p>
                        })}
                    </div>

            </div>
        );
    }
}

export default Card;