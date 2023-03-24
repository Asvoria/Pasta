import { Router } from 'express';
const router = Router();
import { create, list, listAllBooksCategoriesTags, read, remove, update, photo, listRelated, listSearch, listByUser } from '../controllers/book.js';

import { requireSignin, adminMiddleware, authMiddleware, canUpdateDeleteBook } from '../controllers/auth.js';

router.post('/book', requireSignin, adminMiddleware, create);
router.get('/books', list);
router.post('/books-categories-tags', listAllBooksCategoriesTags);
router.get('/book/:slug', read);
router.delete('/book/:slug', requireSignin, adminMiddleware, remove);
router.put('/book/:slug', requireSignin, adminMiddleware, update);
router.get('/book/photo/:slug', photo);
router.post('/books/related', listRelated);
router.get('/books/search', listSearch);

// auth user book crud
router.post('/user/book', requireSignin, authMiddleware, create);
router.get('/:username/books', listByUser);
router.delete('/user/book/:slug', requireSignin, authMiddleware, canUpdateDeleteBook, remove);
router.put('/user/book/:slug', requireSignin, authMiddleware, canUpdateDeleteBook, update);

export default router;
