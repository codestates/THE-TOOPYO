import '../../components/Thumbnail/Thumbnail.css';
import './Search.css';
import { Link } from 'react-router-dom';

function SearchThumbnail({ list, getContentDetail, close }) {
    const contentDetail = () => {
        getContentDetail(list.id);
    };

    return (
        <div>
            <Link to="/curContent">
                <div
                    className="searchThumbContainer"
                    onClick={() => {
                        contentDetail();
                        close();
                    }}>
                    <h1 className="thumbTitle">{list.title}</h1>
                    <img className="thumbPicture thumbPicture_1" src={list.picture_1}></img>
                    <img
                        id="thumbVersus"
                        src="https://cdn.discordapp.com/attachments/881710985335934979/881711027425787914/vs.png"
                        alt="versus"></img>
                    <img className="thumbPicture thumbPicture_2" src={list.picture_2}></img>
                    <div className="descript">{list.description}</div>
                </div>
            </Link>
        </div>
    );
}

export default SearchThumbnail;
