import React, { useEffect, useState } from "react";
import NewsItem from "./NewsItem";

import Spinner from "./Spinner";
import PropTypes from "prop-types";

import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {
  const [article, setarticle] = useState([]);
  const [loading, setloading] = useState(true);
  const [page, setpage] = useState(1);
  const [totalResults, settotalResults] = useState(0);
  // document.title = `${this.capitalizeFirstLetter(
  //   props.category
  // )}- NewsMonkey`;

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  document.title = `${capitalizeFirstLetter(props.category)}- NewsMonkey`;

  const updateNews = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=eb9becf647b24134aa1ae5878abb62f2&page=${page}&pageSize=${props.pageSize}`;
    let data = await fetch(url);
    let parseddata = await data.json();
    console.log(parseddata);
    setarticle(parseddata.articles);
    settotalResults(parseddata.totalResults);
    setloading(false);
  };

  useEffect(() => {
    updateNews();
    // eslint-disable-next-line
  }, []);

  // const handleNextClick = async () => {
  //   setpage(page + 1);
  //   updateNews();
  // };
  // const handlePreviousClick = async () => {
  //   setpage(page - 1);
  //   updateNews();
  // };

  const fetchMoreData = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=${
      props.country
    }&category=${props.category}&apiKey=eb9becf647b24134aa1ae5878abb62f2&page=${
      page + 1
    }&pageSize=${props.pageSize}`;
    setpage(page + 1);
    let data = await fetch(url);
    let parseddata = await data.json();
    console.log(parseddata);
    setarticle(article.concat(parseddata.articles));
    settotalResults(parseddata.totalResults);
  };

  console.log(props);
  return (
    <>
      <h2
        className="text-center"
        style={{ margin: "30px 0", marginTop: "70px" }}
      >
        NewsMoneky - Top {capitalizeFirstLetter(props.category)} Headlines
      </h2>
      {/* <h2>NewsMoneky - Top Headlines</h2> */}
      {/* {this.state.loading && <Spinner />} */}

      <InfiniteScroll
        dataLength={article.length}
        next={fetchMoreData}
        hasMore={article.length !== totalResults}
        loader={<Spinner />}
      >
        <div className="container">
          <div className="row">
            {!loading &&
              article.map((element) => {
                return (
                  <div className="col-md-4" key={element.url}>
                    <NewsItem
                      title={element.title ? element.title : ""}
                      description={
                        element.description ? element.description : ""
                      }
                      imageUrl={element.urlToImage}
                      newsUrl={element.url}
                      Author={element.author ? element.author : ""}
                      date={element.publishedAt}
                      source={element.source.name}
                    />
                  </div>
                );
              })}
          </div>
        </div>
      </InfiniteScroll>

      {/* <div className="container d-flex justify-content-between">
          <button
            disabled={this.state.page <= 1}
            type="button"
            className="btn btn-dark mx-3"
            onClick={this.handlePreviousClick}
          >
            &larr; Previous
          </button>
          <button
            type="button"
            className="btn btn-dark"
            onClick={this.handleNextClick}
            disabled={
              this.state.page + 1 >
              Math.ceil(this.state.totalArticles / props.pageSize)
            }
          >
            Next &rarr;
          </button>
        </div> */}
    </>
  );
};

export default News;

News.defaultProps = {
  country: "in",
  pageSize: 8,
};
News.propTypes = {
  country: PropTypes.string.isRequired,
  pageSize: PropTypes.number.isRequired,
  category: PropTypes.string,
};
