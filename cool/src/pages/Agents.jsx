import Body from "../components/agent/Body";
import Hero from "../components/agent/Hero";
import Maintext from "../components/agent/Maintext";

const Agents = () => {
  return (
    <main className="w-full overflow-x-hidden bg-sky-100">
      <Maintext />
      <Hero />
      <Body />
    </main>
  );
};

export default Agents;
