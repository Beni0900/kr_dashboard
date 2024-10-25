function GetItemFromShop(itemName)
	local items = Config.Premium.itemList

  for _, itemData in pairs(items) do
		if itemData.name == itemName then
			return true, itemData.price, itemData.label
		end
	end

	return false
end

function getIdentifier(playerId)
	for k,v in ipairs(GetPlayerIdentifiers(playerId)) do
		if string.match(v, 'license:') then
			local identifier = string.gsub(v, 'license:', '')
			return identifier
		end
	end
end