import PropTypes from "prop-types";
import { Component, Fragment } from "preact";
import { environment } from "../../env/env";
import { usePropTypes } from "../../core/utils";

export default class EoscMainFooterCols extends Component {
  static propTypes = {
    cols: PropTypes.arrayOf(
        PropTypes.shape({
          label: PropTypes.string.isRequired,
          url: PropTypes.string,
          navBtns: PropTypes.arrayOf(
            PropTypes.shape({
              label: PropTypes.string.isRequired,
              url: PropTypes.string.isRequired
            })
          ).isRequired
        })
    ),
    termsOfUse: PropTypes.string,
    privacyPolicy: PropTypes.string
  };

  static defaultProps = {
    cols: environment.mainFooterConfig.cols
  };

  renderLink(link, props) {
    const type = link.type ?? "link";
    if (type === "link") {
      return (<li>{link.url ? <a href={link.url}>{link.label}</a> : link.label}</li>);
    } else if (type === "termsOfUse" && props.termsOfUse) {
      return (<li><a href={props.termsOfUse}>{link.label}</a></li>);
    } else if (type === "privacyPolicy" && props.privacyPolicy) {
      return (<li><a href={props.privacyPolicy}>{link.label}</a></li>);
    }
    return null;
  }

  render(props) {
    const propsValidated = usePropTypes(props, EoscMainFooterCols);
    const cols = propsValidated.cols;
    return (
      <div className="d-flex pb-2 footer-column-wrapper">
          {cols.map((col) => (
              <div className="footer-column">
                <h4>{col.label}</h4>
                <ul>
                    {!!col.navBtns && col.navBtns.length > 0 ? (
                        col.navBtns.map((btn) => this.renderLink(btn, propsValidated))
                    ) : (
                        <Fragment />
                    )}
                </ul>
              </div>
          ))}
      </div>
    );
  }
}
