import { isBtnActive } from "./main-header.utils";

// Helper method to mock window.location
const mockLocation = (hostname, protocol, pathname, href = `${protocol}//${hostname}${pathname}`) => {
  const location = {
    href,
    hostname,
    protocol,
    pathname
  };

  Object.defineProperty(window, "location", {
    value: location,
    writable: true,
    configurable: true
  });
};

describe("Main header btns underline", () => {
  beforeEach(() => {
    // Clean mocks before each test
    jest.clearAllMocks();
  });

  test("should underline on each subpage", () => {
    const urls = ["https://localhost"];

    // Test for a main page
    mockLocation("localhost", "https:", "/");
    expect(isBtnActive(urls, urls[0])).toBe(true);

    // Test for a /news page
    mockLocation("localhost", "https:", "/news");
    expect(isBtnActive(urls, urls[0])).toBe(true);

    // Test for a /contact-us page
    mockLocation("localhost", "https:", "/contact-us");
    expect(isBtnActive(urls, urls[0])).toBe(true);
  });

  test("should underline on each page except certain subpage", () => {
    const urls = ["https://localhost", "https://localhost/contact-us"];

    // Test for a main page
    mockLocation("localhost", "https:", "/");
    expect(isBtnActive(urls, urls[0])).toBe(true);
    expect(isBtnActive(urls, urls[1])).toBe(false);

    // Test for a /news page
    mockLocation("localhost", "https:", "/news");
    expect(isBtnActive(urls, urls[0])).toBe(true);
    expect(isBtnActive(urls, urls[1])).toBe(false);

    // Test for a /contact-us page
    mockLocation("localhost", "https:", "/contact-us");
    expect(isBtnActive(urls, urls[0])).toBe(false);
    expect(isBtnActive(urls, urls[1])).toBe(true);
  });

  test("should underline Browse resources on Marketplace and Discovery Hub pages", () => {
    const urls = [
      "https://eosc.gov.pl/",
      "https://eosc.pl/search/all_collection?q=*",
      "https://data.eosc.pl/"
    ];

    mockLocation("marketplace.eosc.pl", "https:", "/services");
    expect(isBtnActive(urls, urls[1])).toBe(true);
    expect(isBtnActive(urls, urls[2])).toBe(false);

    mockLocation("eosc.pl", "https:", "/providers");
    expect(isBtnActive(urls, urls[1])).toBe(true);
    expect(isBtnActive(urls, urls[2])).toBe(false);
  });

  test("should underline Work with data on Onedata pages", () => {
    const urls = [
      "https://eosc.gov.pl/",
      "https://eosc.pl/search/all_collection?q=*",
      "https://data.eosc.pl/"
    ];

    mockLocation("data.eosc.pl", "https:", "/ozw/onezone/i", "https://data.eosc.pl/ozw/onezone/i#/onedata/users");
    expect(isBtnActive(urls, urls[1])).toBe(false);
    expect(isBtnActive(urls, urls[2])).toBe(true);
  });
});
