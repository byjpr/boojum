export default   {
    title: "EVERYDAY INSPIRATION", // Static method
    type: "", // Static method
    url: "/products/everyday-inspiration", // Static method
    available: true,  // Returns true if a product is available for purchase. Returns falseif all of the products variants' inventory_quantity values are zero or less
    collections: [
      {id: "1"},
      {id: "1234"}
    ],
    compare_at_price_max:8595, // Returns the highest compare at price
    compare_at_price_min:8595, // Returns the lowest compare at price
    price_max:8595, //
    price_min:8595, //
    selected_variant:false, // Returns the variant object of the currently-selected variant if there is a valid ?variant= parameter in the URL
    selected_or_first_available_variant:false, //
    first_available_variant:false, // Returns the variant object of the first product variant that is available for purchase
    has_only_default_variant: true, // Returns true if the product only has the default variant. This lets you determine whether to show a variant picker in your product forms.
    description: "Be ready to collect a thought, capture an idea, or jot down a note with this Field Notes and Bellroy collaboration. The Everyday Inspiration offers everything you need in one cleverly-crafted kit. Thoughtfully designed and carefully constructed, this is one companion you’ll want with you all the time.", // Static method
    featured_image: "",
    handle: "everyday-inspiration", // Static method
    id: "FN-37", // Static method
    options: false,
    options_with_values: false,
    price: 12.95, // Static method
    tags: [
      "Bellroy",
      "Field Notes",
      "Everyday",
      "Vegetable-tanned leather",
      "Fits Memo Book",
      "Magnetic Closure",
      "UPC: 9343783004461"
    ],
    template_suffix: "", // Static method
    variants: false,
    vendor: "Field Notes", // Static method
    images: [
      {
        id: "FN-371",
        product_id: "FN-37",
        position: 0,
        src: "http://i.imgur.com/tw1bpaM.jpg"
      },
      {
        id: "FN-372",
        product_id: "FN-37",
        position: 1,
        src: "http://i.imgur.com/ztyoiCr.jpg"
      },
      {
        id: "FN-373",
        product_id: "FN-37",
        position: 2,
        src: "http://i.imgur.com/EozwoLz.jpg"
      }
    ]
  };
