import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Layout from '../../components/Layout';
import { useState, useEffect } from 'react';
import { singleBook, listRelated } from '../../actions/book';
import { API, DOMAIN, APP_NAME, FB_APP_ID } from '../../config';
import renderHTML from 'react-render-html';
import moment from 'moment';
import SmallCard from '../../components/book/SmallCard';
import DisqusThread from '../../components/DisqusThread';

const SingleBook = ({ book, query }) => {
    const [related, setRelated] = useState([]);

    const loadRelated = () => {
        listRelated({ book }).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setRelated(data);
            }
        });
        };
        
    useEffect(() => {
        loadRelated();
    }, []);

    const head = () => (
        <Head>
            <title>
                {book.title} | {APP_NAME}
            </title>
            <meta name="description" content={book.mdesc} />
            <link rel="canonical" href={`${DOMAIN}/books/${query.slug}`} />
            <meta property="og:title" content={`${book.title}| ${APP_NAME}`} />
            <meta property="og:description" content={book.mdesc} />
            <meta property="og:type" content="webiste" />
            <meta property="og:url" content={`${DOMAIN}/books/${query.slug}`} />
            <meta property="og:site_name" content={`${APP_NAME}`} />

            <meta property="og:image" content={`${API}/book/photo/${book.slug}`} />
            <meta property="og:image:secure_url" ccontent={`${API}/book/photo/${book.slug}`} />
            <meta property="og:image:type" content="image/jpg" />
            <meta property="fb:app_id" content={`${FB_APP_ID}`} />
        </Head>
    );

    const showBookCategories = book =>
        book.categories.map((c, i) => (
            <Link key={i} href={`/categories/${c.slug}`}>
                <a className="btn btn-primary mr-1 ml-1 mt-3">{c.name}</a>
            </Link>
        ));

    const showBookTags = book =>
        book.tags.map((t, i) => (
            <Link key={i} href={`/tags/${t.slug}`}>
                <a className="btn btn-outline-primary mr-1 ml-1 mt-3">{t.name}</a>
            </Link>
        ));

    const showRelatedBook = () => {
        return related.map((book, i) => (
            <div className="col-md-4" key={i}>
                <article>
                    <SmallCard book={book} />
                </article>
            </div>
        ));
    };

    const showComments = () => {
        return (
            <div>
                <DisqusThread id={book.id} title={book.title} path={`/book/${book.slug}`} />
            </div>
        );
    };

    return (
        <React.Fragment>
            {head()}
            <Layout>
                <main>
                    <article>
                        <div className="container-fluid">
                            <section>
                                <div className="row" style={{ marginTop: '-30px' }}>
                                    <img
                                        src={`${API}/book/photo/${book.slug}`}
                                        alt={book.title}
                                        className="img img-fluid featured-image"
                                    />
                                </div>
                            </section>

                            <section>
                                <div className="container">
                                    <h1 className="display-2 pb-3 pt-3 text-center font-weight-bold">{book.title}</h1>
                                    <div className="lead mt-3 mark">
                                        Written by{' '}
                                        <Link href={`/profile/${book.postedBy.username}`}>
                                            {book.postedBy.username}
                                        </Link>{' '}
                                        | Published {moment(book.updatedAt).fromNow()}
                                    </div>

                                    <div className="pb-3">
                                        {showBookCategories(book)}
                                        {showBookTags(book)}
                                        <br />
                                        <br />
                                    </div>
                                </div>
                            </section>
                        </div>

                        <div className="container">
                            <section>
                                <div className="col-md-12 lead">{renderHTML(book.body)}</div>
                            </section>
                        </div>

                        <div className="container">
                            <h4 className="text-center pt-5 pb-5 h2">Related books</h4>
                            <div className="row">{showRelatedBook()}</div>
                        </div>

                        <div className="container pt-5 pb-5">{showComments()}</div>
                    </article>
                </main>
            </Layout>
        </React.Fragment>
    );
};

SingleBook.getInitialProps = ({ query }) => {
    return singleBook(query.slug).then(data => {
        if (data.error) {
            console.log(data.error);
        } else {
            // console.log('GET INITIAL PROPS IN SINGLE BOOK', data);
            return { book: data, query };
        }
    });
};

export default SingleBook;
