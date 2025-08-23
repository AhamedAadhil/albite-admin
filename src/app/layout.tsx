import logoDark from "@/assets/images/logo-dark.png";
import AppProvidersWrapper from "@/components/wrappers/AppProvidersWrapper";
import Image from "next/image";
import { DEFAULT_PAGE_TITLE } from "@/context/constants";
import { Metadata } from "next";
import "@/assets/scss/app.scss";
import "@/assets/scss/icons.scss";

export const metadata: Metadata = {
  title: {
    template: "%s | Albite Cloud Kitchen",
    default: DEFAULT_PAGE_TITLE,
  },
  description:
    "Albite Cloud Kitchen - Your favorite meals delivered fresh and fast. Explore our menu, order online, and enjoy delicious food from the comfort of your home.",
};

const splashScreenStyles = `
#splash-screen {
  position: fixed;
  top: 50%;
  left: 50%;
  background: white;
  display: flex;
  height: 100%;
  width: 100%;
  transform: translate(-50%, -50%);
  align-items: center;
  justify-content: center;
  z-index: 9999;
  opacity: 1;
  transition: all 15s linear;
  overflow: hidden;
}

#splash-screen.remove {
  animation: fadeout 0.7s forwards;
  z-index: 0;
}

@keyframes fadeout {
  to {
    opacity: 0;
    visibility: hidden;
  }
}
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <style suppressHydrationWarning>{splashScreenStyles}</style>
      </head>
      <body className={``}>
        <div id="splash-screen">
          <Image
            alt="Logo"
            width={112}
            height={24}
            src={logoDark}
            style={{ height: "7%", width: "auto" }}
            priority
          />
        </div>
        <div id="__next_splash">
          <AppProvidersWrapper>{children}</AppProvidersWrapper>
        </div>
      </body>
    </html>
  );
}
