import React, { Component } from 'react';
import { Router, Route, browserHistory, IndexRoute} from 'react-router';
import App from './App';
import HelloWorld from './pages/HelloWorld';
import FunctionTest from './pages/FunctionTest';
import Analysis from './pages/Analysis';

class Routers extends Component {
    render(){
        return(
            <Router history={ browserHistory }>
                <Route path="/" component={App}>
                    <IndexRoute component={HelloWorld} />
                    <Route path="pageHello" component={HelloWorld} />
                    <Route path="pageTest" component={FunctionTest} />
                    <Route path="Analysis" component={Analysis} />    
                </Route>
            </Router> 
        )
    }   
}
export default Routers;