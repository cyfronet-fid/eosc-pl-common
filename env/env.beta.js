const mainHeaderConfig = require("../configurations/main-header.beta.config.json");
const mainFooterConfig = require("../configurations/main-footer.development.config.json");
const totopWrapperConfig = require("../configurations/totop-wrapper.development.json");
const defaultConfiguration = require("../configurations/configuration.development.json");

const environment = {
  mainHeaderConfig,
  mainFooterConfig,
  defaultConfiguration,
  totopWrapperConfig,
  marketplaceUrl: "https://marketplace.eosc.pl",
  dashboardUrl: "https://eosc-user-dashboard.docker-fid.grid.cyf-kr.edu.pl",
  production: false,
  windowTagName: "eosccommon"
};
exports.environment = environment;

if (!window[environment.windowTagName]) {
  window[environment.windowTagName] = {};
}
