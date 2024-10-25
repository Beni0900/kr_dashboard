import { useEffect, useState } from "react";
import Navbar from "./Components/Navbar/Navbar";
import { FaCarAlt, FaCog, FaHome, FaShoppingCart } from "react-icons/fa";
import { NavbarProps } from "./types/NavbarProps";
import Home from "./views/Home/Home";
import CarPage from "./views/Cars/CarPage";
import Settings from "./views/Settings/Settings";
import Premium from "./views/Premium/Premium";
import Gif from "./helper/Gif";
import { isEnvBrowser } from "./helper/misc";
import useNuiEvent from "./helper/useNuiEvent";
import { InfoProps } from "./types/InfoProps";
import { fetchNui } from "./helper/fetchNui";
import { PremiumItemProps } from "./types/PremiumItemProps";
import { PremiumNavbarProps } from "./types/PremiumNavbarProps";
import { CarProps } from "./types/CarProps";
import { SettingProps } from "./types/SettingProps";

const App = () => {
  const [currentPage, setCurrentPage] = useState<string>("loading");

  const [userInfo, setUserInfo] = useState<InfoProps[]>([]);

  const [bottomInfo, setBottomInfo] = useState<InfoProps[]>([]);

  const [navItems, setNavItems] = useState<PremiumNavbarProps[]>([]);

  const [premiumItems, setPremiumItems] = useState<PremiumItemProps[]>([]);

  const [carList, setCarlist] = useState<CarProps[]>([]);

  const [settings, setSettings] = useState<SettingProps[]>([]);

  const [currentPp, setSetCurrentPp] = useState<number>(0);

  const mainNavbarItems: NavbarProps[] = [
    {
      icon: <FaHome />,
      label: "Kezdőlap",
      value: "home",
      page: <Home userInfo={userInfo} bottomInfo={bottomInfo} />,
    },
    {
      icon: <FaCarAlt />,
      label: "Járművek",
      value: "cars",
      page: <CarPage carList={carList} />,
    },
    {
      icon: <FaCog />,
      label: "Beállítások",
      value: "settings",
      page: <Settings settings={settings} setSettings={setSettings} />,
    },
    {
      icon: <FaShoppingCart />,
      label: "Prémium shop",
      value: "p_shop",
      page: (
        <Premium
          navItems={navItems}
          premiumItems={premiumItems}
          currentPp={currentPp}
        />
      ),
    },
  ];

  const getData = async (type: string) => {
    if (type === "home") {
      try {
        if (userInfo.length == 0) {
          const res = await fetchNui<{
            userInfo: InfoProps[];
            bottomInfo: InfoProps[];
          }>("getHome");

          setUserInfo(res.userInfo);
          setBottomInfo(res.bottomInfo);
        }

        setCurrentPage("home");
      } catch (error) {
        console.error("Hiba történt a fetchNui során:", error);
      }
    } else if (type == "cars") {
      try {
        if (carList.length == 0) {
          const res = await fetchNui<{
            carList: CarProps[];
          }>("getCarList");

          setCarlist(res.carList);
        }

        setCurrentPage("cars");
      } catch (error) {
        console.error("Hiba történt a fetchNui során:", error);
      }
    } else if (type == "settings") {
      try {
        if (settings.length == 0) {
          const res = await fetchNui<{
            settingList: SettingProps[];
          }>("getSettingList");

          setSettings(res.settingList);
        }

        setCurrentPage("settings");
      } catch (error) {
        console.error("Hiba történt a fetchNui során:", error);
      }
    } else if (type == "p_shop") {
      try {
        if (premiumItems.length == 0) {
          const res = await fetchNui<{
            categoryList: PremiumNavbarProps[];
            itemList: PremiumItemProps[];
            currentPp: number;
          }>("getPremium");

          setNavItems(res.categoryList);
          setPremiumItems(res.itemList);
          setSetCurrentPp(res.currentPp);
        }

        setCurrentPage("p_shop");
      } catch (error) {
        console.error("Hiba történt a fetchNui során:", error);
      }
    }
  };

  const handlePageChange = (page: string) => {
    setCurrentPage("loading");
    getData(page);
  };

  useNuiEvent<{
    value: boolean;
  }>("show", ({ value }) => {
    const container = document.querySelector(".container") as HTMLElement;
    if (value) {
      if (container) {
        getData("home");
        container.style.display = "flex";
        setTimeout(() => {
          container.style.opacity = "1.0";
        }, 100);
      }
    } else {
      if (container) {
        container.style.opacity = "0.0";
        setTimeout(() => {
          container.style.display = "none";
        }, 1000);
      }
    }
  });

  useEffect(() => {
    const keyupHandler = (data: KeyboardEvent) => {
      if (data.which == 27) {
        fetchNui("close");
      }
    };

    document.addEventListener("keyup", keyupHandler);
    return () => {
      document.removeEventListener("keyup", keyupHandler);
    };
  }, []);

  return (
    <div
      className="container"
      style={{
        display: isEnvBrowser() ? "flex" : "none",
        opacity: isEnvBrowser() ? "1.0" : "0.0",
      }}
    >
      <Navbar
        currentPage={currentPage}
        setCurrentPage={handlePageChange}
        navbarItems={mainNavbarItems}
      />
      {currentPage == "loading" && (
        <div className="view">
          <Gif />
        </div>
      )}
      {mainNavbarItems.map((el, i) => {
        if (el.value == currentPage) {
          return (
            <div className="view" key={i}>
              <p className="title">
                <span>Kingdom</span> RolePlay - Dashboard
              </p>
              {el.page}
            </div>
          );
        }
      })}
    </div>
  );
};

export default App;
