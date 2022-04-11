/* LIBRARIES */
import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";

/* FUNCTIONS */
import { checkCookie } from "./utils/useCookies";

/* CONSTANTS */
import { userAccessTokenName } from "./constants";

/* COMPONENTS */
import LazyLoadErrorBoundary from "./commonComponents/LazyLoadErrorBoundary";
import Profile from "./pages/Profile/Profile";
import ResetPassword from "./pages/Profile/ResetPassword/ResetPassword";

const Dashboard = lazy(() => import("./rootDirectories/Dashboard/Dashboard"));
const Login = lazy(() => import("./rootDirectories/Login/Login"));
const Report = lazy(() => import("./pages/Report"));

class App extends React.Component {
    render() {
        return (
            <Router>
                <LazyLoadErrorBoundary>
                    <Switch>

                        <Route path="/report" render={() => (
                            <Suspense fallback={""}>
                                <Report />
                            </Suspense>
                        )} />

                        <Route path="/login" render={() => (
                            <Suspense fallback={""}>
                                <Login />
                            </Suspense>
                        )} />
                        <Route path="/dashboard/profile" render={() => (
                            <Suspense fallback={""}>
                                <ResetPassword/>
                            </Suspense>
                        )} />

                        {
                            !checkCookie(userAccessTokenName) && (
                                <Route>
                                    <Redirect to="/login" />
                                </Route>
                            )
                        }

                        <Redirect exact from="/" to="/dashboard" />

                        <Route exact path="/dashboard" render={() => (
                            <Suspense fallback={"Loading..."}>
                                <Dashboard />
                            </Suspense>
                        )} />

                        <Route render={() => <Redirect to="/login" />} />
                    </Switch>
                </LazyLoadErrorBoundary>
            </Router>
        )
    }
}

export default App;