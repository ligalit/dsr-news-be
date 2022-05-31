import React from 'react';
import {Form, Input, Modal, Select} from "antd";
import {newsStore} from "../../store/newsStore";
import {INewsModalProps} from "../../interfaces/interface";
import {observer} from "mobx-react";

const {Option} = Select;
const {TextArea} = Input;

const NewsModalForm = observer((props: INewsModalProps) => {
    const {
        header, description, tags,
        visible, handleModal, onCreate,
        form, form_name, title
    } = props;

    return (
        <Modal title={title} visible={visible} onCancel={handleModal} onOk={onCreate}>
            <Form
                form={form}
                name={form_name}
                initialValues={{
                    header,
                    description,
                    tags
                }}
            >
                <Form.Item rules={[{required: true, message: 'Please input the Header of news!'}]}
                           name="header"><Input
                    placeholder="Header"/></Form.Item>
                <Form.Item rules={[{required: true, message: 'Please input the description of news!'}]}
                           name="description">
                    <TextArea showCount rows={4} minLength={20} maxLength={500} allowClear
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
    );
});

export default NewsModalForm;