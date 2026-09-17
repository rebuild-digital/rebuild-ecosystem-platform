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
  helpText?: string;
}

export interface FormConfig {
  id: string;
  title: string;
  endpoint: string;
  fields: FormField[];
  successMessage?: string;
}

const interestOptions: FormFieldOption[] = [
  { value: "", label: "Keep me up to date as..." },
  { value: "entrepreneur", label: "an entrepreneur" },
  { value: "investor", label: "an investor" },
  { value: "public-fund-manager", label: "a public fund manager" },
  { value: "media-representative", label: "a media representative" },
  { value: "curious-individual", label: "a curious individual" },
];

const categoryOptions: FormFieldOption[] = [
  { value: "", label: "Select a category" },
  { value: "Bundled", label: "Bundled" },
  { value: "Community", label: "Community" },
  { value: "Creator platform", label: "Creator platform" },
  { value: "Dating", label: "Dating" },
  { value: "Events", label: "Events" },
  { value: "Forum", label: "Forum" },
  { value: "Groups", label: "Groups" },
  { value: "Location", label: "Location" },
  { value: "Social marketplace", label: "Social marketplace" },
  { value: "Messaging", label: "Messaging" },
  { value: "Microblogging", label: "Microblogging" },
  { value: "Networking", label: "Networking" },
  { value: "Photo sharing", label: "Photo sharing" },
  { value: "Resource sharing", label: "Resource sharing" },
  { value: "Video sharing", label: "Video sharing" },
  { value: "Other", label: "Other" },
];

const stageOptions: FormFieldOption[] = [
  { value: "", label: "Select a stage" },
  { value: "Idea", label: "Idea" },
  { value: "Alpha", label: "Alpha" },
  { value: "Beta", label: "Beta" },
  { value: "Growth", label: "Growth" },
];

const europeanCountryOptions: FormFieldOption[] = [
  { value: "", label: "Select your country" },
  { value: "Albania", label: "Albania" },
  { value: "Andorra", label: "Andorra" },
  { value: "Armenia", label: "Armenia" },
  { value: "Austria", label: "Austria" },
  { value: "Azerbaijan", label: "Azerbaijan" },
  { value: "Belarus", label: "Belarus" },
  { value: "Belgium", label: "Belgium" },
  { value: "Bosnia and Herzegovina", label: "Bosnia and Herzegovina" },
  { value: "Bulgaria", label: "Bulgaria" },
  { value: "Croatia", label: "Croatia" },
  { value: "Cyprus", label: "Cyprus" },
  { value: "Czech Republic", label: "Czech Republic" },
  { value: "Denmark", label: "Denmark" },
  { value: "Estonia", label: "Estonia" },
  { value: "Finland", label: "Finland" },
  { value: "France", label: "France" },
  { value: "Georgia", label: "Georgia" },
  { value: "Germany", label: "Germany" },
  { value: "Greece", label: "Greece" },
  { value: "Hungary", label: "Hungary" },
  { value: "Iceland", label: "Iceland" },
  { value: "Ireland", label: "Ireland" },
  { value: "Italy", label: "Italy" },
  { value: "Kazakhstan", label: "Kazakhstan" },
  { value: "Kosovo", label: "Kosovo" },
  { value: "Latvia", label: "Latvia" },
  { value: "Liechtenstein", label: "Liechtenstein" },
  { value: "Lithuania", label: "Lithuania" },
  { value: "Luxembourg", label: "Luxembourg" },
  { value: "Malta", label: "Malta" },
  { value: "Moldova", label: "Moldova" },
  { value: "Monaco", label: "Monaco" },
  { value: "Montenegro", label: "Montenegro" },
  { value: "Netherlands", label: "Netherlands" },
  { value: "North Macedonia", label: "North Macedonia" },
  { value: "Norway", label: "Norway" },
  { value: "Poland", label: "Poland" },
  { value: "Portugal", label: "Portugal" },
  { value: "Romania", label: "Romania" },
  { value: "Russia", label: "Russia" },
  { value: "San Marino", label: "San Marino" },
  { value: "Serbia", label: "Serbia" },
  { value: "Slovakia", label: "Slovakia" },
  { value: "Slovenia", label: "Slovenia" },
  { value: "Spain", label: "Spain" },
  { value: "Sweden", label: "Sweden" },
  { value: "Switzerland", label: "Switzerland" },
  { value: "Türkiye", label: "Türkiye" },
  { value: "Ukraine", label: "Ukraine" },
  { value: "United Kingdom", label: "United Kingdom" },
  { value: "Vatican City", label: "Vatican City" },
];

const gatheringGroupOptionsRebuild2: FormFieldOption[] = [
  { value: "", label: "Select your group" },
  { value: "Platform", label: "I am building a platform" },
  { value: "Pioneer", label: "I've built products before, now I want to support" },
  { value: "Investor", label: "I am looking to invest in social platforms" },
  { value: "Supporter", label: "I am eager to help out" },
  { value: "Other", label: "None of the above, I am an enigma" },
];

const gatheringGroupOptionsRebuild3: FormFieldOption[] = [
  { value: "", label: "Select your group" },
  { value: "Platform", label: "I am building a platform" },
  { value: "Pioneer", label: "I've built products before, now I want to support" },
  { value: "Investor", label: "I am looking to invest in social platforms" },
  { value: "Media", label: "I am reporting on European social platforms" },
  { value: "Supporter", label: "I am eager to help out" },
  { value: "Other", label: "None of the above, I am an enigma" },
];

// Used only by application-rebuild1
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
        label: "Keep me up to date as...",
        type: "select",
        required: true,
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
      "Thank you for applying! We will review your application and get back to you soon.",
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
      {
        name: "phone",
        label: "Phone number",
        type: "tel",
        placeholder: "+45...",
        helpText: "Optional: In case we need to reach you.",
      },
      {
        name: "website",
        label: "Website or LinkedIn",
        type: "url",
        required: true,
        placeholder: "https://",
        helpText: "Where can people learn more about your work?",
      },
      {
        name: "category",
        label: "Primary category",
        type: "select",
        required: true,
        options: categoryOptions,
        helpText: 'Pick the one you believe fit the most. If in doubt, pick "Other"',
      },
      {
        name: "location",
        label: "Primary location",
        type: "select",
        required: true,
        options: europeanCountryOptions,
      },
      {
        name: "description",
        label: "What are you building?",
        type: "textarea",
        required: true,
        placeholder: "Describe your platform in its essense",
      },
      {
        name: "impact",
        label: "How far are you in your journey?",
        type: "textarea",
        required: true,
        placeholder: "Growth metrics, user numbers, countries you are operating in...",
      },
      {
        name: "stage",
        label: "Project Stage",
        type: "select",
        required: true,
        options: stageOptions,
        helpText: "Pick the one you believe fit the most.",
      },
      {
        name: "team_size",
        label: "Team Size",
        type: "text",
        placeholder: "",
      },
      {
        name: "consent",
        label:
          "I agree to be included in the Rebuild directory and understand that my information can be shared publicly",
        type: "checkbox",
        required: true,
      },
      {
        name: "newsletter",
        label: "I would like to receive newsletter updates from Rebuild (optional)",
        type: "checkbox",
      },
    ],
  },

  "builder-promo": {
    id: "builder-promo",
    title: "Suggest a platform",
    endpoint: "/api/builder-promotion",
    successMessage:
      "Thank you for the recommendation! We will review this builder for inclusion in our directory.",
    fields: [
      {
        name: "builder_name",
        label: "Name",
        type: "text",
        required: true,
        helpText: "The name of the person or platform you want to share with us.",
      },
      {
        name: "builder_website",
        label: "Link to platform",
        type: "url",
        required: true,
        placeholder: "https://",
      },
      {
        name: "why_promote",
        label: "Why should they be in the directory?",
        type: "textarea",
        required: true,
      },
      {
        name: "your_name",
        label: "Your name",
        type: "text",
        placeholder: "Your name",
        helpText: "Optional: So that we can contact you later, if we need more information.",
      },
      {
        name: "your_email",
        label: "Your email",
        type: "email",
        placeholder: "your@email.com",
        helpText: "Optional: So that we can contact you later, if we need more information.",
      },
      {
        name: "your_relationship",
        label: "Your relationship to the suggestion",
        type: "text",
        placeholder: "e.g. Founder, User, Fan",
        helpText: "How do you know of this platform?",
      },
      {
        name: "newsletter_signup",
        label:
          "Yes, I'd like to receive newsletters and updates from Rebuild. I can unsubscribe at any time.",
        type: "checkbox",
      },
    ],
  },

  "gathering-invitation": {
    id: "gathering-invitation",
    title: "Request an invitation",
    endpoint: "/api/gathering-invitation",
    successMessage:
      "Thank you for your interest! We will review your request and get back to you soon.",
    fields: [
      {
        name: "name",
        label: "What is your name?",
        type: "text",
        required: true,
        placeholder: "Your full name",
      },
      {
        name: "email",
        label: "What is your email address?",
        type: "email",
        required: true,
        placeholder: "your@email.com",
      },
      {
        name: "phone",
        label: "And your phone number?",
        type: "tel",
        required: true,
        placeholder: "+45...",
        helpText: "It will help us reach you more easily during the gathering.",
      },
      {
        name: "platform_link",
        label: "Share your Linkedin profile or a link to your portfolio.",
        type: "url",
        required: true,
        placeholder: "https://",
        helpText: "Helps us get to know you better and understand your background and expertise.",
      },
      {
        name: "country",
        label: "Which country are you from?",
        type: "select",
        required: true,
        options: europeanCountryOptions,
      },
      {
        name: "group",
        label: "What do you most identify with?",
        type: "select",
        required: true,
        options: gatheringGroupOptionsRebuild2,
        helpText:
          "This information helps us curate the programme and increase attendee diversity.",
      },
      {
        name: "contribution",
        label: "What would you like to contribute with?",
        type: "textarea",
        required: true,
        helpText:
          "Share your expertise, initiatives or resources you can bring to the gathering that would serve and support European social platforms.",
      },
      {
        name: "consent",
        label:
          "I agree to share my information with the Rebuild team for the purpose of considering my invitation request",
        type: "checkbox",
        required: true,
      },
      {
        name: "newsletter",
        label: "I would like to receive newsletter updates from Rebuild (optional)",
        type: "checkbox",
      },
      {
        name: "form_type",
        label: "",
        type: "text",
        hidden: true,
        value: "gathering_invitation",
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
      "Thank you for your interest! We will review your request and get back to you soon.",
    fields: [
      {
        name: "name",
        label: "What is your name?",
        type: "text",
        required: true,
        placeholder: "Your full name",
      },
      {
        name: "email",
        label: "What is your email address?",
        type: "email",
        required: true,
        placeholder: "your@email.com",
      },
      {
        name: "phone",
        label: "And your phone number?",
        type: "tel",
        required: true,
        placeholder: "+45...",
        helpText: "It will help us reach you more easily during the gathering.",
      },
      {
        name: "platform_link",
        label: "Share your Linkedin profile or a link to your portfolio.",
        type: "url",
        required: true,
        placeholder: "https://",
        helpText: "Helps us get to know you better and understand your background and expertise.",
      },
      {
        name: "country",
        label: "Which country are you from?",
        type: "select",
        required: true,
        options: europeanCountryOptions,
      },
      {
        name: "group",
        label: "What do you most identify with?",
        type: "select",
        required: true,
        options: gatheringGroupOptionsRebuild3,
        helpText:
          "This information helps us curate the programme and increase attendee diversity.",
      },
      {
        name: "contribution",
        label: "What would you like to contribute with?",
        type: "textarea",
        required: true,
        helpText:
          "Share your expertise, initiatives or resources you can bring to the gathering that would serve and support European social platforms.",
      },
      {
        name: "consent",
        label:
          "I agree to share my information with the Rebuild team for the purpose of considering my invitation request",
        type: "checkbox",
        required: true,
      },
      {
        name: "newsletter",
        label: "I would like to receive newsletter updates from Rebuild (optional)",
        type: "checkbox",
      },
      {
        name: "form_type",
        label: "",
        type: "text",
        hidden: true,
        value: "gathering_invitation",
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
