import { groq } from "next-sanity";
import type { IFormData } from "../../components/form-builder/types";

export interface Post {
  _id?: string;
  title?: any[] | string;
  body?: any[];
  cta?: string;
  mainImage?: any;
  variant?: string;
  menuTitle?: string;
}

export interface FormField {
  css?: string;
  label?: string;
  type?: string;
  width?: string;
  options?: FormFieldOptions[];

  required?: boolean;
}

interface FormFieldOptions {
  value?: string;
}

export interface SocialLinks {
  facebook?: string;
  instagram?: string;
  linkedin?: string;
}

export interface Section {
  _id: string;
  type?: string;
  title?: any[] | string;
  subtitle?: string;
  body?: any[];
  cta?: string;
  button?: string;
  mainImage?: any;
  variant?: string;
  menuTitle?: string;
}

export interface SideContact {
  body?: any[];
  cta?: string;
  title: string;
  tryGripBeta: string;
}

export interface FormSettings {
  subject?: string;
  recipients?: string;
  thankYou?: any[] | string;
}

export interface Page {
  _id: string;
  excerpt?: any[] | string;
  body?: any[] | string;
  title?: string;
  slug: string;
}

export type FooterItem = Page;

export interface Settings {
  landing?: Section;
  sections?: Section[];
  side: SideContact;
  seo: {
    description?: string;
    keywords?: string;
    title?: string;
    ogImage?: {
      title?: string;
    };
  };
  social: SocialLinks;
  form: FormField[];
  formSettings?: FormSettings;
  formData?: IFormData[];

  footer?: FooterItem[];
}

export interface Landing {
  _id?: string;
  title?: string;
  subtitle?: string;
  button?: string;
  cta?: string;
  mainImage?: any;
}

const postfields = groq`
  _id,
  title,
  body,
  cta,
  mainImage,
  variant
`;

export const postquery = groq`
*[_type == "post"] | order(date desc, _updatedAt desc) {
  ${postfields}
}`;

export const pagePaths = groq`
*[_type == "page" && defined(slug.current)][].slug.current
`;

export const landingQuery = groq`
*[_type == "landing"][0] {
  title,
  subtitle,
  button,
  cta,
  mainImage
}`;

const settingsFields = `
  footer[]-> {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    body,
  },
  form[] {
    type,
    label,
    width,
    "options": dropdownOptions[] {
      "value": title
    },
    css,
    isRequired == 'true' => {
      "required": true
    },
    isRequired == 'false' => {
      "required": false
    }
  },
  "formSettings": {
    "subject": formSubject,
    "recipients": formRecipients,
    "thankYou": thankYou,
  },
  "side": {
    tryGripBeta,
    title,
    body,
    cta
  },
  "social": {
    facebook,
    instagram,
    linkedin  
  },
  "seo": {
    "title": websiteTitle,
    "description": websiteDescription,
    "keywords": websiteKeywords
  }
`;

export const singlePage = groq`{
  "page":*[_type == "page" && slug.current == $slug] | order(_updatedAt desc) [0] {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    body
  },
  "settings":*[_type == "settings"][0] {
    ${settingsFields}
  }
}`;

export const settingsQuery = groq`
*[_type == "settings"][0] {
  landing[0]-> {
    "_id": _id,
    title,
    subtitle,
    button,
    cta,
    mainImage,
  },
  sections[]-> {
    _id,
    "type": _type,
    title,
    body,
    button,
    cta,
    "mainImage": mainImage.asset->url,
    variant,
    menuTitle
  },
  ${settingsFields}
}`;
