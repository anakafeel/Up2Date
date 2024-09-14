import React, { Component } from "react";
import NewsItem from "./NewsItem";
import { motion } from "framer-motion";
import Loading from "./Loading";
import PropTypes from 'prop-types'

export class News extends Component {
  static defaultProps ={
    country: 'us',
    pageSize: 8,
    category: 'general',
  }

  static propTypes ={
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  }

  /* METHOD - 1 -> COMPONENT DID MOUNT */
  constructor() {
    super();
    this.state = {
      articles: [],
      loading: true,
      page: 1,
    };
  }

  async componentDidMount() {
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=f24cdd8716d14d5baca39eaa037aae25&page=1&pageSize=${this.props.pageSize}`;
    this.setState({loading: true});
    let data = await fetch(url);
    let jsondata = await data.json();
    console.log(jsondata);
    this.setState({
      articles: jsondata.articles,
      totalResults: jsondata.totalResults,
      loading: false,
    });
    /* DEBUGGING */
/*     console.log("Total Results: ", jsondata.totalResults); */
  }

  nextpagehandler = async () => {
    /* DEBUGGING */
/*     console.log("Next");
    console.log("Page: ", this.state.page); // Log current page
    console.log(
      "Total Pages: ",
      Math.ceil(this.state.totalResults / this.props.pageSize)
    ); // Log calculated total pages */


    /* NEW LOGIC */
    if (
      this.state.page + 1 <=
      Math.ceil(this.state.totalResults / this.props.pageSize)
    ) {
      let url = `https://newsapi.org/v2/top-headlines?country=us&category=${this.props.category}&apiKey=f24cdd8716d14d5baca39eaa037aae25&page=${
        this.state.page + 1
      }&pageSize=${this.props.pageSize}`;
      this.setState({loading: true});
      let data = await fetch(url);
      let jsondata = await data.json();
      console.log(jsondata);
      this.setState({
        page: this.state.page + 1,
        articles: jsondata.articles,
        loading: false,
      });
    }
  };

  previouspagehandler = async () => {
    console.log("Previous");
    let url = `https://newsapi.org/v2/top-headlines?country=us&category=${this.props.category}&apiKey=f24cdd8716d14d5baca39eaa037aae25&page=${
      this.state.page - 1
    }&pageSize=${this.props.pageSize}`;
    this.setState({loading: true});
    let data = await fetch(url);
    let jsondata = await data.json();
    console.log(jsondata);
    this.setState({
      page: this.state.page - 1,
      articles: jsondata.articles,
      loading: false,
    });
  };

  render() {
    return (
      <div className="container my-3">
        <motion.h2
          className="text-center"
          initial={{ y: -200}}
          animate={{ y: 0 }}
          transition={{ type: "spring", delay: 0.5, duration: 1 }}
        >
          Up2Date Top Recent Headlines:{" "}
        </motion.h2>
        {this.state.loading && <Loading/>}
        <div className="row">
          {!this.state.loading && this.state.articles.map((element) => {
            return (
              <motion.div
                initial={{ x: -2000 }}
                animate={{ x: 0 }}
                transition={{ type: "spring", delay: 0.5 }}
                className="col-md-3 my-5 "
                key={element.url}
              >
                <NewsItem
                  title={element.title ? element.title : ""}
                  description={element.description ? element.description : ""}
                  imageUrl={element.urlToImage}
                  newsUrl={element.url}
                  author={element.author}
                  date={element.publishedAt}
                />
              </motion.div>
            );
          })}
        </div>
        <div className="container d-flex justify-content-end ">
          <button
            disabled={this.state.page <= 1}
            type="button"
            className="btn btn-outline-danger btn-lg mx-2 my-2"
            onClick={this.previouspagehandler}
          >
            Previous Page
          </button>
          <button
            type="button"
            disabled={
              this.state.page >=
              Math.ceil(this.state.totalResults / this.props.pageSize)
            }
            className="btn btn-outline-primary btn-lg my-2"
            onClick={this.nextpagehandler}
          >
            Next Page
          </button>
        </div>
      </div>
    );
  }
}

export default News;
