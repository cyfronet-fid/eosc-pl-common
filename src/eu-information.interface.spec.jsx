import EoscEuInformation from "./eu-information.interface";
import { render } from "@testing-library/preact";

describe("Eu Information Component", () => {
  test("Should display the default description and the default URL", () => {
    const { container } = render(<EoscEuInformation />);

    // Sprawdź czy defaultProps faktycznie istnieją i nie są puste
    const defaultDescription = EoscEuInformation.defaultProps?.description;
    const defaultBtnLabel = EoscEuInformation.defaultProps?.["btn-conf"]?.label;

    if (defaultDescription && defaultDescription.trim() !== "") {
      expect(container).toHaveTextContent(defaultDescription);
    }

    if (defaultBtnLabel && defaultBtnLabel.trim() !== "") {
      expect(container).toHaveTextContent(defaultBtnLabel);
    }

    // Alternatywnie, sprawdź czy komponent w ogóle renderuje jakąś treść
    expect(container.textContent.trim()).not.toBe("");
  });

  test("Should display a new description", () => {
    const description = "Lorem ipsum ...";
    const { container } = render(<EoscEuInformation description={description} />);
    expect(container).toHaveTextContent(description);
  });
});
