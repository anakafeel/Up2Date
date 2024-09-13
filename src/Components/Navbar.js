import React, { Component } from "react";
import { motion } from "framer-motion";

export class Navbar extends Component {
  render() {
    return (
      <div>
        <nav
          className="navbar navbar-expand-lg bg-body-primary"
          style={{ backgroundColor: "#3D405B" }}
        >
          <div className="container-fluid">
            <motion.a
              className="navbar-brand"
              href="/"
              style={{ color: "#ffffff", fontSize: "1.5rem" }} 
              initial={{ rotate: 0 }}
              whileHover={{
                color: "#F4A261", 
                rotate: -5,
                scale: 1.2, 
                transition: { duration: 0.2 },
              }}
            >
              Up2Date
            </motion.a>

            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0 ">
                {["Home", "Business", "Entertainment", "General", "Health", "Science", "Sports", "Technology"].map(
                  (category, index) => (
                    <motion.li key={index} className="nav-item">
                      <motion.a
                        className="nav-link"
                        href={`/${category.toLowerCase()}`}
                        style={{ color: "#ffffff" }}
                        whileHover={{
                          scale: 1.1, // Slight scale on hover
                          transition: { duration: 0.2 }, // Smooth transition
                        }}
                      >
                        {category}
                      </motion.a>
                    </motion.li>
                  )
                )}
              </ul>

              <form className="d-flex" role="search">
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                />
                <button className="btn btn-outline-success text-white" type="submit">
                  Search
                </button>
              </form>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}

export default Navbar;
