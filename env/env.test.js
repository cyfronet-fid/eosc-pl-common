const mainHeaderConfig = require("../configurations/main-header.development.config.json");
const mainFooterConfig = require("../configurations/main-footer.development.config.json");
const totopWrapperConfig = require("../configurations/totop-wrapper.development.json");
const defaultConfiguration = require("../configurations/configuration.development.json");

const discoveryhubUrl = "https://eosc.pl";
const marketplaceUrl = "https://marketplace.eosc.pl";
// const bosUrl = "https://bos.eosc.pl";
// const onedataUrl = "https://data.eosc.pl";

const environment = {
  mainHeaderConfig,
  mainFooterConfig,
  defaultConfiguration,
  totopWrapperConfig,
  production: false,
  windowTagName: "eosccommon",
  customUserTabs: [
    {
      id: "Provider",
      name: "Provider",
      links: [
        {
          caption: "Become provider",
          href: `${discoveryhubUrl}/#become-provider`,
          dividerAfter: true
        },
        {
          caption: "Documentation",
          href: `${discoveryhubUrl}/documentation`
        }
      ]
    }
  ],
  customProviderTabs: [
    {
      id: "provider",
      name: "Provider",
      links: [
        {
          caption: "Backoffice",
          href: `${marketplaceUrl}/backoffice/services`
        },
        {
          caption: "Ordering system",
          href: `${this.bosUrl}`,
          dividerAfter: true
        },
        {
          caption: "+ Add new service",
          href: `${marketplaceUrl}/backoffice/services/new`
        },
        {
          caption: "+ Add new provider",
          href: `${marketplaceUrl}/backoffice/providers/new/wizard`
        },
        {
          caption: "+ Add new catalogue",
          href: `${marketplaceUrl}/backoffice/catalogues/new`,
          dividerAfter: true
        },
        {
          caption: "Documentation",
          href: `${discoveryhubUrl}/documentation`
        }
      ]
    }
  ]
};
exports.environment = environment;

if (!window[environment.windowTagName]) {
  window[environment.windowTagName] = {};
}
