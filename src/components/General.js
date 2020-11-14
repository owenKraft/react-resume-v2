import React, { Component } from 'react';
import Emoji from 'a11y-react-emoji';

class General extends Component {
    constructor() {
        super()
        this.state = {
            userName: "Bob",
            bio: "I am a third generation restaurateur and owner and operator of Bob's Burgers. I have a passion for creative burgers.",
            editFlag: false,
        }

        this.edit = this.edit.bind(this);
        this.update = this.update.bind(this);
    }

    edit(){
        this.setState({
            editFlag: !this.state.editFlag,
        })
    }

    update(){
        const userName = document.getElementById("input-user-name").value
        const bio = document.getElementById("input-bio").value

        this.setState({
            userName: userName,
            bio: bio,
            editFlag: !this.state.editFlag,
        })
    }

    render() {
        if(this.state.editFlag === true){
        return (
            <div>
                <h1>
                    Hi, my name is <input id="input-user-name" type="text" defaultValue={this.state.userName}></input> <Emoji symbol="👋" label="wave-hand" />
                    <button onClick={this.update} className="float-right btn-green">all done</button>
                </h1>
                <div>
                    <label for="bio">tell us about yourself: </label>
                </div>
                <textarea id="input-bio" name="bio" rows="5" defaultValue={this.state.bio} ></textarea>

            </div>
        )
        } else {
        return (
            <div>
                <h1>
                    Hi, my name is <span id="user-name">{this.state.userName}</span> <Emoji symbol="👋" label="wave-hand" />
                    <button onClick={this.edit} className="float-right"><i class="fas fa-cog"></i></button>
                </h1>
                <p id="bio">
                    {this.state.bio}
                </p>
            </div>
        )
    }
    }
}
  
  export default General;