import React from "react";
import { Card, Col, Grid, Row } from "antd";
import Example from "../components/testModal";
import { useState } from "react"

const TestCards = ({ users }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <Grid gutter={16}>
      {/* Responsive layout with different column configurations */}
      <Row xs={{ gutter: 8 }}>
        {users.map((item) => (
          <Col xs={24} sm={12} md={8} lg={6} key={item._id}>
            <Card hoverable style={{ borderRadius: 8 }}>
              <Card.Meta
                avatar={<img src={item.imageUrl} alt={item.name} style={{ borderRadius: "50%" }} />}
                title={item.name}
                description={item.specialization}
              />
              <div className="flex mt-4 md:mt-6">
                <button
                  className="inline-flex items-center px-4 py-2 text-base font-medium text-center text-white bg-rose-500 rounded-lg hover:bg-rose-700 focus:ring-4 focus:outline-none"
                  onClick={openModal}
                >
                  Book an Appointment
                </button>
                <a
                  href="#"
                  className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-black bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700 ms-3"
                >
                  Message
                </a>
              </div>
            </Card>
          </Col>
        ))}
      </Row>
      {isModalOpen && <Example onClose={closeModal} />}
    </Grid>
  );
};

export default TestCards;
