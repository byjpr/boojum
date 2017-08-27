const images = [
  {
    id: "FN-371",
    product_id: "FN-37",
    position: 0,
    src: "https://fieldnotes.imgix.net/images/products/FN-37-Everyday-Inspiration-A.jpg?auto=format&fit=crop&h=720&ixlib=php-1.1.0&q=55&w=800&s=f7ebaa7ba14ebb1dafdcf1858569a4ea",
  },
  {
    id: "FN-372",
    product_id: "FN-37",
    position: 1,
    src: "https://fieldnotes.imgix.net/images/products/bellroy_kit2.jpg?auto=format&fit=crop&ixlib=php-1.1.0&q=55&w=2000&s=eeda5ad09038e859d3b3043ab2f6d4b1",
  },
  {
    id: "FN-373",
    product_id: "FN-37",
    position: 2,
    src: "https://fieldnotes.imgix.net/images/products/bellroy_card.jpg?auto=format&fit=crop&ixlib=php-1.1.0&q=55&w=2000&s=920400fb9dcda05ac582bb6b43d9be4f",
  }
];

export default [
  {
    title: "EVERYDAY INSPIRATION", // Static method
    type: "", // Static method
    url: "/products/everyday-inspiration", // Static method
    available: true,  // Returns true if a product is available for purchase. Returns falseif all of the products variants' inventory_quantity values are zero or less
    collections: [
      "",
      "",
      ""
    ],
    compare_at_price_max:8595, // Returns the highest compare at price
    compare_at_price_min:8595, // Returns the lowest compare at price
    price_max:8595, //
    price_min:8595, //
    selected_variant:false, // Returns the variant object of the currently-selected variant if there is a valid ?variant= parameter in the URL
    selected_or_first_available_variant:"", //
    first_available_variant:"", // Returns the variant object of the first product variant that is available for purchase
    has_only_default_variant: true, // Returns true if the product only has the default variant. This lets you determine whether to show a variant picker in your product forms.
    description: "", // Static method
    featured_image: "",
    handle: "everyday-inspiration", // Static method
    id: "FN-37", // Static method
    options: false,
    options_with_values: false,
    price: 12.95, // Static method
    tags: [
      "Bellroy",
      "Field Notes",
      "EVERYDAY",
      "vegetable-tanned leather",
      "fits Memo Book",
      "Magnetic closure",
      "UPC: 9343783004461"
    ],
    template_suffix: "", // Static method
    variants: false,
    vendor: "Field Notes", // Static method
    images: images
  }
];
