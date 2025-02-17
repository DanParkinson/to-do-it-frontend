import React, { useEffect, useState } from "react";
import { Col, Row, Container } from "react-bootstrap";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { axiosReq } from "../../api/axiosDefaults";
import Category from "./Category";

function CategoryPage() {
  const { id } = useParams();
  const [category, setCategory] = useState({ results: [] });

  useEffect(() => {
    const handleMount = async () => {
      try {
        const { data } = await axiosReq.get(`/categories/${id}/`);
        setCategory({ results: [data] });
        console.log(data);
      } catch (err) {
        console.error("Error fetching category:", err);
      }
    };

    handleMount();
  }, [id]);

  return (
    <Row className="h-100">
      <Col>
        <Category {...category.results[0]} categoryPage />
      </Col>
    </Row>
  );
}

export default CategoryPage;
