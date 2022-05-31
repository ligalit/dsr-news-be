import React from 'react';
import {Button} from "antd";
import {newsStore} from "../../store/newsStore";
import {observer} from "mobx-react";
import NewsModalForm from "./NewsModalForm";
import {useNewsPost} from "../../hooks/useNewsPost";

const NewsForm = observer(() => {

    const handleNewsPost = (values: any) => {
        const post = {
            ...values,
            publicationDate: Date.parse(new Date().toDateString())
        }
        newsStore.createNews(post);
    }
    const [visible, handleModal, onCreate, form] = useNewsPost(handleNewsPost);

    return (
        <div>
            <Button type="primary" style={{width: "100%", height: "8vh", fontSize: "18px"}}
                    onClick={handleModal}>
                Create News
            </Button>
            <NewsModalForm title={"Create News Post"} handleModal={handleModal} visible={visible} form={form} form_name={"news_form"}
                           onCreate={onCreate}/>
        </div>
    );
});

export default NewsForm;