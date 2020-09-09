import React from "react";
const axios = require("axios");

class Story extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      storyData: {},
      contentID: this.props.contentID
    };
  }

  componentDidMount() {
    let url =
      "https://hacker-news.firebaseio.com/v0/item/" +
      this.props.contentID +
      ".json";
    axios
      .get(url)
      .then(res => {
        const storyData = res.data;
        console.log(this.props.contentID);

        this.setState({
          storyData: storyData,
          contentID: this.props.contentID
        });
      })
      .catch(err => console.log(this.props.contentID, err));
  }

  componentDidUpdate() {
    if (this.state.contentID !== this.props.contentID) {
      let url =
        "https://hacker-news.firebaseio.com/v0/item/" +
        this.props.contentID +
        ".json";
      axios
        .get(url)
        .then(res => {
          const storyData = res.data;
          this.setState({
            storyData: storyData,
            contentID: this.props.contentID
          });
        })
        .catch(err => console.log(err));
    }
  }
  render() {
    let commentField =
      this.state.storyData && this.state.storyData.kids ? (
        <span className="comment-link" onClick={this.goToArticle}>
          {this.state.storyData.descendants} comments
        </span>
      ) : (
        <span>0 comments</span>
      );
    let title =
      this.state.storyData && this.state.storyData.url ? (
        <a className="story-title" href={this.state.storyData.url}>
          {this.state.storyData.title}
        </a>
      ) : (
        <p className="story-title" onClick={this.goToArticle}>
          {this.state.storyData && this.state.storyData.title}
        </p>
      );
    return (
      <div>
        {this.state.storyData && (
          <div className="story">
            {title}
            <p className="story-features">
              {this.state.storyData.score}pts by {this.state.storyData.by}{" "}
              {commentField}
            </p>
          </div>
        )}
      </div>
    );
  }

  goToArticle = event => {
    this.props.goToArticle(event, this.props.contentID);
  };
}

export default Story;
