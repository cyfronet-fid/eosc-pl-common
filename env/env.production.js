const mainHeaderConfig = require("../configurations/main-header.production.config.json");
const mainFooterConfig = require("../configurations/main-footer.production.config.json");
const totopWrapperConfig = require("../configurations/totop-wrapper.production.json");
const defaultConfiguration = require("../configurations/configuration.production.json");

export const discoveryhubUrl = "https://eosc.pl";
export const marketplaceUrl = "https://marketplace.eosc.pl";
export const bosUrl = "https://bos.eosc.pl";
export const onedataUrl = "https://data.eosc.pl"; // don't remove even if IDE suggest so, it could be used with different config

export const environment = {
  mainHeaderConfig,
  mainFooterConfig,
  defaultConfiguration,
  totopWrapperConfig,
  production: true,
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
          href: `${bosUrl}`,
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

if (!window[environment.windowTagName]) {
  window[environment.windowTagName] = {};
}
