const { Schema, model } = require("mongoose");

const ProductSchema = Schema({
  available: { type: Boolean, default: true },
  category: { type: Schema.Types.ObjectId, ref: "Categorie", require: true },
  description: { type: String, default: "" },
  image: { type: String },
  name: { type: String, require: true, unique: true },
  price: { type: Number, default: 0 },
  state: { type: Boolean, default: true, require: true },
  user: { type: Schema.Types.ObjectId, ref: "User", require: true },
});

ProductSchema.methods.toJSON = function () {
  const { __v, _id, ...product } = this.toObject();
  product.product_id = _id;
  return product;
};

module.exports = model("Product", ProductSchema);
