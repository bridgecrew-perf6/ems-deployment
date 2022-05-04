import React, { useContext, useState } from 'react'
import { Button, Form, Row, Col, Input, Card, DatePicker, Table, Select, Modal, TimePicker } from 'antd';
import PowerhouseList from './PowerhouseList';
import GeneratorList from './GeneratorList';
import { useMutation, useQuery } from '@apollo/client';
import { GENERATOR_LIST, POW_SHIFT_LIST } from '../../../constants/graphql/add-report/queries';
import { DailyReportDetailsContext } from './[id]';
import { NEW_INSP, UPSERT_GENSTATUS, UPSERT_POWCHECK } from '../../../constants/graphql/monitor-report-form/mutations';
import RemarksPower from './RemarksPower';
import { ADD_UPD_GENERATORSTATUS, ADD_UPD_POWERHOUSE, UPSERT_INSPECT } from '../../../constants/graphql/add-report/mutations';
import { POW_INSP_ID } from '../../../constants/graphql/monitor-report-form/queries';
import { parseInt } from 'lodash';
import moment from 'moment';
import { useAuth } from '../../../util/use-auth';


const PowerhouseReportForm = () => {



  const { userDetails } = useAuth();

  console.log("user details", userDetails);

  const [openGenForm, setGenForm] = useState(false);
  const [openPowForm, setPowForm] = useState(false);


  const { monitoring_id } = useContext(DailyReportDetailsContext);

  const { loading: GetInspIdLoading, data: GetInspId , refetch } = useQuery(POW_INSP_ID, {
    variables: {
      monitoringId: parseInt(monitoring_id)
    }
  });

  console.log("Get Pow Insp ID", GetInspId);

  const { loading: GenNamesLoading, data: GenNames } = useQuery(GENERATOR_LIST);

  const [refetch_gen, setFetch_gen] = useState(false);
  const [refetch_pow, setFetch_pow] = useState(false);
  const [refetch_insp,setFetch_insp] = useState(false);


  const initialState_GenStat = {
    id: null,
    generator_id: parseInt(GenNames?.generators[0]?.id),
    inspection_id: null,
    bat_voltage: null,
    syncro_stat: "",
    coolant: "",
    fuel_level: "",
    engine_oil: "",
  };

  const initialState_PowCheck = {
    inspection_id: null,
    id: null,
    inspection_id: null,
    mode: "Manual",
    live_curr_1: null,
    live_curr_2: null,
    live_curr_3: null,
    live_volt_1: null,
    live_volt_2: null,
    live_volt_3: null,
    duration_start: "",
    duration_end: "",
    shift_order: "",
    power_type: "Live Electric",
    ats: 1,
    frequency: null
  };

  const [formAntGenStat] = Form.useForm();
  const [formAntPowCheck] = Form.useForm();
  const [formGenStat, setFormGenStat] = useState(initialState_GenStat);
  const [formPowCheck, setFormPowCheck] = useState(initialState_PowCheck);

  // const [newInspPower] = useMutation(NEW_INSP);



  const [upsertGenStat] = useMutation(UPSERT_GENSTATUS);
  const [upsertPowCheck] = useMutation(UPSERT_POWCHECK);


  const [upsertInspection] = useMutation(UPSERT_INSPECT);

  const submitGenStatus = async (data) => {

    if (!GetInspId) {
      try {
        upsertInspection({
          variables: {
            timeInspected: "",
            remarks: "",
            inspectionIncharge: userDetails?.id, 
            classification: "Power", 
            monitoringId: parseInt(monitoring_id)
          }
        }).then(resp => {
          console.log(resp)
          setFetch_insp(!refetch_insp);
        }).catch(error => {
          console.log(error)
          setFetch_insp(!refetch_insp);
        })
      } catch (error) {
        console.log(error);
      }
    }

    try {
      upsertGenStat({
        variables: {
          // upsertGeneratorStatusId: formGenStat.id,
          // generatorId: parseInt(data.gen_name),
          // inspectionId: parseInt(GetInspId?.inspection.id),
          // batVoltage: parseFloat(data.bat_volt),
          // syncroStat: data.syncro_stat,
          // coolant: data.coolant,
          // fuelLevel: data.fuel_level,
          // engineOil: data.engine_oil

          // inspectionId: 4,
          // upsertGeneratorStatusId: null,
          // batVoltage: 324,
          // syncroStat: "empty",
          // coolant: "full",
          // fuelLevel: "full",
          // engineOil: "full",
          // generatorId: 42

          inspectionId: GetInspId?.inspection_power[0].id,
          upsertGeneratorStatusId: formGenStat.id,
          batVoltage: parseFloat(data.bat_voltage),
          syncroStat: data.syncro_stat,
          coolant: data.coolant,
          fuelLevel: data.fuel_level,
          engineOil: data.engine_oil,
          generatorId: data.gen_name
        }
      })
        .then(resp => {
          setFormGenStat(initialState_PowCheck)
          setFetch_gen(!refetch_gen);
          console.log("resp", resp)
        })
        .catch(error => {
          setFetch_gen(!refetch_gen);
          console.log("error", error)
        });


    } catch (error) {
      console.log(error)
    }


    console.log("Gen Status List", data);

    formAntGenStat.resetFields();
    setGenForm(false);
  }




  const submitPowCheck = (data) => {

    if (!GetInspId) {
      try {
        upsertInspection({
          variables: {
            timeInspected: "",
            remarks: "",
            inspectionIncharge: null,
            classification: "Power",
            monitoringId: parseInt(monitoring_id)
          }
        }).then(resp => {
          console.log(resp)
          setFetch_insp(!refetch_insp);
          refetch()
        }).catch(error => {
          console.log(error)
          setFetch_insp(!refetch_insp);
          refetch();
        })
      } catch (error) {
        console.log(error);
      }
    }

    const dataload = data;

    // if (formPowCheck.id) {
    //   dataload.id = formPowCheck.id;
    // }

    // if (GetInspId?.inspection_power[0].id) {
    //   dataload.inspection_id = GetInspId?.inspection_power[0].id;
    // }

    try {
      upsertPowCheck({
        variables: {
          upsertPowerShiftId: formPowCheck.id,
          inspectionId: GetInspId?.inspection_power[0].id,
          mode: data.mode,
          lineVolt1: parseFloat(data.live_volt_1),
          lineVolt2: parseFloat(data.live_volt_2),
          lineVolt3: parseFloat(data.live_volt_3),
          lineCurr1: parseFloat(data.live_curr_1),
          lineCurr2: parseFloat(data.live_curr_2),
          lineCurr3: parseFloat(data.live_curr_3),
          durationStart: data.duration_start,
          durationEnd: data.duration_end,
          shiftOrder: parseInt(data.ats),
          frequency: parseFloat(data.frequency),
          powerType: data.type
        }
      })
        .then(resp => {
          setFormPowCheck(initialState_PowCheck)
          setFetch_pow(!refetch_pow);
          console.log("resp", resp)
        })
        .catch(error => {
          setFetch_pow(!refetch_pow);
          console.log("error", error)
        });

    } catch (error) {
      console.log(error)
    }

    console.log("Gen Pow Check", data);

    formAntPowCheck.resetFields();
    setPowForm(false);
  }

  const sendEditPowCheck = (data) => {
    console.log(data);
    formAntPowCheck.setFieldsValue({
      mode: data.mode,
      live_curr_1: data.live_curr_1,
      live_curr_2: data.live_curr_2,
      live_curr_3: data.live_curr_3,
      live_volt_1: data.live_volt_1,
      live_volt_2: data.live_volt_2,
      live_volt_3: data.live_volt_3,
      duration_start: moment(data.duration_start, 'HH:mm:ss A'),
      duration_end: moment(data.duration_end, 'HH:mm:ss A'),
      ats: data.shift_order,
      type: data.power_type,
      frequency: data.frequency

    });
    setFormPowCheck((p) => ({ ...p, id: data.id }));
    console.log(formPowCheck);
    setPowForm(true);
  }

  const sendEditGenStat = (data) => {
    console.log(data);
    formAntGenStat.setFieldsValue({
      gen_name: data.generator_id,
      bat_volt: data.bat_voltage,
      engine_oil: data.engine_oil,
      fuel_level: data.fuel_level,
      coolant: data.coolant,
      syncro_stat: data.syncro_stat,
    });
    setGenForm(true);
    setFormGenStat((p) => ({ ...p, id: data.id }))
  }

  return (
    <>
      <div>
        <br />
        <Row>
          <Col xl={6} lg={6} md={12} sm={12} xs={12}>
            <p>POWERHOUSE</p>
          </Col>

        </Row>
        <Button type='dashed' onClick={() => { setPowForm(true); formAntPowCheck.resetFields(); }}>Add Powerhouse Check</Button>
        <br />
        <PowerhouseList forEdit={sendEditPowCheck} refetch={refetch_pow} />
        <br /><br /><br />
        <Button type='dashed' onClick={() => { setGenForm(true); formAntGenStat.resetFields(); }}>Add Generator Check</Button>
        <br />
        <GeneratorList forEdit={sendEditGenStat} refetch={refetch_gen} />
        <br />

        <Modal centered footer={null} visible={openGenForm} onCancel={() => setGenForm()} okType={String} okText={"Add"} width={800}>
          <br />
          <h1 style={{ fontFamily: "Bold", alignContent: "center" }}>Generator Check</h1>
          <br />
          <Row>
            <Col lg={24} md={24} sm={24} xs={24}>
              <Form form={formAntGenStat} name="control-hooks" className="gx-form-row0" onFinish={submitGenStatus}>
                <Row>
                  <Col lg={8} md={12} sm={12} xs={12}>
                    <Form.Item name="gen_name" label={"Generator"} rules={[{ required: true }]}>
                      <Select className="gx-mr-3 gx-mb-3" style={{ width: 150 }} >
                        {GenNames?.generators.map((a) => (
                          <Select.Option value={a.id}>{a.name}</Select.Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col lg={8} md={12} sm={12} xs={12}>
                    <Form.Item name="bat_volt" label={"Bat. Voltage"}>
                      <Input type={'number'} />
                    </Form.Item>
                  </Col>
                  <Col lg={8} md={12} sm={12} xs={12}>
                    <Form.Item name="engine_oil" label={"Engine Oil"}>
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col lg={8} md={12} sm={12} xs={12}>
                    <Form.Item name="fuel_level" label={"Fuel Level"}>
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col lg={8} md={12} sm={12} xs={12}>
                    <Form.Item name="coolant" label={"Coolant"}>
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col lg={8} md={12} sm={12} xs={12}>
                    <Form.Item name="syncro_stat" label={"Syncro Stat"}>
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col lg={12} md={12} sm={12} xs={12}>
                    <Form.Item>
                      <Button type="primary" htmlType="submit">
                        Add Data
                      </Button>
                    </Form.Item>
                  </Col>
                </Row>
              </Form>
            </Col>
          </Row>
        </Modal>

        <Modal centered footer={null} visible={openPowForm} onCancel={() => setPowForm()} okType={String} okText={"Add"} width={850}>
          <br />
          <h1 style={{ fontFamily: "Bold", alignContent: "center" }}>Powerhousing Check</h1>
          <br />
          <Row>
            <Col lg={24} md={24} sm={24} xs={24}>
              <Form form={formAntPowCheck} name="control-hooks" className="gx-form-row0" onFinish={submitPowCheck}>
                <Row>
                  <Col lg={8} md={12} sm={12} xs={12}>
                    <Form.Item name="type" label={"Type"}>
                      <Select className="gx-mr-3 gx-mb-3" onChange={(value) => setFormPowCheck((prev) => ({ ...prev, power_type: value }))} style={{ width: 120 }}>
                        <Select.Option value="Live Electric">Live Electric</Select.Option>
                        <Select.Option value="Generator">Generator</Select.Option>
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col lg={8} md={12} sm={12} xs={12}>
                    <Form.Item name="ats" label={"ATS"}>
                      <Select className="gx-mr-3 gx-mb-3" /* onChange={(value) => setFormPowCheck((prev) => ({ ...prev, ats: value }))} */ style={{ width: 120 }}>
                        <Select.Option value={1}>1</Select.Option>
                        <Select.Option value={2}>2</Select.Option>
                        <Select.Option value={3}>3</Select.Option>
                        <Select.Option value={4}>4</Select.Option>
                        <Select.Option value={5}>5</Select.Option>
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col lg={8} md={12} sm={12} xs={12}>
                    <Form.Item name="mode" label={"Mode"}>
                      <Select className="gx-mr-3 gx-mb-3" style={{ width: 120 }}>
                        <Select.Option value="Manual">Manual</Select.Option>
                        <Select.Option value="Auto">Auto</Select.Option>
                      </Select>
                    </Form.Item>
                  </Col>
                </Row>
                <Row>
                  <Col lg={8} md={12} sm={12} xs={12}>
                    <Form.Item name="live_volt_1" label={"Line Voltage 1"}>
                      <Input type='number' />
                    </Form.Item>
                  </Col>
                  <Col lg={8} md={12} sm={12} xs={12}>
                    <Form.Item name="live_volt_2" label={"Line Voltage 2"}>
                      <Input type='number' />
                    </Form.Item>
                  </Col>
                  <Col lg={8} md={12} sm={12} xs={12}>
                    <Form.Item name="live_volt_3" label={"Line Voltage 3"}>
                      <Input type='number' /*onChange={() => setFormPowCheck((prev) => ({ ...prev, line_volt_3: event.target.value }))} */ />
                    </Form.Item>
                  </Col>
                </Row>
                <Row>
                  <Col lg={8} md={12} sm={12} xs={12}>
                    <Form.Item name="live_curr_1" /* onChange={() => setFormPowCheck((prev) => ({ ...prev, line_curr_1: event.target.value }))} */ label={"Line Current 1"}>
                      <Input type='number' />
                    </Form.Item>
                  </Col>
                  <Col lg={8} md={12} sm={12} xs={12}>
                    <Form.Item name="live_curr_2" label={"Line Current 2"}>
                      <Input type='number' />
                    </Form.Item>
                  </Col>
                  <Col lg={8} md={12} sm={12} xs={12}>
                    <Form.Item name="live_curr_3" label={"Line Current 3"}>
                      <Input type='number' />
                    </Form.Item>
                  </Col>
                </Row>
                <Row>
                  <Col lg={8} md={12} sm={12} xs={12}>
                    <Form.Item name="frequency" label={"Frequency"}>
                      <Input type='number' />
                    </Form.Item>
                  </Col>
                  <Col lg={0} md={24} sm={12} xs={12}>
                  </Col>
                  <Col lg={8} md={12} sm={12} xs={12}>
                    <Form.Item name="duration_start" label={"Started At"}>
                      <TimePicker use12Hours={true} />
                    </Form.Item>
                  </Col>
                  <Col lg={8} md={12} sm={12} xs={12}>
                    <Form.Item name="duration_end" label={"Ended At"}>
                      <TimePicker use12Hours={true} />
                    </Form.Item>
                  </Col>
                </Row>
                <br />
                <Row>
                  <Col lg={12} md={12} sm={12} xs={12}>
                    <Form.Item>
                      <Button type="primary" htmlType="submit">
                        Add Data
                      </Button>
                    </Form.Item>
                  </Col>
                </Row>
              </Form>
            </Col>
          </Row>
        </Modal>


        <RemarksPower refetch={refetch_insp} />
      </div>
    </>
  )
}

export default PowerhouseReportForm;
