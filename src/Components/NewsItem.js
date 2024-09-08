import React, { Component } from 'react'

export class NewsItem extends Component {
  
  render() {
    const { title, description,imageUrl,newsUrl } = this.props;
    return (
      <div>
        <div className="card" style={{width: "18rem"}}>
        <img src={!imageUrl ? "https://media.istockphoto.com/id/1311148884/vector/abstract-globe-background.jpg?s=1024x1024&w=is&k=20&c=-AdIwLn-nIYlgctc95CZuJHnkku_ia-f8A8m2LFwl2A=" : imageUrl} className="card-img-top" alt="..."/>
  <div className="card-body">
    <h5 className="card-title">{title}</h5>
    <p className="card-text">{description}</p>
    <a href={newsUrl} className="btn btn-outline-primary ">Read More</a>
  </div>
</div>
      </div>
    )
  }
}

export default NewsItem