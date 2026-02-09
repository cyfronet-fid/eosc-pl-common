import EoscTotopWrapper from "./totop-wrapper.interface";
import { render } from "@testing-library/preact";
import EoscCommonTotopWrapper from "./totop-wrapper.interface";

describe("Totop Wrapper Component", () => {
  test("Should display the default label", () => {
    const { container } = render(<EoscCommonTotopWrapper />);

    const defaultLabel = EoscTotopWrapper.defaultProps?.label;

    if (defaultLabel && defaultLabel.trim() !== "") {
      expect(container).toHaveTextContent(defaultLabel);
    }

    expect(container.textContent.trim()).not.toBe("");
  });

  test("Should display a new label", () => {
    const label = "Some label";
    const { container } = render(<EoscCommonTotopWrapper label={label} />);
    expect(container).toHaveTextContent(label);
  });
});
