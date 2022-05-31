import React from 'react';
import TagsSelect from "../TagsSelect";
import Users from "../user_components/Users";
import {adminStore} from "../../store/adminStore";
import {newsStore} from "../../store/newsStore";

const AdminUsersTags = () => {

    const addNewTag = async (tags: string[]) => {
        await adminStore.updateTags(tags);
    }

    return (
        <div>
            <TagsSelect title={"Update site tags"} onChange={addNewTag} mode="tags" defaultValue={newsStore.newsTags}/>
            <Users/>
        </div>
    );
};

export default AdminUsersTags;