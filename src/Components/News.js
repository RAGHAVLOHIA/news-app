import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import moment from "moment";

export class News extends Component {
  static defaultProps = {
    country: "in",
    pageSize: 8,
  };
  static propTypes = {
    country: PropTypes.string.isRequired,
    pageSize: PropTypes.number.isRequired,
    category: PropTypes.string,
  };
  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  constructor(props) {
    super(props);
    console.log("Hello I am a constructor from News Component");
    this.state = {
      article: [],
      loading: false,
      page: 1,
    };
    document.title = `${this.capitalizeFirstLetter(
      this.props.category
    )}- NewsMonkey`;
  }

  async updateNews() {
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=eb9becf647b24134aa1ae5878abb62f2&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    let parseddata = await data.json();
    console.log(parseddata);
    // this.setState({ articles:  });
    this.setState({
      article: parseddata.articles,
      totalArticles: parseddata.totalResults,
      loading: false,
    });
  }
  async componentDidMount() {
    this.updateNews();
  }

  handleNextClick = async () => {
    this.setState({ page: this.state.page + 1 });
    this.updateNews();
  };
  handlePreviousClick = async () => {
    this.setState({ page: this.state.page - 1 });
    this.updateNews();
  };

  render() {
    // console.log(this.state.totalResults);
    console.log(this.props);
    return (
      <div className="container my-3">
        <h2 className="text-center" style={{ margin: "30px 0" }}>
          NewsMoneky - Top {this.capitalizeFirstLetter(this.props.category)}{" "}
          Headlines
        </h2>
        {/* <h2>NewsMoneky - Top Headlines</h2> */}
        {this.state.loading && <Spinner />}
        <div className="row">
          {!this.state.loading &&
            this.state.article.map((element) => {
              return (
                <div className="col-md-4" key={element.url}>
                  <NewsItem
                    title={element.title ? element.title : ""}
                    description={element.description ? element.description : ""}
                    imageUrl={element.urlToImage}
                    newsUrl={element.url}
                    Author={element.author ? element.author : ""}
                    date={moment(element.publishedAt).format(
                      "ddd, Do MMM, hh:mm a"
                    )}
                    source={element.source.name}
                  />
                </div>
              );
            })}
        </div>
        <div className="container d-flex justify-content-between">
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
              Math.ceil(this.state.totalArticles / this.props.pageSize)
            }
          >
            Next &rarr;
          </button>
        </div>
      </div>
    );
  }
}

export default News;

// {
//     (Date.now() - Date.parse(element.publishedAt)) / 60000 +
//     "mins ago"

//   }
