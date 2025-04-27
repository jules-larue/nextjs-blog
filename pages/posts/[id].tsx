import React from "react";
import Layout from "../../components/layout";
import { getAllPostsIds, getPostData } from "../../lib/posts";
import Head from "next/head";
import Date from "../../components/date";
import utilStyles from '../../styles/utils.module.css';


export default function Post({ postData }) {
    return (
    <Layout>
        <Head>
            <title>{postData.title}</title>
            <meta name="description" content={postData.excerpt} />
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <article>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={postData.date} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: postData.contentAsHtml }} />
      </article>
    </Layout>
    );
  }

export async function getStaticPaths() {
    // Get all ths ids of the posts
    const paths = getAllPostsIds();
    
    return {
        paths,
        fallback: false
    }
}

export async function getStaticProps({ params }) {
    const postData = await getPostData(params.id);
    return {
        props: {
            postData,
        },
    }
}