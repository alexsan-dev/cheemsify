exports.handler = async (event) => {
  // HEADERS
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials": true,
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "GET",
  };

  // GET
  if (event.httpMethod.toUpperCase() === "GET") {
    const phrases = [
      "Do You Think He’s Maybe Compensating For Something?",
      "Actually, It’s Quite Good On Toast.",
      "Donkey, You Have The Right To Remain Silent. What You Lack Is The Capacity.",
      "Well, That’s Not Very Nice. It’s Just A Donkey.",
      "That’ll Do, Donkey. That’ll Do.",
      "Ogres Are Like Onions.",
      "There’s A Stack Of Freshly Made Waffles In The Middle Of The Forest! Don’t You Find That A Wee Bit Suspicious?",
      "Look At Him In His Wee Li’l Boots! Y’know, How Many Cats Can Wear Boots? Honestly?",
      "It’s Time To Pack Up Your Toothbrush And Jammies. You’re The New King Of Far Far Away.",
      "What Are You Doing In My Swamp!?",
      "I’m An Ogre! You Know, ‘Grab Your Torch And Pitchforks!’ Doesn’t That Bother You?",
      "Someday, I Will Repay You. Unless, Of Course, I Can’t Find You Or If I Forget.",
      "It’s On My To-Do List!",
      "A Cute, Button Nose? Thick, Wavy Locks? Taut, Round Buttocks?",
      "You’re Going The Right Way For A Smacked Bottom.",
      "Little donkey. Take a look at me, what am I?",
      "Like that’s ever gonna happen. What a load of…",
      "You go in there and tell her how you feel.",
      "Well, I have to save my ass.",
      "Oh, would you look at that.",
      "Yeah, right before they burst into flame.",
      "Donkey, two things okay? Shut… up.",
      "That’ll do, Donkey. That’ll do.",
      "Wow! Only a TRUE friend would be that cruelly honest.",
      "Thank you, thank you very much. I’m here ’til Thursday. Try the veal.",
      "WHY are you following me?",
      "So where is this fire-breathin’ pain in the neck, anyway?",
    ];

    // RANDOM
    const randomIndex = Math.round(Math.random() * phrases.length - 1);
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        message: "Success",
        phrase: phrases[randomIndex],
      }),
    };
  } else {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ message: "Method not allowed" }),
    };
  }
};
