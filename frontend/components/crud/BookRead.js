import React from 'react';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import Router from 'next/router';
import { getCookie, isAuth } from '../../actions/auth';
import { list, removeBook } from '../../actions/book';
import moment from 'moment';

const BookRead = ({ username }) => {
    const [books, setBooks] = useState([]);
    const [message, setMessage] = useState('');
    const token = getCookie('token');
    
    useEffect(() => {
        loadBooks();
    }, []);

    const loadBooks = () => {
        list(username).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setBooks(data);
            }
        });
    };

    const deleteBook = slug => {
        removeBook(slug, token).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setMessage(data.message);
                loadBooks();
            }
        });
    };

    const deleteConfirm = slug => {
        let answer = window.confirm('Are you sure you want to delete your book?');
        if (answer) {
            deleteBook(slug);
        }
    };

    const showUpdateButton = book => {
        if (isAuth() && isAuth().role === 0) {
            return (
                <Link href={`/user/crud/${book.slug}`}>
                    <a className="ml-2 btn btn-sm btn-warning">Update</a>
                </Link>
            );
        } else if (isAuth() && isAuth().role === 1) {
            return (
                <Link href={`/admin/crud/${book.slug}`}>
                    <a className="ml-2 btn btn-sm btn-warning">Update</a>
                </Link>
            );
        }
    };

    const showAllBooks = () => {
        return books.map((book, i) => {
            return (
                <div key={i} className="pb-5">
                    <h3>{book.title}</h3>
                    <div className="mark">
                        Written by {book.postedBy.name} | Published on {moment(book.updatedAt).fromNow()}</div>
                    
                    <button className="btn btn-sm btn-danger" onClick={() => deleteConfirm(book.slug)}>
                        Delete
                    </button>
                    {showUpdateButton(book)}
                </div>
            );
        });
    };

    return (
        <React.Fragment>
            <div className="row">
                <div className="col-md-12">
                    {message && <div className="alert alert-warning">{message}</div>}
                    {showAllBooks()}
                </div>
            </div>
        </React.Fragment>
    );
};

export default BookRead;
