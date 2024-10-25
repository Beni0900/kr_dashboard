DB = {
  UpdatePremium = function(self, userId, newPremiumAmount)
    return MySQL.update.await('UPDATE users SET premium = ? WHERE identifier = ?', {newPremiumAmount, userId})
  end,
  GetPremiumAmount = function(self, userId)
    local result = MySQL.query.await('SELECT premium FROM users WHERE identifier = ?', {userId})
    return result[1] and result[1].premium or nil
  end,
  GetAmountOfCars = function(self, userId)
    local result = MySQL.query.await('SELECT COUNT(*) as count FROM owned_vehicles WHERE owner = ?', {userId})
    return result[1] and result[1].count or 0
  end,
  GetCarList = function(self, userId)
    local result = MySQL.query.await('SELECT vehicle, plate FROM owned_vehicles WHERE owner = ?', {userId})
    return result or {}
  end,
  GetUserName = function(self, license)
    local result = MySQL.query.await('SELECT username FROM login_system WHERE license = ?', {license})
    return result[1] and result[1].username or ""
  end
}