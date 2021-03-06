//import the axios HTTP client to communicate with the API
import axios from 'axios';
class HerokuappService {
    constructor(url = 'http://socialapp-api.herokuapp.com', client = axios.create()) {
        this.url = url;
        this.client = client;
    }

    postUser(userObject) {
        return this.client.post(this.url + "/users", userObject);
    }

    getUsers() {
        return this.client.get(this.url + "/users");
    }

    getUser(username) {
        return this.client.get(this.url + "/users/" + username);
    }

    updateUser(userObject) {
        const loginData = JSON.parse(localStorage.getItem("login"));
        return this.client.patch(this.url + "/users/" + loginData.result.username, userObject, {
            headers: { Authorization: `Bearer ${loginData.result.token}` }
        });
    }

    uploadPicture(picObject) {
        const loginData = JSON.parse(localStorage.getItem("login"));
        return this.client.put(this.url + "/users/" + loginData.result.username + "/picture/", picObject, {
            headers: { Authorization: `Bearer ${loginData.result.token}` }
        });
    }

    // 1/21/2020: updated postMessage. "result" was being returned as a string, so we need to use JSON.parse()
    // so that it is returning an object.
    postMessage(messageObject) {
        const loginData = JSON.parse(localStorage.getItem("login"));
        return this.client.post(this.url + "/messages", messageObject, {
            headers: { Authorization: `Bearer ${loginData.result.token}` }
        });
    }

    getMessages() {
        return this.client.get(this.url + "/messages");
    }

    postLike(id) {
        const loginData = JSON.parse(localStorage.getItem("login"));
        return this.client.post(this.url + "/likes", { "messageId": id }, {
            headers: { Authorization: `Bearer ${loginData.result.token}` }
        });
    }

    removeLike(id) {
        const loginData = JSON.parse(localStorage.getItem("login"));
        return this.client.delete(this.url + "/likes/" + id, {
            headers: { Authorization: `Bearer ${loginData.result.token}` }
        });
    }

    removeMessage(id) {
        const loginData = JSON.parse(localStorage.getItem("login"));
        return this.client.delete(this.url + "/messages/" + id, {
            headers: { Authorization: `Bearer ${loginData.result.token}` }
        });
    }
}

export default HerokuappService;