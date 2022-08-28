const axios = require("axios");
const { Router } = require("express");

const router = Router();

router.get("/:name", async (req, res) => {
  const { name } = req.params;
  try {
    const { data } = await axios.get(
      `https://api.mercadolibre.com/sites/MLM/search?q=${name}`
    );
    const formattedItem = data.results.map((item) => ({
      side_id: item.site_id,
      title: item.title,
      available_quantity: item.available_quantity,
      link: item.permalink,
      seller_id: item.seller.id,
      brand: item.attributes[0].value_name,
      shipping: item.shipping.free_shipping,
      logistic_type: item.shipping.logistic_type,
      seller_address: item.seller_address.state.name,
      condition: item.condition,
      price: item.price,
    }));
    return res.json(201, formattedItem);
  } catch (e) {
    return res.json(401, { msg: "Item not found" });
  }
});

router.get("/category/:category", async (req, res) => {
  const { category } = req.params;
  try {
    const { data } = await axios.get(
      `https://api.mercadolibre.com/sites/MLM/search?category=${category}`
    );

    const formattedItem = data.results.map((item) => ({
      seller_id: item.seller.id,
      brand: item.attributes[0].value_name,
      shipping: item.shipping.free_shipping,
      logistic_type: item.shipping.logistic_type,
      seller_address: item.seller_address.state.name,
      condition: item.condition,
      price: item.price,
    }));
    const itemsOrder = formattedItem.sort((a, b) => a.price - b.price);
    return res.json(201, formattedItem);
  } catch (e) {
    return res.json(401, { msg: "Item not found" });
  }
});

module.exports = router;
