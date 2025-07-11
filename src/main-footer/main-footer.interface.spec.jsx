import EoscCommonMainFooter from "./main-footer.interface";
import EoscMainFooterCols from "./main-footer-cols.component";
import { render } from "@testing-library/preact";

describe("Main Footer Component", () => {
  test("Should display nth columns", () => {
    const { container } = render(<EoscCommonMainFooter />);

    const columns = container.querySelectorAll(".column");

    expect(columns).toHaveLength(EoscMainFooterCols.defaultProps.cols.length);
  });
});
