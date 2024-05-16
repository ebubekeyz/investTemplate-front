import { Pricing as PricingComponent, Title } from '../components';

const Pricing = () => {
  return (
    <div className="align-element my-5">
      <Title
        title="Pricing"
        description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus, soluta reiciendis! Iste optio nisi expedita fuga? Repellendus qui error impedit?"
      />
      <PricingComponent />
    </div>
  );
};
export default Pricing;
