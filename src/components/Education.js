import React, { Component } from 'react';
import Emoji from 'a11y-react-emoji';

class Education extends Component {
    constructor() {
        super()
        this.state = {
            school: "Wagstaff Culinary Institute",
            yearStarted: 2006,
            yearFinished: 2010,
            degreeType: "Bachelor's",
            areaOfStudy: "Culinary Arts",
            editFlag: false,
        }

        this.editEducation = this.editEducation.bind(this);
        this.updateEducation = this.updateEducation.bind(this);
    }

    editEducation(){
        this.setState({
            editFlag: !this.state.editFlag,
        })
    }

    updateEducation(){
        const school = document.getElementById("input-school").value
        const yearStarted = document.getElementById("input-year-started").value
        const yearFinished = document.getElementById("input-year-finished").value
        const degreeType = document.getElementById("input-degree-type").value
        const areaOfStudy = document.getElementById("input-area-of-study").value

        this.setState({
            school: school,
            yearStarted: yearStarted,
            yearFinished: yearFinished,
            degreeType: degreeType,
            areaOfStudy: areaOfStudy,
            editFlag: !this.state.editFlag,
        })
    }

    render() {
        if(this.state.editFlag === true){
        return (
            <div>
                <h1>
                    Education <Emoji symbol="🎓" label="graduation-cap" />
                    <button onClick={this.updateEducation} className="float-right btn-green">all done</button>
                </h1>
                <div>
                    <label for="education">school: </label>
                    <input name="school" id="input-school" type="text" defaultValue={this.state.school}></input>
                </div>
                <div>
                    <label for="area-of-study">area of study: </label>
                    <input name="area-of-study" id="input-area-of-study" type="text" defaultValue={this.state.areaOfStudy}></input>
                </div>
                <div>
                    <label for="degree-type">degree type: </label>
                    <select name="degree-type" id="input-degree-type" name="degree_type" defaultValue={this.state.school}>
                        <option>Bachelor's</option>
                        <option>Master's</option>
                        <option>Ph.D</option>
                    </select>
                    <span className="float-right">
                        <input id="input-year-started" type="number" min="1900" max="2099" step="1" defaultValue={this.state.yearStarted} />
                        -
                        <input id="input-year-finished" type="number" min="1900" max="2099" step="1" defaultValue={this.state.yearFinished} />
                    </span>
                </div>
                    
            </div>
        )
        } else {
        return (
            <div>
                <h1>
                    Education <Emoji symbol="🎓" label="graduation-cap" />
                    <button onClick={this.editEducation} className="float-right"><i class="fas fa-cog"></i></button>
                </h1>
                <div>
                    <span id="school-text">
                        {this.state.school}
                    </span>
                </div>
                
                <div>
                    {this.state.degreeType} - {this.state.areaOfStudy}
                     <span className="float-right">
                        {this.state.yearStarted} - {this.state.yearFinished}
                    </span>
                </div>
            </div>
        )}
    }
}
  
  export default Education;