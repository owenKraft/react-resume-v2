import React, { Component } from 'react';
import Emoji from 'a11y-react-emoji';
import uniqid from "uniqid";

class Experience extends Component {
    constructor() {
        super()
        this.state = {
            jobs: [
                {
                    id: uniqid(),
                    employer: "Bob's Burgers",
                    role: "Chef, Owner and Operator",
                    responsibilities: [
                        "Make the burgers",
                        "Serve the burgers",
                        "Clean up afterwards",
                    ],
                    yearStarted: 2011,
                    yearEnded: 2020,
                    editFlag: false,
                },
                {
                    id: uniqid(),
                    employer: "Big Bob's Diner",
                    role: "Cook and Server",
                    responsibilities: [
                        "Take orders",
                        "Cook the orders",
                        "Serve the orders",
                    ],
                    yearStarted: 2001,
                    yearEnded: 2010,
                    editFlag: false,
                },
            ],
            placeholderJob: {
                responsibilities: [
                    "describe responsibility here",
                    "describe responsibility here",
                    "describe responsibility here",
                ],
            },
            defaultJob: {
                responsibilities: [
                    "describe responsibility here",
                    "describe responsibility here",
                    "describe responsibility here",
                ],
            },
            activeEditFlag: false,
            addJobFlag: false,
        }

        this.editJob = this.editJob.bind(this);
        this.updateJob = this.updateJob.bind(this);
        this.addJob = this.addJob.bind(this);
        this.removeJob = this.removeJob.bind(this);
        this.submitNewJob = this.submitNewJob.bind(this);
        this.addResponsibility = this.addResponsibility.bind(this);
        this.removeResponsibility = this.removeResponsibility.bind(this);
        this.toggleEditVisibility = this.toggleEditVisibility.bind(this);
    }

    submitNewJob(e){
        const newJobNode = e.target.closest(".new-job");

        const employer = newJobNode.querySelector(".edit-employer").value;
        const role = newJobNode.querySelector(".edit-role").value;
        const yearStarted = newJobNode.querySelector(".edit-year-started").value;
        const yearEnded = newJobNode.querySelector(".edit-year-ended").value;
        const newJobResponsibilityLength = newJobNode.querySelector(".edit-responsibilities").childNodes.length;

        const newJob = {
            id: uniqid(),
            employer: employer,
            role: role,
            responsibilities: [],
            yearStarted: yearStarted,
            yearEnded: yearEnded,
            editFlag: false,
        }

        for(let i = 0; i < newJobResponsibilityLength; i++){
            const children = newJobNode.parentNode.querySelector(".edit-responsibilities");
            let newJobResponsibility = children.childNodes[i].firstChild.value;
            newJob.responsibilities.push(newJobResponsibility);
        }
  
        this.setState({
            // jobs: [...this.state.jobs, newJob],
            jobs: [newJob, ...this.state.jobs],
            addJobFlag: !this.state.addJobFlag,
            placeholderJob: this.state.defaultJob,
        })
        console.log(this.state.jobs)
    }

    editJob(job){
        const jobsCopy = this.state.jobs;
        let selectedJob = jobsCopy.find(blah => blah.id === job.job.id);
        selectedJob.editFlag = !selectedJob.editFlag;
        this.setState({
          jobs: jobsCopy,
        })
    }

    updateJob(job){
        const jobsCopy = this.state.jobs;
        let selectedJob = jobsCopy.find(blah => blah.id === job.job.id);
        let selectedJobNode = document.getElementById(selectedJob.id)

        const employer = selectedJobNode.querySelector(".edit-employer").value;
        const role = selectedJobNode.querySelector(".edit-role").value;
        const yearStarted = selectedJobNode.querySelector(".edit-year-started").value;
        const yearEnded = selectedJobNode.querySelector(".edit-year-ended").value;

        for(let i =0; i < selectedJob.responsibilities.length; i++){
            const children = selectedJobNode.querySelector(".edit-responsibilities");
            let selectedResponsibility = children.childNodes[i].firstChild.value;
            selectedJob.responsibilities[i] = selectedResponsibility;
        }

        selectedJob.employer = employer;
        selectedJob.role = role;
        selectedJob.yearStarted = yearStarted;
        selectedJob.yearEnded = yearEnded;
        selectedJob.editFlag = !selectedJob.editFlag;

        this.setState({
          jobs: jobsCopy,
        })
    }

    addJob(){
        this.setState({
            addJobFlag: !this.state.addJobFlag,
        })
    }

    removeJob(e,job){
        const jobsCopy = this.state.jobs;
        const jobsCopyIndex = jobsCopy.findIndex(jobCopy => jobCopy.id === job.id);

        jobsCopy.splice(jobsCopyIndex,1);

        this.setState({
            jobs: jobsCopy,
        })
    }

    addResponsibility(e,job){
        const checkIfNewJob = e.target.closest(".job-block").classList.contains("new-job");

        if(checkIfNewJob){
            const placeholderJobCopy = this.state.placeholderJob;
            const placeholderJobNode = e.target.closest(".new-job");
            const children = placeholderJobNode.querySelector(".edit-responsibilities");
            const newResp = "describe responsibility here";

            for(let i =0; i < placeholderJobCopy.responsibilities.length; i++){
                let selectedResponsibility = children.childNodes[i].firstChild.value;
                placeholderJobCopy.responsibilities[i] = selectedResponsibility;
            }

            placeholderJobCopy.responsibilities = [...this.state.placeholderJob.responsibilities, newResp]
    
            this.setState({
                placeholderJob: placeholderJobCopy
            })
        } else {
            const jobsCopy = this.state.jobs;
            const selectedJob = jobsCopy.find(blah => blah.id === job.id);
            const selectedJobNode = document.getElementById(job.id);
            const children = selectedJobNode.querySelector(".edit-responsibilities");
            const newResp = "describe responsibility here";
            

            for(let i =0; i < selectedJob.responsibilities.length; i++){
                let selectedResponsibility = children.childNodes[i].firstChild.value;
                selectedJob.responsibilities[i] = selectedResponsibility;
            }

            selectedJob.responsibilities.push(newResp);
    
            this.setState({
                jobs: jobsCopy,
            })
        }
    }

    removeResponsibility(e,job){
        const checkIfNewJob = e.target.closest(".job-block").classList.contains("new-job");

        if(checkIfNewJob){
            const placeholderJobCopy = this.state.placeholderJob;
            const placeholderNodeID = e.target.parentNode.id;
            const responsibilitiesNode = e.target.closest(".edit-responsibilities");
            const childrenArray = Array.from(responsibilitiesNode.childNodes);
            const childrenArrayIndex = childrenArray.findIndex(node => node.id === placeholderNodeID);

            for(let i = 0; i < placeholderJobCopy.responsibilities.length; i++){
                let selectedResponsibility = responsibilitiesNode.childNodes[i].firstChild.value;
                placeholderJobCopy.responsibilities[i] = selectedResponsibility;
            };

            placeholderJobCopy.responsibilities.splice(childrenArrayIndex,1);
    
            this.setState({
                placeholderJob: placeholderJobCopy
            })
        } else {
            const jobsCopy = this.state.jobs;
            const selectedJob = jobsCopy.find(blah => blah.id === job.id);
            const selectedNodeID = e.target.parentNode.id;
            const responsibilitiesNode = e.target.closest(".edit-responsibilities");
            const childrenArray = Array.from(responsibilitiesNode.childNodes);
            const childrenArrayIndex = childrenArray.findIndex(node => node.id === selectedNodeID);

            for(let i = 0; i < selectedJob.responsibilities.length; i++){
                let selectedResponsibility = responsibilitiesNode.childNodes[i].firstChild.value;
                selectedJob.responsibilities[i] = selectedResponsibility;
            };

            selectedJob.responsibilities.splice(childrenArrayIndex,1);

            this.setState({
                jobs: jobsCopy,
            })
        }

    }

    toggleEditVisibility(){
        const updateActiveEditFlag = !this.state.activeEditFlag;
        const editJobButton = document.getElementById("edit-job");
        const editJobButtonHTML = "<i class='fas fa-cog'></i>"
        if(updateActiveEditFlag === true){
            editJobButton.innerHTML = "all done";
            editJobButton.classList.add("btn-green-inverse");
        } else {
            editJobButton.innerHTML = editJobButtonHTML;
            editJobButton.classList.remove("btn-green-inverse");
        }
        
        const addJobButton = document.getElementById("add-job");
        addJobButton.classList.toggle("edit-job-hidden");

        this.setState({
            activeEditFlag: updateActiveEditFlag,
        })


    }

    render() {
        return (
            <div>
                <h1>
                    Experience <Emoji symbol="💼" label="briefcase" />
                    <button id="edit-job" onClick={this.toggleEditVisibility} className="float-right"><i class="fas fa-cog"></i></button>
                </h1>
                <button id="add-job" onClick={this.addJob} className=" edit-job-toggle edit-job-hidden btn-green btn-add-margin">add job</button>

                {
                    this.state.addJobFlag &&

                    <div className="job-block new-job">
                        <div>
                            <label for="role">role: </label>
                            <input name="role" className="edit-role" type="text" placeholder="what was your job title?"/>
                        </div>
                        <label for="employer">employer: </label>
                        <input name="employer" className="edit-employer" type="text" placeholder="who did you work for?" />
                        <span className="float-right">
                            <input className="edit-year-started" type="number" min="1900" max="2099" step="1" placeholder="2020" />
                            -
                            <input className="edit-year-ended" type="number" min="1900" max="2099" step="1" placeholder="2020" />
                        </span>
                        <div>
                            <ul className="edit-responsibilities">
                                {
                                    this.state.placeholderJob.responsibilities.map(
                                    (responsibility) => 
                                    <li key={uniqid()} id={uniqid()}>
                                        <input id={uniqid()} className="edit-responsibility" type="text" placeholder={responsibility} /> <i onClick={(e) => this.removeResponsibility(e)} className="fas fa-times"></i>
                                    </li>
                                    )
                                }
                            </ul>
                            <button onClick={(e) => this.addResponsibility(e)} className="btn-add-responsibility"><i class="fas fa-plus"></i> add line item</button>
                        </div>

                        <button onClick={(e) => this.submitNewJob(e)} className="btn-green btn-add-margin">all done</button>
                    </div>
                }

                {this.state.jobs.map(
                    (job) => {if(job.editFlag === true){
                        return (
                            <div id={job.id} className="job-block">
                                <div>
                                    <label for="role">role: </label>
                                    <input name="role" className="edit-role" type="text" defaultValue={job.role} />
                                </div>
                                <label for="employer">employer: </label>
                                <input className="edit-employer" type="text" defaultValue={job.employer} />
                                
                                <span className="float-right">
                                    <input className="edit-year-started" type="number" min="1900" max="2099" step="1" defaultValue={job.yearStarted} />
                                    -
                                    <input className="edit-year-ended" type="number" min="1900" max="2099" step="1" defaultValue={job.yearEnded} />
                                </span>
                                <div>
                                    <ul className="edit-responsibilities">
                                        {
                                            job.responsibilities.map(
                                            (responsibility) => 
                                            <li key={uniqid()} id={uniqid()}>
                                                <input id={uniqid()} className="edit-responsibility" type="text" defaultValue={responsibility} /> <i onClick={(e) => this.removeResponsibility(e,job)} className="btn-dimgray fas fa-times"></i>
                                            </li>
                                            )
                                        }
                                    </ul>
                                    <button onClick={(e) => this.addResponsibility(e,job)} className="btn-add-responsibility"><i class="fas fa-plus"></i> add line item</button>
                                </div>
                                <div>
                                    <button onClick={() => this.updateJob({job})} className="btn-green btn-add-margin">all done</button>
                                    <button onClick={(e) => this.removeJob(e,job)} className="btn-red btn-add-margin float-right">delete</button>
                                </div>
                            </div>
                        )
                    } else if(this.state.activeEditFlag === true) {
                        return (
                            <div>
                                <div>
                                    {job.role}
                                    <button onClick={() => this.editJob({job})} className="float-right"><i class="fas fa-cog"></i></button>
                                </div>
                                <div>
                                    {job.employer}
                                    <span className="float-right">
                                        {job.yearStarted} - {job.yearEnded}
                                    </span>
                                </div>

                                <ul>
                                    {job.responsibilities.map(
                                        (responsibility) => 
                                        <li key={uniqid()} id={uniqid()}>{responsibility}</li>)}
                                </ul>
                                
                            </div>
                        )
                    } else {
                        return (
                            <div>
                                <div>
                                    <span className="job-role">{job.role}</span>
                                    <button onClick={() => this.editJob({job})} className="float-right edit-job-hidden"><i class="fas fa-cog"></i></button>
                                </div>
                                <div>
                                    {job.employer}
                                    <span className="float-right">
                                        {job.yearStarted} - {job.yearEnded}
                                    </span>
                                </div>

                                <ul>
                                    {job.responsibilities.map(
                                        (responsibility) => 
                                        <li key={uniqid()} id={uniqid()}>{responsibility}</li>)}
                                </ul>
                                
                            </div>
                        )
                    }
                }
                )
                
                }
            </div>
        )
    }
}
  
  export default Experience;