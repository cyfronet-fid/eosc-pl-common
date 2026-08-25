import { render, screen, fireEvent, waitFor } from "@testing-library/preact";
import { h } from "preact";
import userEvent from "@testing-library/user-event";
import Cookies from "js-cookie";
import { environment } from "../../env/env";
import EoscCommonMainHeader from "./main-header.interface";
import * as AutoLoginUtils from "./auto-login.utils";
import * as CallbackUtils from "../../core/callback";
import "window-resizeto/polyfill";

import {
  AUTOLOGIN_COOKIE_NAME,
  getCookieConfig,
  LOGIN_ATTEMPT_COOKIE_NAME,
} from "./auto-login.utils";

jest.mock("react-responsive", () => ({
  useMediaQuery: () => true
}));

// Mock location
delete window.location;
window.location = {
  href: null,
  hostname: "localhost"
};

// TODO: temporarily disable tests. Need to be fixed!!!
describe("Main Header Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Reset location
    window.location.href = null;
  });

  test.skip("should run on logout script", async () => {
    const user = userEvent.setup();
    const consoleLogSpy = jest.spyOn(console, "log");
    const props = {
      username: "username",
      "loginUrl": "https://test.pl",
      "onLogout": "console.log('test')"
    };

    render(<EoscCommonMainHeader {...props} />);

    expect(screen.getByText("My EOSC")).toBeInTheDocument();

    const logoutLink = screen.getByText("Logout").closest("a");
    await user.click(logoutLink);

    await waitFor(() => {
      expect(consoleLogSpy).toHaveBeenCalledWith("test");
    });
  });

  test.skip("should run on login script", async () => {
    const user = userEvent.setup();
    const consoleLogSpy = jest.spyOn(console, "log");
    const props = {
      username: "",
      "logout-url": "https://test.pl",
      "on-login": "console.log('test')"
    };

    render(<EoscCommonMainHeader {...props} />);

    expect(screen.getByText("Login")).toBeInTheDocument();

    const loginLink = screen.getByText("Login").closest("a");
    await user.click(loginLink);

    await waitFor(() => {
      expect(consoleLogSpy).toHaveBeenCalledWith("test");
    });
  });

  test.skip("should display all hrefs", () => {
    const props = {
      username: "",
      "logout-url": "https://test.pl",
      "login-url": "https://test1.pl"
    };

    render(<EoscCommonMainHeader {...props} />);

    environment.mainHeaderConfig.forEach((config) => {
      expect(screen.getByText(config.label)).toBeInTheDocument();
    });
  });

  describe("Autologin", () => {
    test("should try autologin with url", () => {
      jest.spyOn(Cookies, "get").mockImplementation((cookieName) => cookieName === AUTOLOGIN_COOKIE_NAME);

      const props = {
        username: "",
        "logout-url": "https://test.pl",
        "login-url": "https://test1.pl"
      };

      new EoscCommonMainHeader().render(props);
      expect(window.location.href).toEqual(props["login-url"]);
    });

    test("should try autologin with callback", () => {
      jest.spyOn(Cookies, "get").mockImplementation((cookieName) => cookieName === AUTOLOGIN_COOKIE_NAME);
      const callAllSpy = jest.spyOn(CallbackUtils, "default");

      const props = {
        username: "",
        "logout-url": "https://test.pl",
        "on-login": "console.log('test');"
      };

      new EoscCommonMainHeader().render(props);
      expect(callAllSpy).toHaveBeenCalledWith(null, props["on-login"]);
    });

    test("[Deprecated use with braces] should try autologin with callback", () => {
      jest.spyOn(Cookies, "get").mockImplementation((cookieName) => cookieName === AUTOLOGIN_COOKIE_NAME);
      const callAllSpy = jest.spyOn(CallbackUtils, "default");

      const props = {
        username: "",
        "logout-url": "https://test.pl",
        "(on-login)": "console.log('test');"
      };

      new EoscCommonMainHeader().render(props);
      expect(callAllSpy).toHaveBeenCalledWith(null, props["(on-login)"]);
    });

    test("should try login by default", () => {
      const autoLoginCallSpy = jest.spyOn(AutoLoginUtils, "tryAutologin");

      const props = {
        username: "",
        "logout-url": "https://test.pl",
        "login-url": "https://test1.pl"
      };

      new EoscCommonMainHeader().render(props);
      expect(autoLoginCallSpy).toHaveBeenCalled();
    });

    test("should create autologin cookie", () => {
      const props = {
        username: "logged in user",
        "logout-url": "https://test.pl",
        "login-url": "https://test1.pl"
      };

      jest.spyOn(Cookies, "get").mockImplementation((cookieName) => cookieName === LOGIN_ATTEMPT_COOKIE_NAME);
      const setCookieSpy = jest.spyOn(Cookies, "set");
      const removeCookieSpy = jest.spyOn(Cookies, "remove");

      new EoscCommonMainHeader().render(props);

      expect(removeCookieSpy).toHaveBeenCalledWith(LOGIN_ATTEMPT_COOKIE_NAME, {
        ...getCookieConfig(window.location.hostname),
        expires: expect.anything()
      });

      environment.defaultConfiguration.autoLoginDomains.forEach((domain) => {
        expect(setCookieSpy).toHaveBeenCalledWith(AUTOLOGIN_COOKIE_NAME, AUTOLOGIN_COOKIE_NAME, {
          ...getCookieConfig(domain),
          expires: expect.anything()
        });
      });
    });

    test("should remove autologin cookie on missing username", () => {
      const props = {
        username: "",
        "logout-url": "https://test.pl",
        "login-url": "https://test1.pl"
      };

      jest.spyOn(Cookies, "get").mockImplementation((cookieName) => cookieName === LOGIN_ATTEMPT_COOKIE_NAME);
      const removeCookieSpy = jest.spyOn(Cookies, "remove");

      new EoscCommonMainHeader().render(props);

      expect(removeCookieSpy).toHaveBeenCalledWith(LOGIN_ATTEMPT_COOKIE_NAME, {
        ...getCookieConfig(window.location.hostname),
        expires: expect.anything()
      });

      environment.defaultConfiguration.autoLoginDomains.forEach((domain) => {
        expect(removeCookieSpy).toHaveBeenCalledWith(AUTOLOGIN_COOKIE_NAME, {
          ...getCookieConfig(domain),
          expires: expect.anything()
        });
      });
    });
  });

  describe("Custom Tabs & User Roles", () => {
    test("should display default user custom tabs for regular user", async () => {
      const user = userEvent.setup();
      const props = {
        username: "Test User",
        "logout-url": "https://test.pl"
      };

      render(<EoscCommonMainHeader {...props} />);

      const toggle = screen.getByText("Test User");
      await user.click(toggle);

      const providerTab = screen.getByText("Provider");
      await user.click(providerTab);

      expect(screen.getByText("Become provider")).toBeInTheDocument();
      expect(screen.getByText("Documentation")).toBeInTheDocument();
    });

    test("should allow overriding user custom tabs for regular user", async () => {
      const user = userEvent.setup();
      const customTabs = JSON.stringify([
        {
          id: "custom",
          name: "Custom Tab",
          links: [{ caption: "Custom User Link", href: "https://custom.user.pl" }]
        }
      ]);

      const props = {
        username: "Test User",
        "logout-url": "https://test.pl",
        "custom-tabs": customTabs
      };

      render(<EoscCommonMainHeader {...props} />);

      const toggle = screen.getByText("Test User");
      await user.click(toggle);

      const customTab = screen.getByText("Custom Tab");
      await user.click(customTab);

      expect(screen.getByText("Custom User Link")).toBeInTheDocument();
      expect(screen.queryByText("Become provider")).not.toBeInTheDocument();
    });

    test("should display provider custom tabs when user role is admin or coordinator", async () => {
      const user = userEvent.setup();
      const props = {
        username: "Admin User",
        "logout-url": "https://test.pl",
        "user-roles": JSON.stringify(["admin"])
      };

      render(<EoscCommonMainHeader {...props} />);

      const toggle = screen.getByText("Admin User");
      await user.click(toggle);

      const providerTab = screen.getByText("Provider");
      await user.click(providerTab);

      expect(screen.getByText("Backoffice")).toBeInTheDocument();
      expect(screen.getByText("Ordering system")).toBeInTheDocument();
      expect(screen.getByText("+ Add new service")).toBeInTheDocument();
      expect(screen.getByText("+ Add new provider")).toBeInTheDocument();
      expect(screen.getByText("+ Add new catalogue")).toBeInTheDocument();
      expect(screen.getByText("Documentation")).toBeInTheDocument();
      expect(screen.queryByText("Become provider")).not.toBeInTheDocument();
    });

    test("should allow overriding provider custom tabs via provider-custom-tabs", async () => {
      const user = userEvent.setup();
      const providerCustomTabs = JSON.stringify([
        {
          id: "provider",
          name: "Provider",
          links: [{ caption: "Custom Provider Link", href: "https://custom.provider.pl" }]
        }
      ]);

      const props = {
        username: "Coordinator User",
        "logout-url": "https://test.pl",
        "user-roles": JSON.stringify(["coordinator"]),
        "provider-custom-tabs": providerCustomTabs
      };

      render(<EoscCommonMainHeader {...props} />);

      const toggle = screen.getByText("Coordinator User");
      await user.click(toggle);

      const providerTab = screen.getByText("Provider");
      await user.click(providerTab);

      expect(screen.getByText("Custom Provider Link")).toBeInTheDocument();
      expect(screen.queryByText("Backoffice")).not.toBeInTheDocument();
    });
  });
});

