import { Hero2, Pricing, Title } from '../components';

const Landing = () => {
  return (
    <>
      <Hero2 />
      <section className="align-element py-20">
        <Title />
        <Pricing />
      </section>
    </>
  );
};
export default Landing;
