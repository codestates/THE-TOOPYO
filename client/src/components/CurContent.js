import axios from 'axios';

function CurContent(info) {
    const [content, setContent] = useState({});
    const [writer, setWriter] = useState({});

    const getContentDetail = () => {
        axios.get(`https://localhost:4000/content/:${info}`, { headers: { authorization: '' } }).then((res) => {
            setContent(res.data.content);
            setWriter(res.data.writer);
        });
    };

    return (
        <div>
            <div className="location">
                Home <img id="" src=""></img> 현재 글
            </div>
        </div>
    );
}

export default CurContent;
