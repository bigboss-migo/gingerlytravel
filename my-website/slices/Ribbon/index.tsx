import type { Content } from "@prismicio/client";
import type { SliceComponentProps } from "@prismicio/react";

export type RibbonProps = SliceComponentProps<Content.RibbonSlice>;

const Ribbon = ({ slice }: RibbonProps) => {
  const items = slice.primary.keywords;
  return (
    <div
      className="ribbon"
      aria-hidden="true"
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <div className="track">
        {[0, 1].map((copy) =>
          items.map((k, i) => <span key={`${copy}-${i}`}>{k.label}</span>)
        )}
      </div>
    </div>
  );
};

export default Ribbon;
