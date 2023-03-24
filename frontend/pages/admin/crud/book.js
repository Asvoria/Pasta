import Layout from '../../../components/Layout';
import Admin from '../../../components/auth/Admin';
import BookCreate from '../../../components/crud/BookCreate';
import Link from 'next/link';

const Book = () => {
    return (
        <Layout>
            <Admin>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12 pt-5 pb-5">
                            <h2>Create a new book</h2>
                        </div>
                        <div className="col-md-12">
                            <BookCreate />
                        </div>
                    </div>
                </div>
            </Admin>
        </Layout>
    );
};

export default Book;
