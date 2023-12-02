import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import {WindowParamContext, WindowParamContextProvider} from './library/context/WindowContext';
import {AnimatePresence} from "framer-motion";
import {BankAccountPage} from "./pages/admin/BankAccountPage";
import {BankOrderPage} from "./pages/admin/BankOrderPage";


function App() {
    return (
        <WindowParamContextProvider>
            <WindowParamContext.Consumer>
                {wpt => {
                    let wp = wpt.param;
                    return (
                        <Router basename='/'>
                            <AnimatePresence onExitComplete={() => {window.scrollTo({
                                top: 0,
                                behavior: 'smooth'
                            })}} mode={"wait"}>
                                <Routes key={window.location.pathname} location={window.location}>
                                    <Route path="/admin/bankAccount"
                                           element={<BankAccountPage key={"BankAccountPage" + wp.version}></BankAccountPage>}></Route>
                                    <Route path="/admin/bankOrder"
                                           element={<BankOrderPage key={"BankOrderPage" + wp.version}></BankOrderPage>}></Route>
                                </Routes>
                            </AnimatePresence>
                        </Router>
                    )
                }
                }
            </WindowParamContext.Consumer>
        </WindowParamContextProvider>
    );
}

export default App;
