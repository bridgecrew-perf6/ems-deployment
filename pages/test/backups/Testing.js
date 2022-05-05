import React, { useState } from 'react'
import { gql, useMutation, useQuery } from '@apollo/client';
import { UPSERT_NOTES } from '../../../constants/graphql/test/mutations';
import NoteList from '../NoteList';
import { Card, Input, Form, Button, Select, Col, Row } from "antd";
const { TextArea } = Input;

const layout = {
    labelCol: {
        span: 5,
        // span: 8,
    },
    wrapperCol: {
        span: 20,
        // span: 16,
    },
};

const tailLayout = {
    wrapperCol: {
        offset: 8,
        span: 16,
    },
};


const Testing = () => {
    const intialState = {
        title: "",
        content: "",
        id: null,
    };
    const [formAnt] = Form.useForm();
    const [form, setForm] = useState(intialState);
    const [refetch, setFetch] = useState(false);

    const [upsertNotes] = useMutation(UPSERT_NOTES);

    const handleSubit = async (data) => {

        const payload = data;

        if (form.id) {
            payload.id = form.id
        }

        try {
            upsertNotes({
                variables: payload,
            })
                .then(resp => {
                    setForm(intialState)
                    setFetch(!refetch)
                    console.log("resp", resp)
                })
                .catch(error => {
                    console.log("error", error)
                });

        } catch (error) {
            console.log(error)
        }
    }

    const getForEdit = (data) => {
        setForm((p) => ({ ...p, title: data.title, content: data.content, id: data.id }))
    }


    const onFinish = values => {
        console.log("values", values)
    };

    const onReset = () => {
        formAnt.resetFields();
    };

    const onFill = () => {
        formAnt.setFieldsValue({
            title: 'sample title',
            content: 'sample description'
        });
    };



    return (
        <>
            <Row>
                <Col lg={12} md={12} sm={24} xs={24}>
                    <Card className="gx-card" title="NOTE FORM">
                        <Form {...layout} form={formAnt} name="control-hooks" onFinish={handleSubit} className="gx-form-row0">
                            <Form.Item
                                name="title"
                                label="Title"
                                rules={[
                                    {
                                        required: true,
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item
                                name="content"
                                label="Content"
                                rules={[
                                    {
                                        required: true,
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item {...tailLayout}>
                                <Button type="primary" htmlType="submit">
                                    Submit
                                </Button>
                                <Button htmlType="button" onClick={onReset}>
                                    Reset
                                </Button>
                                <Button type="link" htmlType="button" onClick={onFill}>
                                    Fill form
                                </Button>
                            </Form.Item>
                        </Form>
                    </Card>
                </Col>
            </Row>

            <div className="mt-10">
                {/* <h1 className="text-center font-bold text-2xl mt-4">Notes</h1> */}
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleSubit(form)
                    }}
                    className="w-auto min-w-[25%] max-w-min mx-auto space-y-6 flex flex-col items-stretch"
                >
                    <input
                        type="text"
                        placeholder="title"
                        value={form.title}
                        onChange={(e) => setForm({ ...form, title: e.target.value })}
                        className="border-2 rounded border-gray-600 p-1"
                    />
                    <textarea
                        placeholder="Content"
                        value={form.content}
                        onChange={(e) => setForm({ ...form, content: e.target.value })}
                        className="border-2 rounded border-gray-600 p-1"
                    />
                    <button type="submit" className="bg-blue-500 text-white rounded p-1">
                        {form.id ? "Update" : "Add"}
                    </button>
                </form>
            </div>

            <NoteList refetch={refetch} forEdit={getForEdit} />
        </>
    )
}

export default Testing
