import Navbar from "./navbar/page";
import Image from "next/image";
import Home from "../public/Homepage.png"; // Import Image component from Next.js

const HomePage = () => {
  return (
    <div>
      <Navbar />
      <div>
        <Image src={Home} alt="Main Image"  width={1300} />
      </div>

      {/* Other content */}
    </div>
  );
};

export default HomePage;
