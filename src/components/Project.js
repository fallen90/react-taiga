import React from "react";
import PropTypes from "prop-types";
import { Button, Alert, ListGroup, ListGroupItem } from "react-bootstrap";
import { propTypes } from "react-props-decorators";

import Tasks from "./Tasks";

@propTypes({
	slug: PropTypes.string.isRequired,
	project: PropTypes.object.isRequired
})
export default class Project extends React.Component {
	constructor(props){
		super(props);
		this.handleSelectMilestone = this.handleListGroupItemClick.bind(this);
		this.taskList = null;
	}

	componentDidMount() {
		let self = this;
		let fetchTasks = function(){
			if(!self.props.fetching){
				self.props.fetchTasks(self.props.project.project.id, self.props.project.selected_milestone);
			}
		};

		setInterval(function(){
			
			fetchTasks();
		
		}, 15000);

		fetchTasks();
	}

	handleListGroupItemClick(id){
		console.log(this, id);
		this.props.selectMilestone(id);
	}

	renderTaskList(tasks){
		let baseClass = 'list-group-item';
		let getStatusClass = function(status_name){
			return 'task-' + status_name.toLowerCase().replace(/\s/ig, '-');
		}

		tasks.sort((a,b) => (a.status_extra_info.name == "New" ? -1 : 1));

		tasks.reverse();

		this.taskList = tasks.map(tsk => {
			return (
				<ListGroupItem
					header={`#${tsk.ref} ${tsk.subject}`}
					key={tsk.id}
					className={`${getStatusClass(tsk.status_extra_info.name)}`}
				>
					US #{tsk.user_story_extra_info.ref}: {tsk.user_story_extra_info.subject}
				</ListGroupItem>
			)
		});

		this.taskList = <ListGroup>{this.taskList}</ListGroup>;
		return this.taskList;
	}

	componentWillMount(){
		if(this.props.project.fetched && !this.props.tasks.fetching){
			this.props.fetchTasks(this.props.project.project.id, this.props.project.selected_milestone);
		}
	}

	render() {
		const { project } = this.props.project;
		const { tasks } = this.props.tasks;
		let taskList = this.renderTaskList(tasks);
		let loadingAlert = null;
		if(this.props.tasks.fetching){
			loadingAlert = (
				<Alert bsStyle="info">
					<strong>Fetching Tasks</strong>
				</Alert>
			);
		} else {
			loadingAlert = (<h1>Tasks</h1>);
		}

		return (
			<div className="container" style={{ marginTop: "1%" }}>
				{loadingAlert}

				{taskList}
			</div>
		);
	}
}
