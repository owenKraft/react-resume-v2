import React, { Component } from 'react';

class Banner extends Component {
    constructor() {
        super()
        this.state = {
            src: "https://i.pinimg.com/originals/3b/29/ee/3b29ee0897204e6ece68886641afcb63.png",
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
        const src = document.getElementById("banner-src").value;

        this.setState({
            src: src,
            editFlag: !this.state.editFlag,
        })
    }

    render() {
        if(this.state.editFlag === true){
            return (
                <div class="container">
                    <img className="image-banner" src={this.state.src} />
                    <label for="banner-src">image URL: </label>
                    <input id="banner-src" name="banner-src" type="text" defaultValue={this.state.src}></input>
                    <button onClick={this.update} class="btn-green float-right">all done</button>
                </div>
            )
        } else {
            return (
                <div class="container">
                    <img className="image-banner" src={this.state.src} />
                    <div class="overlay">
                        <a href="#" class="icon" title="User Profile">
                        <i onClick={this.edit} class="fas fa-cog"></i>
                        </a>
                    </div>
                </div>
            )
        }
    }
}
  
  export default Banner;