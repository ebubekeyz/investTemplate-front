import { Hero2, Pricing, PricingTitle } from '../components';

const Landing = () => {
  return (
    <>
      <Hero2 />
      <section className="align-element py-10">
        <PricingTitle />
        <Pricing />
      </section>
    </>
  );
};
export default Landing;
