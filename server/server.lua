RegisterCommand("setPremium", function(source, args, rawCommand)
	local targetSource = tonumber(args[1])
	local amount = tonumber(args[2])
	local playerId = Player(targetSource).state.identifier

	if amount and targetSource then
			DB:UpdatePremium(playerId, amount)
			print("Siker!")
	else
			print("Nem  adott meg egy értéket a premiumnak")

	end
end, false)

lib.callback.register('kr_dashboard->buyPremiumItem', function(source, itemName)
	local source = source
	local xPlayer = ESX.GetPlayerFromId(source)
  local license = Player(source).state.identifier
	local Exists, price, label = GetItemFromShop(itemName)
	-- amount = ESX.Math.Round(amount)

	-- if amount < 0 then
	-- 	print(('[^3WARNING^7] Player ^5%s^7 attempted to exploit the shop!'):format(source))
	-- 	return
	-- end

	if not Exists then
		print(('[^3WARNING^7] Player ^5%s^7 attempted to exploit the shop!'):format(source))
		return
	end


	local premiumAmount = DB:GetPremiumAmount(license)

	if premiumAmount < price then
		return {success = false, message = "Nincs elég prémiumpontod."}
	end

	local newPremiumAmount = premiumAmount - price
	DB:UpdatePremium(license, newPremiumAmount)

	if xPlayer.canCarryItem(itemName, 1) then
		xPlayer.addInventoryItem(itemName, 1)
		return {success = true, message = "Sikeresen megvetted a(z) " .. label .. " itemet prémium pontért."}
	else
		return {success = false, message = "Nem bírod el az itemeket."}
	end
end)

lib.callback.register('kr_dashboard->getPremium', function(source)
  local player = Player(source).state.identifier
	return DB:GetPremiumAmount(player) or 0
end)

lib.callback.register('kr_dashboard->getUserName', function(source)
  local player = getIdentifier(source)
	return DB:GetUserName(player) or ""
end)

lib.callback.register('kr_dashboard->getCarList', function(source)
  local player = Player(source).state.identifier
	return DB:GetCarList(player) or 0
end)

lib.callback.register('kr_dashboard->getHomeBackendData', function(source)
  local player = Player(source).state.identifier

	local amountOfCars =  DB:GetAmountOfCars(player) or 0

	local police = 0
	local ambulance = 0
	local mechanic = 0
	local players = ESX.GetPlayers()

	for _, playerId in ipairs(players) do
			local player = ESX.GetPlayerFromId(playerId)
			if player then
					local job = player.job.name
					if job == 'police' then
							police = police + 1
					elseif job == 'ambulance' then
							ambulance = ambulance + 1
					elseif job == 'mechanic' then
							mechanic = mechanic + 1
					end
			end
	end

	local server = #players

    return {
			amountOfCars = amountOfCars,
			police = police,
			ambulance = ambulance,
			mechanic = mechanic,
			server = server
    }
end)