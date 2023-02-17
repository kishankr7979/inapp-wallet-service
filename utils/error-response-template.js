const errorResponseTemplate = (res, message='something went wrong', status=500) => {
    return res.status(status).send({success: false, message})
}
export default errorResponseTemplate;