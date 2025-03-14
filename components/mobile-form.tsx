import clsx from "clsx";
import { useGripStore } from "../store/grip-slice";
import FormBuilder from "@/components/form-builder";
import React from "react";
import { handleSubmit } from "@/components/side-contact";
import MobileBottomNav from "@/components/mobile-bottom-nav";
import type { SocialLinks } from "@/lib/sanity/groq";

const MobileForm = ({
  isOpen,
  social,
  hasMenu = false,
}: {
  social?: SocialLinks;
  isOpen: boolean;
  hasMenu?: boolean;
}) => {
  const { settings, setMobileFormOpen } = useGripStore();
  if (settings === undefined) {
    return null;
  }
  const { formSettings, formData } = settings || null;
  const handleBottomFrom = () => {
    setMobileFormOpen(false);
  };
  return (
    <div
      className={clsx("mobile-form", {
        active: isOpen,
        "with-menu app-height": hasMenu,
      })}
    >
      <div className="relative">
        {hasMenu && (
          <MobileBottomNav social={social} callback={handleBottomFrom} />
        )}
        <div className="form-container px-2 pt-6 lg:pt-10">
          <FormBuilder
            formData={formData}
            thankYou={formSettings.thankYou}
            formId="thank-you"
            onSubmit={async (values) =>
              handleSubmit(values, { ...formSettings, formId: "thank-you" })
            }
          />
        </div>
        <div className="fixed bottom-0 left-5">
          <svg
            width="142"
            height="86"
            viewBox="0 0 142 86"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M32.194 60.0184C27.6688 60.0184 23.4126 61.1744 19.7082 63.1974C19.3254 61.9768 19.1184 60.695 19.1184 59.3759C19.1184 57.6147 19.4944 55.8876 20.1911 54.293C23.5712 56.6967 27.7171 58.1179 32.1975 58.1179C43.5451 58.1179 52.7749 49.0197 52.7749 37.834C52.7749 26.6483 43.5451 17.5501 32.1975 17.5501C25.2889 17.5501 19.1702 20.9263 15.4348 26.0907C14.7553 25.1353 13.9896 24.231 13.1446 23.398C9.83343 20.1341 5.44961 18.0669 0.80365 17.5739L0 24.9246C2.99383 25.2407 5.70484 26.5225 7.83984 28.6271C10.0404 30.7962 11.389 33.6725 11.6304 36.7291H11.6511C11.6304 37.0962 11.6201 37.4668 11.6201 37.8408C11.6201 41.7983 12.779 45.494 14.776 48.6185C12.7341 51.8281 11.6201 55.5544 11.6201 59.3827C11.6201 62.3372 12.2892 65.2475 13.5343 67.8995C9.08497 72.4791 6.33947 78.684 6.33947 85.511C6.33947 99.5663 17.9389 111 32.1975 111C46.4561 111 58.0555 99.5663 58.0555 85.511C58.0555 71.4558 46.4527 60.0184 32.194 60.0184ZM32.194 24.945C39.4061 24.945 45.2696 30.7282 45.2696 37.834C45.2696 44.9432 39.4027 50.7265 32.194 50.7265C24.9854 50.7265 19.1184 44.9432 19.1184 37.834C19.1184 30.7282 24.9854 24.945 32.194 24.945ZM32.194 103.605C22.0709 103.605 13.8378 95.4864 13.8378 85.511C13.8378 75.5357 22.0743 67.4167 32.194 67.4167C42.3172 67.4167 50.5502 75.5357 50.5502 85.511C50.5502 95.4864 42.3172 103.605 32.194 103.605Z"
              fill="#F4F5F5"
            />
            <path
              d="M64.0145 27.4061V19.7665H56.5127V56.2646H64.0145V45.4019C64.0145 35.3347 72.3234 27.1443 82.5363 27.1443V19.7495C75.2931 19.7495 68.7364 22.6836 64.0145 27.4061Z"
              fill="#F4F5F5"
            />
            <path
              d="M121.423 19.3926C116.459 19.3926 111.903 21.1334 108.347 24.0267V19.7666H100.845V107.301H108.347V55.3297C111.903 58.223 116.463 59.9638 121.423 59.9638C132.77 59.9638 142 50.8656 142 39.6799C142 28.4942 132.77 19.3926 121.423 19.3926ZM121.423 52.569C114.214 52.569 108.347 46.7857 108.347 39.6799C108.347 32.5707 114.214 26.7875 121.423 26.7875C128.631 26.7875 134.498 32.5707 134.498 39.6799C134.502 46.7857 128.635 52.569 121.423 52.569Z"
              fill="#F4F5F5"
            />
            <path
              d="M95.0953 19.7666H87.5938V56.2647H95.0953V19.7666Z"
              fill="#F4F5F5"
            />
            <path
              d="M91.346 11.3995C94.5156 11.3995 97.0851 8.86657 97.0851 5.74204C97.0851 2.61752 94.5156 0.0845947 91.346 0.0845947C88.1764 0.0845947 85.6069 2.61752 85.6069 5.74204C85.6069 8.86657 88.1764 11.3995 91.346 11.3995Z"
              fill="#F4F5F5"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default MobileForm;
