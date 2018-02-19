import React, { Component } from "react";
import { connect } from "react-redux";

import Project from "./components/Project";
import Login from "./components/Login";

import { fetchTasks, fetchProject, selectMilestone, fetchMilestones } from "./actions/projectActions";
import { login } from "./actions/userActions";

import "./App.css";

@connect(
	store => {
		return {
			taiga : {
				project: store.project,
				tasks : store.tasks,
				milestones : store.milestones
			},
			user : store.user
		};
	},
	dispatch => {
		return {
			actions : {
				selectMilestone : (id) => {
					dispatch(selectMilestone(id));
				},
				fetchTasks : (project_id, milestone_id) => {
					dispatch(fetchTasks(project_id, milestone_id));
				},
				fetchProject: (slug) => {
					dispatch(fetchProject(slug));
				},
				fetchMilestones: (slug) => {
					dispatch(fetchMilestones(slug));
				},
				login : (username, password) => {
					dispatch(login(username, password));
				}
			}
		}
	}
)

class App extends Component {
	render() {
		const { user, taiga, actions} = this.props;

		const pseudoRouter = function(){
			if(user.logged_in){
				return <Project {...actions} {...taiga} slug="iansr-1day-m3-1" />
			} else {
				return <Login {...actions} {...user} />
			}
		}

		return (
			<div className="App">
				{pseudoRouter()}
			</div>
		);
	}
}

export default App;
