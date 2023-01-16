import { ErrorMessage, Field } from "formik";
import { useState } from "react";
import type { IFormProps } from "@/components/form-builder/types";
import clsx from "clsx";

export const TextField = (props: IFormProps) => {
  const {
    name,
    label,
    id,
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
          id={id}
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
    id,
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
          id={id}
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
    id,
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
          id={id}
          name={name}
          {...rest}
          className="form-control"
        >
          <option value="">{placeholder}</option>
          {options.map((option, index) => (
            <option key={index} value={option?.value}>
              {option?.label || option?.value}
            </option>
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
  const {
    name,
    id,
    label,
    css,
    width,
    options,
    description,
    required,
    ...rest
  } = props;
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
            <Field
              type="radio"
              name={name}
              id={id}
              value={option?.value}
              {...rest}
            />
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
  const {
    name,
    id,
    css,
    width,
    label,
    options,
    description,
    required,
    ...rest
  } = props;
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
            <Field type="checkbox" name={name} id={id} value="true" {...rest} />
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
