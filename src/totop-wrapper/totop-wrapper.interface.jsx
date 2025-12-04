import { Component } from "preact";
import PropTypes from "prop-types";
import { environment } from "../../env/env";
import { fieldsToCamelCase, usePropTypes } from "../../core/utils";
import { renderComponent } from "../../core/render";

/**
 * @version 1.1
 */
class EoscCommonTotopWrapper extends Component {
  static propTypes = {
    label: PropTypes.string.isRequired
  };

  static defaultProps = {
    label: environment.totopWrapperConfig.label
  };

  render(props) {
    const { label } = fieldsToCamelCase(usePropTypes(props, EoscCommonTotopWrapper));
    return (
      <div className={"eosc-common totop-wrapper p-4"}>
        <div className="container">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault(); // prevent page reload / redirect
                window.scrollTo({ top: 0, behavior: "smooth" }); // scroll to top
              }}
            >
              <svg
                class="svg-inline--fa fa-arrow-up"
                aria-hidden="true"
                focusable="false"
                data-prefix="fas"
                data-icon="arrow-up"
                role="img"
                xmlns="../../styles/assets/arrow-up.svg"
                viewBox="0 0 384 512"
                data-fa-i2svg
              >
                <path
                  fill="currentColor"
                  d="M214.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 141.2 160 448c0 17.7 14.3 32 32 32s32-14.3 32-32l0-306.7L329.4 246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160z"
                ></path>
              </svg>
              {label}
            </a>
        </div>
      </div>
    );
  }
}

renderComponent(EoscCommonTotopWrapper.name, EoscCommonTotopWrapper);
renderComponent("eosc-common-totop-wrapper", EoscCommonTotopWrapper);
renderComponent(".eosc-common-totop-wrapper", EoscCommonTotopWrapper);
renderComponent("#eosc-common-totop-wrapper", EoscCommonTotopWrapper);
window[environment.windowTagName].renderToTopWrapper = (cssSelector, elementAttr = {}) => {
  renderComponent(cssSelector, EoscCommonTotopWrapper, elementAttr);
};

export default EoscCommonTotopWrapper;
