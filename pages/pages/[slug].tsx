import Layout from "@/components/layout";
import Link from "next/link";
import { useRouter } from "next/router";
import ErrorPage from "next/error";
import { getAllPagesWithSlug, getPageBySlug } from "@/lib/sanity/client";
import type { Page as PageType, Settings } from "@/lib/sanity/groq";
import SideContact from "@/components/side-contact";
import React, { useEffect } from "react";
import {
  encryptThis,
  transformData,
} from "@/components/form-builder/utils/validator";
import Button from "@/components/button";
import { useGripStore } from "../../store/grip-slice";
import { PortableText } from "@portabletext/react";
import ArrowDown from "@/components/svg/arrow-down";
import { NextSeo } from "next-seo";
import clsx from "clsx";
import MobileBottomNav from "@/components/mobile-bottom-nav";
import BottomMobileMenu from "@/components/bottom-mobile-menu";
import useSetSettings from "@/lib/hooks/useSetSettings";
import StandardPage from "@/components/pages/standard";

const Page = ({ page, settings }: { page: PageType; settings: Settings }) => {
  useSetSettings(settings);

  const { menuOpen } = useGripStore();
  const router = useRouter();

  useEffect(() => {
    const main: HTMLElement = document.querySelector("main");

    if (main) {
      main.classList.toggle("menu-open", menuOpen);
    }
  }, [menuOpen]);

  if (!router.isFallback && !page?.slug) {
    return (
      <>
        <NextSeo
          title={`${settings?.seo?.title} - Page Not Found 404`}
          description={settings?.seo?.description}
        />
        <main className="pages relative h-full min-h-screen w-full overscroll-none bg-grip-coral px-6 pt-28 pb-32 scrollbar-hide md:pr-14 md:pl-16 lg:pb-12 lg:pt-40">
          <h1 className="mb-5">Page not found</h1>
          <Link className="underline" href="/">
            Go back Home
          </Link>
        </main>
      </>
    );
  }

  return (
    <>
      <NextSeo
        title={`${settings?.seo?.title} - ${page?.title}`}
        description={settings?.seo?.description}
        additionalLinkTags={[
          {
            rel: "icon",
            href: "/favicon.ico",
          },
        ]}
        additionalMetaTags={[
          {
            name: "theme-color",
            content: "transparent",
          },
        ]}
      />
      {settings && page && <StandardPage page={page} settings={settings} />}
    </>
  );
};

export default Page;

export async function getStaticProps({ params }) {
  const data = await getPageBySlug(params.slug);

  data.settings.formSettings.recipients = encryptThis(
    data.settings.formSettings.recipients
  );
  const settings =
    { ...data?.settings, formData: transformData(data?.settings.form) } || null;

  return {
    props: {
      page: data?.page || null,
      settings,
    },
    revalidate: 1,
  };
}

export async function getStaticPaths() {
  const allPages = await getAllPagesWithSlug();

  return {
    paths:
      allPages?.map((page) => ({
        params: {
          slug: page,
        },
      })) || [],
    fallback: true,
  };
}
