import React, { useState } from "react";
import { Card, Form, Input, Checkbox, Button, Table } from "antd";
import axios from "axios";

const Home = () => {
  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      sorter: (a, b) => a.title.localeCompare(b.title),
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Company",
      dataIndex: "company",
      key: "company",
      sorter: (a, b) => a.company.localeCompare(b.company),
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Location",
      dataIndex: "location",
      key: "location",
      sorter: (a, b) => a.location.localeCompare(b.location),
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      sorter: (a, b) => a.type.localeCompare(b.type),
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      sorter: (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
      sortDirections: ["descend", "ascend"],
    },
  ];

  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [fullTime, setFullTime] = useState(true);
  const [dataSource, setDataSource] = useState({ undefined });
  const onSearch = async () => {
    await axios
      .get("https://jobs.github.com/positions.json", {
        params: {
          description: description,
          location: location,
          ...(fullTime === true ? { full_time: "on" } : {}),
        },
        headers: { "Access-Control-Allow-Origin": "*" },
      })
      .then((data) => {
        console.log(data);
        setDataSource(
          data.data.map((val, idx) => ({
            key: val.id,
            company: val.company,
            location: val.location,
            createdAt: val.created_at,
            title: val.title,
            type: val.type,
          }))
        );
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div style={{ backgroundColor: "40FF00", width: "100%" }}>
      <Card
        title="Search Job"
        style={{ margin: "25px", width: "auto", height: "auto" }}
      >
        <Form
          style={{ justifyContent: "space-between" }}
          layout="inline"
          name="basic"
          initialValues={{
            fullTime: true,
          }}
          onFinish={onSearch}
          // onFinishFailed={onFinishFailed}
        >
          <Form.Item label="Description" name="description">
            <Input
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            />
          </Form.Item>

          <Form.Item label="Location" name="location">
            <Input
              onChange={(e) => {
                setLocation(e.target.value);
              }}
            />
          </Form.Item>

          <Form.Item name="fullTime" valuePropName="checked" label="Full Time">
            <Checkbox
              onChange={(e) => {
                setFullTime(e.target.checked);
              }}
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Search
            </Button>
          </Form.Item>
        </Form>
      </Card>
      {dataSource !== undefined ? (
        dataSource.length > 0 ? (
          <Card
            title="Search Results"
            style={{ margin: "25px", width: "auto", height: "300px" }}
          >
            <Table columns={columns} dataSource={dataSource}></Table>
          </Card>
        ) : dataSource.length === 0 ? (
          <Card
            title="Search Results"
            style={{ margin: "25px", width: "auto", height: "300px" }}
          >
            No Results
          </Card>
        ) : null
      ) : null}
    </div>
  );
};
export default Home;
