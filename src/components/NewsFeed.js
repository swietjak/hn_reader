import React from "react";
import Story from "./Story";
const axios = require("axios");

class NewsFeed extends React.Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.cached = {};
    this.state = {
      contentArr: [],
      pageNumber: 0,
      feedType: "best"
    };
  }

  componentDidMount() {
    this._isMounted = true;
    let url =
      "https://hacker-news.firebaseio.com/v0/" +
      this.props.feedType +
      "stories.json";
    axios
      .get(url)
      .then(res => {
        if (this._isMounted) {
          const contentArr = res.data;
          this.setState({ contentArr });
        }
      })
      .catch(err => console.log(err));
  }
  componentDidUpdate() {
    if (
      this.cached[this.props.feedType] === undefined ||
      Date.now() - this.cached[this.props.feedType].timestamp > 100000 ||
      this.state.feedType !== this.props.feedType
    ) {
      let url =
        "https://hacker-news.firebaseio.com/v0/" +
        this.props.feedType +
        "stories.json";
      axios.get(url).then(res => {
        if (this._isMounted) {
          const contentArr = res.data;
          this.setState({
            contentArr: contentArr,
            feedType: this.props.feedType
          });
        }
      });
      this.cached[this.props.feedType] = {
        timestamp: Date.now()
      };
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    let pageNumber = this.state.pageNumber;
    console.log(this.state.contentArr);

    let stories = this.state.contentArr
      .slice(pageNumber * 50, (pageNumber + 1) * 50)
      .map(elem => (
        <Story contentID={elem} goToArticle={this.props.goToArticle} />
      ));
    return (
      <main>
        <div className="stories-container">{stories}</div>
        <div className="page-nav">
          <div className="prev-page" onClick={this.changePage}>
            {"<prev"}
          </div>
          <div className="next-page" onClick={this.changePage}>
            {"next>"}
          </div>
        </div>
      </main>
    );
  }
  changePage = event => {
    let _maxStories = this.state.contentArr.length;
    let _proposedStories = (this.state.pageNumber + 2) * 50;
    if (
      event.target.className === "next-page" &&
      _maxStories > _proposedStories
    ) {
      this.setState(state => ({
        pageNumber: state.pageNumber + 1
      }));
    } else if (
      event.target.className === "prev-page" &&
      this.state.pageNumber > 0
    ) {
      this.setState(state => ({
        pageNumber: state.pageNumber - 1
      }));
    }
  };
}

export default NewsFeed;
