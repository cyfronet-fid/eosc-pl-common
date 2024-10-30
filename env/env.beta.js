const mainHeaderConfig = require("../configurations/main-header.beta.config.json");
const mainFooterConfig = require("../configurations/main-footer.development.config.json");
const defaultConfiguration = require("../configurations/configuration.development.json");

const environment = {
  mainHeaderConfig,
  mainFooterConfig,
  defaultConfiguration,
<<<<<<< HEAD
  euInformationConfig,
  marketplaceUrl: "https://marketplace.eosc.pl",
  dashboardUrl: "https://eosc-user-dashboard.docker-fid.grid.cyf-kr.edu.pl",
=======
  marketplaceUrl: "https://marketplace.sandbox.eosc-beyond.eu",
  dashboardUrl: "https://my.sandbox.eosc-beyond.eu",
>>>>>>> ae6bda1 ( update beta env for sandbox instances, remove eu-information component)
  production: false,
  windowTagName: "eosccommon",
};
exports.environment = environment;

if (!window[environment.windowTagName]) {
  window[environment.windowTagName] = {};
}
