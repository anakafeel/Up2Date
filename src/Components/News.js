import React, { Component } from "react";
import NewsItem from "./NewsItem";

export class News extends Component {


  /* METHOD - 1 -> COMPONENT DID MOUNT */
  constructor(){
    super()
    this.state = {
      articles: [],
      loading: true,
      page:1
    }
  }

  async componentDidMount(){
    let url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=f24cdd8716d14d5baca39eaa037aae25&page=1&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    let jsondata = await data.json();
    console.log(jsondata);
    this.setState({articles: jsondata.articles, totalArticles: jsondata.totalResults})
  }
 
  nextpagehandler= async ()=>{
    console.log("Next");
    if(this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)){

    }else{

      let url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=f24cdd8716d14d5baca39eaa037aae25&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
      let data = await fetch(url);
      let jsondata = await data.json();
      console.log(jsondata);
      this.setState({
        page: this.state.page + 1,
        articles: jsondata.articles
      })
    }

  }

  previouspagehandler= async ()=>{
    console.log("Previous")
    let url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=f24cdd8716d14d5baca39eaa037aae25&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    let jsondata = await data.json();
    console.log(jsondata);
    this.setState({
      page: this.state.page - 1,
      articles: jsondata.articles
    })
  }

  render() {
    return (
      <div className="container my-3">
        <h2 className ="text-center">Up2Date Top Recent Headlines: </h2>
        <div className="row">
          {this.state.articles.map((element)=>{
            return <div className="col-md-3" key={element.url}>
            <NewsItem title={element.title?element.title:""} description={element.description?element.description:""} imageUrl ={element.urlToImage} newsUrl={element.url} />
          </div>
          })}
        </div>
        <div className="container d-flex justify-content-end ">
        <button disabled ={this.state.page<=1} type="button" className="btn btn-outline-danger btn-lg mx-2 my-2" onClick={this.previouspagehandler}>Previous Page</button> 
        <button type="button" disabled ={this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)} className="btn btn-outline-primary btn-lg my-2" onClick={this.nextpagehandler}>Next Page</button>
        </div>
      </div>
    );
  }
}

export default News;
