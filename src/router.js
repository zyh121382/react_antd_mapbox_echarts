import React, { Component } from 'react';
import { Router, Route, browserHistory, IndexRoute} from 'react-router';
import App from './App';
import HelloWorld from './pages/HelloWorld';
import FunctionTest from './pages/FunctionTest';
import Heatmap from './pages/Heatmap';
import Analysis from './pages/Analysis';
import MainPage from './pages/MainPage';

class Routers extends Component {
    render(){
        return(
            <Router history={ browserHistory }>
                <Route path="/" component={App}>
                    <IndexRoute component={MainPage} />
                    <Route path="pageHello" component={HelloWorld} />
                    <Route path="pageTest" component={FunctionTest} />
                    <Route path="Heatmap" component={Heatmap} />
                    <Route path="Analysis" component={Analysis} />
                    <Route path="MainPage" component={MainPage} />     
                </Route>
            </Router> 
        )
    }   
}
export default Routers;