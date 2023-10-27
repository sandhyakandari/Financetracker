import { Button, DatePicker, Form, Select, Modal,Input } from 'antd'
import React from 'react'

function AddIncome({
  isIncomeModalVisible,handleIncomeCancel,onFinish,
}) {
  const[form]=Form.useForm();
  return (
    <Modal style={{fontWeight:600}}
    title="Add Income"
    visible={isIncomeModalVisible}
    onCancel={handleIncomeCancel}
    footer={null}
    >
      <Form form={form}
      layout="vertical"
      onFinish={(values)=>{
        onFinish(values,"income");
        form.resetFields();
      }}
      >
        <Form.Item 
        style={{fontWeight:600}}
        label='Name'
        name='name'
        rules={[
          {required:true,
          message:"Please input the name of the transaction"}
        ]}>
          <Input type='text' className='custome-input'/>
        </Form.Item>
        <Form.Item 
        style={{fontWeight:600}}
        label='Amount'
        name='amount'
        rules={[
          {required:true,
          message:"Please input the income amount "}
        ]}>
          <Input type='number' className='custome-input'/>
        </Form.Item>
 <Form.Item style={{fontWeight:600}}
  label="Date"
  name="date"
  rules={[
    {required:true,message:"Please select the income date!"},
  ]}
 >
<DatePicker format="YYYY-MM-DD" className='custom-input'></DatePicker>
 </Form.Item>

 <Form.Item style={{fontWeight:600}}
 label="Tag"
 name="tag"
 rules={[{required:true,message:'Please select a tag'}]}
 >
  <Select className="select-input-2">
     <Select.Option value="salary">Salary</Select.Option>
     <Select.Option value="freelance">freelance</Select.Option>
     <Select.Option value="Investment">Investment</Select.Option>
  </Select>
 </Form.Item>
    <Form.Item>
      <Button className='btn btn-blue'  htmlType='submit'>Add Income</Button>
      </Form.Item> 
      </Form>
    </Modal>
  )
}
export default AddIncome;