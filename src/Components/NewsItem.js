import React from "react";
import moment from "moment";

const NewsItem = (props) => {
  let { title, description, imageUrl, newsUrl, Author, date, source } = props;
  return (
    <div>
      <div className="my-3">
        <div className="card">
          <span
            className="position-absolute top-0 translate-middle badge rounded-pill bg-danger"
            style={{ right: "-15%", zIndex: "1" }}
          >
            {source}
          </span>
          <img
            src={
              !imageUrl
                ? "https://img.etimg.com/thumb/msid-90369371,width-1070,height-580,imgsize-1324237,overlay-etpanache/photo.jpg"
                : imageUrl
            }
            className="card-img-top"
            alt="..."
          />
          <div className="card-body">
            <h5 className="card-title">{title} </h5>
            <p className="card-text">{description}</p>
            <p className="card-text my-1">
              <small className="text-muted">
                By {!Author ? "Unknown" : Author} on{" "}
                {moment(date).format("ddd, Do MMM, hh:mm a")}
              </small>
            </p>
            <a
              href={newsUrl}
              target="_blank"
              rel="noreferrer"
              className="btn btn-sm btn-dark"
            >
              Read More
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsItem;
