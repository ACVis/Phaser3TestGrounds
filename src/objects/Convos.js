import { isInteger } from "lodash-es";

class DialogueTurn {
    // constructor(config) {
    constructor({ speaker, endPause = 400, pace = 40, line, callback }) {
        Object.assign(this, { speaker, endPause, pace, line, callback });
    }
}
class Speaker {
    constructor(name, { endPause, pace, callback }) {
        Object.assign(this, { name, endPause, pace, callback });
    }
    createTurn({ endPause, pace, line, callback }) {
        let config = {};

        config.speaker = this.name;
        config.line = line;

        if (isInteger(endPause)) {
            config.endPause = endPause;
        } else {
            config.endPause = this.endPause;
        }

        if (isInteger(pace)) {
            config.pace = pace;
        } else {
            config.endPause = this.endPause;
        }

        if (typeof callback !== "undefined" && callback !== null) {
            config.callback = callback;
        }

        return new DialogueTurn(config);
    }
    getName() {
        return this.name;
    }
    getSpeaker() {
        //SAME AS getName()
        return this.name;
    }
}

// const You = new Speaker("You");

// const Baron = new Speaker("Baron");
// const Lisa = new Speaker("Lisa");
// const Porchia = new Speaker("Porchia");

// Baron von Kraken HUMAN v2, test. TODO: convert "You" to objects
let baron_humanv2 = {
    //1.  So, uh...have you heard about the crab monsters walking around?
    1: [
        new DialogueTurn({
            speaker: "Baron",
            line:
                "YES I have!  My, what a terrible situation we have on our hands.  I certainly hope that nothing AWFUL happens to anybody, namely getting crabs!  What a bad thing.",
        }),
        { You: "Yeah, it is always a bit of a concern these days." },

        new DialogueTurn({
            speaker: "Baron",
            line:
                "I can’t believe those scientists were allowed to go unchecked on their work for so long.  So many innocent lives lost on their horrible experiments.  I lost a cousin to them.",
        }),
        { You: "I’m so sorry to hear that…" },

        new DialogueTurn({
            speaker: "Baron",
            line:
                "It’s quite alright. It was a long time ago.  One day I’ll make sure those responsible pay for their iniquities…",
        }),
    ],

    //2.  Big game hunting, eh? What kind?
    2: [
        new DialogueTurn({
            speaker: "Baron",
            line: "I’ve hunted all sorts of creatures.",
        }),

        { You: "Yeah?" },
        new DialogueTurn({ speaker: "Baron", line: "Big ones." }),

        { You: " Yeah?" },
        new DialogueTurn({ speaker: "Baron", line: "HUGE ones." }),

        { You: "That’s prety non-specific." },

        new DialogueTurn({
            speaker: "Baron",
            line:
                "That’s because I’ve killed SO MANY different game.  Elephants, rhinos, tigers, everything in between.",
        }),
        { You: "What would be between an elephant and a rhino?" },
        new DialogueTurn({
            speaker: "Baron",
            line: " A rhinophelant, indubitably.",
        }),

        { You: " Is that even an animal?" },

        new DialogueTurn({
            speaker: "Baron",
            line:
                "You scoff?  I have it mounted on my mantle!  If...ahem...we take this back to my place at any point I can show you.",
        }),
        { You: "Maybe later…" },
    ],

    //   3.  Tell me about your childhood.  What kind of kid were you?
    3: [
        new DialogueTurn({
            speaker: "Baron",
            line:
                "But a wee mite I was.  The ugly stage, if you will.  I was pretty awkward to be honest!",
        }),
        { You: "How so?  " },

        new DialogueTurn({
            speaker: "Baron",
            line:
                "I never really knew what to say or what to do in social situations.",
        }),
        { You: "What changed?" },

        new DialogueTurn({
            speaker: "Baron",
            line:
                "I donned a bit of a persona.  I pretended I was a confident, dapper gentleman for years.  Eventually it became true!",
        }),
        { You: "That’s pretty interesting." },
        new DialogueTurn({
            speaker: "Baron",
            line: "Fake it till you make it!",
        }),

        { You: "Is new Baron von Kraken even your name?" },

        new DialogueTurn({
            speaker: "Baron",
            line:
                "A gentleman has to keep his cards close to his chest!  Can’t go telling you ALL of my secrets now, can I?",
        }),
    ],

    //4.  So, do you play cricket?
    4: [
        new DialogueTurn({ speaker: "Baron", line: "I’d like to." }),

        { You: "So is that a no?" },

        new DialogueTurn({
            speaker: "Baron",
            line:
                "Well, I’ve thought about playing cricket before.  It’s basically baseball, right?  But for gentlemen!",
        }),
        { You: "I can’t say I know the rules of cricket." },

        new DialogueTurn({
            speaker: "Baron",
            line:
                " To be honest, I don’t either.  I’ve seen games on the telly in the past, but it’s a little hard to nail down what those blokes are actually doing.",
        }),
        { You: "Your guess is as good as mine." },

        new DialogueTurn({
            speaker: "Baron",
            line:
                "Sadly, I’ve never been to a live game of cricket before.  I’ve always wanted to go, but I’ve never actually made it happen.",
        }),
        {
            You:
                "Well, maybe we can go to a cricket game together sometime?  I think it sounds kinda fun.",
        },

        new DialogueTurn({
            speaker: "Baron",
            line:
                "Hmm, that sounds like a grand idea!  I’ll look around and see if I can scrounge up some tickets to a game!",
        }),
    ],

    //5.  Scotch...why do you like it so much?
    5: [
        new DialogueTurn({
            speaker: "Baron",
            line: "Is it not the FANCIEST drink you can think of?",
        }),

        { You: " Hmm...that’s a tough one." },

        new DialogueTurn({
            speaker: "Baron",
            line:
                "There are other fancy drinks of course.  The Gin and Tonic.  The Mint Julep  The Martini.",
        }),
        { You: "I can think of a few more too." },

        new DialogueTurn({
            speaker: "Baron",
            line:
                " So can I!  But they all pale in comparison to the simple yet sophisticated flavor of a glass of scotch.  ",
        }),
        { You: "I suppose you’re right." },

        new DialogueTurn({
            speaker: "Baron",
            line:
                " Seriously, what else would you drink while wearing a monocle like this?",
        }),
        { You: "I can’t think of anything better." },
    ],

    //6.   Describe your perfect vacation to me.
    6: [
        new DialogueTurn({ speaker: "Baron", line: "Safari without a doubt." }),

        { You: "You like checking out all the animals?" },
        new DialogueTurn({
            speaker: "Baron",
            line: "I go where the hunting is good.  Survival is key!",
        }),

        {
            You:
                "Are you afraid you won’t get enough to eat if you don’t shoot an elephant or something?",
        },
        new DialogueTurn({ speaker: "Baron", line: "Nothing is promised!" }),

        { You: "Seems like more of a risk to have animals going after you." },

        new DialogueTurn({
            speaker: "Baron",
            line:
                "There’s nothing quite like living by instinct...the risk of an animal breathing down your neck...waiting to attack!",
        }),
        { You: "…" },
        new DialogueTurn({
            speaker: "Baron",
            line: " A risk mitigated with an elephant gun, of course.",
        }),

        { You: "Of course." },
    ],

    //7.  You seem like a man who appreciates caviar.
    7: [
        new DialogueTurn({
            speaker: "Baron",
            line: "And how!  I’ll take anything I can get my claws on.",
        }),

        {
            You:
                "Do you have a specific brand preference?  Or fish preference?",
        },

        new DialogueTurn({
            speaker: "Baron",
            line:
                "Black Pearl Ossetra Sturgeon Caviar.  It’s simply the finest.  But I’ll eat nearly any caviar if I can find it.",
        }),
        {
            You:
                "I’m surprised you don’t have a more discerning tongue.  You’ll eat whatever is available?",
        },
        new DialogueTurn({
            speaker: "Baron",
            line: "Do you know how expensive caviar is?",
        }),

        { You: "Well, now that you mention it, I guess not." },

        new DialogueTurn({
            speaker: "Baron",
            line:
                "I may be dapper, but I’m not made of money!  If somebody offers caviar, I take it.",
        }),
    ],

    // 8.  So...where are you from exactly?
    8: [
        new DialogueTurn({
            speaker: "Baron",
            line: " I feel...uncomfortable answering this question.",
        }),

        { You: " Why is that?" },

        new DialogueTurn({
            speaker: "Baron",
            line:
                "Well, I feel like you’d probably expect me to be from London or something.",
        }),
        {
            You:
                " That was admittedly my first instinct...London...from the 1800s.",
        },
        new DialogueTurn({
            speaker: "Baron",
            line: " I’m from Cleveland.  Cleveland, Ohio.",
        }),

        { You: " ...what?" },

        new DialogueTurn({
            speaker: "Baron",
            line:
                " I have chosen to be who I am today.  This is who I choose to be despite my humble beginnings!",
        }),
        { You: " I mean, kudos for following your dream I suppose.  " },

        new DialogueTurn({
            speaker: "Baron",
            line:
                "I dreamt of little more than outdoing my contemporaries in my early days...but now I feel that I’ve arrived.",
        }),
        { You: "Go Buckeyes!" },
        new DialogueTurn({ speaker: "Baron", line: "…" }),

        new DialogueTurn({ speaer: "Baron", line: "…" }),

        new DialogueTurn({ speaker: "Baron", line: "Go Buckeyes." }),
    ],
};
// Baron von Kraken HUMAN:
let baron_human = {
    //1.  So, uh...have you heard about the crab monsters walking around?
    1: [
        {
            Baron:
                "YES I have!  My, what a terrible situation we have on our hands.  I certainly hope that nothing AWFUL happens to anybody, namely getting crabs!  What a bad thing.",
        },

        { You: "Yeah, it is always a bit of a concern these days." },

        {
            Baron:
                "I can’t believe those scientists were allowed to go unchecked on their work for so long.  So many innocent lives lost on their horrible experiments.  I lost a cousin to them.",
        },

        { You: "I’m so sorry to hear that…" },

        {
            Baron:
                "It’s quite alright. It was a long time ago.  One day I’ll make sure those responsible pay for their iniquities…",
        },
    ],

    //2.  Big game hunting, eh? What kind?
    2: [
        { Baron: "I’ve hunted all sorts of creatures." },

        { You: "Yeah?" },

        { Baron: "Big ones." },

        { You: " Yeah?" },

        { Baron: "HUGE ones." },

        { You: "That’s pretty non-specific." },

        {
            Baron:
                "That’s because I’ve killed SO MANY different game.  Elephants, rhinos, tigers, everything in between.",
        },

        { You: "What would be between an elephant and a rhino?" },

        { Baron: " A rhinophelant, indubitably." },

        { You: " Is that even an animal?" },

        {
            Baron:
                "You scoff?  I have it mounted on my mantle!  If...ahem...we take this back to my place at any point I can show you.",
        },

        { You: "Maybe later…" },
    ],

    //   3.  Tell me about your childhood.  What kind of kid were you?
    3: [
        {
            Baron:
                "But a wee mite I was.  The ugly stage, if you will.  I was pretty awkward to be honest!",
        },

        { You: "How so?  " },

        {
            Baron:
                "I never really knew what to say or what to do in social situations.",
        },

        { You: "What changed?" },

        {
            Baron:
                "I donned a bit of a persona.  I pretended I was a confident, dapper gentleman for years.  Eventually it became true!",
        },

        { You: "That’s pretty interesting." },

        { Baron: "Fake it till you make it!" },

        { You: "Is Baron von Kraken even your name?" },

        {
            Baron:
                "A gentleman has to keep his cards close to his chest!  Can’t go telling you ALL of my secrets now, can I?",
        },
    ],

    //4.  So, do you play cricket?
    4: [
        { Baron: "I’d like to." },

        { You: "So is that a no?" },

        {
            Baron:
                "Well, I’ve thought about playing cricket before.  It’s basically baseball, right?  But for gentlemen!",
        },

        { You: "I can’t say I know the rules of cricket." },

        {
            Baron:
                " To be honest, I don’t either.  I’ve seen games on the telly in the past, but it’s a little hard to nail down what those blokes are actually doing.",
        },

        { You: "Your guess is as good as mine." },

        {
            Baron:
                "Sadly, I’ve never been to a live game of cricket before.  I’ve always wanted to go, but I’ve never actually made it happen.",
        },

        {
            You:
                "Well, maybe we can go to a cricket game together sometime?  I think it sounds kinda fun.",
        },

        {
            Baron:
                "Hmm, that sounds like a grand idea!  I’ll look around and see if I can scrounge up some tickets to a game!",
        },
    ],

    //5.  Scotch...why do you like it so much?
    5: [
        { Baron: "Is it not the FANCIEST drink you can think of?" },

        { You: " Hmm...that’s a tough one." },

        {
            Baron:
                "There are other fancy drinks of course.  The Gin and Tonic.  The Mint Julep  The Martini.",
        },

        { You: "I can think of a few more too." },

        {
            Baron:
                " So can I!  But they all pale in comparison to the simple yet sophisticated flavor of a glass of scotch.  ",
        },

        { You: "I suppose you’re right." },

        {
            Baron:
                " Seriously, what else would you drink while wearing a monocle like this?",
        },

        { You: "I can’t think of anything better." },
    ],

    //6.   Describe your perfect vacation to me.
    6: [
        { Baron: "Safari without a doubt." },

        { You: "You like checking out all the animals?" },

        { Baron: "I go where the hunting is good.  Survival is key!" },

        {
            You:
                "Are you afraid you won’t get enough to eat if you don’t shoot an elephant or something?",
        },

        { Baron: "Nothing is promised!" },

        { You: "Seems like more of a risk to have animals going after you." },

        {
            Baron:
                "There’s nothing quite like living by instinct...the risk of an animal breathing down your neck...waiting to attack!",
        },

        { You: "…" },

        { Baron: " A risk mitigated with an elephant gun, of course." },

        { You: "Of course." },
    ],

    //7.  You seem like a man who appreciates caviar.
    7: [
        { Baron: "And how!  I’ll take anything I can get my claws on." },

        {
            You:
                "Do you have a specific brand preference?  Or fish preference?",
        },

        {
            Baron:
                "Black Pearl Ossetra Sturgeon Caviar.  It’s simply the finest.  But I’ll eat nearly any caviar if I can find it.",
        },

        {
            You:
                "I’m surprised you don’t have a more discerning tongue.  You’ll eat whatever is available?",
        },

        { Baron: "Do you know how expensive caviar is?" },

        { You: "Well, now that you mention it, I guess not." },

        {
            Baron:
                "I may be dapper, but I’m not made of money!  If somebody offers caviar, I take it.",
        },
    ],

    // 8.  So...where are you from exactly?
    8: [
        { Baron: " I feel...uncomfortable answering this question." },

        { You: " Why is that?" },

        {
            Baron:
                "Well, I feel like you’d probably expect me to be from London or something.",
        },

        {
            You:
                " That was admittedly my first instinct...London...from the 1800s.",
        },

        { Baron: " I’m from Cleveland.  Cleveland, Ohio." },

        { You: " ...what?" },

        {
            Baron:
                " I have chosen to be who I am today.  This is who I choose to be despite my humble beginnings!",
        },

        { You: " I mean, kudos for following your dream I suppose.  " },

        {
            Baron:
                "I dreamt of little more than outdoing my contemporaries in my early days...but now I feel that I’ve arrived.",
        },

        { You: "Go Buckeyes!" },

        { Baron: "…" },

        { Baron: "…" },

        { Baron: "Go Buckeyes." },
    ],
};
// Baron von Kraken CRAB:
let baron_crab = {
    // "So, uh...have you heard about the crab monsters walking around?",
    1: [
        {
            Baron:
                "YES I have!  My, what a terrible situation we have on our hands.  I certainly hope that nothing AWFUL happens to anybody, namely getting crabbed!  What a bad thing.",
        },

        { You: "Yeah, it is always a bit of a concern these days." },

        {
            Baron:
                "I can’t believe those scientists were allowed to go unchecked on their work for so long.  So many innocent lives lost on their horrible experiments.  I lost a cousin to them.",
        },

        { You: "I’m so sorry to hear that…" },

        {
            Baron:
                "It’s quite alright. It was a long time ago.  I’ve been stalking the people responsible...one day they’ll pay for their iniquities…",
        },
    ],
    //"Big game hunting, eh?  What kind?",
    2: [
        { Baron: "I’ve hunted all sorts of creatures." },

        { You: "Yeah?" },

        { Baron: "Big ones." },

        { You: " Yeah?" },

        { Baron: "HUGE ones." },

        { You: "That’s pretty non-specific." },

        {
            Baron:
                "That’s because I’ve killed SO MANY different game.  Elephants, rhinos, big lunkers, everything in between.",
        },

        { You: "What would be between an elephant and a rhino?" },

        { Baron: " A rhinophelant, indubitably." },

        { You: " Is that even an animal?" },

        {
            Baron:
                "You scoff?  I have it mounted on my mantle!  If...ahem...we take this back to my place at any point I can show you.",
        },

        { You: "Maybe later…" },
    ],

    // Tell me about your childhood.  What kind of kid were you?
    3: [
        {
            Baron:
                "But a wee mite I was.  The larval stage, if you will.  I was pretty awkward to be honest!",
        },

        { You: "How so?  " },

        {
            Baron:
                "I never really knew what to say or what to do in social situations.",
        },

        { You: "What changed?" },

        {
            Baron:
                "I donned a bit of a persona.  I pretended I was a confident, dapper gentleman for years.  Eventually it became true!",
        },

        { You: "That’s pretty interesting." },

        { Baron: "Fake it till you make it!" },

        { You: "Is Baron von Kraken even your name?" },

        {
            Baron:
                "A gentleman has to keep his cards close to his chest!  Can’t go telling you ALL of my secrets now, can I?",
        },
    ],

    // So, do you play cricket?
    4: [
        { Baron: "I’d like to." },

        { You: "So is that a no?" },

        {
            Baron:
                "Well, I’ve thought about playing cricket before.  It’s basically baseball, right?  But for gentlemen!",
        },

        { You: "I can’t say I know the rules of cricket." },

        {
            Baron:
                " To be honest, I don’t either.  I’ve seen games on the telly in the past, but it’s a little hard to nail down what those blokes are actually doing.",
        },

        { You: "Your guess is as good as mine." },

        {
            Baron:
                "Sadly, I’ve never been to a live game of cricket before.  I’ve always wanted to go, but I’ve never actually made it happen.",
        },

        {
            You:
                "Well, maybe we can go to a cricket game together sometime?  I think it sounds kinda fun.",
        },

        {
            Baron:
                "Hmm, that sounds like a grand idea!  I’ll put out a few feelers and see if I can scrounge up some tickets to a game!",
        },
    ],

    // Scotch...why do you like it so much?
    5: [
        { Baron: "Is it not the FANCIEST drink you can think of?" },

        { You: " Hmm...that’s a tough one." },

        {
            Baron:
                "There are other fancy drinks of course.  The Gin and Tonic.  The Sea Breeze.  The Martini.",
        },

        { You: "I can think of a few more too." },

        {
            Baron:
                " So can I!  But they all pale in comparison to the simple yet sophisticated flavor of a glass of scotch.  ",
        },

        { You: "I suppose you’re right." },

        {
            Baron:
                " Seriously, what else would you drink while wearing a monocle like this?",
        },

        { You: "I can’t think of anything better." },
    ],

    // Describe your perfect vacation to me.
    6: [
        { Baron: "Safari without a doubt." },

        { You: "You like checking out all the animals?" },

        { Baron: "I go where the hunting is good.  Survival is key!" },

        {
            You:
                "Are you afraid you won’t get enough to eat if you don’t shoot an elephant or something?",
        },

        { Baron: "Nothing is promised!" },

        {
            You: "Seems like more of a risk to have animals going after you.",
        },

        {
            Baron:
                "There’s nothing quite like living by instinct...the risk of an animal tearing you limb from limb...",
        },

        { You: "…" },

        { Baron: " A risk mitigated with an elephant gun, of course." },

        { You: "Of course." },
    ],

    // You seem like a man who appreciates caviar.
    7: [
        { Baron: "And how!  I’ll take anything I can get my claws on." },

        {
            You:
                "Do you have a specific brand preference?  Or fish preference?",
        },

        { Baron: "Not particularly.  I’ll eat whatever is available." },

        {
            You:
                "I’m surprised you don’t have a more discerning tongue.  You’ll eat whatever is available?",
        },

        { Baron: "Do you know how expensive caviar is?" },

        { You: "Well, now that you mention it, I guess not." },

        {
            Baron:
                "I may be dapper, but I’m not made of money!  If somebody offers caviar, I take it.",
        },
    ],

    // So...where are you from exactly?
    8: [
        { Baron: "I feel...uncomfortable answering this question." },

        { You: "Why is that?" },

        {
            Baron:
                "Well, I feel like you’d probably expect me to be from London or something.",
        },

        {
            You:
                "That was admittedly my first instinct...London...from the 1800s.",
        },

        { Baron: "I’m from Cleveland.  Cleveland, Ohio." },

        { You: "...what?" },

        {
            Baron:
                "I have chosen to be who I am today.  This is who I choose to be despite my humble beginnings!",
        },

        { You: "I mean, kudos for following your dream I suppose.  " },

        {
            Baron:
                "I dreamt of little more than outdoing my many siblings in my early days...but now I feel that I’ve arrived.",
        },

        { You: "Go Buckeyes!" },

        { Baron: "…" },

        { Baron: "…" },

        { Baron: "Go Buckeyes." },
    ],
};

export const baron = {
    name: "Baron von Kraken",
    key: "Baron",
    choices: [
        {
            prompt:
                "So, uh...have you heard about the crab monsters walking around?",
            dialogue: {
                human: baron_human["1"],
                crab: baron_crab["1"],
            },
        },
        {
            prompt: "Big game hunting, eh?  What kind?",
            dialogue: {
                human: baron_human["2"],
                crab: baron_crab["2"],
            },
        },

        {
            prompt: "Tell me about your childhood.  What kind of kid were you?",
            dialogue: {
                human: baron_human["3"],
                crab: baron_crab["3"],
            },
        },

        {
            prompt: "So do you play cricket?",
            dialogue: {
                human: baron_human["4"],
                crab: baron_crab["4"],
            },
        },

        {
            prompt: "Scotch...Why do you like it so much?",
            dialogue: {
                human: baron_human["5"],
                crab: baron_crab["5"],
            },
        },

        {
            prompt: "Describe your perfect vacation to me.",
            dialogue: {
                human: baron_human["6"],
                crab: baron_crab["6"],
            },
        },

        {
            prompt: "You seem like a man who appreciates caviar.",
            dialogue: {
                human: baron_human["7"],
                crab: baron_crab["7"],
            },
        },
        {
            prompt: "So...where are you from exactly?",
            dialogue: {
                human: baron_human["8"],
                crab: baron_crab["8"],
            },
        },
    ],
};

//////////////////////////////////////////////////////////////////////////////
// Put next convo below
//////////////////////////////////////////////////////////////////////////////
// Lisa Karlsson HUMAN:
let lisa_human = {
    //1.  You’re not a crab monstrosity, are you?
    1: [
        {
            Lisa:
                "Gee, you certainly know how to compliment a girl on her looks dontcha?",
        },

        { You: "I...uh…" },

        {
            Lisa:
                "Haha, just kidding!  It’s a totally valid question.  There’s crab ****ers scuttling around everywhere these days.  Would hate to get crabs, y’know?",
        },

        { You: "You and me, both." },

        {
            Lisa: "You’re not a crab ****er, are you?",
        },

        {
            You: "I’m sincerely doing my best to avoid that.",
        },

        {
            Lisa:
                "What?  Oh, hah!   Well, no worries on that front.  I only pinch people who deserve it.",
        },

        {
            You: "Do I deserve it?",
        },

        {
            Lisa:
                "Yet to be seen.  First you’re worried about getting ****ed by a crab, and now you’re asking for pinches.",
        },

        {
            You: "…",
        },

        {
            Lisa: "You ARE a crab ****er!",
        },
    ],

    //2.  So, who is your favorite band or artist?
    2: [
        {
            Lisa: "Scott Stapp, hands down.  Absolute musical genius.",
        },

        {
            You: "Definitely pretty heavy in the Butt Rock world, eh?",
        },

        {
            Lisa:
                "You got a problem with that?  People like to think they’re better by not liking something that a lot of people like.  There’s a place for Butt Rock in this world.",
        },

        {
            You:
                "I guess that makes sense.  The music probably just got overplayed.",
        },

        {
            Lisa:
                "That's because Scott Stapp's the ****ing MAN.  But you know, I don’t like JUST Butt Rock.  Do you like Gorillaz?  I’m a big fan of the albums they’ve come out with in the past few years.",
        },

        {
            You: "I’ll have to check them out later.",
        },
    ],

    //   3.  Do you play any instruments?
    3: [
        {
            Lisa: "Take a guess.",
        },

        {
            You: "...yes?",
        },

        {
            Lisa: "Yup.  Keep going.",
        },

        {
            You: "...guitar?",
        },

        {
            Lisa: "Yeah!  I’ve been playing since high school.",
        },

        {
            You: "Really?",
        },

        {
            Lisa:
                "Yeah.  I’ve always kinda had the dream of being a rock star, so the guitar sorta called my name.",
        },

        {
            You: "Wow.  Has it taken you places?",
        },

        {
            Lisa:
                "Self satisfaction is enough for me.  I appreciate music for the sake of music.",
        },

        {
            You:
                "I’ve always been interested in the guitar, but I’ve never had the patience to really play well.",
        },

        {
            Lisa:
                "Takes practice!  If you wanna learn it, make it happen!  That’s what I did.",
        },
    ],

    //4.  If you could be any vegetable, which would it be and why?
    4: [
        {
            Lisa: "Wow, really reaching on that one, eh?",
        },

        {
            You: "I like to keep things fresh.",
        },

        {
            Lisa:
                "Can’t fault a guy for trying to make things interesting.  Hmm...this is a tough one.",
        },

        {
            You: "Take as much time as you need.",
        },

        {
            Lisa: "Broccoli.",
        },

        {
            You: "Why?",
        },

        {
            Lisa:
                "Because it’s delicious.  It’s a super-versatile vegetable that you can put in ****ing everything.",
        },

        {
            You:
                "That’s pretty reasonable.  You think that describes you well?",
        },

        {
            Lisa:
                "Well, I’m not a vegetable, but if I had to pick one, broccoli would work for me.  I like to think I can make things work and adapt.  So sure.  Broccoli it is.",
        },
    ],

    //5.  What’s your favorite drink?
    5: [
        {
            Lisa: "You deaf or something?  Beer!",
        },

        {
            You:
                "Yeah, but there are TONS of different beers.  Which one is your favorite?",
        },

        {
            Lisa:
                "Oof.  You’re asking me to pick favorites between children.  You know that’s a dangerous practice.",
        },

        {
            You: "I know it will be hard, but I believe in you.",
        },

        {
            Lisa:
                "Back against the wall, honestly I enjoy a simple IPA.  I think it sums up my personality well.",
        },

        {
            You: "How so?",
        },

        {
            Lisa:
                "It’s got a nice, hoppy punch.  Bitter...but a nice floral edge.  It’s also just great to sip on at concerts.",
        },
    ],

    //6.   If you could do anything for a day, what would it be?
    6: [
        {
            Lisa:
                "I’d probably go to a music festival.  I’d load up on beer, go to shows, and dance to some arena rock till I couldn’t anymore.",
        },

        {
            You: "That sounds like a pretty good time...I guess?",
        },

        {
            Lisa: "I mean, I’d recover.  Then I’d just do it again.",
        },

        {
            You: "I asked what you’d do for a day...this is bleeding into two.",
        },

        {
            Lisa: "No limits on the party!  I’d keep the party train rolling.",
        },
    ],

    //7.  What is your family like?
    7: [
        {
            Lisa: "Absolutely and completely insane.",
        },

        {
            You: "What do you mean?",
        },

        {
            Lisa:
                "Pretty much every one of my siblings has the same sort of energy that I do.  If you put all of us together in a room, we’re pretty much a whirlwind of yelling and booze.",
        },

        {
            You: "That seems like it’d be hard to handle.",
        },

        {
            Lisa:
                "It can be tough sometimes.  We don’t all get along.  And don’t even get me started on my parents.  Sometimes I don’t know whether they wanna hug me or kill me, y’know?",
        },

        {
            You:
                "I got in a little trouble back in highschool I guess.  I know the feeling.",
        },

        {
            Lisa:
                "Yeah.  The ‘rents caught me drinking at a party once, and I got grounded for eternity.",
        },

        {
            You: "Seems like a long time to be grounded.",
        },

        {
            Lisa:
                "Haha, yeah.  By the way, I have to head out in a few...curfew is coming up.  Mom’s expecting me.",
        },

        {
            You: "...what?",
        },

        {
            Lisa: "I’m still grounded.",
        },
    ],

    // 8.  What kind of food do you like?
    8: [
        {
            Lisa: "MEAT.",
        },

        {
            You: "Any specific kind of meat?",
        },

        {
            Lisa:
                "Man...that’s a tough question.  I’d say steak is my favorite.",
        },

        {
            You: "Why is that?",
        },

        {
            Lisa:
                "Steak is pretty simple, but it’s straight-forward.  It knows what it is.  It’s delicious on its own and doesn’t require any frills in order to be amazing.",
        },

        {
            You: "I guess I can see that.",
        },

        {
            Lisa:
                "Give me a beer, some steak, and some good music, and I’m one happy girl.",
        },

        {
            You: "I’ll keep that in mind!",
        },
    ],
};
// Lisa Karlsson CRAB:
let lisa_crab = {
    // "You’re not a crab monstrosity, are you?",
    1: [
        {
            Lisa:
                "Gee, you certainly know how to compliment a girl on her looks dontcha?",
        },

        {
            You: "I...uh…",
        },

        {
            Lisa:
                "Haha, just kidding!  It’s a totally valid question.  There’s crab ****ers scuttling around everywhere these days.  Would hate to get crabs, y’know?",
        },

        {
            You: "You and me, both.",
        },

        {
            Lisa: "You’re not a crab ****er, are you?",
        },

        {
            You: "I’m sincerely doing my best to avoid that.",
        },

        {
            Lisa:
                "What?  Oh, hah!  I only pinch people who deserve it.  And some people definitely do.",
        },

        {
            You: "Do I deserve it?",
        },

        {
            Lisa:
                "Yet to be seen.  First you’re worried about getting ****ed by a crab, and now you’re asking for pinches.",
        },

        {
            You: "…",
        },

        {
            Lisa: "You ARE  a crab ****er!",
        },
    ],
    //"So, who is your favorite band or artist?",
    2: [
        {
            Lisa: "Scott Stapp, hands down.  Absolute musical genius.",
        },

        {
            You: "Definitely pretty heavy in the butt-rock world, eh?",
        },

        {
            Lisa:
                "You got a problem with that?  People like to think they’re better by not liking something that a lot of people like.  There’s a place for Butt Rock in this world.",
        },

        {
            You:
                "I guess that makes sense.  The music probably just got overplayed.",
        },

        {
            Lisa:
                "You know, I don’t like JUST Butt Rock.  I also enjoy hardcore and metalcore stuff.  Have you ever seen the music video for Stick Stickly by Attack Attack!?  The guitar work is impressive.",
        },

        {
            You: "I’ll have to check that out later.",
        },
    ],

    // Do you play any instruments?
    3: [
        {
            Lisa: "Take a guess.",
        },

        {
            You: "...yes?",
        },

        {
            Lisa: "Yup.  Keep going.",
        },

        {
            You: "...guitar?",
        },

        {
            Lisa: "Good guess, but nope!  Drums.  High School marching band.",
        },

        {
            You: "Really?",
        },

        {
            Lisa:
                "Yup.  My hands aren’t very dextrous, y’know?  Guitar and other stringed instruments just never felt right for me.  But I can smack the **** out of stuff pretty well.",
        },

        {
            You: "Wow.",
        },

        {
            Lisa: "I can do it to a beat too.  My rhythm is good!",
        },

        {
            You:
                "I’ve always been interested in the drums.  My rhythm has never been great though.",
        },

        {
            Lisa:
                "Takes practice!  If you wanna learn it, make it happen!  That’s what I did.",
        },
    ],

    // If you could be any vegetable, which would it be and why?
    4: [
        {
            Lisa: "Wow, really reaching on that one, eh?",
        },

        {
            You: "I like to keep things fresh.",
        },

        {
            Lisa:
                "Can’t fault a guy for trying to make things interesting.  Hmm...this is a tough one.",
        },

        {
            You: "Take as much time as you need.",
        },

        {
            Lisa: "Honestly, I’m not a big vegetable person.",
        },

        {
            You: "At all?",
        },

        {
            Lisa:
                "I guess if you held a gun to my head, I’d have to pick potato.",
        },

        {
            You: "Why?",
        },

        {
            Lisa:
                "It’s like the cheater vegetable.  It’s the least veggie-like of the veggies.",
        },

        {
            You: "So do you feel like this describes you in some way?",
        },

        {
            Lisa: "As a hater of vegetables, yes.",
        },
    ],

    // What’s your favorite drink?
    5: [
        {
            Lisa: "You deaf or something?  Beer!",
        },

        {
            You:
                "Yeah, but there are TONS of different beers.  Which one is your favorite?",
        },

        {
            Lisa:
                "Oof.  You’re asking me to pick favorites between children.  You know that’s a dangerous practice.",
        },

        {
            You: "I know it will be hard for you, but you have to try.",
        },

        {
            Lisa: "Gose.",
        },

        {
            You: "Really?  You struck me as a Bud Light kind of girl.",
        },

        {
            Lisa:
                "Why, because of my musical tastes?  Geez, Mr. Judgy over here.",
        },

        {
            You: "So you don’t like Bud?",
        },

        {
            Lisa:
                "Well, I do.  But a good gose is my favorite.  The flavor screams “me” if you know what I mean.  I think it kinda catches parts of my personality.",
        },

        {
            You: "How so?",
        },

        {
            Lisa:
                "The good gose beers have a little salt, but not too much.  They have a little sour, but not too much.  Just the right balance.",
        },
    ],

    // If you could do anything for a day, what would it be?
    6: [
        {
            Lisa:
                "I’d probably go to a music festival.  I’d load up on beer, go to shows, and dance to some arena rock till my legs fell off.  Then I’d collapse.",
        },

        {
            You: "That sounds like a pretty good time...I guess?",
        },

        {
            Lisa: "I mean, I’d recover.  Then I’d just do it again.",
        },

        {
            You: "I asked what you’d do for a day...this is bleeding into two.",
        },

        {
            Lisa: "No limits on the party!  I’d keep the party train rolling.",
        },
    ],

    // What is your family like?
    7: [
        {
            Lisa: "Absolutely and completely insane.",
        },

        {
            You: "What do you mean?",
        },

        {
            Lisa:
                "Pretty much every one of my siblings has the same sort of energy that I do.  If you put all of us together in a room, we’re pretty much a swirling eddy of yelling and booze.",
        },

        {
            You: "That seems like it’d be hard to handle.",
        },

        {
            Lisa:
                "It can be tough sometimes.  We don’t all get along.  And don’t even get me started on my parents.  Sometimes I don’t know whether they wanna hug me or kill me, y’know?",
        },

        {
            You:
                "I got in a little trouble back in highschool I guess.  I know the feeling.",
        },

        {
            Lisa:
                "Yeah.  The ‘rents caught me drinking at a party once, and I thought they’d eat me alive.",
        },

        {
            You: "Oof.",
        },

        {
            Lisa:
                "I mean, I can tell they care most of the time, but no family is without drama, am I right?",
        },
    ],

    // What kind of food do you like?
    8: [
        {
            Lisa: "MEAT.",
        },

        {
            You: "Any specific kind of meat?",
        },

        {
            Lisa:
                "Man...that’s a tough question.  I like all meat in just about any form you could think of.  Grilled, fried, raw, whatever.",
        },

        {
            You: "...raw meat?",
        },

        {
            Lisa:
                "Well, sushi is meat when it comes down to it.  You eat that raw.",
        },

        {
            You: "I guess I didn’t consider that.",
        },

        {
            Lisa:
                "Meat is tough to beat.  But if I had to pick a favorite form for it, I’d probably say fresh fish is the tops.  Pair some fresh, grilled fish with a stout of some sort, and I’m one happy girl.",
        },

        {
            You: "I’ll keep that in mind!",
        },
    ],
};
export const lisa = {
    choices: {
        1: "You’re not a crab monstrosity, are you?",
        2: "So, who is your favorite band or artist?",
        3: "Do you play any instruments?",
        4: "If you could be any vegetable, which would it be and why?",
        5: "What’s your favorite drink?",
        6: "If you could do anything for a day, what would it be?",
        7: "What is your family like?",
        8: "What kind of food do you like?",
    },
    dialogue: {
        human: lisa_human,
        crab: lisa_crab,
    },
};

//////////////////////////////////////////////////////////////////////////////
// Put next convo below
//////////////////////////////////////////////////////////////////////////////
// Porchia Roux HUMAN:
let porchia_human = {
    //1.  So you say you’re into film…
    1: [
        {
            Porchia:
                "It’s one of my favorite things.  It’s an exquisite art-form.",
        },

        {
            You:
                "I love just about anything Spielberg does.  Jurassic Park is probably my favorite.",
        },

        {
            Porchia:
                "I...appreciate what he does, but I can’t say he’s my favorite.",
        },

        {
            You: "Well who do you like?",
        },

        {
            Porchia: "Herzog, Truffaut, Lynch…",
        },

        {
            You: "What movies have they done.",
        },

        {
            Porchia:
                "You’re sorta backing me into a corner here.  I hate to say it but…",
        },

        {
            You: "'You’ve probably never heard of them…?'",
        },

        {
            Porchia:
                "Haha, yes.  They tend to be smaller, more artistic films.",
        },

        {
            You:
                "Well, do you have any guilty pleasure films?  Like a movie that you know isn’t great but you still like it?",
        },

        {
            Porchia:
                "Well, I suppose I do have a weakness for the horror genre…",
        },

        {
            You: "I can get behind that!  Any favorites?",
        },

        {
            Porchia:
                "I’d have to say Night of the Living Dead.  It’s campy, but it laid the groundwork for all sorts of subsequent horror films.  Romero was pretty amazing.",
        },
    ],

    //2.  What do you do for a living?
    2: [
        {
            Porchia:
                "I’m trying my best to break into the film industry, but it’s a little tough.",
        },

        {
            You: "I’ve heard it can be incredibly competitive.",
        },

        {
            Porchia:
                "To say the very least.  I spent more money than I’m comfortable mentioning attending film school, and now I’m sort of floating job to job trying to stay afloat while pursuing my dream.",
        },

        {
            You:
                "The job market can be challenging no matter your industry right now.  With giant crabs running about, I think it’s probably pretty tough to get a job in Hollywood.",
        },

        {
            Porchia:
                "Believe it or not, that hasn’t really hurt the film industry too much.",
        },

        {
            You: "How come?",
        },

        {
            Porchia:
                "Well, sometimes people get tired of CG and want to see monsters that look a little more realistic.  If you’re a mutant crab person, there’s a market for you in the horror and sci-fi genres.",
        },

        {
            You:
                "I hadn’t really thought about that.  How on earth do they keep the crabs from killing people?",
        },

        {
            Porchia:
                "Oh, they don’t.  They just sacrifice a few PAs in the making of the film.  Most people think it’s a worthwhile sacrifice.",
        },

        {
            You: "How do you feel about that?",
        },

        {
            Porchia:
                "I think it’s terrible.  While I respect that people are able to make more “realistic” films, I can’t get behind the loss of life.  Becoming a PA is how a lot of people enter the industry…",
        },

        {
            You: "So you’d be a prime target.",
        },

        {
            Porchia: "Yup.",
        },
    ],

    //   3.  What kind of art do you like?
    3: [
        {
            Porchia:
                "Expression is art.  I appreciate genuine expression in nearly any form, whether it be drawing, painting, dancing, film, whatever.",
        },

        {
            You: "Anything?",
        },

        {
            Porchia:
                "I think the intent behind any piece of “art” is important.  If the intent is earnest, nearly anything can be considered a work of art.  Even food is art.",
        },

        {
            You: "I guess I hadn’t considered that.",
        },

        {
            Porchia:
                "Sushi is an incredible form of art.  The effort behind the chefs is pretty incredible.  They communicate messages of beauty and care via their cuts and colors.",
        },

        {
            You:
                "I can appreciate well-put-together sushi.  I had never thought about it as “art” before though.",
        },

        {
            Porchia:
                "Awaiting the patient, construction of the chef is part of the fun.  I love seeing the meticulous detail put into the food.  To me, it’s just as important as the taste.",
        },

        {
            You: "*She’s definitely an art nerd*",
        },
    ],

    //4.  What is an ideal date for you?
    4: [
        {
            Porchia:
                "I enjoy fresh experiences, whatever they may be.  Unique dates.",
        },

        {
            You: "So dinner and a movie is probably out for you.",
        },

        {
            Porchia:
                "Oh, I like those things, but sometimes novelty can be nice.  I love experiencing new things.  A chance to explore and try something unknown sounds ideal to me.",
        },

        {
            You: "Do you have any examples?",
        },

        {
            Porchia:
                "One of the most interesting dates I ever had was spelunking in a partially submerged cave complete with bats.",
        },

        {
            You: "That sounds...kinda scary.",
        },

        {
            Porchia:
                "Oh it was.  At least the idea was a little scary.  Once I got there, I just had the chance to wander and check out the formations and animals.  It was really neat!",
        },

        {
            You:
                "How did you get in there?  Did you have to scuba dive in or something?",
        },

        {
            Porchia:
                "Oh, no.  Scuba diving sounds interesting, but in this case, we were able to ride kayaks into the entrance of the cave.  It was a guided tour, so it didn’t feel particularly dangerous.",
        },

        {
            You: "The more you talk about it, the more I wanna do it!",
        },

        {
            Porchia: "You really should!",
        },
    ],

    //5.  What do you think about the crab monsters?
    5: [
        {
            Porchia: "I’m curious about them.",
        },

        {
            You: "How do you mean?",
        },

        {
            Porchia:
                "Well, we know that they exist because of some covert, government experiments, but we don’t really know much more than that.",
        },

        {
            You:
                "It sounds completely unbelievable, but I would’ve thought crab monsters existing at ALL was unbelievable before last year.",
        },

        {
            Porchia:
                "They’re a part of life now, but I want to try to understand them.  The better we understand them, the more likely we’ll all be able to survive.",
        },

        {
            You:
                "You sound like a pretty strong person.  I don’t know if I’d have the patience to learn much about them.",
        },

        {
            Porchia:
                "Challenges are a part of life.  Art is all about challenging the thoughts and feelings of the experiencer of the art.  In a sense, handling the obstacles of life can be considered a form of consuming art.",
        },

        {
            You: "You’ve got a very unique outlook on life.",
        },

        {
            Porchia:
                "Whether our outlook is positive or negative, we all have to face the challenges life throws at us.  I prefer to face those challenges head-on with my mind in a healthy place.",
        },

        {
            You: "That makes a lot of sense to me.",
        },
    ],

    //6.   Where are you from?
    6: [
        {
            Porchia: "Everywhere.",
        },

        {
            You: "Descriptive.",
        },

        {
            Porchia:
                "My family traveled a lot when I was younger.  My parents were in the military, so I don’t really have a particular physical location I can call home.",
        },

        {
            You: "Was it difficult for you?",
        },

        {
            Porchia:
                "It was hard for a while.  Every time we moved, I definitely missed my friends.  As a silver lining to that though, I got to experience all sorts of new things and places.",
        },

        {
            You: "Where did you go?",
        },

        {
            Porchia:
                "All over the US!  I probably spent the most time in Kentucky, but we got to spend a few years over in Germany.",
        },

        {
            You: "Ooh!  Sprechen Sie Deutsch?",
        },

        {
            Porchia:
                "Nein.  I was pretty little when we were over there, so I didn’t hold on to much of the language.  I only know a few words and phrases.  I do have a soft place in my heart for bratwurst and lederhosen, though.",
        },
    ],

    //7.  Where would you travel if you could go anywhere?
    7: [
        {
            Porchia: "I’d probably visit Japan.",
        },

        {
            You: "Why Japan?",
        },

        {
            Porchia:
                "Well, the culture and the art are beautiful over there.  And the food.  Oh man…",
        },

        {
            You: "The sushi?",
        },

        {
            Porchia:
                "Yes, it would be incredible.  I think the overall experience would be quite memorable.  I love the idea of visiting a rural ryokan and experiencing the traditional Japanese countryside.",
        },

        {
            You: "What’s a ryokan?",
        },

        {
            Porchia:
                "It’s a traditional Japanese inn filled with tatami-matted rooms.  It’s a lot like a bed and breakfast, but it focuses on creating a supremely “Japanese” experience.",
        },

        {
            You: "That sounds pretty fun.",
        },

        {
            Porchia:
                "Some of them even expect you to wear a yukata and have multi-course meals of traditional Japanese dishes.  Maybe someday I can make my way over there...",
        },
    ],

    // 8.  Dangerous topic...politics...go!
    8: [
        {
            Porchia:
                "You sure you want to get into that tonight?  BIG first date topic.",
        },

        {
            You: "I live on the edge.",
        },

        {
            Porchia:
                "Well, freedom is one of my primary values.  I want to be able to express myself in whatever format I see fit.",
        },

        {
            You: "I suppose you’re pretty anti-censorship.",
        },

        {
            Porchia:
                "Ten-million percent.  In college I had an art piece get taken down by a busy-body from Administration.  He thought it was too crass.",
        },

        {
            You: "What was the piece about?  Do I want to know?",
        },

        {
            Porchia:
                "It was called Circle.  It was a painting showing the life and death cycle...from birth, to living, to death, to decay, to fueling life again.",
        },

        {
            You:
                "Sounds like an interesting piece.  What didn’t the administration like?",
        },

        {
            Porchia:
                "It was fairly...graphic I guess.  The depiction of birth and all it entails could bother some peoples’ sensibilities I guess.",
        },

        {
            You: "Yeah, that could be a little gross...",
        },

        {
            Porchia:
                "Yet it is part of the natural life cycle.  Birth is a beautiful thing.  Why censor it?  Can’t say I’m a fan of people who feel the need to censor everything.",
        },
    ],
};
// Porchia Roux CRAB:
let porchia_crab = {
    // "So you say you’re into film…,
    1: [
        {
            Porchia:
                "It’s one of my favorite things.  It’s an exquisite art-form.",
        },

        {
            You:
                "I love just about anything Spielberg does.  Jurassic Park is probably my favorite.",
        },

        {
            Porchia:
                "I...appreciate what he does, but I can’t say he’s my favorite.",
        },

        {
            You: "Well who do you like?",
        },

        {
            Porchia: "Herzog, Truffaut, Lynch…",
        },

        {
            You: "What movies have they done?",
        },

        {
            Porchia:
                "You’re sorta backing me into a corner here.  I hate to say it but…",
        },

        {
            You: "'You’ve probably never heard of them…?'",
        },

        {
            Porchia:
                "Haha, yes.  They tend to be smaller, more artistic films.",
        },

        {
            You:
                "Well, do you have any guilty pleasure films?  Like a movie that you know isn’t great but you still like it?",
        },

        {
            Porchia:
                "Well, I suppose I do have a weakness for the horror genre…",
        },

        {
            You: "I can get behind that!  Any favorites?",
        },

        {
            Porchia:
                "I’d have to say Creature from the Black Lagoon.  It’s horribly campy...but in a good way.",
        },
    ],
    //"What do you do for a living?",
    2: [
        {
            Porchia:
                "I’m trying my best to break into the film industry, but it’s a little tough.",
        },

        {
            You: "I’ve heard it can be incredibly competitive.",
        },

        {
            Porchia:
                "To say the very least.  I spent more money than I’m comfortable mentioning attending film school, and now I’m sort of floating job to job trying to stay afloat while pursuing my dream.",
        },

        {
            You:
                "The job market can be challenging no matter your industry right now.  With giant crabs running about, I think it’s probably pretty tough to get a job in Hollywood.",
        },

        {
            Porchia:
                "Believe it or not, that hasn’t really hurt the film industry too much.",
        },

        {
            You: "How come?",
        },

        {
            Porchia:
                "Well, sometimes people get tired of CG and want to see monsters that look a little more realistic.  If you’re a mutant crab person, there’s a market for you in the horror and sci-fi genres.",
        },

        {
            You:
                "I hadn’t really thought about that.  How on earth do they keep the crabs from killing people?",
        },

        {
            Porchia:
                "Oh, they don’t.  They just sacrifice a few PAs in the making of the film.  Most people think it’s a worthwhile sacrifice.",
        },

        {
            You: "How do you feel about that?",
        },

        {
            Porchia:
                "Guess I’d better aim to break into the industry in a different role than PA I guess...",
        },
    ],

    // What kind of art do you like?
    3: [
        {
            Porchia:
                "Expression is art.  I appreciate genuine expression in nearly any form, whether it be drawing, painting, dancing, film, whatever.",
        },

        {
            You: "Anything?",
        },

        {
            Porchia:
                "I think the intent behind any piece of 'art' is important.  If the intent is earnest, nearly anything can be considered a work of art.  Even food is art.",
        },

        {
            You: "I guess I hadn’t considered that.",
        },

        {
            Porchia:
                "Sushi is an incredible form of art.  The effort behind the chefs is pretty incredible.  They communicate messages of beauty and care via their cuts and colors.",
        },

        {
            You:
                "I can appreciate well-put-together sushi.  I had never thought about it as “art” before though.",
        },

        {
            Porchia:
                "I can find it difficult to be patient and wait for it sometimes.  I know that seems a little silly, but I can’t help myself!  Sushi is probably my favorite food.",
        },
    ],

    // What is an ideal date for you?
    4: [
        {
            Porchia:
                "I enjoy fresh experiences, whatever they may be.  Unique dates.",
        },

        {
            You: "So dinner and a movie is probably out for you.",
        },

        {
            Porchia:
                "Oh, I like those things, but sometimes novelty can be nice.  I love experiencing new things.  A chance to come out of the shell and try something unknown sounds ideal to me.",
        },

        {
            You: "Do you have any examples?",
        },

        {
            Porchia:
                "One of the most interesting dates I ever had was spelunking in a partially submerged cave complete with bats.",
        },

        {
            You: "That sounds...kinda scary.",
        },

        {
            Porchia:
                "Oh it was.  At least the idea was a little scary.  Once I got there, I just had the chance to explore and check out the formations and animals.  It was really neat!",
        },

        {
            You:
                "How did you get in there?  Did you have to scuba dive in or something?",
        },

        {
            Porchia:
                "Oh, no.  Scuba diving sounds interesting, but in this case, we were able to ride kayaks into the entrance of the cave.  It was a guided tour, so it didn’t feel particularly dangerous.",
        },

        {
            You: "The more you talk about it, the more I wanna do it!",
        },

        {
            Porchia: "You really should!",
        },
    ],

    // What do you think about the crab monsters?
    5: [
        {
            Porchia: "I’m curious about them.",
        },

        {
            You: "How do you mean?",
        },

        {
            Porchia:
                "Well, we know that they exist because of some covert, government experiments, but we don’t really know much more than that.",
        },

        {
            You:
                "It sounds completely unbelievable, but I would’ve thought crab monsters existing at ALL was unbelievable before last year.",
        },

        {
            Porchia:
                "They’re a part of life now, but I want to try to understand them.  The better we understand them, the more likely we’ll all be able to survive.",
        },

        {
            You:
                "You sound like a pretty strong person.  I don’t know if I’d have the patience to learn much about them.",
        },

        {
            Porchia:
                "I like to be pushed outside my comfort zone.  I start in one small space and always look to expand and grow into a new one.  It’s part of life, so why fight it?",
        },

        {
            You: "Well, hopefully I never have to fight a crab monster…",
        },

        {
            Porchia: "That’s an experience I’d like to avoid as well...",
        },
    ],

    // Where are you from?
    6: [
        {
            Porchia: "Everywhere.",
        },

        {
            You: "Descriptive.",
        },

        {
            Porchia:
                "My family traveled a lot when I was younger.  My parents were in the military, so I don’t really have a particular physical location I can call home.",
        },

        {
            You: "Was it difficult for you?",
        },

        {
            Porchia:
                "Honestly, it felt completely natural.  I have always felt most comfortable hopping from place to place, home to home.  I feel that as I grow and mature and evolve, I can find a new place to fit who I am rather than trying to force myself to fit into an old place.",
        },

        {
            You:
                "I think it’d be tough for me to move away from what’s familiar so often.",
        },

        {
            Porchia:
                "It can be an adjustment, but for me it was a welcome one.  I love moving and exploring new things to this day.",
        },
    ],

    // Where would you travel if you could go anywhere?
    7: [
        {
            Porchia: "I’d probably visit Japan.",
        },

        {
            You: "Why Japan?",
        },

        {
            Porchia:
                "Well, the culture and the art are beautiful over there.  And the food.  Oh man…",
        },

        {
            You: "The sushi?",
        },

        {
            Porchia:
                "I’d probably eat all of it.  It would be a problem.  They’d probably send me home.",
        },

        {
            You: "I can appreciate good sushi.",
        },

        {
            Porchia:
                "Heck, I’d take bad sushi in Japan.  It would probably match some of the best sushi I’ve had over here.  The freshness of the fish over there is probably incredible.",
        },

        {
            You: "You’re very passionate about this.",
        },

        {
            Porchia:
                "I’m passionate about lots of things.  This is just one of them!",
        },
    ],

    // Dangerous topic...politics...go!
    8: [
        {
            Porchia:
                "You sure you want to get into that tonight?  BIG first date topic.",
        },

        {
            You: "I live on the edge.",
        },

        {
            Porchia:
                "Well, freedom is one of my primary values.  I want to be able to express myself in whatever format I see fit.",
        },

        {
            You: "I suppose you’re pretty anti-censorship.",
        },

        {
            Porchia:
                "Ten-million percent.  In college I had an art piece get taken down by a busy-body from Administration.  He thought it was too crass.",
        },

        {
            You: "What was the piece about?  Do I want to know?",
        },

        {
            Porchia:
                "It was called Circle.  It was a painting showing the life and death cycle...from birth, to living, to death, to decay, to fueling life again.",
        },

        {
            You:
                "Sounds like an interesting piece.  What didn’t the administration like?",
        },

        {
            Porchia:
                "It was fairly...graphic I guess.  The creatures consuming the bodies of the dead could bother some folks’ sensibilities.",
        },

        {
            You: "Yeah, that could be a little gross I guess.",
        },

        {
            Porchia:
                "Yet it is part of the natural life cycle.  Death fuels the ability for life to sprout again.  Can’t say I’m a fan of people who feel the need to censor everything.",
        },
    ],
};

export const porchia = {
    choices: {
        1: "So you say you’re into film…",
        2: "What do you do for a living?",
        3: "What kind of art do you like?",
        4: "What is an ideal date for you?",
        5: "What do you think about the crab monsters?",
        6: "Where are you from?",
        7: "Where would you travel if you could go anywhere?",
        8: "Dangerous topic...politics...go!",
    },
    dialogue: {
        human: porchia_human,
        crab: porchia_crab,
    },
};
