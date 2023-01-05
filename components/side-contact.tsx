"use client";

import React from "react";
import type {
  FormSettings,
  Page,
  SideContact as Side,
  SocialLinks,
} from "@/lib/sanity/groq";
import { PortableText } from "@portabletext/react";
import { useGripStore } from "../store/grip-slice";
import clsx from "clsx";
import Button from "@/components/button";
import Shapes from "@/components/svg/shapes";
import Logo from "@/components/svg/logo";
import FormBuilder from "@/components/form-builder";
import Close from "@/components/svg/close";
import type { IFormData } from "@/components/form-builder/types";
import Social from "@/components/social";
import Link from "next/link";

export interface SideContactProps extends Side {
  social: SocialLinks;
  formItems?: IFormData[];
  formSettings?: FormSettings;

  footer?: Page[];
}

export const handleSubmit = async (values, formSettings) => {
  return await fetch("/api/form", {
    method: "POST",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ...values, settings: formSettings }),
  })
    .then((res) => res.json())
    .then((res) => res);
};

const SideContact = ({
  social,
  title,
  body,
  tryGripBeta,
  cta,
  formItems,
  formSettings,
  footer,
}: SideContactProps) => {
  const { menuOpen, setMenuOpen, setMobileFormOpen } = useGripStore();
  const { facebook, linkedin, instagram } = social;

  return (
    <>
      <section
        className={clsx(
          "side-contact fixed top-0 bottom-0 right-0 z-[80] bg-grip-midnight text-white",
          { open: menuOpen }
        )}
      >
        <div className="relative flex h-full w-full items-center pl-16 pr-12 xl:pl-28 xl:pr-14">
          <div className="absolute left-0 top-0 right-0 z-50 flex items-center justify-between pt-10 md:pl-16 md:pr-12 xl:pl-28 xl:pr-14">
            <div className="flex gap-x-4">
              <Social
                facebook={facebook}
                instagram={instagram}
                linkedin={linkedin}
                className="fill-grip-azure"
              />
            </div>

            <div className="actions">
              <Button
                onClick={() => window.open(tryGripBeta + `?subject=`)}
                variant="primary"
              >
                Try Grip Beta
              </Button>
              <a className="mt-4" onClick={() => setMenuOpen()}>
                <Close />
              </a>
            </div>
          </div>

          <div className="z-40 w-full">
            <div className="flex flex-wrap">
              <div className="w-5/12">
                <div className="content">
                  <h3 className="mb-6">{title}</h3>
                  <div className="mb-3">
                    <PortableText value={body} />
                  </div>
                  {cta && (
                    <Button
                      onClick={() => setMenuOpen()}
                      variant="cta"
                      className="dark mb-10"
                      icon="arrow-right"
                    >
                      {cta}
                    </Button>
                  )}
                </div>
              </div>
              <div className="w-7/12">
                <div className="form-container xl:pl-22 pl-12 xl:pr-14">
                  <FormBuilder
                    formData={formItems}
                    thankYou={formSettings.thankYou}
                    onSubmit={async (values) =>
                      handleSubmit(values, formSettings)
                    }
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="absolute right-0 bottom-0 w-full">
            <Shapes className="shapes absolute right-0 bottom-0 z-10 block " />
            <div className="logo-container absolute bottom-0 z-20 block w-full ">
              <Logo className="block w-full " />
            </div>
          </div>
          {footer && footer.length && (
            <div
              className={clsx(
                "absolute right-0 bottom-[2.5%] z-[100] w-7/12 pl-10 transition-opacity lg:pl-20  xl:pl-24",
                menuOpen ? "opacity-100 delay-700" : "opacity-0 delay-[50ms]"
              )}
            >
              <ul className="flex gap-x-8 text-sm text-grip-azure xl:pl-1">
                {footer.map((item, idx) => (
                  <li key={idx}>
                    <Link
                      className="cursor-pointer underline"
                      href={`/pages/${item.slug}`}
                      onClick={() => {
                        setMobileFormOpen(false);
                        setMenuOpen();
                      }}
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </section>
      <div
        className={clsx(
          "overlay fixed inset-0 z-[70] hidden bg-grip-midnight/40 lg:block",
          {
            open: menuOpen,
          }
        )}
        onClick={() => setMenuOpen()}
      ></div>
    </>
  );
};

export default SideContact;
