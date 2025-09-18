const foodItemModel = require("../models/foodItem.model");
const foodPartnerModel = require("../models/foodPartner.model");

async function getFoodPartnerById(req, res) {
  try {
    const foodPartnerId = req.params.id;

    const foodPartner = await foodPartnerModel.findById(foodPartnerId);
    const foodItemsByFoodPartner = await foodItemModel.find({
      foodPartner: foodPartnerId,
    });

    if (!foodPartner) {
      return res.status(404).json({ message: "Food partner not found" });
    }

    res.status(200).json({
      message: "Food partner retrieved successfully",
      foodPartner: {
        ...foodPartner.toObject(),
        foodItems: foodItemsByFoodPartner,
      },
    });
  } catch (error) {
    console.error("Error fetching food partner:", error);
    res.status(500).json({ message: "Server error" });
  }
}

module.exports = {
  getFoodPartnerById,
};
