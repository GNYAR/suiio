import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { NavigationBar } from './components/NavigationBar'
import { Layout } from './components/Layout'
import { NoMatch } from './components/NoMatch'
import { Organize } from './components/Organize'
import { Conference } from './components/Conference'

// import { Jumbotron } from './components/Jumbotron';

function App() {
    return (
        // <h2>www</h2>
        <React.Fragment>
            <NavigationBar />
            <Layout>
                <Router>
                    <Switch>
                        <Route path="/organize" component={Organize} />
                        <Route path="/conference" component={Conference} />
                        <Route component={NoMatch} />
                    </Switch>
                </Router>
            </Layout>
        </React.Fragment>
    )
}

export default App
