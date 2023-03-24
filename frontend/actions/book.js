import fetch from 'isomorphic-fetch';
import { API } from '../config';
import queryString from 'query-string';
import { isAuth, handleResponse } from './auth';

export const createBook = (book, token) => {
    let createBookEndpoint;

    if (isAuth() && isAuth().role === 1) {
        createBookEndpoint = `${API}/book`;
    } else if (isAuth() && isAuth().role === 0) {
        createBookEndpoint = `${API}/user/book`;
    }

    return fetch(`${createBookEndpoint}`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: book
    })
        .then(response => {
            handleResponse(response);
            return response.json();
        })
        .catch(err => console.log(err));
};

export const listBooksWithCategoriesAndTags = (skip, limit) => {
    const data = {
        limit,
        skip
    };
    return fetch(`${API}/books-categories-tags`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const singleBook = (slug = undefined) => {
    return fetch(`${API}/book/${slug}`, {
        method: 'GET'
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const listRelated = book => {
    return fetch(`${API}/books/related`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(book)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const list = username => {
    let listBooksEndpoint;

    if (username) {
        listBooksEndpoint = `${API}/${username}/books`;
    } else {
        listBooksEndpoint = `${API}/books`;
    }

    return fetch(`${listBooksEndpoint}`, {
        method: 'GET'
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const removeBook = (slug, token) => {
    let deleteBookEndpoint;

    if (isAuth() && isAuth().role === 1) {
        deleteBookEndpoint = `${API}/book/${slug}`;
    } else if (isAuth() && isAuth().role === 0) {
        deleteBookEndpoint = `${API}/user/book/${slug}`;
    }

    return fetch(`${deleteBookEndpoint}`, {
        method: 'DELETE',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        }
    })
        .then(response => {
            handleResponse(response);
            return response.json();
        })
        .catch(err => console.log(err));
};

export const updateBook = (book, token, slug) => {
    let updateBookEndpoint;

    if (isAuth() && isAuth().role === 1) {
        updateBookEndpoint = `${API}/book/${slug}`;
    } else if (isAuth() && isAuth().role === 0) {
        updateBookEndpoint = `${API}/user/book/${slug}`;
    }

    return fetch(`${updateBookEndpoint}`, {
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: book
    })
        .then(response => {
            handleResponse(response);
            return response.json();
        })
        .catch(err => console.log(err));
};

export const listSearch = params => {
    console.log('search params', params);
    let query = queryString.stringify(params);
    console.log('query params', query);
    return fetch(`${API}/books/search?${query}`, {
        method: 'GET'
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};
