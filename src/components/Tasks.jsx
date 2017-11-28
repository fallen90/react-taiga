import React from "react";
import PropTypes from "prop-types";
import { Button, Alert } from "react-bootstrap";
import { propTypes, defaultProps } from "react-props-decorators";

@propTypes({
	tasks: PropTypes.array.isRequired
})
@defaultProps({
	tasks: []
})
export default class Tasks extends React.Component {
	componentDidMount(){
		this.props.fetchTasks();
	}

	render() {
		let taskList = null;
		const { rejected, tasks, fetching, fetched, error, fetchTasks} = this.props;

		if(!rejected){
			taskList = tasks.map(task => (
				<h1 key={task.id}>{task.description}</h1>
			));
		} else {
			taskList = (
				<Alert bsStyle="danger">
					<strong>Error : <code>{error._error_message}</code></strong>
				</Alert>
			);
		}

		if (fetching) {
			return (
				<div className="container">
					<Alert bsStyle="warning">
						<strong>Loading Tasks...</strong>
					</Alert>
				</div>
			);
		}

		return (
			<div className="container" style={{ marginTop : "5%"}}>
				{taskList}
				<Button bsStyle="success" onClick={fetchTasks}>
					Fetch Tasks
				</Button>
			</div>
		);
	}
}
