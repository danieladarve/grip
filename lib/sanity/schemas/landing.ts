import { defineField, defineType } from "sanity";

export default defineType({
  name: "landing",
  title: "Landing",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
    }),
    defineField({
      name: "subtitle",
      title: "Subtitle",
      type: "string",
    }),
    defineField({
      name: "button",
      title: "Button Text",
      type: "string",
      initialValue: "Be the first to know",
    }),
    defineField({
      name: "cta",
      title: "CTA Text",
      type: "string",
      initialValue: "Be the first to get a Grip? Click here",
    }),
    defineField({
      name: "mainImage",
      title: "Main image",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
  ],
  preview: {
    select: {
      title: "title",
      media: "mainImage",
    },
  },
});
