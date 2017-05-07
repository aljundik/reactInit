var React = require('react');
var ReactDOM = require('react-dom');
var Popular = require('./Popular');
var Home = require('./Home');
var Battle = require('./Battle');
var Results = require('./Results');
var ReactRouter = require('react-router-dom');
var Switch = ReactRouter.Switch;
var Router = ReactRouter.BrowserRouter;
var Route = ReactRouter.Route;
var Nav = require('./Nav');



class App extends React.Component {
    render() {
        return (
            <Router>
                <div className='container'>
                    <Nav />
                    <Switch>
                        <Route exact path='/' component={Home} />
                        <Route exact path='/Battle' component={Battle} />
                        <Route path='/Battle/results' component={Results} />
                        <Route path='/popular' component={Popular} />
                        <Route render={function(){
                            
                            return <p>NOT FOUND!!!</p>
                        }}/>
                    </Switch>

                </div>
            </Router>
        )
    }
}

module.exports = App;