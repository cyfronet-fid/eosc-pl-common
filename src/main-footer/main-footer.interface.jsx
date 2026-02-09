import PropTypes from "prop-types";
import { Component } from "preact";
import { environment } from "../../env/env";
import EoscMainFooterCols from "./main-footer-cols.component";
import { renderComponent } from "../../core/render";
import { fieldsToCamelCase, usePropTypes } from "../../core/utils";

/**
 * @version 1.1
 */

class EoscCommonMainFooter extends Component {
  static propTypes = {
    production: PropTypes.bool,
    socialIcons: PropTypes.arrayOf(
      PropTypes.shape({
        class: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired
      })
    ),
    termsOfUse: PropTypes.string,
    privacyPolicy: PropTypes.string,
    logoPack: PropTypes.string
  };

  static defaultProps = {
    production: environment.production,
    socialIcons: environment.mainFooterConfig.socials,
    termsOfUse: "https://eosc.pl/terms-of-use",
    privacyPolicy: "https://eosc.pl/privacy-policy",
    logoPack: "https://s3.cloud.cyfronet.pl/eosc-pl-common/assets/eosc-node-poland.zip"
  };

  render(props) {
    const { production, termsOfUse, privacyPolicy, logoPack } = fieldsToCamelCase(usePropTypes(props, EoscCommonMainFooter));
    return (
      <div>
        <footer className={`eosc-common footer pt-3 pb-3 ${production ? "" : "demo"}`}>
          <div className="container">
            <EoscMainFooterCols termsOfUse={termsOfUse} privacyPolicy={privacyPolicy} />
          </div>

          <div className="eosc-common copyright container">
            <span className="copy-text">Copyright 2026 &nbsp;&nbsp; | &nbsp;&nbsp; All rights reserved</span>
            &nbsp;&nbsp; | &nbsp;&nbsp;
            <a href={privacyPolicy}>Privacy policy</a>
            &nbsp;&nbsp; | &nbsp;&nbsp;
            <a href={termsOfUse}>Terms of use</a>
            &nbsp;&nbsp; | &nbsp;&nbsp;
            <a href={logoPack}>Download Logo</a>
          </div>
        </footer>
      </div>
    );
  }
}

renderComponent(EoscCommonMainFooter.name, EoscCommonMainFooter);
renderComponent("eosc-common-main-footer", EoscCommonMainFooter);
renderComponent(".eosc-common-main-footer", EoscCommonMainFooter);
renderComponent("#eosc-common-main-footer", EoscCommonMainFooter);
window[environment.windowTagName].renderMainFooter = (cssSelector, elementAttr) => {
  renderComponent(cssSelector, EoscCommonMainFooter, elementAttr);
};

export default EoscCommonMainFooter;
