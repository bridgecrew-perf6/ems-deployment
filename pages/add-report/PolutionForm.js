import { DeleteFilled, EditFilled, MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Card, Typography, Button, Col, Modal, Form, Input, Tooltip, Row, Table } from 'antd';
import React, { useState } from 'react'






const PolutionForm = (props) => {
    const initialState = {
        name: "",
        unit: "",
        quantity: 0,
        id: null,
    };

    const [waste, setWaste] = useState([]);

    const [form, openForm] = useState(false);

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name'
        },
        {
            title: 'Unit',
            dataIndex: 'unit',
            key: 'unit'
        },
        {
            title: 'Quantity',
            dataIndex: 'quantity',
            key: 'quantity'
        },
        {
            title: '',
            key: 'action',
            render: (text, items) => {
                <span>
                    <div style={{ whiteSpace: "nowrap" }}>
                        <DeleteFilled className="gx-link" onClick={e => sendDelete(record)} />
                        <EditFilled className="gx-link" style={{ paddingLeft: "10px" }} onClick={e => sendForEdit(record)} />
                    </div>
                </span>
            }
        }
    ]

    return (
        <>
            <Modal
                centered
                visible={props.wasteForm}
                footer={false}
                onCancel={() => props.openWasteForm()}
                okType={String}
                okText={"Add"}
                width={800}>
                <br />
                <div style={{ alignItems: "center" }}>
                    <Typography>Polution Protection Report Form</Typography>
                </div>
                <br />
                <br />
                {/* <Row>
                    <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                        <Form name="control-hooks" className="gx-form-row0">
                            <Form.Item
                                name="name"
                                label="Name"
                                rules={[
                                    {
                                        required: true,
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item
                                name="description"
                                label="Description"
                                rules={[
                                    {
                                        required: true,
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item>
                                <Button type="primary" htmlType="submit">
                                    Submit
                                </Button>

                            </Form.Item>
                        </Form>
                    </Col>
                </Row> */}
                <Table columns={columns} />
                <br />
                <br />
                <Form name="control-hooks" className="gx-form-row0">
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                        <Button htmlType="button" onClick={() => openForm(true)}>
                            Add Data
                        </Button>
                    </Form.Item>

                </Form>

            </Modal>

            <Modal
                centered
                visible={form}
                footer={false}
                onCancel={() => openForm()}
                okType={String}
                okText={"Add"}
                width={600}>
                <br />
                <br />
                <Row>
                    <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                        <Form name="control-hooks" className="gx-form-row0">
                            <Form.Item
                                name="name"
                                label="Name"
                                rules={[
                                    {
                                        required: true,
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item
                                name="unit"
                                label="Unit"
                                rules={[
                                    {
                                        required: true,
                                    },
                                ]}
                            >

                                <Input />
                            </Form.Item>

                            <Form.Item
                                name="quantity"
                                label="Quantity"
                                rules={[
                                    {
                                        required: true,
                                    },
                                ]}
                            >

                                <Input />
                            </Form.Item>
                            <Form.Item>
                                <Button type="primary" htmlType="submit">
                                    Submit
                                </Button>

                            </Form.Item>
                        </Form>
                    </Col>
                </Row>
            </Modal>

        </>
    );
}

export default PolutionForm;