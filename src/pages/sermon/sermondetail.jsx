import React from "react";
import { SermonDetail } from "../../components/sermon/sermondetail";
import { useParams } from "react-router-dom";
import Layout from "../../components/Layout/layout";

const SermonDetailPage = () => {
  const { blogId } = useParams();
  return (
    <Layout>
      <SermonDetail blogId={blogId} />
    </Layout>
  );
};

export default SermonDetailPage;
