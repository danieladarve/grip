import * as yup from "yup";
import type { IConfig } from "@/components/form-builder/types";
import type { FormField } from "@/lib/sanity/groq";
const Cipher = require("basic-cipher");

export function createYupSchema(
  schema: { [key: string]: any },
  config: IConfig
) {
  const { id, validationType, validations = [] } = config;
  // @ts-ignore
  if (!yup[validationType]) {
    return schema;
  }
  // @ts-ignore
  let validator = yup[validationType]();
  validations.forEach(({ params, type }) => {
    if (!validator[type] || !params) {
      return;
    }
    validator = validator[type](...params);
  });
  schema[id] = validator;
  return schema;
}

const toSnakeCase = (str) =>
  str &&
  str
    .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
    .map((x) => x.toLowerCase())
    .join("_");

export function transformData(data: FormField[]) {
  const getValidations = (field, label) => {
    if (field.type === "email") {
      const validations = [
        {
          type: "email",
          params: ["Please enter a valid email!"],
        },
      ];
      if (field.required) {
        validations.push({
          type: "required",
          params: [`${label} is required!`],
        });
      }
      return validations;
    }
    if (field.required) {
      return [
        {
          type: "required",
          params: [`${label} is required!`],
        },
      ];
    }
    return [];
  };

  return data.map((field) => {
    const noSpecialChars = field.label.replace(/([^\w ]|_)/g, "");
    const type = field.type === "email" ? "text" : field.type;

    return {
      id: toSnakeCase(noSpecialChars),
      placeholder: field.label,
      type: type,
      validationType: "string",
      value: "",
      css: field.css,
      width: field.width,
      options:
        field.type === "select" || field.type === "checkbox"
          ? field.options
          : null,
      required: field.required,
      validations: getValidations(field, noSpecialChars),
    };
  });
}

export function encryptThis(data: string) {
  return Cipher.encode(data, process.env.SECURE_AUTH_KEY);
}
