import Link from 'next/link';
import renderHTML from 'react-render-html';
import moment from 'moment';
import { API } from '../../config';

const Card = ({ book }) => {
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

    return (
        <div className="lead pb-4">
            <header>
                <Link href={`/books/${book.slug}`}>
                        <h2 className="pt-3 pb-3 font-weight-bold">{book.title}</h2>
                </Link>
            </header>
            <section>
                <div className="mark ml-1 pt-2 pb-2"></div>
                    Written by{' '}
                    <Link href={`/profile/${book.postedBy.username}`}>
                        {book.postedBy.username}
                    </Link>{' '}
                    | Published {moment(book.updatedAt).fromNow()}
                
            </section>
            <section>
                {showBookCategories(book)}
                {showBookTags(book)}
                <br />
                <br />
            </section>

            <div className="row">
                <div className="col-md-4">
                    <section>
                        <img
                            className="img img-fluid"
                            style={{ maxHeight: 'auto', width: '100%' }}
                            src={`${API}/book/photo/${book.slug}`}
                            alt={book.title}
                        />
                    </section>
                </div>
                <div className="col-md-8">
                    <section>
                        <div className="pb-3">{renderHTML(book.excerpt)}</div>
                        <Link href={`/books/${book.slug}`}>
                            <a className="btn btn-primary pt-2">Read more</a>
                        </Link>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default Card;
