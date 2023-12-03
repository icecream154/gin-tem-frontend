import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import {WindowParamContext, WindowParamContextProvider} from './library/context/WindowContext';
import {DepartmentPage} from "./pages/admin/DepartmentPage";
import {CollegePage} from "./pages/admin/CollegePage";


function App() {
    return (
        <WindowParamContextProvider>
            <WindowParamContext.Consumer>
                {wpt => {
                    let wp = wpt.param;
                    return (
                        <Router basename='/'>
                            <Routes key={window.location.pathname} location={window.location}>
								<Route path="/admin/department" element={<DepartmentPage key={"DepartmentPage" + wp.version}></DepartmentPage>}></Route>
								<Route path="/admin/college" element={<CollegePage key={"CollegePage" + wp.version}></CollegePage>}></Route>

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
