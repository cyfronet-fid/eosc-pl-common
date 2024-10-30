const mainHeaderConfig = require("../configurations/main-header.production.config.json");
const mainFooterConfig = require("../configurations/main-footer.production.config.json");
const defaultConfiguration = require("../configurations/configuration.production.json");

const environment = {
  mainHeaderConfig,
  mainFooterConfig,
  defaultConfiguration,
<<<<<<< HEAD
  euInformationConfig,
  marketplaceUrl: "https://marketplace.eosc.pl",
  dashboardUrl: "https://my.eosc.pl",
=======
  marketplaceUrl: "https://marketplace.sandbox.eosc-beyond.eu",
  dashboardUrl: "https://my.sandbox.eosc-beyond.eu",
>>>>>>> ae6bda1 ( update beta env for sandbox instances, remove eu-information component)
  production: true,
  windowTagName: "eosccommon",
};
exports.environment = environment;

if (!window[environment.windowTagName]) {
  window[environment.windowTagName] = {};
}
