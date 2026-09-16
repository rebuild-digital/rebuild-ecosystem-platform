export interface FormFieldOption {
  value: string;
  label: string;
}

export interface FormField {
  name: string;
  label: string;
  type: "text" | "email" | "tel" | "url" | "textarea" | "select" | "checkbox";
  required?: boolean;
  options?: FormFieldOption[];
  placeholder?: string;
  hidden?: boolean;
  value?: string;
}

export interface FormConfig {
  id: string;
  title: string;
  endpoint: string;
  fields: FormField[];
  successMessage?: string;
}

const interestOptions: FormFieldOption[] = [
  { value: "", label: "Select your interest" },
  { value: "building", label: "Building a platform" },
  { value: "investing", label: "Investing" },
  { value: "working", label: "Working at a platform" },
  { value: "supporting", label: "Supporting the ecosystem" },
  { value: "media", label: "Media / Press" },
  { value: "research", label: "Research / Academia" },
  { value: "other", label: "Other" },
];

const categoryOptions: FormFieldOption[] = [
  { value: "", label: "Select a category" },
  { value: "social-networking", label: "Social networking" },
  { value: "messaging", label: "Messaging" },
  { value: "media-sharing", label: "Media sharing" },
  { value: "community", label: "Community" },
  { value: "professional", label: "Professional networking" },
  { value: "dating", label: "Dating" },
  { value: "events", label: "Events" },
  { value: "other", label: "Other" },
];

const stageOptions: FormFieldOption[] = [
  { value: "", label: "Select a stage" },
  { value: "idea", label: "Idea" },
  { value: "prototype", label: "Prototype" },
  { value: "mvp", label: "MVP / Early product" },
  { value: "growth", label: "Growth" },
  { value: "established", label: "Established" },
];

const groupOptions: FormFieldOption[] = [
  { value: "", label: "Select your group" },
  { value: "founder", label: "Founder / Builder" },
  { value: "investor", label: "Investor" },
  { value: "designer", label: "Designer" },
  { value: "engineer", label: "Engineer / Developer" },
  { value: "researcher", label: "Researcher / Academic" },
  { value: "media", label: "Media / Press" },
  { value: "policy", label: "Government / Policy" },
  { value: "talent", label: "Talent / Looking to join" },
  { value: "other", label: "Other" },
];

const countryOptions: FormFieldOption[] = [
  { value: "", label: "Select your country" },
  { value: "AT", label: "Austria" },
  { value: "BE", label: "Belgium" },
  { value: "BG", label: "Bulgaria" },
  { value: "HR", label: "Croatia" },
  { value: "CY", label: "Cyprus" },
  { value: "CZ", label: "Czech Republic" },
  { value: "DK", label: "Denmark" },
  { value: "EE", label: "Estonia" },
  { value: "FI", label: "Finland" },
  { value: "FR", label: "France" },
  { value: "DE", label: "Germany" },
  { value: "GR", label: "Greece" },
  { value: "HU", label: "Hungary" },
  { value: "IS", label: "Iceland" },
  { value: "IE", label: "Ireland" },
  { value: "IT", label: "Italy" },
  { value: "LV", label: "Latvia" },
  { value: "LT", label: "Lithuania" },
  { value: "LU", label: "Luxembourg" },
  { value: "MT", label: "Malta" },
  { value: "NL", label: "Netherlands" },
  { value: "NO", label: "Norway" },
  { value: "PL", label: "Poland" },
  { value: "PT", label: "Portugal" },
  { value: "RO", label: "Romania" },
  { value: "SK", label: "Slovakia" },
  { value: "SI", label: "Slovenia" },
  { value: "ES", label: "Spain" },
  { value: "SE", label: "Sweden" },
  { value: "CH", label: "Switzerland" },
  { value: "GB", label: "United Kingdom" },
  { value: "other", label: "Other" },
];

export const formConfigs: Record<string, FormConfig> = {
  newsletter: {
    id: "newsletter",
    title: "Stay involved",
    endpoint: "/api/newsletter-signup",
    successMessage:
      "Success, you signed up! Check your email soon for the latest update from the Rebuild team.",
    fields: [
      {
        name: "email",
        label: "Email",
        type: "email",
        required: true,
        placeholder: "your@email.com",
      },
      {
        name: "first_name",
        label: "First name",
        type: "text",
        placeholder: "First name",
      },
      {
        name: "last_name",
        label: "Last name",
        type: "text",
        placeholder: "Last name",
      },
      {
        name: "interest",
        label: "Interest",
        type: "select",
        options: interestOptions,
      },
      {
        name: "consent",
        label: "I agree to receive newsletters from Rebuild",
        type: "checkbox",
        required: true,
      },
    ],
  },

  "builder-application": {
    id: "builder-application",
    title: "Join the directory",
    endpoint: "/api/builder-application",
    successMessage:
      "Thank you for your application! We will review it and get back to you.",
    fields: [
      {
        name: "builder_name",
        label: "Platform name",
        type: "text",
        required: true,
        placeholder: "Your platform name",
      },
      {
        name: "email",
        label: "Email",
        type: "email",
        required: true,
        placeholder: "your@email.com",
      },
      { name: "phone", label: "Phone", type: "tel", placeholder: "+45..." },
      {
        name: "website",
        label: "Website",
        type: "url",
        placeholder: "https://",
      },
      {
        name: "category",
        label: "Category",
        type: "select",
        options: categoryOptions,
      },
      {
        name: "location",
        label: "Location",
        type: "text",
        placeholder: "City, Country",
      },
      {
        name: "description",
        label: "Description",
        type: "textarea",
        placeholder: "Describe your platform",
      },
      {
        name: "impact",
        label: "Impact",
        type: "textarea",
        placeholder: "What impact does your platform have?",
      },
      {
        name: "stage",
        label: "Stage",
        type: "select",
        options: stageOptions,
      },
      {
        name: "team_size",
        label: "Team size",
        type: "text",
        placeholder: "e.g. 5",
      },
      {
        name: "consent",
        label: "I consent to my data being processed by Rebuild",
        type: "checkbox",
        required: true,
      },
      {
        name: "newsletter",
        label: "Also subscribe me to the Rebuild newsletter",
        type: "checkbox",
      },
    ],
  },

  "builder-promo": {
    id: "builder-promo",
    title: "Suggest a platform",
    endpoint: "/api/builder-promotion",
    successMessage:
      "Thank you for your suggestion! We will review it shortly.",
    fields: [
      {
        name: "builder_name",
        label: "Platform name",
        type: "text",
        required: true,
        placeholder: "Name of the platform",
      },
      {
        name: "builder_website",
        label: "Platform website",
        type: "url",
        placeholder: "https://",
      },
      {
        name: "why_promote",
        label: "Why should this platform be in the directory?",
        type: "textarea",
        placeholder: "Tell us why",
      },
      {
        name: "your_name",
        label: "Your name",
        type: "text",
        required: true,
        placeholder: "Your name",
      },
      {
        name: "your_email",
        label: "Your email",
        type: "email",
        required: true,
        placeholder: "your@email.com",
      },
      {
        name: "your_relationship",
        label: "Your relationship to the platform",
        type: "text",
        placeholder: "e.g. Founder, User, Fan",
      },
      {
        name: "newsletter_signup",
        label: "Also subscribe me to the Rebuild newsletter",
        type: "checkbox",
      },
    ],
  },

  "gathering-invitation": {
    id: "gathering-invitation",
    title: "Request an invitation",
    endpoint: "/api/gathering-invitation",
    successMessage:
      "Thank you for your interest! We will review your request and be in touch.",
    fields: [
      {
        name: "name",
        label: "Full name",
        type: "text",
        required: true,
        placeholder: "Your full name",
      },
      {
        name: "email",
        label: "Email",
        type: "email",
        required: true,
        placeholder: "your@email.com",
      },
      { name: "phone", label: "Phone", type: "tel", placeholder: "+45..." },
      {
        name: "platform_link",
        label: "Platform or profile link",
        type: "url",
        placeholder: "https://",
      },
      {
        name: "country",
        label: "Country",
        type: "select",
        options: countryOptions,
      },
      {
        name: "group",
        label: "Which group best describes you?",
        type: "select",
        options: groupOptions,
      },
      {
        name: "contribution",
        label: "How will you contribute to the gathering?",
        type: "textarea",
        placeholder: "Tell us what you bring",
      },
      {
        name: "consent",
        label: "I consent to my data being processed by Rebuild",
        type: "checkbox",
        required: true,
      },
      {
        name: "newsletter",
        label: "Also subscribe me to the Rebuild newsletter",
        type: "checkbox",
      },
      {
        name: "form_type",
        label: "",
        type: "text",
        hidden: true,
        value: "gathering-invitation",
      },
      {
        name: "gathering",
        label: "",
        type: "text",
        hidden: true,
        value: "Rebuild 2",
      },
    ],
  },

  "gathering-invitation-rebuild3": {
    id: "gathering-invitation-rebuild3",
    title: "Request an invitation",
    endpoint: "/api/gathering-invitation",
    successMessage:
      "Thank you for your interest! We will review your request and be in touch.",
    fields: [
      {
        name: "name",
        label: "Full name",
        type: "text",
        required: true,
        placeholder: "Your full name",
      },
      {
        name: "email",
        label: "Email",
        type: "email",
        required: true,
        placeholder: "your@email.com",
      },
      { name: "phone", label: "Phone", type: "tel", placeholder: "+45..." },
      {
        name: "platform_link",
        label: "Platform or profile link",
        type: "url",
        placeholder: "https://",
      },
      {
        name: "country",
        label: "Country",
        type: "select",
        options: countryOptions,
      },
      {
        name: "group",
        label: "Which group best describes you?",
        type: "select",
        options: groupOptions,
      },
      {
        name: "contribution",
        label: "How will you contribute to the gathering?",
        type: "textarea",
        placeholder: "Tell us what you bring",
      },
      {
        name: "consent",
        label: "I consent to my data being processed by Rebuild",
        type: "checkbox",
        required: true,
      },
      {
        name: "newsletter",
        label: "Also subscribe me to the Rebuild newsletter",
        type: "checkbox",
      },
      {
        name: "form_type",
        label: "",
        type: "text",
        hidden: true,
        value: "gathering-invitation-rebuild3",
      },
      {
        name: "gathering",
        label: "",
        type: "text",
        hidden: true,
        value: "Rebuild 3",
      },
    ],
  },

  "application-rebuild1": {
    id: "application-rebuild1",
    title: "Apply to Rebuild 1",
    endpoint: "/api/application-rebuild1",
    successMessage:
      "Thank you for applying! We will review your application and be in touch.",
    fields: [
      {
        name: "name",
        label: "Full name",
        type: "text",
        required: true,
        placeholder: "Your full name",
      },
      {
        name: "email",
        label: "Email",
        type: "email",
        required: true,
        placeholder: "your@email.com",
      },
      {
        name: "organisation",
        label: "Organisation",
        type: "text",
        placeholder: "Your organisation",
      },
      {
        name: "role",
        label: "Role",
        type: "text",
        placeholder: "Your role",
      },
      {
        name: "country",
        label: "Country",
        type: "select",
        options: countryOptions,
      },
      {
        name: "newsletter",
        label: "Also subscribe me to the Rebuild newsletter",
        type: "checkbox",
      },
      {
        name: "form_type",
        label: "",
        type: "text",
        hidden: true,
        value: "application-rebuild1",
      },
    ],
  },
};
