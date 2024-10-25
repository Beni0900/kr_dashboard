Config = {}

Config.Premium = {
  categroyList = {
    { label = "Ételek, italok", value = "food" },
    { label = "Fegyverek", value = "weapons" },
  },
  itemList = {
    { label = "Bread", price = 1000, name = 'bread', category = "food" },
    { label = "Weapon", price = 100000, name = 'weapons', category = "weapons" },
  }
}

Config.Settings = {
  {
    id = "hud",
    label = "Hud ki be kapcsolása",
    checked = function() return exports["esx_hud"]:proba() end,
    toggleEvent = "esx_hud:HudToggle",
  }
}