import React, {useEffect, useMemo, useState} from 'react';
import {observer} from "mobx-react";
import {Outlet, useSearchParams} from "react-router-dom";
import {newsStore} from "../../store/newsStore";
import TagsSelect from "../TagsSelect";
import {userStore} from "../../store/userStore";
import {Pagination} from "antd";

const SubscriptionNews = observer(() => {

    const [current, setCurrent] = useState(1);
    const [params, setParams] = useSearchParams();

    const memoNews = useMemo(() => newsStore.news, [newsStore.news])
    const memoTags = useMemo(() => userStore.tags, [userStore.tags])

    useEffect(() => {
        console.log(Object.fromEntries([...params]));
        newsStore.getQueryNews({...Object.fromEntries([...params])})
    }, [params]);

    const onChangeTags = (values: string[]) => {
        setParams({tags: values.join(",")}, {replace: true})
        userStore.updateUserTags(values);
    };

    const onChangePage = (page: number) => {
        const offset = (page - 1) * 10;
        setCurrent(page);
        setParams({tags: userStore.tags.join(","), offset: String(offset)}, {replace: true})
    };

    return (
        <div>
            <TagsSelect title={"Add your favourite tags"} onChange={onChangeTags}
                        mode="multiple"
                        defaultValue={memoTags}/>
            <Outlet context={memoNews}/>
            <div style={{display: "flex", justifyContent: "center", margin: "50px"}}>
                <Pagination defaultPageSize={10} onChange={onChangePage} current={current}
                            total={newsStore.totalNewsCount}/>
            </div>
        </div>
    );
});

export default SubscriptionNews;