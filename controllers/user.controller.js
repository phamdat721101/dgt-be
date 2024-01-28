exports.profile = async (req, res, next) => {
    try {
        const user_resp = {
            "user_adr":"0x13123",
            "balance":2411, 
            "vault":"DigiTrust"
        }
        res.json({
            code: 0,
            data: user_resp
        });
    } catch (error) {
        console.log("Error to get user profile: ", error)
        next(error);
    }
  };