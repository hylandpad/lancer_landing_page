// /scripts/script.js

// Constants for DOM elements from Mission Briefing
const missionHeader = document.getElementById('mission-header'); 

// Constants for Combat Log (prefixed to avoid conflicts if any)
const combatLogMessagesContainer = document.getElementById('combat-log-messages');
const combatLogHeaderArea = document.getElementById('combat-log-header-area');

// --- Mission Briefing Typing Animation Data & Functions ---
const briefingCodePhrases = [
   "++//Initializing Neural Interface...", "++//Establishing Link to local OMNINET Network...", "++//Decrypting Security Clearances...",
    "++//Routing Power to Auxiliary Systems...", "++//Calibrating Phase Coherence Matrix...", "++//Analyzing Biometric Signatures...",
    "++//Synchronizing Tactical NHP controllers...", "++//Collating CentCom Metaethical NHP Responses...", "++//Re-establishing Communication with Union Naval Command...",
    "++//Loading THALASSA class NHP interfaces...", "++//Parsing Local translations...", "++//Generating Probabilistic Trajectory...",
    "++//Optimizing Resource Allocation...", "++//Configuring ANTI-HACK Protocols...", "++//Activating Trapdoor Anti-Surveillance protocols...",
    "++//Running shipwide database diagnostics...", "++//Calculating orbital insertion trajectory...", "++//Running most up-to-date local economic simulations...",
    "++//Deploying Reconnaissance Drone swarm...", "++//Downloading Mission Parameters...","++//Loading SARGASSO class NHP interfaces...","++//Creating Mesh Network interface with LSA Systems...",
    "++//Combat Theater Uplink loading...", "++//Retrieving Surveillance Footage from Civilian Infrastructure..."
];

/**
 * Creates and manages a single instance of the typing animation.
 * @param {string} textElId - The ID of the span element for the text.
 * @param {string} progressBarElId - The ID of the div element for the progress bar.
 * @param {Array<string>} phrases - Array of phrases to type.
 * @param {number} initialDelay - Delay in ms before this instance starts.
 */
function createTypingAnimationInstance(textElId, progressBarElId, phrases, initialDelay = 0) {
    const textElement = document.getElementById(textElId);
    const progressBarElement = document.getElementById(progressBarElId);

    if (!textElement || !progressBarElement) {
        console.error(`Elements not found for typing animation instance: ${textElId}, ${progressBarElId}`); 
        return;
    }

    let currentPhraseIndex = Math.floor(Math.random() * phrases.length); 
    let displayText = '';
    let typingInterval;
    let eraseInterval;
    let phraseTimeout;
    
    function updateProgressBarInstance(time, duration) {
        if (duration <= 0) return;
        const fillPercentage = Math.min((time / duration) * 100, 100);
        progressBarElement.style.width = `${fillPercentage}%`;
    }

    function eraseTextInstance() {
        eraseInterval = setInterval(() => {
            if (displayText.length > 0) {
                displayText = displayText.slice(0, -1);
                textElement.textContent = displayText;
            } else {
                clearInterval(eraseInterval);
                setTimeout(() => {
                    currentPhraseIndex = (currentPhraseIndex + 1) % phrases.length;
                    typeTextInstance(phrases[currentPhraseIndex]);
                }, 200 + Math.random() * 300); 
            }
        }, 25 + Math.random() * 25); 
    }
    
    function startEraseInstance() {
        progressBarElement.style.width = '0%';
        eraseTextInstance();
    }

    function typeTextInstance(text) {
        let i = 0;
        const phraseDisplayDuration = Math.random() * 4000 + 3000; 
        let timePassedThisPhrase = 0;

        clearInterval(typingInterval); 
        clearInterval(eraseInterval); 
        clearTimeout(phraseTimeout);  

        displayText = ''; 
        textElement.textContent = displayText;
        progressBarElement.style.width = '0%';

        typingInterval = setInterval(() => {
            if (i < text.length) {
                displayText += text[i];
                textElement.textContent = displayText;
                i++;
            }
            
            timePassedThisPhrase += 50;
            updateProgressBarInstance(timePassedThisPhrase, phraseDisplayDuration);

            if (timePassedThisPhrase >= phraseDisplayDuration && i >= text.length) {
                clearInterval(typingInterval);
                phraseTimeout = setTimeout(() => {
                    if (textElement) { 
                        textElement.textContent = displayText + " DONE";
                    }
                    if (progressBarElement) { 
                        progressBarElement.style.width = '100%';
                    }
                    setTimeout(startEraseInstance, 1000 + Math.random() * 1000); 
                }, 500 + Math.random() * 500); 
            }
        }, 50 + Math.random() * 30); 
    }
    
    setTimeout(() => {
        typeTextInstance(phrases[currentPhraseIndex]);
    }, initialDelay);
}


// --- Tooltip Data & Functions ---
let pageTooltipElement = null;
function createTooltipElement() {
    if (!document.getElementById('page-tooltip')) { 
        pageTooltipElement = document.createElement('div');
        pageTooltipElement.id = 'page-tooltip';
        document.body.appendChild(pageTooltipElement);
    } else {
        pageTooltipElement = document.getElementById('page-tooltip');
    }
}
function initializeTooltips() {
    createTooltipElement(); 
    const tooltipTriggers = document.querySelectorAll('.tooltip-trigger');
    tooltipTriggers.forEach(trigger => {
        trigger.removeEventListener('mouseenter', showTooltip);
        trigger.removeEventListener('mouseleave', hideTooltip);
        trigger.addEventListener('mouseenter', showTooltip);
        trigger.addEventListener('mouseleave', hideTooltip);
    });
}
 function showTooltip(event) {
    const trigger = event.target;
    const tooltipText = trigger.dataset.tooltipText;
    if (tooltipText && pageTooltipElement) {
        pageTooltipElement.textContent = tooltipText;
        const rect = trigger.getBoundingClientRect();
        let tooltipX = rect.left + window.scrollX;
        let tooltipY = rect.top + window.scrollY - 10; 
        pageTooltipElement.style.visibility = 'hidden';
        pageTooltipElement.style.display = 'block'; 
        const tooltipHeight = pageTooltipElement.offsetHeight;
        const tooltipWidth = pageTooltipElement.offsetWidth;
        pageTooltipElement.style.display = ''; 
        pageTooltipElement.style.visibility = ''; 
        tooltipY -= tooltipHeight; 
        if (tooltipY < window.scrollY) {
            tooltipY = rect.bottom + window.scrollY + 5; 
        }
        if (tooltipX < 0) tooltipX = 5; 
        if (tooltipX + tooltipWidth > window.innerWidth) {
            tooltipX = window.innerWidth - tooltipWidth - 5; 
        }
        pageTooltipElement.style.left = `${tooltipX}px`;
        pageTooltipElement.style.top = `${tooltipY}px`;
        pageTooltipElement.classList.add('visible');
    }
}
function hideTooltip() {
     if (pageTooltipElement) {
        pageTooltipElement.classList.remove('visible');
    }
}

// --- Mission Briefing Roster Population ---
function populateJuarezBlueRoster(pilots, chassisData) { 
    const rosterContainer = document.getElementById('juarez-blue-roster'); 
    if (!rosterContainer) { console.error("Juarez Blue roster container not found."); return; }
    rosterContainer.innerHTML = ''; 
    pilots.forEach(pilot => {
        const mech = chassisData.find(c => c.Pilot === pilot.Name); 
        if (!mech) { console.warn(`Mech not found for Juarez Blue pilot: ${pilot.Name}`); return; }
        let makeTooltip = `${mech.Make}: Manufacturer details.`; 
        if (mech.Make === "GMS") makeTooltip = "General Massive Systems: One of the 'Big Four' corpro-states, known for reliable, ubiquitous chassis and standardized equipment. Often the baseline for mech technology.";
        if (mech.Make === "IPS-N") makeTooltip = "Interplanetary Shipping - Northstar: One of the 'Big Four' corpro-states, specializing in interstellar logistics and robust, durable mech frames designed for industrial use and close-quarters combat.";
        if (mech.Make === "Horus") makeTooltip = "HORUS: Enigmatic and decentralized, HORUS is one of the 'Big Four'. Known for pattern-group intelligence, paracausal technology, and mechs excelling in electronic warfare and unconventional tactics.";
        if (mech.Make === "Harrison Armory") makeTooltip = "Harrison Armory: One of the 'Big Four' corpro-states and a major military power. Specializes in high-energy weaponry, advanced armor, directed-energy weapons, and powerful, often heat-intensive, war machines.";
        let modelTooltip = `${mech.Model}: Specifics about this chassis model.`; 
        if (mech.Model === "Everest (Chomolungma Variant)") modelTooltip = "Chomolungma: An advanced electronic warfare variant of the standard GMS Everest, developed with Union's Advanced Projects agency. Features enhanced sensors, communication systems, and hacking capabilities.";
        if (mech.Model === "Raleigh") modelTooltip = "Raleigh: An IPS-N frame known for its unique interaction with Loading weapons, allowing rapid reloads and follow-up attacks. Often customized for explosive or close-range kinetic barrages.";
        if (mech.Model === "Hechatoncheires") modelTooltip = "Hechatoncheires: A HORUS frame focused on drone control and area denial. Known for deploying and manipulating a hazardous 'Razor Swarm' drone field for close-quarters control and attrition.";
        if (mech.Model === "Enkidu") modelTooltip = "Enkidu: A Harrison Armory frame derived from the Sherman chassis, heavily modified for brutal melee combat. Known for its aggression and berserker-like capabilities in close quarters.";
        if (mech.Model === "Tortuga") modelTooltip = "Tortuga: A heavily armored IPS-N defender frame. Designed as a mobile bulwark for breach-and-clear operations, particularly effective at holding positions and sweeping confined spaces like ship corridors.";
        const pilotDiv = document.createElement('div');
        pilotDiv.className = 'p-3 border border-gray-700 rounded-md bg-gray-800 bg-opacity-50 frame';
        pilotDiv.innerHTML = `
            <div class="w-full">
                <img class="overlay-image-left hidden md:block" src="${pilot.Image}">
                <div class="overlay-image-right hidden md:block" style="background:url(${mech.Image});background-color:${pilot.PortraitColor};background-repeat: no-repeat;background-position: center;">
                    <h2>${pilot.Callsign}</h2>
                    <h3>${mech.Name}</h3>
                </div>
            </div>
            <h3 class="text-lg font-semibold text-teal-300">
                <span>${pilot.Callsign}</span> - ${pilot.Name} 
            </h3>
            <p class="text-sm italic text-gray-400">
                Mech: <span class="font-semibold">${mech.Name}</span> 
                (<span class="tooltip-trigger" data-tooltip-text="${makeTooltip}">${mech.Make}</span> 
                <span class="tooltip-trigger" data-tooltip-text="${modelTooltip}">${mech.Model}</span>)
            </p>
            <p class="text-xs text-gray-500">
                Primary Role: <span>${mech.Specialization}</span> | 
                Background: <span>${pilot.Occupation}</span>
            </p>
            <p class="mt-2 text-base">${pilot.Description}</p>
        `;
        rosterContainer.appendChild(pilotDiv);
    });
}

function populateAtlasSilverBriefingRoster(pilots, chassisData) { 
    const rosterContainer = document.getElementById('atlas-silver-briefing-roster'); 
    if (!rosterContainer) { console.error("Atlas Silver briefing roster container not found."); return; }
    rosterContainer.innerHTML = ''; 
    pilots.forEach(pilot => {
        const mech = chassisData.find(c => c.PilotCallsign === pilot.Callsign); 
        if (!mech) { console.warn(`Mech not found for Atlas Silver pilot: ${pilot.Callsign}`); return; }
         let makeTooltip = `${mech.Make}: Manufacturer details.`; 
        if (mech.Make === "GMS") makeTooltip = "General Massive Systems: One of the 'Big Four' corpro-states, known for reliable, ubiquitous chassis and standardized equipment. Often the baseline for mech technology.";
        if (mech.Make === "IPS-N") makeTooltip = "Interplanetary Shipping - Northstar: One of the 'Big Four' corpro-states, specializing in interstellar logistics and robust, durable mech frames designed for industrial use and close-quarters combat.";
        if (mech.Make === "Horus") makeTooltip = "HORUS: Enigmatic and decentralized, HORUS is one of the 'Big Four'. Known for pattern-group intelligence, paracausal technology, and mechs excelling in electronic warfare and unconventional tactics.";
        if (mech.Make === "Harrison Armory") makeTooltip = "Harrison Armory: One of the 'Big Four' corpro-states and a major military power. Specializes in high-energy weaponry, advanced armor, directed-energy weapons, and powerful, often heat-intensive, war machines.";
        let modelTooltip = `${mech.Model}: Specifics about this chassis model.`; 
        if (mech.Model === "Everest") modelTooltip = "Everest: The workhorse GMS frame, known for its versatility and reliability. A balanced platform suitable for a wide range of combat roles and pilot skill levels.";
        if (mech.Model === "Blackbeard") modelTooltip = "Blackbeard: An aggressive IPS-N melee brawler, excelling at grappling and close-quarters devastation. Feared for its 'berserker' capabilities.";
        if (mech.Model === "Sherman") modelTooltip = "Sherman: A Harrison Armory frame focused on sustained ranged firepower, particularly with energy weapons. Known for its ability to manage and exploit high heat levels.";
        if (mech.Model === "Tokugawa") modelTooltip = "Tokugawa: A high-risk, high-reward Harrison Armory frame that pushes its systems to the limit for devastating power, often operating deep within its heat capacity.";
        if (mech.Model === "Goblin") modelTooltip = "Goblin: A HORUS frame specializing in advanced electronic warfare, hacking, and system intrusion. Capable of crippling enemy mechs through non-conventional means.";

        const pilotDiv = document.createElement('div');
        pilotDiv.className = 'p-3 border border-gray-700 rounded-md bg-gray-800 bg-opacity-50 frame';
        pilotDiv.innerHTML = `
            <div class="w-full">
                <img class="z-49 overlay-image-left hidden md:block" src="${pilot.Image}">
                <div class="z-49 overlay-image-right hidden md:block" style="background:url(${mech.Image});background-color:${pilot.PortraitColor};background-repeat: no-repeat;background-position: center;">
                    <h2>${pilot.Callsign}</h2>
                    <h3>${mech.Name}</h3>
                </div>
            </div>
            <h3 class="text-lg font-semibold text-teal-300">
                <span>${pilot.Callsign}</span> - ${pilot.Name} 
            </h3>
            <p class="text-sm italic text-gray-400">
                Mech: <span class="font-semibold">${mech.Name}</span> 
                (<span class="tooltip-trigger" data-tooltip-text="${makeTooltip}">${mech.Make}</span> 
                <span class="tooltip-trigger" data-tooltip-text="${modelTooltip}">${mech.Model}</span>)
            </p>
            <p class="text-xs text-gray-500">
                Primary Role: <span>${mech.Specialization}</span> | 
                Background: <span>${pilot.Occupation}</span>
            </p>
            <p class="mt-2 text-base">${pilot.Description}</p>
        `;
        rosterContainer.appendChild(pilotDiv);
    });
}

// --- Mission Briefing Scroll & Load ---
let briefingScrolled = false; 
window.addEventListener('scroll', () => {
    if (missionHeader) { 
        if (window.scrollY > 50) { 
            if (!briefingScrolled) {
                missionHeader.classList.add('scrolled');
                briefingScrolled = true;
            }
        } else { 
            if (briefingScrolled) {
                missionHeader.classList.remove('scrolled');
                briefingScrolled = false;
            }
        }
    }
});

window.addEventListener('load', () => {
    const loadingOverlay = document.getElementById('loading-overlay');
    const codeDisplayContainer = document.getElementById('code-display'); 
    const mainContentWrapper = document.querySelector('div.relative.z-10.pt-44'); 
    
    const loadingTextInitializing = document.getElementById('loading-text-initializing');
    const loadingTextVerifying = document.getElementById('loading-text-verifying');
    const loadingTextAuthorized = document.getElementById('loading-text-authorized');
    const loadingTextLancer = document.getElementById('loading-text-lancer');

    const totalLoadingDuration = 3000; 
    const verificationPhaseDuration = 1500; 

    const characters = {
            "Characters": [
                {
                    "Name": "Vonna Mayhew",
                    "Association": "LSAA",
                    "Description": "Before the VSAF invasion of Nov Elysia, Vonna was a simple civilian mechanic, with a perhaps slightly above average aptitutde for her trade. Since the invasion, Vonna has signed up as a full fledged member of the LSAA, and has been put on active duty aboard the UNV-SC Valedictorian as Juarez Blue's master engineer & mechanic",
                    "Portrait": "./images/vonna.png"
                },
                {
                    "Name": "Nilan Bannerjee",
                    "Association": "Union",
                    "Description": "Ambassador Nilan Bannerjee is a seasoned veteran of the Union Diplomatic Corps, and has overseen two previous Diasporan reunifications from start to finish prior to his arrival on Cressidium. They're an astute intellectual, a consummate professional and fully bought in to the Union cause of reunification of all disaporan human worlds.",
                    "Intel": "Bannerjee's status is not well known. The augmetics that monitored their vitals became inactive shortly after Captain Farris was rescued, leading Union Intelligence to believe that they had been surgically removed to prevent further tracking. With the pretext that they are alive, it is believed that Bannerjee is being held either in a Vestan Prison somewhere on the border regions of the former Sovereignty, or within a NVRG blacksite is NVRG controlled Okasnia.",
                    "Portrait": "./images/bannerjee.png"
                },
                {
                    "Name": "Mayra Strong",
                    "Association": "Union",
                    "Description": "Mayra Strong is a UNI officer who had been stationed on Cressidium months before the attack on Nov Elysia, and before the arrival of the Rio Grande. She had been acting in an advisory capacity to the LSA brass in an attempt to prepare them for a potential hostile action by the Vestan Sovereignty in the event of an overt action as a response to a heavier Union Presence on the planet. Despite her carefully curated appearance, Mayra is at home in a foxhole as she is bumping shoulders with socialites at high-society events.",
                    "Intel": "OPERATION ANGLERFISH: While Strong was ostensibly stationed on Cressidium to prep the LSAA for a potential Vestan attack, her primary goal was to investigate reports of the cloneborne descendents of known Second Committee officers that had been allegedly spirited away to Cressidium after the fall of the regime. While she was never able to visually confirm this to be the case prior to the invasion, the presence of SecCom military doctrine within the ranks of the VSAF made it clear to her that SecCom's fingerprints could be seen all over the VS high command. Her suspicions were confirmed when the body of Commander Sorvan Kiros was retrieved, and various SecCom paraphanelia was recovered from his cockpit.",
                    "Portrait": "./images/mayra_strong.png"
                },
                {
                    "Name": "Jerry Spurlock",
                    "Association": "IPS-N",
                    "Description": "Jerry Spurlock is an IPS-N magnate that was tasked with overseeing the establishment of safe shipping lanes across the Cascadia line to Cressidium, in order to start to establish moving high quality Union goods and services to Cressidium. Spurlock is enterprising and a devoted company man, having served IPS-N in many different capacities. One may not know if from his white hair and aged looks, but Spurlock was a Trunk Security officer and a Captain of an security cruiser before he settled into more administrative work.",
                    "Intel": "IPS-N facilitated intelligence gathering endeavors for OPERATION ANGLERFISH, and Jerry is responsible in part for the intel Mayra Strong was able to gather post-invasion. It is also known that Jerry has been working with multiple individuals, including one Union Lancer to set up private enterprises on Cressidium. These independent actions are permitted to fly under the radar for the time being, so long as they don't preclude any fulfillment of Cressidium's compliance with the Utopian Pillars.",
                    "Portrait": "./images/ipsn_jerry_spurlock.png"
                },
                {
                    "Name": "Hiram Stark",
                    "Association": "LVAF",
                    "Description": "Field Marshall Hiram Stark is one of a dozen high ranking officers that survived the military purge after the failed VSAF invasion of Nov Elysia. Part of the so-called 'Progressive Wing' of the top brass, Stark was a decorated VSAF warfighter, serving in several successful campaigns quelling Okasnian and local uprisings. He is a formidable combatant, and was a founding member of the VSAF 'Furies' Special forces regiment, before being ousted by the Antrhochauvanist wing. He has been the official liasion between Union and the LSAF, and works through Union to coordinate attacks on key NVRG positions in Okasnia and the Vestan mainland.",
                    "Portrait": "./images/Hiram_Stark_2.png"
                }
                // Add more characters here
            ]
        };
    
    function populateCharacterRoster(characterData){

        const characterGrid = document.getElementById('characterGrid');

        characterData.Characters.forEach(character => { 
            if (character.Association === "GMS") {associationTooltip = "General Massive Systems: One of the 'Big Four' corpro-states, known for reliable, ubiquitous chassis and standardized equipment. Often the baseline for mech technology.";}
            else if (character.Association === "IPS-N") {associationTooltip = "Interplanetary Shipping - Northstar: One of the 'Big Four' corpro-states, specializing in interstellar logistics and robust, durable mech frames designed for industrial use and close-quarters combat.";}
            else if (character.Association === "Horus") {associationTooltip = "HORUS: Enigmatic and decentralized, HORUS is one of the 'Big Four'. Known for pattern-group intelligence, paracausal technology, and mechs excelling in electronic warfare and unconventional tactics.";}
            else if (character.Association === "Harrison Armory") {associationTooltip = "Harrison Armory: One of the 'Big Four' corpro-states and a major military power. Specializes in high-energy weaponry, advanced armor, directed-energy weapons, and powerful, often heat-intensive, war machines.";}
            else if (character.Association === "LSAA") {associationTooltip = "The Leandric States Alliance Army: a confederated force comprised of volunteers from over a dozen countries serving as the primary military arm of the LSA.";}
            else if (character.Association === "Union") {associationTooltip = "Union: The largest single pan-human government in the galaxy, Union is a veritable Utopia attempting to spread its influence and technology to the diasporan worlds. Technologically more advanced than most of its neighbors, Union maintains dominance through influence and the use of advanced super-computing entities known as NHPs.";}
            else if (character.Association === "LVAF") {associationTooltip = "Loyalist Vestan Armed Forces: The remaining forces of the former VSAF still loyal to the displaced royal family and the old Sovereignty. Nominally allies of the LSAA, ROK and Union the LVAF are principally a guerilla force operating within the NVRG's occupied spaces.";}
            const characterRow = document.createElement('div');
            characterRow.className = 'rounded-lg shadow-md overflow-hidden flex flex-col md:flex-row items-center'; // Changed to flex row on medium screens and up

            const portraitSection = document.createElement('div');
            portraitSection.className = 'w-full md:w-32 md:h-32 flex-shrink-0'; // Adjusted width for medium screens

            const portraitImage = document.createElement('img');
            portraitImage.className = 'w-full h-full object-cover';
            portraitImage.src = character.Portrait;
            portraitImage.alt = character.Name;

            portraitSection.appendChild(portraitImage);

            const infoSection = document.createElement('div');
            infoSection.className = 'p-4 flex-grow';

            const nameHeading = document.createElement('h3');
            nameHeading.className = 'text-lg font-semibold text-teal-300';
            nameHeading.textContent = character.Name;

            let associationParagraph=''

            if (character.Association){
                associationParagraph = document.createElement('p');
                associationParagraph.className = 'text-gray-600 mb-1';
                associationParagraph.innerHTML = `Association: <span class="tooltip-trigger" data-tooltip-text="${associationTooltip}">${character.Association}</span>`;
            }

            const descriptionParagraph = document.createElement('p');
            descriptionParagraph.className = 'mt-2 text-base';
            descriptionParagraph.textContent = character.Description;

            let intelParagraph = ''

            if (character.Intel){
                intelParagraph = document.createElement('p');
                intelParagraph.className = 'text-stone-50 text-sm';
                intelParagraph.innerHTML = `<span class="redacted max-h-[65px] md:max-h-[30px]">${character.Intel}</span>`;
            }

            infoSection.appendChild(nameHeading);
            if(character.Association) infoSection.appendChild(associationParagraph);
            infoSection.appendChild(descriptionParagraph);
            if(character.Intel) infoSection.appendChild(intelParagraph);

            characterRow.appendChild(portraitSection);
            characterRow.appendChild(infoSection);

            characterGrid.appendChild(characterRow);
        });
    }

    const juarezBlueRosterData = { // Restored Juarez Blue Data for their briefing section
        "Pilots" : [
            { "Name":"Kal Skirata", "Callsign" : "FUJI", "Occupation": "Former Far-Field Team Leader", "Description" : "Enigmatic, intense and quiet, not much is known about Kal Skirata before his time in Jaurez Blue. He's a talented hacker and support specialist, with an affinity for electronic warfare.","Image":"./images/kal_portrait.png","PortraitColor":"#82a6b8" },
            { "Name":"Matty Vernon", "Callsign":"MULLIGAN", "Occupation":"Former Professional Athlete", "Description":"A prodigal athlete and well-known Playboy, Matty left a life of luxury on his safe core-world to seek adventure amongst the stars with the Union Navy. His natual athleticism adapted him well to the stresses of mech combat, where he quickly excelled to Lancer status.","Image":"./images/matty-portrait.png","PortraitColor":"#778085" },
            { "Name":"Korinn Trigg", "Callsign":"MIDAS", "Occupation":"Mercenary", "Description":"A man of many combat talents, Korinn Trigg is a born and bred soldier of fortune. In a world where everything is provided, Korinn pursued wealth and fame for its own sake, not its ends. The thrill of battle and the exhilarion of a payout were a reward unto itself.","Image":"./images/korinn-portrait.png","PortraitColor":"#617972" },
            { "Name":"Sammy Samrina Samaria", "Callsign":"SPEED", "Occupation":"Racer", "Description":"A woman wholly obsessed with speed, Sammy was a well known jet-flyer, aerocar racer, and adrenaline junkie and a common name across her entire system. Her pursuit of speed ultimately led her into the mech combat arena, and her skills saw her eventually elevated to that of a Lancer, serving in actual combat.","Image":"./images/speedy-portrait.png","PortraitColor":"#ECE6D7" },
            { "Name":"Leon Coffland", "Callsign":"WARDEN", "Occupation":"Frontier World Soldier", "Description":"Genetically enhanced and cybernetically altered, Coffland was a member of his homeworld's Genesoldier Corps, and is proficient in almost every type of melee and ranged weapon known to man. His martial skills and enhanced physique translated his skills almost effortlessly in mech combat, making him a fearsome opponent.","Image":"./images/leon-portrait.png","PortraitColor":"#E4E1D5" }
        ],
        "Chassis" : [
            { "Make" : "GMS", "Model" : "Everest (Chomolungma Variant)", "Name":"Cold Comfort", "Specialization" : "Electronic Warfare", "Pilot" : "Kal Skirata","Image":"./images/cold_comfort-mk3.png" },
            { "Make":"IPS-N", "Model":"Raleigh", "Name":"K-Sig", "Specialization":"Close to Midrange Kinetic Combat", "Pilot":"Matty Vernon","Image":"./images/k-sig_mk2.png" },
            { "Make":"Horus", "Model":"Hechatoncheires", "Name":"Marigold", "Specialization":"Guerilla Warfare and Graywash Assault", "Pilot":"Korinn Trigg","Image":"./images/golden_goose_mk2.png" },
            { "Make":"Harrison Armory", "Model":"Enkidu", "Name":"Exit Poll", "Specialization":"Close Combat Melee Assault", "Pilot":"Sammy Samrina Samaria","Image":"./images/exit_poll_mk2.png" },
            { "Make":"IPS-N", "Model":"Tortuga", "Name":"The Preferred Solution", "Specialization":"Defensive Specialist", "Pilot":"Leon Coffland","Image":"./images/preferred_solution_mk2.png" }
        ]
    };
    
    const atlasSilverBriefingRosterData = { // Data for Atlas Silver's briefing section
         "Pilots" : [ 
            { "Name":"Kenji Tanaka", "Callsign" : "DECAF", "Occupation": "Systems Analyst", "Description" : "Keeps the team supplied and systems running, surprisingly alert despite the callsign. The oldest member of the Atlas Silver team, Kenji is sometimes referred to as 'grandpa' by his squad mates. Prefers methodical engagement and precise fire.","Image":"./images/npc3.png","PortraitColor":"#AE252C" },
            { "Name":"Zara Al-Jamil", "Callsign":"KRAKEN", "Occupation":"Deep Range Scout/Salvager", "Description":"Resourceful and unpredictable, Zara is a genius with a sword and a grappling hook. She is known for unorthodox tactics and a heavily modified chassis. Enjoys grappling and close-quarters disruption.","Image":"./images/npc2.png","PortraitColor":"#DA766B" },
            { "Name":"Mateo Silva", "Callsign":"REGATTA", "Occupation":"Ex-Corpo Security Chief", "Description":"A disciplined tactician with a focus on ranged superiority and team coordination. A consummate marksman, and an accomplished competition shooter, he is not to be underestimated at any distance. Callsign refers to a past inter-colony yacht racing championship.","Image":"./images/npc5.png","PortraitColor":"#5DBAC1" },
            { "Name":"Priya Sharma", "Callsign":"HELIOS", "Occupation":"Experimental Weapons Engineer", "Description":"Specializes in high-energy weaponry and shield modulation. Her experience working on reactors and advanced nuclear-powered weaponry has given her insight on how to get the most from her chassis. Her mech runs dangerously hot but hits like a miniature sun when pushed.","Image":"./images/npc22.png","PortraitColor":"#61888B" },
            { "Name":"Anya Petrova", "Callsign":"SORCERER", "Occupation":"Information Broker/Infiltrator", "Description":"Master of electronic warfare and misdirection. A veritable wizard with a hacking terminal, they utilize advanced hacking suites and stealth systems to disable and confuse enemy targets. Their mech has been known to cause passive and uncontrollable system disruptions to nearby electronics.","Image":"./images/npc8.png","PortraitColor":"#2D2F26" }
        ],
        "Chassis" : [ 
            { "Make" : "GMS", "Model" : "Everest", "Name":"Manna Acquisition Device", "Specialization" : "Support/Logistics", "PilotCallsign" : "DECAF","Image":"./images/Everest.png" },
            { "Make":"IPS-N", "Model":"Blackbeard", "Name":"Whirlwind", "Specialization":"Close-Quarters Brawler/Grappler", "PilotCallsign":"KRAKEN","Image":"./images/Blackbeard.png" },
            { "Make":"Harrison Armory", "Model":"Sherman", "Name":"Understanding Infinity", "Specialization":"Ranged Fire Support", "PilotCallsign":"REGATTA","Image":"./images/Sherman.png" },
            { "Make":"Harrison Armory", "Model":"Tokugawa", "Name":"No Mention of Hell", "Specialization":"High-Energy Combat", "PilotCallsign":"HELIOS","Image":"./images/Tokugawa.png" },
            { "Make":"Horus", "Model":"Goblin", "Name":"Black Magic", "Specialization":"Electronic Warfare/Hacking", "PilotCallsign":"SORCERER","Image":"./images/Goblin.png"}
        ]
    };


    if (loadingOverlay) {
        if(loadingTextInitializing) loadingTextInitializing.style.display = 'block';
        if(loadingTextVerifying) loadingTextVerifying.style.display = 'block';
        if(loadingTextAuthorized) loadingTextAuthorized.style.display = 'none';

        setTimeout(() => {
            if(loadingTextVerifying) loadingTextVerifying.style.display = 'none';
            if(loadingTextAuthorized) loadingTextAuthorized.style.display = 'block';
            if(loadingTextAuthorized) loadingTextLancer.style.display = "block"
        }, verificationPhaseDuration);

        setTimeout(() => {
            loadingOverlay.style.opacity = '0'; 
            setTimeout(() => {
                loadingOverlay.style.display = 'none'; 
            }, 500); 

            if (codeDisplayContainer) codeDisplayContainer.style.visibility = 'visible';
            if (mainContentWrapper) mainContentWrapper.style.visibility = 'visible';
            
            try { // Added try...catch for main initialization
                createTypingAnimationInstance('code-text-1', 'progress-bar-1', briefingCodePhrases, 0);
                createTypingAnimationInstance('code-text-2', 'progress-bar-2', briefingCodePhrases, 700); 
                createTypingAnimationInstance('code-text-3', 'progress-bar-3', briefingCodePhrases, 1400);
                
                const yearElement = document.getElementById('current-year');
                if (yearElement) yearElement.textContent = new Date().getFullYear();
                
                populateJuarezBlueRoster(juarezBlueRosterData.Pilots, juarezBlueRosterData.Chassis); 
                populateAtlasSilverBriefingRoster(atlasSilverBriefingRosterData.Pilots, atlasSilverBriefingRosterData.Chassis);
                populateCharacterRoster(characters);
                initializeTooltips(); 
            } catch (error) {
                console.error("Error during main page initialization after loading screen:", error);
                // Still ensure main content is visible even if parts fail
                if (codeDisplayContainer && codeDisplayContainer.style.visibility !== 'visible') codeDisplayContainer.style.visibility = 'visible';
                if (mainContentWrapper && mainContentWrapper.style.visibility !== 'visible') mainContentWrapper.style.visibility = 'visible';
            }

        }, totalLoadingDuration);

    } else { 
        // Fallback if loadingOverlay isn't found
        try {
            if (codeDisplayContainer) codeDisplayContainer.style.visibility = 'visible';
            if (mainContentWrapper) mainContentWrapper.style.visibility = 'visible';
            
            createTypingAnimationInstance('code-text-1', 'progress-bar-1', briefingCodePhrases, 0);
            createTypingAnimationInstance('code-text-2', 'progress-bar-2', briefingCodePhrases, 700);
            createTypingAnimationInstance('code-text-3', 'progress-bar-3', briefingCodePhrases, 1400);

            const yearElement = document.getElementById('current-year');
            if (yearElement) yearElement.textContent = new Date().getFullYear();
            
            populateJuarezBlueRoster(juarezBlueRosterData.Pilots, juarezBlueRosterData.Chassis);
            populateAtlasSilverBriefingRoster(atlasSilverBriefingRosterData.Pilots, atlasSilverBriefingRosterData.Chassis);
            initializeTooltips();
            
            setCombatLogRandomSectorName();
            if (combatLogMessagesContainer) {
                combatLogMessagesContainer.scrollTop = combatLogMessagesContainer.scrollHeight;
                startCombatLogStream();
            }
        } catch (error) {
            console.error("Error during fallback page initialization:", error);
        }
    }
});

// JS For Modal image popups

 document.addEventListener('DOMContentLoaded', () => {
            const modal = document.getElementById('imageModal');
            const modalContentWrapper = document.getElementById('modalContentWrapper'); // Get the content wrapper
            const modalImage = document.getElementById('modalImage');
            const modalCaption = document.getElementById('modalCaption');
            const closeModalButton = document.getElementById('closeModal');

            // Get all images that should trigger the modal
            const triggerImages = document.querySelectorAll('.modal-trigger-img');

            // Add click event listener to each trigger image
            triggerImages.forEach(img => {
                img.addEventListener('click', () => {
                    // Set the source of the modal image to the clicked image's source
                    modalImage.src = img.src;

                    // Get the caption text from the data-caption attribute
                    const captionText = img.getAttribute('data-caption') || ''; // Use empty string if no data-caption

                    // Set the modal caption text
                    modalCaption.textContent = captionText;

                    // If there's no caption, hide the caption area
                    if (captionText) {
                        modalCaption.style.display = 'block';
                    } else {
                        modalCaption.style.display = 'none';
                    }

                    // --- Animation Logic ---
                    // Remove the hidden class to make the modal visible
                    modal.classList.remove('hidden');

                    // Add the 'is-active' class to trigger the animation
                    // Use a small timeout to ensure the 'hidden' class is removed and the element is in the DOM
                    // before the animation class is added. This helps trigger the transition/animation.
                    setTimeout(() => {
                         modalContentWrapper.classList.add('is-active');
                    }, 10); // A small delay (e.g., 10ms) is often sufficient


                });
            });

            // Hologram JS
            const hologramFrame = document.querySelector('.hologram-frame');

            function triggerGlitch() {
                // Set a random hue for the glitch effect, biased towards blue-green
                hologramFrame.style.setProperty('--random-hue', `${Math.random() * 90 + 90}deg`); // Between 90 and 180 degrees for blue-green
                hologramFrame.classList.add('glitch');

                // Remove glitch after a short duration
                setTimeout(() => {
                    hologramFrame.classList.remove('glitch');
                }, Math.random() * 200 + 80); // Glitch lasts between 80ms and 280ms (even shorter for more impact)
            }

            // Trigger a glitch randomly every few seconds
            setInterval(triggerGlitch, Math.random() * 2000 + 500); // Glitches every 0.5 to 2.5 seconds (even more frequent)

            // Function to close the modal
            function closeModal() {
                 // Remove the 'is-active' class (stops animation if still running)
                 modalContentWrapper.classList.remove('is-active');

                 // Add the hidden class to hide the modal
                 modal.classList.add('hidden');

                 // Clear image source and caption when closing
                 modalImage.src = '';
                 modalCaption.textContent = '';
            }

            // Add click event listener to the close button
            closeModalButton.addEventListener('click', closeModal);

            // Add click event listener to the modal overlay itself to close the modal
            modal.addEventListener('click', (event) => {
                // Check if the click target is the modal overlay (not the content inside)
                if (event.target === modal) {
                    closeModal();
                }
            });

            // Optional: Close modal with Escape key
            document.addEventListener('keydown', (event) => {
                if (event.key === 'Escape' && !modal.classList.contains('hidden')) {
                    closeModal();
                }
            });

             // Ensure the initial state is set when the page loads
             // This prevents a flicker or incorrect state before the first open
             modalContentWrapper.style.transform = 'scale(0.8)';
             modalContentWrapper.style.opacity = '0';
        });

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    })
}

const elements = ["nav-assets","nav-log","nav-opfor","nav-prospectus","nav-pilots"]

for (const elementId of elements) { 
    const targetElement = document.getElementById(elementId);

    if (targetElement) {
        const textToToggle = targetElement.querySelector('span.nav-text');

        if (textToToggle) {
            targetElement.addEventListener("mouseenter", () => {
                textToToggle.classList.toggle('visible');
            });

            targetElement.addEventListener("mouseleave", () => {
                textToToggle.classList.toggle('visible');
            });
        } else {
            console.warn(`Text element (span.nav-text) not found inside #${elementId}`);
        }
    } else {
        console.warn(`Element with ID "${elementId}" not found.`);
    }
}

const menuRelations =[
    {nav:"nav-assets",section:"main-assets"},
    {nav:"nav-log",section:"main-log"},
    {nav:"nav-opfor",section:"main-opfor"},
    {nav:"nav-prospectus",section:"main-prospectus"},
    {nav:"nav-pilots",section:"main-pilots"}
]

function showHideSections(activeNav){
    const matchedRelation = menuRelations.find(relation => relation.nav === activeNav);
    if (matchedRelation) {
        // Get the ID of the section that should be active
        const activeSectionId = matchedRelation.section;

        // Iterate over all relations to update classes
        menuRelations.forEach(relation => {
            // Get the actual DOM element for the section
            // You'll need to have these elements in your HTML with corresponding IDs
            const sectionElement = document.getElementById(relation.section);

            if (sectionElement) {
                if (relation.section === activeSectionId) {
                    // This is the section that matches the activeNav
                    // Add your 'active' class and remove 'inactive' class
                    sectionElement.classList.remove('hidden');
                    console.log(`Section ${relation.section} is now active.`);
                } else {
                    // This is one of the other sections
                    // Add your 'inactive' class and remove 'active' class
                    sectionElement.classList.add('hidden');
                    console.log(`Section ${relation.section} is now inactive.`);
                }
            } else {
                console.warn(`Section element with ID '${relation.section}' not found.`);
            }
        });
    } else {
        console.warn(`No relation found for nav: ${activeNav}`);
    }
}
