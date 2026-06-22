import { auth } from "@/lib/auth";
import {
  FaHome,
  FaUser,
  FaCalendarAlt,
  FaHeart,
  FaPlus,
  FaBookOpen,
  FaCommentDots,
  FaThLarge,
  FaUsers,
  FaUserCheck,
  FaShieldAlt,
  FaCreditCard,
  FaFlag,
} from "react-icons/fa";

import { Button, Drawer } from "@heroui/react";
import { headers } from "next/headers";
import Image from "next/image";
import { Bars } from "@gravity-ui/icons";
import Link from "next/link";

export default async function DashboardSidebar() {

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const user = session?.user;

  const dashboardItems = {
    user: [
      {
        icon: FaHome,
        label: "Overview",
        link: "/dashboard/user",
      },
      {
        icon: FaCalendarAlt,
        label: "Booked Classes",
        link: "/dashboard/user/booked-classes",
      },
      {
        icon: FaUserCheck,
        label: "Apply as Trainer",
        link: "/dashboard/user/apply-trainer",
      },
      {
        icon: FaHeart,
        label: "Favorite Classes",
        link: "/dashboard/user/favorite-classes",
      },
      
    ],

    trainer: [
      {
        icon: FaHome,
        label: "Overview",
        link: "/dashboard/trainer",
      },
      {
        icon: FaPlus,
        label: "Add Class",
        link: "/dashboard/trainer/add-class",
      },
      {
        icon: FaBookOpen,
        label: "My Classes",
        link: "/dashboard/trainer/my-classes",
      },
      {
        icon: FaCommentDots,
        label: "Add Forum Post",
        link: "/dashboard/trainer/add-forum-post",
      },
      {
        icon: FaThLarge,
        label: "My Forum Posts",
        link: "/dashboard/trainer/my-forum-post",
      }
    ],

    admin: [
      {
        icon: FaHome,
        label: "Overview",
        link: "/dashboard/admin",
      },
      {
        icon: FaUsers,
        label: "Manage Users",
        link: "/dashboard/admin/manage-users",
      },
      {
        icon: FaUserCheck,
        label: "Trainers Applications",
        link: "/dashboard/admin/trainer-applications",
      },
      {
        icon: FaShieldAlt,
        label: "Manage Trainers",
        link: "/dashboard/admin/manage-trainers",
      },
      {
        icon: FaBookOpen,
        label: "Manage Classes",
        link: "/dashboard/admin/maange-classes",
      },
      {
        icon: FaCommentDots,
        label: "Add Forum Post",
        link: "/dashboard/admin/add-forum-post",
      },
      {
        icon: FaCreditCard,
        label: "Transactions",
        link: "/dashboard/admin/transactions",
      },
      {
        icon: FaFlag,
        label: "Forum Post Manage",
        link: "/dashboard/admin/forum-post-manage",
      },
    ],
  };

  const navItems = dashboardItems[user?.role] || [];

  return (
    <Drawer>

      {/* Mobile Menu Button */}
      <Button
        className="md:hidden flex items-center gap-2"
        variant="secondary"
      >
        <Bars />
        Menu
      </Button>

      {/* Desktop Sidebar */}
      <nav className="hidden md:flex flex-col w-[240px] min-h-screen border-r border-zinc-800 bg-black px-4 py-5">

        {/* Logo */}
        <div className="mb-6 border-b border-zinc-800 pb-5">
          <Image
            src={"/logo.png"}
            height={100}
            width={120}
            alt="logo"
            className="h-10 w-full object-cover"
          />
        </div>

        {/* Menu Items */}
        <div className="flex flex-col gap-2">

          {navItems.map((item, index) => (

            <Link
              href={item.link}
              key={item.label}
              className={`
                group flex items-center gap-3
                rounded-xl px-4 py-3
                text-sm font-medium
                transition-all duration-200

                ${
                  index === 0
                    ? "bg-zinc-800 text-cyan-400 border border-cyan-500/30 shadow-lg shadow-cyan-500/10"
                    : "text-zinc-300 hover:bg-zinc-900 hover:text-cyan-400"
                }
              `}
            >
              <item.icon
                className={`text-lg ${
                  index === 0
                    ? "text-cyan-400"
                    : "text-zinc-500 group-hover:text-cyan-400"
                }`}
              />

              {item.label}
            </Link>
          ))}
        </div>

        {/* User Info */}
        <div className="mt-auto border-t border-zinc-800 pt-5">

          <div className="flex items-center gap-3 rounded-xl bg-zinc-900 border border-zinc-800 p-3">

            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-cyan-500/20 text-cyan-400 font-bold">
              {user?.name?.charAt(0)}
            </div>

            <div>
              <h4 className="text-sm font-semibold text-white">
                {user?.name}
              </h4>

              <p className="text-xs capitalize text-zinc-400">
                {user?.role}
              </p>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <Drawer.Backdrop>
        <Drawer.Content placement="left">

          <Drawer.Dialog className="bg-black border-r border-zinc-800">

            <Drawer.CloseTrigger />

            <Drawer.Header>
              <Drawer.Heading className="text-white">
                Navigation
              </Drawer.Heading>
            </Drawer.Header>

            <Drawer.Body>

              <nav className="flex flex-col gap-2">

                {navItems.map((item, index) => (

                  <Link
                    href={item.link}
                    key={item.label}
                    className={`
                      group flex items-center gap-3
                      rounded-xl px-4 py-3
                      text-sm font-medium
                      transition-all duration-200

                      ${
                        index === 0
                          ? "bg-zinc-800 text-cyan-400 border border-cyan-500/30"
                          : "text-zinc-300 hover:bg-zinc-900 hover:text-cyan-400"
                      }
                    `}
                  >
                    <item.icon
                      className={`text-lg ${
                        index === 0
                          ? "text-cyan-400"
                          : "text-zinc-500 group-hover:text-cyan-400"
                      }`}
                    />

                    {item.label}
                  </Link>
                ))}
              </nav>

            </Drawer.Body>
          </Drawer.Dialog>
        </Drawer.Content>
      </Drawer.Backdrop>
    </Drawer>
  );
}