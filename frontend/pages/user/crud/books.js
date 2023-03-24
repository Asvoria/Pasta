import Layout from '../../../components/Layout';
import Private from '../../../components/auth/Private';
import BookRead from '../../../components/crud/BookRead';
import Link from 'next/link';
import { isAuth } from '../../../actions/auth';

const Book = () => {
    const username = isAuth() && isAuth().username;
    return (
        <Layout>
            <Private>
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 pt-5 pb-5">
                            <h2>Manage books</h2>
                        </div>
                        <div className="col-md-12">
                            <BookRead username={username} />
                        </div>
                    </div>
                </div>
            </Private>
        </Layout>
    );
};

export default Book;
