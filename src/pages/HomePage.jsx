import HomeSection from "../components/HomeSection/HomeSection";

const HomePage = ({ openLoginModal }) => {
  return (
    <div>
      <HomeSection openLoginModal={openLoginModal} />
    </div>
  );
};

export default HomePage;
