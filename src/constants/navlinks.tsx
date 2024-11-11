import { IconUser } from "@tabler/icons-react";
import {
  IconArticle,
  IconBriefcase2,
  IconHome,
  IconMail,
} from "@tabler/icons-react";

export const navlinks = [
  {
    link: "/",
    name: "Home",
    icon: <IconHome className="h-4 w-4 text-neutral-500 dark:text-white" />,
  },
  {
    link: "/about",
    name: "About",
    icon: <IconUser className="h-4 w-4 text-neutral-500 dark:text-white" />,
  },
  {
    link: "/projects",
    name: "Projects",
    icon: (
      <IconBriefcase2 className="h-4 w-4 text-neutral-500 dark:text-white" />
    ),
  },
  {
    link: "/blog",
    name: "Articles",
    icon: <IconArticle className="h-4 w-4 text-neutral-500 dark:text-white" />,
  },
  {
    link: "/contact",
    name: "Contact",
    icon: <IconMail className="h-4 w-4 text-neutral-500 dark:text-white" />,
  },
];
