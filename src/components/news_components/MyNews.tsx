import React, {useEffect, useMemo, useState} from 'react';
import {Outlet} from "react-router-dom";
import {newsStore} from "../../store/newsStore";
import {observer} from "mobx-react";
import {Radio, RadioChangeEvent, Space} from "antd";
import {NewsState} from "../../utils/enums";

const MyNews = observer(() => {

    const [newsState, setNewsState] = useState<NewsState>(0);

    const memoNews = useMemo(() => {
        if (newsState === 0)
            return newsStore.news
        else if (newsState === 1)
            return newsStore.news.filter((n) => n.state === "draft");
        else
            return newsStore.news.filter((n) => n.state === "published");
    }, [newsStore.news, newsState]);

    useEffect(() => {
        newsStore.getMyNews()
    }, []);

    return (
        <div style={{
            marginTop: "10px",
        }}>
            <Radio.Group defaultValue={newsState}
                         onChange={(e: RadioChangeEvent) => setNewsState(e.target.value)}>
                <Space align="center" size='large' direction="horizontal">
                    <Radio value={0}>All my news</Radio>
                    <Radio value={1}>Only drafts</Radio>
                    <Radio value={2}>Only published</Radio>
                </Space>
            </Radio.Group>
            <Outlet context={memoNews}/>
        </div>
    );
});

export default MyNews;