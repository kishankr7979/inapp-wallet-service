const successResponseTemplate = (res, data) => {
   return res.status(200).send({success: true, data})
};

export default successResponseTemplate;