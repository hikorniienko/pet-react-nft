import Sellers from 'components/Sellers';
import Bids from 'components/Bids';

function Home() {
  return (
    <>
      <section className="container">
        <div className="home-title">
          <h1>
            Discover, collect, and sell extraordinary NFTs
          </h1>
        </div>
      </section>

    <section className="container">
      <h2>Top Sellers</h2>
      <Sellers />
    </section>

    <section className="container">
      <h2>Hot Bids</h2>
      <Bids />
    </section>
    </>
  );
}
export default Home;
