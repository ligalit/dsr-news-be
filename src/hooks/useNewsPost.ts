import {useState} from "react";
import {Form, FormInstance} from "antd";

export const useNewsPost = (handleNewsPost: (values: any) => void): [boolean, (() => void), (() => void), FormInstance<any>] => {
    const [visible, setVisible] = useState(false);
    const [form] = Form.useForm();
    const handleModal = () => {
        setVisible(prevState => !prevState);
    };

    const onCreate = async () => {
        const values = await form.validateFields()
        form.resetFields();
        await handleNewsPost(values);
        handleModal();
    };
    return [visible, handleModal, onCreate, form];
}