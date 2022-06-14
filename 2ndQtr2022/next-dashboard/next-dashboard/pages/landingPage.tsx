import React from "react";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import { FiSettings } from "react-icons/fi";
import Link from "next/link";
export const LandingPage = () => {
  const activeMenu = false;
  return (
    <div className="flex relative dark:bg-main">
      <div
        className="fixed right-14 bottom-14 size-20"
        style={{ zIndex: 1000 }}
      >
        <TooltipComponent content="Settings" position="TopCenter">
          <button
            type="button"
            className="text-3xl p-3 hover:drop-shadow-xl text-white"
            style={{ background: "blue", borderRadius: "50%" }}
          >
            <FiSettings />
          </button>
        </TooltipComponent>
      </div>
      {activeMenu ? (
        <div
          className="w-22 fixed sidebar  bg-white drop-shadow-lg dark:bg-zinc-400"
          // style={{ backgroundColor: "rgb(244 63 94);" }}
        >
          Sidebar
        </div>
      ) : (
        <div className="w-0 dark:bg-secondary-dark-bg">No sidebar</div>
      )}
      <div
        className={`dark:bg-main-bg bg-main-bg min-h-screen w-full ${
          activeMenu ? "md:ml-52" : "flex-2"
        }`}
      >
        ss
      </div>
      <nav>
        <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full">
          Navbar
        </div>
        {/* dashboard */}
        {/* <Link href="/" /> */}
        {/* pages */}
        <Link href="/orders">Orders</Link>
        <Link href="/customers">Customers</Link>
        <Link href="/employee">Employee</Link>
        {/* Apps */}
        <Link href="/kanban">Kanaban</Link>
        <Link href="/editors">Editors</Link>
        <Link href="/calendar">Calendar</Link>
        <Link href="/color-picker">Color picker</Link>
        {/* charts */}
        <Link href="/charts/line">Line</Link>
        <Link href="charts/area">Area</Link>
        <Link href="charts/bar">Bar</Link>
        <Link href="charts/pie">Pie</Link>
        <Link href="charts/financial">Financial</Link>
        <Link href="charts/color-mapping">Color Mapping</Link>
        <Link href="charts/pyramid">Pyramid</Link>
        <Link href="charts/stacked">Stacked</Link>
      </nav>
    </div>
  );
};
