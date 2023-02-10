const Web3 = require("web3");
const Provider = require('@truffle/hdwallet-provider');
const abi = require("./abi")
const dotenv = require("dotenv");

dotenv.config();
var address = "0xA404C8849C20997EE4ba3A4709976d7Aa3286398";
var privatekey = process.env.PRIVATE_KEY;
const infura_api_key = process.env.INFURA_API_KEY;

const infura_rpc_url = "https://goerli.infura.io/v3/" + infura_api_key;
var provider = new Provider(privatekey, infura_rpc_url);
var web3 = new Web3(provider);
// Read the contract ABI from a JSON file
// const abi = JSON.parse(fs.readFileSync("contractAbi.json", "utf8"));

// Get the contract instance
// const Ideacontract = new web3.eth.Contract(contractJson.abi, "0xD2344f3054D363Aa2715ba83B29F58aCcfeb9186");

// Get the IdeaNFT contract instance
const Ideacontract = new web3.eth.Contract(abi, "0x8f76099ddfBE52FaF0210a5d21c5313B440c4aFd");


// Call the contract function
const createIdeaOnBlockchain = async(doc) => {
  console.log("before calling createIdea")
  const resp = await Ideacontract.methods.createIdea(doc.name, doc.description, doc.imageUrl, doc.author).send({ from: address });;
  console.log(resp);
  return resp;
  // await Ideacontract.methods.createIdea(doc.name, doc.description, doc.imageCId, doc.author).call((error, result) => {
  //   if (error) {
  //     console.error(error);
  //   } else {
  //     console.log(result);
  //     return result;
  //   }
  // });
}

const getIdeaFromBlockchain = async(_key) => {
  const idea = await Ideacontract.methods.tokenURI(_key).call();
  let encodedString = idea.split(",")[1];
  // console.log(encodedString);
  let decodedString = Buffer.from(encodedString, "base64").toString("utf8");
  console.log(decodedString);
  return decodedString;
  // await Ideacontract.methods.ideas(_key).call((error, result) => {
  //   if (error) {
  //     console.error(error);
  //   } else {
  //     console.log(result);
  //     return result;
  //   }
  // });
}

const getNumOfIdeas = async() => {
  const numOfIdeas = await Ideacontract.methods.tokenId().call();
  console.log(numOfIdeas);
  return numOfIdeas;
}
module.exports = {
  getNumOfIdeas,
  getIdeaFromBlockchain,
  createIdeaOnBlockchain
}
