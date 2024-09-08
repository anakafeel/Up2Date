import React, { Component } from "react";
import NewsItem from "./NewsItem";

export class News extends Component {


  /* METHOD - 1 -> COMPONENT DID MOUNT */
  constructor(){
    super()
    this.state = {
      articles: [],
      loading: true
    }
  }

  async componentDidMount(){
    let url = "https://newsapi.org/v2/top-headlines?country=us&apiKey=f24cdd8716d14d5baca39eaa037aae25";
    let data = await fetch(url);
    let jsondata = await data.json();
    console.log(jsondata);
    this.setState({articles: jsondata.articles})
  }
 

  render() {
    return (
      <div className="container my-3">
        <h2>Up2Date Top Recent Headlines: </h2>
        <div className="row">
          {this.state.articles.map((element)=>{
            return <div className="col-md-4" key={element.url}>
            <NewsItem title={element.title?element.title:""} description={element.description?element.description:""} imageUrl ={element.urlToImage} newsUrl={element.url} />
          </div>
          })}
        </div>
      </div>
    );
  }
}

export default News;
