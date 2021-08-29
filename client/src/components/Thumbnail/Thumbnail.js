import './Thumbnail.css';
import axios from 'axios';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import CurContent from '../../pages/CurContent/CurContent';

function Thumbnail({ list }) {
    const [el, setElement] = useState({});
    const [content, setContent] = useState({}); // 게시글 정보
    const [writer, setWriter] = useState({}); // 작성자 정보

    const getContentDetail = () => {
        axios.get(`https://localhost:4000/content/:${el.id}`, { headers: { authorization: '' } }).then((res) => {
            setContent(res.data.content);
            setWriter(res.data.writer);
        });
    };

    return (
        <div className="app-thumb-entire">
            {list.map((el) => {
                setElement(el);
                <Link to="/CurContent">
                    <CurContent id={el.id} writer={writer} content={content}>
                        <div onClick={getContentDetail}>
                            <h1>{el.title}title</h1>
                            <img className="picture_1" src={el.picture_1}></img>
                            <span>vs</span>
                            <img className="picture_2" src={el.picture_2}></img>
                            <div className="descript">{el.description}</div>
                        </div>
                    </CurContent>
                </Link>;
            })}
        </div>
    );
}

export default Thumbnail;
{
    /* <div id="inner">
<div id="mainBanner"></div>
<div className="app-thumb-entire">
    <div className="container">
        <h1 className="thumbTitle">title</h1>
        <div className="picture_1"></div>
        <span>vs</span>
        <div className="picture_2"></div>
        <div className="descript">
            alsxmdetjfdualkfdkfbvfbfbfgfa<br></br>lsxmdetjfdualkfdkfbvfbfbfgfalsxmdetjfdual
        </div>
    </div>
    <div className="container">
        <h1 className="thumbTitle">title</h1>
        <div className="picture_1"></div>
        <span>vs</span>
        <div className="picture_2"></div>
        <div className="descript">
            alsxmdetjfdualkfdkfbvfbfbfgfalsx<br></br>mdetjfdualkfdkfbvfbfbfgfalsxmdetjfdual
        </div>
    </div>
    <div className="container">
        <h1 className="thumbTitle">title</h1>
        <div className="picture_1"></div>
        <span>vs</span>
        <div className="picture_2"></div>
        <div className="descript">
            alsxmdetjfdualkfdkfbvfbfbfgfalsxmde<br></br>tjfdualkfdkfbvfbfbfgfalsxmdetjfdual
        </div>
    </div>
    <div className="container">
        <h1 className="thumbTitle">title</h1>
        <div className="picture_1"></div>
        <span>vs</span>
        <div className="picture_2"></div>
        <div className="descript">
            alsxmdetjfdualkfdkfbvfbfbfgfalsxmdet<br></br>jfdualkfdkfbvfbfbfgfalsxmdetjfdual
        </div>
    </div>
    <div className="container">
        <h1 className="thumbTitle">title</h1>
        <div className="picture_1"></div>
        <span>vs</span>
        <div className="picture_2"></div>
        <div className="descript">
            alsxmdetjfdualkfdkfbvfbfbfgfalsxmdetjfd<br></br>ualkfdkfbvfbfbfgfalsxmdetjfdual
        </div>
    </div>
    <div className="container">
        <h1 className="thumbTitle">title</h1>
        <div className="picture_1"></div>
        <span>vs</span>
        <div className="picture_2"></div>
        <div className="descript">
            alsxmdetjfdualkfdkfbvfbfbfg<br></br>falsxmdetjfdualkfdkfbvfbfbfgfalsxmdetjfdua
        </div>
    </div>
</div>
</div> */
}
