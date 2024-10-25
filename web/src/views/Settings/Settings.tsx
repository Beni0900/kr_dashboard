import React from "react";
import "./settings.scss";
import Switch from "react-switch";
import { SettingProps } from "../../types/SettingProps";
import { fetchNui } from "../../helper/fetchNui";

const Settings: React.FC<{
  settings: SettingProps[];
  setSettings: (newSettings: SettingProps[]) => void;
}> = ({ settings, setSettings }) => {
  const handleToggle = (id: string) => {
    const updatedSettings = settings.map((setting) =>
      setting.id === id ? { ...setting, checked: !setting.checked } : setting
    );
    setSettings(updatedSettings);
  };

  return (
    <div className="settingsContainer">
      {settings.map((setting) => (
        <div className="setting" key={setting.id}>
          <p>{setting.label}</p>
          <Switch
            checked={setting.checked}
            onChange={() => {
              handleToggle(setting.id);
              fetchNui("toggleSetting", { event: setting.toggleEvent });
            }}
            offColor="#686868"
            onColor="#258E25"
            height={20}
          />
        </div>
      ))}
    </div>
  );
};

export default Settings;
