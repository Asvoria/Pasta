import Layout from '../../../components/Layout';
import Admin from '../../../components/auth/Admin';
import BookUpdate from '../../../components/crud/BookUpdate';
import Link from 'next/link';

const Book = () => {
    return (
        <Layout>
            <Admin>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12 pt-5 pb-5">
                            <h2>Update book</h2>
                        </div>
                        <div className="col-md-12">
                            <BookUpdate />
                        </div>
                    </div>
                </div>
            </Admin>
        </Layout>
    );
};

export default Book;
