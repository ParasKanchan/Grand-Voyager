const sampleListings = [
    {
      "title": "Cozy Mountain Cabin",
      "description": "A peaceful retreat in the heart of the mountains. Perfect for nature lovers.",
      "image": "https://example.com/mountain-cabin.jpg",
      "price": 150,
      "location": "Aspen, Colorado",
      "country": "USA"
    },
    {
      "title": "Seaside Beach House",
      "description": "Wake up to the sound of waves in this beautiful beachside home.",
      "image": "https://example.com/beach-house.jpg",
      "price": 200,
      "location": "Malibu, California",
      "country": "USA"
    },
    {
      "title": "Luxury Apartment in Paris",
      "description": "A stylish and modern apartment in the heart of Paris, with an amazing Eiffel Tower view.",
      "image": "",
      "price": 300,
      "location": "Paris",
      "country": "France"
    },
    {
      "title": "Traditional Japanese Ryokan",
      "description": "Experience authentic Japanese hospitality in this serene ryokan with hot springs.",
      "image": "https://example.com/japanese-ryokan.jpg",
      "price": 180,
      "location": "Kyoto",
      "country": "Japan"
    },
    {
      "title": "Safari Lodge in Kenya",
      "description": "An exotic safari lodge with breathtaking wildlife views and luxurious amenities.",
      "image": "",
      "price": 250,
      "location": "Maasai Mara",
      "country": "Kenya"
    },
    
      {
          "title": "Cozy Mountain Cabin",
          "description": "A peaceful retreat in the mountains with a breathtaking view.",
          "image": "https://i0.wp.com/picjumbo.com/wp-content/uploads/beautiful-nature-mountain-scenery-with-flowers-free-photo.jpg?w=2210&quality=70",
          "price": 120,
          "location": "Aspen, Colorado",
          "country": "USA",
          "reviews": []
      },
      {
          "title": "Luxury Beachfront Villa",
          "description": "A stunning villa with private beach access.",
          "image": "https://i0.wp.com/picjumbo.com/wp-content/uploads/beautiful-nature-mountain-scenery-with-flowers-free-photo.jpg?w=2210&quality=70",
          "price": 450,
          "location": "Malibu, California",
          "country": "USA",
          "reviews": []
      },
      {
          "title": "Historic City Apartment",
          "description": "An elegant apartment in the heart of Rome.",
          "image": "https://i0.wp.com/picjumbo.com/wp-content/uploads/beautiful-nature-mountain-scenery-with-flowers-free-photo.jpg?w=2210&quality=70",
          "price": 200,
          "location": "Rome",
          "country": "Italy",
          "reviews": []
      },
      {
          "title": "Lakeside Cottage",
          "description": "A charming cottage with direct lake access.",
          "image": "https://i0.wp.com/picjumbo.com/wp-content/uploads/beautiful-nature-mountain-scenery-with-flowers-free-photo.jpg?w=2210&quality=70",
          "price": 150,
          "location": "Lake Tahoe, Nevada",
          "country": "USA",
          "reviews": []
      },
      {
          "title": "Jungle Treehouse",
          "description": "A unique treehouse in the middle of the rainforest.",
          "image": "https://i0.wp.com/picjumbo.com/wp-content/uploads/beautiful-nature-mountain-scenery-with-flowers-free-photo.jpg?w=2210&quality=70",
          "price": 180,
          "location": "Amazon Rainforest",
          "country": "Brazil",
          "reviews": []
      },
      {
          "title": "Urban Loft",
          "description": "A modern loft in the heart of downtown Manhattan.",
          "image": "https://i0.wp.com/picjumbo.com/wp-content/uploads/beautiful-nature-mountain-scenery-with-flowers-free-photo.jpg?w=2210&quality=70",
          "price": 300,
          "location": "New York City, New York",
          "country": "USA",
          "reviews": []
      },
      {
          "title": "Desert Glamping Site",
          "description": "A luxury tent experience in the vast Sahara.",
          "image": "https://i0.wp.com/picjumbo.com/wp-content/uploads/beautiful-nature-mountain-scenery-with-flowers-free-photo.jpg?w=2210&quality=70",
          "price": 100,
          "location": "Sahara Desert",
          "country": "Morocco",
          "reviews": []
      },
      {
          "title": "Secluded Mountain Lodge",
          "description": "A lodge perfect for nature lovers and hikers.",
          "image": "https://i0.wp.com/picjumbo.com/wp-content/uploads/beautiful-nature-mountain-scenery-with-flowers-free-photo.jpg?w=2210&quality=70",
          "price": 170,
          "location": "Banff, Alberta",
          "country": "Canada",
          "reviews": []
      },
      {
          "title": "Traditional Ryokan",
          "description": "A serene Japanese inn with an onsen.",
          "image": "https://i0.wp.com/picjumbo.com/wp-content/uploads/beautiful-nature-mountain-scenery-with-flowers-free-photo.jpg?w=2210&quality=70",
          "price": 220,
          "location": "Kyoto",
          "country": "Japan",
          "reviews": []
      },
      {
          "title": "Ski Chalet",
          "description": "A warm, cozy chalet right next to the slopes.",
          "image": "https://i0.wp.com/picjumbo.com/wp-content/uploads/beautiful-nature-mountain-scenery-with-flowers-free-photo.jpg?w=2210&quality=70",
          "price": 250,
          "location": "Chamonix",
          "country": "France",
          "reviews": []
      },
      {
          "title": "Rustic Vineyard Stay",
          "description": "A farmhouse stay in the heart of Tuscany’s vineyards.",
          "image": "",
          "price": 190,
          "location": "Tuscany",
          "country": "Italy",
          "reviews": []
      },
      {
          "title": "Floating House",
          "description": "A houseboat experience in the backwaters of Kerala.",
          "image": "",
          "price": 180,
          "location": "Alleppey",
          "country": "India",
          "reviews": []
      },
      {
          "title": "Modern Penthouse",
          "description": "A luxurious penthouse with city skyline views.",
          "image": "",
          "price": 500,
          "location": "Dubai",
          "country": "UAE",
          "reviews": []
      },
      {
          "title": "Safari Tent",
          "description": "An adventurous stay in a luxury safari tent.",
          "image": "",
          "price": 250,
          "location": "Serengeti",
          "country": "Tanzania",
          "reviews": []
      },
      {
          "title": "Snow Igloo",
          "description": "An ice igloo in the middle of the Arctic Circle.",
          "image": "",
          "price": 300,
          "location": "Lapland",
          "country": "Finland",
          "reviews": []
      },
      {
          "title": "Charming English Cottage",
          "description": "A cozy countryside cottage in the Cotswolds.",
          "image": "",
          "price": 220,
          "location": "Cotswolds",
          "country": "UK",
          "reviews": []
      },
      {
          "title": "Treehouse Adventure",
          "description": "A treehouse overlooking the Costa Rican rainforest.",
          "image": "",
          "price": 190,
          "location": "Monteverde",
          "country": "Costa Rica",
          "reviews": []
      },
      {
          "title": "House with Private Beach",
          "description": "A hidden gem with a private beach in the Maldives.",
          "image": "",
          "price": 600,
          "location": "Maldives",
          "country": "Maldives",
          "reviews": []
      },
      {
          "title": "Mayan Jungle Retreat",
          "description": "An eco-lodge deep in the Yucatán jungle.",
          "image": "",
          "price": 180,
          "location": "Tulum",
          "country": "Mexico",
          "reviews": []
      },
      {
          "title": "Old Castle Stay",
          "description": "A royal stay in a medieval Scottish castle.",
          "image": "",
          "price": 400,
          "location": "Edinburgh",
          "country": "Scotland",
          "reviews": []
      },
      {
          "title": "Beach Bungalow",
          "description": "A tropical escape in a secluded beach bungalow.",
          "image": "",
          "price": 220,
          "location": "Bali",
          "country": "Indonesia",
          "reviews": []
      }
  
  
  ];

  module.exports = {data : sampleListings};
  