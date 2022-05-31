import React, {useCallback} from 'react';
import {observer} from "mobx-react";
import {useNewsPost} from "../../hooks/useNewsPost";
import {Link} from "react-router-dom";

import AbsoluteButton from "../AbsoluteButton";
import Tags from "./Tags";
import {Card, Typography} from "antd";
import NewsModalForm from "../form_components/NewsModalForm";
import {DeleteOutlined, EditFilled} from '@ant-design/icons';

import {adminStore} from "../../store/adminStore";
import {newsStore} from '../../store/newsStore';
import {userStore} from "../../store/userStore";
import {INewsPost} from "../../interfaces/interface";

const {Meta} = Card;

const NewsPost = observer(({n, handleDelete, onVisible}: INewsPost) => {

    const showButton = useCallback(() => {
        if (userStore.role === "writer" && n.state === "draft")
            return true;
        return userStore.role === "admin";
    }, [n.state])

    const handleNewsPost = async (values: any) => {
        const updatedPost = {
            ...values,
            publicationDate: Date.parse(new Date().toDateString())
        };
        if (userStore.role === "writer")
            await newsStore.updateNews(n.id, updatedPost);
        else
            await adminStore.updateNews(n.id, updatedPost);
    }

    const [visible, handleModal, onCreate, form] = useNewsPost(handleNewsPost);

    return (
        <Card style={{position: "relative"}}
              title={<div>
                  {n.header}
                  {showButton() &&
                      <AbsoluteButton
                          right={"5%"}
                          icon={<EditFilled/>}
                          onClick={() => handleModal()}/>
                  }

                  <NewsModalForm
                      header={n.header} description={n.description} tags={n.tags}
                      title={"Update News"} visible={visible} handleModal={handleModal}
                      onCreate={onCreate} form={form} form_name={`${n.id}_news_form`}/>

                  {showButton() &&
                      <AbsoluteButton right={"0"} icon={<DeleteOutlined/>}
                                      danger onClick={() => handleDelete?.(n.id)}/>
                  }
              </div>}>
            <Card type="inner">
                <Typography.Paragraph>{n.description}</Typography.Paragraph>
            </Card>
            <Card type="inner">
                <Meta
                    title={<Link to={`/news/subscriptions?author=${n.author}`}
                    >
                        {n.authorNickname}
                    </Link>}
                    description={<Tags tags={n.tags}/>}
                />
            </Card>
        </Card>
    );
});

export default NewsPost;