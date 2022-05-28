import React from 'react';
import {Card} from "antd";
import {INews} from "../../interfaces/interface";
import NotExist from "../not_components/NotExist";
import {Link} from "react-router-dom";

const {Meta} = Card;


const News = ({news}: { news: INews[] }) => {
    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            marginTop: "10px",
            width: "100%",
            background: "#f1f5f6"
        }}>
            {news.length > 0 ? news.map((n, i) => <Card style={{width: "100%"}} key={i} title={n.header}>
                <Meta description={<Link to={`/news/${n.authorNickname}`}>{n.authorNickname}</Link>}
                      title={n.description}/>
            </Card>) : <NotExist error={"News not found"}/>}
        </div>
    );
};

export default News;