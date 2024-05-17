import Header from "./SubPages/Header";
import Heading from "./SubPages/Heading";
import CarouselSection from "./SubPages/CarouselSection";
import Footer from "./SubPages/Footer";

function Home() {
  return (
    <div>
      <div
        style={{
          backgroundImage: `url("https://img.freepik.com/free-vector/gradient-background-wave-minimalist-style_698780-921.jpg?w=826&t=st=1686251795~exp=1686252395~hmac=1ad992f7b842f6571177809e3a9d56badf8fa71b58a5985d9ac6a1a0129eba6f")`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      >
        <Header />
        <Heading />
      </div>
      <CarouselSection />

      <Footer />
    </div>
  );
}
export default Home;
