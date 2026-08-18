export type Dictionary = {
  nav: {
    home: string;
    search_placeholder: string;
    menu: string;
    close: string;
  };
  header: {
    announcement: string;
    track_order: string;
    help: string;
  };
  footer: {
    rights: string;
  };
};

export const dictionaries: Record<"en" | "bn", Dictionary> = {
  en: {
    nav: {
      home: "Home",
      search_placeholder: "Search products",
      menu: "Menu",
      close: "Close",
    },
    header: {
      announcement: "Free delivery inside Dhaka on orders over BDT 1500",
      track_order: "Track Order",
      help: "Help",
    },
    footer: {
      rights: "All rights reserved.",
    },
  },
  bn: {
    nav: {
      home: "হোম",
      search_placeholder: "পণ্য খুঁজুন",
      menu: "মেনু",
      close: "বন্ধ করুন",
    },
    header: {
      announcement: "BDT ১৫০০-এর উপরে ঢাকার মধ্যে অর্ডারে বিনামূল্যে ডেলিভারি",
      track_order: "অর্ডার ট্র্যাক করুন",
      help: "সাহায্য",
    },
    footer: {
      rights: "সর্বস্বত্ব সংরক্ষিত।",
    },
  },
};