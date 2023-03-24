import Layout from '../components/Layout';
import Link from 'next/link';

const Index = () => {
    return (
        <Layout>
            <article className="overflow-hidden">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 text-center">
                            <h1 className="display-4 font-weight-bold">
                                <img src="logo_pasta.png" alt="PASTA.INK" class="responsive"/>
                            </h1>
                        </div>
                    </div>
                </div>

                <div className="container">
                    <div className="row">
                        <div className="col-md-12 text-center pt-4 pb-5">
                            <div className="lead">
                                The Ultimate Independent/Amateur Fiction Author Platform !
                                <p className="h2">Coming Soon!</p>
                                Reach out to Alfredo@pasta.ink for more details!
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-2">
                            <div className="flip flip-horizontal">
                                <div className="front">
                                    <h2 className="text-shadow text-center h2">Action</h2>
                                </div>
                                <div className="back text-center">
                                    <Link href="/categories/react">
                                            <h3 className="h1">Fun!</h3>
                                    </Link>
                                    <div className="lead">The most exciting stories in a blast!</div>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-2">
                            <div className="flip flip-horizontal">
                                <div className="front">
                                    <h2 className="text-shadow text-center h2">Sci-Fi</h2>
                                </div>
                                <div className="back text-center">
                                    <Link href="/categories/node">
                                            <h3 className="h1">Bizarre</h3>
                                    </Link>
                                    <div className="lead">
                                        Mind blowing and twisty!
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-2">
                            <div className="flip flip-horizontal">
                                <div className="front">
                                    <h2 className="text-shadow text-center h2">Romance</h2>
                                </div>
                                <div className="back text-center">
                                    <Link href="/categories/react">
                                            <h3 className="h1">Sweet!</h3>
                                    </Link>
                                    <div className="lead">Dreamy and romantic!</div>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-2">
                            <div className="flip flip-horizontal">
                                <div className="front">
                                    <h2 className="text-shadow text-center h2">Mystery</h2>
                                </div>
                                <div className="back text-center">
                                    <Link href="/categories/react">
                                            <h3 className="h1">Thrill!</h3>
                                    </Link>
                                    <div className="lead">The horror continues to haunt!</div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-2">
                            <div className="flip flip-horizontal">
                                <div className="front">
                                    <h2 className="text-shadow text-center h2">Artistic</h2>
                                </div>
                                <div className="back text-center">
                                    <Link href="/categories/react">
                                            <h3 className="h1">Strange!</h3>
                                    </Link>
                                    <div className="lead">The most exciting stories in a blast!</div>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-2">
                            <div className="flip flip-horizontal">
                                <div className="front">
                                    <h2 className="text-shadow text-center h2">Drama</h2>
                                </div>
                                <div className="back text-center">
                                    <Link href="/categories/nextjs">
                                            <h3 className="h1">Intense</h3>
                                    </Link>
                                    <div className="lead">The never ending stories!</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </article>
        </Layout>
    );
};

export default Index;
