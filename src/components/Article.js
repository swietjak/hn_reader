import React from "react";
import Comment from "./Comment";
import Story from "./Story";
const axios = require("axios");

class Article extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      storyData: {}
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
        this.setState({ storyData });
      })
      .catch(err => console.log(err));
  }

  render() {
    const comments = this.state.storyData ? (
      this.returnComments(this.state.storyData.kids)
    ) : (
      <div></div>
    );
    console.log(this.props.contentID);

    return (
      <main>
        <Story contentID={this.props.contentID} />
        <div className="article-comments">{comments}</div>
      </main>
    );
  }

  returnComments = kids => {
    if (!kids) {
      return;
    } else {
      this.commentData = {};
      let comments = kids.map((elem, i) => {
        let comment = (
          <div key={i}>
            <Comment commentID={elem} />
          </div>
        );
        return comment;
      });
      return comments;
    }
  };
}

export default Article;
