import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { withRouter } from 'next/router';
import Layout from '../../components/Layout';
import { useState } from 'react';
import { listBooksWithCategoriesAndTags } from '../../actions/book';
import Card from '../../components/book/Card';
import { API, DOMAIN, APP_NAME, FB_APP_ID } from '../../config';

const Books = ({ books, categories, tags, totalBooks, booksLimit, bookSkip, router }) => {
    const head = () => (
        <Head>
            <title>Programming books | {APP_NAME}</title>
            <meta
                name="description"
                content="Programming books and tutorials on react node next vue php laravel and web developoment"
            />
            <link rel="canonical" href={`${DOMAIN}${router.pathname}`} />
            <meta property="og:title" content={`Latest web developoment tutorials | ${APP_NAME}`} />
            <meta
                property="og:description"
                content="Programming books and tutorials on react node next vue php laravel and web developoment"
            />
            <meta property="og:type" content="webiste" />
            <meta property="og:url" content={`${DOMAIN}${router.pathname}`} />
            <meta property="og:site_name" content={`${APP_NAME}`} />

            <meta property="og:image" content={`${DOMAIN}/static/images/seobook.jpg`} />
            <meta property="og:image:secure_url" content={`${DOMAIN}/static/images/seobook.jpg`} />
            <meta property="og:image:type" content="image/jpg" />
            <meta property="fb:app_id" content={`${FB_APP_ID}`} />
        </Head>
    );

    const [limit, setLimit] = useState(booksLimit);
    const [skip, setSkip] = useState(0);
    const [size, setSize] = useState(totalBooks);
    const [loadedBooks, setLoadedBooks] = useState([]);

    const loadMore = () => {
        let toSkip = skip + limit;
        listBooksWithCategoriesAndTags(toSkip, limit).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setLoadedBooks([...loadedBooks, ...data.books]);
                setSize(data.size);
                setSkip(toSkip);
            }
        });
    };

    const loadMoreButton = () => {
        return (
            size > 0 &&
            size >= limit && (
                <button onClick={loadMore} className="btn btn-outline-primary btn-lg">
                    Load more
                </button>
            )
        );
    };

    const showAllBooks = () => {
        return books.map((book, i) => {
            // ()
            return (
                <article key={i}>
                    <Card book={book} />
                    <hr />
                </article>
            );
        });
    };

    const showAllCategories = () => {
        return categories.map((c, i) => (
            <Link href={`/categories/${c.slug}`} key={i}>
                <a className="btn btn-primary mr-1 ml-1 mt-3">{c.name}</a>
            </Link>
        ));
    };

    const showAllTags = () => {
        return tags.map((t, i) => (
            <Link href={`/tags/${t.slug}`} key={i}>
                <a className="btn btn-outline-primary mr-1 ml-1 mt-3">{t.name}</a>
            </Link>
        ));
    };

    const showLoadedBooks = () => {
        return loadedBooks.map((book, i) => (
            <article key={i}>
                <Card book={book} />
            </article>
        ));
    };

    return (
        <React.Fragment>
            {head()}
            <Layout>
                <main>
                    <div className="container-fluid">
                        <header>
                            <div className="col-md-12 pt-3">
                                <h1 className="display-4 font-weight-bold text-center">
                                    Programming books and tutorials
                                </h1>
                            </div>
                            <section>
                                <div className="pb-5 text-center">
                                    {showAllCategories()}
                                    <br />
                                    {showAllTags()}
                                </div>
                            </section>
                        </header>
                    </div>
                    <div className="container-fluid">{showAllBooks()}</div>
                    <div className="container-fluid">{showLoadedBooks()}</div>
                    <div className="text-center pt-5 pb-5">{loadMoreButton()}</div>
                </main>
            </Layout>
        </React.Fragment>
    );
};

Books.getInitialProps = () => {
    let skip = 0;
    let limit = 2;
    return listBooksWithCategoriesAndTags(skip, limit).then(data => {
        if (data.error) {
            console.log(data.error);
        } else {
            return {
                books: data.books,
                categories: data.categories,
                tags: data.tags,
                totalBooks: data.size,
                booksLimit: limit,
                bookSkip: skip
            };
        }
    });
};

export default withRouter(Books);
