//COMMS Log Script Start
class CommunicationsLog {
            constructor(logElementId) {
                this.logElement = document.getElementById(logElementId);
                if (!this.logElement) {
                    console.error(`Communications log element with ID '${logElementId}' not found in the DOM.`);
                    return;
                }
                this.messageQueue = [];
                this.intervalId = null;
                this.Pilots = [
                    {"PILOTNAME":"KENJI", "CALLSIGN":"DECAF", "MECHNAME":"Manna Acquisition Device", "color": "#ff6600"}, // Orange
                    {"PILOTNAME":"ZARA", "CALLSIGN":"KRAKEN", "MECHNAME":"Whirlwind", "color": "#00aaff"}, // Blue
                    {"PILOTNAME":"MATEO", "CALLSIGN":"REGATTA","MECHNAME":"Understanding Infinity", "color": "#ffff00"}, // Yellow
                    {"PILOTNAME":"PRIYA", "CALLSIGN":"HELIOS", "MECHNAME":"No Mention of Hell","color": "#ff00ff"}, // Magenta
                    {"PILOTNAME":"ANYA", "CALLSIGN":"SORCERER","MECHNAME":"Black Magic", "color": "#00ff00"}  // Green
                ];
                this.Dialog = [
                    {
                        "DECLARATIONS":[
                            "{Pilot.MECHNAME} back online. All systems green. 🟢",
                            "I'm so damn tired 😴",
                            "I slept like shit last night. 🥱",
                            "Ready for the next ten mike hike, I guess.",
                            "Anyone got any good jokes? 😂",
                            "I'm calibrating my sensors - don't mind the noise.",
                            "Just finished my system diagnostics.",
                            "Still waiting on mission details.",
                            "Systems are running smoothly. 👍",
                            "Feeling a bit restless - need to find something to shoot soon.",
                            "Need more coffee. ☕",
                            "Checking weapon status.",
                            "It's you and me, {Pilot.MECHNAME} - time to get moving. 💪",
                            "All systems nominal.",
                            "Reporting in, ready for duty.",
                            "Anything interesting on the long-range scanners?",
                            "Just running some diagnostics.",
                            "Heat levels are optimal.",
                            "Communications link established with UNV-SC Valedictorian. Do you read Val?",
                            "Preparing for deployment.",
                            "Time to kick some ass.",
                            "I'm getting too old for this.",
                            "I am gonna' need a vacation after this.",
                            "Running some simulations while it's quiet.",
                            "Picking up interference - narrowing omni-band scanners.",
                            "My HUD is glitching out - gonna give it a couple good smacks. 😵‍💫",
                            "Detecting some sort of power surge in the village ahead. Stay frosty.",
                            "My ass is killing me from sitting in this cockpit all day. 🥴",
                            "Whoah, check out that bird. It's huge.",
                            "😮‍💨",
                            "😴",
                            "🧐",
                            "😒",
                            "😒",
                            "I did it. I finally beat my COMP/CON at tic-tac-toe. 🤖",
                            "Oh look at that adorable cat - here kitty-kitty.",
                            "Watch out - the ground is a little uneven here. Don't take a tumble.",
                            "Oh look - a dog is following us. Can we keep him? 🐕",
                            "Huh. Interesting architecture around these parts.",
                            "Look at the size of those trees. 🌲",
                            "Getting stuffy in this cockpit.",
                            "Might sit on the roof and get some air. I'll let the COMP/CON drive for a bit.",
                            "Anyone else want to get out and stretch their legs?",
                            "Don't mind us, just passing through.",
                            "Looks like there was a fight here recently. Wrecks are still smoldering. Sweep your sectors.",
                            "This is {Pilot.MECHNAME} to Valedictorian, can we get a wide-area scan here please? It's a little too quiet for my liking.",
                            "Oh, opening up the cockpit was a great idea - feel that breeze.",
                            "Oops. Almost stepped on that sheep.",
                            "Streets are too narrow here. Can barely fit.",
                            "Sorry, did one of you guys say something? Was blasting my music too loud.",
                            "Patrol duty...what a drag.",
                            "Slurping some noodles - going off comms for a bit. 🍜",
                            "Taking a quick snack break. COMP/CON is taking over.",
                            "Atlas Silver, on the move.",
                            "My bed is going to feel like a dream after this.",
                            "I'm so glad I got licensed for the expanded compartment - I have leg room now. 😍",
                            "Ah shit. I forgot to send my dad a happy birthday message. He's gonna be pissed.",
                            "Locals ahead. Best behavior, Atlas Silver.",
                            "This wouldn't be a bad spot to stop for a bit",
                            "{Pilot.MECHNAME} on the move.",
                            "Aircraft detected over head. Receiving IFF... it's one of ours. Wave to the friendly birdy. 🦅",
                            "Beat my old record. 35 seconds. Take that, rubics cube.",
                            "I think I'm coming down with some local bug. Time to hit up medical again. 🤧",
                            "Looks like rain.",
                            "Didn't realize how high up we were. No wonder it feels colder. 🥶",
                            "Ugh - Didn't realize how bad my cockpit smelled until now. Lighting some incense and opening all vents. Yikes. 🤢",
                            "Gonna scout ahead.",
                            "We are Oscar Mike."
                        ],
                        "CONVERSATIONS":[
                            {"STARTER":"Anyone got any good jokes? 😂",
                             "REPLYOPTS":[
                                {"text":"Why did the chicken...","followUp":[
                                    {"text":"Please no."},
                                    {"text":"Oh god."},
                                    {"text":"STOP!"},
                                    {"text":"Stow the chatter. Sensors picking up something."}
                                ]},
                                {"text":"Looked in the mirror lately?", "followUp":[
                                    {"text":"DAMN!"},
                                    {"text":"Sheeeesh. Tough crowd."},
                                    {"text":"🤡"},
                                    {"text":"Stow the chatter. Sensors picking up something."}
                                ]},
                                {"text":"Stow the chatter. Sensors picking up something."}
                             ]},
                            {"STARTER":"Nice weather huh? 😎",
                             "REPLYOPTS":[
                                 {"text":"It's alright"},
                                 {"text":"Not a cloud in the sky. ☀️", "followUp":[
                                     {"text":"Perfect for a sortie!"},
                                     {"text":"Hope it holds up. 🙏", "followUp": [
                                         {"text": "Me too, don't want to deal with atmospheric turbulence. 💨"},
                                         {"text": "Clear skies are always a plus. ✅"}
                                     ]}
                                 ]},
                                 {"text":"Looks like rain to me. 🌧️", "followUp":[
                                     {"text":"Great, just what we need. 😒"},
                                     {"text":"Hope we're indoors soon. 🤞", "followUp": [
                                         {"text": "My mech's cockpit seals aren't what they used to be. 😥"},
                                         {"text": "Wet circuits are a nightmare. 😱"}
                                     ]}
                                 ]},
                                 {"text":"Could be worse."},
                                 {"text":"Perfect for a sortie! 🚀"},
                                 {"text":"I prefer it indoors. 🏠"},
                                 {"text":"Makes no difference to me in the cockpit. 😎"},
                                 {"text":"Better than yesterday, that's for sure. 👍"}
                             ]},
                             {"STARTER":" The coffee this morning wasn't great was it? 🤢",
                             "REPLYOPTS":[
                                 {"text":"Tasted like it had been sitting in that carafe for a year. 😩", "followUp":[
                                     {"text":"Tasted like recycled coolant. 🤮"},
                                     {"text":"I'm surprised it didn't dissolve the cup. ☕💥", "followUp": [
                                         {"text": "Mine almost did. 😬"},
                                         {"text": "Need to file a complaint. 📝"}
                                     ]}
                                 ]},
                                 {"text":"I kinda like it when it gets a little like motor oil."},
                                 {"text":"I drank the whoooole pot. 😅"},
                                 {"text":"Tasted like recycled coolant. 🤮"},
                                 {"text":"I'm surprised it didn't dissolve the cup."},
                                 {"text":"Wait... that was coffee?","followUp":[
                                    {"text":"😂"},
                                    {"text":"Barely."}
                                 ]},
                                 {"text":"It's the only thing keeping me awake. 😵"},
                                 {"text":"I'll stick to my energy packs, thanks."}
                             ]},
                            { "STARTER": "Anyone see that game last night?",
                              "REPLYOPTS": [
                                  {"text":"Yeah, what a finish! 🎉", "followUp":[
                                      {"text":"Can't believe that final play. 🤯"},
                                      {"text":"Best game this season! 🔥", "followUp": [
                                          {"text": "Definitely worth staying up for. 👍"},
                                          {"text": "Still replaying it in my head. 🤔"}
                                      ]}
                                  ]},
                                  {"text":"Missed it, was in the bay fixing a loose servo. 🔧"},
                                  {"text":"Sports are a waste of time. 😒"},
                                  {"text":"The commentators were terrible. 😠"},
                                  {"text":"Highlight of the week!"},
                                  {"text":"My best friend had tickets, front row seats! They streamed the game for me. It was like I was there. 🤩"},
                                  {"text":"Better than the pre-mission briefing. 😂"},
                                  {"text":"Did anyone place any bets? 💰", "followUp":[
                                    {"text":"I don't want to talk about it...😰"},
                                    {"text":"Yup. 💰💰"},
                                    {"text":"Definitely would have been a good night to pick up a gambling addiction! 😄"}
                                  ]}
                              ]
                            },
                            { "STARTER": "How's everyone's mech handling?",
                              "REPLYOPTS": [
                                  {"text":"All systems green.", "followUp":[
                                      {"text":"Just finished a full tune-up. 🛠️"},
                                      {"text":"We're ready for anything. 💪", "followUp": [
                                          {"text": "Good to hear! 👍"},
                                          {"text": "Let's put her to the test. 🔥"}
                                      ]}
                                  ]},
                                  {"text":"Needs a bit of fine-tuning. 🔧"},
                                  {"text":"Holding together, somehow. 🤞"},
                                  {"text":"She's a beauty. 😍"},
                                  {"text":"Ready to rumble! 💥"},
                                  {"text":"Could use some upgrades. ⬆️", "followUp":[
                                      {"text":"Thinking about a new weapon system. 🔫","followUp":[
                                        {"text":"Oooh, new hardware. Exciting!"},
                                        {"text":"Did you peep the new SSC line of next-gen kinetics? Absolute beautes."},
                                        {"text":"Been eyeballing a new hacking suite. Maybe I can license it out when we get back to the Rio Grande."}
                                      ]},
                                      {"text":"Need better armor.", "followUp": [
                                          {"text": "Mine's seen better days too. 😥"},
                                          {"text": "Prioritizing defense. ✅"},
                                          {"text": "Don't need armor if you don't get hit. 🥷"},
                                          {"text": "Is armor still armor if it's mostly...holes?"}
                                      ]}
                                  ]},
                                  {"text":"Mine's like a second skin to me. ❤️"}
                              ]
                            },
                            { "STARTER": "What's the plan for after this? 🤔",
                              "REPLYOPTS": [
                                  {"text":"Some R&R is in order. 😌", "followUp":[
                                      {"text":"Heading to the recreation deck on the Valedictorian for the VR tournament. 🎮"},
                                      {"text":"Going to catch up on sleep. 😴", "followUp": [
                                          {"text": "You earned it. 👍"},
                                          {"text": "Don't oversleep the next briefing! ⏰"},
                                          {"text": "Long night last night huh? 😉😈"}
                                      ]}
                                  ]},
                                  {"text":"Back to the grind, I suppose. 😩"},
                                  {"text":"I've got plans. 😉"},
                                  {"text":"Cleaning my gear, what else?"},
                                  {"text":"Let's hit up the mess hall. 🍔","followUp":[
                                    {"text":"Some real grub sounds 🔥 right now."},
                                    {"text":"Think they have some actual food this time?"},
                                    {"text":"Yum...protein paste...again. 😩"}
                                  ]},
                                  {"text":"I am going to run some simulations. 💻"},
                                  {"text":"Catching up with family over an Omnichat. 👨‍👩‍👧‍👦"},
                                  {"text":"Preparing for the next operation."},
                                  {"text":"Gonna take a nice...hot...bath."}
                              ]
                            },
                            { "STARTER": "Did you hear about that pilot? 😮",
                              "REPLYOPTS": [
                                  {"text":"Yeah, crazy story. 🤯", "followUp":[
                                      {"text":"Hard to believe it happened. 😲"},
                                      {"text":"Mech combat is no joke.", "followUp": [
                                          {"text": "That's an understatement. 😬"},
                                          {"text": "Reminds you why we train so hard. 💪"}
                                      ]}
                                  ]},
                                  {"text":"Wonder what his hardware looked like - my rig couldn't pull off a stunt like that.","followUp":[
                                    {"text":"Sure it could. Once. 💀😂"},
                                    {"text":"Experimental Harrison plating. You'd be surprised what that shit can stop."},
                                    {"text":"Some top of the line Shimano displacer engines is what I heard. Paracausal. Blinked em' right out of existence before the shot hit, the back in right after.","followUp":[
                                        {"text":"Well shit. Lucky he came back at all."},
                                        {"text":"Paracausal tech scares the hell out of me."},
                                        {"text":"Damn. Where can I get one of those?"},
                                        {"text":"Hm. Interesting."}
                                    ]}
                                  ]},
                                  {"text":"The official story? I heard some rumors. 🤫"},
                                  {"text":"I served with them, sad news. 😔","followUp":[
                                    {"text":"Fuck..."},
                                    {"text":"Condolences."},
                                    {"text":"We'll drink one for them at the cantina after this."}
                                  ]},
                                  {"text":"Just another day on the job. 🤷"},
                                  {"text":"Crazy bastard."},
                                  {"text":"We should hold a memorial."},
                                  {"text":"What a waste. 😞"},
                                  {"text":"We all take that risk every time we leave." }
                              ]
                            },
                            { "STARTER": "Anyone need any spare parts?",
                              "REPLYOPTS": [
                                  {"text":"What have you got? 👀", "followUp":[
                                      {"text":"Looking for a new heat sink. 🔥"},
                                      {"text":"Need some ammo. 💥", "followUp": [
                                          {"text": "Always need more ammo. 😉"},
                                          {"text": "Running low myself. 😥"}
                                      ]}
                                  ]},
                                  {"text":"I'm good, thanks. 👍"},
                                  {"text":"Always good to have a backup. ✅"},
                                  {"text":"Looking for something specific. 🤔"},
                                  {"text":"I'll take a look later. 👀"},
                                  {"text":"Are these regulation? 🤔"},
                                  {"text":"You wouldn't happen to have a...", "followUp":[
                                      {"text":"...fusion core?","followUp":[
                                        {"text":"Yeah, I have an extra battery for you."},
                                        {"text":"My extra batts are all drained. Sorry kiddo. 🙁"}
                                      ]},
                                      {"text":"...targeting computer? 🎯", "followUp": [
                                          {"text": "Mine's on the fritz. 😵‍💫"},
                                          {"text": "Could use an upgrade. ⬆️"}
                                      ]}
                                  ]}
                              ]
                            },
                            { "STARTER": "This mission seems a bit quiet. 🤫",
                              "REPLYOPTS": [
                                  {"text":"Too quiet... 😬", "followUp":[
                                      {"text":"Makes me nervous. 😟"},
                                      {"text":"Something feels off. 🤔", "followUp": [
                                          {"text": "Keep your eyes peeled. 👀"},
                                          {"text": "Trust your gut. 👍"},
                                          {"text": "I got a bad feeling about this."}
                                      ]}
                                  ]},
                                  {"text":"Let's hope it stays that way. 🙏"},
                                  {"text":"Means we can relax, right? 😉"},
                                  {"text":"Don't jinx it! 🚫"},
                                  {"text":"Perfect time for some target practice. 🎯"},
                                  {"text":"I am getting readings.","followUp":[
                                    {"text":"NVRG?","followUp":[
                                        {"text":"Negative...locals. Stand down."},
                                        {"text":"No, those are ours. We're good. Send IFF."},
                                        {"text":"Scanning...Yeah...few chassis, look like new Vestan models. We have contact.","followUp":[
                                            {"text":"Okay boys and girls, switch to encrypted comms and get into position."},
                                            {"text":"You know the drill Atlas Silver. Switch to encrypted comms."},
                                            {"text":"Bout damn time. {Pilot.MECHNAME} and I are itching for a fight. Switching comms."}
                                        ]}
                                    ]},
                                    {"text":"Yeah me too. Looks like ROK friendlies."},
                                    {"text":"Same. Looks like LSAA auxiliaries. Signaling.","followUp":[
                                        {"text":"Be sure to wave. 👋"},
                                        {"text":"On it. IFF sent."}
                                    ]},
                                    {"text":"Ugh. LVAF. Friendlies...sorta.","followUp":[
                                        {"text":"Can't believe we're working with those bastards after Nov Elysia."},
                                        {"text":"Those jerks killed two of my friends in the Marines. Hate that we're working with them."},
                                        {"text":"Keep it professional. We're here to help the whole planet, not just the LSA. Remember that."},
                                        {"text":"Like it or not, they're allies. Keep it civil, Atlas Silver."}
                                    ]}
                                  ]},
                                  {"text":"I'm not complaining. 😌"},
                                  {"text":"Enjoy the silence while it lasts. ✨" }
                              ]
                            },
                            {"STARTER":"I am getting some readings.",
                             "REPLYOPTS":[
                                {"text":"NVRG?","followUp":[
                                    {"text":"Negative...locals. Stand down."},
                                    {"text":"No, those are ours. We're good. Send IFF."},
                                    {"text":"Scanning...Yeah...few chassis, look like new Vestan models. We have contact.","followUp":[
                                        {"text":"Okay boys and girls, switch to encrypted comms and get into position."},
                                        {"text":"You know the drill Atlas Silver. Switch to encrypted comms."},
                                        {"text":"Bout damn time. {Pilot.MECHNAME} and I are itching for a fight. Switching comms."}
                                    ]}
                                ]},
                                {"text":"Yeah me too. Looks like ROK friendlies."},
                                {"text":"Same. Looks like LSAA auxiliaries. Signaling IFF.","followUp":[
                                    {"text":"Be sure to wave. 👋"},
                                    {"text":"On it. IFF sent."}
                                ]},
                                {"text":"Ugh. LVAF. Friendlies...sorta.","followUp":[
                                    {"text":"Can't believe we're working with those bastards after Nov Elysia."},
                                    {"text":"Those jerks killed two of my friends in the Marines. Hate that we're working with them."},
                                    {"text":"Keep it professional. We're here to help the whole planet, not just the LSA. Remember that."},
                                    {"text":"Like it or not, they're allies. Keep it civil, Atlas Silver."}
                                ]}
                            ]},
                            {"STARTER":"Okay all, opinions on NHPs?",
                             "REPLYOPTS":[
                                {"text":"I like the one in my mech...usually.","followUp":[
                                    {"text":"Your girlfriend doesn't count, you clown. 🤣"},
                                    {"text":"Usually huh?"},
                                    {"text":"Blink once if the bad NHP is listening right now.🤣"},
                                    {"text":"Saved my life more than once."}
                                ]},
                                {"text":"They're great. Val kicks my ass at chess at least once a week.♟️","followUp":[
                                    {"text":"Well, at least he doesn't go easy on you."},
                                    {"text":"The deck's a little stacked against you on that one, friend."},
                                    {"text":"Jeez, what's even the point?"},
                                    {"text":"Glutton for punishment huh?"}
                                ]},
                                {"text":"You think they care when they're...cycled? Do you think they like...know?","followUp":[
                                    {"text":"Don't think about it too hard. You'll end up confused or sad."},
                                    {"text":"My COMP/CON doesn't care when I reset it, why should an NHP?"},
                                    {"text":"Wonder if it's like...dying and coming back? Gives me the willies. 😱"}
                                ]},
                                {"text":"Honestly...they kinda creep me out a bit.","followUp":[
                                    {"text":"Creep you out? How could Rio creep you out?"},
                                    {"text":"Don't let Val hear you say that - he'll be heartbroken.","followUp":[
                                        {"text":"Never seen an NHP cry as much as he does"},
                                        {"text":"Oh god, please don't tell him. He's precious."},
                                        {"text":"Nothing a good cycle won't fix."}
                                    ]},
                                    {"text":"After watching what a SEKHMET-Class NHP can do... I at least understand."},
                                    {"text":"Had a buddy with a Genghis...his AGNI NHP stopped listening to him. Just burned everything in a two mile radius for three hours before it started taking commands again. Freaky."}
                                ]},
                                {"text":"No comment."}
                             ]},
                            { "STARTER": "Best meal you've had on a ship? 🍔",
                              "REPLYOPTS": [
                                  {"text":"The synth-steak last Tuesday. 🥩"},
                                  {"text":"Anything but the algae paste. 🤢"},
                                  {"text":"I miss real food. 😩", "followUp":[
                                      {"text":"Remember that sushi place on Cradle? 🌍"},
                                      {"text":"Can't wait for shore leave. 🏖️", "followUp": [
                                          {"text": "Dreaming of a real burger. 🍔"},
                                          {"text": "Shore leave is the only thing getting me through. 💪"}
                                      ]}
                                  ]},
                                  {"text":"The chef is a genius. 👨‍🍳"},
                                  {"text":"It all tastes the same after a while. 🤷"},
                                  {"text":"I usually eat MREs. 🥫"},
                                  {"text":"Is that a trick question? 😉"},
                                  {"text":"Whatever doesn't makes me sick. 🤢" }
                              ]
                            },
                            { "STARTER": "Favorite mech weapon? 💥",
                              "REPLYOPTS": [
                                  {"text":"My trusty rifle."},
                                  {"text":"The energy cannon, hands down."},
                                  {"text":"Gotta love a good blade."},
                                  {"text":"Explosives are my go-to. 💣", "followUp":[
                                      {"text":"Nothing beats a big boom. 💥"},
                                      {"text":"The more explosions, the better. 🔥", "followUp": [
                                          {"text": "My kind of pilot. 😎"},
                                          {"text": "Gotta' have a little fun with it 😂"}
                                      ]}
                                  ]},
                                  {"text":"Why use any weapons when a drone can use them for you?"},
                                  {"text":"Nothing is quite as satisfying as overloading another mech's systems with a Remote.Sys.Fry protocol.","followUp":[
                                    {"text":"🧠"},
                                    {"text":"Who's a good little hacker? 🤓"},
                                    {"text":"Nerd alert.🚨"},
                                    {"text":"Far, far away from all the bullets."}
                                  ]},
                                  {"text":"Whatever gets the job done. ✅"},
                                  {"text":"The one with the biggest boom. 🔊"},
                                  {"text":"My custom loadout. ✨"},
                                  {"text":"Depends on the situation. 🤔" }
                              ]
                            },
                            { "STARTER": "Anyone up for a sim training session later?",
                              "REPLYOPTS": [
                                  {"text":"I could use the practice. 💪"},
                                  {"text":"Count me in. ✅", "followUp":[
                                      {"text":"Need to sharpen my skills. 🔪"},
                                      {"text":"Always good to train. 👍", "followUp": [
                                          {"text": "See you there. 👋"},
                                          {"text": "Don't go easy on me. 😉"}
                                      ]}
                                  ]},
                                  {"text":"Only if we're blowing things up. 💥"},
                                  {"text":"I'll be there. 👋"},
                                  {"text":"Depends on my schedule. 🗓️"},
                                  {"text":"Hard pass. 🙅"},
                                  {"text":"I am always up for training. 🔥"},
                                  {"text":"The only training I'm going to be doing after this is training my eyes to stare at the back of my eyelids for eight hours."},
                                  {"text":"Let me know the time. ⏰" }
                              ]
                            },
                            { "STARTER": "Heard any good rumors lately? 👂",
                              "REPLYOPTS": [
                                  {"text":"Nothing I can repeat on comms. 🤐"},
                                  {"text":"Just the usual gossip. 🤫"},
                                  {"text":"You know I am the last to know. 🤷"},
                                  {"text":"I only deal in facts. ✅"},
                                  {"text":"That is classified. 🔒"},
                                  {"text":"Oh boy have I. 👀", "followUp":[
                                      {"text":"Spill it! 🗣️", "followUp": [
                                          {"text": "Come on, don't be shy. 😉"},
                                          {"text": "My lips are sealed. 🤐"}
                                      ]},
                                      {"text":"Don't keep me in suspense. 😬"}
                                  ]}
                              ]
                            },
                            { "STARTER": "How's everyone doing?",
                              "REPLYOPTS": [
                                  {"text":"We're a well-oiled machine. 💪", "followUp":[
                                      {"text":"Best squad in the fleet."},
                                      {"text":"Hooah!"},
                                      {"text":"Getting the job done", "followUp": [
                                          {"text": "That's the spirit. 🔥"},
                                          {"text": "Wouldn't want to be on the other side. 😈"}
                                      ]}
                                  ]},
                                  {"text":"Hooah!"},
                                  {"text":"Seen better days. 😥"},
                                  {"text":"Ready for anything."},
                                  {"text":"The best in the sector. ✨"},
                                  {"text":"Bet those Juarez Blue boys wish they were us."},
                                  {"text":"You guys are like family to me. 👨‍👩‍👧‍👦"},
                                  {"text":"We stick together." }
                              ]
                            },
                            { "STARTER": "Okay - longest you've been in space? 🌌",
                              "REPLYOPTS": [
                                  {"text":"Too long. 😩"},
                                  {"text":"Just a few months. 🗓️"},
                                  {"text":"Lost track, to be honest. 🤔"},
                                  {"text":"Long enough to miss gravity. 🌎", "followUp":[
                                      {"text":"Nothing like solid ground again."},
                                      {"text":"Honestly, give me space over gravity any day.", "followUp": [
                                          {"text": "Zero-G is overrated. 🙄"},
                                          {"text": "My legs feel like jelly on planets. 🦵"}
                                      ]}
                                  ]},
                                  {"text":"It's basically home now."},
                                  {"text":"Leng enough that I prefer it to planets. ✨"},
                                  {"text":"Not long enough. 😎" }
                              ]
                            },
                            { "STARTER": "Strangest thing you've seen out there?",
                              "REPLYOPTS": [
                                  {"text":"You wouldn't believe me if I told you. 🤫", "followUp":[
                                      {"text":"Try me. 👀"},
                                      {"text":"I've seen things... 🤔", "followUp": [
                                          {"text": "Like what? 🤨"},
                                          {"text": "The less said, the better. 🤐"},
                                          {"text": "Yeah I'm sure you have maaan 🌿🚬"}
                                      ]}
                                  ]},
                                  {"text":"Space is full of weirdness. ✨"},
                                  {"text":"I try not to look too closely. 👀"},
                                  {"text":"I've seen some things... 😲"},
                                  {"text":"Nothing surprises me anymore. 🤷"},
                                  {"text":"That is a story for another time. 📖"},
                                  {"text":"I'll never forget it."}
                              ]
                            },
                            { "STARTER": "Did you remember to pack snacks? 🍫",
                              "REPLYOPTS": [
                                  {"text":"Always. ✅", "followUp":[
                                      {"text":"Essential mission gear. 👍"},
                                      {"text":"Wouldn't survive without them. 😩", "followUp": [
                                          {"text": "A pilot's gotta eat. 😋"},
                                          {"text": "My secret weapon. 😉"}
                                      ]}
                                  ]},
                                  {"text":"Wouldn't leave without them. 💪"},
                                  {"text":"Just the essentials. ✅"},
                                  {"text":"Synthesized nutrient paste counts, right? 🤔"},
                                  {"text":"I've got enough to share. 🤗", "followUp":[
                                    {"text":"Oh, you're my hero."},
                                    {"text":"I knew I liked you."}
                                  ]},
                                  {"text":"Depends on the mission duration. 🗓️"},
                                  {"text":"Is that a rhetorical question? 😉"},
                                  {"text":"Mech needs fuel, pilots need grub." }
                              ]
                            }
                        ]
                    }
                ];
                this.compConMessages = [
                    "SYSTEM BOOTING CENTCOM OS v3.2...",
                    "VERIFYING HARDWARE INTEGRITY...",
                    "ESTABLISHING NETWORK CONNECTION...",
                    "LOADING CORE MODULES...",
                    "EXECUTING OPERATIONAL CHECKLIST...",
                    "INITIALIZING SENSOR ARRAYS...",
                    "CALIBRATING WEAPON SYSTEMS...",
                    "ACTIVATING NEURAL INTERFACE...",
                    "DISPLAYING TACTICAL OVERLAY...",
                    "OPTIMIZING PERFORMANCE PARAMETERS...",
                    "SYNCING WITH TAC/COM DATABASE...",
                    "AWAITING MISSION BRIEFING...",
                    "COMMENCING SELF-DIAGNOSTICS...",
                    "INITIALIZING GUIDANCE SYSTEM...",
                    "CONFIGURING DEFENSE PROTOCOLS...",
                    "ESTABLISHING COMMS ARRAY LINK...",
                    "DOWNLOADING LATEST FIRMWARE...",
                    "ACTIVATING AUGMENTED REALITY FEED...",
                    "CONNECTING TO GLOBAL INFORMATION NETWORK...",
                    "DECRYPTING USER PROFILE...",
                    "VERIFYING LICENSE AGREEMENT...",
                    "ALLOCATING SYSTEM RESOURCES...",
                    "INITIATING STARTUP SEQUENCE...",
                    "LAUNCHING CORE PROCESSES...",
                    "METALLIC TEXTURE LOADING COMPLETE",
                    "ITERATIVE MAP REFINEMENT PASS 1",
                    "AUDIO BUFFER SYNCHRONIZATION COMPLETE",
                    "RUNNING POST-INSTALLATION SCRIPTS",
                    "EXECUTING DRIVER UPDATE",
                    "PERFORMING FILE SYSTEM INTEGRITY CHECK",
                    "ATTEMPTING TO CONNECT TO LOCAL NETWORK",
                    "RECONFIGURING SYSTEM REGISTRY",
                    "UPDATING SYSTEM TIME...",
                    "CLEARING EVENT LOG",
                    "COMPILING KERNEL...",
                    "INSTALLING VIRTUAL MACHINE...",
                    "NETWORK READY",
                    "LOGIN SUCCESSFUL",
                    "MESHING NHP NEURAL NETWORKS...",
                    "PLANETARY DATA DOWNLOADED",
                    "LOCAL CLOCK SYNCHRONIZED",
                    "SYSTEM READY"
                ];
                 this.lastSpeaker = null; // Track the last pilot to speak
                 this.pendingReply = null; // Track pending replies and their context

            }

            // Added isReply parameter
            addEntry(message, type = 'comms', isReply = false) {
                const entry = document.createElement('p');
                const timestamp = this.getTimestamp();
                entry.innerHTML = `<span class="timestamp">${timestamp}</span>`;

                if (type === 'comms') {
                    entry.innerHTML += `<span class="comms-header">${message}</span>`;
                } else if (type === 'compcon') {
                    entry.innerHTML += `<span class="compcon-text">COMP/CON: ${message}</span>`;
                } else if (type === 'pilot') {
                    // Add reply indicator if it's a reply
                    if (isReply) {
                         entry.innerHTML += `<span class="reply-indicator">↳ </span>`; // Using a curved arrow character
                    }

                    // Find the pilot object to get the color and mech name
                    const pilotCallsign = message.split(':')[0]; // Extract callsign from message
                    const pilot = this.Pilots.find(p => p.CALLSIGN === pilotCallsign);
                    const pilotColor = pilot ? pilot.color : '#ff6600'; // Default to orange if pilot not found
                    // Mech name replacement logic is now handled before adding the entry


                    // Create the pilot name span and set its color dynamically
                    const pilotNameSpan = document.createElement('span');
                    pilotNameSpan.classList.add('pilot-name');
                    pilotNameSpan.style.color = pilotColor;
                    pilotNameSpan.textContent = pilotCallsign + ': '; // Add callsign and colon

                    entry.appendChild(pilotNameSpan); // Append the colored pilot name span
                    entry.innerHTML += message.split(':')[1].trim(); // Add the rest of the message (already processed for mech name)
                } else {
                    entry.textContent = message;
                }

                this.logElement.appendChild(entry);
                this.logElement.scrollTop = this.logElement.scrollHeight;
                this.messageQueue.push({ element: entry, time: new Date().getTime() });
                this.cullMessages();
            }

            getTimestamp() {
                const now = new Date();
                const minutes = String(now.getMinutes()).padStart(2, '0');
                const seconds = String(now.getSeconds()).padStart(2, '0');
                const milliseconds = String(now.getMilliseconds()).padStart(3, '0');
                return `t+${minutes}:${seconds}.${milliseconds}`;
            }

            cullMessages() {
                const maxTime = 80000;
                const now = new Date().getTime();
                while (this.messageQueue.length > 0) {
                    const messageTime = this.messageQueue[0].time;
                    if (now - messageTime > maxTime) {
                        this.logElement.removeChild(this.messageQueue[0].element);
                        this.messageQueue.shift();
                    } else {
                        break;
                    }
                }
            }

            getRandomDeclaration() {
                const declarations = this.Dialog[0].DECLARATIONS;
                if (!declarations || declarations.length === 0) {
                    return null;
                }
                const randomDeclaration = declarations[Math.floor(Math.random() * declarations.length)];

                // Select a random pilot (anyone except the last speaker if there was one)
                let declaringPilot = null;
                const availableDeclarers = this.Pilots.filter(pilot => pilot.CALLSIGN !== this.lastSpeaker);

                if (availableDeclarers.length > 0) {
                    declaringPilot = availableDeclarers[Math.floor(Math.random() * availableDeclarers.length)];
                } else if (this.Pilots.length > 0) {
                    // If only one pilot, they can talk to themselves or just declare
                    declaringPilot = this.Pilots[0];
                } else {
                    return null; // No pilots available
                }

                 // Replace placeholder in the message if it exists
                let processedDeclaration = randomDeclaration;
                if (declaringPilot && processedDeclaration.includes('{Pilot.MECHNAME}')) {
                    processedDeclaration = processedDeclaration.replace('{Pilot.MECHNAME}', declaringPilot.MECHNAME || 'Mech');
                }


                return {
                    type: 'declaration',
                    pilot: declaringPilot,
                    message: processedDeclaration // Use the processed message
                };
            }

            getRandomConversation() {
                const conversations = this.Dialog[0].CONVERSATIONS;
                if (!conversations || conversations.length === 0) {
                    return null;
                }

                // Select a random conversation starter
                const randomConversation = conversations[Math.floor(Math.random() * conversations.length)];

                // Select a random initiating pilot (anyone except the last speaker if there was one)
                let initiatingPilot = null;
                const availableInitiators = this.Pilots.filter(pilot => pilot.CALLSIGN !== this.lastSpeaker);

                if (availableInitiators.length > 0) {
                    initiatingPilot = availableInitiators[Math.floor(Math.random() * availableInitiators.length)];
                } else if (this.Pilots.length > 0) {
                    // If only one pilot, they can't have a conversation with someone else
                     return null; // Cannot start a conversation with only one pilot
                } else {
                    return null;
                }


                // Select a random responding pilot (anyone except the initiator)
                let respondingPilot = null;
                const availableResponders = this.Pilots.filter(pilot => pilot.CALLSIGN !== initiatingPilot.CALLSIGN);

                if (availableResponders.length > 0) {
                    respondingPilot = availableResponders[Math.floor(Math.random() * availableResponders.length)];
                } else {
                    // If only one pilot, respondingPilot remains null, which means no conversation is possible
                    return null;
                }

                // Replace placeholder in the starter message if it exists
                let processedStarter = randomConversation.STARTER;
                if (initiatingPilot && processedStarter.includes('{Pilot.MECHNAME}')) {
                     processedStarter = processedStarter.replace('{Pilot.MECHNAME}', initiatingPilot.MECHNAME || 'Mech');
                }
                let processedReply = randomConversation.REPLYOPTS;
                if (initiatingPilot && processedReply.includes('{Pilot.MECHNAME}')) {
                     processedStarter = processedReply.replace('{Pilot.MECHNAME}', initiatingPilot.MECHNAME || 'Mech');
                }

                return {
                    type: 'conversation',
                    initiator: initiatingPilot,
                    starter: processedStarter, // Use the processed starter
                    replies: randomConversation.REPLYOPTS, // replies are now objects
                    replier: respondingPilot // This might be null if only one pilot
                };
            }


            startLog() {
                if (this.intervalId) return;

                const bootUpMessages = [
                    "SYSTEM BOOTING CENTCOM OS v3.2...",
                    "VERIFYING HARDWARE INTEGRITY...",
                    "ESTABLISHING NETWORK CONNECTION...",
                    "LOADING CORE MODULES...",
                    "INITIALIZING SENSOR ARRAYS...",
                    "CALIBRATING WEAPON SYSTEMS...",
                    "ACTIVATING NEURAL INTERFACE...",
                    "DISPLAYING TACTICAL OVERLAY..."
                ];

                let bootUpIndex = 0;
                const bootUpInterval = setInterval(() => {
                    // Display only the first 10 messages
                    if (bootUpIndex < bootUpMessages.length) {
                        this.addEntry(bootUpMessages[bootUpIndex], 'compcon');
                        bootUpIndex++;
                    } else {
                        clearInterval(bootUpInterval);
                        this.lastSpeaker = null; // Reset last speaker after boot up

                        // Start the regular log interval after boot up
                        // Increased base time and random variance for slower, more varied dialog
                        this.intervalId = setInterval(() => {
                            const random = Math.random();

                            if (this.pendingReply) { // Handle pending reply
                                const replyOpts = this.pendingReply.replies;
                                if (replyOpts && replyOpts.length > 0) {
                                    const randomReplyObj = replyOpts[Math.floor(Math.random() * replyOpts.length)]; // Get a random reply object from the current level
                                    const replyText = randomReplyObj.text; // Get the text from the object
                                    const replier = this.Pilots.find(p => p.CALLSIGN === this.pendingReply.replier);

                                    if (replier) {
                                        // Pass isReply = true since this is a reply in a chain
                                        this.addEntry(`${replier.CALLSIGN}: ${replyText}`, 'pilot', true);
                                        this.lastSpeaker = replier.CALLSIGN;

                                        // Check for nested follow-up replies
                                        if (randomReplyObj.followUp && randomReplyObj.followUp.length > 0) {
                                            // Select a new replier for the next turn (different from the current speaker)
                                            const availableFollowUpResponders = this.Pilots.filter(pilot => pilot.CALLSIGN !== replier.CALLSIGN);
                                            if (availableFollowUpResponders.length > 0) {
                                                const nextReplier = availableFollowUpResponders[Math.floor(Math.random() * availableFollowUpResponders.length)];
                                                // Set up a new pending reply for the next interval with the next level of replies
                                                this.pendingReply = {
                                                    replier: nextReplier.CALLSIGN,
                                                    replies: randomReplyObj.followUp // Pass the array of nested reply objects
                                                };
                                            } else {
                                                 this.pendingReply = null; // No available pilot for follow-up
                                            }
                                        } else {
                                             this.pendingReply = null; // No further follow-up replies for this branch
                                        }

                                    } else {
                                        this.pendingReply = null; // Replier not found
                                    }
                                } else {
                                     this.pendingReply = null; // No reply options at this level
                                }
                            } else if (random < 0.6) { // Increased chance for pilot messages
                                const dialogType = Math.random(); // Decide between declaration and conversation

                                if (dialogType < 0.6 || this.Pilots.length < 2) { // Higher chance for declaration, or if only one pilot
                                    const declaration = this.getRandomDeclaration();
                                    if (declaration) {
                                        // Declarations are not replies in a chain
                                        this.addEntry(`${declaration.pilot.CALLSIGN}: ${declaration.message}`, 'pilot', false);
                                        this.lastSpeaker = declaration.pilot.CALLSIGN;
                                    }
                                } else { // Conversation
                                    const conversation = this.getRandomConversation();
                                    if (conversation && conversation.replier) { // Ensure there's a replier for a conversation
                                        // The start of a conversation is not a reply in a chain
                                        this.addEntry(`${conversation.initiator.CALLSIGN}: ${conversation.starter}`, 'pilot', false);
                                        this.lastSpeaker = conversation.initiator.CALLSIGN;
                                        // Set up pending reply for the next interval with the initial replies
                                        this.pendingReply = {
                                            replier: conversation.replier.CALLSIGN,
                                            replies: conversation.replies // Pass the initial array of reply objects
                                        };
                                    } else {
                                        // Fallback to declaration if conversation couldn't be set up (e.g., only one pilot)
                                        const declaration = this.getRandomDeclaration();
                                        if (declaration) {
                                            this.addEntry(`${declaration.pilot.CALLSIGN}: ${declaration.message}`, 'pilot', false);
                                            this.lastSpeaker = declaration.pilot.CALLSIGN;
                                        }
                                    }
                                }

                            } else { // 30% chance of COMP/CON message
                                const randomMessage = this.compConMessages[Math.floor(Math.random() * this.compConMessages.length)];
                                this.addEntry(randomMessage, 'compcon');
                                this.lastSpeaker = null; // COMP/CON messages don't count as pilot speech for preventing immediate replies
                            }
                        }, 3000 + Math.random() * 7000); // Increased interval for slower, more varied dialog
                    }
                }, 100); // Initial interval for boot-up messages (adjust speed here)
            }


            stopLog() {
                if (this.intervalId) {
                    clearInterval(this.intervalId);
                    this.intervalId = null;
                }
            }
        }

        document.addEventListener('DOMContentLoaded', () => {
            const commsLog = new CommunicationsLog('communications-log');
            commsLog.startLog();
        });
