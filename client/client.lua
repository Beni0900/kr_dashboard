PlayerData = ESX.GetPlayerData()

RegisterCommand('dashboard', function()
	NUI:SetState(true)
end, false)

RegisterKeyMapping('dashboard', "Dashboard megnyitása", 'keyboard', 'F7')
