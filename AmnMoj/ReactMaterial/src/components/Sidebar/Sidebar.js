import React, { useEffect, useState } from "react";
import { Drawer, IconButton, List } from "@material-ui/core";
import {
  ArrowBack as ArrowBackIcon,
  Audiotrack,
  BorderAll as TableIcon,
  FilterNone as UIElementsIcon,
  FormatSize as TypographyIcon,
  HelpOutline as FAQIcon,
  Home as HomeIcon,
  LibraryBooks as LibraryIcon,
  NotificationsNone as NotificationsIcon,
  QuestionAnswer as SupportIcon,
  Book,
  Movie as MovieIcon
} from "@material-ui/icons";
import { useTheme } from "@material-ui/styles";
import { withRouter } from "react-router-dom";
import classNames from "classnames";
// styles
import useStyles from "./styles";
// components
import SidebarLink from "./components/SidebarLink/SidebarLink";
import Dot from "./components/Dot";
// context
import { toggleSidebar, useLayoutDispatch, useLayoutState } from "../../context/LayoutContext";

const structure = [
  {
    id:-2,
    label : "لیست کتاب ها",
    link : "/app/bookList",
    icon :<Book/>
  },
  {
    id:-2,
    label : "لیست فیلم ها",
    link : "/app/movies",
    icon :<MovieIcon/>
  },
  {
    id: -1,
    label: "صفحه تستی",
    link: "/app/test",
    icon: <Audiotrack/>,
    children: [
      {
        label: "تست یک",
        link: "/app/test",
      },
      {
        label: "تست دو",
        link: "/app/test",
      },
    ],
  },
  { id: 0, label: "داشبورد", link: "/app/dashboard", icon: <HomeIcon/> },
  {
    id: 1,
    label: "تایپوگرافی",
    link: "/app/typography",
    icon: <TypographyIcon/>,
  },
  { id: 2, label: "جداول", link: "/app/tables", icon: <TableIcon/> },
  {
    id: 3,
    label: "پیغام ها",
    link: "/app/notifications",
    icon: <NotificationsIcon/>,
  },
  {
    id: 4,
    label: "عناصر UI",
    link: "/app/ui",
    icon: <UIElementsIcon/>,
    children: [
      { label: "آیکن ها", link: "/app/ui/icons" },
      { label: "نمودار ها", link: "/app/ui/charts" },
      { label: "نفشه گوگل", link: "/app/ui/maps" },
    ],
  },
  { id: 5, type: "divider" },
  { id: 6, type: "title", label: "راهنما" },
  { id: 7, label: "کتابخانه", link: "", icon: <LibraryIcon/> },
  { id: 8, label: "پشتیانی", link: "", icon: <SupportIcon/> },
  { id: 9, label: "پرسش و پاسخ", link: "", icon: <FAQIcon/> },
  { id: 10, type: "divider" },
  { id: 11, type: "title", label: "پروژه ها" },
  {
    id: 12,
    label: "پروژه های اخیر",
    link: "",
    icon: <Dot size="small" color="warning"/>,
  },
  {
    id: 13,
    label: "ستاره دار ها",
    link: "",
    icon: <Dot size="small" color="primary"/>,
  },
  {
    id: 14,
    label: "در پس زمینه",
    link: "",
    icon: <Dot size="small" color="secondary"/>,
  },
];

function Sidebar({ location }) {
  var classes = useStyles();
  var theme = useTheme();

  // global
  var { isSidebarOpened } = useLayoutState();
  var layoutDispatch = useLayoutDispatch();

  // local
  var [isPermanent, setPermanent] = useState(true);

  useEffect(function() {
    window.addEventListener("resize", handleWindowWidthChange);
    handleWindowWidthChange();
    return function cleanup() {
      window.removeEventListener("resize", handleWindowWidthChange);
    };
  });

  return (
    <Drawer
      variant={isPermanent ? "permanent" : "temporary"}
      className={classNames(classes.drawer, {
        [classes.drawerOpen]: isSidebarOpened,
        [classes.drawerClose]: !isSidebarOpened,
      })}
      classes={{
        paper: classNames({
          [classes.drawerOpen]: isSidebarOpened,
          [classes.drawerClose]: !isSidebarOpened,
        }),
      }}
      open={isSidebarOpened}
    >
      <div className={classes.toolbar}/>
      <div className={classes.mobileBackButton}>
        <IconButton onClick={() => toggleSidebar(layoutDispatch)}>
          <ArrowBackIcon
            classes={{
              root: classNames(classes.headerIcon, classes.headerIconCollapse),
            }}
          />
        </IconButton>
      </div>
      <List className={classes.sidebarList}>
        {structure.map(link => (
          <SidebarLink
            key={link.id}
            location={location}
            isSidebarOpened={isSidebarOpened}
            {...link}
          />
        ))}
      </List>
    </Drawer>
  );

  // ##################################################################
  function handleWindowWidthChange() {
    var windowWidth = window.innerWidth;
    var breakpointWidth = theme.breakpoints.values.md;
    var isSmallScreen = windowWidth < breakpointWidth;

    if (isSmallScreen && isPermanent) {
      setPermanent(false);
    } else if (!isSmallScreen && !isPermanent) {
      setPermanent(true);
    }
  }
}

export default withRouter(Sidebar);
