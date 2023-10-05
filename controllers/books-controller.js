const Book = require("../models/Book");
const asyncHandler = require("../middlewares/asyncHandler");
const httpError = require("../utils/httpError");
// const csv = require("csvtojson");
//#region ~ add - /api/v1/product - Upload a Product - Private
let ss = `bookID,title,authors,average_rating,isbn,isbn13,language_code,  num_pages,ratings_count,text_reviews_count,publication_date,publisher
1,Harry Potter and the Half-Blood Prince (Harry Potter  #6),J.K. Rowling/Mary GrandPré,4.57,0439785960,9780439785969,eng,652,2095690,27591,9/16/2006,Scholastic Inc.
2,Harry Potter and the Order of the Phoenix (Harry Potter  #5),J.K. Rowling/Mary GrandPré,4.49,0439358078,9780439358071,eng,870,2153167,29221,9/1/2004,Scholastic Inc.
4,Harry Potter and the Chamber of Secrets (Harry Potter  #2),J.K. Rowling,4.42,0439554896,9780439554893,eng,352,6333,244,11/1/2003,Scholastic
5,Harry Potter and the Prisoner of Azkaban (Harry Potter  #3),J.K. Rowling/Mary GrandPré,4.56,043965548X,9780439655484,eng,435,2339585,36325,5/1/2004,Scholastic Inc.
8,Harry Potter Boxed Set  Books 1-5 (Harry Potter  #1-5),J.K. Rowling/Mary GrandPré,4.78,0439682584,9780439682589,eng,2690,41428,164,9/13/2004,Scholastic
9,Unauthorized Harry Potter Book Seven News: "Half-Blood Prince" Analysis and Speculation,W. Frederick Zimmerman,3.74,0976540606,9780976540601,en-US,152,19,1,4/26/2005,Nimble Books
10,Harry Potter Collection (Harry Potter  #1-6),J.K. Rowling,4.73,0439827604,9780439827607,eng,3342,28242,808,9/12/2005,Scholastic
12,The Ultimate Hitchhiker's Guide: Five Complete Novels and One Story (Hitchhiker's Guide to the Galaxy  #1-5),Douglas Adams,4.38,0517226952,9780517226957,eng,815,3628,254,11/1/2005,Gramercy Books
13,The Ultimate Hitchhiker's Guide to the Galaxy (Hitchhiker's Guide to the Galaxy  #1-5),Douglas Adams,4.38,0345453743,9780345453747,eng,815,249558,4080,4/30/2002,Del Rey Books
14,The Hitchhiker's Guide to the Galaxy (Hitchhiker's Guide to the Galaxy  #1),Douglas Adams,4.22,1400052920,9781400052929,eng,215,4930,460,8/3/2004,Crown
16,The Hitchhiker's Guide to the Galaxy (Hitchhiker's Guide to the Galaxy  #1),Douglas Adams/Stephen Fry,4.22,0739322206,9780739322208,eng,6,1266,253,3/23/2005,Random House Audio
18,The Ultimate Hitchhiker's Guide (Hitchhiker's Guide to the Galaxy  #1-5),Douglas Adams,4.38,0517149257,9780517149256,eng,815,2877,195,1/17/1996,Wings Books
21,A Short History of Nearly Everything,Bill Bryson,4.21,076790818X,9780767908184,eng,544,248558,9396,9/14/2004,Broadway Books
22,Bill Bryson's African Diary,Bill Bryson,3.44,0767915062,9780767915069,eng,55,7270,499,12/3/2002,Broadway Books
23,Bryson's Dictionary of Troublesome Words: A Writer's Guide to Getting It Right,Bill Bryson,3.87,0767910435,9780767910439,eng,256,2088,131,9/14/2004,Broadway Books
24,In a Sunburned Country,Bill Bryson,4.07,0767903862,9780767903868,eng,335,72451,4245,5/15/2001,Broadway Books
25,I'm a Stranger Here Myself: Notes on Returning to America After Twenty Years Away,Bill Bryson,3.90,076790382X,9780767903820,eng,304,49240,2211,6/28/2000,Broadway Books
26,The Lost Continent: Travels in Small Town America,Bill Bryson,3.83,0060920084,9780060920081,eng,299,45712,2257,8/28/1990,William Morrow Paperbacks
27,Neither Here nor There: Travels in Europe,Bill Bryson,3.86,0380713802,9780380713806,eng,254,48701,2238,3/28/1993,William Morrow Paperbacks
28,Notes from a Small Island,Bill Bryson,3.91,0380727501,9780380727506,eng,324,80609,3301,5/28/1997,William Morrow Paperbacks
29,The Mother Tongue: English and How It Got That Way,Bill Bryson,3.93,0380715430,9780380715435,eng,270,28489,2085,9/28/1991,William Morrow Paperbacks
30,J.R.R. Tolkien 4-Book Boxed Set: The Hobbit and The Lord of the Rings,J.R.R. Tolkien,4.59,0345538374,9780345538376,eng,1728,101233,1550,9/25/2012,Ballantine Books
31,The Lord of the Rings (The Lord of the Rings  #1-3),J.R.R. Tolkien,4.50,0618517650,9780618517657,eng,1184,1710,91,10/21/2004,Houghton Mifflin Harcourt
34,The Fellowship of the Ring (The Lord of the Rings  #1),J.R.R. Tolkien,4.36,0618346252,9780618346257,eng,398,2128944,13670,9/5/2003,Houghton Mifflin Harcourt
35,The Lord of the Rings (The Lord of the Rings  #1-3),J.R.R. Tolkien/Alan  Lee,4.50,0618260587,9780618260584,en-US,1216,1618,140,10/1/2002,Houghton Mifflin Harcourt
36,The Lord of the Rings: Weapons and Warfare,Chris   Smith/Christopher  Lee/Richard Taylor,4.53,0618391002,9780618391004,eng,218,19822,46,11/5/2003,Houghton Mifflin Harcourt
37,The Lord of the Rings: Complete Visual Companion,Jude Fisher,4.50,0618510826,9780618510825,eng,224,359,6,11/15/2004,Houghton Mifflin Harcourt
45,Agile Web Development with Rails: A Pragmatic Guide,Dave Thomas/David Heinemeier Hansson/Leon Breedt/Mike Clark/Thomas  Fuchs/Andreas  Schwarz,3.84,097669400X,9780976694007,eng,558,1430,59,7/28/2005,Pragmatic Bookshelf
50,Hatchet (Brian's Saga  #1),Gary Paulsen,3.72,0689840926,9780689840920,eng,208,270244,12017,4/1/2000,Atheneum Books for Young Readers: Richard Jackson Books
51,Hatchet: A Guide for Using "Hatchet" in the Classroom,Donna Ickes/Edward Sciranko/Keith Vasconcelles,4.00,1557344493,9781557344496,eng,48,36,2,8/28/1994,Teacher Created Resources
53,Guts: The True Stories behind Hatchet and the Brian Books,Gary Paulsen,3.88,0385326505,9780385326506,eng,144,2067,334,1/23/2001,Delacorte Press
54,Molly Hatchet - 5 of the Best,Molly Hatchet,4.33,1575606240,9781575606248,eng,56,6,0,6/10/2003,Cherry Lane Music Company
55,Hatchet Jobs: Writings on Contemporary Fiction,Dale Peck,3.45,1595580271,9781595580276,en-US,228,99,16,11/1/2005,The New Press
57,A Changeling for All Seasons (Changeling Seasons #1),Angela Knight/Sahara Kelly/Judy Mays/Marteeka Karland/Kate Douglas/Shelby Morgen/Lacey Savage/Kate Hill/Willa Okati,3.76,1595962808,9781595962805,eng,304,167,4,11/1/2005,Changeling Press
58,Changeling (Changeling  #1),Delia Sherman,3.60,0670059676,9780670059676,eng,256,978,111,8/17/2006,Viking Juvenile
59,The Changeling Sea,Patricia A. McKillip,4.06,0141312629,9780141312620,eng,137,4454,302,4/14/2003,Firebird
61,The Changeling,Zilpha Keatley Snyder,4.17,0595321801,9780595321803,eng,228,1176,96,6/8/2004,iUniverse
63,The Changeling,Kate Horsley,3.55,1590301943,9781590301944,eng,339,301,43,4/12/2005,Shambhala
66,The Changeling (Daughters of England  #15),Philippa Carr,3.98,0449146979,9780449146972,eng,369,345,12,8/28/1990,Ivy Books
67,The Known World,Edward P. Jones,3.83,0061159174,9780061159176,eng,388,29686,2626,8/29/2006,Amistad
68,The Known World,Edward P. Jones/Kevin R. Free,3.83,006076273X,9780060762735,en-US,14,55,12,6/15/2004,HarperAudio
69,The Known World,Edward P. Jones,3.83,0060749911,9780060749910,eng,576,22,3,6/15/2004,Harper
71,Traders  Guns & Money: Knowns and Unknowns in the Dazzling World of Derivatives,Satyajit Das,3.83,0273704745,9780273704744,eng,334,1456,82,5/15/2006,FT Press
72,Artesia: Adventures in the Known World,Mark Smylie,4.13,1932386106,9781932386103,eng,352,52,4,12/14/2005,Archaia
74,The John McPhee Reader (John McPhee Reader  #1),John McPhee/William Howarth,4.42,0374517193,9780374517199,eng,416,562,37,6/1/1982,Farrar  Straus and Giroux
75,Uncommon Carriers,John McPhee,3.95,0374280398,9780374280390,en-US,248,1630,203,5/16/2006,Farrar Straus Giroux
76,Heirs of General Practice,John McPhee,4.17,0374519749,9780374519742,eng,128,268,22,4/1/1986,Farrar  Straus and Giroux
77,The Control of Nature,John McPhee,4.24,0374522596,9780374522599,en-US,288,3498,305,9/1/1990,Farrar  Straus and Giroux
78,Annals of the Former World,John McPhee,4.34,0374518734,9780374518738,eng,720,3115,228,1/6/1999,Farrar  Straus and Giroux
79,Coming Into the Country,John McPhee,4.22,0374522871,9780374522872,eng,448,5704,261,4/1/1991,Farrar  Straus and Giroux
80,La Place de la Concorde Suisse,John McPhee,3.92,0374519323,9780374519322,fre,160,698,52,4/1/1994,Farrar  Straus and Giroux
81,Giving Good Weight,John McPhee,4.23,0374516006,9780374516000,eng,288,542,36,4/1/1994,Farrar  Straus and Giroux
83,Rising from the Plains,John McPhee,4.23,0374520658,9780374520656,eng,208,1341,98,11/1/1987,Farrar  Straus and Giroux
85,The Heidi Chronicles,Wendy Wasserstein,3.75,0822205106,9780822205104,eng,81,1423,70,3/1/2002,Dramatists Play Service
86,The Heidi Chronicles: Uncommon Women and Others & Isn't It Romantic,Wendy Wasserstein,3.84,0679734996,9780679734994,eng,249,2766,64,7/2/1991,Vintage
89,Active Literacy Across the Curriculum: Strategies for Reading  Writing  Speaking  and Listening,Heidi Hayes Jacobs,3.94,1596670231,9781596670235,eng,138,31,1,3/29/2006,Routledge
90,Simply Beautiful Beaded Jewelry,Heidi Boyd,3.77,1581807740,9781581807745,en-US,128,62,4,3/14/2006,North Light Books
91,Always Enough: God's Miraculous Provision Among the Poorest Children on Earth,Heidi Baker/Rolland Baker,4.46,0800793617,9780800793616,eng,192,860,53,9/1/2003,Chosen Books
92,Mapping the Big Picture: Integrating Curriculum & Assessment K-12,Heidi Hayes Jacobs,3.68,0871202867,9780871202864,en-US,108,77,2,1/28/1997,Association for Supervision & Curriculum Development
93,Heidi (Heidi  #1-2),Johanna Spyri/Beverly Cleary/Angelo  Rinaldi,3.99,0753454947,9780753454947,eng,352,153317,2257,11/15/2002,Kingfisher
94,Getting Results with Curriculum Mapping,Heidi Hayes Jacobs,3.25,0871209993,9780871209993,eng,192,55,5,11/15/2004,ASCD
96,There's Always Enough: The Miraculous Move of God in Mozambique,Rolland Baker/Heidi Baker,4.46,1852402873,9781852402877,eng,192,34,6,4/28/2003,Sovereign World
98,What to Expect the First Year (What to Expect),Heidi Murkoff/Sharon Mazel/Arlene Eisenberg/Sandee Hathaway/Mark D. Widome,3.89,0761129588,9780761129585,eng,832,11797,659,10/16/2003,Workman Publishing Company
99,The Player's Handbook: The Ultimate Guide on Dating and Relationships,Heidi Fleiss/Libby Keatinge,3.82,0972016414,9780972016414,eng,123,34,8,5/10/2004,One Hour Entertainment
100,Simply Beautiful Beading: 53 Quick and Easy Projects,Heidi Boyd,3.78,1581805632,9781581805635,en-US,128,78,4,8/19/2004,North Light Books`;
function csvJSON(csv) {
  const lines = csv.split("\n");
  const result = [];
  const headers = lines[0].split(",");

  for (let i = 1; i < lines.length; i++) {
    if (!lines[i]) continue;
    const obj = {};
    const currentline = lines[i].split(",");

    for (let j = 0; j < headers.length; j++) {
      obj[headers[j]] = currentline[j];
    }
    result.push(obj);
  }
  return result;
}
exports.addBook = asyncHandler(async (req, res, next) => {
  try {
    let data = await Book.insertMany(csvJSON(ss));
    console.log(data);
  } catch (error) {
    console.log(error);
  }
});
//#endregion

exports.getBooks = asyncHandler(async (req, res, next) => {
  try {
    let data = await Book.find();
    console.log(data);
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
  }
});
