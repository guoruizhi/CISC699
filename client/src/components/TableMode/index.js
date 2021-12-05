import React, { Component } from "react";
import Table from "../Display/Table";
import connect from "react-redux/es/connect/connect";
import * as actions from "../../actions";
import Form from "semantic-ui-react/dist/commonjs/collections/Form/Form";
import "./main.css";

class MainPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: "",
    };
  }
  componentDidMount() {
    this.props.getEmployees();
  }

  changeHandler = (event) => {
    this.setState({ input: event.target.value });
  };

  submitHandler = (event) => {
    this.props.setAndUseSearch(this.state.input);
    this.setState({ input: "" });
    event.preventDefault();
  };

  profileHandler = (el) => {
    this.props.history.push(`/employees/${el._id}`);
    this.props.getOneEmployee(el._id);
  };

  deleteHandler = (id) => {
    this.props.deleteEmployee(id);
  };

  render() {
    if (this.props.employees.isFetching) {
      return <div>Getting data</div>;
    }
    return (
      <div>
        <div className="ui fixed borderless inverted menu">
          <div className="ui container">
            <a className="header item">Employee Management System</a>
            <Form onSubmit={this.submitHandler}>
              <div className="ui left icon input">
                <input
                  type="text"
                  placeholder="Search employees..."
                  value={this.state.input}
                  onChange={this.changeHandler}
                />
                <i className="users icon" />
              </div>
            </Form>
            <div className="right menu">
              <div className="ui buttons">
                <button className="ui button" onClick={this.props.resetSearch}>
                  <i className="icon user" />
                  Show All Employee
                </button>
                <button
                  className="ui button"
                  onClick={() => this.props.history.push(`/create`)}
                >
                  <i className="icon user" />
                  Create New Employee
                </button>
                <button
                  className="ui button"
                  onClick={() => this.props.history.push(`/scrum-board`)}
                >
                  <i className="icon user" />
                  Scrum Board
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="ui grid massive message">
          <Table
            employees={this.props.employees}
            getEmployees={this.props.getEmployees}
            search={this.props.search}
            profileHandler={this.profileHandler}
            deleteHandler={this.deleteHandler}
          />
        </div>
        <div className="ui hidden divider" />
        <div className="ui container">
          <div className="ui stackable grid">
            <div className="row">
              <div className="column">
                <div className="ui divider" />
                <footer>&copy; 2021 CISC 699</footer>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    employees: state.employees,
    search: state.search,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // Action to get all the employees
    getEmployees: () => {
      dispatch(actions.getAllEmployees());
    },
    setAndUseSearch: (text) => {
      dispatch(actions.setAndUseSearch(text));
    },
    resetSearch: () => {
      dispatch(actions.resetSearch());
    },
    deleteEmployee: (id) => {
      dispatch(actions.deleteEmployee(id));
    },
    getOneEmployee: (id) => {
      dispatch(actions.getOneEmployee(id));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainPage);
