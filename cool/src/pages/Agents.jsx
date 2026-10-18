import AccordionGallery from "../components/agent/AccordionGallery";
import Body from "../components/agent/Body";
import Hero from "../components/agent/Hero";
import Maintext from "../components/agent/Maintext";

const Agents = () => {
  return (
    <main className=" bg-sky-100">
      <Maintext />
      <Hero />
      <Body />
      <AccordionGallery/>
    </main>
  );
};

export default Agents;
