const exerciseModel = require("../models/exerciseModel");
const checkingDatelimitation = (dateLimit, newLimit) => {
  if (dateLimit) {
    return (dateLimit = new Date(dateLimit).getTime());
  } else {
    return (dateLimit = newLimit);
  }
};

const getLogs = async (req, res) => {
  const { id } = req.params;
  let { from, to, limit } = req.query;
  //checking querry options
  from = checkingDatelimitation(from, Number.MIN_SAFE_INTEGER);
  to = checkingDatelimitation(to, Number.MAX_SAFE_INTEGER);
  if (!limit) limit = 0;
  //querring the database for records
  let docs = await exerciseModel
    .find({ userID: id })
    .sort({ date: -1 })
    .limit(Number(limit))
    .exec();
  //checking the number of records
  const count = docs.length;
  if (count === 0) return res.status(404).send("no logs found !");
  //getting the username and the id
  const { username, userID } = docs[0];
  //checking the records matching the date limitations
  docs = docs.filter(
    (doc) =>
      new Date(doc.date).getTime() > from && new Date(doc.date).getTime() < to
  );
  //creating the logs
  let log = [];
  docs.forEach((doc) => {
    log.push({
      description: doc.description,
      duration: doc.duration,
      date: doc.date,
    });
  });
  return res.status(200).json({ username, count, _id: userID, log });
};
module.exports = { getLogs };
