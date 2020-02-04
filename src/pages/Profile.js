import React from "react";

import Menu from "../components/Menu";
import { userIsAuthenticated } from "../HOCs";
import UserProfile from "../components/userProfile/UserProfile"
// import { Link } from 'react-router-dom';
// import { Route, Switch } from "react-router-dom";
import "./pages_css/profile.css";


import HerokuappService from "../ApiService";
import profile_background5 from "./pages_pics/profile_background5.png";





class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.client = new HerokuappService();
    this.state = {
      users: [],
      userData: {},
      isLoaded: false,
      formData: {}

    }
  }

  getUser() {
    const loginData = JSON.parse(localStorage.getItem("login"));
    return this.client.getUser(loginData.result.username).then(result => {
      console.log(result.data, "individualUser")
      this.setState({
        userData: result.data
      })
    })
  }

  getUsers() {
    return this.client.getUsers().then(result => {
      console.log(result.data, "all the users")
      this.setState({
        users: result.data
      })
    })
  }

  onFileChange = e => {
    let formData = this.state.formData
    formData[e.target.name] = e.target.value

    let pictureSet = this.state.formData.picture
    if (e.target.files !== undefined) {
      pictureSet = e.target.files[0]
    }

    this.setState({
      picture: pictureSet,
      formData
    })
  }

  fileUpload(file) {
    const formData = new FormData()
    formData.append("picture", file)
    return formData
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const formData = this.fileUpload(this.state.picture)
    // const loginData = JSON.parse(localStorage.getItem("login"))
    this.client.uploadPicture(formData).then(() => {
      this.getUser();
      this.setState({
        formData: {
          picture: ""
        }
      })
    })
  }

  componentDidMount() {
    this.getUser();
    //this.getUsers();
  }

  render() {

    return (
      <div className="PageAll" >

        <div className="MenuBar">
          <Menu isAuthenticated={this.props.isAuthenticated} />
        </div>

        <div className="Content" style={{ backgroundImage: `url(${profile_background5})` }}>

          <div className="ProfileColumn">

            <div className="ProfileInfo">
              <h2>{this.state.userData.user && this.state.userData.user.username}</h2>
              <br />
              <UserProfile
                picture={this.state.userData.user && this.state.userData.user.pictureLocation}
                // userData={this.state.userData.user}
                // username={this.state.userData.user && this.state.userData.user.username}
                // displayName={this.state.userData.user && this.state.userData.user.displayName}
                
                
                about={this.state.userData.user && this.state.userData.user.about}
              />
              <br />
              <form>
                <p style={{ textAlign: "center" }}>Please select a picture that is 200kb or less</p>
                <input value={this.state.formData.picture} name="picture" type="file" onChange={this.onFileChange}></input>
                <button onClick={this.handleSubmit}>Upload Image</button>
              </form>
              
             
            </div>
          </div>

          <div className="RightSideColumn">
            <h3>Update your Profile </h3>

            <br />

            <form className="update-profile">
              <label className="Label">Display Name: </label>
              <input className="display-name"
                type="text"
                name="displayName"
              />

              <br />

              <label className="Label">About: </label>
              <input className="about"
                type="text"
                name="about"
              />

              <br />

              <label className="Label">Password: </label>
              <input className="password"
                type="text"
                name="password"
              />

              <br />
              <input className="loginButton2"
                type="submit"
                value="Submit"
              />
            </form>
          </div >

        </div>
      </div>

    );
  }
}

export default userIsAuthenticated(Profile);
    /*
pictureLocation: "",
username: "",
displayName: "",
about: "",
googleId: "",
createdAt: "",
updatedAt: ""
*/