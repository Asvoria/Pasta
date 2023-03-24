import { Router } from 'express';
const router = Router();
import { contactForm, contactBookAuthorForm } from '../controllers/form.js';

// validators
import { runValidation } from '../validators/index.js';
import { contactFormValidator } from '../validators/form.js';

router.post('/contact', contactFormValidator, runValidation, contactForm);
router.post('/contact-book-author', contactFormValidator, runValidation, contactBookAuthorForm);

export default router;
