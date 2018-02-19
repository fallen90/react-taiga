import React from "react";
import PropTypes from "prop-types";
import {  Alert, ListGroup, ListGroupItem } from "react-bootstrap";
import { propTypes } from "react-props-decorators";

@propTypes({
	slug: PropTypes.string.isRequired,
	project: PropTypes.object.isRequired,
	fetchTasks : PropTypes.func.isRequired,
	fetchMilestones : PropTypes.func.isRequired
})
export default class Project extends React.Component {
	constructor(props){
		super(props);
		this.taskList = null;
		this.state = {
			milestones : []
		};
		
		this.handleSelectMilestone = this.handleListGroupItemClick.bind(this);
		this.handleSelectedMilestoneChange = this.handleSelectedMilestoneChange.bind(this);
	}

	componentWillMount(){
		const { project, fetchProject, slug } = this.props;

		if(!project.fetched){
			fetchProject(slug);
		}
	}

	componentWillReceiveProps(nextProps){
		const { project, tasks, milestones, fetchTasks, fetchMilestones } = nextProps;

		if(project.fetched && !tasks.fetching && !tasks.fetched){
			fetchTasks(project.project.id, project.selected_milestone);
		}

		if(project.fetched && !milestones.fetching && !milestones.fetched){
			fetchMilestones();
		}

		if(project.fetched && !tasks.fetching){
			if(project.project.selected_milestone != this.props.project.project.selected_milestone){
				fetchTasks(project.project.id, project.selected_milestone);
			}
		}
	}

	componentDidMount() {
		let self = this;
		let fetchTasks = function(){
			if(!self.props.tasks.fetching){
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
		let getStatusClass = function(status_name){
			return 'task-' + status_name.toLowerCase().replace(/\s/ig, '-');
		}

		tasks.sort((a,b) => (a.status_extra_info.name === "New" ? -1 : 1));

		tasks.reverse();

		this.taskList = tasks.map(tsk => {
			return (
				<ListGroupItem
					header={`#${tsk.ref} ${tsk.subject}`}
					key={tsk.id}
					className={`${getStatusClass(tsk.status_extra_info.name)}`}
					href={`https://tree.taiga.io/project/iansr-1day-m3-1/task/${tsk.ref}`}
					target='_new'
					>
					<a href={`https://tree.taiga.io/project/iansr-1day-m3-1/us/${tsk.user_story_extra_info.ref}`} target='_new'>
						US #{tsk.user_story_extra_info.ref}: {tsk.user_story_extra_info.subject}
					</a>
				</ListGroupItem>
			)
		});

		this.taskList = <ListGroup>{this.taskList}</ListGroup>;
		return this.taskList;
	}
	
	handleSelectedMilestoneChange(event){
		this.props.selectMilestone(event.target.value);
	}

	renderMilestones(){
		return (
			<select className="form-control" onChange={this.handleSelectedMilestoneChange}>
				{this.props.milestones.milestones.map((sprint, index) => (
					<option value={sprint.id} key={`milestone-${index}`}>{sprint.name}</option>
				))}
			</select>
		);
	}

	render() {
		const { project } = this.props.project;
		const { tasks } = this.props.tasks;
		let taskList = this.renderTaskList(tasks);
		let loadingAlert = null;
		if(this.props.tasks.fetching){
			loadingAlert = (
				<sup>loading...</sup>
			);
		} else {
			loadingAlert = null;
		}

		return (
			<div className="container" style={{ marginTop: "1%" }}>
				{ this.renderMilestones() }

				<h1>Tasks { loadingAlert }</h1>

				{ taskList }
			</div>
		);
	}
}
