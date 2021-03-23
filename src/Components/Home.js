import React, { Component } from 'react';
import Card from './Card';
import axios from 'axios';

class Home extends Component {
    constructor(props){
        super(props);
        this.state = {
            data: [],
            searchData: [],
            searchString: ""
        }
    }

    searchImage = (e) => {
        this.setState({
            searchString: e.target.value
        })
    }

    sortCards = (sortby) => {
        if(sortby === 'like') {

        }
        else if(sortby === 'comment') {

        }
    }


    componentDidMount(){
        axios.get(`https://raw.githubusercontent.com/Lokenath/MyRepo/master/Test/package.json`)
      .then(res => {
        const data = res.data.pics;
        this.setState({ 
            data: data, 
            searchData: data 
        });
      })
    }

    render() {
        const filteredData = this.state.data.filter(
            card => card.category.toLowerCase().indexOf(this.state.searchString.length>0?this.state.searchString.toLowerCase():this.state.searchString) !== -1,
        );
        return (
            <div>
                <button type="button" onClick={() => this.sortCards("like")} >Most Liked</button>
                <button type="button" onClick={() => this.sortCards("comment")} >Most Commented</button>
                <input type="text" id="searchimage" name='searchimage' onChange={(e)=> this.searchImage(e)} placeholder="Search Images..."></input>
                {
                    filteredData.map((card,index)=>{
                   return <Card key={index} id={card.id} category={card.category} comments={card.comments} likes={card.likes} url={card.url}/>
                })}
            </div>
        );
    }
}

export default Home;