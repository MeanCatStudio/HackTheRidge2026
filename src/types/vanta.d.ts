declare module "vanta/dist/vanta.dots.min" {
  type VantaEffect = {
    destroy?: () => void;
  };

  type VantaDotsFactory = (options: Record<string, unknown>) => VantaEffect;

  const VantaDots: VantaDotsFactory;

  export default VantaDots;
}