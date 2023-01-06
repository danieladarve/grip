import type { ChangeEvent } from "react";
import React, { useCallback, useState } from "react";
import * as yup from "yup";
import type {
  IAppProps,
  IFieldMap,
  IFormData,
} from "@/components/form-builder/types";
import { createYupSchema } from "@/components/form-builder/utils/validator";
import {
  CheckBoxField,
  RadioField,
  SelectField,
  TextAreaField,
  TextField,
} from "@/components/form-builder/fields/form-fields";
import Button from "@/components/button";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { Form, Formik } from "formik";
import { PortableText } from "@portabletext/react";

const fieldMap: IFieldMap = {
  text: TextField,
  select: SelectField,
  textarea: TextAreaField,
  radio: RadioField,
  checkbox: CheckBoxField,
};

const FormBuilder: React.FC<
  IAppProps & { thankYou?: any[] | string; formId?: string }
> = ({ formData, buttonProp, onSubmit, thankYou, formId }) => {
  const [showThankYou, setShowThankYou] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { executeRecaptcha } = useGoogleReCaptcha();
  const initialValues: any = {};

  formData.forEach((item: IFormData) => {
    initialValues[item?.id!] = item?.value || "";
  });
  const [values, setValue] = useState<any>(initialValues);

  const resetState = (message = "") => {
    setShowThankYou(false);
    setErrorMessage(message);
    setValue(initialValues);
  };
  const _onSubmit = async (values: {}, actions) => {
    const token = await handleReCaptchaVerify();
    const result = await onSubmit({ ...values, token: token });

    if (result.status === "success") {
      setShowThankYou(true);
      setErrorMessage("");
    } else {
      resetState(result.message);
    }
    actions.resetForm();
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement & HTMLSelectElement>
  ) => {
    const id = e?.target?.name;
    const val = e?.target?.value;
    setValue({
      ...values,
      [id]: val,
    });
  };

  const handleCheckItem = (e: ChangeEvent<HTMLInputElement>) => {
    const id = e?.target?.name;
    const val = e?.target?.value;
    let idList = [];
    if (!values[id]) {
      idList.push(val);
      setValue({
        ...values,
        [id]: Array.from(idList).toString(),
      });
    } else if (values[id]) {
      debugger;
      idList = values[id].split(",");
      if (!idList.includes(val)) {
        debugger;
        idList.push(val);
        setValue({
          ...values,
          [id]: Array.from(idList).toString(),
        });
      } else {
        debugger;
        const index = idList.indexOf(val);
        if (index > -1) {
          idList.splice(index, 1);
        }
        setValue({
          ...values,
          [id]: Array.from(idList).toString(),
        });
      }
    }
  };

  const yupSchema = formData.reduce(createYupSchema, {});

  const validateSchema = yup.object().shape(yupSchema);

  const handleReCaptchaVerify = useCallback(async () => {
    if (!executeRecaptcha) {
      return;
    }

    return await executeRecaptcha();
    // Do whatever you want with the token
  }, [executeRecaptcha]);

  return (
    <Formik
      initialValues={values}
      enableReinitialize={true}
      validateOnChange={false}
      validateOnBlur={false}
      validationSchema={validateSchema}
      onSubmit={(values, actions) => _onSubmit(values, actions)}
    >
      {(props) => (
        <Form autoComplete="off">
          {formData.map(
            (item: IFormData, index: React.Key | null | undefined) => {
              const FormField = fieldMap[item?.type!];
              if (!item?.type) {
                return null;
              }
              return (
                <FormField
                  key={index}
                  name={item?.id}
                  id={`${formId}--${item?.id}`}
                  label={item?.label}
                  css={item?.css}
                  width={item?.width}
                  placeholder={item?.placeholder}
                  description={item?.description}
                  onChange={
                    item?.type === "checkbox" ? handleCheckItem : handleChange
                  }
                  options={item?.options}
                  checked={values[item?.id!]?.value}
                  required={item?.required}
                />
              );
            }
          )}

          {showThankYou === false && (
            <div className="submit-btn-container">
              <Button
                variant="primary"
                type="submit"
                disabled={props.isSubmitting}
                aria-disabled={props.isSubmitting}
              >
                {buttonProp ? buttonProp?.buttonTitle : "Submit"}
              </Button>
            </div>
          )}
          <div
            onClick={() => resetState("")}
            className="mt-5 w-full cursor-pointer px-4 text-grip-azure"
          >
            {showThankYou && thankYou && <PortableText value={thankYou} />}
            {!showThankYou && errorMessage.length > 0 && (
              <p className="underline">{errorMessage}</p>
            )}
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default FormBuilder;
