import { ErrorMessage, Field, Formik, Form as FormikForm } from "formik";
import { useState } from "react";
import type { IFormProps } from "@/components/form-builder/types";
import clsx from "clsx";

export const Form = (props: any) => {
  console.log(props);
  return (
    <Formik {...props}>
      <FormikForm noValidate>{props.children}</FormikForm>
    </Formik>
  );
};

export const TextField = (props: IFormProps) => {
  const {
    name,
    label,
    css,
    width,
    placeholder,
    description,
    required,
    ...rest
  } = props;

  const [showHidePassword, changeShowHidePassword] = useState(false);
  return (
    <div className={clsx(width, css, `form-control-text`)}>
      {/*{label && (*/}
      {/*  <div className="form-title">*/}
      {/*    <label htmlFor={name}>{label}</label>*/}
      {/*    {required && <span>*</span>}*/}
      {/*  </div>*/}
      {/*)}*/}
      {/*{description && <i>{description}</i>}*/}
      <div className="form-item">
        <Field
          className="form-control-text"
          type={!showHidePassword && name === "password" ? "password" : "text"}
          name={name}
          id={name}
          placeholder={placeholder || ""}
          autoComplete="off"
          {...rest}
        />
        {name === "password" && (
          <i
            className="form-password"
            onClick={() => changeShowHidePassword(!showHidePassword)}
          ></i>
        )}
      </div>

      <ErrorMessage
        name={name}
        render={(err) => <div className="form-error">{err}</div>}
      />
    </div>
  );
};

export const TextAreaField = (props: IFormProps) => {
  const {
    name,
    label,
    width,
    css,
    placeholder,
    description,
    required,
    ...rest
  } = props;
  return (
    <div className={clsx(width, css, `form-control-textarea`)}>
      {/*{label && (*/}
      {/*  <div className="form-title">*/}
      {/*    <label htmlFor={name}>{label}</label>*/}
      {/*    {required && <span>*</span>}*/}
      {/*  </div>*/}
      {/*)}*/}
      {/*{description && <i>{description}</i>}*/}
      <div className="form-item">
        <Field
          className="form-control"
          as="textarea"
          name={name}
          id={name}
          placeholder={placeholder || ""}
          autoComplete="off"
          {...rest}
        />
      </div>
      <ErrorMessage
        name={name}
        render={(err) => <div className="form-error">{err}</div>}
      />
    </div>
  );
};

export const SelectField = (props: IFormProps) => {
  const {
    name,
    label,
    css,
    width,
    options,
    placeholder,
    description,
    required,
    ...rest
  } = props;

  return (
    <div className={clsx(width, css, `form-control-select`)}>
      {/*{label && (*/}
      {/*  <div className="form-title">*/}
      {/*    <label htmlFor={name}>{label}</label>*/}
      {/*    {required && <span>*</span>}*/}
      {/*  </div>*/}
      {/*)}*/}
      {/*{description && <i>{description}</i>}*/}
      <div className="form-item">
        <Field
          as="select"
          id={name}
          name={name}
          {...rest}
          className="form-control"
        >
          <option value="">{placeholder}</option>
          {options.map((option, index) => (
            <option
              key={index}
              value={option?.value}
              label={option?.label || option?.value}
            />
          ))}
        </Field>
      </div>
      <ErrorMessage
        name={name}
        render={(err) => <div className="form-error">{err}</div>}
      />
    </div>
  );
};

export const RadioField = (props: IFormProps) => {
  const { name, label, css, width, options, description, required, ...rest } =
    props;
  return (
    <div className={clsx(width, css, `form-control-radio`)}>
      {/*{label && (*/}
      {/*  <div className="form-title">*/}
      {/*    <label htmlFor={name}>{label}</label>*/}
      {/*    {required && <span>*</span>}*/}
      {/*  </div>*/}
      {/*)}*/}
      {/*{description && <i>{description}</i>}*/}
      <div className="form-item">
        {options.map((option, index) => (
          <label key={index}>
            <Field type="radio" name={name} value={option?.value} {...rest} />
            {option?.label || option?.value}
          </label>
        ))}
      </div>
      <ErrorMessage
        name={name}
        render={(err) => <div className="form-error">{err}</div>}
      />
    </div>
  );
};

export const CheckBoxField = (props: IFormProps) => {
  const { name, css, width, label, options, description, required, ...rest } =
    props;
  return (
    <div className={clsx(width, css, `form-control-checkbox`)}>
      {/*{label && (*/}
      {/*  <div className="form-title">*/}
      {/*    <label htmlFor={name}>{label}</label>*/}
      {/*    {required && <span>*</span>}*/}
      {/*  </div>*/}
      {/*)}*/}
      {/*{description && <i>{description}</i>}*/}
      <div className="form-item">
        {options.map((option, index) => (
          <label key={index}>
            <Field type="checkbox" name={name} value="true" {...rest} />
            <span>{option?.value}</span>
          </label>
        ))}
      </div>
      <ErrorMessage
        name={name}
        render={(err) => <div className="form-error">{err}</div>}
      />
    </div>
  );
};
