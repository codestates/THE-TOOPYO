import './App.css';
import { useState, useEffect } from 'react';
import { BrowserRouter, Switch, Route, Redirect, useParams } from 'react-router-dom';
import Nav from './components/Nav/Nav';
import Thumbnail from './components/Thumbnail/Thumbnail';
import axios from 'axios';
import SignupPage from './pages/SignUp/SignUpPage';
import CurContent from './pages/CurContent/CurContent';
import Mypage from './pages/Mypage/Mypage';
import NewContent from './pages/NewContent/NewContent';

export default function App() {
    const [isLogin, setIsLogin] = useState();
    const [auth, setAuth] = useState('');

    const loginHandler = function (data) {
        setIsLogin(true);
        setAuth(data);
    };

    const [contentList, setContentList] = useState([]);

    const getContentList = () => {
        axios.get('http://localhost:80/content').then((res) => {
            setContentList(res.data.content);
        });
    };

    useEffect(() => {
        getContentList();
    }, []);

    return (
        <BrowserRouter>
            <div className="app">
                <Nav isLogin={isLogin} loginHandler={loginHandler}></Nav>
                <img className="mainBanner" src="" alt=""></img>
                <Switch>
                    <Route path="/mypage" component={Mypage} />
                    <Route path="/signup" component={SignupPage} />
                    <Route path="/NewContent" component={NewContent} />
                    <Route exact path="/">
                        {contentList.map((list) => {
                            return <Thumbnail list={list} key={list.id}></Thumbnail>;
                        })}
                    </Route>
                    ;
                </Switch>
            </div>
        </BrowserRouter>
    );
}
