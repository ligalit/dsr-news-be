import React from 'react';
import {Button} from "antd";
import {userStore} from "../../store/userStore";
import {CheckCircleOutlined, CloseCircleOutlined} from "@ant-design/icons";
import {observer} from "mobx-react";

const Tags = observer(({tags}: { tags: string[] }) => {
    return (
        <div>
            Tags: {tags.map((t, i) => <Button key={i} onClick={() => userStore.updateUserTags(t)}
                                              icon={!userStore.tags.includes(t) ? <CheckCircleOutlined/> :
                                                  <CloseCircleOutlined/>}
                                              style={{color: "grey", marginRight: "10px"}}>{t}</Button>)}
        </div>
    );
});

export default Tags;