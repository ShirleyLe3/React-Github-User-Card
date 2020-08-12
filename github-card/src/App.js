import React from "react";
import axios from "axios";
import "./App.css";

// function App() {
class App extends React.Component {
  constructor() {
    super();
    this.state = {
      gitData: [],
      gitUserFollowers: [],
      gitUserFollowersData: [],
      gitUser: "ShirleyLe3",
    };
  }

  componentDidMount() {
    axios
      .get(`http://api.github.com/users/${this.state.gitUser}`)
      .then((response) => {
        console.log(response.data);
        this.setState({
          gitData: response.data,
        });
      })
      .catch((error) => console.log(error));
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.gitData !== prevState.gitData) {
      axios
        .get(`http://api.github.com/users/${this.state.gitUser}/followers`)
        .then((response) => {
          this.setState({
            gitUserFollowers: response.data,
            gitUserFollowersData: [],
          });
        })
        .catch((error) => console.log(error));
    }

    if (this.state.gitUserFollowers !== prevState.gitUserFollowers) {
      this.state.gitUserFollowers.map((item) => {
        axios.get(item.url).then((response) => {
          console.log(response.data);
          this.setState({
            gitUserFollowersData: [
              ...this.state.gitUserFollowersData,
              response.data,
            ],
          });
        });
        console.log(this.state.gitUserFollowersData);
      });
    }
  }

  // search for Git Card
  handleChange = (e) => {
    console.log(e.target.value);
    this.setState({
      gitUser: e.target.value,
    });
  };

  getUserData = (e) => {
    e.preventDefault();
    axios
      .get(`http://api.github.com/users/${this.state.gitUser}`)
      .then((response) => {
        this.setState({
          gitData: response.data,
        });
      })
      .catch((error) => console.log(error));
  };

  //   RENDERRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR

  render() {
    return (
      <div className="Container">
        <h1 className="header">Find Your GitCard</h1>
        <div className="search">
          <input
            type="text"
            name="gitUser"
            value={this.state.gitUser}
            onChange={this.handleChange}
            placeholder="Search username"
          />
          <button onClick={this.getuserData}>Search</button>
        </div>

        <div className="gitUser">
          <div className="gitUser-top">
            <img src={this.state.gitData.avatar_url} alt="profile-pic" />
            <h1>{this.state.gitData.name}</h1>
            <p>{this.state.gitData.bio}</p>
            <p>{this.state.gitData.location}</p>
          </div>
          {/* </div> */}
          <div className="gitUser-bottom">
            <p>Repo: {this.state.gitData.public_repos}</p>
            <p className="break"> Followers: {this.state.gitData.followers}</p>
            <p> Following: {this.state.gitData.following}</p>
          </div>
        </div>

        <h1 className="Followers">Followers</h1>
        <div className="following-container">
          {this.state.gitUserFollowersData.map((item) => {
            return (
              <div key={item.id} className="gitFollowers">
                <div className="follower">
                  <img src={item.avatar_url} alt="follower profile" />
                  <h3>{item.name}</h3>
                  <p>User: {item.login}</p>
                  <p>Bio: {item.bio}</p>
                  <p>Location: {item.location}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
export default App;
