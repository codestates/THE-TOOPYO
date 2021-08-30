import './App.css';
import { useState, useEffect } from 'react';
import { BrowserRouter, Switch, Route, Redirect, useParams, Link } from 'react-router-dom';
import Nav from './components/nav/Nav';
import Thumbnail from './components/thumbnail/Thumbnail';
import axios from 'axios';
import SignupPage from './pages/signUp/SignUpPage';
import CurContent from './pages/curContent/CurContent';
import Mypage from './pages/mypage/Mypage';
import NewContent from './pages/newContent/NewContent';

// 방예은이 수정함!!!!!!!!!!!!
export default function App() {
    const [isLogin, setIsLogin] = useState();

    const loginHandler = function () {
        console.log('로그인됐다');
        setIsLogin(true);
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
                <Nav isLogin={isLogin} loginHandler={loginHandler} contentList={contentList}></Nav>
                <img className="mainBanner" src="" alt=""></img>

                <Switch>
                    <Route path="/mypage" component={Mypage} />
                    <Route path="/signup" component={SignupPage} />
                    <Route path="/newContent" component={NewContent} />
                    <Route path="/curContent" component={CurContent} />
                    <Route exact path="/">
                        <div className="app-thumb-entire">
                            {contentList.map((list) => {
                                return (
                                    <Link to="/CurContent">
                                        <Thumbnail list={list} key={list.id}></Thumbnail>
                                    </Link>
                                );
                            })}
                        </div>
                    </Route>
                    ;
                </Switch>
            </div>
        </BrowserRouter>
    );
}
