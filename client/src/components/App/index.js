import React, { Component } from "react";
import BrowserRouter from "react-router-dom/es/BrowserRouter";
import Route from "react-router-dom/es/Route";
import Form from "../Form";
import Edit from "../Edit";
import Profile from "../Profile";
import Manager from "../Manager";
import TableMode from "../TableMode";
import Main from "../Kanban";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Route
            path="/"
            exact={true}
            render={(props) => <TableMode {...props} />}
          />
          <Route path="/create" render={(props) => <Form {...props} />} />
          <Route path="/edit/:id" render={(props) => <Edit {...props} />} />
          <Route
            path="/employees/:id"
            render={(props) => <Profile {...props} />}
          />
          <Route
            path="/managers/:id"
            render={(props) => <Manager {...props} />}
          />
          <Route path="/scrum-board" render={(props) => <Main {...props} />} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
