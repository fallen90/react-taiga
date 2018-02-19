import React from "react";
import {
	Form,
	FormGroup,
	Col,
	FormControl,
	ControlLabel,
	Checkbox,
	Button,
	Alert
} from "react-bootstrap";

export default class Login extends React.Component {
	doLogin() {
		const username = this.usernameInput.value;
		const password = this.passwordInput.value;

		this.props.login(username, password);
	}

	render() {
		const { rejected, error, logged_in, pending } = this.props;

		let userAlert;

		if(rejected){
			userAlert = (
				<Alert bsStyle="danger">
					<strong> Login Error : <code>{error._error_message}</code> </strong>
				</Alert>
			);
		} 

		return (
			<div className="container" style={{ marginTop : "10%" }}>
				<Col sm={8} smOffset={2}>
					<legend>Login with Taiga.io</legend>

					{ userAlert }

					<Form horizontal>
						<FormGroup controlId="formHorizontalEmail">
							<Col componentClass={ControlLabel} sm={2}>
								Username
							</Col>
							<Col sm={10}>
								<FormControl
									type="text"
									placeholder="Username"
									inputRef={ref => {
										this.usernameInput = ref;
									}}
								/>
							</Col>
						</FormGroup>

						<FormGroup controlId="formHorizontalPassword">
							<Col componentClass={ControlLabel} sm={2}>
								Password
							</Col>
							<Col sm={10}>
								<FormControl
									type="password"
									placeholder="Password"
									inputRef={ref => {
										this.passwordInput = ref;
									}}
								/>
							</Col>
						</FormGroup>

						<FormGroup>
							<Col smOffset={2} sm={10}>
								<Button type="button" bsStyle="primary" disabled={pending} onClick={this.doLogin.bind(this)}>
									{ pending ? 'SIGNING IN...' : 'SIGN IN' }
								</Button>
							</Col>
						</FormGroup>
					</Form>
				</Col>
			</div>
		);
	}
}
