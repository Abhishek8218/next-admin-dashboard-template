"use client";

import { useState, useEffect, useRef } from "react";
import {
  ChevronDown,
  IdCard,
  LucideReceiptIndianRupee,
  Settings,
  Component,
  UsersRound,
  MapPinHouse,
  CirclePlus,
  MapPinned,
  IndianRupee,
  CircleX,
  BookCheck,
  ReceiptIndianRupee,
  ChartNoAxesCombined,
  FileText,
  Fingerprint,
  HandCoins,
  TableOfContents,
  Menu,
  X,
} from "lucide-react";
import Link from "next/link";
import { QuickAccess } from "../quick-access";
import { Menus } from "../menus";

export const Sidebar = () => {
  const [quickAccess, setQuickAccess] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setQuickAccess(false);
      }
    };

    if (quickAccess) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [quickAccess]);

  // Close mobile menu on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node)
      ) {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  const toggleQuickAccess = () => {
    setQuickAccess((prev) => !prev);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };




  const QuickAccessMenuGroup = [
    {
      name: "GENERAL",
      data: [
        {
          name: "Repayment",
          icon: LucideReceiptIndianRupee,
          path: "string",
        },
        {
          name: "KYC (Know Your Customer)",
          icon: IdCard,
          path: "/kyc",
        },
      ],
    },
    {
      name: "Joint Liability Group",
      data: [
        {
          name: "New Center",
          icon: MapPinHouse,
          path: "string",
        },
        {
          name: "New Group",
          icon: Component,
          path: "/kyc",
        },
        {
          name: "New Member",
          icon: UsersRound,
          path: "/kyc",
        },
      ],
    },
    {
      name: "Other Loan",
      data: [
        {
          name: "New PL",
          icon: CirclePlus,
          path: "string",
        },
        {
          name: "New VL",
          icon: CirclePlus,
          path: "/kyc",
        },
      ],
    },
    {
      name: "Payment",
      data: [
        {
          name: "Collections",
          icon: IndianRupee,
          path: "string",
        },
      ],
    },
    {
      name: "Other",
      data: [
        {
          name: "Village",
          icon: MapPinned,
          path: "/app/village/entry/create",
        },
        {
          name: "Loan Closer",
          icon: CircleX,
          path: "/kyc",
        },
        {
          name: "Leads",
          icon: BookCheck,
          path: "/kyc",
        },
      ],
    },
  ];
  const MenusGroup = [
    {
      title: "LOANS",
      menus: [
        {
          name: "Joint Liability Group",
          icon: HandCoins,
          path: "/app/loan/jlg",
        },
        {
          name: "Other Loan",
          icon: TableOfContents,
          path: "/loans",
        },
      ],
    },
    {
      title: "PAYMENTS",
      menus: [
        {
          name: "Repayment",
          icon: ReceiptIndianRupee,
          path: "/",
        },
        {
          name: "Collections",
          icon: ReceiptIndianRupee,
          path: "/",
        },
      ],
    },

    {
      title: "STATISTICS",
      menus: [
        {
          name: "Reports",
          icon: FileText,
          path: "/",
        },
        {
          name: "Analytics",
          icon: ChartNoAxesCombined,
          path: "/",
        },
      ],
    },
    {
      title: "OTHER APPS",
      menus: [
        {
          name: "HRMS",
          icon: FileText,
          path: "/",
        },
        {
          name: "IAM",
          icon: Fingerprint,
          path: "/",
        },
      ],
    },
  ];

  return (
    <>
      {/* Mobile menu button */}
      <button
        className="fixed top-2 left-4 z-50 md:hidden"
        onClick={toggleMobileMenu}
      >
        {isMobileMenuOpen ? (
          <X size={28} className="text-white absolute left-[12rem]  top-4 font-extrabold" />
        ) : (
          <Menu size={28} className="text-black  font-bold" />
        )}
      </button>

      {/* Sidebar */}
      <aside
        ref={sidebarRef}
        className={`select-none  h-full bg-[#0c1526] w-[250px] flex flex-col shadow-lg fixed left-0 top-0 z-40 transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        {/* Header Section */}
        <div className="sticky top-0 w-full p-3">
          <div className="w-full rounded-xl">
            <div className="cursor-pointer hover:bg-[#2b386a] w-full h-fit rounded-md py-1 px-2 flex flex-row items-center justify-between gap-2">
              <div className="w-full flex flex-row h-fit items-center justify-between gap-2">
                <p className="font-medium text-xl flex flex-row items-center justify-center size-8 bg-orange-700 text-white rounded-md">
                  S
                </p>
                <div className="flex-1 h-fit">
                  <p className="text-gray-300 text-[16px] font-normal">
                    Sikar Branch
                  </p>
                  <p className="text-gray-200 font-normal text-[12px]">
                    Sourav
                  </p>
                </div>
              </div>
              {/* <Settings size={20} color="#ffffff" strokeWidth={1.25} /> */}
            </div>
          </div>

          <div className="mt-2 w-full h-fit">
            {/* Create Button */}
            <div className="relative group w-full h-full" ref={dropdownRef}>
              <div
                onClick={toggleQuickAccess}
                className="cursor-pointer group-hover:bg-sky-300 pl-4 flex flex-row items-center justify-between rounded-md w-full bg-sky-100 h-[30px]"
              >
                <div className="flex flex-row w-full items-center justify-center gap-1 h-fit">
                  <p className="font-medium text-sm">Quick Access</p>
                </div>
                <div className="flex flex-row items-center justify-center w-fit px-2 h-full rounded-r-md">
                  <ChevronDown size={20} strokeWidth={2} />
                </div>
              </div>

              {/* Dropdown Section */}
              {quickAccess && (
                <div className="z-[9999] scrollbar absolute left-0 top-full mt-2 w-full bg-white rounded-md shadow-lg overflow-y-auto h-[calc(100vh-188px)]">
                  {QuickAccessMenuGroup.map((value, index) => (
                    <QuickAccess
                      key={index}
                      name={value.name}
                      data={value.data.map((item) => ({
                        name: item.name,
                        icon: (
                          <item.icon
                            size={19}
                            color="#4b5563"
                            strokeWidth={1.5}
                          />
                        ),
                        path: item.path,
                      }))}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar Menu */}
        <div className="flex-1 overflow-auto scrollbar px-2">
          {MenusGroup &&
            MenusGroup.map((group, index) => (
              <div key={index} className="mb-4">
                <p className="pl-2 text-gray-400 text-[11px] font-medium">
                  {group.title}
                </p>
                {group.menus.map((menu, idx) => (
                  <Menus
                    key={idx}
                    name={menu.name}
                    path={menu.path}
                    icon={menu.icon}
                  />
                ))}
              </div>
            ))}
        </div>

        {/* Footer Section */}
        <Link
          href={"#"}
          className="sticky bottom-0 w-full h-fit p-2 bg-[#1d2646] rounded-b-xl"
        >
          <div className="flex flex-row w-full gap-2 h-fit hover:bg-[#0c1526] text-gray-400 justify-start items-center px-2 rounded-xl py-2">
            <Settings size={17} color="#9ca3af" strokeWidth={1.5} />
            <p className="text-sm font-normal">Settings</p>
          </div>
        </Link>
      </aside>
    </>
  );
};
