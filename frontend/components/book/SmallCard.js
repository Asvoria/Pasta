import Link from 'next/link';
import renderHTML from 'react-render-html';
import moment from 'moment';
import { API } from '../../config';

const SmallCard = ({ book }) => {
    return (
        <div className="card">
            <section>
                <Link href={`/books/${book.slug}`}>
                        <img
                            className="img img-fluid"
                            style={{ height: '250px', width: '100%' }}
                            src={`${API}/book/photo/${book.slug}`}
                            alt={book.title}
                        />
                </Link>
            </section>

            <div className="card-body">
                <section>
                    <Link href={`/books/${book.slug}`}>
                            <h5 className="card-title">{book.title}</h5>
                    </Link>
                    <div className="card-text">{renderHTML(book.excerpt)}</div>
                </section>
            </div>

            <div className="card-body">
                Posted {moment(book.updatedAt).fromNow()} by{' '}
                <Link href={`/profile/${book.postedBy.username}`}>
                    {book.postedBy.username}
                </Link>
            </div>
        </div>
    );
};

export default SmallCard;
