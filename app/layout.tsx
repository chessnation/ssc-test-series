import "./globals.css";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import {
  AuthProvider,
} from "@/context/AuthContext";

import {
  ThemeProvider,
} from "@/context/ThemeContext";

export const metadata = {
  title: "SSC Master",
  description:
    "SSC CGL & CHSL Test Series",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (

    <html lang="en">

      <body>

        <AuthProvider>

          <ThemeProvider>

            <Navbar />

            {children}

            <Footer />

          </ThemeProvider>

        </AuthProvider>

      <script
  src="https://checkout.razorpay.com/v1/checkout.js"
></script>
      </body>

    </html>

  );

}