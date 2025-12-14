export interface Question {
  id: number
  questionText: string
  options: string[]
  correctOptionIndex: number
  explanation: string
}

export interface Quiz {
  id: string
  name: string
  description: string
  icon: string
  timeLimit: number // seconds
  questions: Question[]
}

export interface Category {
  id: string
  name: string
  description: string
  icon: string
  color: string // for card background
  quizzes: Quiz[]
}

// ============================================
// HISTORY CATEGORY
// ============================================
const historyQuizzes: Quiz[] = [
  {
    id: "history-world-wars",
    name: "World Wars",
    description: "Test your knowledge of WWI and WWII",
    icon: "⚔️",
    timeLimit: 600,
    questions: [
      {
        id: 1,
        questionText: "In what year did World War I begin?",
        options: ["1912", "1914", "1916", "1918"],
        correctOptionIndex: 1,
        explanation: "World War I began in 1914, triggered by the assassination of Archduke Franz Ferdinand.",
      },
      {
        id: 2,
        questionText: "Which country was NOT part of the Allied Powers in WWII?",
        options: ["United States", "Soviet Union", "Italy", "United Kingdom"],
        correctOptionIndex: 2,
        explanation: "Italy was part of the Axis Powers along with Germany and Japan until 1943.",
      },
      {
        id: 3,
        questionText: "What was the codename for the Allied invasion of Normandy?",
        options: ["Operation Barbarossa", "Operation Overlord", "Operation Market Garden", "Operation Torch"],
        correctOptionIndex: 1,
        explanation: "Operation Overlord was the codename for the D-Day invasion on June 6, 1944.",
      },
      {
        id: 4,
        questionText: "Which battle is considered the turning point of WWII in Europe?",
        options: ["Battle of Britain", "Battle of Stalingrad", "Battle of the Bulge", "Battle of Midway"],
        correctOptionIndex: 1,
        explanation: "The Battle of Stalingrad (1942-1943) marked the turning point where Germany began losing on the Eastern Front.",
      },
      {
        id: 5,
        questionText: "What treaty ended World War I?",
        options: ["Treaty of Paris", "Treaty of Versailles", "Treaty of Westphalia", "Treaty of Vienna"],
        correctOptionIndex: 1,
        explanation: "The Treaty of Versailles was signed in 1919 and officially ended World War I.",
      },
      {
        id: 6,
        questionText: "Which country suffered the most casualties in World War II?",
        options: ["Germany", "Japan", "Soviet Union", "United States"],
        correctOptionIndex: 2,
        explanation: "The Soviet Union lost approximately 27 million people, the highest of any nation in WWII.",
      },
      {
        id: 7,
        questionText: "What event directly triggered the start of World War I?",
        options: ["Sinking of Lusitania", "Assassination of Franz Ferdinand", "German invasion of Poland", "Russian Revolution"],
        correctOptionIndex: 1,
        explanation: "The assassination of Archduke Franz Ferdinand of Austria in Sarajevo triggered WWI.",
      },
      {
        id: 8,
        questionText: "Which of these was NOT a World War I battle?",
        options: ["Battle of the Somme", "Battle of Verdun", "Battle of Kursk", "Battle of Gallipoli"],
        correctOptionIndex: 2,
        explanation: "The Battle of Kursk was a WWII battle (1943). The others were all WWI battles.",
      },
      {
        id: 9,
        questionText: "What was the main purpose of the League of Nations?",
        options: ["Economic cooperation", "Military alliance", "Prevent future wars", "Colonial administration"],
        correctOptionIndex: 2,
        explanation: "The League of Nations was formed after WWI with the primary goal of preventing future wars.",
      },
      {
        id: 10,
        questionText: "On what date did Germany surrender in World War II (V-E Day)?",
        options: ["May 8, 1945", "August 15, 1945", "September 2, 1945", "April 30, 1945"],
        correctOptionIndex: 0,
        explanation: "Germany surrendered on May 8, 1945, known as Victory in Europe Day (V-E Day).",
      },
    ],
  },
  {
    id: "history-ancient",
    name: "Ancient Civilizations",
    description: "Journey through ancient Egypt, Rome & Greece",
    icon: "🏛️",
    timeLimit: 600,
    questions: [
      {
        id: 1,
        questionText: "Which pharaoh built the Great Pyramid of Giza?",
        options: ["Tutankhamun", "Ramesses II", "Khufu", "Cleopatra"],
        correctOptionIndex: 2,
        explanation: "Pharaoh Khufu (also known as Cheops) built the Great Pyramid around 2560 BCE.",
      },
      {
        id: 2,
        questionText: "What was the primary language of the Roman Empire?",
        options: ["Greek", "Latin", "Hebrew", "Aramaic"],
        correctOptionIndex: 1,
        explanation: "Latin was the official language of the Roman Empire.",
      },
      {
        id: 3,
        questionText: "Which Greek city-state was known for its military prowess?",
        options: ["Athens", "Sparta", "Corinth", "Thebes"],
        correctOptionIndex: 1,
        explanation: "Sparta was famous for its powerful military and warrior culture.",
      },
      {
        id: 4,
        questionText: "Who was the first Roman Emperor?",
        options: ["Julius Caesar", "Augustus", "Nero", "Caligula"],
        correctOptionIndex: 1,
        explanation: "Augustus (born Octavian) became the first Roman Emperor in 27 BCE.",
      },
      {
        id: 5,
        questionText: "What writing system did ancient Egyptians use?",
        options: ["Cuneiform", "Hieroglyphics", "Alphabet", "Pictographs"],
        correctOptionIndex: 1,
        explanation: "Ancient Egyptians used hieroglyphics, a system of picture-based writing.",
      },
      {
        id: 6,
        questionText: "Which philosopher was the teacher of Alexander the Great?",
        options: ["Socrates", "Plato", "Aristotle", "Pythagoras"],
        correctOptionIndex: 2,
        explanation: "Aristotle was hired by King Philip II to tutor young Alexander.",
      },
      {
        id: 7,
        questionText: "What caused the fall of the Roman Empire in 476 CE?",
        options: ["Volcanic eruption", "Barbarian invasions", "Plague", "Civil war only"],
        correctOptionIndex: 1,
        explanation: "The Western Roman Empire fell in 476 CE due to continuous barbarian invasions.",
      },
      {
        id: 8,
        questionText: "Which river was essential to ancient Egyptian civilization?",
        options: ["Tigris", "Euphrates", "Nile", "Jordan"],
        correctOptionIndex: 2,
        explanation: "The Nile River provided water, fertile soil, and transportation for ancient Egypt.",
      },
      {
        id: 9,
        questionText: "What was the Colosseum in Rome primarily used for?",
        options: ["Religious ceremonies", "Gladiator fights", "Political debates", "Markets"],
        correctOptionIndex: 1,
        explanation: "The Colosseum hosted gladiatorial contests and public spectacles.",
      },
      {
        id: 10,
        questionText: "Who won the Peloponnesian War?",
        options: ["Athens", "Sparta", "Persia", "Macedonia"],
        correctOptionIndex: 1,
        explanation: "Sparta defeated Athens in the Peloponnesian War (431-404 BCE).",
      },
    ],
  },
  {
    id: "history-us",
    name: "American History",
    description: "From the Revolution to modern times",
    icon: "🗽",
    timeLimit: 600,
    questions: [
      {
        id: 1,
        questionText: "In what year did the United States declare independence?",
        options: ["1774", "1776", "1778", "1781"],
        correctOptionIndex: 1,
        explanation: "The Declaration of Independence was adopted on July 4, 1776.",
      },
      {
        id: 2,
        questionText: "Who was the first President of the United States?",
        options: ["John Adams", "Thomas Jefferson", "George Washington", "Benjamin Franklin"],
        correctOptionIndex: 2,
        explanation: "George Washington served as the first President from 1789 to 1797.",
      },
      {
        id: 3,
        questionText: "What was the main cause of the American Civil War?",
        options: ["Taxation", "Slavery", "Territory disputes", "Foreign interference"],
        correctOptionIndex: 1,
        explanation: "The primary cause was the conflict over slavery between Northern and Southern states.",
      },
      {
        id: 4,
        questionText: "Which President issued the Emancipation Proclamation?",
        options: ["Andrew Johnson", "Ulysses Grant", "Abraham Lincoln", "James Buchanan"],
        correctOptionIndex: 2,
        explanation: "Abraham Lincoln issued the Emancipation Proclamation in 1863.",
      },
      {
        id: 5,
        questionText: "What territory did the US purchase from France in 1803?",
        options: ["Florida", "Alaska", "Louisiana", "Texas"],
        correctOptionIndex: 2,
        explanation: "The Louisiana Purchase doubled the size of the United States.",
      },
      {
        id: 6,
        questionText: "Which amendment gave women the right to vote?",
        options: ["15th", "18th", "19th", "21st"],
        correctOptionIndex: 2,
        explanation: "The 19th Amendment, ratified in 1920, gave women the right to vote.",
      },
      {
        id: 7,
        questionText: "What was the name of the first successful English colony in America?",
        options: ["Plymouth", "Jamestown", "Roanoke", "Massachusetts Bay"],
        correctOptionIndex: 1,
        explanation: "Jamestown, Virginia was founded in 1607 as the first permanent English settlement.",
      },
      {
        id: 8,
        questionText: "Who wrote the Declaration of Independence?",
        options: ["George Washington", "Benjamin Franklin", "Thomas Jefferson", "John Adams"],
        correctOptionIndex: 2,
        explanation: "Thomas Jefferson was the principal author of the Declaration of Independence.",
      },
      {
        id: 9,
        questionText: "What event started the Great Depression?",
        options: ["World War I", "Stock Market Crash of 1929", "Dust Bowl", "Bank failures"],
        correctOptionIndex: 1,
        explanation: "The Stock Market Crash of October 1929 triggered the Great Depression.",
      },
      {
        id: 10,
        questionText: "Which President led the US during most of World War II?",
        options: ["Harry Truman", "Franklin D. Roosevelt", "Dwight Eisenhower", "Herbert Hoover"],
        correctOptionIndex: 1,
        explanation: "FDR led the US from 1941 until his death in April 1945, near the end of WWII.",
      },
    ],
  },
]

// ============================================
// CRYPTO CATEGORY
// ============================================
const cryptoQuizzes: Quiz[] = [
  {
    id: "crypto-basics",
    name: "Crypto Basics",
    description: "Fundamentals of cryptocurrency",
    icon: "🪙",
    timeLimit: 600,
    questions: [
      {
        id: 1,
        questionText: "Who created Bitcoin?",
        options: ["Vitalik Buterin", "Satoshi Nakamoto", "Charlie Lee", "Gavin Wood"],
        correctOptionIndex: 1,
        explanation: "Bitcoin was created by the pseudonymous Satoshi Nakamoto in 2008.",
      },
      {
        id: 2,
        questionText: "What is the maximum supply of Bitcoin?",
        options: ["18 million", "21 million", "100 million", "Unlimited"],
        correctOptionIndex: 1,
        explanation: "Bitcoin has a fixed maximum supply of 21 million coins.",
      },
      {
        id: 3,
        questionText: "What is a blockchain?",
        options: ["A type of cryptocurrency", "A distributed ledger technology", "A mining hardware", "A wallet type"],
        correctOptionIndex: 1,
        explanation: "A blockchain is a distributed ledger that records transactions across many computers.",
      },
      {
        id: 4,
        questionText: "What does 'HODL' mean in crypto?",
        options: ["Hold On for Dear Life", "High Order Digital Ledger", "Hash Output Data Link", "Hybrid On-chain Distributed Ledger"],
        correctOptionIndex: 0,
        explanation: "HODL originated from a misspelling of 'hold' and became a backronym for 'Hold On for Dear Life'.",
      },
      {
        id: 5,
        questionText: "What is a private key?",
        options: ["Your wallet address", "A secret code to access your funds", "A type of token", "Mining difficulty"],
        correctOptionIndex: 1,
        explanation: "A private key is a secret cryptographic code that allows you to spend your cryptocurrency.",
      },
      {
        id: 6,
        questionText: "What is a 'gas fee' in Ethereum?",
        options: ["Mining reward", "Transaction processing fee", "Staking reward", "Token burning rate"],
        correctOptionIndex: 1,
        explanation: "Gas fees are paid to process transactions and execute smart contracts on Ethereum.",
      },
      {
        id: 7,
        questionText: "What year was Bitcoin launched?",
        options: ["2007", "2008", "2009", "2010"],
        correctOptionIndex: 2,
        explanation: "Bitcoin's network went live on January 3, 2009 when the genesis block was mined.",
      },
      {
        id: 8,
        questionText: "What is a 'wallet' in cryptocurrency?",
        options: ["Physical storage device only", "Software/hardware to store crypto keys", "Exchange account", "Mining pool"],
        correctOptionIndex: 1,
        explanation: "A crypto wallet is software or hardware that stores your private and public keys.",
      },
      {
        id: 9,
        questionText: "What is 'mining' in cryptocurrency?",
        options: ["Buying crypto cheaply", "Validating transactions for rewards", "Selling at a loss", "Creating new blockchains"],
        correctOptionIndex: 1,
        explanation: "Mining is the process of validating transactions and adding them to the blockchain for rewards.",
      },
      {
        id: 10,
        questionText: "What does 'decentralized' mean?",
        options: ["Controlled by one entity", "No single point of control", "Government regulated", "Centrally managed"],
        correctOptionIndex: 1,
        explanation: "Decentralized means no single entity controls the network; it's distributed across many nodes.",
      },
    ],
  },
  {
    id: "crypto-defi",
    name: "DeFi & Web3",
    description: "Decentralized finance and Web3 concepts",
    icon: "🌐",
    timeLimit: 600,
    questions: [
      {
        id: 1,
        questionText: "What does DeFi stand for?",
        options: ["Digital Finance", "Decentralized Finance", "Distributed Finance", "Direct Finance"],
        correctOptionIndex: 1,
        explanation: "DeFi stands for Decentralized Finance - financial services on blockchain without intermediaries.",
      },
      {
        id: 2,
        questionText: "What is a smart contract?",
        options: ["Legal document", "Self-executing code on blockchain", "Insurance policy", "Trading agreement"],
        correctOptionIndex: 1,
        explanation: "Smart contracts are self-executing programs stored on a blockchain that run when conditions are met.",
      },
      {
        id: 3,
        questionText: "What is 'yield farming'?",
        options: ["Agricultural crypto", "Earning rewards by providing liquidity", "Mining with solar power", "Growing token value"],
        correctOptionIndex: 1,
        explanation: "Yield farming involves providing liquidity to DeFi protocols to earn rewards.",
      },
      {
        id: 4,
        questionText: "What is an AMM?",
        options: ["Automated Market Maker", "Advanced Mining Method", "Asset Management Module", "Algorithmic Money Manager"],
        correctOptionIndex: 0,
        explanation: "AMM (Automated Market Maker) is a type of DEX that uses liquidity pools instead of order books.",
      },
      {
        id: 5,
        questionText: "What is 'impermanent loss'?",
        options: ["Temporary price drop", "Loss from providing liquidity vs holding", "Failed transaction fee", "Wallet hack loss"],
        correctOptionIndex: 1,
        explanation: "Impermanent loss occurs when the price ratio of pooled tokens changes compared to just holding them.",
      },
      {
        id: 6,
        questionText: "What is a DAO?",
        options: ["Digital Asset Organization", "Decentralized Autonomous Organization", "Distributed Access Object", "Data Analysis Output"],
        correctOptionIndex: 1,
        explanation: "A DAO is a Decentralized Autonomous Organization governed by smart contracts and token holders.",
      },
      {
        id: 7,
        questionText: "What is TVL in DeFi?",
        options: ["Token Value Listed", "Total Value Locked", "Transaction Volume Level", "Trade Verification Limit"],
        correctOptionIndex: 1,
        explanation: "TVL (Total Value Locked) measures the total assets deposited in a DeFi protocol.",
      },
      {
        id: 8,
        questionText: "What is a DEX?",
        options: ["Digital Exchange", "Decentralized Exchange", "Direct Exchange", "Derivative Exchange"],
        correctOptionIndex: 1,
        explanation: "A DEX (Decentralized Exchange) allows peer-to-peer trading without intermediaries.",
      },
      {
        id: 9,
        questionText: "What is Web3?",
        options: ["Internet 3.0 with centralized servers", "Decentralized internet built on blockchain", "A web browser", "Cloud computing platform"],
        correctOptionIndex: 1,
        explanation: "Web3 refers to a decentralized internet built on blockchain technology.",
      },
      {
        id: 10,
        questionText: "What is a liquidity pool?",
        options: ["Water-cooled mining", "Funds locked in smart contract for trading", "Exchange reserve", "Bank account for crypto"],
        correctOptionIndex: 1,
        explanation: "A liquidity pool is a collection of funds locked in a smart contract to facilitate trading on DEXs.",
      },
    ],
  },
  {
    id: "crypto-ethereum",
    name: "Ethereum Deep Dive",
    description: "Advanced Ethereum knowledge",
    icon: "💎",
    timeLimit: 600,
    questions: [
      {
        id: 1,
        questionText: "Who is the co-founder of Ethereum?",
        options: ["Satoshi Nakamoto", "Vitalik Buterin", "Charles Hoskinson", "Both B and C"],
        correctOptionIndex: 3,
        explanation: "Vitalik Buterin and Charles Hoskinson are both co-founders of Ethereum.",
      },
      {
        id: 2,
        questionText: "What programming language is used for Ethereum smart contracts?",
        options: ["Python", "JavaScript", "Solidity", "Rust"],
        correctOptionIndex: 2,
        explanation: "Solidity is the primary programming language for Ethereum smart contracts.",
      },
      {
        id: 3,
        questionText: "What is the Ethereum Virtual Machine (EVM)?",
        options: ["Mining hardware", "Runtime environment for smart contracts", "Wallet software", "Layer 2 solution"],
        correctOptionIndex: 1,
        explanation: "The EVM is the runtime environment that executes smart contracts on Ethereum.",
      },
      {
        id: 4,
        questionText: "What was 'The Merge'?",
        options: ["Two exchanges combining", "ETH moving to Proof of Stake", "Hard fork creating ETC", "Layer 2 integration"],
        correctOptionIndex: 1,
        explanation: "The Merge (2022) transitioned Ethereum from Proof of Work to Proof of Stake.",
      },
      {
        id: 5,
        questionText: "What is EIP-1559?",
        options: ["Token standard", "Fee burning mechanism", "Staking protocol", "Privacy feature"],
        correctOptionIndex: 1,
        explanation: "EIP-1559 introduced a base fee burning mechanism that makes ETH deflationary.",
      },
      {
        id: 6,
        questionText: "What is the ERC-20 standard?",
        options: ["NFT standard", "Fungible token standard", "Staking standard", "Bridge protocol"],
        correctOptionIndex: 1,
        explanation: "ERC-20 is the standard for creating fungible tokens on Ethereum.",
      },
      {
        id: 7,
        questionText: "What is ERC-721?",
        options: ["Fungible token standard", "NFT (non-fungible token) standard", "Staking standard", "Governance standard"],
        correctOptionIndex: 1,
        explanation: "ERC-721 is the standard for non-fungible tokens (NFTs) on Ethereum.",
      },
      {
        id: 8,
        questionText: "What is 'staking' in Ethereum?",
        options: ["Mining ETH", "Locking ETH to validate transactions", "Trading ETH", "Burning ETH"],
        correctOptionIndex: 1,
        explanation: "Staking involves locking ETH to become a validator and secure the network for rewards.",
      },
      {
        id: 9,
        questionText: "How much ETH is needed to run a validator node?",
        options: ["1 ETH", "16 ETH", "32 ETH", "100 ETH"],
        correctOptionIndex: 2,
        explanation: "Running a full validator node on Ethereum requires 32 ETH as collateral.",
      },
      {
        id: 10,
        questionText: "What is a Layer 2 solution?",
        options: ["Secondary blockchain", "Scaling solution on top of Ethereum", "Alternative wallet", "New consensus mechanism"],
        correctOptionIndex: 1,
        explanation: "Layer 2s are scaling solutions that process transactions off-chain while leveraging Ethereum's security.",
      },
    ],
  },
]

// ============================================
// TECH CATEGORY
// ============================================
const techQuizzes: Quiz[] = [
  {
    id: "tech-programming",
    name: "Programming Basics",
    description: "Fundamental programming concepts",
    icon: "💻",
    timeLimit: 600,
    questions: [
      {
        id: 1,
        questionText: "What does HTML stand for?",
        options: ["Hyper Text Markup Language", "High Tech Modern Language", "Home Tool Markup Language", "Hyperlink Text Management Language"],
        correctOptionIndex: 0,
        explanation: "HTML stands for HyperText Markup Language, used to structure web content.",
      },
      {
        id: 2,
        questionText: "Which of these is NOT a programming language?",
        options: ["Python", "Java", "HTML", "C++"],
        correctOptionIndex: 2,
        explanation: "HTML is a markup language, not a programming language. It structures content but doesn't have logic.",
      },
      {
        id: 3,
        questionText: "What is an 'array' in programming?",
        options: ["A single variable", "A collection of elements", "A loop type", "An error type"],
        correctOptionIndex: 1,
        explanation: "An array is a data structure that stores a collection of elements in a specific order.",
      },
      {
        id: 4,
        questionText: "What does 'API' stand for?",
        options: ["Application Programming Interface", "Advanced Program Integration", "Automated Processing Input", "Application Process Interaction"],
        correctOptionIndex: 0,
        explanation: "API stands for Application Programming Interface - a way for software to communicate.",
      },
      {
        id: 5,
        questionText: "What is 'debugging'?",
        options: ["Adding new features", "Finding and fixing errors", "Optimizing speed", "Writing documentation"],
        correctOptionIndex: 1,
        explanation: "Debugging is the process of finding and fixing bugs (errors) in code.",
      },
      {
        id: 6,
        questionText: "What is a 'variable'?",
        options: ["A fixed value", "A named storage location for data", "A type of loop", "An error message"],
        correctOptionIndex: 1,
        explanation: "A variable is a named container that stores data which can be changed during program execution.",
      },
      {
        id: 7,
        questionText: "What is 'Git'?",
        options: ["A programming language", "A version control system", "A database", "An IDE"],
        correctOptionIndex: 1,
        explanation: "Git is a distributed version control system for tracking changes in source code.",
      },
      {
        id: 8,
        questionText: "What does 'OOP' stand for?",
        options: ["Out Of Process", "Object-Oriented Programming", "Optimal Output Processing", "Open Online Platform"],
        correctOptionIndex: 1,
        explanation: "OOP stands for Object-Oriented Programming, a paradigm based on objects and classes.",
      },
      {
        id: 9,
        questionText: "What is a 'function' in programming?",
        options: ["A data type", "A reusable block of code", "A variable type", "An error handler"],
        correctOptionIndex: 1,
        explanation: "A function is a reusable block of code that performs a specific task.",
      },
      {
        id: 10,
        questionText: "What is 'recursion'?",
        options: ["A loop type", "A function calling itself", "An error type", "A data structure"],
        correctOptionIndex: 1,
        explanation: "Recursion is when a function calls itself to solve smaller instances of a problem.",
      },
    ],
  },
  {
    id: "tech-ai",
    name: "AI & Machine Learning",
    description: "Artificial intelligence fundamentals",
    icon: "🤖",
    timeLimit: 600,
    questions: [
      {
        id: 1,
        questionText: "What does AI stand for?",
        options: ["Automated Intelligence", "Artificial Intelligence", "Advanced Integration", "Analytical Input"],
        correctOptionIndex: 1,
        explanation: "AI stands for Artificial Intelligence - machines mimicking human cognitive functions.",
      },
      {
        id: 2,
        questionText: "What is 'machine learning'?",
        options: ["Robots learning to walk", "Systems learning from data", "Programming robots manually", "Computer maintenance"],
        correctOptionIndex: 1,
        explanation: "Machine learning is a subset of AI where systems learn and improve from data without explicit programming.",
      },
      {
        id: 3,
        questionText: "What is a 'neural network'?",
        options: ["Brain surgery tool", "Computing system inspired by biological neurons", "Internet network", "Social network"],
        correctOptionIndex: 1,
        explanation: "Neural networks are computing systems inspired by biological neural networks in the brain.",
      },
      {
        id: 4,
        questionText: "What does GPT stand for?",
        options: ["General Purpose Technology", "Generative Pre-trained Transformer", "Global Processing Tool", "Graphics Processing Terminal"],
        correctOptionIndex: 1,
        explanation: "GPT stands for Generative Pre-trained Transformer, a type of large language model.",
      },
      {
        id: 5,
        questionText: "What is 'deep learning'?",
        options: ["Intensive studying", "Neural networks with many layers", "Underground computing", "Long-term data storage"],
        correctOptionIndex: 1,
        explanation: "Deep learning uses neural networks with many layers to learn complex patterns.",
      },
      {
        id: 6,
        questionText: "What is 'training data'?",
        options: ["Exercise instructions", "Data used to teach AI models", "User manuals", "Test results"],
        correctOptionIndex: 1,
        explanation: "Training data is the dataset used to teach machine learning models to make predictions.",
      },
      {
        id: 7,
        questionText: "What is 'natural language processing' (NLP)?",
        options: ["Teaching languages naturally", "AI understanding human language", "Language translation only", "Speech recording"],
        correctOptionIndex: 1,
        explanation: "NLP is the branch of AI that helps computers understand, interpret, and generate human language.",
      },
      {
        id: 8,
        questionText: "What is 'computer vision'?",
        options: ["Monitor quality", "AI interpreting images/video", "VR headsets", "Screen resolution"],
        correctOptionIndex: 1,
        explanation: "Computer vision enables computers to interpret and understand visual information from the world.",
      },
      {
        id: 9,
        questionText: "What company created ChatGPT?",
        options: ["Google", "Microsoft", "OpenAI", "Meta"],
        correctOptionIndex: 2,
        explanation: "ChatGPT was created by OpenAI, an AI research company.",
      },
      {
        id: 10,
        questionText: "What is 'supervised learning'?",
        options: ["Learning with a teacher present", "Training with labeled data", "Monitored computer usage", "Classroom AI"],
        correctOptionIndex: 1,
        explanation: "Supervised learning uses labeled training data to teach models the relationship between inputs and outputs.",
      },
    ],
  },
  {
    id: "tech-internet",
    name: "Internet & Networking",
    description: "How the internet works",
    icon: "🌍",
    timeLimit: 600,
    questions: [
      {
        id: 1,
        questionText: "What does HTTP stand for?",
        options: ["HyperText Transfer Protocol", "High Tech Transfer Process", "Home Terminal Transfer Protocol", "Hyperlink Text Transmission Protocol"],
        correctOptionIndex: 0,
        explanation: "HTTP stands for HyperText Transfer Protocol, the foundation of data communication on the web.",
      },
      {
        id: 2,
        questionText: "What is an IP address?",
        options: ["Internet Password", "Unique identifier for devices on a network", "Website name", "Email address"],
        correctOptionIndex: 1,
        explanation: "An IP address is a unique numerical identifier assigned to devices on a network.",
      },
      {
        id: 3,
        questionText: "What does DNS stand for?",
        options: ["Digital Network Service", "Domain Name System", "Data Network Security", "Direct Network Server"],
        correctOptionIndex: 1,
        explanation: "DNS (Domain Name System) translates domain names to IP addresses.",
      },
      {
        id: 4,
        questionText: "What is 'bandwidth'?",
        options: ["Physical width of cables", "Maximum data transfer rate", "Number of users online", "Internet speed only"],
        correctOptionIndex: 1,
        explanation: "Bandwidth is the maximum rate at which data can be transferred over a network connection.",
      },
      {
        id: 5,
        questionText: "What is a 'firewall'?",
        options: ["Physical barrier", "Network security system", "Antivirus software", "Data backup system"],
        correctOptionIndex: 1,
        explanation: "A firewall is a security system that monitors and controls network traffic based on rules.",
      },
      {
        id: 6,
        questionText: "What does VPN stand for?",
        options: ["Virtual Private Network", "Very Private Network", "Visual Processing Node", "Verified Public Network"],
        correctOptionIndex: 0,
        explanation: "VPN stands for Virtual Private Network - creates a secure, encrypted connection.",
      },
      {
        id: 7,
        questionText: "What is 'latency' in networking?",
        options: ["Connection strength", "Delay in data transmission", "Data loss", "Speed of download"],
        correctOptionIndex: 1,
        explanation: "Latency is the time delay between sending a request and receiving a response.",
      },
      {
        id: 8,
        questionText: "What is a 'router'?",
        options: ["A type of computer", "Device that directs network traffic", "Internet browser", "Email server"],
        correctOptionIndex: 1,
        explanation: "A router is a device that forwards data packets between computer networks.",
      },
      {
        id: 9,
        questionText: "What is 'cloud computing'?",
        options: ["Weather forecasting", "Computing services delivered over the internet", "Satellite internet", "Wireless networking"],
        correctOptionIndex: 1,
        explanation: "Cloud computing delivers computing services (servers, storage, etc.) over the internet.",
      },
      {
        id: 10,
        questionText: "What does HTTPS 'S' stand for?",
        options: ["Speed", "Secure", "Server", "Standard"],
        correctOptionIndex: 1,
        explanation: "HTTPS stands for HyperText Transfer Protocol Secure - encrypted HTTP communication.",
      },
    ],
  },
]

// ============================================
// EXPORT ALL CATEGORIES
// ============================================
export const QUIZ_CATEGORIES: Category[] = [
  {
    id: "history",
    name: "History",
    description: "Journey through time",
    icon: "📜",
    color: "from-[#FFB84D] to-[#E5A33D]",
    quizzes: historyQuizzes,
  },
  {
    id: "crypto",
    name: "Crypto",
    description: "Blockchain & Web3",
    icon: "₿",
    color: "from-[#1A4BE8] to-[#0E2C83]",
    quizzes: cryptoQuizzes,
  },
  {
    id: "tech",
    name: "Tech",
    description: "Programming & AI",
    icon: "⚡",
    color: "from-[#12C28D] to-[#0EA372]",
    quizzes: techQuizzes,
  },
]

// ============================================
// HELPER FUNCTIONS
// ============================================
export const DEFAULT_TIME_LIMIT = 600 // 10 minutes in seconds

export function calculateScore(correctCount: number, totalQuestions: number): number {
  // Linear formula: 0% → 70, 50% → 100, 100% → 130
  return 70 + (correctCount / totalQuestions) * 60
}

export function getScoreInterpretation(correctCount: number, totalQuestions: number): string {
  const percentage = (correctCount / totalQuestions) * 100
  if (percentage <= 30) return "Keep practicing!"
  if (percentage <= 60) return "Good effort!"
  if (percentage <= 80) return "Great job!"
  return "Outstanding! 🏆"
}

export function getQuizById(quizId: string): Quiz | undefined {
  for (const category of QUIZ_CATEGORIES) {
    const quiz = category.quizzes.find((q) => q.id === quizId)
    if (quiz) return quiz
  }
  return undefined
}

export function getCategoryById(categoryId: string): Category | undefined {
  return QUIZ_CATEGORIES.find((c) => c.id === categoryId)
}
