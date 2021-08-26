import './App.css';
import { useReducer, useState } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Nav from './components/Nav';
import Thumbnail from './components/Thumbnail';
import axios from 'axios';
import CurContent from './components/curContent';
//import Mypage from './pages/Mypage.js';
//import Login from './components/Login.js';
//import NewContent from './pages/Newcontent.js';
//import CurContent from './pages/CurContent.js';

function App() {
    const [isLogin, setIsLogin] = useState(false);

    const loginHandler = function () {
        setIsLogin(true);
    };

    const [contentList, setContentList] = useState([]);

    const getContentList = () => {
        axios.get('https://localhost:4000/content').then((res) => {
            setContentList(res.data.content);
        });
    };

    getContentList();

    return (
        <BrowserRouter>
            <div className="app">
                <Nav isLogin={isLogin} loginHandler={loginHandler}></Nav>
                <img className="main_banner" src="" alt=""></img>
                <Switch>
                    {/* <Route path="/Mypage">
                        <Mypage></Mypage>
                    </Route>
                    <Route path="/Login">
                        <Login></Login>
                    </Route>
                    <Route path="/SigUp">
                        <SignUp></SignUp>
                    </Route> 
                    <Route path="/NewContent">
                        <NewContent></NewContent>
                    </Route>
                    <Route path="CurContent">
                        <CurContent></CurContent>
                    </Route>
                    */}
                    <div>
                        <ul>
                            {contentList.map((list) => {
                                <Route path="/CurContent">
                                    <Thumbnail list={list}></Thumbnail>
                                </Route>;
                            })}
                        </ul>
                    </div>
                </Switch>
            </div>
        </BrowserRouter>
    );
}

export default App;
