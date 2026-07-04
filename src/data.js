// ============================================================
// MASTER SPELLERS 2026-27 — GRADE 2 BETA — COMPLETE DATA
// Source: Preliminary Prepbook-1 Beta
// ============================================================

// ── ROUND 1: COMMON ERRORS ──────────────────────────────────
// answerIndex: 0=a, 1=b, 2=c
export const commonErrors = [
  { id: 1,  parts: ['My brother', 'has two', 'blue hat.'],      answerIndex: 2, correction: 'blue hats',       correctSentence: 'My brother has two blue hats.',        rule: 'Plural Nouns',          explanation: '"Hat" becomes "hats" when there are two or more. Add -s for most plurals.' },
  { id: 2,  parts: ['The cat', 'sleeps in', 'the mat.'],        answerIndex: 1, correction: 'sleeps on',       correctSentence: 'The cat sleeps on the mat.',           rule: 'Prepositions',          explanation: 'We use "on" for flat surfaces. The cat rests ON top of the mat.' },
  { id: 3,  parts: ['She can', 'jumps very', 'high.'],          answerIndex: 1, correction: 'jump very',       correctSentence: 'She can jump very high.',              rule: 'Verb Forms',            explanation: 'After "can", always use the base form of the verb. "can jump" not "can jumps".' },
  { id: 4,  parts: ['We was', 'at the', 'zoo.'],                answerIndex: 0, correction: 'We were',         correctSentence: 'We were at the zoo.',                  rule: 'Subject-Verb Agreement',explanation: '"We" always uses "were", not "was". We were, You were, They were.' },
  { id: 5,  parts: ['He have', 'a kite', 'today.'],             answerIndex: 0, correction: 'He has',          correctSentence: 'He has a kite today.',                 rule: 'Subject-Verb Agreement',explanation: '"He/She/It" uses "has", not "have". He has, She has, It has.' },
  { id: 6,  parts: ['There bag', 'is on', 'the chair.'],        answerIndex: 0, correction: 'Their bag',       correctSentence: 'Their bag is on the chair.',           rule: 'Pronouns',              explanation: '"Their" shows something belongs to them. "There" is a place. Their bag = the bag belonging to them.' },
  { id: 7,  parts: ['The boy', 'is in', 'to the hall.'],        answerIndex: 2, correction: 'the hall.',       correctSentence: 'The boy is in the hall.',              rule: 'Prepositions',          explanation: '"In the hall" is correct. We do not need both "in" and "to" together here.' },
  { id: 8,  parts: ['I have', 'two tooth', 'now.'],             answerIndex: 1, correction: 'two teeth',       correctSentence: 'I have two teeth now.',                rule: 'Irregular Plurals',     explanation: '"Tooth" becomes "teeth" (not "tooths"). This is an irregular plural — we change the vowel!' },
  { id: 9,  parts: ['Mum put', 'the milk', 'at the fridge.'],   answerIndex: 2, correction: 'in the fridge.',  correctSentence: 'Mum put the milk in the fridge.',      rule: 'Prepositions',          explanation: 'We put things IN the fridge (inside it). "At the fridge" means next to it.' },
  { id: 10, parts: ['That dog', 'are very', 'sick.'],           answerIndex: 1, correction: 'is very',         correctSentence: 'That dog is very sick.',               rule: 'Subject-Verb Agreement',explanation: '"Dog" is singular (one dog), so we use "is", not "are". That dog IS very sick.' },
  { id: 11, parts: ['She do', 'her work', 'at home.'],          answerIndex: 0, correction: 'She does',        correctSentence: 'She does her work at home.',           rule: 'Subject-Verb Agreement',explanation: '"She" uses "does", not "do". She does, He does, It does.' },
  { id: 12, parts: ['The bird', 'fly over', 'the gate.'],       answerIndex: 1, correction: 'flew over',       correctSentence: 'The bird flew over the gate.',         rule: 'Past Tense',            explanation: '"Fly" in the past is "flew". This is an irregular verb: fly → flew.' },
  { id: 13, parts: ['This apples', 'are red', 'and sweet.'],    answerIndex: 0, correction: 'These apples',    correctSentence: 'These apples are red and sweet.',      rule: 'Determiners',           explanation: '"This" is for one thing. "These" is for many things. These apples (more than one).' },
  { id: 14, parts: ['I gone', 'to bed', 'early.'],              answerIndex: 0, correction: 'I went',          correctSentence: 'I went to bed early.',                 rule: 'Past Tense',            explanation: '"Go" in the past is "went". This is an irregular verb: go → went (not "goed" or "gone").' },
  { id: 15, parts: ['Those child', 'are in', 'the class.'],     answerIndex: 0, correction: 'Those children',  correctSentence: 'Those children are in the class.',     rule: 'Irregular Plurals',     explanation: '"Child" becomes "children" (not "childs"). This is an irregular plural — special word!' },
  { id: 16, parts: ['He can', 'swim very', 'good.'],            answerIndex: 2, correction: 'well.',           correctSentence: 'He can swim very well.',               rule: 'Adverbs',               explanation: 'After a verb (swim), use an adverb. "Well" describes HOW he swims. "Good" is an adjective used for nouns.' },
  { id: 17, parts: ['The book', 'is under', 'he desk.'],        answerIndex: 2, correction: 'his desk.',       correctSentence: 'The book is under his desk.',          rule: 'Pronouns',              explanation: '"His" shows the desk belongs to him. "He" is used as a subject (He runs), not to show ownership.' },
  { id: 18, parts: ['We saw', 'three mouses', 'in the barn.'],  answerIndex: 1, correction: 'three mice',      correctSentence: 'We saw three mice in the barn.',       rule: 'Irregular Plurals',     explanation: '"Mouse" becomes "mice" (not "mouses"). Special irregular plural!' },
  { id: 19, parts: ['Her shoes', 'are in', 'the door.'],        answerIndex: 1, correction: 'are by',          correctSentence: 'Her shoes are by the door.',           rule: 'Prepositions',          explanation: 'Shoes are BY the door (next to it). "In the door" doesn\'t make sense — doors aren\'t containers!' },
  { id: 20, parts: ['I am', 'older then', 'my cousin.'],        answerIndex: 1, correction: 'older than',      correctSentence: 'I am older than my cousin.',           rule: 'Word Choice',           explanation: '"Than" is used for comparing. "Then" is used for time (first this, then that).' },
  { id: 21, parts: ['The frog', 'jumps under', 'the pond.'],    answerIndex: 1, correction: 'jumps into',      correctSentence: 'The frog jumps into the pond.',        rule: 'Prepositions',          explanation: 'The frog jumps INTO the pond (entering it). "Under the pond" would mean below the bottom!' },
  { id: 22, parts: ['She has', 'a new', 'pair of scissor.'],    answerIndex: 2, correction: 'pair of scissors.',correctSentence: 'She has a new pair of scissors.',     rule: 'Always Plural',         explanation: '"Scissors" is always plural — we always say "scissors", never "scissor".' },
  { id: 23, parts: ['The cup', 'is on', 'these table.'],        answerIndex: 2, correction: 'the table.',      correctSentence: 'The cup is on the table.',             rule: 'Determiners',           explanation: '"These" is for many things. "The table" is one table. Use "the" or "this" for singular.' },
  { id: 24, parts: ['He runs', 'very fast', 'yesterday.'],      answerIndex: 0, correction: 'He ran',          correctSentence: 'He ran very fast yesterday.',          rule: 'Past Tense',            explanation: '"Yesterday" tells us it happened in the past. "Run" in the past is "ran".' },
  { id: 25, parts: ['My noses', 'is cold', 'today.'],           answerIndex: 0, correction: 'My nose',         correctSentence: 'My nose is cold today.',               rule: 'Singular Nouns',        explanation: 'We have only ONE nose! "My nose" (singular). Adding -s makes it wrong here.' },
  { id: 26, parts: ['I can', 'see too', 'stars.'],              answerIndex: 1, correction: 'see two',         correctSentence: 'I can see two stars.',                 rule: 'Homophones',            explanation: '"Two" is the number 2. "Too" means also or very (too much). When counting, use "two".' },
  { id: 27, parts: ['Lisa is', 'busy', 'at the work.'],         answerIndex: 2, correction: 'at work.',        correctSentence: 'Lisa is busy at work.',                rule: 'Prepositions',          explanation: 'We say "at work" without "the". "At the work" is incorrect — "work" here is a concept, not a place.' },
  { id: 28, parts: ['She were', 'happy all', 'day.'],           answerIndex: 0, correction: 'She was',         correctSentence: 'She was happy all day.',               rule: 'Subject-Verb Agreement',explanation: '"She" uses "was" in the past, not "were". She was, He was, It was.' },
  { id: 29, parts: ['There books', 'are on', 'the shelf.'],     answerIndex: 0, correction: 'Their books',     correctSentence: 'Their books are on the shelf.',        rule: 'Pronouns',              explanation: '"Their" shows the books belong to them. "There" is a place (over there).' },
  { id: 30, parts: ['Dad make', 'soup for', 'dinner.'],         answerIndex: 0, correction: 'Dad made',        correctSentence: 'Dad made soup for dinner.',            rule: 'Past Tense',            explanation: '"Made" is the past tense of "make". This happened before, so we say "made".' },
]

// ── ROUND 2: SCRAMBLED WORDS ─────────────────────────────────
export const scrambledWords = [
  { id: 1,  scrambled: 'EMRHOT',     meaning: 'The female parent in a family',                      answer: 'MOTHER' },
  { id: 2,  scrambled: 'NDIWOW',     meaning: 'You look through this in a room',                    answer: 'WINDOW' },
  { id: 3,  scrambled: 'RNDGAE',     meaning: 'A place where flowers grow',                         answer: 'GARDEN' },
  { id: 4,  scrambled: 'SHOELCT',    meaning: 'Things that you wear',                               answer: 'CLOTHES' },
  { id: 5,  scrambled: 'CETINHK',    meaning: 'A room where food is cooked',                        answer: 'KITCHEN' },
  { id: 6,  scrambled: 'EBRLAMUL',   meaning: 'You use this in the rain',                           answer: 'UMBRELLA' },
  { id: 7,  scrambled: 'NRNDEI',     meaning: 'The evening meal',                                   answer: 'DINNER' },
  { id: 8,  scrambled: 'RCATEEH',    meaning: 'A person who helps children learn',                  answer: 'TEACHER' },
  { id: 9,  scrambled: 'IRYRALB',    meaning: 'A place full of books',                              answer: 'LIBRARY' },
  { id: 10, scrambled: 'BARETKFSA',  meaning: 'The first meal of the day',                          answer: 'BREAKFAST' },
  { id: 11, scrambled: 'CIPELN',     meaning: 'You write with this',                                answer: 'PENCIL' },
  { id: 12, scrambled: 'LCOHOS',     meaning: 'A place where children learn',                       answer: 'SCHOOL' },
  { id: 13, scrambled: 'RAOBTHMO',   meaning: 'A room with a bath or shower',                       answer: 'BATHROOM' },
  { id: 14, scrambled: 'FEWROL',     meaning: 'A colourful part of a plant',                        answer: 'FLOWER' },
  { id: 15, scrambled: 'EAPRP',      meaning: 'You can draw or write on this',                      answer: 'PAPER' },
  { id: 16, scrambled: 'MOINGNR',    meaning: 'The early part of the day',                          answer: 'MORNING' },
  { id: 17, scrambled: 'DAUNYS',     meaning: 'The day after Saturday',                             answer: 'SUNDAY' },
  { id: 18, scrambled: 'SNAERTP',    meaning: 'Your mother and father',                             answer: 'PARENTS' },
  { id: 19, scrambled: 'HCWANDSI',   meaning: 'Food made with two slices of bread',                 answer: 'SANDWICH' },
  { id: 20, scrambled: 'COSSK',      meaning: 'You wear these on your feet',                        answer: 'SOCKS' },
  { id: 21, scrambled: 'WNETRI',     meaning: 'The coldest season of the year',                     answer: 'WINTER' },
  { id: 22, scrambled: 'SDINERF',    meaning: 'People you like and know well',                      answer: 'FRIENDS' },
  { id: 23, scrambled: 'SHIGPPNO',   meaning: 'Buying things from a shop',                          answer: 'SHOPPING' },
  { id: 24, scrambled: 'UADGNPLYOR', meaning: 'A place where children play outside',                answer: 'PLAYGROUND' },
  { id: 25, scrambled: 'RKOMOWEH',   meaning: 'Work given by a teacher to do at home',              answer: 'HOMEWORK' },
  { id: 26, scrambled: 'TYAEDSU',    meaning: 'The day after Monday',                               answer: 'TUESDAY' },
  { id: 27, scrambled: 'MILAAN',     meaning: 'A living thing such as a dog or cat',                answer: 'ANIMAL' },
  { id: 28, scrambled: 'IOSTHLPA',   meaning: 'A place where sick people are treated',              answer: 'HOSPITAL' },
  { id: 29, scrambled: 'CUTREIP',    meaning: 'A drawing or photo',                                 answer: 'PICTURE' },
  { id: 30, scrambled: 'ESAEUCB',    meaning: 'A word used to give a reason',                       answer: 'BECAUSE' },
]

// ── ROUND 3: CHOOSE THE CORRECT SPELLING ────────────────────
// answerIndex: 0=a, 1=b, 2=c
export const correctSpelling = [
  { id: 1,  sentence: 'Every morning, I brush my _____ before school.',                  options: ['teeth', 'teath', 'teethh'],         answerIndex: 0 },
  { id: 2,  sentence: 'The children ran across the grassy _____ at play time.',          options: ['feild', 'field', 'feeld'],           answerIndex: 1 },
  { id: 3,  sentence: 'Mila wore a bright _____ jumper on a cold day.',                  options: ['grean', 'green', 'greene'],          answerIndex: 1 },
  { id: 4,  sentence: 'Sam is my best _____, and we sit together in class.',             options: ['freind', 'friend', 'frend'],         answerIndex: 1 },
  { id: 5,  sentence: 'Dad cut the cake into one extra _____ for Granny.',              options: ['piece', 'peice', 'peece'],           answerIndex: 0 },
  { id: 6,  sentence: 'After the long walk, the baby began to _____.',                  options: ['sleepe', 'sleep', 'slep'],           answerIndex: 1 },
  { id: 7,  sentence: 'Please use a _____ plate for your sandwich.',                    options: ['cleen', 'clean', 'cleane'],          answerIndex: 1 },
  { id: 8,  sentence: 'We watched a cartoon on the big _____ in the lounge.',           options: ['screen', 'screan', 'screene'],       answerIndex: 0 },
  { id: 9,  sentence: 'There are _____ days in one week.',                              options: ['seven', 'sevan', 'sevn'],            answerIndex: 0 },
  { id: 10, sentence: 'Mum is cooking soup in the _____.',                              options: ['kitchen', 'kitchin', 'kichen'],      answerIndex: 0 },
  { id: 11, sentence: 'Our _____ read us a story after lunch.',                         options: ['teecher', 'teacher', 'techer'],      answerIndex: 1 },
  { id: 12, sentence: 'The ball rolled _____ the chair and the table.',                 options: ['betwen', 'between', 'betwean'],      answerIndex: 1 },
  { id: 13, sentence: 'I _____ that you can do your homework neatly.',                  options: ['belive', 'beleeve', 'believe'],      answerIndex: 2 },
  { id: 14, sentence: 'Grandma used a _____ to sew the torn shirt.',                   options: ['needle', 'needel', 'needele'],       answerIndex: 0 },
  { id: 15, sentence: 'At the _____, we visited our cousins.',                          options: ['weekend', 'weekand', 'wekeend'],     answerIndex: 0 },
  { id: 16, sentence: 'Many _____ came to watch the school play.',                      options: ['peple', 'people', 'peeple'],         answerIndex: 1 },
  { id: 17, sentence: 'Spring is the _____ when flowers begin to grow.',               options: ['seeson', 'season', 'seasun'],        answerIndex: 1 },
  { id: 18, sentence: 'There is a good _____ for wearing a coat in the rain.',         options: ['reeson', 'reason', 'reson'],         answerIndex: 1 },
  { id: 19, sentence: 'Our town library is in the _____ of the High Street.',          options: ['centre', 'centar', 'centerre'],      answerIndex: 0 },
  { id: 20, sentence: 'The farmer looked after a flock of white _____.',               options: ['sheep', 'sheepe', 'sheap'],          answerIndex: 0 },
  { id: 21, sentence: 'Please stand in a _____ and wait your turn.',                   options: ['queue', 'queu', 'quaee'],            answerIndex: 0 },
  { id: 22, sentence: 'My little sister likes to draw with coloured _____.',           options: ['pencels', 'pencils', 'penciles'],    answerIndex: 1 },
  { id: 23, sentence: 'At break time, I drank orange _____ from my bottle.',           options: ['juce', 'juice', 'juise'],            answerIndex: 1 },
  { id: 24, sentence: 'The class cheered when our team won the _____.',                options: ['meatch', 'match', 'mach'],           answerIndex: 1 },
  { id: 25, sentence: 'We put the clean spoons in the kitchen _____.',                 options: ['drawer', 'draweer', 'drawar'],       answerIndex: 0 },
  { id: 26, sentence: 'The rabbit hid beneath the tall _____ in the garden.',          options: ['weeds', 'weedes', 'weids'],          answerIndex: 0 },
  { id: 27, sentence: 'On Friday, we went to the shop to buy some _____.',             options: ['cheese', 'chease', 'cheeze'],        answerIndex: 0 },
  { id: 28, sentence: 'The king and _____ waved from the castle window.',              options: ['queen', 'quean', 'qeen'],            answerIndex: 0 },
  { id: 29, sentence: 'Please keep your room tidy before our guests _____.',           options: ['arraeve', 'arrive', 'arive'],        answerIndex: 1 },
  { id: 30, sentence: 'The maid brought a cup of _____ for her mistress.',             options: ['coffe', 'coffee', 'coffe'],          answerIndex: 1 },
]

// ── ROUND 4: WORD BASKET (100 WORDS WITH MEANINGS) ──────────
export const wordBasket = [
  { word: 'ABROAD',     meaning: 'In or to a foreign country',                               example: 'Mia travelled abroad for her holiday.' },
  { word: 'ABSENT',     meaning: 'Not present; not at school or work',                       example: 'Tom was absent because he was sick.' },
  { word: 'ADDRESS',    meaning: 'Where a person lives — house number and street name',      example: 'Write your address on the envelope.' },
  { word: 'ADMIRE',     meaning: 'To really like and respect something or someone',          example: 'I admire my teacher\'s patience.' },
  { word: 'ADORE',      meaning: 'To love something or someone very much',                   example: 'She adores her little puppy.' },
  { word: 'AFTERNOON',  meaning: 'The time between noon and evening',                        example: 'We played in the park every afternoon.' },
  { word: 'ASTRONAUT',  meaning: 'A person who travels into space',                          example: 'The astronaut floated in the rocket.' },
  { word: 'AUDIENCE',   meaning: 'People who watch or listen to a show or performance',      example: 'The audience clapped for the dancers.' },
  { word: 'AUTHOR',     meaning: 'A person who writes books or stories',                     example: 'The author signed copies of her book.' },
  { word: 'AUTUMN',     meaning: 'The season when leaves change colour and fall',            example: 'We collected red leaves in autumn.' },
  { word: 'BALLOON',    meaning: 'A rubber bag filled with air or gas',                      example: 'The birthday balloon floated to the ceiling.' },
  { word: 'BANKER',     meaning: 'A person who works at a bank',                             example: 'The banker helped us open an account.' },
  { word: 'BISCUIT',    meaning: 'A small, crispy baked snack',                              example: 'She dipped her biscuit into hot chocolate.' },
  { word: 'BLANKET',    meaning: 'A warm, soft cloth used to cover yourself in bed',         example: 'He pulled the blanket over his shoulders.' },
  { word: 'BORROW',     meaning: 'To use something that belongs to someone else and return it', example: 'Can I borrow your pencil, please?' },
  { word: 'BREATHE',    meaning: 'To take air in and let it out through your nose or mouth', example: 'Take a deep breath and breathe slowly.' },
  { word: 'BUSINESS',   meaning: 'Work that involves buying and selling things',             example: 'Her father runs a bakery business.' },
  { word: 'CALCULATE',  meaning: 'To work out an answer using numbers',                      example: 'Calculate how many apples are left.' },
  { word: 'CASTLE',     meaning: 'A large stone building where kings and queens lived',      example: 'The princess lived in a tall castle.' },
  { word: 'COBBLER',    meaning: 'A person who repairs shoes',                               example: 'The cobbler fixed my broken sandal.' },
  { word: 'COFFEE',     meaning: 'A hot drink made from roasted coffee beans',               example: 'Mum drinks a cup of coffee every morning.' },
  { word: 'COLUMN',     meaning: 'A tall pillar; or a vertical list',                        example: 'The temple had marble columns at its entrance.' },
  { word: 'CRADLE',     meaning: 'A small rocking bed for a baby',                           example: 'The baby slept in a wooden cradle.' },
  { word: 'CURTAIN',    meaning: 'A piece of cloth that hangs over a window',                example: 'She drew the curtain to block the sunlight.' },
  { word: 'DAMAGE',     meaning: 'Harm or hurt done to something',                           example: 'The storm caused damage to the roof.' },
  { word: 'DESCRIBE',   meaning: 'To say or write what something looks or feels like',       example: 'Describe the colour of the flower.' },
  { word: 'ELASTIC',    meaning: 'A stretchy material that springs back into shape',          example: 'The elastic in her hair band snapped.' },
  { word: 'ENTIRE',     meaning: 'The whole thing; all of it',                               example: 'She ate the entire sandwich by herself.' },
  { word: 'ESCAPE',     meaning: 'To get away from a place or danger',                       example: 'The bird found a way to escape from the cage.' },
  { word: 'FAVOURITE',  meaning: 'The thing or person you like the most',                    example: 'Pizza is my absolute favourite food.' },
  { word: 'FROZEN',     meaning: 'Turned to ice; very cold',                                 example: 'The lake was frozen solid in winter.' },
  { word: 'FURIOUS',    meaning: 'Extremely angry',                                          example: 'Dad was furious when he saw the broken vase.' },
  { word: 'HEADACHE',   meaning: 'A pain inside your head',                                  example: 'Too much screen time gave me a headache.' },
  { word: 'HEALTHY',    meaning: 'Fit and well; not sick',                                   example: 'Eating vegetables keeps you healthy.' },
  { word: 'HEIGHT',     meaning: 'How tall something or someone is',                         example: 'They measured the height of the tree.' },
  { word: 'HORRIBLE',   meaning: 'Very bad, nasty, or frightening',                          example: 'The smell from the rubbish bin was horrible.' },
  { word: 'IMPORTANT',  meaning: 'Very significant; matters a lot',                          example: 'It is important to drink water every day.' },
  { word: 'INPUT',      meaning: 'Information that goes into a computer or machine',         example: 'Type your name as the input on the screen.' },
  { word: 'JEWEL',      meaning: 'A precious stone, like a diamond or ruby',                 example: 'The queen\'s crown was covered in jewels.' },
  { word: 'KIDNAP',     meaning: 'To take someone away against their will',                  example: 'The villain tried to kidnap the princess.' },
  { word: 'KNIFE',      meaning: 'A sharp tool used for cutting food',                       example: 'Be careful when you use a knife.' },
  { word: 'LADDER',     meaning: 'A frame with steps used for climbing up or down',          example: 'The painter climbed the ladder to reach the wall.' },
  { word: 'LAUGHTER',   meaning: 'The sound you make when something is funny',              example: 'Her laughter filled the whole room.' },
  { word: 'LEADER',     meaning: 'A person who is in charge of a group',                     example: 'The team leader gave everyone a task.' },
  { word: 'LIQUID',     meaning: 'Something that flows, like water or juice',               example: 'Pour the liquid into a glass.' },
  { word: 'LUGGAGE',    meaning: 'Bags and suitcases you take when travelling',              example: 'He packed all his luggage for the trip.' },
  { word: 'MACHINE',    meaning: 'A device that does work, powered by electricity or fuel',  example: 'The washing machine cleaned all the clothes.' },
  { word: 'MANAGE',     meaning: 'To be in charge of something; to handle it',               example: 'Can you manage to carry both bags?' },
  { word: 'MANNER',     meaning: 'The way you behave; your habits and politeness',           example: 'She greeted everyone in a very polite manner.' },
  { word: 'MATERIAL',   meaning: 'What something is made of, like cloth or wood',            example: 'The curtain was made of soft material.' },
  { word: 'MEASURE',    meaning: 'To find out how big or how much something is',            example: 'Measure the table before buying a cloth.' },
  { word: 'MEMORY',     meaning: 'The ability to remember things from the past',             example: 'He has a very good memory for songs.' },
  { word: 'METHOD',     meaning: 'A way of doing something step by step',                    example: 'She used a new method to solve the puzzle.' },
  { word: 'MIDNIGHT',   meaning: 'Twelve o\'clock at night',                                 example: 'The clock struck at midnight.' },
  { word: 'MIRROR',     meaning: 'A glass surface that shows your reflection',               example: 'She looked at herself in the mirror.' },
  { word: 'MISCHIEF',   meaning: 'Playful naughtiness or trouble-making',                    example: 'The puppy got into all sorts of mischief.' },
  { word: 'MIXTURE',    meaning: 'Different things mixed together',                          example: 'Stir the mixture until it is smooth.' },
  { word: 'NATION',     meaning: 'A country and all its people',                             example: 'Every nation has its own flag.' },
  { word: 'NEIGHBOUR',  meaning: 'A person who lives near you',                              example: 'Our neighbour brought us homemade cake.' },
  { word: 'NEPHEW',     meaning: 'The son of your brother or sister',                        example: 'My nephew loves to play football.' },
  { word: 'NOTICE',     meaning: 'To see or pay attention to something',                     example: 'Did you notice the colourful butterfly?' },
  { word: 'ONION',      meaning: 'A round vegetable with layers that can make eyes water',   example: 'Mum chopped the onion for the soup.' },
  { word: 'ORDER',      meaning: 'A list of things arranged in a certain way; also, to ask for something', example: 'She placed an order for new books.' },
  { word: 'PARCEL',     meaning: 'A package wrapped up and sent to someone',                 example: 'A parcel arrived at the door for her birthday.' },
  { word: 'PATTERN',    meaning: 'A repeated design or arrangement of shapes',               example: 'Her dress had a pretty flower pattern.' },
  { word: 'PLEASANT',   meaning: 'Nice and enjoyable',                                       example: 'We had a very pleasant picnic in the park.' },
  { word: 'POSSIBLE',   meaning: 'Something that can happen or be done',                     example: 'With practice, anything is possible.' },
  { word: 'PRESENT',    meaning: 'A gift; also means happening right now',                   example: 'She got a lovely present on her birthday.' },
  { word: 'PRINCESS',   meaning: 'The daughter of a king and queen',                         example: 'The princess wore a golden crown.' },
  { word: 'PROMISE',    meaning: 'To say you will definitely do something',                  example: 'I promise to be home before dark.' },
  { word: 'PROTECT',    meaning: 'To keep someone or something safe from harm',              example: 'Wear a helmet to protect your head.' },
  { word: 'PROVIDE',    meaning: 'To give something that is needed',                         example: 'The school will provide all the books.' },
  { word: 'QUALITY',    meaning: 'How good something is',                                    example: 'This bag is of very good quality.' },
  { word: 'QUARREL',    meaning: 'An angry argument between people',                         example: 'They had a quarrel over the last biscuit.' },
  { word: 'RECIPE',     meaning: 'Instructions for cooking a dish',                          example: 'Follow the recipe to bake the cake.' },
  { word: 'REDUCE',     meaning: 'To make something smaller or less',                        example: 'Please reduce the volume of the music.' },
  { word: 'REGION',     meaning: 'An area or part of a country',                             example: 'This region is famous for its mangoes.' },
  { word: 'REVIEW',     meaning: 'To look at something again carefully; an opinion about a book or film', example: 'Write a review of the movie you watched.' },
  { word: 'ROUGH',      meaning: 'Not smooth; bumpy or uneven',                              example: 'The surface of the rock felt rough.' },
  { word: 'SEARCH',     meaning: 'To look carefully for something',                          example: 'We had to search the whole room for the key.' },
  { word: 'SEPARATE',   meaning: 'To keep things apart; not together',                       example: 'Separate the red beads from the blue ones.' },
  { word: 'SHIVER',     meaning: 'To shake because you feel cold or scared',                 example: 'She began to shiver in the icy wind.' },
  { word: 'SNEEZE',     meaning: 'To suddenly push air through your nose, making a loud sound', example: 'He had to sneeze three times in a row.' },
  { word: 'SOCCER',     meaning: 'A sport where players kick a ball into a goal (also called football)', example: 'He scored the winning goal in soccer.' },
  { word: 'SOLDIER',    meaning: 'A person who fights for their country in the army',        example: 'The brave soldier marched in the parade.' },
  { word: 'SPINACH',    meaning: 'A dark green leafy vegetable full of iron',               example: 'Popeye loves to eat spinach!' },
  { word: 'SPRINKLE',   meaning: 'To scatter small drops or pieces over something',          example: 'She sprinkled sugar on the strawberries.' },
  { word: 'STRAIGHT',   meaning: 'Going directly without turning or bending',               example: 'Draw a straight line across the page.' },
  { word: 'SURROUND',   meaning: 'To be all around something on every side',                example: 'Trees surround the little cottage.' },
  { word: 'THEATRE',    meaning: 'A building where plays and shows are performed',           example: 'We watched a play at the theatre.' },
  { word: 'THIRSTY',    meaning: 'Needing to drink something',                              example: 'After running, she felt very thirsty.' },
  { word: 'THUNDER',    meaning: 'The loud rumbling sound you hear during a storm',         example: 'We heard a big clap of thunder at night.' },
  { word: 'TWIST',      meaning: 'To turn or wind something around',                        example: 'Twist the lid to open the jar.' },
  { word: 'UNIVERSITY', meaning: 'A place where people study after finishing school',       example: 'She studies science at the university.' },
  { word: 'VAPOUR',     meaning: 'Tiny drops of liquid floating in the air as mist or steam', example: 'Steam rising from hot soup is water vapour.' },
  { word: 'VARIETY',    meaning: 'Many different kinds of things',                           example: 'The shop sold a variety of coloured pens.' },
  { word: 'VEHICLE',    meaning: 'Something used for travel, like a car, bus, or bicycle',  example: 'A bus is a large vehicle for many passengers.' },
  { word: 'WAIST',      meaning: 'The middle part of your body, above your hips',           example: 'She tied the apron around her waist.' },
  { word: 'WEAPON',     meaning: 'An object used in fighting, like a sword or shield',      example: 'The knight carried a weapon in each hand.' },
  { word: 'WEATHER',    meaning: 'The conditions outside — sunny, rainy, windy, or cold',   example: 'The weather today is cloudy and cool.' },
]

// ── GRAMMAR LESSON CATEGORIES ────────────────────────────────
export const grammarLessons = [
  {
    title: 'Plural Nouns',
    icon: '🔢',
    color: 'from-blue-400 to-blue-600',
    bgLight: 'bg-blue-50',
    borderColor: 'border-blue-300',
    rules: [
      { rule: 'Add -s for most words', examples: ['hat → hats', 'shoe → shoes', 'apple → apples', 'kite → kites'] },
      { rule: 'TOOTH → TEETH  (the vowel changes!)', examples: ['I have one tooth.', 'She has two teeth.'] },
      { rule: 'MOUSE → MICE  (special!)', examples: ['One mouse.', 'Three mice in the barn.'] },
      { rule: 'CHILD → CHILDREN  (special!)', examples: ['One child.', 'Those children are happy.'] },
      { rule: 'SCISSORS is ALWAYS plural', examples: ['a pair of scissors (never "a scissor")'] },
      { rule: 'NOSE is already singular!', examples: ['My nose (not "my noses" — you only have one!)'] },
    ],
    tip: '🌟 Tip: When you see a number more than one, always check the noun is plural!'
  },
  {
    title: 'Subject-Verb Agreement',
    icon: '✅',
    color: 'from-emerald-400 to-emerald-600',
    bgLight: 'bg-emerald-50',
    borderColor: 'border-emerald-300',
    rules: [
      { rule: 'HE / SHE / IT / THAT DOG → is, has, does, was', examples: ['He has a kite.', 'She does her work.', 'That dog is sick.', 'She was happy.'] },
      { rule: 'WE / YOU / THEY → are, have, do, were', examples: ['We were at the zoo.', 'They are in class.'] },
      { rule: 'After CAN, always use the BASE verb', examples: ['She can JUMP (not jumps).', 'He can SWIM (not swims).'] },
    ],
    tip: '🌟 Tip: Find the subject (who is doing the action) first, then pick the right verb!'
  },
  {
    title: 'Prepositions',
    icon: '📍',
    color: 'from-orange-400 to-orange-600',
    bgLight: 'bg-orange-50',
    borderColor: 'border-orange-300',
    rules: [
      { rule: 'ON → flat surfaces', examples: ['on the mat', 'on the table', 'on the chair'] },
      { rule: 'IN → inside something', examples: ['in the fridge', 'in the hall', 'in the barn'] },
      { rule: 'INTO → moving inside', examples: ['The frog jumps INTO the pond.'] },
      { rule: 'BY → next to', examples: ['Her shoes are BY the door.'] },
      { rule: 'AT WORK / AT HOME → no "the"!', examples: ['Lisa is busy at work.  (not "at the work")'] },
    ],
    tip: '🌟 Tip: Picture where things are in your head — on top? inside? next to?'
  },
  {
    title: 'Pronouns',
    icon: '👤',
    color: 'from-purple-400 to-purple-600',
    bgLight: 'bg-purple-50',
    borderColor: 'border-purple-300',
    rules: [
      { rule: 'THEIR = belongs to them', examples: ['Their bag is on the chair.', 'Their books are on the shelf.'] },
      { rule: 'THERE = a place', examples: ['Put it over there.', 'There is a cat.'] },
      { rule: 'HIS = belongs to him', examples: ['The book is under HIS desk. (not "he desk")'] },
    ],
    tip: '🌟 Trick: THEIR has the word HEIR in it — heirs OWN things. So THEIR = ownership!'
  },
  {
    title: 'Past Tense',
    icon: '⏰',
    color: 'from-pink-400 to-pink-600',
    bgLight: 'bg-pink-50',
    borderColor: 'border-pink-300',
    rules: [
      { rule: 'GO → WENT  (irregular)', examples: ['I went to bed early. (not "I gone")'] },
      { rule: 'FLY → FLEW  (irregular)', examples: ['The bird flew over the gate.'] },
      { rule: 'RUN → RAN  (irregular)', examples: ['He ran very fast yesterday. (not "he runs" — yesterday = past!)'] },
      { rule: 'MAKE → MADE  (irregular)', examples: ['Dad made soup for dinner.'] },
      { rule: 'Look for time words: yesterday, last week, ago', examples: ['"Yesterday" → use past tense!'] },
    ],
    tip: '🌟 Tip: Watch for time clues like "yesterday" — they tell you to use past tense!'
  },
  {
    title: 'Word Choice',
    icon: '🎯',
    color: 'from-yellow-400 to-yellow-600',
    bgLight: 'bg-yellow-50',
    borderColor: 'border-yellow-300',
    rules: [
      { rule: 'WELL (not GOOD) after action verbs', examples: ['He can swim very WELL. (not "swim good")'] },
      { rule: 'TWO = the number 2', examples: ['I can see TWO stars.'] },
      { rule: 'TOO = also, or very much', examples: ['She is too tired. / I want some too.'] },
      { rule: 'THAN for comparing', examples: ['I am older THAN my cousin. (not "then")'] },
      { rule: 'THEN for time / sequence', examples: ['First we eat, THEN we play.'] },
      { rule: 'THIS (one thing) → THESE (many things)', examples: ['this apple / these apples', 'this table / these tables'] },
    ],
    tip: '🌟 Tip: TWO, TOO, TO sound the same but mean different things — look at the context!'
  },
]

// ── SPELLING TIPS ────────────────────────────────────────────
export const spellingTips = [
  {
    title: 'i Before e, Except After c',
    icon: '📝',
    color: 'from-blue-400 to-indigo-500',
    examples: [
      { correct: 'field', wrong: 'feild', note: 'i before e ✓' },
      { correct: 'piece', wrong: 'peice', note: 'i before e ✓' },
      { correct: 'believe', wrong: 'belive', note: 'i before e ✓' },
      { correct: 'friend', wrong: 'freind', note: 'i before e ✓' },
    ],
    tip: 'Sing it: "i before e, except after c!" 🎵'
  },
  {
    title: 'Double Letters to Remember',
    icon: '✌️',
    color: 'from-rose-400 to-pink-500',
    examples: [
      { correct: 'coffee', wrong: 'coffe', note: 'double f, double e' },
      { correct: 'between', wrong: 'betwen', note: 'double e' },
      { correct: 'needle', wrong: 'needel', note: 'double e' },
      { correct: 'weekend', wrong: 'weekand', note: 'double e' },
    ],
    tip: 'Say it slowly: "cof-FEE" — you can hear the long e sound!'
  },
  {
    title: 'Silent and Tricky Letters',
    icon: '🤫',
    color: 'from-violet-400 to-purple-500',
    examples: [
      { correct: 'queue', wrong: 'queu', note: 'ends in -ue' },
      { correct: 'screen', wrong: 'screan', note: 'ee makes the long e sound' },
      { correct: 'clean', wrong: 'cleen', note: 'ea makes the long e sound' },
      { correct: 'season', wrong: 'seeson', note: 'ea not ee' },
    ],
    tip: 'Sound out every syllable: "sea-son", "rea-son", "peo-ple"'
  },
  {
    title: 'Tricky Word Endings',
    icon: '🔚',
    color: 'from-amber-400 to-orange-500',
    examples: [
      { correct: 'centre', wrong: 'centar', note: '-re ending (UK spelling)' },
      { correct: 'arrive', wrong: 'arraeve', note: '-ive ending, one r' },
      { correct: 'juice', wrong: 'juce', note: '-uice' },
      { correct: 'teacher', wrong: 'teecher', note: '-cher ending' },
    ],
    tip: 'Memory trick: "arr-IVE" — it rhymes with "five"! 🖐️'
  },
  {
    title: 'Singular vs Plural Spellings',
    icon: '1️⃣➡️🔢',
    color: 'from-teal-400 to-cyan-500',
    examples: [
      { correct: 'teeth', wrong: 'teath', note: 'plural of tooth' },
      { correct: 'people', wrong: 'peple', note: 'many persons' },
      { correct: 'pencils', wrong: 'pencels', note: 'add -s, not -els' },
      { correct: 'weeds', wrong: 'weides', note: 'just add -s' },
    ],
    tip: 'For most words, just add -s or -es. Watch for special ones like teeth!'
  },
]

// ── UNSCRAMBLING TIPS ────────────────────────────────────────
export const unscramblingTips = [
  { icon: '🔵', title: 'Find the Vowels First', body: 'Vowels are A, E, I, O, U. Find them in the scramble — words are built around vowels. Example: EMRHOT has E, O — think about where they go.' },
  { icon: '🖼️', title: 'Picture the Meaning', body: 'Read the meaning hint and close your eyes. Picture it! If the meaning says "a room where food is cooked", picture your kitchen — then spell it!' },
  { icon: '🔤', title: 'Find Common Letter Groups', body: 'Look for familiar pairs: TH, CH, SH, ER, ING, ED. In RCATEEH you can spot T-E-A-C-H-E-R!' },
  { icon: '✏️', title: 'Write and Try Again', body: 'Jot down letters you are sure about first. If you know it starts with a W (WINDOW), put W first, then build the rest.' },
  { icon: '🗣️', title: 'Say It Out Loud', body: 'Say the meaning, then say words that come to mind. "Evening meal" — say "dinner" and then spell it out: D-I-N-N-E-R.' },
]

// Helper: shuffle an array
export function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

// Helper: pick N random items
export function pickRandom(arr, n) {
  return shuffle(arr).slice(0, n)
}
