import React from "react";

import Menu from "../components/Menu";
import { userIsAuthenticated } from "../HOCs";
import UserProfile from "../components/userProfile/UserProfile"
import { Link } from 'react-router-dom';
import { Route, Switch } from "react-router-dom";
import HerokuappService from "../ApiService";



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
    let userData = this.state.userData
    userData[e.target.name] = e.target.value

    let pictureSet = this.state.formData.picture
    if(e.target.files != undefined){
      pictureSet = e.target.files[0]
    }

    this.setState({
      picture:pictureSet,
      userData
    })
  }

  fileUpload(file){
    const formData = new FormData()
    formData.append("picture", file)
    return formData
  }

  handleSubmit = event => {
    event.preventDefault()
    const formData = this.fileUpload(this.state.picture)
    const loginData = JSON.parse(localStorage.getItem("login"))
    this.client.uploadPicture(formData)
  }
  
  componentDidMount() {
    this.getUser();
    //this.getUsers();
  }

  render() {

    return (
      <div>
        <Menu isAuthenticated={this.props.isAuthenticated} />
        <h2>Profile</h2>

        <div>
          <UserProfile
            picture={this.state.userData.user && this.state.userData.user.pictureLocation}
            userData={this.state.userData.user}
            username={this.state.userData.user && this.state.userData.user.username}
            displayName={this.state.userData.user && this.state.userData.user.displayName}
            about={this.state.userData.user && this.state.userData.user.about}
          />
          <br /><br />
        </div>

        <form>
          <input name="picture" type="file" onChange={this.onFileChange}></input>
          <button onClick={this.handleSubmit}>Upload Image</button>
        </form>

        
        <form>
          <label>
            Display Name:
            <input type="text" name="displayName" />
          </label>
          <br />
          <label>
            About:
            <input type="text" name="about" />
          </label>
          <br />
          <label>
            Password:
            <input type="text" name="password" />
          </label>
          <br />
          <input type="submit" value="Submit" />
        </form>

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