import React from "react";
const axios = require("axios");

class Comment extends React.Component {
  _isMounted = false;
  _dateStr = "";
  constructor(props) {
    super(props);
    this.state = {
      commentData: {}
    };
  }
  componentDidMount() {
    this._isMounted = true;
    let url =
      "https://hacker-news.firebaseio.com/v0/item/" +
      this.props.commentID +
      ".json";
    axios
      .get(url)
      .then(res => {
        if (this._isMounted) {
          const commentData = res.data;
          this.setState({
            commentData
          });
        }
      })
      .catch(err => console.log(err));
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    let comments = this.state.commentData.kids ? (
      this.retrieveKids(this.state.commentData.kids)
    ) : (
      <div></div>
    );
    if (this.state.commentData) {
      let time = parseInt(Date.now() / 1000) - this.state.commentData.time;
      if (time < 60) this._dateStr = time.toString + " seconds";
      else if (time > 60 && time < 3600)
        this._dateStr = parseInt(time / 60) + " minutes";
      else if (time > 3600) this._dateStr = parseInt(time / 3600) + " hours";
    }

    console.log();
    return (
      <div style={{ margin: "1.5rem" }}>
        <p className="comment-info">
          {this.state.commentData.by} posted {this._dateStr} ago
        </p>
        <p
          className="comment"
          dangerouslySetInnerHTML={{ __html: this.state.commentData.text }}
        ></p>
        {comments}
      </div>
    );
  }

  retrieveKids = kids => {
    const comments = kids.map(elem => {
      return <Comment commentID={elem} />;
    });
    return comments;
  };
}

export default Comment;
