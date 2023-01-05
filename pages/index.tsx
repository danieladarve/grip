import Head from "next/head";
import Layout from "@/components/layout";
import HomePage from "@/components/pages/home";
import { getSettings } from "@/lib/sanity/client";
import type { Settings } from "@/lib/sanity/groq";
import {
  encryptThis,
  transformData,
} from "@/components/form-builder/utils/validator";
import { NextSeo } from "next-seo";
import useSetSettings from "@/lib/hooks/useSetSettings";

const Index = ({ settings }: { settings: Settings }) => {
  useSetSettings(settings);

  return (
    <Layout>
      <NextSeo
        title={`${settings?.seo?.title} - Home`}
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
      {settings && <HomePage settings={settings} />}
    </Layout>
  );
};

export async function getServerSideProps() {
  const settings = await getSettings();
  settings.formSettings.recipients = encryptThis(
    settings.formSettings.recipients
  );
  return {
    props: {
      settings: { ...settings, formData: transformData(settings.form) },
    },
  };
}

export default Index;
