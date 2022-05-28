import React, {useEffect, useMemo, useState} from 'react';
import {Select, Spin, Typography} from "antd";
import {newsStore} from "../store/newsStore";
import {observer} from 'mobx-react';
import {log} from "util";
import {adminStore} from "../store/adminStore";

const {Title} = Typography;
const {Option} = Select;

const Tags = observer(() => {

    useEffect(() => {
        newsStore.getNewsTags();
    }, [])

    const addNewTag = async (tags:string[])=>{
        await adminStore.updateTags(tags);
    }

    return (
        <div className="tags">
            {newsStore.isLogging ? <Spin size="large"/> : <>
                <Title style={{marginBottom: "0"}} level={4}>Update news tags</Title>
                <Select defaultValue={newsStore.newsTags} mode="tags" style={{width: "100%"}}
                        placeholder="Update news tags" onChange={addNewTag}>
                    {newsStore.newsTags.map((tag, i) => <Option key={i} value={tag}>{tag}</Option>)}
                </Select>
            </>}
        </div>
    );
});

export default Tags;