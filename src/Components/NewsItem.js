import React, { Component } from "react";
import { motion } from "framer-motion";

export class NewsItem extends Component {
  render() {
    const { title, description, imageUrl, newsUrl } = this.props;
    return (
      <div>
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="card"
          style={{ height: "38rem" }}
        >
          <img
            src={
              !imageUrl
                ? "https://media.istockphoto.com/id/1311148884/vector/abstract-globe-background.jpg?s=1024x1024&w=is&k=20&c=-AdIwLn-nIYlgctc95CZuJHnkku_ia-f8A8m2LFwl2A="
                : imageUrl
            }
            className="card-img-top"
            alt="..."
          />
          <div className="card-body d-flex flex-column">
            <h5 className="card-title">{title}</h5>
            <p className="card-text flex-grow-1">{description}</p>
            <motion.a
              whileHover={{ opacity: 1 }}
              initial={{ opacity: 0.5 }}
              whileTap={{ scale: 0.9 }}
              href={newsUrl}
              className="btn btn-outline-primary btn-lg"
            >
              Read More
            </motion.a>
          </div>
        </motion.div>
      </div>
    );
  }
}

export default NewsItem;
