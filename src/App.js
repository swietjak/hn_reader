import React from "react";
import "./App.css";
import NewsFeed from "./components/NewsFeed";
import Article from "./components/Article";

class Navigation extends React.Component {
  render() {
    return (
      <nav>
        <div className="new" onClick={this.changeFeed}>
          new
        </div>
        <div className="top" onClick={this.changeFeed}>
          top
        </div>
        <div className="ask" onClick={this.changeFeed}>
          ask
        </div>
        <div className="show" onClick={this.changeFeed}>
          show
        </div>
        <div className="job" onClick={this.changeFeed}>
          jobs
        </div>
      </nav>
    );
  }
  changeFeed = event => {
    this.props.changeFeed(event);
  };
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      browseType: "best",
      isNewsFeed: true,
      currID: 0
    };
  }

  componentDidMount() {
    const browseType = localStorage.getItem("browseType");
    const isNewsFeed = localStorage.getItem("isNewsFeed") == "true";
    const currID = parseInt(localStorage.getItem("currID"));

    console.log(currID);
    if (browseType !== null) {
      this.setState({ browseType });
    } else {
      localStorage.setItem("browseType", "best");
    }

    if (isNewsFeed !== null) {
      this.setState({ isNewsFeed });
    } else {
      localStorage.setItem("isNewsFeed", true);
    }

    if (currID !== null) {
      console.log(currID);
      this.setState({ currID });
    } else {
      localStorage.setItem("currID", 0);
      localStorage.setItem("isNewsFeed", true);
    }
  }

  render() {
    let mainContent = this.state.isNewsFeed ? (
      <NewsFeed
        feedType={this.state.browseType}
        goToArticle={this.goToArticle}
      />
    ) : (
      <Article contentID={this.state.currID} />
    );
    return (
      <div className="App">
        <header className="best" onClick={this.changeFeed}>
          HN Clone
        </header>
        <Navigation changeFeed={this.changeFeed} />
        <hr />
        {mainContent}
      </div>
    );
  }

  changeFeed = event => {
    this.setState({
      browseType: event.target.className,
      isNewsFeed: true
    });

    localStorage.setItem("browseType", event.target.className);
    localStorage.setItem("isNewsFeed", true);
    localStorage.setItem("currID", 0);
  };

  goToArticle = (event, currID) => {
    this.setState({
      isNewsFeed: false,
      currID: currID
    });

    localStorage.setItem("isNewsFeed", false);
    localStorage.setItem("currID", currID);
  };
}

export default App;
