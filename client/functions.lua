function getMoney(accounts)
  local cash, bank = 0, 0
  for k,v in ipairs(accounts) do
    if v.name == "bank" then
      bank = v.money
    elseif v.name == "money" then
      cash = v.money
    end
  end
  return cash, bank
end