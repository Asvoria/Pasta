import Book from '../models/book.js';
import slugify from 'slugify';
import { errorHandler } from '../helpers/dbErrorHandler.js';
import { readFileSync } from 'fs';
import { smartTrim } from '../helpers/book.js';
import { stripHtml } from 'string-strip-html';

// CommonJS Module import
import merge from 'lodash';
const _ = merge;
// import { IncomingForm } from 'formidable';
import pkg from 'formidable';
const { IncomingForm } = pkg;
// import { find as _find } from '../models/category.js';
// import { find as __find } from '../models/tag.js';
// import { findOne as _findOne } from '../models/user.js';
import _find from '../models/category.js';
import __find from '../models/tag.js';
import _findOne from '../models/user.js';

export function create(req, res) {
    let form = new IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: 'Image could not upload'
            });
        }

        const { title, body, categories, tags } = fields;

        if (!title || !title.length) {
            return res.status(400).json({
                error: 'title is required'
            });
        }

        if (!body || body.length < 200) {
            return res.status(400).json({
                error: 'Content is too short'
            });
        }

        if (!categories || categories.length === 0) {
            return res.status(400).json({
                error: 'At least one category is required'
            });
        }

        if (!tags || tags.length === 0) {
            return res.status(400).json({
                error: 'At least one tag is required'
            });
        }

        let book = new Book();
        book.title = title;
        book.body = body;
        book.excerpt = smartTrim(body, 320, ' ', ' ...');
        book.slug = slugify(title).toLowerCase();
        book.mtitle = `${title} | ${process.env.APP_NAME}`;
        book.mdesc = stripHtml(body.substring(0, 160));
        book.postedBy = req.user._id;
        // categories and tags
        let arrayOfCategories = categories && categories.split(',');
        let arrayOfTags = tags && tags.split(',');

        if (files.photo) {
            if (files.photo.size > 10000000) {
                return res.status(400).json({
                    error: 'Image should be less then 1mb in size'
                });
            }
            book.photo.data = readFileSync(files.photo.path);
            book.photo.contentType = files.photo.type;
        }

        book.save((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: errorHandler(err)
                });
            }
            // res.json(result);
            Book.findByIdAndUpdate(result._id, { $push: { categories: arrayOfCategories } }, { new: true }).exec(
                (err, result) => {
                    if (err) {
                        return res.status(400).json({
                            error: errorHandler(err)
                        });
                    } else {
                        Book.findByIdAndUpdate(result._id, { $push: { tags: arrayOfTags } }, { new: true }).exec(
                            (err, result) => {
                                if (err) {
                                    return res.status(400).json({
                                        error: errorHandler(err)
                                    });
                                } else {
                                    res.json(result);
                                }
                            }
                        );
                    }
                }
            );
        });
    });
}

// list, listAllBooksCategoriesTags, read, remove, update

export function list(req, res) {
    Book.find({})
        .populate('categories', '_id name slug')
        .populate('tags', '_id name slug')
        .populate('postedBy', '_id name username')
        .select('_id title slug excerpt categories tags postedBy createdAt updatedAt')
        .exec((err, data) => {
            if (err) {
                return res.json({
                    error: errorHandler(err)
                });
            }
            res.json(data);
        });
}

export function listAllBooksCategoriesTags(req, res) {
    let limit = req.body.limit ? parseInt(req.body.limit) : 10;
    let skip = req.body.skip ? parseInt(req.body.skip) : 0;

    let books;
    let categories;
    let tags;

    Book.find({})
        .populate('categories', '_id name slug')
        .populate('tags', '_id name slug')
        .populate('postedBy', '_id name username profile')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .select('_id title slug excerpt categories tags postedBy createdAt updatedAt')
        .exec((err, data) => {
            if (err) {
                return res.json({
                    error: errorHandler(err)
                });
            }
            books = data; // books
            // get all categories
            _find({}).exec((err, c) => {
                if (err) {
                    return res.json({
                        error: errorHandler(err)
                    });
                }
                categories = c; // categories
                // get all tags
                __find({}).exec((err, t) => {
                    if (err) {
                        return res.json({
                            error: errorHandler(err)
                        });
                    }
                    tags = t;
                    // return all books categories tags
                    res.json({ books, categories, tags, size: books.length });
                });
            });
        });
}

export function read(req, res) {
    const slug = req.params.slug.toLowerCase();
    Book.findOne({ slug })
        // .select("-photo")
        .populate('categories', '_id name slug')
        .populate('tags', '_id name slug')
        .populate('postedBy', '_id name username')
        .select('_id title body slug mtitle mdesc categories tags postedBy createdAt updatedAt')
        .exec((err, data) => {
            if (err) {
                return res.json({
                    error: errorHandler(err)
                });
            }
            res.json(data);
        });
}

export function remove(req, res) {
    const slug = req.params.slug.toLowerCase();
    Book.findOneAndRemove({ slug }).exec((err, data) => {
        if (err) {
            return res.json({
                error: errorHandler(err)
            });
        }
        res.json({
            message: 'Book deleted successfully'
        });
    });
}

export function update(req, res) {
    const slug = req.params.slug.toLowerCase();

    Book.findOne({ slug }).exec((err, oldBook) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }

        let form = new IncomingForm();
        form.keepExtensions = true;

        form.parse(req, (err, fields, files) => {
            if (err) {
                return res.status(400).json({
                    error: 'Image could not upload'
                });
            }

            let slugBeforeMerge = oldBook.slug;
            oldBook = merge(oldBook, fields);
            oldBook.slug = slugBeforeMerge;

            const { body, desc, categories, tags } = fields;

            if (body) {
                oldBook.excerpt = smartTrim(body, 320, ' ', ' ...');
                oldBook.desc = stripHtml(body.substring(0, 160));
            }

            if (categories) {
                oldBook.categories = categories.split(',');
            }

            if (tags) {
                oldBook.tags = tags.split(',');
            }

            if (files.photo) {
                if (files.photo.size > 10000000) {
                    return res.status(400).json({
                        error: 'Image should be less then 1mb in size'
                    });
                }
                oldBook.photo.data = readFileSync(files.photo.path);
                oldBook.photo.contentType = files.photo.type;
            }

            oldBook.save((err, result) => {
                if (err) {
                    return res.status(400).json({
                        error: errorHandler(err)
                    });
                }
                // result.photo = undefined;
                res.json(result);
            });
        });
    });
}

export function photo(req, res) {
    const slug = req.params.slug.toLowerCase();
    Book.findOne({ slug })
        .select('photo')
        .exec((err, book) => {
            if (err || !book) {
                return res.status(400).json({
                    error: errorHandler(err)
                });
            }
            res.set('Content-Type', book.photo.contentType);
            return res.send(book.photo.data);
        });
}

export function listRelated(req, res) {
    // console.log(req.body.book);
    let limit = req.body.limit ? parseInt(req.body.limit) : 3;
    const { _id, categories } = req.body.book;

    Book.find({ _id: { $ne: _id }, categories: { $in: categories } })
        .limit(limit)
        .populate('postedBy', '_id name username profile')
        .select('title slug excerpt postedBy createdAt updatedAt')
        .exec((err, books) => {
            if (err) {
                return res.status(400).json({
                    error: 'Books not found'
                });
            }
            res.json(books);
        });
}

//
export function listSearch(req, res) {
    console.log(req.query);
    const { search } = req.query;
    if (search) {
        Book.find(
            {
                $or: [{ title: { $regex: search, $options: 'i' } }, { body: { $regex: search, $options: 'i' } }]
            },
            (err, books) => {
                if (err) {
                    return res.status(400).json({
                        error: errorHandler(err)
                    });
                }
                res.json(books);
            }
        ).select('-photo -body');
    }
}

export function listByUser(req, res) {
    _findOne({ username: req.params.username }).exec((err, user) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        let userId = user._id;
        Book.find({ postedBy: userId })
            .populate('categories', '_id name slug')
            .populate('tags', '_id name slug')
            .populate('postedBy', '_id name username')
            .select('_id title slug postedBy createdAt updatedAt')
            .exec((err, data) => {
                if (err) {
                    return res.status(400).json({
                        error: errorHandler(err)
                    });
                }
                res.json(data);
            });
    });
}
