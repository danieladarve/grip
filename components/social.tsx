import Facebook from "@/components/svg/facebook";
import Instagram from "@/components/svg/instagram";
import Linkedin from "@/components/svg/linkedin";
import React from "react";

const Social = ({
  facebook,
  instagram,
  linkedin,
  className,
}: {
  facebook: string;
  instagram: string;
  linkedin: string;
  className?: string;
}) => {
  return (
    <>
      {facebook && (
        <a
          href={facebook}
          target="_blank"
          aria-label="Follow us on Facebook"
          rel="noreferrer"
        >
          <Facebook className={className} />
        </a>
      )}
      {instagram && (
        <a
          href={instagram}
          target="_blank"
          aria-label="Follow us on Instagram"
          rel="noreferrer"
        >
          <Instagram className={className} />
        </a>
      )}
      {linkedin && (
        <a
          href={linkedin}
          target="_blank"
          aria-label="Follow on on LinkedIn"
          rel="noreferrer"
        >
          <Linkedin className={className} />
        </a>
      )}
    </>
  );
};

export default Social;
