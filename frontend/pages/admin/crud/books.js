import Layout from '../../../components/Layout';
import Admin from '../../../components/auth/Admin';
import BookRead from '../../../components/crud/BookRead';
import Link from 'next/link';

const Book = () => {
    return (
        <Layout>
            <Admin>
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 pt-5 pb-5">
                            <h2>Manage books</h2>
                        </div>
                        <div className="col-md-12">
                            <BookRead />
                        </div>
                    </div>
                </div>
            </Admin>
        </Layout>
    );
};

export default Book;
