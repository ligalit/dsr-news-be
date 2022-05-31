import React from 'react';
import {Select, Spin, Typography} from "antd";
import {newsStore} from "../store/newsStore";
import {observer} from 'mobx-react';
import {ITagsProps} from "../interfaces/interface";

const {Title} = Typography;
const {Option} = Select;

const TagsSelect = observer(({
                           title,
                           onChange,
                           mode,
                           defaultValue
                       }: ITagsProps) => {

    return (
        <div className="tags">
            {newsStore.isLogging ? <Spin size="large"/> : <>
                <Title style={{marginBottom: "0"}} level={4}>{title}</Title>
                <Select defaultValue={defaultValue} mode={mode} style={{width: "100%"}}
                        placeholder="Update news tags" onChange={onChange}>
                    {newsStore.newsTags.map((tag, i) => <Option key={i} value={tag}>{tag}</Option>)}
                </Select>
            </>}
        </div>
    );
});

export default TagsSelect;