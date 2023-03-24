import Layout from '../../../components/Layout';
import Private from '../../../components/auth/Private';
import BookCreate from '../../../components/crud/BookCreate';
import Link from 'next/link';

const CreateBook = () => {
    return (
        <Layout>
            <Private>
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
            </Private>
        </Layout>
    );
};

export default CreateBook;
