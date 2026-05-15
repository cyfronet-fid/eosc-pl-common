import EoscMainHeaderLogoutBtn from "./main-header-logout-btn.component";
import EoscMainHeaderLoginBtn from "./main-header-login-btn.component";

const BROWSE_RESOURCES_HOSTS = ["eosc.pl", "marketplace.eosc.pl"];

function parseUrl(url) {
  try {
    return new URL(url);
  } catch {
    return null;
  }
}

function isCurrentHost(hosts) {
  return hosts.includes(window.location.hostname);
}

function isBrowseResourcesBtn(btnUrl) {
  const parsedBtnUrl = parseUrl(btnUrl);

  return parsedBtnUrl?.hostname === "eosc.pl" && parsedBtnUrl.pathname.includes("/search");
}

function isWorkWithDataBtn(btnUrl) {
  return parseUrl(btnUrl)?.hostname === "data.eosc.pl";
}

function isOnedataPage() {
  return `${window.location.href || ""}`.includes("onedata");
}

function isKnownEoscAppBtnActive(btnUrl) {
  if (isBrowseResourcesBtn(btnUrl)) {
    return isCurrentHost(BROWSE_RESOURCES_HOSTS);
  }

  if (isWorkWithDataBtn(btnUrl)) {
    return isOnedataPage();
  }

  return false;
}

export function isBtnActive(btnsUrls, btnUrl) {
  if (isKnownEoscAppBtnActive(btnUrl)) {
    return true;
  }

  const currentUrlBase = `${window.location.protocol}//${window.location.hostname}`;
  if (!btnUrl.includes(currentUrlBase)) {
    return false;
  }

  const allBtnsSubpages = btnsUrls
    .filter((url) => !!url && url.trim() !== "")
    .map((url) => new URL(url).pathname)
    .filter((path) => path !== "/");
  const parsedBtnUrl = new URL(btnUrl);

  // Global active btn
  const isMainPageBtn = parsedBtnUrl.pathname === "/";
  const isMainBtnRestrictedSubpage = !allBtnsSubpages.includes(window.location.pathname);
  const shouldBeActivatedOnSubpages = isMainPageBtn && isMainBtnRestrictedSubpage;

  // Subpage btn
  const isMainPage = window.location.pathname !== "/";
  const isSpecificSubpage = isMainPage && new URL(btnUrl).pathname.includes(window.location.pathname);

  return shouldBeActivatedOnSubpages || isSpecificSubpage;
}

export function getAuthBtn(props) {

  const { loginUrl, logoutUrl, onLogin, onLogout } = props;
  if (!loginUrl && !logoutUrl && !onLogin && !onLogout) {
    return null;
  }

  const { username } = props;
  const isLoggedIn = !!username && username.trim() !== "";
  return isLoggedIn ? <EoscMainHeaderLogoutBtn {...props} /> : <EoscMainHeaderLoginBtn {...props} />;
}
