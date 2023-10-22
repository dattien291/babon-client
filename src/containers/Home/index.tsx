import KsLayout from '@/layout';
import Sidebar from './Sidebar';
import { KaImage } from '@components/primitive';

const Home = () => {
  return (
    <KsLayout title="Babon">
      <div className="ks-home">
        <Sidebar />
        <div className="ks-home-content">
          <nav className="account-control">
            <div className="btn-group">
              <button>S</button>
              <button>N</button>
            </div>

            <KaImage src="" />
          </nav>

          <div className="dashboard">
            <div className="posts">Posts here !</div>
            <div className="trending">Trending here !</div>
          </div>
        </div>
      </div>
    </KsLayout>
  );
};

export default Home;
