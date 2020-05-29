import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import GameList from "./projects/GameList";
import UserGameList from "./projects/UserGameList";
import GameCreate from "./projects/GameCreate";
import GameDelete from "./projects/GameDelete";
import GameShow from "./projects/GameShow";
import GameEdit from "./projects/GameEdit";
import Signout from "./auth/Signout";
import Signin from "./auth/Signin";
import Signup from "./auth/Signup";
import Header from "./Header";
import history from "../history";

const App = () => {
  return (
    <div className="ui container">
      <Router history={history}>
        <div>
          <Header />
          <Switch>
            <Route path="/" exact component={Signup} />
            <Route path="/projects" exact component={GameList} />
            <Route path="/signout" exact component={Signout} />
            <Route path="/signin" exact component={Signin} />
            <Route path="/allprojects" exact component={UserGameList} />
            <Route path="/projects/new" exact component={GameCreate} />
            <Route path="/projects/edit/:id" exact component={GameEdit} />
            <Route path="/projects/delete/:id" exact component={GameDelete} />
            <Route path="/projects/:id" exact component={GameShow} />
          </Switch>
        </div>
      </Router>
    </div>
  );
};

export default App;
