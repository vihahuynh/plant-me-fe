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
    query: "?sort=name:des",
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
        query: "light=low-light",
      },
      {
        id: 2,
        text: "Bright Indirect Light",
        query: "light=bright-indirect-light",
      },
      {
        id: 3,
        text: "Direct Sunlight",
        query: "light=direct-sunlight",
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
        query: "water-schedule=twice-a-week",
      },
      {
        id: 2,
        text: "Every alternate day",
        query: "water-schedule=every-alternate-day",
      },
      {
        id: 3,
        text: "Once a day",
        query: "water-schedule=once-a-day",
      },
      {
        id: 4,
        text: "Once a week",
        query: "water-schedule=once-a-week",
      },
    ],
  },
];

export const reviewsSortOptions = [
  {
    id: 1,
    query: "?sort=createdAt:des",
    text: "Newest",
  },
  {
    id: 2,
    query: "?sort=rating:des",
    text: "Highest rating",
  },
  {
    id: 3,
    query: "?sort=rating:asc",
    text: "Lowest rating",
  },
  {
    id: 4,
    query: "?sort=like:des",
    text: "Most likes",
  },
  {
    id: 5,
    query: "?sort=dislike:des",
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
    subOptions: [
      {
        id: 1,
        text: "Yes",
        query: "image=yes",
      },
      {
        id: 2,
        text: "No",
        query: "image=no",
      },
    ],
  },
];

export const plantDetails = {
  id: 1,
  images: [
    { id: 1, imageUrl: "/images/details/jade-plant-mini.png" },
    { id: 2, imageUrl: "/images/details/jade-plant-mini-2.png" },
    { id: 3, imageUrl: "/images/details/jade-plant-mini-3.png" },
    { id: 4, imageUrl: "/images/details/jade-plant-mini-4.png" },
    { id: 5, imageUrl: "/images/details/jade-plant-mini-5.png" },
    { id: 6, imageUrl: "/images/details/jade-plant-mini-6.png" },
  ],
  title: "Jade Plant Mini",
  size: ["small", "medium"],
  colors: ["salmon", "blue", "green"],
  price: 399,
  salePercent: 25,
  rating: 4.3,
  ratingCount: 173,
  reviewCount: 33,
  soldCount: 345,
  plantCare: [
    { id: 1, title: "Light", text: "Bright indirect sunlight" },
    { id: 2, title: "Watering", text: "Water twice a week" },
    { id: 3, title: "Where to grow", text: "Bright indoors" },
    { id: 4, title: "Maintenace", text: "Temperamental" },
    { id: 5, title: "Special Feature", text: "Air purifying" },
  ],
  about:
    "Are you a sucker for succulents? The Crassula Green Mini will be your dream plant kid. One of the easiest houseplants to look after, the Crassula Green Mini boasts a lush foliage which beautifies any room. Also considered lucky as per Feng Shui for its coin like round plump leaves, so go on, bring some green home, the luck just tags along for free.",
};

export const reviews = [
  {
    id: 1,
    username: "nemohuynh",
    rating: 5,
    title: "Good plant",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    createdAt: "10-08-2022",
    images: [],
    avatarUrl: null,
    like: 1,
    dislike: 0,
  },
  {
    id: 2,
    username: "damiangrey",
    rating: 5,
    title: "I love this plant, thanks.",
    content:
      "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    createdAt: "12-07-2022",
    images: [],
    avatarUrl: null,
    like: 0,
    dislike: 0,
  },
  {
    id: 3,
    username: "nhinhu",
    rating: 4,
    title: "Just Ok",
    content:
      "Neque convallis a cras semper auctor neque. Id faucibus nisl tincidunt eget. Nulla malesuada pellentesque elit eget. Sit amet nisl suscipit adipiscing. Leo in vitae turpis massa sed elementum tempus egestas sed. Dignissim suspendisse in est ante in nibh mauris cursus. Lectus nulla at volutpat diam ut venenatis tellus. Erat pellentesque adipiscing commodo elit. Lorem mollis aliquam ut porttitor leo a diam. Tortor at risus viverra adipiscing at.",
    createdAt: "01-07-2022",
    images: [],
    avatarUrl:
      "https://img.lovepik.com/free_png/28/76/02/62e58PIC8PbC75cMsYe9c_PIC2018.png_300.png",
    like: 1,
    dislike: 3,
  },
  {
    id: 4,
    username: "viha huynh",
    rating: 5,
    title: "Lorem ipsum dolor sit amet",
    content:
      "Non tellus orci ac auctor. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Enim nulla aliquet porttitor lacus luctus accumsan tortor posuere ac. Vestibulum sed arcu non odio euismod lacinia at quis. Pretium fusce id velit ut tortor pretium. Massa ultricies mi quis hendrerit dolor magna eget. Euismod lacinia at quis risus sed vulputate odio. Massa tincidunt dui ut ornare lectus sit amet est. Eget magna fermentum iaculis eu non diam phasellus. Cursus mattis molestie a iaculis. Vulputate odio ut enim blandit volutpat maecenas volutpat blandit. Vitae elementum curabitur vitae nunc sed velit.",
    createdAt: "18-07-2022",
    images: [],
    avatarUrl: null,
    like: 4,
    dislike: 1,
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
