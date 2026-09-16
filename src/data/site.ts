export interface NavSubItem {
  name: string;
  url: string | null;
  status?: "past" | "future";
}

export interface NavItem {
  name: string;
  url: string;
  subItems?: NavSubItem[];
}

export interface SecondaryNavItem {
  name: string;
  url: string;
  clickable: boolean;
}

export interface SiteConfig {
  title: string;
  description: string;
  url: string;
  defaultImage: string;
  logo: string;
  author: string;
  language: string;
  newsletterSuccessMessage: string;
  main_navigation: NavItem[];
  second_navigation: SecondaryNavItem[];
}

const site: SiteConfig = {
  title: "Rebuild",
  description: "A sprint for European social platforms",
  url: import.meta.env.VITE_SITE_URL ?? "http://localhost:3000",
  defaultImage: "/assets/images/social-3.jpg",
  logo: "/assets/images/logo.svg",
  author: "Rebuild",
  language: "en",
  newsletterSuccessMessage:
    "Success, you signed up! Check your email soon for the latest update from the Rebuild team.",

  main_navigation: [
    {
      name: "Gatherings",
      url: "/gatherings/",
      subItems: [
        { name: "Rebuild 1", url: null, status: "past" },
        { name: "Rebuild 2", url: "/gatherings/rebuild-2/", status: "past" },
        { name: "Rebuild 3", url: "/gatherings/rebuild-3/", status: "future" },
      ],
    },
    { name: "Directory", url: "/directory/" },
    { name: "Tools", url: "/tools/" },
    { name: "Data", url: "/data/" },
    { name: "Insights", url: "/insights/" },
    { name: "People", url: "/people/" },
    { name: "About", url: "/about/" },
    { name: "Get in touch", url: "/get-in-touch/" },
  ],

  second_navigation: [
    { name: "Open positions", url: "/open-positions/", clickable: false },
    { name: "Privacy", url: "/privacy/", clickable: true },
    { name: "Changelog", url: "/changelog/", clickable: true },
  ],
};

export default site;
