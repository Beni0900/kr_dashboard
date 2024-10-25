NUI = {
    SetState = function(self, state)
        SetNuiFocus(state, state)
        
        if state then
            SetTimecycleModifier("hud_def_blur")
            SetTimecycleModifierStrength(1.0) 
            SendNUIMessage({
                action = 'show',
                data = {
                    value = true
                }
            })
            return
        end
        
        ClearTimecycleModifier()
        SendNUIMessage({
            action = 'show',
            data = { value = false }
        })
    end,
    Notify = function(self, text, type)
        ESX.ShowNotification(text, not type and "error" or "success", 5000)
    end
}

RegisterNUICallback('close', function(_, cb)
    NUI:SetState(false)
    cb("ok")
end)

RegisterNUICallback('getHome', function(_, cb)
    local cash, bank = getMoney(PlayerData.accounts)
    local result = lib.callback.await('kr_dashboard->getHomeBackendData', false)

    local username = lib.callback.await('kr_dashboard->getUserName', false)
    local premium = lib.callback.await('kr_dashboard->getPremium', false)
    local amountOfCars = result.amountOfCars

    local police, ambulance, mechanic, server = result.police, result.ambulance, result.mechanic, result.server
    local userInfo = {
        { label = "Név", value = PlayerData.firstName .. " " .. PlayerData.lastName },
        { label = "Felhasználónév", value = username },
        { label = "Készpénz", value = tonumber(cash), type = "Ft" },
        { label = "Banki egyenleg", value = tonumber(bank), type = "Ft" },
        { label = "Prémium Pont egyenleg", value = tonumber(premium), type = "PP" },
        { label = "Munkahely", value = PlayerData.job.label },
        { label = "Rang", value = PlayerData.job.grade_label },
        { label = "Tulajdonban lévő járművek", value = amountOfCars, type = "db" },
        { label = "Elérhető frakciók", value = "", customClass = "availableFactions" },
        { label = "Rendvédelem", value = police, type = "fő", customClass = "customPolice" },
        { label = "Korházi dolgozók", value = ambulance, type = "fő", customClass = "customAmbulance" }
    }

    local bottomInfo = {
        { label = "Szerelők", value = mechanic, type = "fő", customClass = "customBottom" },
        { label = "Jelenlegi online játékosok", value = server, type = "fő", customClass = "customBottom" }
    }

    cb({ userInfo = userInfo, bottomInfo = bottomInfo})
end)

RegisterNuiCallback('getSettingList', function (_, cb)
    cb({settingList = Config.Settings})
end)

RegisterNuiCallback('toggleSetting', function (data, cb)
    TriggerEvent(data.event)
    cb("ok")
end)

RegisterNUICallback('getPremium', function(data, cb)
    local currentPp = lib.callback.await('kr_dashboard->getPremium', false)
    cb({categoryList = Config.Premium.categroyList, itemList = Config.Premium.itemList, currentPp = currentPp})
end)

RegisterNUICallback('getCarList', function(data, cb)
    local result = lib.callback.await('kr_dashboard->getCarList', false)
    local carList = {}
    
    for _, car in ipairs(result) do
        local carData = json.decode(car.vehicle)
        local modelName = GetDisplayNameFromVehicleModel(carData.model) or "Unknown"
        
        table.insert(carList, {
            label = modelName,
            plate = car.plate,
        })
    end
    cb({ carList = carList })
end)

RegisterNUICallback('notify', function(data, cb)
    NUI:Notify(data.message, false)
    cb("ok")
end)

RegisterNUICallback('buyItem', function(data, cb)
    local result = lib.callback.await('kr_dashboard->buyPremiumItem', false, data.name)
    if result.success then
        NUI:SetState(false)
        NUI:Notify(result.message, result.success)
    else
        NUI:Notify(result.message, result.success)
    end
    cb("ok")
end)

