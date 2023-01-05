// @ts-nocheck

import { defineField, defineType } from "sanity";

export default defineType({
  name: "post",
  title: "Sections",
  type: "document",
  fields: [
    defineField({
      name: "title",
      type: "array",
      title: "Title",
      of: [
        {
          type: "block",
          styles: [{ title: "H2", value: "h2" }],
        },
      ],
    }),
    defineField({
      name: "body",
      type: "array",
      title: "Content",
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
      title: "CTA Text",
      name: "cta",
      type: "string",
      initialValue: "Be the first to get a Grip",
    }),
    defineField({
      name: "mainImage",
      title: "Main image",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      title: "Variant",
      name: "variant",
      type: "string",
      options: {
        list: [
          { title: "Power Blue", value: "power-blue" },
          { title: "Yellow", value: "yellow" },
          { title: "Black Haze", value: "black-haze" },
          { title: "Coral", value: "coral" },
        ],
      },
      initialValue: "w-full",
    }),
    defineField({
      name: "menuTitle",
      type: "string",
      title: "Menu Title",
    }),
  ],

  preview: {
    select: {
      title: "title",
      media: "mainImage",
    },
  },
});
