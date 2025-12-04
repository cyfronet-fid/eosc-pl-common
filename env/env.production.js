const mainHeaderConfig = require("../configurations/main-header.production.config.json");
const mainFooterConfig = require("../configurations/main-footer.production.config.json");
const totopWrapperConfig = require("../configurations/totop-wrapper.production.json");
const defaultConfiguration = require("../configurations/configuration.production.json");

const environment = {
  mainHeaderConfig,
  mainFooterConfig,
  defaultConfiguration,
  totopWrapperConfig,
  marketplaceUrl: "https://marketplace.eosc.pl",
  dashboardUrl: "https://my.eosc.pl",
  production: true,
  windowTagName: "eosccommon"
};
exports.environment = environment;

if (!window[environment.windowTagName]) {
  window[environment.windowTagName] = {};
}
