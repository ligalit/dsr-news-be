import React, {useEffect, useState} from 'react';
import {Button, Form, Input, Modal, Select} from "antd";
import {newsStore} from "../../store/newsStore";
import {observer} from "mobx-react";

const {Option} = Select;
const {TextArea} = Input;

const NewsForm = observer(() => {
    const [visible, setVisible] = useState(false);
    const [form] = Form.useForm();
    const handleModal = () => {
        setVisible(prevState => !prevState);
    };

    const onCreate = () => {
        form.validateFields()
            .then(values => {
                form.resetFields();
                const post = {
                    ...values,
                    publicationDate: Date.parse(new Date().toDateString())
                }
                newsStore.createNews(post);
                handleModal();
            })
            .catch(info => {
                console.log('Validate Failed:', info);
            });
    }
    useEffect(() => {
        newsStore.getNewsTags();
    }, [])

    return (
        <div>
            <Button type="primary" style={{width: "100%", height: "8vh", fontSize: "18px"}}
                    onClick={handleModal}>
                Create News
            </Button>
            <Modal title="Create new post" visible={visible} onCancel={handleModal} onOk={onCreate}>
                <Form
                    form={form}
                    name="news_form"
                    layout="vertical"
                    initialValues={{
                        tags: []
                    }}
                >
                    <Form.Item rules={[{required: true, message: 'Please input the Header of news!'}]}
                               name="header"><Input
                        placeholder="Header"/></Form.Item>
                    <Form.Item rules={[{required: true, message: 'Please input the description of news!'}]}
                               name="description">
                        <TextArea showCount rows={4} maxLength={500} allowClear
                                  placeholder="Description"/>
                    </Form.Item>
                    <Form.Item name="tags">
                        <Select allowClear showSearch mode="multiple" style={{width: "100%"}}
                                placeholder="Add news tags">
                            {newsStore.newsTags.map((tag, i) => <Option key={i} value={tag}>{tag}</Option>)}
                        </Select>
                    </Form.Item>
                    <Form.Item rules={[{required: true, message: 'Please select the state of news!'}]} name="state">
                        <Select allowClear style={{width: "100%"}}
                                placeholder="Publish or Draft">
                            <Option value="published">Publish</Option>
                            <Option value="draft">Draft</Option>
                        </Select>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
});

export default NewsForm;