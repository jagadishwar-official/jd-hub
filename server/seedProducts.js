
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Product = require("./models/Product");

dotenv.config();

// Existing 25 popular products
const popularProducts = [
    ["Smartphone", "TechPro", "Electronics", 24999, 29999, 4.8, "699122"],
    ["Laptop", "NovaTech", "Electronics", 54999, 64999, 4.7, "18105"],
    ["Wireless Headphones", "SoundMax", "Electronics", 2999, 3999, 4.6, "3394650"],
    ["Smart Watch", "TimeX", "Electronics", 4999, 6499, 4.5, "437037"],
    ["Digital Camera", "PixelPro", "Electronics", 32999, 37999, 4.8, "90946"],
    ["Classic T-Shirt", "UrbanWear", "Fashion", 699, 999, 4.4, "428338"],
    ["Running Sneakers", "FastStep", "Fashion", 2499, 3299, 4.7, "2529148"],
    ["Leather Handbag", "LuxeCarry", "Fashion", 3499, 4499, 4.6, "1152077"],
    ["Denim Jacket", "BlueStreet", "Fashion", 2199, 2999, 4.5, "1124465"],
    ["Sunglasses", "SunStyle", "Fashion", 1299, 1799, 4.3, "701877"],
    ["Table Lamp", "HomeGlow", "Home & Living", 1599, 2199, 4.5, "1112598"],
    ["Modern Sofa", "ComfortNest", "Home & Living", 24999, 29999, 4.8, "1866149"],
    ["Accent Chair", "CasaLiving", "Home & Living", 8999, 10999, 4.6, "276583"],
    ["Indoor Plant", "GreenSpace", "Home & Living", 599, 899, 4.4, "1084199"],
    ["Coffee Table", "WoodCraft", "Home & Living", 4999, 6499, 4.7, "1571460"],
    ["Skincare Set", "GlowCare", "Beauty", 1499, 1999, 4.7, "3735218"],
    ["Luxury Perfume", "AromaLux", "Beauty", 2799, 3499, 4.8, "965989"],
    ["Face Cream", "PureSkin", "Beauty", 799, 1099, 4.4, "3735149"],
    ["Makeup Collection", "ColorMuse", "Beauty", 1899, 2499, 4.6, "2533266"],
    ["Beauty Essentials", "DailyGlow", "Beauty", 999, 1399, 4.5, "3762879"],
    ["Football", "PlayZone", "Sports", 899, 1199, 4.5, "47730"],
    ["Dumbbell Set", "FitForce", "Sports", 1999, 2699, 4.7, "949131"],
    ["Sports Shoes", "RunFlex", "Sports", 2999, 3999, 4.6, "1464625"],
    ["Yoga Mat", "ZenFit", "Sports", 799, 1099, 4.4, "4056723"],
    ["Travel Backpack", "TrailPack", "Sports", 1799, 2399, 4.6, "2905238"]
];

// 175 additional products
const moreProducts = [
    ["Apple iPhone 16", "Apple", "Mobiles", 69999, 79999, 4.5, "159393"],
    ["Samsung Galaxy S25", "Samsung", "Mobiles", 74999, 84999, 4.7, "47261"],
    ["OnePlus 13", "OnePlus", "Mobiles", 64999, 72999, 4.6, "404280"],
    ["Redmi Note 14", "Redmi", "Mobiles", 18999, 22999, 4.4, "699122"],
    ["Vivo V40", "Vivo", "Mobiles", 34999, 39999, 4.5, "699122"],
    ["Realme 14 Pro", "Realme", "Mobiles", 27999, 32999, 4.3, "699122"],
    ["Google Pixel 9", "Google", "Mobiles", 79999, 89999, 4.7, "699122"],
    ["iPhone 15", "Apple", "Mobiles", 59999, 69999, 4.6, "699122"],
    ["Samsung Galaxy A55", "Samsung", "Mobiles", 28999, 34999, 4.4, "699122"],
    ["Nothing Phone 2", "Nothing", "Mobiles", 32999, 37999, 4.5, "699122"],
    ["Bluetooth Speaker", "JBL", "Electronics", 2499, 3499, 4.5, "63703"],
    ["Gaming Mouse", "Logitech", "Electronics", 1499, 1999, 4.6, "2115257"],
    ["Mechanical Keyboard", "Redragon", "Electronics", 2999, 3999, 4.7, "841228"],
    ["Tablet", "Samsung", "Electronics", 24999, 29999, 4.5, "1334597"],
    ["Power Bank", "Mi", "Electronics", 1299, 1799, 4.3, "4526407"],
    ["Wireless Earbuds", "boAt", "Electronics", 1799, 2499, 4.4, "8534088"],
    ["Monitor", "Acer", "Electronics", 12999, 15999, 4.6, "1714208"],
    ["Webcam", "Logitech", "Electronics", 3499, 4499, 4.3, "8098265"],
    ["External SSD", "Samsung", "Electronics", 5999, 7499, 4.7, "4792525"],
    ["Gaming Headset", "HyperX", "Electronics", 3999, 4999, 4.5, "3945683"],
    ["Casual Shirt", "Roadster", "Fashion", 899, 1299, 4.3, "297933"],
    ["Slim Fit Jeans", "Levis", "Fashion", 1999, 2799, 4.5, "1082529"],
    ["Women's Kurti", "Biba", "Fashion", 1299, 1799, 4.4, "6311392"],
    ["Men's Hoodie", "H&M", "Fashion", 1599, 2199, 4.5, "6311392"],
    ["Women's Handbag", "Lavie", "Fashion", 1899, 2499, 4.6, "1152077"],
    ["Running Jacket", "Nike", "Fashion", 2999, 3999, 4.5, "1124465"],
    ["Formal Shoes", "Bata", "Fashion", 2499, 3299, 4.4, "2529148"],
    ["Cotton Saree", "Aurelia", "Fashion", 1799, 2399, 4.5, "6311392"],
    ["Women's Sneakers", "Puma", "Fashion", 2799, 3599, 4.6, "2529148"],
    ["Winter Sweater", "Zara", "Fashion", 2199, 2999, 4.4, "6311392"],
    ["Bedside Table", "Ikea", "Home & Living", 3499, 4499, 4.5, "1571460"],
    ["Office Chair", "Green Soul", "Home & Living", 7999, 9999, 4.6, "276583"],
    ["Wall Clock", "Ajanta", "Home & Living", 899, 1299, 4.3, "1112598"],
    ["Floor Lamp", "Home Centre", "Home & Living", 2499, 3299, 4.5, "1112598"],
    ["Decorative Vase", "Westside", "Home & Living", 699, 999, 4.4, "1571460"],
    ["Bookshelf", "Ikea", "Home & Living", 5999, 7499, 4.7, "1866149"],
    ["Dining Table", "Urban Ladder", "Home & Living", 14999, 18999, 4.6, "1571460"],
    ["Bedsheet Set", "Spaces", "Home & Living", 1299, 1799, 4.4, "1866149"],
    ["Storage Organizer", "Nilkamal", "Home & Living", 999, 1399, 4.3, "276583"],
    ["Cushion Set", "Home Centre", "Home & Living", 799, 1099, 4.5, "1866149"],
    ["Sunscreen SPF 50", "Minimalist", "Beauty", 499, 699, 4.5, "3735149"],
    ["Vitamin C Serum", "Mamaearth", "Beauty", 599, 799, 4.6, "3735218"],
    ["Hair Shampoo", "L'Oreal", "Beauty", 399, 549, 4.4, "3762879"],
    ["Body Lotion", "Nivea", "Beauty", 299, 399, 4.3, "3735149"],
    ["Lipstick Set", "Maybelline", "Beauty", 899, 1199, 4.5, "2533266"],
    ["Face Wash", "Cetaphil", "Beauty", 349, 499, 4.4, "3735149"],
    ["Hair Dryer", "Philips", "Beauty", 1499, 1999, 4.5, "3762879"],
    ["Makeup Brush Set", "Swiss Beauty", "Beauty", 599, 899, 4.3, "2533266"],
    ["Night Cream", "Olay", "Beauty", 799, 1099, 4.6, "3735218"],
    ["Aloe Vera Gel", "Patanjali", "Beauty", 199, 299, 4.2, "3762879"],
    ["Cricket Bat", "SG", "Sports", 2499, 3299, 4.6, "47730"],
    ["Badminton Racket", "Yonex", "Sports", 1799, 2499, 4.7, "949131"],
    ["Cycling Helmet", "Decathlon", "Sports", 1299, 1799, 4.5, "helmet"],
    ["Skipping Rope", "Fitkit", "Sports", 299, 499, 4.3, "949131"],
    ["Resistance Bands", "Boldfit", "Sports", 499, 699, 4.5, "4056723"],
    ["Tennis Racket", "Wilson", "Sports", 3499, 4499, 4.6, "47730"],
    ["Gym Gloves", "Nivia", "Sports", 399, 599, 4.3, "949131"],
    ["Basketball", "Spalding", "Sports", 1499, 1999, 4.5, "47730"],
    ["Sports Water Bottle", "Milton", "Sports", 499, 699, 4.4, "4056723"],
    ["Trekking Shoes", "Quechua", "Sports", 2999, 3999, 4.6, "1464625"],
    ["Wireless Charger", "Anker", "Electronics", 1999, 2699, 4.5, "4526407"],
    ["USB-C Hub", "Portronics", "Electronics", 999, 1499, 4.3, "4792525"],
    ["Smart Bulb", "Philips", "Electronics", 799, 1099, 4.4, "1112598"],
    ["Tripod Stand", "Digitek", "Electronics", 1299, 1799, 4.5, "90946"],
    ["Portable Projector", "Epson", "Electronics", 18999, 22999, 4.6, "1714208"],
    ["Air Fryer", "Prestige", "Home & Living", 4999, 6499, 4.5, "276583"],
    ["Electric Kettle", "Havells", "Home & Living", 1299, 1799, 4.4, "276583"],
    ["Mixer Grinder", "Butterfly", "Home & Living", 2499, 3299, 4.5, "276583"],
    ["Cookware Set", "Pigeon", "Home & Living", 1999, 2699, 4.4, "1571460"],
    ["Vacuum Cleaner", "Eureka Forbes", "Home & Living", 5999, 7499, 4.6, "276583"],
    ["Bluetooth Neckband", "OnePlus", "Electronics", 1299, 1799, 4.4, "3394650"],
    ["Smart Fitness Band", "Noise", "Electronics", 1999, 2699, 4.3, "437037"],
    ["Leather Wallet", "Wildcraft", "Fashion", 799, 1199, 4.5, "1152077"],
    ["Travel Duffel Bag", "American Tourister", "Fashion", 1499, 1999, 4.4, "2905238"],
    ["Wi-Fi Router", "TP-Link", "Electronics", 1899, 2499, 4.4, "163143"],

    // 100 new products for Toys & Games, Books and Grocery
    ["Building Blocks Set", "PlayBuild", "Toys & Games", 1299, 1799, 4.6, "47730"],
    ["Remote Control Racing Car", "TurboTrack", "Toys & Games", 1899, 2499, 4.5, "47730"],
    ["Wooden Jigsaw Puzzle", "BrainWood", "Toys & Games", 499, 699, 4.4, "949131"],
    ["Family Board Game", "FunSquare", "Toys & Games", 799, 1099, 4.5, "47730"],
    ["Kids Art and Craft Kit", "ColorNest", "Toys & Games", 599, 899, 4.3, "4056723"],
    ["Dinosaur Figure Set", "DinoWorld", "Toys & Games", 699, 999, 4.4, "47730"],
    ["Mini Kitchen Play Set", "TinyChef", "Toys & Games", 1499, 1999, 4.5, "276583"],
    ["Soft Teddy Bear", "CuddleCo", "Toys & Games", 799, 1199, 4.7, "1084199"],
    ["Magnetic Building Tiles", "MagnaFun", "Toys & Games", 1799, 2299, 4.6, "47730"],
    ["Kids Bowling Set", "PlayZone", "Toys & Games", 499, 699, 4.2, "47730"],
    ["Wooden Shape Sorter", "LittleLearner", "Toys & Games", 649, 899, 4.5, "949131"],
    ["Beginner Science Kit", "CuriousMinds", "Toys & Games", 999, 1399, 4.6, "4056723"],
    ["Toy Train Set", "RailRider", "Toys & Games", 1599, 2199, 4.4, "47730"],
    ["Watercolor Painting Set", "ArtBuddy", "Toys & Games", 399, 599, 4.3, "2533266"],
    ["Foam Dart Blaster", "ActionPlay", "Toys & Games", 899, 1299, 4.2, "47730"],
    ["Kids Doctor Play Kit", "HappyHelpers", "Toys & Games", 699, 999, 4.4, "276583"],
    ["Stacking Ring Toy", "TinySteps", "Toys & Games", 349, 499, 4.5, "1084199"],
    ["Memory Matching Game", "MindSpark", "Toys & Games", 449, 649, 4.3, "949131"],
    ["Remote Control Helicopter", "SkyPilot", "Toys & Games", 2499, 3199, 4.4, "47730"],
    ["Doll House Play Set", "DreamHome", "Toys & Games", 2199, 2799, 4.6, "276583"],
    ["Kids Basketball Hoop", "MiniHoops", "Toys & Games", 1299, 1799, 4.5, "47730"],
    ["Plastic Building Bricks", "BuildIt", "Toys & Games", 999, 1399, 4.4, "47730"],
    ["Number Learning Puzzle", "EduPlay", "Toys & Games", 299, 449, 4.5, "949131"],
    ["Kids Musical Keyboard", "TuneTime", "Toys & Games", 1799, 2299, 4.4, "437037"],
    ["Bubble Machine Toy", "BubbleFun", "Toys & Games", 599, 899, 4.2, "1084199"],
    ["Play Tent for Kids", "LittleCampers", "Toys & Games", 1499, 1999, 4.5, "2905238"],
    ["Wooden Chess Set", "ClassicMoves", "Toys & Games", 899, 1299, 4.7, "47730"],
    ["Carrom Board", "StrikeZone", "Toys & Games", 1699, 2199, 4.6, "47730"],
    ["Toy Tool Workbench", "JuniorBuilder", "Toys & Games", 1999, 2599, 4.4, "276583"],
    ["Plush Animal Set", "SoftPals", "Toys & Games", 749, 999, 4.5, "1084199"],
    ["Kids Scooter", "MoveAlong", "Toys & Games", 2499, 3299, 4.5, "1464625"],
    ["Flying Disc Set", "OutdoorJoy", "Toys & Games", 299, 449, 4.2, "47730"],
    ["3D Crystal Puzzle", "PuzzleCraft", "Toys & Games", 699, 999, 4.4, "949131"],
    ["Tabletop Foosball Game", "GoalTime", "Toys & Games", 1899, 2499, 4.6, "47730"],
    ["JavaScript for Beginners", "CodeLeaf", "Books", 599, 799, 4.7, "18105"],
    ["Learning React Step by Step", "DevShelf", "Books", 749, 999, 4.8, "18105"],
    ["Node.js in Practice", "BackendPress", "Books", 699, 899, 4.6, "18105"],
    ["Python Programming Basics", "ByteBooks", "Books", 549, 749, 4.6, "18105"],
    ["MongoDB Essentials", "DataPath", "Books", 649, 849, 4.5, "18105"],
    ["Clean Code Guide", "CraftedCode", "Books", 899, 1199, 4.8, "18105"],
    ["The Silent Patient", "PageTurner", "Books", 299, 399, 4.4, "18105"],
    ["The Alchemist", "StoryHouse", "Books", 249, 350, 4.6, "18105"],
    ["Atomic Habits", "BrightReads", "Books", 399, 599, 4.7, "18105"],
    ["The Psychology of Money", "FinRead", "Books", 349, 499, 4.6, "18105"],
    ["Mystery at Midnight", "NovelNest", "Books", 279, 399, 4.3, "18105"],
    ["Romance in the Rain", "HeartPages", "Books", 299, 449, 4.2, "18105"],
    ["Short Stories Collection", "FableWorks", "Books", 249, 349, 4.4, "18105"],
    ["World History for Students", "LearnWell", "Books", 499, 699, 4.5, "18105"],
    ["Basic Science Encyclopedia", "KnowledgeTree", "Books", 599, 799, 4.6, "18105"],
    ["Mathematics Practice Book", "StudyPoint", "Books", 299, 399, 4.4, "18105"],
    ["English Grammar Workbook", "WordWise", "Books", 249, 349, 4.5, "18105"],
    ["Geography Atlas", "MapMakers", "Books", 399, 549, 4.3, "18105"],
    ["My First Picture Book", "TinyTales", "Books", 199, 299, 4.7, "18105"],
    ["Bedtime Stories for Kids", "LittleReaders", "Books", 249, 349, 4.6, "18105"],
    ["ABC and Numbers Workbook", "EarlySteps", "Books", 179, 249, 4.5, "18105"],
    ["Animal Stories for Children", "WonderPages", "Books", 229, 329, 4.6, "18105"],
    ["The Jungle Adventure", "KidsCorner", "Books", 199, 299, 4.4, "18105"],
    ["Drawing for Young Artists", "ArtPages", "Books", 299, 449, 4.5, "18105"],
    ["Moral Stories Collection", "GoodTales", "Books", 219, 319, 4.6, "18105"],
    ["General Knowledge 2026", "ExamReady", "Books", 349, 499, 4.4, "18105"],
    ["Competitive Exam Reasoning", "PrepMate", "Books", 399, 549, 4.5, "18105"],
    ["Indian Constitution Made Easy", "CivicReads", "Books", 449, 599, 4.5, "18105"],
    ["Gardening at Home", "GreenPages", "Books", 329, 449, 4.3, "18105"],
    ["Healthy Cooking Handbook", "KitchenReads", "Books", 399, 549, 4.4, "18105"],
    ["Personal Finance Basics", "MoneyWise", "Books", 379, 499, 4.6, "18105"],
    ["Introduction to Web Design", "PixelPress", "Books", 599, 799, 4.5, "18105"],
    ["Data Structures Made Simple", "AlgoBooks", "Books", 699, 899, 4.7, "18105"],
    ["Premium Basmati Rice 5kg", "DailyHarvest", "Grocery", 599, 749, 4.6, "276583"],
    ["Sona Masoori Rice 5kg", "GrainBasket", "Grocery", 349, 429, 4.5, "276583"],
    ["Whole Wheat Atta 5kg", "FreshMill", "Grocery", 279, 349, 4.5, "276583"],
    ["Toor Dal 1kg", "FarmChoice", "Grocery", 159, 199, 4.4, "276583"],
    ["Moong Dal 1kg", "GreenGrain", "Grocery", 139, 179, 4.4, "276583"],
    ["Chana Dal 1kg", "HarvestGold", "Grocery", 119, 149, 4.3, "276583"],
    ["Sunflower Oil 1L", "PureDrop", "Grocery", 149, 179, 4.4, "276583"],
    ["Groundnut Oil 1L", "OilGarden", "Grocery", 189, 229, 4.5, "276583"],
    ["Iodized Salt 1kg", "CrystalKitchen", "Grocery", 25, 30, 4.3, "276583"],
    ["White Sugar 1kg", "SweetFields", "Grocery", 49, 59, 4.2, "276583"],
    ["Organic Jaggery 500g", "NatureSweet", "Grocery", 79, 99, 4.5, "276583"],
    ["Breakfast Oats 1kg", "MorningBowl", "Grocery", 179, 229, 4.6, "276583"],
    ["Corn Flakes 500g", "CrispyStart", "Grocery", 149, 189, 4.4, "276583"],
    ["Mixed Fruit Jam 500g", "FruitSpread", "Grocery", 129, 159, 4.3, "276583"],
    ["Crunchy Peanut Butter 1kg", "NutriSpread", "Grocery", 299, 379, 4.6, "276583"],
    ["Roasted Almonds 200g", "NutHouse", "Grocery", 249, 299, 4.7, "276583"],
    ["Cashew Nuts 200g", "RoyalNuts", "Grocery", 229, 279, 4.6, "276583"],
    ["Salted Potato Chips Pack", "SnackTime", "Grocery", 20, 25, 4.2, "276583"],
    ["Masala Snack Mix 200g", "SpiceCrunch", "Grocery", 59, 79, 4.3, "276583"],
    ["Chocolate Cookies 300g", "BakeTreat", "Grocery", 89, 119, 4.5, "276583"],
    ["Digestive Biscuits 400g", "DailyBakes", "Grocery", 55, 69, 4.4, "276583"],
    ["Instant Noodles Pack", "QuickBite", "Grocery", 60, 75, 4.3, "276583"],
    ["Tomato Ketchup 500g", "RedSpoon", "Grocery", 99, 129, 4.4, "276583"],
    ["Green Tea Bags 25 Pack", "LeafCup", "Grocery", 149, 199, 4.5, "276583"],
    ["Ground Coffee 200g", "BeanStreet", "Grocery", 229, 279, 4.6, "276583"],
    ["Orange Juice 1L", "CitrusSip", "Grocery", 119, 149, 4.4, "276583"],
    ["Mango Drink 1L", "TropiFresh", "Grocery", 89, 109, 4.3, "276583"],
    ["Packaged Drinking Water 1L", "ClearSpring", "Grocery", 20, 25, 4.2, "276583"],
    ["UHT Toned Milk 1L", "FarmDairy", "Grocery", 68, 75, 4.5, "276583"],
    ["Paneer 200g", "DairyFresh", "Grocery", 89, 109, 4.5, "276583"],
    ["Butter 200g", "DairyGold", "Grocery", 55, 69, 4.4, "276583"],
    ["Whole Wheat Pasta 500g", "PastaHouse", "Grocery", 79, 99, 4.3, "276583"],
    ["Mixed Pickle 500g", "Homestyle", "Grocery", 99, 129, 4.4, "276583"]
];

// Keep the existing images for popular products
const popularProductList = popularProducts.map((item) => ({
    name: item[0],
    brand: item[1],
    category: item[2],
    price: item[3],
    originalPrice: item[4],
    rating: item[5],
    description: `${item[0]} from ${item[1]}. Designed for everyday use.`,
    images: [
        `https://images.pexels.com/photos/${item[6]}/pexels-photo-${item[6]}.jpeg?auto=compress&cs=tinysrgb&w=1200`
    ],
    stock: 25,
    colors: [],
    sizes: []
}));

// Product images
const productImages = {
    "Toys & Games": "https://images.unsplash.com/photo-1545558014-8692077e9b5c?auto=format&fit=crop&w=3000&q=85",
    "Books": "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=3000&q=85",
    "Grocery": "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=3000&q=85"
};

// Add images for the remaining products
const moreProductList = moreProducts.map((item) => ({
    name: item[0],
    brand: item[1],
    category: item[2],
    price: item[3],
    originalPrice: item[4],
    rating: item[5],
    description: `${item[0]} from ${item[1]}. Designed for everyday use.`,
    images: [
        item[7] || `https://images.pexels.com/photos/${item[6]}/pexels-photo-${item[6]}.jpeg?auto=compress&cs=tinysrgb&w=1600`
    ],
    stock: 25,
    colors: [],
    sizes: []
}));
const allProducts = [...popularProductList, ...moreProductList];

const seedProducts = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            dbName: "jd_hub"
        });

        console.log("MongoDB Connected");
        console.log("Popular products:", popularProductList.length);
        console.log("Additional products:", moreProductList.length);

        if (allProducts.length !== 200) {
            throw new Error("Product count should be exactly 200");
        }

        const operations = allProducts.map((product) => ({
            updateOne: {
                filter: {
                    name: product.name,
                    brand: product.brand
                },
                update: {
                    $set: product
                },
                upsert: true
            }
        }));

        await Product.bulkWrite(operations);

        const count = await Product.countDocuments();

        console.log("Products saved successfully");
        console.log("Total products in database:", count);

    } catch (error) {
        console.log("Product seeding failed:", error.message);
    } finally {
        await mongoose.connection.close();
    }
};

seedProducts();
