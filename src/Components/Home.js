import React, { Component } from 'react';
import Card from './Card';
import axios from 'axios';
import './Home.css';

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
            this.setState({
                data: this.state.data.sort(function(a, b)
                {
                    return b.likes - a.likes
                })
            })
        }
        else if(sortby === 'comment') {
            this.setState({
                data: this.state.data.sort(function(a, b)
                {
                    return b.comments.length - a.comments.length
                })
            })
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
                <div className="flex-container">
                    {
                        filteredData.map((card,index)=>{
                    return <Card key={index} data={card}/>
                    })}
                </div>
            </div>
        );
    }
}

export default Home;