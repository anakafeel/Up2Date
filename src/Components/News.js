import React, { Component } from "react";
import NewsItem from "./NewsItem";

export class News extends Component {
  render() {
    return (
      <div className="container my-3">
        <h2>Up2Date Recent Headlines</h2>
        <div className="row">
          <div className="col-md-4">
            <NewsItem title="My Title" description="My description" imageURL ="/" />
          </div>
          <div className="col-md-4">
            <NewsItem title="My Title" description="My description" imageURL ="/" />
          </div>
          <div className="col-md-4">
            <NewsItem title="My Title" description="My description" imageURL ="/" />
          </div>
        </div>
      </div>
    );
  }
}

export default News;
