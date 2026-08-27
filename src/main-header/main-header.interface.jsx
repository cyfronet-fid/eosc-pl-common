import PropTypes from "prop-types";
import { Component } from "preact";
import { environment } from "../../env/env";
import { isAutologinOn, tryAutologin } from "./auto-login.utils";
import EoscMainHeaderBtn from "./main-header-btn.component";
import { getAuthBtn, isBtnActive } from "./main-header.utils";
import { isJsScript } from "../../core/callback.validators";
import { renderComponent } from "../../core/render";
import { fieldsToCamelCase, usePropTypes } from "../../core/utils";
import RWD from "../../core/rwd.hoc";


function safeParseJsonArray(value) {
  if (Array.isArray(value)) {
    return value;
  }

  if (typeof value === "string") {
    try {
      const parsed = JSON.parse(value);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }

  return [];
}

/**
 * @version 1.1
 */
class EoscCommonMainHeader extends Component {
  static propTypes = {
    /**
     * Username property
     */
    username: PropTypes.string,
    "login-url": PropTypes.string,
    "logout-url": PropTypes.string,
    "on-login": isJsScript,
    "on-logout": isJsScript,
    autoLogin: PropTypes.bool,
    "show-eosc-links": PropTypes.bool,
    "profile-links": PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
    "custom-tabs": PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
    "user-roles": PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
    "provider-custom-tabs": PropTypes.oneOfType([PropTypes.string, PropTypes.array])
  };

  static defaultProps = {
    username: "",
    "login-url": "",
    "logout-url": "",
    "on-login": "",
    "on-logout": "",
    autoLogin: true,
    "show-eosc-links": false,
    "profile-links": "[]",
    "custom-tabs": "[]",
    "user-roles": "[]",
    "provider-custom-tabs": "[]"
  };

  render(props) {
    /**
     * IMPORTANT!!! By default is on
     */
    const parsedProps = fieldsToCamelCase(usePropTypes(props, EoscCommonMainHeader));

    const userRoles = safeParseJsonArray(parsedProps.userRoles, []);
    const rawCustomTabs = safeParseJsonArray(parsedProps.customTabs, []);
    const rawProviderCustomTabs = safeParseJsonArray(parsedProps.providerCustomTabs, []);
    parsedProps.profileLinks = safeParseJsonArray(parsedProps.profileLinks, []);

    const isProvider =
      Array.isArray(userRoles) &&
      userRoles.some((role) => role === "admin" || role === "coordinator" || role === "executive");


    // Custom tabs override the default tabs.
    // Empty/missing values mean that the default tabs should be used.
    if (isProvider) {
      if (Array.isArray(rawProviderCustomTabs) && rawProviderCustomTabs.length > 0) {
        parsedProps.customTabs = rawProviderCustomTabs;
      } else if (Array.isArray(rawCustomTabs) && rawCustomTabs.length > 0) {
        parsedProps.customTabs = rawCustomTabs;
      } else {
        parsedProps.customTabs = environment.customProviderTabs;
      }
    } else {
      if (Array.isArray(rawCustomTabs) && rawCustomTabs.length > 0) {
        parsedProps.customTabs = rawCustomTabs;
      } else {
        parsedProps.customTabs = environment.customUserTabs;
      }
    }

    const { autoLogin } = parsedProps;
    if (isAutologinOn(autoLogin)) {
      tryAutologin(parsedProps);
    }

    return (
      <RWD showOn={["lg", "xl", "md", "sm", "xsm"]}>
        <div class="commons-header">
          <nav className={`eosc-common top ${environment.production ? "" : "demo"}`}>
            <div className="container">
              <div className="left-links">
                <a href="https://eosc.pl/" className="header-logo"></a>
              </div>

              <input className="menu-btn" type="checkbox" id="menu-btn" />
              <label className="menu-icon" htmlFor="menu-btn">
                <span className="navicon" />
              </label>

              <ul className="menu center-links">
                {environment.mainHeaderConfig.map((config) => (
                  <EoscMainHeaderBtn
                    {...{
                      ...config,
                      isActive: isBtnActive(
                        environment.mainHeaderConfig.map((btn) => btn.url),
                        config.url
                      )
                    }}
                  />
                ))}
              </ul>
              <ul className="right-links">{getAuthBtn(parsedProps)}</ul>
            </div>
          </nav>
        </div>
      </RWD>
    );
  }
}

renderComponent(EoscCommonMainHeader.name, EoscCommonMainHeader);
renderComponent(".eosc-common-main-header", EoscCommonMainHeader);
renderComponent("#eosc-common-main-header", EoscCommonMainHeader);
renderComponent("eosc-common-main-header", EoscCommonMainHeader);
window[environment.windowTagName].renderMainHeader = (cssSelector, elementAttr = {}) => {
  renderComponent(cssSelector, EoscCommonMainHeader, elementAttr);
};

export default EoscCommonMainHeader;
