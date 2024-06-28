import React from "react";
import "./sermon.css";
import Layout from "../../components/Layout/layout";
import CreateNewSermon from "../../components/sermon/createnewsermon";

const NewSermonPost = () => {
  return (
    <Layout>
      <CreateNewSermon />
    </Layout>
  );
};

export default NewSermonPost;
