export const products = [
  {
    id: 1,
    name: "Jade Plant Mini",
    imageUrl: "/images/jade-plant-mini.png",
    price: 399,
    salePercent: 25,
    like: true,
  },
  {
    id: 2,
    name: "Broken Heart Plant",
    imageUrl: "/images/broken-heart-plant.png",
    price: 499,
    salePercent: 20,
    like: false,
  },
  {
    id: 3,
    name: "Peperomia Variegated Plant",
    imageUrl: "/images/peperomia-variegated-plant.png",
    price: 399,
    salePercent: 25,
    like: false,
  },
  {
    id: 4,
    name: "Aralia Variegated Mini Plant",
    imageUrl: "/images/aralia-variegated-mini-plant.png",
    price: 399,
    salePercent: 13,
    like: true,
  },
];

export const mainFeatures = [
  {
    id: 1,
    title: "Beautiful Plants",
    desc: "Out plants are sourced from local growers to ensure the highest quality and to support family-owned bussinesses.",
  },
  {
    id: 2,
    title: "Timeless Planters",
    desc: "Out ceramic planters are designed by out team to complement a range of styles, and are manufactured by a pottery company.",
  },
  {
    id: 3,
    title: "Support",
    desc: "Out Care Library includes specific care instructions for each plant and out monthly workshops help with all aspects of plant parenthood.",
  },
];

export const subFeatures = [
  {
    id: 1,
    title: "Fast Delivery",
    desc: "Orders above 500.000 VND",
    imageUrl: "/images/fast-delivery.png",
  },
  {
    id: 2,
    title: "Plant Care Support",
    desc: "Complete guidance",
    imageUrl: "/images/plant-care-support.png",
  },
  {
    id: 3,
    title: "Health Guarantee",
    desc: "30 days health guarantee",
    imageUrl: "/images/health-guarantee.png",
  },
  {
    id: 4,
    title: "All Day Support",
    desc: "Quick support",
    imageUrl: "/images/all-day-support.png",
  },
];

export const blogs = [
  {
    id: 1,
    title: "Beginner's Guild To Maintain Indoor Plants",
    publicDate: "10 January 2021",
    imageUrl: "/images/blog-1.png",
    url: "imageUrl",
  },
  {
    id: 2,
    title: "Buying Best For You Home Garden",
    publicDate: "16 April 2021 ",
    imageUrl: "/images/blog-2.png",
    url: "imageUrl",
  },
  {
    id: 3,
    title: "Plant A New Tree Campaign",
    publicDate: "5 June 2021",
    imageUrl: "/images/blog-3.png",
    url: "imageUrl",
  },
  {
    id: 4,
    title: "Know How To Take Care Of Your Plants",
    publicDate: "29 October 2021",
    imageUrl: "/images/blog-4.png",
    url: "imageUrl",
  },
];

export const helpLinks = [
  { id: 1, text: "Privacy Policy", url: "" },
  { id: 2, text: "Shipping & Delivery", url: "" },
  { id: 3, text: "Refund Policy", url: "" },
  { id: 4, text: "Track Your Order", url: "" },
];

export const categoryLinks = [
  { id: 1, text: "Indoor Plants", url: "" },
  { id: 2, text: "Outdoor Plants", url: "" },
  { id: 3, text: "Pet Friendly", url: "" },
  { id: 4, text: "Castus", url: "" },
];

export const supportLinks = [
  { id: 1, text: "Feedback", url: "" },
  { id: 2, text: "Contact Us", url: "" },
  { id: 3, text: "Download App", url: "" },
  { id: 4, text: "Terms Conditions", url: "" },
];

export const categoriesBanners = [
  {
    id: 1,
    text: "Best For Beginners",
    url: "",
    imageUrl: "/images/best-for-beginners.png",
  },
  {
    id: 2,
    text: "All live plants",
    url: "",
    imageUrl: "/images/all-live-plants.png",
  },
  {
    id: 3,
    text: "Pots & Planters",
    url: "",
    imageUrl: "/images/pots-and-planters.png",
  },
  {
    id: 4,
    text: "Potting Supplies",
    url: "",
    imageUrl: "/images/potting-supplies.png",
  },
];

export const plantsSortOptions = [
  {
    id: 1,
    query: "?sort=name:desc",
    text: "Name: A to Z",
  },
  {
    id: 2,
    query: "?sort=name:desc",
    text: "Name: Z to A",
  },
  {
    id: 3,
    query: "?sort=price:asc",
    text: "Price: Low to High",
  },
  {
    id: 4,
    query: "?sort=price:desc",
    text: "Price: High to Low",
  },
  {
    id: 5,
    query: "?sort=createdAt:desc",
    text: "New arrivals",
  },
  {
    id: 6,
    query: "?sort=rating:desc",
    text: "Highest rating",
  },
  {
    id: 7,
    query: "?sort=sold:desc",
    text: "Best sellers",
  },
];

export const plantsFilterOptions = [
  {
    id: 1,
    text: "Category",
    type: "checkbox",
    subOptions: [
      {
        id: 1,
        text: "Test",
        query: "category=test",
      },
    ],
  },
  {
    id: 2,
    text: "Ideal Plants Location",
    type: "checkbox",
    subOptions: [
      {
        id: 1,
        text: "Windowsill Plants",
        query: "location=windowsill",
      },
      {
        id: 2,
        text: "Shaded Balconies",
        query: "location=shaded-balconies",
      },
      {
        id: 3,
        text: "Sunny Balconies",
        query: "location=sunny-balconies",
      },
      {
        id: 4,
        text: "Living Room Tables",
        query: "location=living-room-tables",
      },
      {
        id: 5,
        text: "Office Desk Plants",
        query: "location=office-desk",
      },
      {
        id: 6,
        text: "Offices premises plants",
        query: "location=office-premises",
      },
    ],
  },
  {
    id: 3,
    text: "Light",
    type: "checkbox",
    subOptions: [
      {
        id: 1,
        text: "Low Light",
        query: "light=low light",
      },
      {
        id: 2,
        text: "Bright Indirect Light",
        query: "light=bright indirect light",
      },
      {
        id: 3,
        text: "Direct Light",
        query: "light=direct light",
      },
    ],
  },
  {
    id: 4,
    text: "Pot Size",
    type: "checkbox",
    subOptions: [
      {
        id: 1,
        text: "Small",
        query: "size=small",
      },
      {
        id: 2,
        text: "Medium",
        query: "size=medium",
      },
      {
        id: 3,
        text: "Large",
        query: "size=large",
      },
    ],
  },
  {
    id: 5,
    text: "Water Schedule",
    type: "checkbox",
    subOptions: [
      {
        id: 1,
        text: "Twice a week",
        query: "livingConditions.content=twice a week",
      },
      {
        id: 2,
        text: "Every alternate day",
        query: "livingConditions.content=every alternate day",
      },
      {
        id: 3,
        text: "Once a day",
        query: "livingConditions.content=once a day",
      },
      {
        id: 4,
        text: "Once a week",
        query: "livingConditions.content=once a week",
      },
    ],
  },
];

export const reviewsSortOptions = [
  {
    id: 1,
    query: "?sort=createdAt:desc",
    text: "Newest",
  },
  {
    id: 2,
    query: "?sort=rating:desc",
    text: "Highest rating",
  },
  {
    id: 3,
    query: "?sort=rating:asc",
    text: "Lowest rating",
  },
  {
    id: 4,
    query: "?sort=like:desc",
    text: "Most likes",
  },
  {
    id: 5,
    query: "?sort=dislike:desc",
    text: "Most dislikes",
  },
];

export const reviewsFilterOptions = [
  {
    id: 1,
    text: "Rating",
    type: "checkbox",
    subOptions: [
      {
        id: 1,
        text: "1",
        query: "rating=1",
      },

      {
        id: 2,
        text: "2",
        query: "rating=2",
      },
      {
        id: 3,
        text: "3",
        query: "rating=3",
      },
      {
        id: 4,
        text: "4",
        query: "rating=4",
      },
      {
        id: 5,
        text: "5",
        query: "rating=5",
      },
    ],
  },
  {
    id: 2,
    text: "Include images",
    type: "radio",
    subOptions: [
      {
        id: 1,
        text: "Yes",
        query: "images=yes",
      },
      {
        id: 2,
        text: "No",
        query: "images=no",
      },
    ],
  },
];

export const ordersSortOptions = [
  {
    id: 1,
    query: "?sort=createdAt:desc",
    text: "Newest",
  },
  {
    id: 2,
    query: "?sort=payment:desc",
    text: "Highest payment",
  },
  {
    id: 3,
    query: "?sort=payment:asc",
    text: "Lowest payment",
  },
];

export const ordersFilterOptions = [
  {
    id: 1,
    text: "Status",
    type: "checkbox",
    subOptions: [
      {
        id: 1,
        text: "Waiting for payment",
        query: "status=waiting-for-payment",
      },

      {
        id: 2,
        text: "Packed",
        query: "status=packed",
      },
      {
        id: 3,
        text: "In transit",
        query: "status=in-transit",
      },
      {
        id: 4,
        text: "Delivered",
        query: "status=delivered",
      },
      {
        id: 5,
        text: "Cancelled",
        query: "status=cancelled",
      },
    ],
  },
];

export const plantNotes = [
  {
    id: 1,
    text: "Each plant is unique; size and shape fluctuate by season so all measurements are shown as a range",
  },
  {
    id: 2,
    text: 'Small plant measures between 14-18" tall from the soil line to the top of the foliage Arrives in a nursery grow pot nestled in your planter choice',
  },
  {
    id: 3,
    text: "Arrives in a nursery grow pot nestled in your planter choice",
  },
];

export const orderHistory = [
  {
    id: 1,
    user: {
      username: "Hanemo",
    },
    notification: [
      {
        id: 1,

        text: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Enim, aliquid? Aliquam totam inventore dicta amet, illum quidem sit, eaque adipisci quos earum minus. Fugiat totam iste deleniti, quis provident ab.",
        createdAt: "2022-08-12 12:00",
      },
      {
        id: 2,
        text: "Eaque adipisci quos earum minus.Fugiat totam iste deleniti, quis provident ab.",
        createdAt: "2022-08-12 12:00",
      },
    ],
    orders: [
      {
        image: "/images/fittonia-green-plant.png",
        title: "Castus Meow Meow",
        price: 45,
        quantity: 2,
        discount: 5,
      },
      {
        image: "/images/fittonia-green-plant.png",
        title: "Lovely Rossy Dolly",
        price: 70,
        quantity: 4,
        discount: 15,
      },
    ],
    address: "168B Bai Say Street ward 1 district 6 Ho Chi Minh city",
    phoneNumber: "0766901516",
    receiverName: "Huynh Vi Ha",
    paymentMethod: "COD",
    paymentStatus: "Successful",
    status: "Waiting for payment",
    receivedDate: "2022-10-01",
    createdAt: "2022-09-29",
    estimatedDeliveryDate: "2022-09-30",
    deliveryMethod: "Delivery by Plantme",
    deliveryCharges: 20,
  },
  {
    id: 2,
    user: {
      username: "Damian",
    },
    orders: [
      {
        image: "/images/fittonia-green-plant.png",
        title: "Super Cute Plant Ever",
        price: 90,
        quantity: 1,
        discount: 10,
      },
    ],
    address: "168B Bai Say Street ward 1 district 6 Ho Chi Minh city",
    phoneNumber: "0766901516",
    receiverName: "Huynh Vi Ha",
    totalPayment: 45,
    shipFee: 20,
    discount: 30,
    netPayment: 26,
    paymentMethod: "COD",
    status: "Delivered",
    receivedDate: "2022-09-02",
    createdAt: "2022-08-31",
  },
];

export const livingConditions = {};
