import { Hero2, Pricing, Title } from '../components';

const Landing = () => {
  return (
    <>
      <Hero2 />
      <section className="align-element py-20">
        <Title
          title="Pricing"
          description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus, soluta reiciendis! Iste optio nisi expedita fuga? Repellendus qui error impedit?"
        />
        <Pricing />
      </section>
    </>
  );
};
export default Landing;
