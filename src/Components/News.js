import React, { Component } from "react";
import NewsItem from "./NewsItem";
import { motion } from "framer-motion";
import Loading from "./Loading";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
  static defaultProps = {
    country: "us",
    pageSize: 8,
    category: "general",
  };

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };

  /* METHOD - 1 -> COMPONENT DID MOUNT */
  constructor() {
    super();
    this.state = {
      articles: [],
      loading: true,
      totalResults: 0,
      page: 1,
    };
  }

  async updateNews() {
    this.props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    this.props.setProgress(30);
    let jsondata = await data.json();
    this.props.setProgress(60);
    console.log(jsondata);
    this.setState({
      articles: jsondata.articles,
      totalResults: jsondata.totalResults,
      loading: false,
    });
    this.props.setProgress(100);
  }

  async componentDidMount() {
    this.updateNews();
  }


/*   fetchMoreData = async() => {
    this.setState({page: this.state.page + 1});
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    let jsondata = await data.json();
    console.log(jsondata);
    this.setState({
      articles: this.state.articles.concat(jsondata.articles),
      totalResults: jsondata.totalResults,
    });

  }; */


  fetchMoreData = async () => {
    const newPage = this.state.page + 1; 
    this.setState({ page: newPage });

    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${newPage}&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    let jsondata = await data.json();
    this.setState({
        articles: this.state.articles.concat(jsondata.articles),
        totalResults: jsondata.totalResults,
    });
};

  render() {
    return (
      <>
        <motion.h2
          className="text-center my-3" 
          initial={{ y: -200}}
          animate={{ y: 0 }}
          transition={{ type: "spring", delay: 0.5, duration: 1 }}
          style={{ paddingTop: '4rem' }}
          >
          Up2Date Top Headlines - {this.props.category}{" "}
        </motion.h2>
        {this.state.loading && <Loading/>}

        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={Loading}
          >

            <div className="container">

            
        <div className="row">
          { this.state.articles.map((element) => {
            return (
              <motion.div
              variants={{
                visible: { opacity: 1, scale: 1 },
                hidden: { opacity: 0, scale: 0 }
              }}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.3 }}
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
        </div>
        </InfiniteScroll>
        </>
    );
  }
}

export default News;
