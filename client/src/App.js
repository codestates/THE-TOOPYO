import './App.css';
import { useReducer, useState } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Nav from './components/Nav';
import Thumbnail from './components/Thumbnail';
import axios from 'axios';
import SignupPage from './pages/SignUp/SignUpPage';
import CurContent from './pages/CurContent/CurContent';

export default function App() {
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
                <img className="mainBanner" src="" alt=""></img>
                <Switch>
                    {/* <Route path="/Mypage">
                        <Mypage></Mypage>
                    </Route> */}
                    {/* <Route path="/Login">
                        <Login></Login>
                    </Route> */}
                    <Route path="/curcontent" component={CurContent} />
                    <Route path="/signup" component={SignupPage} />
                    {/* <Route path="/NewContent">
                        <NewContent></NewContent>
                    </Route> */}
                    {/* <Route path="CurContent">
                        <CurContent></CurContent>
                    </Route> */}
                    <div>
                        <ul>
                            {contentList.map((list) => {
                                <li>
                                    <Thumbnail list={list}></Thumbnail>
                                </li>;
                            })}
                        </ul>
                    </div>
                </Switch>
            </div>
        </BrowserRouter>
    );
}
