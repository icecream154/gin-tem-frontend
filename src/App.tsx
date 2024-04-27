import './App.css';
import {BrowserRouter as Router, Routes} from 'react-router-dom';
import {WindowParamContext, WindowParamContextProvider} from './library/context/WindowContext';


function App() {
    return (
        <WindowParamContextProvider>
            <WindowParamContext.Consumer>
                {wpt => {
                    let wp = wpt.param;
                    return (
                        <Router basename='/'>
                            <Routes key={window.location.pathname} location={window.location}>
                            </Routes>
                        </Router>
                    )
                }
                }
            </WindowParamContext.Consumer>
        </WindowParamContextProvider>
    );
}

export default App;
