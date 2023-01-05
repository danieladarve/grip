// @ts-nocheck

import { CogIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export default defineType({
  name: "settings",
  title: "Settings",
  type: "document",
  icon: CogIcon,
  // Uncomment below to have edits publish automatically as you type
  // liveEdit: true,
  groups: [
    {
      name: "page",
      title: "Page Configuration",
    },
    {
      name: "social",
      title: "Social",
    },
    {
      name: "side",
      title: "Side Menu",
      default: true,
    },
    {
      name: "form",
      title: "Contact Form",
    },
    {
      name: "seo",
      title: "SEO",
    },
    {
      name: "footer",
      title: "Footer",
    },
  ],
  fields: [
    defineField({
      title: "Footer Items",
      name: "footer",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "page" }],
        },
      ],
      group: "footer",
    }),
    defineField({
      title: "Landing",
      name: "landing",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "landing" }],
        },
      ],
      group: "page",
      validation: (Rule) => {
        return Rule.required().max(1).min(1);
      },
    }),
    defineField({
      title: "Sections",
      name: "sections",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "post" }],
        },
      ],
      group: "page",
    }),
    defineField({
      name: "tryGripBeta",
      title: "Try Grip Beta Email",
      type: "url",
      group: "side",
      description: "mailto:getintouch@gripinsights.com.au",
      validation: (Rule) =>
        Rule.required().uri({
          scheme: ["mailto"],
        }),
    }),
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      group: "side",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "body",
      type: "array",
      title: "Content",
      group: "side",
      of: [
        {
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "H1", value: "h1" },
            { title: "H2", value: "h2" },
            { title: "H3", value: "h3" },
            { title: "H4", value: "h4" },
            { title: "H5", value: "h5" },
            { title: "H6", value: "h6" },
            { title: "Quote", value: "blockquote" },
          ],
        },
      ],
    }),
    defineField({
      name: "cta",
      title: "CTA Text",
      type: "string",
      initialValue: "Subscribe, click click",
      group: "side",
    }),
    defineField({
      name: "formSubject",
      title: "Form Subject",
      type: "string",
      initialValue: "Contact from grip",
      group: "form",
    }),
    defineField({
      name: "formRecipients",
      title: "Form Recipients",
      type: "string",
      initialValue: "getintouch@gripinsights.com.au",
      description: "separate emails using a comma",
      group: "form",
    }),
    defineField({
      title: "Form Fields",
      type: "array",
      name: "form",
      group: "form",
      of: [
        {
          title: "Field",
          name: "field",
          type: "object",
          fields: [
            {
              title: "Type",
              name: "type",
              type: "string",
              options: {
                list: [
                  { title: "Text", value: "text" },
                  { title: "Email", value: "email" },
                  { title: "Checkbox", value: "checkbox" },
                  { title: "Select", value: "select" },
                ],
                layout: "radio",
              },
              validation: (Rule) => Rule.required(),
              initialValue: "text",
            },
            {
              title: "Field Options",
              name: "dropdownOptions",
              type: "array",
              hidden: ({ parent, value }) =>
                !value &&
                parent?.type !== "select" &&
                parent?.type !== "checkbox",
              of: [
                {
                  title: "Option",
                  type: "object",
                  fields: [
                    {
                      title: "Title",
                      name: "title",
                      type: "string",
                    },
                  ],
                },
              ],
            },
            {
              title: "Label",
              name: "label",
              type: "string",
              validation: (Rule) => [Rule.required()],
            },
            {
              title: "Required?",
              name: "isRequired",
              type: "string",
              options: {
                list: [
                  { title: "Yes", value: "true" },
                  { title: "No", value: "false" },
                ],
                layout: "radio",
              },
              validation: (Rule) => Rule.required(),
              initialValue: "text",
            },
            {
              title: "Width",
              name: "width",
              type: "string",
              options: {
                list: [
                  { title: "100%", value: "w-full" },
                  { title: "50%", value: "w-full md:w-1/2" },
                ],
              },
              initialValue: "w-full",
            },
            {
              title: "CSS",
              name: "css",
              type: "string",
            },
          ],
        },
      ],
    }),
    defineField({
      name: "thankYou",
      type: "array",
      title: "Thank You Message",
      group: "form",
      of: [
        {
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "H1", value: "h1" },
            { title: "H2", value: "h2" },
            { title: "H3", value: "h3" },
          ],
        },
      ],
    }),
    defineField({
      name: "instagram",
      title: "Instagram",
      type: "url",
      group: "social",
      validation: (Rule) =>
        Rule.uri({
          scheme: ["http", "https"],
        }),
    }),
    defineField({
      name: "facebook",
      title: "Facebook",
      type: "url",
      group: "social",
      validation: (Rule) =>
        Rule.uri({
          scheme: ["http", "https"],
        }),
    }),
    defineField({
      name: "linkedin",
      title: "LinkedIn",
      type: "url",
      group: "social",
      validation: (Rule) =>
        Rule.uri({
          scheme: ["http", "https"],
        }),
    }),
    defineField({
      name: "websiteTitle",
      title: "Website Title",
      type: "string",
      group: "seo",
    }),
    defineField({
      name: "websiteDescription",
      title: "Website Description",
      type: "string",
      group: "seo",
      validation: (Rule) => Rule.max(160),
    }),
    defineField({
      name: "websiteKeywords",
      title: "Website Keywords",
      type: "string",
      group: "seo",
    }),
    defineField({
      name: "ogImage",
      title: "Open Graph Image",
      type: "image",
      description: "Displayed on social cards and search engine results.",
      group: "seo",
      options: {
        hotspot: true,
      },
    }),
  ],
  preview: {
    prepare() {
      return {
        title: "Menu Items",
      };
    },
  },
});
